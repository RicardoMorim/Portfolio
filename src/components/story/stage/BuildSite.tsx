"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  BoxGeometry,
  CanvasTexture,
  Color,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  type Sprite,
  type SpriteMaterial,
} from "three";
import { Label, glowBlending, hoverCursor, isFreeClick, useGlowTexture, type SceneProps } from "./common";
import { burst, setNote } from "./store";

const STAGES = ["Build", "Test", "SAST", "DAST", "Release", "Deploy"];
const GATE_STAGES = [1, 2, 3];
const POOL = 10;
const BELT = { start: -1.28, end: 0.52, z: 0.62 };
const BELT_SPEED = 0.4;
const BELT_TRAVEL = (BELT.end - BELT.start) / BELT_SPEED;
const BLOCK_GAP = 0.3;
const AUTO_COMMIT_SECONDS = 1.7;
/** Nearly half of the commits fail one gate, so Test, SAST and DAST all visibly earn their place. */
const FINDING_ODDS = 0.45;
const FALL_SECONDS = 0.8;
const BUILDING = { x: 1.2, z: -0.25, cell: 0.42, floorHeight: 0.25, floors: 6, perFloor: 4, startModules: 8 };
const CRANE = { x: 0.3, z: -0.5, top: 2.05, reach: 1.3, safeY: 1.8 };
const SLOTS = BUILDING.floors * BUILDING.perFloor;

const stageX = (index: number) => -1.02 + index * 0.27;

interface Block {
  x: number;
  state: "belt" | "falling" | "carried" | "gone";
  flawed: boolean;
  gate: number;
  passed: number;
  fall: number;
}

interface CranePose {
  angle: number;
  radius: number;
  y: number;
}

interface CraneKey {
  at: number;
  pose: CranePose;
}

function slotPosition(slot: number): [number, number, number] {
  const floor = Math.floor(slot / BUILDING.perFloor);
  const corner = slot % BUILDING.perFloor;
  return [
    BUILDING.x + ((corner % 2) - 0.5) * BUILDING.cell,
    (floor + 0.5) * BUILDING.floorHeight,
    BUILDING.z + ((corner >> 1) - 0.5) * BUILDING.cell,
  ];
}

function poseAt(x: number, z: number, y: number): CranePose {
  return { angle: Math.atan2(z - CRANE.z, x - CRANE.x), radius: Math.hypot(x - CRANE.x, z - CRANE.z), y };
}

function buildKeys(from: CranePose, slot: number): CraneKey[] {
  const [x, y, z] = slotPosition(slot);
  const pickHigh = poseAt(BELT.end, BELT.z, CRANE.safeY);
  const pickLow = poseAt(BELT.end, BELT.z, 0.2);
  const dropHigh = poseAt(x, z, CRANE.safeY);
  const dropLow = poseAt(x, z, y + 0.1);
  return [
    { at: 0, pose: from },
    { at: 0.7, pose: pickHigh },
    { at: 1.15, pose: pickLow },
    { at: 1.6, pose: pickHigh },
    { at: 2.4, pose: dropHigh },
    { at: 2.9, pose: dropLow },
    { at: CRANE_CYCLE, pose: dropHigh },
  ];
}

const GRAB_AT = 1.15;
/** By now the panel has left the belt, so the next one may roll up behind it. */
const LIFTED_AT = 1.6;
const CRANE_CYCLE = 3.25;
const RELEASE_AT = 2.9;

function sampleKeys(keys: CraneKey[], time: number): CranePose {
  const next = keys.findIndex((key) => key.at >= time);
  if (next <= 0) return next === 0 ? keys[0].pose : keys[keys.length - 1].pose;
  const [a, b] = [keys[next - 1], keys[next]];
  const raw = (time - a.at) / (b.at - a.at);
  const t = raw * raw * (3 - 2 * raw);
  return {
    angle: a.pose.angle + (b.pose.angle - a.pose.angle) * t,
    radius: a.pose.radius + (b.pose.radius - a.pose.radius) * t,
    y: a.pose.y + (b.pose.y - a.pose.y) * t,
  };
}

function useCanvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D) => void, deps: readonly unknown[]): CanvasTexture {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `deps` carries what `draw` reads
  }, deps);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** InnovatWeb: every commit is a precast panel. Clean ones get craned onto the building. */
export default function BuildSite({ active, paused, palette, copy }: SceneProps) {
  const blocks = useRef<Block[]>([]);
  const blockRefs = useRef<(Mesh | null)[]>([]);
  const moduleRefs = useRef<(Mesh | null)[]>([]);
  const scanRefs = useRef<(Mesh | null)[]>([]);
  const jibRef = useRef<Group>(null);
  const trolleyRef = useRef<Group>(null);
  const cableRef = useRef<Mesh>(null);
  const hookRef = useRef<Mesh>(null);
  const flashRef = useRef<Sprite>(null);
  const placed = useRef(BUILDING.startModules);
  const counters = useRef({ shipped: 0, blocked: 0, since: AUTO_COMMIT_SECONDS });
  const crane = useRef<{ pose: CranePose; keys: CraneKey[] | null; time: number; block: Block | null; slot: number }>({
    pose: poseAt(BELT.end, BELT.z, CRANE.safeY),
    keys: null,
    time: 0,
    block: null,
    slot: 0,
  });
  const flash = useRef(0);
  const nextFlawed = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const glow = useGlowTexture();
  const blending = glowBlending(palette);

  const windows = useCanvasTexture(
    64,
    (ctx) => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = "#ffffff";
      [10, 37].forEach((x) => ctx.fillRect(x, 16, 17, 32));
    },
    [],
  );
  const stripes = useCanvasTexture(
    64,
    (ctx) => {
      ctx.fillStyle = palette.dark ? "#14171c" : "#b9b2a3";
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = palette.dark ? "#262b33" : "#a39c8c";
      for (let x = 0; x < 64; x += 16) ctx.fillRect(x, 0, 6, 64);
    },
    [palette.dark],
  );
  const siteFloor = useCanvasTexture(
    512,
    (ctx) => {
      ctx.strokeStyle = palette.dark ? "rgba(236,232,223,0.1)" : "rgba(19,20,23,0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "destination-in";
      const fade = ctx.createRadialGradient(256, 256, 120, 256, 256, 256);
      fade.addColorStop(0, "rgba(0,0,0,1)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, 512, 512);
    },
    [palette.dark],
  );

  useEffect(() => {
    stripes.wrapS = RepeatWrapping;
    stripes.repeat.set(8, 1);
  }, [stripes]);

  const moduleGeometry = useMemo(
    () => new BoxGeometry(BUILDING.cell * 0.96, BUILDING.floorHeight * 0.94, BUILDING.cell * 0.96),
    [],
  );
  const moduleMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: palette.dark ? "#3a404b" : "#d6cfc1",
        emissive: new Color(palette.dark ? "#ffc27a" : "#b45309"),
        emissiveMap: windows,
        emissiveIntensity: 1.5,
        roughness: 0.75,
      }),
    [palette.dark, windows],
  );

  const publish = () => {
    setNote(`${counters.current.shipped} ${copy.deployed} · ${counters.current.blocked} ${copy.blocked}`);
  };

  useEffect(() => {
    if (active) publish();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-publish only when the scene or copy changes
  }, [active, copy]);

  /** Seconds until the crane has cleared every clean panel already on the belt. */
  const craneFreeIn = (): number => {
    const job = crane.current;
    const busy = job.keys ? job.keys[job.keys.length - 1].at - job.time : 0;
    return blocks.current
      .filter((block) => block.state === "belt" && !block.flawed)
      .sort((a, b) => b.x - a.x)
      .reduce((free, block) => Math.max(free, (BELT.end - block.x) / BELT_SPEED) + CRANE_CYCLE, busy);
  };

  /** Back-pressure: a clean panel only leaves once the crane can take it the moment it arrives. */
  const commit = () => {
    const live = blocks.current.filter((block) => block.state !== "gone");
    const crowded = live.some((block) => block.state === "belt" && block.x < BELT.start + BLOCK_GAP);
    if (live.length >= POOL || crowded) return false;
    if (!nextFlawed.current && craneFreeIn() > BELT_TRAVEL) return false;
    blocks.current = [
      ...live,
      {
        x: BELT.start,
        state: "belt",
        flawed: nextFlawed.current,
        gate: GATE_STAGES[Math.floor(Math.random() * GATE_STAGES.length)],
        passed: 0,
        fall: 0,
      },
    ];
    nextFlawed.current = Math.random() < FINDING_ODDS;
    return true;
  };

  const showModules = () => {
    moduleRefs.current.forEach((mesh, i) => {
      if (mesh) mesh.visible = i < placed.current;
    });
  };

  useEffect(showModules, [active]);

  useFrame((frame, delta) => {
    if (!active || paused) return;
    const time = frame.clock.elapsedTime;
    const count = counters.current;

    count.since += delta;
    if (count.since > AUTO_COMMIT_SECONDS && commit()) count.since = 0;

    stripes.offset.x = -time * BELT_SPEED * 1.8;
    flash.current *= Math.exp(-delta * 3.5);

    const job = crane.current;
    const riding = blocks.current.filter((block) => block.state === "belt");
    riding.sort((a, b) => b.x - a.x).forEach((block, order) => {
      const pickupClear = !job.block || job.time >= LIFTED_AT;
      const front = pickupClear ? BELT.end : BELT.end - BLOCK_GAP;
      const limit = order === 0 ? front : riding[order - 1].x - BLOCK_GAP;
      block.x = Math.min(block.x + BELT_SPEED * delta, limit);
      if (block.passed < STAGES.length && block.x >= stageX(block.passed)) {
        if (block.flawed && block.passed === block.gate) {
          block.state = "falling";
          count.blocked += 1;
          publish();
          return;
        }
        block.passed += 1;
      }
      if (order === 0 && block.x >= BELT.end && !job.keys) {
        job.keys = buildKeys(job.pose, placed.current % SLOTS);
        job.time = 0;
        job.block = block;
        job.slot = placed.current % SLOTS;
        block.state = "carried";
        placed.current += 1;
      }
    });

    if (job.keys) {
      const before = job.time;
      job.time += delta;
      job.pose = sampleKeys(job.keys, job.time);
      if (before < RELEASE_AT && job.time >= RELEASE_AT && job.block) {
        job.block.state = "gone";
        job.block = null;
        const [x, y, z] = slotPosition(job.slot);
        flashRef.current?.position.set(x, y, z);
        flash.current = 1;
        count.shipped += 1;
        showModules();
        publish();
      }
      if (job.time >= job.keys[job.keys.length - 1].at) {
        job.keys = null;
        if (placed.current >= SLOTS) {
          placed.current = BUILDING.startModules;
          showModules();
          burst();
        }
      }
    }

    const { angle, radius, y } = job.pose;
    if (jibRef.current) jibRef.current.rotation.y = -angle;
    trolleyRef.current?.position.set(radius, 0, 0);
    const drop = CRANE.top - y;
    if (cableRef.current) {
      cableRef.current.scale.y = drop;
      cableRef.current.position.y = -drop / 2;
    }
    if (hookRef.current) hookRef.current.position.y = -drop;

    if (flashRef.current) {
      flashRef.current.scale.setScalar(0.3 + (1 - flash.current) * 0.9);
      (flashRef.current.material as SpriteMaterial).opacity = flash.current;
    }

    const hookX = CRANE.x + Math.cos(angle) * radius;
    const hookZ = CRANE.z + Math.sin(angle) * radius;
    for (let i = 0; i < POOL; i++) {
      const mesh = blockRefs.current[i];
      const block = blocks.current[i];
      if (!mesh) continue;
      mesh.visible = Boolean(block && block.state !== "gone");
      if (!block || block.state === "gone") continue;
      const material = mesh.material as MeshStandardMaterial;
      material.emissive.set(block.state === "falling" ? palette.danger : palette.accent);
      material.emissiveIntensity = block.state === "falling" ? 1.4 : 0.12;
      if (block.state === "carried") {
        const hooked = job.time >= GRAB_AT;
        mesh.position.set(hooked ? hookX : BELT.end, hooked ? y - 0.1 : 0.19, hooked ? hookZ : BELT.z);
        mesh.rotation.set(0, hooked ? -angle : 0, 0);
      } else if (block.state === "falling") {
        block.fall += delta;
        const t = block.fall / FALL_SECONDS;
        mesh.position.set(block.x, 0.19 + 0.12 * Math.sin(t * Math.PI) - t * t * 1.0, BELT.z + t * 0.55);
        mesh.rotation.set(t * 2.2, 0, t * 0.8);
        if (t >= 1) block.state = "gone";
      } else {
        mesh.position.set(block.x, 0.19, BELT.z);
        mesh.rotation.set(0, 0, 0);
      }
    }

    scanRefs.current.forEach((scan, i) => {
      if (!scan) return;
      const near = blocks.current.some((block) => block.state === "belt" && Math.abs(block.x - stageX(i)) < 0.14);
      const material = scan.material as MeshBasicMaterial;
      material.opacity += ((near ? 0.55 : 0.05) - material.opacity) * (1 - Math.exp(-delta * 12));
    });
  });

  const pushCommit = (event: ThreeEvent<MouseEvent>) => {
    if (!isFreeClick(event)) return;
    event.stopPropagation();
    counters.current.since = AUTO_COMMIT_SECONDS;
  };

  const beltLength = BELT.end - BELT.start + 0.34;
  const beltCentre = (BELT.end + BELT.start) / 2;

  return (
    <group position={[-0.08, -0.82, 0]} rotation={[0.42, -0.34, 0]} scale={0.72}>
      <sprite position={[0.5, 0.5, -0.3]} scale={[5, 5, 1]}>
        <spriteMaterial map={glow} color={palette.accent} blending={blending} transparent opacity={0.14} depthWrite={false} depthTest={false} />
      </sprite>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[5.4, 5.4]} />
        <meshBasicMaterial map={siteFloor} transparent depthWrite={false} />
      </mesh>

      <mesh position={[beltCentre, 0.07, BELT.z]} onClick={pushCommit} {...hoverCursor}>
        <boxGeometry args={[beltLength, 0.05, 0.3]} />
        <meshStandardMaterial attach="material-0" color={palette.surfaceHi} />
        <meshStandardMaterial attach="material-1" color={palette.surfaceHi} />
        <meshStandardMaterial attach="material-2" map={stripes} />
        <meshStandardMaterial attach="material-3" color={palette.surfaceHi} />
        <meshStandardMaterial attach="material-4" color={palette.surfaceHi} />
        <meshStandardMaterial attach="material-5" color={palette.surfaceHi} />
      </mesh>

      <group position={[BELT.start - 0.22, 0, BELT.z]} onClick={pushCommit} {...hoverCursor}>
        {[0, 1, 2, 3].map((level) => (
          <mesh key={level} position={[0, 0.06 + level * 0.1, 0]} rotation={[0, level * 0.22, 0]}>
            <boxGeometry args={[0.3, 0.07, 0.26]} />
            <meshStandardMaterial color={level === 3 ? palette.accent : palette.surfaceHi} />
          </mesh>
        ))}
        <Label text="repos" position={[0, 0.58, 0]} height={0.13} color={palette.ink} />
      </group>

      {STAGES.map((stage, i) => {
        const gate = GATE_STAGES.includes(i);
        const tone = gate ? palette.cool : palette.accent;
        return (
          <group
            key={stage}
            position={[stageX(i), 0, BELT.z]}
            onPointerOver={() => {
              setHovered(i);
              setNote(copy.stageNotes[i] ?? "");
            }}
            onPointerOut={() => {
              setHovered(null);
              publish();
            }}
            onClick={pushCommit}
          >
            {[-0.19, 0.19].map((z) => (
              <mesh key={z} position={[0, 0.2, z]}>
                <boxGeometry args={[0.035, 0.4, 0.035]} />
                <meshStandardMaterial color={palette.surfaceHi} />
              </mesh>
            ))}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.07, 0.04, 0.44]} />
              <meshStandardMaterial color={palette.surfaceHi} emissive={tone} emissiveIntensity={hovered === i ? 1.6 : 0.6} />
            </mesh>
            <mesh
              rotation={[0, Math.PI / 2, 0]}
              position={[0, 0.2, 0]}
              ref={(el) => {
                scanRefs.current[i] = el;
              }}
            >
              <planeGeometry args={[0.36, 0.36]} />
              <meshBasicMaterial color={tone} transparent opacity={0.05} depthWrite={false} blending={blending} side={2} />
            </mesh>
            <Label
              text={stage}
              position={[0, i % 2 === 0 ? 0.54 : 0.68, 0]}
              height={0.13}
              color={hovered === i ? tone : palette.ink}
            />
          </group>
        );
      })}

      <mesh position={[BUILDING.x, -0.005, BUILDING.z]}>
        <boxGeometry args={[BUILDING.cell * 2 + 0.16, 0.03, BUILDING.cell * 2 + 0.16]} />
        <meshStandardMaterial color={palette.surfaceHi} />
      </mesh>
      {Array.from({ length: SLOTS }, (_, slot) => (
        <mesh
          key={slot}
          geometry={moduleGeometry}
          material={moduleMaterial}
          position={slotPosition(slot)}
          visible={slot < BUILDING.startModules}
          ref={(el) => {
            moduleRefs.current[slot] = el;
          }}
        />
      ))}
      <sprite ref={flashRef} scale={[0.3, 0.3, 1]}>
        <spriteMaterial map={glow} color={palette.accent} blending={blending} transparent opacity={0} depthWrite={false} />
      </sprite>

      <group position={[CRANE.x, 0, CRANE.z]}>
        <mesh position={[0, CRANE.top / 2, 0]}>
          <boxGeometry args={[0.07, CRANE.top, 0.07]} />
          <meshStandardMaterial color={palette.accent} />
        </mesh>
        <group ref={jibRef} position={[0, CRANE.top, 0]}>
          <mesh position={[(CRANE.reach - 0.4) / 2, 0.02, 0]}>
            <boxGeometry args={[CRANE.reach + 0.4, 0.05, 0.05]} />
            <meshStandardMaterial color={palette.accent} />
          </mesh>
          <mesh position={[-0.36, -0.03, 0]}>
            <boxGeometry args={[0.14, 0.1, 0.1]} />
            <meshStandardMaterial color={palette.surfaceHi} />
          </mesh>
          <group ref={trolleyRef}>
            <mesh ref={cableRef}>
              <boxGeometry args={[0.012, 1, 0.012]} />
              <meshBasicMaterial color={palette.ink} />
            </mesh>
            <mesh ref={hookRef}>
              <boxGeometry args={[0.05, 0.03, 0.05]} />
              <meshBasicMaterial color={palette.ink} />
            </mesh>
          </group>
        </group>
      </group>

      {Array.from({ length: POOL }, (_, i) => (
        <mesh
          key={i}
          visible={false}
          ref={(el) => {
            blockRefs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.22, 0.13, 0.2]} />
          <meshStandardMaterial color={palette.dark ? "#c9c3b6" : "#8f8878"} emissive={palette.accent} emissiveIntensity={0.12} />
        </mesh>
      ))}
    </group>
  );
}
