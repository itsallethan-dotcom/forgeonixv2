"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** `fade` slides up; `draw` scales a horizontal rule in from the left. */
  variant?: "fade" | "draw";
  as?: ElementType;
  className?: string;
};

/**
 * Progressive-enhancement reveal.
 *
 * Content is VISIBLE BY DEFAULT (see globals.css) — it never depends on
 * JavaScript, hydration, an observer, or an animation firing. After mount, and
 * only for elements that are still below the fold, JS opts into a hidden
 * "pending" state and animates them in on scroll. Anything already on screen is
 * left visible (no flash), reduced-motion is respected, and a safety timeout
 * force-shows if the observer never fires.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return; // stay visible, no motion
    }

    // Never hide something the user can already see — avoids any flash and
    // guarantees above-the-fold content is shown immediately.
    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    node.dataset.reveal = "pending";
    const show = () => {
      node.dataset.reveal = "shown";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(node);

    // Safety net: if the observer never fires, reveal anyway.
    const t = window.setTimeout(() => {
      if (node.dataset.reveal !== "shown") show();
    }, 1400);

    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const base = variant === "draw" ? "fx-draw" : "fx-reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`.trim()}
      style={{ "--fx-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
