"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  CanvasTexture,
  ConeGeometry,
  ExtrudeGeometry,
  type Group,
  type InstancedMesh,
  type Mesh,
  MeshBasicMaterial,
  Object3D,
  Shape,
  SRGBColorSpace,
} from "three";
import { Label, hoverCursor, isFreeClick, type SceneProps } from "./common";
import { setNote } from "./store";

type Point = [number, number];
type Turn = "left" | "right" | "straight";

const WALK_SPEED = 0.5;
const HOLD_SECONDS = 1.6;
const CHEVRONS = 18;
const CHEVRON_GAP = 0.2;
const METRES_PER_UNIT = 12;
const SCREEN = { width: 256, height: 512 };
const ROOMS: Point[] = [[-0.6, -0.45], [0.6, -0.45], [-0.6, 0.45], [0.6, 0.45]];
const START: Point = [-1.2, 0.9];
const PINS: { at: Point; key: "lab" | "lift" | "exit" }[] = [
  { at: [-1.2, -0.9], key: "lab" },
  { at: [1.2, -0.9], key: "lift" },
  { at: [1.2, 0.9], key: "exit" },
];

interface Walker {
  path: Point[];
  segment: number;
  along: number;
  dest: number;
  hold: number;
}

const distance = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Corridors are a grid, so every route is an L: along x first, then along z. */
function routeBetween(from: Point, to: Point): Point[] {
  const corner: Point = [to[0], from[1]];
  return [from, corner, to].filter((p, i, all) => i === 0 || distance(p, all[i - 1]) > 1e-3);
}

function pointAt(path: Point[], segment: number, along: number): Point {
  const a = path[segment];
  const b = path[segment + 1] ?? a;
  const length = distance(a, b) || 1;
  const t = along / length;
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function nextTurn(path: Point[], segment: number): Turn {
  const [a, b, c] = [path[segment], path[segment + 1], path[segment + 2]];
  if (!b || !c) return "straight";
  const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
  if (Math.abs(cross) < 1e-3) return "straight";
  return cross > 0 ? "right" : "left";
}

function remainingOf({ path, segment, along }: Walker): number {
  let total = -along;
  for (let i = segment; i < path.length - 1; i++) total += distance(path[i], path[i + 1]);
  return Math.max(total, 0);
}

function walkPoint(walker: Walker, ahead: number): { point: Point; heading: number } | null {
  let { segment } = walker;
  let along = walker.along + ahead;
  while (segment < walker.path.length - 1) {
    const length = distance(walker.path[segment], walker.path[segment + 1]);
    if (along <= length) {
      const [a, b] = [walker.path[segment], walker.path[segment + 1]];
      return { point: pointAt(walker.path, segment, along), heading: Math.atan2(b[0] - a[0], b[1] - a[1]) };
    }
    along -= length;
    segment += 1;
  }
  return null;
}

function chevron(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x - size, y + size * 0.55);
  ctx.lineTo(x, y - size * 0.25);
  ctx.lineTo(x + size, y + size * 0.55);
  ctx.stroke();
}

function pill(ctx: CanvasRenderingContext2D, text: string, y: number, fill: string, ink: string): void {
  ctx.font = "600 19px system-ui, sans-serif";
  const width = Math.min(ctx.measureText(text).width + 32, SCREEN.width - 20);
  const x = (SCREEN.width - width) / 2;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, width, 38, 19);
  ctx.fill();
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, SCREEN.width / 2, y + 20, width - 16);
}

interface ScreenState {
  time: number;
  turn: Turn;
  title: string;
  instruction: string;
  accent: string;
  arrived: boolean;
}

