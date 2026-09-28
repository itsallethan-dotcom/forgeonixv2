import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QueuePreview } from "@/components/previews/queue/QueuePreview";
import { RealtyPreview } from "@/components/previews/realty/RealtyPreview";
import { SoleaPreview } from "@/components/previews/solea/SoleaPreview";
import { MiniCrmPreview } from "@/components/previews/minicrm/MiniCrmPreview";
import type { Solution } from "@/content/solutions";

/** Interactive previews, keyed by solution id — the demo lives on the homepage. */
const PREVIEWS: Record<string, ComponentType> = {
  "oak-and-steel": QueuePreview,
  "realty-leaderboard": RealtyPreview,
  "solea-nail-designer": SoleaPreview,
  minicrm: MiniCrmPreview,
};

/**
 * The repeatable solution block: problem-focused headline, product name, one
 * problem sentence, one solution sentence, and the interactive showcase. The
 * showcase IS the demo — visitors experience each product without leaving the
 * homepage, so there is no separate "full demo" affordance.
 */
export function SolutionSection({ solution }: { solution: Solution }) {
  const { id, index, brand, kind, headline, problem, solution: fix, outcome } = solution;
  const Preview = PREVIEWS[id];

  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid items-start gap-x-12 gap-y-8 border-t border-[var(--fx-line)] py-14 md:grid-cols-2 md:py-20 first:border-t-0 first:pt-0"
    >
      {/* Text column */}
      <div className="max-w-xl">
        <Reveal>
          <Eyebrow index={index}>{kind}</Eyebrow>
        </Reveal>

        <Reveal delay={60}>
          <h3 id={`${id}-title`} className="fx-h3 mt-4 text-[1.5rem] text-ink sm:text-[1.85rem]">
            {headline}
          </h3>
        </Reveal>

        <Reveal delay={110}>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.82rem] text-ink-muted">
            {brand}
            <span className="fx-mono rounded-[var(--fx-radius)] border border-[var(--fx-line)] px-1.5 py-0.5 text-[0.5rem] text-ink-faint">
              Concept · fictional data
            </span>
          </p>
        </Reveal>

        <dl className="mt-6 space-y-5">
          <Reveal delay={150} as="div">
            <dt className="fx-mono text-ink-faint">Problem</dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{problem}</dd>
          </Reveal>
          <Reveal delay={200} as="div">
            <dt className="fx-mono text-signal-soft">Solution</dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{fix}</dd>
          </Reveal>
          <Reveal delay={240} as="div">
            <dt className="fx-mono text-good">Outcome</dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{outcome}</dd>
          </Reveal>
        </dl>
      </div>

      {/* Interactive showcase */}
      <Reveal delay={120} className="md:pt-1">
        {Preview ? <Preview /> : null}
      </Reveal>
    </article>
  );
}
