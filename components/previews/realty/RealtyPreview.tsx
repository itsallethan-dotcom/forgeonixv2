"use client";

import { useMemo, useState } from "react";
import {
  formatCurrency,
  initialRoster,
  rankAll,
  SALES,
  type Agent,
} from "@/components/previews/realty/realtyLogic";

export function RealtyPreview() {
  const [agents, setAgents] = useState<Agent[]>(initialRoster);
  const [flash, setFlash] = useState(false);

  const ranked = useMemo(() => rankAll(agents), [agents]);
  const you = ranked.find((a) => a.isYou)!;
  const top = ranked[0].volume;

  function logSale(price: number) {
    setAgents((prev) =>
      prev.map((a) =>
        a.isYou ? { ...a, volume: a.volume + price, closings: a.closings + 1 } : a,
      ),
    );
    setFlash(true);
    window.setTimeout(() => setFlash(false), 700);
  }

  return (
    <div className="realty rl-shell">
      {/* Brand bar */}
      <div className="rl-bar">
        <span className="rl-brand">
          <span className="rl-badge" aria-hidden>
            M
          </span>
          <span>
            <span className="rl-name">Meridian Realty</span>
            <span className="rl-tag">Sales leaderboard · YTD</span>
          </span>
        </span>
        <span className="rl-standing" aria-live="polite">
          You&apos;re <b className={flash ? "rl-rank rl-rank--flash" : "rl-rank"}>#{you.rank}</b>
        </span>
      </div>

      {/* Ranked board */}
      <ol className="rl-list">
        {ranked.map((a) => {
          const pct = Math.round((a.volume / top) * 100);
          return (
            <li key={a.id} className={`rl-row${a.isYou ? " rl-row--you" : ""}`}>
              <span className="rl-pos">{a.rank}</span>
              <span className="rl-avatar" aria-hidden>
                {a.initials}
              </span>
              <span className="rl-info">
                <span className="rl-agent">
                  {a.name}
                  {a.rank === 1 ? <span className="rl-crown" aria-label="top producer"> ★</span> : null}
                </span>
                <span className="rl-track" aria-hidden>
                  <span className="rl-fill" style={{ width: `${pct}%` }} />
                </span>
              </span>
              <span className="rl-stats">
                <span className="rl-vol">{formatCurrency(a.volume)}</span>
                <span className="rl-closings">{a.closings} closings</span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Log a sale */}
      <div className="rl-foot">
        <span className="rl-foot__label">Log a sale</span>
        <div className="rl-actions">
          {SALES.map((s) => (
            <button
              key={s.id}
              type="button"
              className="rl-btn"
              onClick={() => logSale(s.price)}
            >
              {s.label}
              <span className="rl-btn__meta">{formatCurrency(s.price)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