/** The camera feed of the AR app: a corridor with the guidance painted onto the floor. */
function drawScreen(ctx: CanvasRenderingContext2D, state: ScreenState): void {
  const { width, height } = SCREEN;
  const vanish = { x: width / 2 + (state.turn === "left" ? -46 : state.turn === "right" ? 46 : 0), y: 205 };
  const background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#23262d");
  background.addColorStop(0.42, "#3a3e47");
  background.addColorStop(0.43, "#16181d");
  background.addColorStop(1, "#272a31");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  for (const [x, y] of [[0, 0], [width, 0], [0, height], [width, height]]) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(vanish.x, vanish.y);
    ctx.stroke();
  }
  ctx.strokeRect(vanish.x - 26, vanish.y - 34, 52, 58);

  for (let i = 0; i < 3; i++) {
    const depth = 1 - ((i / 3 + state.time * 0.14) % 1);
    const w = 6 + depth * depth * 80;
    ctx.fillStyle = `rgba(255,255,255,${0.15 + depth * 0.5})`;
    ctx.fillRect(vanish.x - w / 2, vanish.y - 34 - depth * depth * 150, w, 2 + depth * 6);
  }

  if (!state.arrived) {
    for (let i = 0; i < 5; i++) {
      const depth = ((i / 5 + state.time * 0.45) % 1) ** 2;
      const y = vanish.y + 22 + depth * 250;
      chevron(ctx, vanish.x + (width / 2 - vanish.x) * depth, y, 7 + depth * 38, state.accent);
    }
  } else {
    ctx.strokeStyle = state.accent;
    ctx.lineWidth = 5;
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 1 - ((i / 3 + state.time) % 1);
      ctx.beginPath();
      ctx.ellipse(vanish.x, 340, 26 + ((i / 3 + state.time) % 1) * 70, 8 + ((i / 3 + state.time) % 1) * 22, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  pill(ctx, state.title, 26, "rgba(10,11,13,0.72)", "#f1ede4");
  pill(ctx, state.instruction, height - 66, state.accent, "#0a0b0d");
}

function usePhoneBody() {
  return useMemo(() => {
    const [w, h, r] = [0.82, 1.66, 0.11];
    const shape = new Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return new ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 });
  }, []);
}

