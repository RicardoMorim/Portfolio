"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  CanvasTexture,
  Color,
  DoubleSide,
  type Group,
  IcosahedronGeometry,
  type Mesh,
  MeshBasicMaterial,
  type Points,
  SRGBColorSpace,
  Vector3,
  Vector4,
} from "three";
import BotModel from "./BotModel";
import { Label, glowBlending, hoverCursor, isFreeClick, useGlowTexture, type SceneProps } from "./common";
import { setNote } from "./store";

const THREATS = ["prompt injection", "jailbreak", "SQLi", "XSS", "SSRF", "secret leak", "poisoned model"];
const SLOTS = 5;
const AGENTS = 3;
const SPAWN_RADIUS = 2.05;
/** Attacks come from the right, so they never fly over the chapter text. */
const SPAWN_ARC = Math.PI * 1.15;
const SHIELD_RADIUS = 1.12;
const ORBIT_RADIUS = 0.8;
const AGENT_RANGE = 1.45;
const BASE_SPEED = 0.34;
const RESPAWN_SECONDS = 1.1;
const BEAM_SECONDS = 0.3;
const HITS = 6;
const SPARKS = 90;
const SPARKS_PER_BURST = 18;
const TRAIL_LENGTH = 0.62;
const OFFSCREEN = 99;
const AGENT_Y = -0.42;
const REVIEW = { width: 320, height: 220, worldWidth: 0.78 };
const REVIEW_ROW = 19;
const REVIEW_LOOP_SECONDS = 7;
const ALERT_RADIUS = 1.75;

interface ReviewState {
  time: number;
  title: string;
  reviewing: string;
  finding: string;
  fixed: string;
  font: string;
  accent: string;
  cool: string;
  danger: string;
}

interface Threat {
  angle: number;
  radius: number;
  speed: number;
  wait: number;
  z: number;
}

function spawn(wait: number): Threat {
  return {
    angle: (Math.random() - 0.5) * SPAWN_ARC,
    radius: SPAWN_RADIUS,
    speed: BASE_SPEED * (0.8 + Math.random() * 0.6),
    wait,
    z: (Math.random() - 0.5) * 0.5,
  };
}

/** A pull request under review: rows scroll, one gets flagged, then fixed, on a loop. */
function drawReview(ctx: CanvasRenderingContext2D, state: ReviewState): void {
  const { width, height } = REVIEW;
  const cycle = (state.time % REVIEW_LOOP_SECONDS) / REVIEW_LOOP_SECONDS;
  const flagged = cycle > 0.45 && cycle <= 0.75;
  const fixed = cycle > 0.75;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(9,12,16,0.82)";
  ctx.strokeStyle = state.cool;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(1, 1, width - 2, height - 2, 12);
  ctx.fill();
  ctx.stroke();

  ctx.textBaseline = "middle";
  ctx.font = `600 20px ${state.font}`;
  ctx.fillStyle = "#f1ede4";
  ctx.fillText(state.title, 16, 24, width - 32);

  const travelled = state.time * 16;
  const scroll = travelled % REVIEW_ROW;
  ctx.save();
  ctx.beginPath();
  ctx.rect(10, 44, width - 20, 134);
  ctx.clip();
  for (let row = 0; row < 8; row++) {
    const y = 48 + row * REVIEW_ROW - scroll;
    const index = Math.floor(travelled / REVIEW_ROW) + row;
    const indent = 14 + ((index * 7) % 3) * 14;
    const length = 70 + ((index * 53) % 150);
    ctx.fillStyle = index % 5 === 0 ? state.accent : index % 3 === 0 ? state.cool : "rgba(241,237,228,0.34)";
    ctx.fillRect(indent, y, length, 7);
  }
  ctx.restore();

  if (flagged || fixed) {
    ctx.fillStyle = flagged ? state.danger : state.cool;
    ctx.globalAlpha = 0.32;
    ctx.fillRect(10, 100, width - 20, 22);
    ctx.globalAlpha = 1;
    ctx.fillRect(10, 100, 5, 22);
  } else {
    ctx.fillStyle = state.cool;
    ctx.fillRect(10, 46 + (cycle / 0.45) * 130, width - 20, 2);
  }

  ctx.font = `600 18px ${state.font}`;
  ctx.fillStyle = flagged ? state.danger : state.cool;
  ctx.fillText(flagged ? state.finding : fixed ? state.fixed : state.reviewing, 16, height - 22, width - 32);
}

