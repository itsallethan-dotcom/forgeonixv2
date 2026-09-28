import { ScreenshotZoom } from "@/components/site/ScreenshotZoom";

/**
 * Static screenshot in the same browser-window chrome as <SiteFrame>, for work
 * that isn't a live public site (e.g. an internal CRM shown with demo data).
 * When `demo` is set, the status pill reads "Demo" in amber and a corner tag
 * reinforces that the data is sample data — so it is never read as a live
 * client deployment. The screenshot asset itself is also watermarked.
 */
export function ShotFrame({
  src,
  alt,
  host,
  demo = false,
}: {
  src: string;
  alt: string;
  host: string;
  demo?: boolean;
}) {
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
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: demo ? "var(--fx-amber)" : "var(--fx-green)" }}
          />
          <span className="fx-mono text-[0.55rem] text-ink-muted">
            {demo ? "Demo" : "Static"}
          </span>
        </span>
      </div>

      {/* Screenshot — click to open the full image in a lightbox */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <ScreenshotZoom
          src={src}
          alt={alt}
          caption={demo ? `${host} — demo data, not a live client site` : host}
        />
        {demo ? (
          <span className="fx-mono pointer-events-none absolute bottom-2 left-2 z-[1] rounded-[3px] border border-[rgba(223,160,74,0.4)] bg-[rgba(20,23,28,0.8)] px-2 py-1 text-[0.55rem] text-amber">
            Demo data · not a live client site
          </span>
        ) : null}
      </div>
    </div>
  );
}
