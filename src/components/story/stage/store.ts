// Tiny bridge between the DOM story and the WebGL stage. The stage reads these fields every
// frame, so hovering a skill never re-renders the canvas; only `note` has React subscribers.

export type ShapeBuilder = (count: number) => Float32Array;

export interface ShapeRequest {
  id: string;
  build: ShapeBuilder;
}

type Listener = () => void;

const listeners = new Set<Listener>();
let note = "";

export const stage = {
  /** Shape a DOM interaction asked for; wins over the scene's own shape while set. */
  request: null as ShapeRequest | null,
  /** Hero only: true while the shield is closed around the mind. */
  shielded: false,
  /** Increments on every confetti burst of the point cloud. */
  bursts: 0,
  /** Increments on every thrown graduation cap. */
  tosses: 0,
  /** Pointer position, -0.5..0.5 from the viewport centre. */
  pointer: { x: 0, y: 0 },
};

export function requestShape(request: ShapeRequest | null): void {
  stage.request = request;
}

export function setShielded(next: boolean): void {
  stage.shielded = next;
}

export function burst(): void {
  stage.bursts += 1;
}

export function tossCap(): void {
  stage.tosses += 1;
  stage.bursts += 1;
}

/** Live text shown next to the scene caption (scores, status, jokes). */
export function setNote(next: string): void {
  if (next === note) return;
  note = next;
  listeners.forEach((listener) => listener());
}

export const getNote = (): string => note;
export const getServerNote = (): string => "";

export function subscribeNote(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
