import { SiteFrame } from "@/components/site/SiteFrame";
import type { CaseStudy } from "@/content/shipped";

/**
 * Non-interactive project visual in browser-window chrome. Live sites render as
 * a framed <SiteFrame>; screenshots render as a static image with matching
 * chrome and a demo tag where applicable. Used in project cards (hub + carousel).
 */
export function CaseVisual({ study }: { study: CaseStudy }) {
  const m = study.media;
  if (m.kind === "live") return <SiteFrame url={m.href} host={m.host} />;

  return (
    <div className="overflow-hidden rounded-[var(--fx-radius-lg)] border border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <div className="flex items-center gap-2 border-b border-[var(--fx-line)] px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--fx-line-strong)]" />
        </span>
        <span className="fx-mono ml-2 flex-1 truncate rounded-[3px] border border-[var(--fx-line)] bg-[var(--fx-void)] px-2 py-1 text-[0.6rem] text-ink-muted">
          {m.host}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: m.demo ? "var(--fx-amber)" : "var(--fx-green)" }}
          />
          <span className="fx-mono text-[0.55rem] text-ink-muted">
            {m.demo ? "Demo" : "Live"}
          </span>
        </span>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.src}
          alt={m.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
        />
        {m.demo ? (
          <span className="fx-mono absolute bottom-2 left-2 rounded-[3px] border border-[rgba(223,160,74,0.4)] bg-[rgba(20,23,28,0.8)] px-2 py-1 text-[0.55rem] text-amber">
            Demo data
          </span>
        ) : null}
      </div>
    </div>
  );
}
