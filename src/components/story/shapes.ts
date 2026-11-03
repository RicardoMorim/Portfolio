// Point clouds for the story core. Every shape returns `count * 3` floats, so the cloud can
// flow from any shape into any other point-for-point. Logos and text are sampled from a
// 2D canvas, which lets a hovered skill turn into its real logo.
import type { ReactElement } from "react";
import type { IconType } from "react-icons";
import type { ShapeBuilder } from "./stage/store";

type Vec3 = [number, number, number];

const RASTER_SIZE = 220;
const RASTER_WORLD = 3.3;
const RASTER_DEPTH = 0.16;
const ROW_AI_PX = 92;
const ROW_CODE_PX = 62;
const ROW_GAP = 9;
const ROW_MARGIN = 3;

function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number): number {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

function fill(count: number, seed: number, place: (i: number, rand: () => number) => Vec3): Float32Array {
  const rand = seeded(seed);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) out.set(place(i, rand), i * 3);
  return out;
}

/** Unformed data: where the hero's points start before they assemble. */
export const scatterShape: ShapeBuilder = (count) =>
  fill(count, 11, (_, rand) => {
    const r = 2.2 + rand() * 2.6;
    const angle = rand() * Math.PI * 2;
    const y = rand() * 2 - 1;
    const ring = Math.sqrt(1 - y * y);
    return [Math.cos(angle) * ring * r, y * r, Math.sin(angle) * ring * r];
  });

/** A three-armed spiral: everything built along the way. */
export const spiralShape: ShapeBuilder = (count) =>
  fill(count, 67, (i, rand) => {
    const radius = 0.15 + 2.6 * Math.sqrt(rand());
    const angle = (i % 3) * ((Math.PI * 2) / 3) + radius * 1.5 + gaussian(rand) * 0.18;
    return [Math.cos(angle) * radius, gaussian(rand) * 0.14 * (1 - radius / 3), Math.sin(angle) * radius];
  });

/** A cubic lattice: an organised toolkit, shown until a skill is picked. */
export const latticeShape: ShapeBuilder = (count) =>
  fill(count, 71, (_, rand) => {
    const steps = [-1.2, -0.4, 0.4, 1.2];
    const pick = () => steps[Math.floor(rand() * steps.length)];
    const along = rand() * 2.4 - 1.2;
    const axis = Math.floor(rand() * 3);
    if (axis === 0) return [along, pick(), pick()];
    if (axis === 1) return [pick(), along, pick()];
    return [pick(), pick(), along];
  });

/** A graduation cap: board, skull cup and a hanging tassel. */
export const capShape: ShapeBuilder = (count) =>
  fill(count, 89, (_, rand) => {
    const part = rand();
    if (part < 0.55) {
      const [u, v] = [rand() * 2 - 1, rand() * 2 - 1];
      return [(u + v) * 1.25, 0.45 + (u - v) * 0.09, (u - v) * 0.8];
    }
    if (part < 0.9) {
      const angle = rand() * Math.PI * 2;
      return [Math.cos(angle) * 0.8, 0.35 - rand() * 0.8, Math.sin(angle) * 0.55];
    }
    if (part < 0.96) {
      const t = rand();
      return [t * 1.15, 0.5 - t * 0.02, t * 0.05];
    }
    return [1.15 + gaussian(rand) * 0.05, 0.45 - rand() * 0.95, 0.05 + gaussian(rand) * 0.05];
  });

function sampleCanvas(draw: (ctx: CanvasRenderingContext2D) => void, count: number): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = RASTER_SIZE;
  canvas.height = RASTER_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return scatterShape(count);
  draw(ctx);
  const { data } = ctx.getImageData(0, 0, RASTER_SIZE, RASTER_SIZE);
  const opaque: number[] = [];
  for (let i = 0; i < RASTER_SIZE * RASTER_SIZE; i++) {
    if (data[i * 4 + 3] > 128) opaque.push(i);
  }
  if (opaque.length === 0) return scatterShape(count);
  return fill(count, 97, (_, rand) => {
    const pixel = opaque[Math.floor(rand() * opaque.length)];
    const x = pixel % RASTER_SIZE;
    const y = Math.floor(pixel / RASTER_SIZE);
    return [
      ((x + rand()) / RASTER_SIZE - 0.5) * RASTER_WORLD,
      (0.5 - (y + rand()) / RASTER_SIZE) * RASTER_WORLD,
      (rand() - 0.5) * RASTER_DEPTH,
    ];
  });
}

interface IconElementProps {
  attr?: { viewBox?: string };
  children?: ReactElement<{ d?: string; fillRule?: CanvasFillRule }>[];
}

