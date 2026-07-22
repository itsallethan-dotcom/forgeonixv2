import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Optional monospace index shown before the label, e.g. "02". */
  index?: string;
  className?: string;
};

/**
 * Small mono eyebrow / section label — the one place IBM Plex Mono is used in
 * the type system. Kept restrained per DESIGN_PRINCIPLES (labels only, never
 * body copy). Purely presentational.
 */
export function Eyebrow({ children, index, className = "" }: EyebrowProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`.trim()}>
      {index ? <span className="fx-mono text-signal">{index}</span> : null}
      {index ? (
        <span aria-hidden className="h-px w-8 bg-[var(--fx-line-strong)]" />
      ) : null}
      <span className="fx-mono text-ink-muted">{children}</span>
    </span>
  );
}