/** INESC TEC: the indoor AR prototype. Pick a pin and the phone reroutes the walker to it. */
export default function PhoneAR({ active, paused, palette, copy }: SceneProps) {
  const body = usePhoneBody();
  const walker = useRef<Walker>({ path: routeBetween(START, PINS[0].at), segment: 0, along: 0, dest: 0, hold: 0 });
  const [dest, setDest] = useState(0);
  const phoneRef = useRef<Group>(null);
  const dotRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const trailRef = useRef<InstancedMesh>(null);
  const frameCount = useRef(0);
  const dummy = useMemo(() => new Object3D(), []);
  const chevronGeometry = useMemo(() => new ConeGeometry(0.055, 0.13, 3), []);
  const chevronMaterial = useMemo(() => new MeshBasicMaterial({ color: palette.accent }), [palette.accent]);

  const screen = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN.width;
    canvas.height = SCREEN.height;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return { texture, ctx: canvas.getContext("2d") };
  }, []);

  useEffect(() => () => screen.texture.dispose(), [screen]);

  const goTo = (index: number) => {
    const state = walker.current;
    const from = state.hold > 0 || state.segment >= state.path.length - 1
      ? state.path[state.path.length - 1]
      : state.path[state.segment + 1];
    const here = pointAt(state.path, Math.min(state.segment, state.path.length - 1), state.along);
    walker.current = {
      path: [here, ...routeBetween(from, PINS[index].at)].filter((p, i, all) => i === 0 || distance(p, all[i - 1]) > 1e-3),
      segment: 0,
      along: 0,
      dest: index,
      hold: 0,
    };
    setDest(index);
  };

  useFrame((frame, delta) => {
    if (!active) return;
    const state = walker.current;
    const time = frame.clock.elapsedTime;
    if (!paused) {
      if (state.hold > 0) {
        state.hold -= delta;
        if (state.hold <= 0) goTo((state.dest + 1) % PINS.length);
      } else {
        state.along += WALK_SPEED * delta;
        const length = distance(state.path[state.segment], state.path[state.segment + 1] ?? state.path[state.segment]);
        if (state.along >= length) {
          if (state.segment < state.path.length - 2) {
            state.along -= length;
            state.segment += 1;
          } else {
            state.along = length;
            state.hold = HOLD_SECONDS;
          }
        }
      }
    }

    const position = pointAt(state.path, state.segment, state.along);
    dotRef.current?.position.set(position[0], 0.07, position[1]);
    const pulse = (time * 0.8) % 1;
    ringRef.current?.position.set(PINS[state.dest].at[0], 0.02, PINS[state.dest].at[1]);
    ringRef.current?.scale.setScalar(0.5 + pulse * 1.4);

    const trail = trailRef.current;
    if (trail) {
      const phase = paused ? 0 : (time * 0.7) % 1;
      for (let i = 0; i < CHEVRONS; i++) {
        const step = walkPoint(state, (i + phase) * CHEVRON_GAP + 0.08);
        dummy.scale.setScalar(step ? 1 : 0);
        if (step) {
          dummy.position.set(step.point[0], 0.045, step.point[1]);
          dummy.rotation.set(Math.PI / 2, step.heading, 0, "YXZ");
        }
        dummy.updateMatrix();
        trail.setMatrixAt(i, dummy.matrix);
      }
      trail.instanceMatrix.needsUpdate = true;
    }

    if (phoneRef.current) phoneRef.current.position.y = 0.2 + (paused ? 0 : Math.sin(time * 1.1) * 0.035);

    frameCount.current += 1;
    if (screen.ctx && frameCount.current % 2 === 0) {
      const arrived = state.hold > 0;
      const turn = nextTurn(state.path, state.segment);
      const metres = Math.round(remainingOf(state) * METRES_PER_UNIT);
      const pending = turn === "left" ? copy.turnLeft : turn === "right" ? copy.turnRight : copy.straight;
      drawScreen(screen.ctx, {
        time,
        turn: arrived ? "straight" : turn,
        title: `→ ${copy[PINS[state.dest].key]}`,
        instruction: arrived ? copy.arrived : `${pending} · ${metres} m`,
        accent: palette.accent,
        arrived,
      });
      screen.texture.needsUpdate = true;
    }
  });

  useEffect(() => {
    if (active) setNote("");
  }, [active]);

  const pick = (index: number) => (event: ThreeEvent<MouseEvent>) => {
    if (!isFreeClick(event)) return;
    event.stopPropagation();
    goTo(index);
  };

  return (
    <group>
      <group position={[0.28, -0.5, -0.1]} rotation={[0.72, -0.6, 0.1]} scale={0.7}>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[3, 0.04, 2.3]} />
          <meshStandardMaterial color={palette.surface} />
        </mesh>
        {ROOMS.map(([x, z]) => (
          <mesh key={`${x}:${z}`} position={[x, 0.11, z]}>
            <boxGeometry args={[0.92, 0.22, 0.6]} />
            <meshStandardMaterial color={palette.surfaceHi} />
          </mesh>
        ))}
        <instancedMesh ref={trailRef} args={[chevronGeometry, chevronMaterial, CHEVRONS]} frustumCulled={false} />
        <mesh ref={dotRef}>
          <sphereGeometry args={[0.075, 16, 12]} />
          <meshBasicMaterial color={palette.ink} />
        </mesh>
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.15, 32]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.8} />
        </mesh>
        {PINS.map(({ at, key }, index) => (
          <group key={key} position={[at[0], 0, at[1]]}>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.6]} />
              <meshBasicMaterial color={dest === index ? palette.accent : palette.muted} />
            </mesh>
            <mesh position={[0, 0.64, 0]}>
              <sphereGeometry args={[0.1, 20, 14]} />
              <meshStandardMaterial color={dest === index ? palette.accent : palette.ink} />
            </mesh>
            <Label text={copy[key]} position={[0, 0.86, 0]} height={0.15} color={dest === index ? palette.accent : palette.ink} />
            <mesh position={[0, 0.5, 0]} onClick={pick(index)} {...hoverCursor}>
              <sphereGeometry args={[0.42, 8, 6]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={phoneRef} position={[-0.92, 0.2, 0.72]} rotation={[-0.06, 0.42, -0.07]} scale={0.72}>
        <mesh geometry={body} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#0d0f13" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.76, 1.56]} />
          <meshBasicMaterial map={screen.texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
