"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Browser-window frame that displays a live website as a scaled desktop view —
 * used to show a delivered product as software (the website itself), not
 * photography. The site renders at a fixed logical width and is scaled to fit
 * the card via a ResizeObserver, so it reads like a crisp screenshot. The frame
 * is non-interactive (pointer-events off, aria-hidden); the card's "Visit site"
 * button is the accessible way in.
 */
const BASE_WIDTH = 1280;
const RATIO = 0.625; // 16:10

export function SiteFrame({ url, host }: { url: string; host: string }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / BASE_WIDTH));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-[var(--fx-radius-lg)] border border-[var(--fx-line)] bg-[var(--fx-shell)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--fx-line)] px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
        </span>
        <span className="fx-mono ml-2 flex-1 truncate rounded-[3px] border border-[var(--fx-line)] bg-[var(--fx-void)] px-2 py-1 text-[0.6rem] text-ink-muted">
          {host}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="fx-dot" aria-hidden />
          <span className="fx-mono text-[0.55rem] text-ink-muted">Live</span>
        </span>
      </div>

      {/* Scaled live site */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 10" }}
      >
        <iframe
          src={url}
          title={`${host} — live website`}
          aria-hidden
          tabIndex={-1}
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${BASE_WIDTH}px`,
            height: `${BASE_WIDTH * RATIO}px`,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
