"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  CanvasTexture,
  type Group,
  type Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
  type Sprite,
  Vector3,
} from "three";
import BotModel from "./BotModel";
import { Label, glowBlending, hoverCursor, isFreeClick, useGlowTexture, type SceneProps } from "./common";
import { setNote, stage } from "./store";

const BOTS = [
  { name: "Planner", x: -1.2, z: 0.3 },
  { name: "Coder", x: -0.42, z: 0.62 },
  { name: "Reviewer", x: 0.42, z: 0.62 },
  { name: "Tester", x: 1.2, z: 0.3 },
] as const;
const BOT_Y = -0.92;
/** The loop: plan, code, review, fix what review found, review again, test, merge. */
const STEPS = [
  { bot: 0, log: 0 },
  { bot: 1, log: 1 },
  { bot: 2, log: 2 },
  { bot: 1, log: 3 },
  { bot: 2, log: 4 },
  { bot: 3, log: 5 },
];
const WORK_SECONDS = 1.5;
const PASS_SECONDS = 0.65;
const MERGED_SECONDS = 2.2;
const TERMINAL = { width: 640, height: 400, worldWidth: 2.1 };
const CHARS_PER_SECOND = 34;

interface Run {
  task: number;
  step: number;
  phase: "work" | "pass" | "merged";
  time: number;
}

interface TerminalLine {
  who: string;
  text: string;
}

interface TerminalState {
  prompt: string;
  lines: TerminalLine[];
  typing: number;
  merged: string | null;
  accent: string;
  cool: string;
  blink: boolean;
}

function drawTerminal(ctx: CanvasRenderingContext2D, font: string, state: TerminalState): void {
  const { width, height } = TERMINAL;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(11,13,17,0.92)";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(28 + i * 22, 26, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.textBaseline = "top";
  ctx.font = `500 21px ${font}`;
  ctx.fillStyle = state.accent;
  ctx.fillText("$", 24, 58);
  ctx.fillStyle = "#f1ede4";
  ctx.fillText(state.prompt, 46, 58, width - 70);

  state.lines.forEach((line, i) => {
    const y = 104 + i * 40;
    const visible = i === state.lines.length - 1 ? line.text.slice(0, state.typing) : line.text;
    ctx.font = `600 19px ${font}`;
    ctx.fillStyle = state.cool;
    ctx.fillText(line.who.toLowerCase().padEnd(9, " "), 24, y);
    ctx.font = `400 19px ${font}`;
    ctx.fillStyle = "#c9c6bf";
    ctx.fillText(visible, 150, y, width - 170);
  });

  if (state.merged) {
    ctx.font = `600 21px ${font}`;
    ctx.fillStyle = state.accent;
    ctx.fillText(`✓ ${state.merged}`, 24, 104 + state.lines.length * 40 + 2);
  } else if (state.blink) {
    ctx.fillStyle = state.accent;
    ctx.fillRect(24, 104 + state.lines.length * 40 + 2, 12, 22);
  }
}

