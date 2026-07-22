/**
 * Solea Nail Designer — preview domain logic.
 *
 * Reuses the original project's actual nail silhouette paths (shapePaths.ts,
 * authoring viewBox 100 × ~310) and a curated slice of its salon palette
 * (palette.ts), plus its Finish concept (types.ts). The single workflow: pick a
 * shape, colour and finish and watch the hand render — so a customer sees the
 * result instead of imagining it.
 */

export type NailShape = "almond" | "coffin" | "square" | "stiletto" | "oval" | "squoval";
export type Finish = "glossy" | "matte" | "glitter" | "chrome";

export const NAIL_VIEW = { w: 100, h: 310 };

/** Verbatim silhouettes from the source shapePaths.ts BASE_PATHS. */
export const SHAPE_PATHS: Record<NailShape, string> = {
  almond:
    "M 23 298 C 11 296 6 208 12 122 C 16 58 36 20 50 11 C 64 20 84 58 88 122 C 94 208 89 296 77 298 C 58 304 42 304 23 298 Z",
  coffin:
    "M 20 299 C 10 299 8 234 11 170 L 24 33 L 76 33 L 89 170 C 92 234 90 299 80 299 C 58 305 42 305 20 299 Z",
  square:
    "M 9 42 L 9 256 C 9 285 26 301 50 301 C 74 301 91 285 91 256 L 91 42 L 9 42 Z",
  stiletto:
    "M 22 299 C 11 297 9 232 14 168 C 20 96 40 40 50 8 C 60 40 80 96 86 168 C 91 232 89 297 78 299 C 58 305 42 305 22 299 Z",
  oval:
    "M 14 200 C 14 96 28 16 50 16 C 72 16 86 96 86 200 C 86 268 72 302 50 302 C 28 302 14 268 14 200 Z",
  squoval:
    "M 11 60 C 11 36 22 26 36 24 C 44 23 56 23 64 24 C 78 26 89 36 89 60 L 89 256 C 89 285 73 301 50 301 C 27 301 11 285 11 256 L 11 60 Z",
};

export const SHAPES: { id: NailShape; label: string }[] = [
  { id: "almond", label: "Almond" },
  { id: "coffin", label: "Coffin" },
  { id: "squoval", label: "Squoval" },
  { id: "stiletto", label: "Stiletto" },
  { id: "oval", label: "Oval" },
  { id: "square", label: "Square" },
];

export const FINISHES: { id: Finish; label: string }[] = [
  { id: "glossy", label: "Glossy" },
  { id: "matte", label: "Matte" },
  { id: "glitter", label: "Glitter" },
  { id: "chrome", label: "Chrome" },
];

/** Curated subset of the source salon palette. */
export const PALETTE: string[] = [
  "#f9a8d4",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#fb7185",
  "#e11d48",
  "#f97316",
  "#facc15",
  "#34d399",
  "#22d3ee",
  "#818cf8",
  "#a855f7",
  "#f5f5f5",
  "#262626",
];

/** Per-finger presentation for the graduated hand row (thumb → pinky). */
export const FINGERS = [
  { key: "thumb", scale: 0.86, lift: 30 },
  { key: "index", scale: 0.95, lift: 8 },
  { key: "middle", scale: 1.0, lift: 0 },
  { key: "ring", scale: 0.95, lift: 6 },
  { key: "pinky", scale: 0.78, lift: 24 },
] as const;

export function shapeLabel(shape: NailShape): string {
  return SHAPES.find((s) => s.id === shape)?.label ?? shape;
}
export function finishLabel(finish: Finish): string {
  return FINISHES.find((f) => f.id === finish)?.label ?? finish;
}
