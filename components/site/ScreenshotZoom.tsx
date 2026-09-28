"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * The in-frame screenshot, click-to-enlarge. The thumbnail is a real button;
 * opening portals a full-screen lightbox that shows the entire image (the card
 * only shows a cropped 16:10 top). Inside the lightbox the image fits the
 * viewport by default and toggles to actual size (scrollable) on click.
 * Escape / backdrop / close button all dismiss; focus is moved in and restored.
 */
export function ScreenshotZoom({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  // Hydration guard so the portal only renders client-side.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setActualSize(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      {/* Thumbnail (cropped) */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group absolute inset-0 h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
        <span
          aria-hidden
          className="fx-mono absolute top-2 right-2 flex items-center gap-1.5 rounded-[3px] border border-[var(--fx-line-strong)] bg-[rgba(7,8,10,0.72)] px-2 py-1 text-[0.55rem] text-ink-dim opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6.5 2h-4.5v4.5M9.5 14h4.5v-4.5M14 2l-5 5M2 14l5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Click to enlarge
        </span>
      </button>

      {/* Lightbox */}
      {mounted && open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-0 z-[100] flex flex-col bg-[rgba(7,8,10,0.94)] backdrop-blur-sm"
              onClick={close}
            >
              {/* Top bar */}
              <div
                className="flex items-center justify-between gap-4 border-b border-[var(--fx-line)] px-4 py-3"
                onClick={(e) => e.stopPropagation()}
              >
                <span id={titleId} className="fx-mono text-[0.6rem] text-ink-muted">
                  {caption ?? alt}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActualSize((v) => !v)}
                    className="fx-btn fx-btn--ghost !px-3 !py-1.5"
                  >
                    <span className="fx-mono text-[0.6rem]">
                      {actualSize ? "Fit to screen" : "Actual size"}
                    </span>
                  </button>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="fx-btn fx-btn--ghost !px-3 !py-1.5"
                  >
                    <span className="fx-mono text-[0.6rem]">Close ✕</span>
                  </button>
                </div>
              </div>

              {/* Image stage */}
              <div
                className={`flex-1 ${actualSize ? "overflow-auto" : "overflow-hidden"} flex items-center justify-center p-4 sm:p-8`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  onClick={() => setActualSize((v) => !v)}
                  className={
                    actualSize
                      ? "max-w-none cursor-zoom-out"
                      : "max-h-full max-w-full cursor-zoom-in object-contain"
                  }
                  draggable={false}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
