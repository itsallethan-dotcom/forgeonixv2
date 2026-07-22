"use client";

import { useEffect, useRef } from "react";
import { SystemMap } from "@/components/visuals/SystemMap";
import { SystemMapCompact } from "@/components/visuals/SystemMapCompact";

export function Hero() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Small pointer-driven depth. Desktop pointers only, disabled for reduced motion.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        stage.style.setProperty("--mx", x.toFixed(3));
        stage.style.setProperty("--my", y.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="fx-grid-bg relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* single, static atmospheric wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 62% 12%, rgba(77,151,255,0.10), transparent 62%)",
        }}
      />

      <div
        ref={stageRef}
        className="fx-shell grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12"
      >
        {/* Copy */}
        <div className="fx-tilt max-w-xl" style={{ "--depth": "5px" } as React.CSSProperties}>
          <p className="fx-enter flex items-center gap-3">
            <span className="fx-dot" aria-hidden />
            <span className="fx-mono text-ink-muted">
              Independent software studio
            </span>
          </p>

          <h1
            className="fx-display fx-enter mt-6 text-[clamp(2.15rem,1.2rem+3.9vw,3.85rem)] text-ink"
            style={{ "--fx-delay": "90ms" } as React.CSSProperties}
          >
            Software that matches how your business
            <span className="text-signal"> actually runs</span>.
          </h1>

          <p
            className="fx-lede fx-enter mt-6"
            style={{ "--fx-delay": "180ms" } as React.CSSProperties}
          >
            Forgeonix builds internal tools, operational dashboards, customer
            portals, tracking systems, automations, and business websites. Built
            around your process instead of forcing your process into someone
            else&apos;s product.
          </p>

          <div
            className="fx-enter mt-9 flex flex-wrap items-center gap-3"
            style={{ "--fx-delay": "270ms" } as React.CSSProperties}
          >
            <a href="#contact" className="fx-btn fx-btn--primary">
              Discuss a project
            </a>
            <a href="#work" className="fx-btn fx-btn--ghost">
              See what I build
            </a>
          </div>

          <dl
            className="fx-enter mt-11 grid max-w-md grid-cols-1 gap-px overflow-hidden rounded-[var(--fx-radius)] border border-[var(--fx-line)] bg-[var(--fx-line)] sm:grid-cols-3"
            style={{ "--fx-delay": "350ms" } as React.CSSProperties}
          >
            {[
              ["Focus", "Small business systems"],
              ["Background", "IT support + systems"],
              ["Team size", "One, deliberately"],
            ].map(([term, value]) => (
              <div key={term} className="bg-[var(--fx-shell)] px-3.5 py-3">
                <dt className="fx-mono text-[0.58rem] text-ink-faint">{term}</dt>
                <dd className="mt-1.5 text-[0.78rem] leading-snug text-ink-dim">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* System map */}
        <div
          className="fx-tilt relative"
          style={{ "--depth": "-9px" } as React.CSSProperties}
        >
          <div className="fx-panel fx-ticks overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--fx-line)] px-4 py-2.5">
              <span className="fx-mono text-[0.58rem] text-ink-faint">
                system_map.svg
              </span>
              <span className="fx-mono flex items-center gap-2 text-[0.58rem] text-ink-faint">
                connected
                <span className="fx-caret text-good">_</span>
              </span>
            </div>
            <div className="px-4 py-5 sm:px-5 sm:py-6">
              <SystemMap className="hidden h-auto w-full sm:block" />
              <SystemMapCompact className="sm:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
