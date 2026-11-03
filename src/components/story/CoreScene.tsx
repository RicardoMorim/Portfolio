"use client";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Color, type Group, NormalBlending, type Points, type ShaderMaterial } from "three";
import { FaPaperPlane } from "react-icons/fa6";
import type { StageCopy } from "@/language/config";
import {
  capShape,
  codedAiShape,
  iconShape,
  isShieldPoint,
  latticeShape,
  scatterShape,
  shieldedAiShape,
  spiralShape,
  textShape,
} from "./shapes";
import { paletteFor, type SceneProps } from "./stage/common";
import { stage, type ShapeRequest } from "./stage/store";
import AgentCrew from "./stage/AgentCrew";
import PhoneAR from "./stage/PhoneAR";
import BuildSite from "./stage/BuildSite";
import ThreatDefense from "./stage/ThreatDefense";

export interface CoreSceneProps {
  theme: string;
  reducedMotion: boolean;
  compact: boolean;
  scene: number;
  copy: StageCopy;
}

interface PointFrame {
  shape: ShapeRequest | null;
  x: number;
  scale: number;
  opacity: number;
  /** Round shapes turn freely; logos and glyphs only sway so they stay readable. */
  spin: boolean;
}

const DESKTOP_POINTS = 5200;
const COMPACT_POINTS = 2800;
const ACCENT_SHARE = 0.14;
const MORPH_SECONDS = 2.4;
const GRAVITY = 15;
const TOSS_SPEED = 7.5;
const TOSS_SPIN = 15;

const hidden: PointFrame = { shape: null, x: 0.6, scale: 0.4, opacity: 0, spin: true };
const POINT_FRAMES: readonly PointFrame[] = [
  { shape: { id: "coded-ai", build: codedAiShape }, x: 0.5, scale: 1, opacity: 1, spin: false },
  hidden,
  hidden,
  hidden,
  hidden,
  { shape: { id: "spiral", build: spiralShape }, x: 0, scale: 1.35, opacity: 0.3, spin: true },
  { shape: { id: "lattice", build: latticeShape }, x: 0.62, scale: 0.72, opacity: 0.9, spin: true },
  { shape: { id: "quote", build: textShape("“", "700 300px Georgia, serif") }, x: 0.72, scale: 0.7, opacity: 0.6, spin: false },
  { shape: { id: "cap", build: capShape }, x: 0.6, scale: 0.68, opacity: 1, spin: false },
  { shape: { id: "plane", build: iconShape(FaPaperPlane) }, x: 0.62, scale: 0.62, opacity: 0.55, spin: false },
];

const SHIELDED_AI: ShapeRequest = { id: "shielded-ai", build: shieldedAiShape };

const CHAPTERS: readonly { scene: number; Component: ComponentType<SceneProps> }[] = [
  { scene: 1, Component: PhoneAR },
  { scene: 2, Component: BuildSite },
  { scene: 3, Component: ThreatDefense },
  { scene: 4, Component: AgentCrew },
];

const vertexShader = /* glsl */ `
  attribute float aSeed;
  attribute vec3 aColor;
  attribute float aRole;
  uniform vec3 uAccent;
  uniform float uShield;
  uniform float uTime;
  uniform float uSize;
  uniform float uMotion;
  uniform float uBurst;
  uniform vec2 uMouse;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    vec3 p = position;
    p += uMotion * 0.03 * vec3(
      sin(uTime * 0.9 + aSeed * 6.283),
      cos(uTime * 0.7 + aSeed * 12.0),
      sin(uTime * 0.8 + aSeed * 3.0)
    );
    p += normalize(p + 0.001) * uBurst * (0.6 + aSeed * 2.4);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec2 away = world.xy - uMouse;
    float reach = smoothstep(0.95, 0.0, length(away));
    world.xy += normalize(away + 0.0001) * reach * reach * 0.75 * uMotion;
    world.z += reach * 0.5 * uMotion;
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aSeed * 0.9) / -mv.z;
    vColor = mix(aColor, uAccent, aRole * uShield);
    vDepth = smoothstep(9.0, 4.0, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * uOpacity * (0.4 + 0.6 * vDepth));
  }
`;

function wrapAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function CorePoints({ theme, reducedMotion, compact, scene }: CoreSceneProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();
  const count = compact ? COMPACT_POINTS : DESKTOP_POINTS;
  const cache = useRef(new Map<string, Float32Array>());
  const shapeId = useRef("scatter");
  const settling = useRef(0);
  const seen = useRef({ bursts: stage.bursts, tosses: stage.tosses });
  const toss = useRef({ y: 0, vy: 0, spin: 0 });

  const { seeds, positions, roles } = useMemo(() => {
    const seedArray = new Float32Array(count).map((_, i) => ((i * 2654435761) % 1000) / 1000);
    return {
      seeds: seedArray,
      positions: scatterShape(count),
      roles: new Float32Array(count).map((_, i) => (isShieldPoint(i) ? 1 : 0)),
    };
  }, [count]);
  const colors = useMemo(() => new Float32Array(count * 3), [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0 },
      uMotion: { value: 1 },
      uOpacity: { value: 0 },
      uBurst: { value: 0 },
      uShield: { value: 0 },
      uAccent: { value: new Color() },
      uMouse: { value: [99, 99] },
    }),
    [],
  );

  useEffect(() => {
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!points || !material) return;
    const { ink, accent } = paletteFor(theme);
    const [inkColor, accentColor] = [new Color(ink), new Color(accent)];
    for (let i = 0; i < count; i++) {
      const tone = seeds[i] < ACCENT_SHARE ? accentColor : inkColor;
      colors.set([tone.r, tone.g, tone.b], i * 3);
    }
    points.geometry.attributes.aColor.needsUpdate = true;
    material.uniforms.uAccent.value.set(accent);
    material.blending = theme === "light" ? NormalBlending : AdditiveBlending;
    material.needsUpdate = true;
  }, [colors, count, seeds, theme]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    const material = materialRef.current;
    if (!points || !material) return;

    const frame = POINT_FRAMES[scene] ?? POINT_FRAMES[0];
    const override = scene === 6 || scene === 8 ? stage.request : null;
    const heroShielded = scene === 0 && stage.shielded;
    const request = heroShielded ? SHIELDED_AI : (override ?? frame.shape);
    if (request && request.id !== shapeId.current) {
      shapeId.current = request.id;
      settling.current = MORPH_SECONDS;
      if (!cache.current.has(request.id)) cache.current.set(request.id, request.build(count));
    }
    const target = cache.current.get(shapeId.current);

    if (settling.current > 0 && target) {
      settling.current -= delta;
      for (let i = 0; i < count * 3; i++) {
        const rate = reducedMotion ? 1 : 1 - Math.exp(-delta * (2.6 + seeds[Math.floor(i / 3)] * 5));
        positions[i] += (target[i] - positions[i]) * rate;
      }
      points.geometry.attributes.position.needsUpdate = true;
    }

    if (seen.current.bursts !== stage.bursts) {
      seen.current.bursts = stage.bursts;
      material.uniforms.uBurst.value = reducedMotion ? 0 : 1;
    }
    if (seen.current.tosses !== stage.tosses) {
      seen.current.tosses = stage.tosses;
      if (!reducedMotion) toss.current = { ...toss.current, vy: TOSS_SPEED, spin: TOSS_SPIN };
    }
    material.uniforms.uBurst.value *= Math.exp(-delta * 3);

    material.uniforms.uShield.value += ((scene === 0 ? 1 : 0) - material.uniforms.uShield.value) * (1 - Math.exp(-delta * 3));

    const flight = toss.current;
    if (flight.vy !== 0 || flight.y > 0) {
      flight.vy -= GRAVITY * delta;
      flight.y += flight.vy * delta;
      if (flight.y <= 0) toss.current = { y: 0, vy: 0, spin: 0 };
    }

    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 4);
    const time = state.clock.elapsedTime;
    const opacity = frame.opacity * (compact && scene !== 0 ? 0.42 : 1);
    const x = compact ? 0 : frame.x * (viewport.width / 2);
    const yBase = compact ? viewport.height * (scene === 0 ? 0.205 : 0.2) : 0;
    const scale = frame.scale * (compact ? Math.min(viewport.width / 4.6, 0.8) : Math.min(viewport.width / 8, 1));

    points.position.x += (x - points.position.x) * ease;
    points.position.y += (yBase + flight.y - points.position.y) * (flight.y > 0 ? 1 : ease);
    points.scale.setScalar(points.scale.x + (scale - points.scale.x) * ease);
    material.uniforms.uOpacity.value += (opacity - material.uniforms.uOpacity.value) * (opacity === 0 ? Math.min(ease * 3, 1) : ease);
    points.visible = material.uniforms.uOpacity.value > 0.01;

    if (!reducedMotion) {
      const swaying = !frame.spin || override !== null;
      if (swaying) {
        const sway = Math.sin(time * 0.7) * 0.32 + flight.spin * (flight.y > 0 ? time : 0);
        points.rotation.y = wrapAngle(points.rotation.y);
        points.rotation.y += (wrapAngle(sway) - points.rotation.y) * (flight.y > 0 ? 1 : ease);
      } else {
        points.rotation.y += delta * 0.08;
      }
      const tilt = shapeId.current === "cap" ? 0.5 : swaying ? 0.05 : 0.25;
      points.rotation.x += (tilt + stage.pointer.y * 0.25 - points.rotation.x) * ease;
    }

    material.uniforms.uTime.value = time;
    material.uniforms.uMotion.value = reducedMotion ? 0 : 1;
    material.uniforms.uMouse.value = [stage.pointer.x * viewport.width, -stage.pointer.y * viewport.height];
    material.uniforms.uSize.value = (compact ? 30 : 34) * state.viewport.dpr * Math.min(state.size.height / 900, 1.2);
  });

  return (
    <points ref={pointsRef} frustumCulled={false} rotation={[0.25, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aRole" args={[roles, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

interface ChapterSlotProps extends SceneProps {
  compact: boolean;
  Component: ComponentType<SceneProps>;
}

/** Places one bespoke chapter scene, pops it in and out, and tilts it towards the cursor. */
function ChapterSlot({ active, paused, compact, palette, copy, Component }: ChapterSlotProps) {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();
  const presence = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    presence.current += ((active ? 1 : 0) - presence.current) * (paused ? 1 : 1 - Math.exp(-delta * 5));
    const fit = compact ? Math.min(viewport.width / 4.1, 0.85) : Math.min(viewport.width / 8, 1.08);
    group.visible = presence.current > 0.01;
    group.scale.setScalar(fit * presence.current);
    group.position.set(compact ? 0 : viewport.width * 0.3, compact ? viewport.height * 0.22 : 0, 0);
    if (!paused) {
      group.rotation.y += (stage.pointer.x * 0.4 - group.rotation.y) * 0.06;
      group.rotation.x += (stage.pointer.y * 0.25 - group.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {mounted && <Component active={active} paused={paused} palette={palette} copy={copy} />}
    </group>
  );
}

function Lights({ theme }: { theme: string }) {
  const palette = paletteFor(theme);
  return (
    <>
      <ambientLight intensity={theme === "light" ? 1.9 : 1.1} />
      <directionalLight position={[3, 5, 6]} intensity={2.2} />
      <pointLight position={[-3, -2, 3]} intensity={14} color={palette.accent} />
    </>
  );
}

export default function CoreScene(props: CoreSceneProps) {
  const { theme, scene, reducedMotion, compact, copy } = props;
  const palette = useMemo(() => paletteFor(theme), [theme]);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      stage.pointer = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 };
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      eventSource={document.body}
      eventPrefix="client"
      aria-hidden="true"
    >
      <Lights theme={theme} />
      <CorePoints {...props} />
      {CHAPTERS.map(({ scene: id, Component }) => (
        <ChapterSlot
          key={id}
          active={scene === id}
          paused={reducedMotion}
          compact={compact}
          palette={palette}
          copy={copy}
          Component={Component}
        />
      ))}
    </Canvas>
  );
}