const shellVertex = /* glsl */ `
  attribute vec3 aBary;
  varying vec3 vBary;
  varying vec3 vDirection;
  varying vec3 vNormal;
  void main() {
    vBary = aBary;
    vDirection = normalize(position);
    vNormal = normalize(normalMatrix * normalize(position));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Geodesic tiles that stay faint until an impact sends a ripple across the sphere.
const shellFragment = /* glsl */ `
  uniform vec4 uHits[${HITS}];
  uniform vec3 uRest;
  uniform vec3 uAlarm;
  varying vec3 vBary;
  varying vec3 vDirection;
  varying vec3 vNormal;
  void main() {
    float edge = 1.0 - smoothstep(0.0, 0.06, min(vBary.x, min(vBary.y, vBary.z)));
    float fresnel = pow(1.0 - abs(vNormal.z), 2.2);
    float wave = 0.0;
    for (int i = 0; i < ${HITS}; i++) {
      float age = uHits[i].w;
      if (age < 0.0) continue;
      float d = acos(clamp(dot(vDirection, uHits[i].xyz), -1.0, 1.0));
      float front = exp(-pow((d - age * 2.4) * 6.0, 2.0));
      wave += (front + exp(-d * 5.0) * 0.8) * exp(-age * 2.6);
    }
    float rest = edge * (0.05 + 0.42 * fresnel) + fresnel * fresnel * 0.2;
    vec3 color = mix(uRest, uAlarm, clamp(wave * 1.6, 0.0, 1.0));
    gl_FragColor = vec4(color, clamp(rest + wave * (0.12 + edge * 0.85), 0.0, 1.0));
  }
