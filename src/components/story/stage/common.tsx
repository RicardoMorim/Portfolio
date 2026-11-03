"use client";
import { useEffect, useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { AdditiveBlending, CanvasTexture, NormalBlending, SRGBColorSpace, type Blending } from "three";
import type { StageCopy } from "@/language/config";

export interface Palette {
  ink: string;
  muted: string;
  surface: string;
  surfaceHi: string;
  accent: string;
  cool: string;
  danger: string;
  dark: boolean;
}

export interface SceneProps {
  active: boolean;
  paused: boolean;
  palette: Palette;
  copy: StageCopy;
}

const DARK: Palette = {
  ink: "#f1ede4",
  muted: "#7f8187",
  surface: "#15181d",
  surfaceHi: "#2b303a",
  accent: "#ff7a45",
  cool: "#6fd3ff",
  danger: "#ff4d6d",
  dark: true,
};

const LIGHT: Palette = {
  ink: "#131417",
  muted: "#77787c",
  surface: "#dcd6c9",
  surfaceHi: "#c4bdae",
  accent: "#c2410c",
  cool: "#0369a1",
  danger: "#be123c",
  dark: false,
};

/** Light adds up on the dark theme; on paper it has to be painted normally. */
export const glowBlending = (palette: Palette): Blending => (palette.dark ? AdditiveBlending : NormalBlending);

/** Soft round falloff shared by every glow sprite and spark. */
export function useGlowTexture(): CanvasTexture {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.25, "rgba(255,255,255,0.55)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export const paletteFor = (theme: string): Palette => (theme === "light" ? LIGHT : DARK);

/** Meshes stay clickable through the page, so ignore clicks that belong to real controls. */
export function isFreeClick(event: ThreeEvent<MouseEvent>): boolean {
  const target = event.nativeEvent.target as Element | null;
  return !target?.closest?.("a, button, input, textarea, label, dialog");
}

export const hoverCursor = {
  onPointerOver: () => {
    document.body.style.cursor = "pointer";
  },
  onPointerOut: () => {
    document.body.style.cursor = "";
  },
};

interface LabelProps {
  text: string;
  position?: [number, number, number];
  height?: number;
  color: string;
}

const LABEL_PX = 48;

/** Text as a camera-facing sprite; the mono face is read from the page's CSS variable. */
export function Label({ text, position, height = 0.13, color }: LabelProps) {
  const { texture, aspect } = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const family = getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace";
    const font = `500 ${LABEL_PX}px ${family}, monospace`;
    if (!ctx) return { texture: new CanvasTexture(canvas), aspect: 1 };
    ctx.font = font;
    canvas.width = Math.ceil(ctx.measureText(text).width) + 8;
    canvas.height = Math.ceil(LABEL_PX * 1.3);
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(text, 4, canvas.height / 2);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return { texture: map, aspect: canvas.width / canvas.height };
  }, [text, color]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[height * aspect, height, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}