/** Critical: the day job. A crew of agents takes a task through the loop in a real terminal. */
export default function AgentCrew({ active, paused, palette, copy }: SceneProps) {
  const run = useRef<Run>({ task: 0, step: 0, phase: "work", time: 0 });
  const merged = useRef(0);
  const frameCount = useRef(0);
  const pokes = useRef(BOTS.map(() => 0));
  const botRefs = useRef<(Group | null)[]>([]);
  const headRefs = useRef<(Group | null)[]>([]);
  const eyeRefs = useRef<(Group | null)[]>([]);
  const lampRefs = useRef<(Mesh | null)[]>([]);
  const tokenRef = useRef<Sprite>(null);
  const eyeMaterials = useMemo(() => BOTS.map(() => new MeshBasicMaterial()), []);
  const glow = useGlowTexture();
  const blending = glowBlending(palette);

  const terminal = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = TERMINAL.width;
    canvas.height = TERMINAL.height;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    const family = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";
    return { texture, ctx: canvas.getContext("2d"), font: `${family}, monospace` };
  }, []);

  useEffect(() => () => terminal.texture.dispose(), [terminal]);

  const publish = () => {
    setNote(`${copy.tasksMerged}: ${merged.current}`);
  };

  useEffect(() => {
    if (active) publish();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-publish only when the scene or copy changes
  }, [active, copy]);

  const headPosition = (index: number) => new Vector3(BOTS[index].x, BOT_Y + 0.62, BOTS[index].z);

  const newTask = () => {
    run.current = { task: (run.current.task + 1) % copy.agentTasks.length, step: 0, phase: "work", time: 0 };
  };

  useFrame((frame, delta) => {
    if (!active) return;
    const time = frame.clock.elapsedTime;
    const state = run.current;
    if (!paused) {
      state.time += delta;
      if (state.phase === "work" && state.time >= WORK_SECONDS) {
        state.time = 0;
        state.phase = state.step === STEPS.length - 1 ? "merged" : "pass";
        if (state.phase === "merged") {
          merged.current += 1;
          publish();
        }
      } else if (state.phase === "pass" && state.time >= PASS_SECONDS) {
        state.time = 0;
        state.phase = "work";
        state.step += 1;
      } else if (state.phase === "merged" && state.time >= MERGED_SECONDS) {
        newTask();
      }
    }

    const current = STEPS[state.step].bot;
    BOTS.forEach((_, i) => {
      const bot = botRefs.current[i];
      const head = headRefs.current[i];
      if (!bot || !head) return;
      const working = state.phase === "work" && current === i;
      const party = state.phase === "merged";
      pokes.current[i] = Math.max(pokes.current[i] - delta * 1.6, 0);
      const poke = pokes.current[i];
      const hop = paused ? 0 : (working ? Math.abs(Math.sin(time * 9)) * 0.05 : 0)
        + (party ? Math.abs(Math.sin(time * 7 + i)) * 0.16 : 0)
        + Math.sin(poke * Math.PI) * 0.34;
      bot.position.y = BOT_Y + hop;
      bot.rotation.y = poke * Math.PI * 2;

      // Idle bots watch the cursor; the one on duty looks at the terminal.
      const lookY = working ? -BOTS[i].x * 0.45 : stage.pointer.x * 1.3 - bot.position.x * 0.2;
      const lookX = working ? -0.45 : stage.pointer.y * 0.7;
      head.rotation.y += (lookY - head.rotation.y) * 0.12;
      head.rotation.x += (lookX - head.rotation.x) * 0.12;

      const blinking = (time * 0.27 + i * 0.37) % 1 < 0.035;
      const eyes = eyeRefs.current[i];
      if (eyes) eyes.scale.y = blinking ? 0.12 : 1;
      eyeMaterials[i].color.set(working || party ? palette.accent : palette.cool);
      const lamp = lampRefs.current[i];
      if (lamp) lamp.scale.setScalar(working ? 1.3 + Math.sin(time * 14) * 0.3 : 0.7);
    });

    const token = tokenRef.current;
    if (token) {
      token.visible = state.phase === "pass";
      if (state.phase === "pass") {
        const t = state.time / PASS_SECONDS;
        const from = headPosition(current);
        const to = headPosition(STEPS[state.step + 1].bot);
        token.position.lerpVectors(from, to, t);
        token.position.y += Math.sin(t * Math.PI) * 0.5;
      }
    }

    frameCount.current += 1;
    if (terminal.ctx && frameCount.current % 2 === 0) {
      const lines = STEPS.slice(0, state.step + 1).slice(-5).map((step) => ({ who: BOTS[step.bot].name, text: copy.agentLog[step.log] ?? "" }));
      const typing = state.phase === "work" ? Math.floor(state.time * CHARS_PER_SECOND) : Infinity;
      drawTerminal(terminal.ctx, terminal.font, {
        prompt: `agent run "${copy.agentTasks[state.task] ?? ""}"`,
        lines,
        typing,
        merged: state.phase === "merged" ? copy.merged : null,
        accent: palette.accent,
        cool: palette.cool,
        blink: time % 1 < 0.5,
      });
      terminal.texture.needsUpdate = true;
    }
  });

  const bodyColor = palette.dark ? "#e9e4da" : "#fbf8f1";
  const terminalHeight = (TERMINAL.worldWidth * TERMINAL.height) / TERMINAL.width;

  const poke = (index: number) => (event: ThreeEvent<MouseEvent>) => {
    if (!isFreeClick(event)) return;
    event.stopPropagation();
    pokes.current[index] = 1;
  };

  const pressTerminal = (event: ThreeEvent<MouseEvent>) => {
    if (!isFreeClick(event)) return;
    event.stopPropagation();
    newTask();
  };

  return (
    <group position={[0, 0.14, 0]} scale={0.84}>
      <sprite position={[0, 0.3, -0.5]} scale={[4.4, 3.4, 1]}>
        <spriteMaterial map={glow} color={palette.cool} blending={blending} transparent opacity={0.14} depthWrite={false} depthTest={false} />
      </sprite>
      <mesh position={[0, 0.42, 0]} rotation={[-0.05, 0, 0]} onClick={pressTerminal} {...hoverCursor}>
        <planeGeometry args={[TERMINAL.worldWidth, terminalHeight]} />
        <meshBasicMaterial map={terminal.texture} transparent toneMapped={false} />
      </mesh>

      <mesh position={[0, BOT_Y - 0.03, 0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.52, 96]} />
        <meshBasicMaterial color={palette.cool} transparent opacity={0.3} />
      </mesh>

      {BOTS.map((bot, i) => (
        <group
          key={bot.name}
          position={[bot.x, BOT_Y, bot.z]}
          ref={(el) => {
            botRefs.current[i] = el;
          }}
          onPointerOver={() => {
            hoverCursor.onPointerOver();
            setNote(`${bot.name}: ${copy.agentRoles[i] ?? ""}`);
          }}
          onPointerOut={() => {
            hoverCursor.onPointerOut();
            publish();
          }}
          onClick={poke(i)}
        >
          <BotModel
            bodyColor={bodyColor}
            lampColor={palette.accent}
            eyeMaterial={eyeMaterials[i]}
            headRef={(el) => {
              headRefs.current[i] = el;
            }}
            eyesRef={(el) => {
              eyeRefs.current[i] = el;
            }}
            lampRef={(el) => {
              lampRefs.current[i] = el;
            }}
          />
          <Label text={bot.name} position={[0, -0.09, 0.1]} height={0.11} color={palette.ink} />
        </group>
      ))}

      <sprite ref={tokenRef} visible={false} scale={[0.34, 0.34, 1]}>
        <spriteMaterial map={glow} color={palette.accent} blending={blending} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}
