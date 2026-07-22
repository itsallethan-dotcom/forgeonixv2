/**
 * Forgeonix mark — the real brushed-steel "F" logo asset (public/forgeonix-mark.png,
 * transparent, tightly cropped). Rendered as an <img> so the official artwork is
 * used verbatim; never redrawn or approximated.
 */
export function Mark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/forgeonix-mark.png"
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className={className}
      draggable={false}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <Mark className="h-[22px] w-auto" />
      <span
        className="font-display text-[1.02rem] font-semibold tracking-[0.13em] text-ink uppercase"
        style={{ fontFamily: "var(--fx-font-display)" }}
      >
        Forgeonix
      </span>
    </span>
  );
}