/** Reads the vector paths out of a react-icons component and turns them into points. */
export function iconShape(Icon: IconType): ShapeBuilder {
  return (count) => {
    const element = Icon({}) as unknown as ReactElement<IconElementProps>;
    const [, , width = 24, height = 24] = (element.props.attr?.viewBox ?? "0 0 24 24").split(" ").map(Number);
    const paths = element.props.children ?? [];
    return sampleCanvas((ctx) => {
      const scale = (RASTER_SIZE * 0.9) / Math.max(width, height);
      ctx.translate((RASTER_SIZE - width * scale) / 2, (RASTER_SIZE - height * scale) / 2);
      ctx.scale(scale, scale);
      paths.forEach((path) => {
        if (path.props.d) ctx.fill(new Path2D(path.props.d), path.props.fillRule ?? "nonzero");
      });
    }, count);
  };
}

export function textShape(text: string, font: string): ShapeBuilder {
  return (count) =>
    sampleCanvas((ctx) => {
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, RASTER_SIZE / 2, RASTER_SIZE / 2);
    }, count);
}

/** The two halves of the hero's idea, as text: the code, and the AI it wraps. */
function drawAi(ctx: CanvasRenderingContext2D): void {
  ctx.font = "800 104px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", RASTER_SIZE / 2, RASTER_SIZE / 2 + 4);
}

/** Lays `<`, `AI` and `/>` out in one measured row, so no piece can land on another. */
function drawCodeRow(ctx: CanvasRenderingContext2D, part: "ai" | "code"): void {
  const aiFont = (scale: number) => `800 ${ROW_AI_PX * scale}px system-ui, sans-serif`;
  const codeFont = (scale: number) => `700 ${ROW_CODE_PX * scale}px ui-monospace, Consolas, monospace`;
  const measure = (font: string, text: string) => {
    ctx.font = font;
    return ctx.measureText(text).width;
  };
  const natural = measure(codeFont(1), "<") + measure(aiFont(1), "AI") + measure(codeFont(1), "/>");
  const scale = Math.min((RASTER_SIZE - ROW_MARGIN * 2 - ROW_GAP * 2) / natural, 1);
  const [open, ai, close] = [
    measure(codeFont(scale), "<"),
    measure(aiFont(scale), "AI"),
    measure(codeFont(scale), "/>"),
  ];
  const left = (RASTER_SIZE - open - ai - close - ROW_GAP * 2) / 2;
  const middle = RASTER_SIZE / 2;

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  if (part === "ai") {
    ctx.font = aiFont(scale);
    ctx.fillText("AI", left + open + ROW_GAP, middle + 3);
    return;
  }
  ctx.font = codeFont(scale);
  ctx.fillText("<", left, middle);
  ctx.fillText("/>", left + open + ai + ROW_GAP * 2, middle);
}

/** Which points are code, and so become the shield: two in every five. */
export const isShieldPoint = (index: number): boolean => index % 5 < 2;

function drawShieldOutline(ctx: CanvasRenderingContext2D): void {
  const s = RASTER_SIZE;
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(s * 0.5, s * 0.04);
  ctx.quadraticCurveTo(s * 0.7, s * 0.14, s * 0.9, s * 0.15);
  ctx.quadraticCurveTo(s * 0.93, s * 0.68, s * 0.5, s * 0.97);
  ctx.quadraticCurveTo(s * 0.07, s * 0.68, s * 0.1, s * 0.15);
  ctx.quadraticCurveTo(s * 0.3, s * 0.14, s * 0.5, s * 0.04);
  ctx.stroke();
}

/** `<AI/>`: the code points hold the brackets, the rest spell the letters. */
export const codedAiShape: ShapeBuilder = (count) => {
  const ai = sampleCanvas((ctx) => drawCodeRow(ctx, "ai"), count);
  const brackets = sampleCanvas((ctx) => drawCodeRow(ctx, "code"), count);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) out.set((isShieldPoint(i) ? brackets : ai).subarray(i * 3, i * 3 + 3), i * 3);
  return out;
};

/** The same letters, with the code points now closed around them as a shield. */
export const shieldedAiShape: ShapeBuilder = (count) => {
  const ai = sampleCanvas(drawAi, count);
  const shield = sampleCanvas(drawShieldOutline, count);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const k = i * 3;
    if (isShieldPoint(i)) {
      out.set([shield[k] * 1.08, shield[k + 1] * 1.08, shield[k + 2]], k);
    } else {
      out.set([ai[k] * 1.12, ai[k + 1] * 1.12 + 0.12, ai[k + 2]], k);
    }
  }
  return out;
};