`;

function buildShell(): IcosahedronGeometry {
  const geometry = new IcosahedronGeometry(SHIELD_RADIUS, 6);
  const count = geometry.attributes.position.count;
  const bary = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) bary[i * 3 + (i % 3)] = 1;
  geometry.setAttribute("aBary", new BufferAttribute(bary, 3));
  return geometry;
}

function useTrailTexture(): CanvasTexture {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const along = ctx.createLinearGradient(0, 0, 128, 0);
      along.addColorStop(0, "rgba(255,255,255,1)");
      along.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = along;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.lineTo(128, 6);
      ctx.lineTo(128, 10);
      ctx.fill();
      ctx.fillRect(0, 7, 10, 2);
    }
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** Celfocus: a model behind a shield, agents on patrol, and attacks the visitor can swat. */
export default function ThreatDefense({ active, paused, palette, copy }: SceneProps) {
  const threats = useRef<Threat[]>(Array.from({ length: SLOTS }, (_, i) => spawn(i * 0.9)));
  const groupRefs = useRef<(Group | null)[]>([]);
  const trailRefs = useRef<(Mesh | null)[]>([]);
  const agentRefs = useRef<(Group | null)[]>([]);
  const beamRefs = useRef<(Mesh | null)[]>([]);
  const beamTimers = useRef(Array.from({ length: AGENTS }, () => 0));
  const agentRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const eyesRef = useRef<Group>(null);
  const lampRef = useRef<Mesh>(null);
  const poke = useRef(0);
  const frameCount = useRef(0);
  const sparksRef = useRef<Points>(null);
  const score = useRef({ agents: 0, you: 0 });
  const nextHit = useRef(0);
  const nextSpark = useRef(0);
  const [names] = useState(() => Array.from({ length: SLOTS }, (_, i) => THREATS[i % THREATS.length]));
  const glow = useGlowTexture();
  const trail = useTrailTexture();
  const blending = glowBlending(palette);
  const shell = useMemo(buildShell, []);

  const hits = useMemo(() => Array.from({ length: HITS }, () => new Vector4(0, 0, 1, -1)), []);
  const shellUniforms = useMemo(() => ({ uHits: { value: hits }, uRest: { value: new Color() }, uAlarm: { value: new Color() } }), [hits]);
  const eyeMaterial = useMemo(() => new MeshBasicMaterial(), []);
  const review = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = REVIEW.width;
    canvas.height = REVIEW.height;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    const family = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";
    return { texture, ctx: canvas.getContext("2d"), font: `${family}, monospace` };
  }, []);
  const sparks = useMemo(
    () => ({
      positions: new Float32Array(SPARKS * 3).fill(OFFSCREEN),
      velocities: new Float32Array(SPARKS * 3),
      life: new Float32Array(SPARKS),
    }),
    [],
  );

  useEffect(() => {
    shellUniforms.uRest.value.set(palette.cool);
    shellUniforms.uAlarm.value.set(palette.danger);
  }, [palette, shellUniforms]);

  useEffect(() => () => review.texture.dispose(), [review]);

  const publish = () => {
    setNote(`${copy.youBlocked}: ${score.current.you} · ${copy.agentsBlocked}: ${score.current.agents}`);
  };

  useEffect(() => {
    if (active) publish();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-publish only when the scene or copy changes
  }, [active, copy]);

  const emitSparks = (x: number, y: number, z: number) => {
    for (let n = 0; n < SPARKS_PER_BURST; n++) {
      const i = nextSpark.current;
      nextSpark.current = (i + 1) % SPARKS;
      const direction = new Vector3().randomDirection().multiplyScalar(0.5 + Math.random() * 1.3);
      sparks.positions.set([x, y, z], i * 3);
      sparks.velocities.set([direction.x, direction.y, direction.z], i * 3);
      sparks.life[i] = 0.4 + Math.random() * 0.5;
    }
  };

  const neutralise = (index: number) => {
    const threat = threats.current[index];
    emitSparks(Math.cos(threat.angle) * threat.radius, Math.sin(threat.angle) * threat.radius, threat.z);
    threats.current[index] = spawn(RESPAWN_SECONDS);
  };

  const strikeShell = (x: number, y: number, z: number) => {
    const direction = new Vector3(x, y, z).normalize();
    hits[nextHit.current].set(direction.x, direction.y, direction.z, 0);
    nextHit.current = (nextHit.current + 1) % HITS;
  };

  useFrame((frame, delta) => {
    if (!active) return;
    const time = frame.clock.elapsedTime;

    frameCount.current += 1;
    if (review.ctx && frameCount.current % 2 === 0) {
      drawReview(review.ctx, {
        time,
        title: copy.prReview,
        reviewing: copy.reviewing,
        finding: copy.finding,
        fixed: copy.fixed,
        font: review.font,
        accent: palette.accent,
        cool: palette.cool,
        danger: palette.danger,
      });
      review.texture.needsUpdate = true;
    }
    if (paused) {
      eyeMaterial.color.set(palette.cool);
      return;
    }

    // Heads down on the review until something gets close, then it watches the threat.
    const nearest = threats.current
      .filter((threat) => threat.wait <= 0 && threat.radius < ALERT_RADIUS)
      .sort((a, b) => a.radius - b.radius)[0];
    const head = headRef.current;
    if (head) {
      const lookY = nearest ? Math.cos(nearest.angle) * 1.1 : 0.6;
      const lookX = nearest ? -Math.sin(nearest.angle) * 0.55 : 0.28;
      head.rotation.y += (lookY - head.rotation.y) * 0.1;
      head.rotation.x += (lookX - head.rotation.x) * 0.1;
    }
    eyeMaterial.color.set(nearest ? palette.danger : palette.cool);
    if (eyesRef.current) eyesRef.current.scale.y = (time * 0.27) % 1 < 0.035 ? 0.12 : 1;
    if (lampRef.current) lampRef.current.scale.setScalar(nearest ? 1.3 + Math.sin(time * 16) * 0.4 : 0.8);
    poke.current = Math.max(poke.current - delta * 1.6, 0);
    if (agentRef.current) {
      agentRef.current.position.y = AGENT_Y + Math.abs(Math.sin(time * 5)) * 0.015 + Math.sin(poke.current * Math.PI) * 0.26;
      agentRef.current.rotation.y = 0.12 + poke.current * Math.PI * 2;
    }

    hits.forEach((hit) => {
      if (hit.w < 0) return;
      hit.w = hit.w > 2 ? -1 : hit.w + delta;
    });

    const agents = Array.from({ length: AGENTS }, (_, i) => {
      const angle = time * 0.7 + (i / AGENTS) * Math.PI * 2;
      const position: [number, number, number] = [Math.cos(angle) * ORBIT_RADIUS, Math.sin(angle) * ORBIT_RADIUS, Math.sin(angle * 2) * 0.12];
      agentRefs.current[i]?.position.set(...position);
      return position;
    });

    beamTimers.current = beamTimers.current.map((value) => Math.max(value - delta, 0));
    threats.current.forEach((threat, index) => {
      const group = groupRefs.current[index];
      if (threat.wait > 0) {
        threat.wait -= delta;
        if (group) group.visible = false;
        return;
      }
      threat.radius -= threat.speed * delta;
      const x = Math.cos(threat.angle) * threat.radius;
      const y = Math.sin(threat.angle) * threat.radius;
      if (group) {
        group.visible = true;
        group.position.set(x, y, threat.z);
        group.children[0].rotation.x += delta * 2;
        group.children[0].rotation.y += delta * 3;
      }
      const streak = trailRefs.current[index];
      if (streak) {
        streak.rotation.z = threat.angle;
        streak.position.set(Math.cos(threat.angle) * TRAIL_LENGTH * 0.5, Math.sin(threat.angle) * TRAIL_LENGTH * 0.5, 0);
      }
      if (threat.radius < SHIELD_RADIUS) {
        strikeShell(x, y, threat.z);
        neutralise(index);
        return;
      }
      if (threat.radius < AGENT_RANGE) {
        const free = beamTimers.current.findIndex((value) => value === 0);
        const beam = beamRefs.current[free];
        if (free >= 0 && beam && Math.random() < delta * 1.6) {
          const [ax, ay] = agents[free];
          beamTimers.current[free] = BEAM_SECONDS;
          beam.position.set((ax + x) / 2, (ay + y) / 2, 0);
          beam.rotation.z = Math.atan2(y - ay, x - ax);
          beam.scale.x = Math.hypot(x - ax, y - ay);
          score.current.agents += 1;
          neutralise(index);
          publish();
        }
      }
    });

    beamRefs.current.forEach((beam, i) => {
      if (!beam) return;
      const left = beamTimers.current[i] / BEAM_SECONDS;
      beam.visible = left > 0;
      (beam.material as MeshBasicMaterial).opacity = left;
    });

    for (let i = 0; i < SPARKS; i++) {
      if (sparks.life[i] <= 0) continue;
      sparks.life[i] -= delta;
      const k = i * 3;
      if (sparks.life[i] <= 0) {
        sparks.positions[k + 2] = OFFSCREEN;
        continue;
      }
      sparks.velocities[k] *= 0.96;
      sparks.velocities[k + 1] *= 0.96;
      sparks.velocities[k + 2] *= 0.96;
      sparks.positions[k] += sparks.velocities[k] * delta;
      sparks.positions[k + 1] += sparks.velocities[k + 1] * delta;
      sparks.positions[k + 2] += sparks.velocities[k + 2] * delta;
    }
    if (sparksRef.current) sparksRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <sprite scale={[2.1, 2.1, 1]}>
        <spriteMaterial map={glow} color={palette.accent} blending={blending} transparent opacity={0.2} depthWrite={false} />
      </sprite>
      <group
        ref={agentRef}
        position={[-0.4, AGENT_Y, 0.12]}
        rotation={[0, 0.12, 0]}
        onClick={(event) => {
          if (!isFreeClick(event)) return;
          event.stopPropagation();
          poke.current = 1;
        }}
        {...hoverCursor}
      >
        <BotModel
          bodyColor={palette.dark ? "#e9e4da" : "#fbf8f1"}
          lampColor={palette.accent}
          eyeMaterial={eyeMaterial}
          headRef={headRef}
          eyesRef={eyesRef}
          lampRef={lampRef}
        />
      </group>
      <mesh position={[0.36, 0.0, 0.2]} rotation={[-0.04, -0.3, 0]}>
        <planeGeometry args={[REVIEW.worldWidth, (REVIEW.worldWidth * REVIEW.height) / REVIEW.width]} />
        <meshBasicMaterial map={review.texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <Label text="AI agent" position={[-0.4, -0.56, 0.4]} height={0.11} color={palette.ink} />

      <mesh>
        <torusGeometry args={[ORBIT_RADIUS, 0.003, 6, 120]} />
        <meshBasicMaterial color={palette.cool} transparent opacity={0.4} />
      </mesh>

      <mesh geometry={shell}>
        <shaderMaterial
          vertexShader={shellVertex}
          fragmentShader={shellFragment}
          uniforms={shellUniforms}
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={blending}
        />
      </mesh>

      {Array.from({ length: AGENTS }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            agentRefs.current[i] = el;
          }}
        >
          <mesh>
            <octahedronGeometry args={[0.055]} />
            <meshBasicMaterial color={palette.dark ? "#ffffff" : palette.cool} />
          </mesh>
          <sprite scale={[0.42, 0.42, 1]}>
            <spriteMaterial map={glow} color={palette.cool} blending={blending} transparent opacity={0.8} depthWrite={false} />
          </sprite>
        </group>
      ))}

      {Array.from({ length: AGENTS }, (_, i) => (
        <mesh
          key={i}
          visible={false}
          ref={(el) => {
            beamRefs.current[i] = el;
          }}
        >
          <planeGeometry args={[1, 0.022]} />
          <meshBasicMaterial color={palette.cool} blending={blending} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      ))}

      <points ref={sparksRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparks.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={glow} color={palette.danger} size={0.09} blending={blending} transparent depthWrite={false} />
      </points>

      {names.map((name, index) => (
        <group
          key={index}
          visible={false}
          ref={(el) => {
            groupRefs.current[index] = el;
          }}
        >
          <mesh>
            <octahedronGeometry args={[0.05]} />
            <meshBasicMaterial color={palette.dark ? "#ffe3e8" : palette.danger} />
          </mesh>
          <sprite scale={[0.36, 0.36, 1]}>
            <spriteMaterial map={glow} color={palette.danger} blending={blending} transparent depthWrite={false} />
          </sprite>
          <mesh
            ref={(el) => {
              trailRefs.current[index] = el;
            }}
          >
            <planeGeometry args={[TRAIL_LENGTH, 0.07]} />
            <meshBasicMaterial map={trail} color={palette.danger} blending={blending} transparent depthWrite={false} />
          </mesh>
          <Label text={name} position={[0.02, 0.17, 0]} height={0.1} color={palette.danger} />
          <mesh
            onClick={(event) => {
              if (!isFreeClick(event)) return;
              event.stopPropagation();
              score.current.you += 1;
              neutralise(index);
              publish();
            }}
            {...hoverCursor}
          >
            <sphereGeometry args={[0.3, 8, 6]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
