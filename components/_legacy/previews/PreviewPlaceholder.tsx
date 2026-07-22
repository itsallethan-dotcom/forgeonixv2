/**
 * Inert stand-in for a future interactive preview. Establishes the slot and
 * aspect in the layout without building any preview behaviour (deferred).
 * Purely presentational; no motion beyond the shared reveal on its wrapper.
 */
export function PreviewPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="fx-panel fx-ticks relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden"
      role="img"
      aria-label={`${label} — interactive preview coming soon`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fx-line-faint) 1px, transparent 1px), linear-gradient(90deg, var(--fx-line-faint) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, #000 30%, transparent 80%)",
        }}
      />
      <span className="fx-mono relative text-ink-faint">Preview · Phase 2</span>
    </div>
  );
}
