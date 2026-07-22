"use client";

import { useId, useState } from "react";
import {
  FINGERS,
  FINISHES,
  NAIL_VIEW,
  PALETTE,
  SHAPES,
  SHAPE_PATHS,
  finishLabel,
  shapeLabel,
  type Finish,
  type NailShape,
} from "@/components/previews/solea/soleaLogic";

function FinishOverlay({ finish }: { finish: Finish }) {
  if (finish === "matte") return null;
  if (finish === "glossy") {
    return <ellipse cx="37" cy="90" rx="15" ry="60" fill="#ffffff" opacity="0.28" />;
  }
  if (finish === "chrome") {
    return (
      <>
        <rect x="0" y="0" width="100" height="150" fill="#ffffff" opacity="0.22" />
        <rect x="0" y="150" width="100" height="170" fill="#000000" opacity="0.16" />
        <rect x="30" y="0" width="12" height="320" fill="#ffffff" opacity="0.35" />
      </>
    );
  }
  // glitter — scattered sparkles
  const dots = [
    [30, 70], [55, 60], [44, 110], [64, 130], [34, 150], [58, 180],
    [46, 210], [30, 200], [66, 90], [50, 250], [40, 40], [60, 40],
  ];
  return (
    <>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.6} fill="#ffffff" opacity="0.65" />
      ))}
    </>
  );
}

function Nail({
  shape,
  color,
  finish,
  scale,
  lift,
}: {
  shape: NailShape;
  color: string;
  finish: Finish;
  scale: number;
  lift: number;
}) {
  const uid = useId().replace(/[:]/g, "");
  const clip = `clip-${uid}`;
  const h = 118 * scale;
  return (
    <svg
      viewBox={`0 0 ${NAIL_VIEW.w} ${NAIL_VIEW.h}`}
      style={{ height: h, marginTop: lift, width: "auto" }}
      role="presentation"
      aria-hidden
    >
      <defs>
        <clipPath id={clip}>
          <path d={SHAPE_PATHS[shape]} />
        </clipPath>
      </defs>
      <path d={SHAPE_PATHS[shape]} fill={color} />
      <g clipPath={`url(#${clip})`}>
        <FinishOverlay finish={finish} />
      </g>
      <path d={SHAPE_PATHS[shape]} fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5" />
    </svg>
  );
}

export function SoleaPreview() {
  const [shape, setShape] = useState<NailShape>("almond");
  const [color, setColor] = useState<string>("#ec4899");
  const [finish, setFinish] = useState<Finish>("glossy");

  return (
    <div className="solea sol-shell">
      {/* Brand bar */}
      <div className="sol-bar">
        <span className="sol-brand">
          <span className="sol-badge" aria-hidden>
            S
          </span>
          <span>
            <span className="sol-name">Solea</span>
            <span className="sol-tag">Nail Studio · Design your set</span>
          </span>
        </span>
        <span className="sol-summary" aria-live="polite">
          {shapeLabel(shape)} · {finishLabel(finish)}
        </span>
      </div>

      {/* Preview stage */}
      <div className="sol-stage">
        <div className="sol-hand">
          {FINGERS.map((f) => (
            <Nail
              key={f.key}
              shape={shape}
              color={color}
              finish={finish}
              scale={f.scale}
              lift={f.lift}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="sol-controls">
        <div className="sol-group">
          <span className="sol-label">Shape</span>
          <div className="sol-chips">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`sol-chip${shape === s.id ? " sol-chip--on" : ""}`}
                onClick={() => setShape(s.id)}
                aria-pressed={shape === s.id}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sol-group">
          <span className="sol-label">Colour</span>
          <div className="sol-swatches">
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                className={`sol-swatch${color === c ? " sol-swatch--on" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Colour ${c}`}
                aria-pressed={color === c}
              />
            ))}
          </div>
        </div>

        <div className="sol-group">
          <span className="sol-label">Finish</span>
          <div className="sol-chips">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`sol-chip${finish === f.id ? " sol-chip--on" : ""}`}
                onClick={() => setFinish(f.id)}
                aria-pressed={finish === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
