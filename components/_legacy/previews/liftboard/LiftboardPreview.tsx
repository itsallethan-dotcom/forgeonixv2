"use client";

import { useMemo, useState } from "react";
import {
  formatVolume,
  initialRoster,
  liftVolume,
  LIFTS,
  rankAll,
  type Athlete,
} from "@/components/previews/liftboard/liftboardLogic";

export function LiftboardPreview() {
  const [athletes, setAthletes] = useState<Athlete[]>(initialRoster);
  const [flash, setFlash] = useState(false);

  const ranked = useMemo(() => rankAll(athletes), [athletes]);
  const you = ranked.find((a) => a.isYou)!;
  const top = ranked[0].volume;

  function logLift(volume: number) {
    setAthletes((prev) =>
      prev.map((a) => (a.isYou ? { ...a, volume: a.volume + volume } : a)),
    );
    setFlash(true);
    window.setTimeout(() => setFlash(false), 700);
  }

  return (
    <div className="liftboard lb-shell">
      {/* Brand bar */}
      <div className="lb-bar">
        <span className="lb-brand">
          <span className="lb-badge" aria-hidden>
            ▲
          </span>
          <span className="lb-name">LIFTBOARD</span>
        </span>
        <span className="lb-standing" aria-live="polite">
          You&apos;re <b className={flash ? "lb-rank lb-rank--flash" : "lb-rank"}>#{you.rank}</b>
        </span>
      </div>

      {/* Ranked board */}
      <ol className="lb-list">
        {ranked.map((a) => {
          const pct = Math.round((a.volume / top) * 100);
          return (
            <li key={a.id} className={`lb-row${a.isYou ? " lb-row--you" : ""}`}>
              <span className="lb-pos">{a.rank}</span>
              <span className="lb-info">
                <span className="lb-athlete">
                  {a.name}
                  {a.rank === 1 ? <span className="lb-crown" aria-label="leader"> ★</span> : null}
                </span>
                <span className="lb-track" aria-hidden>
                  <span className="lb-fill" style={{ width: `${pct}%` }} />
                </span>
              </span>
              <span className="lb-vol">{formatVolume(a.volume)}</span>
            </li>
          );
        })}
      </ol>

      {/* Log a set */}
      <div className="lb-foot">
        <span className="lb-foot__label">Log a set</span>
        <div className="lb-actions">
          {LIFTS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="lb-btn"
              onClick={() => logLift(liftVolume(l))}
            >
              {l.label}
              <span className="lb-btn__meta">
                {l.weight}×{l.reps}×{l.sets}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
