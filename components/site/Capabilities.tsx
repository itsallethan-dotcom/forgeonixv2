import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CAPABILITIES } from "@/content/capabilities";

/**
 * Solutions band — the positioning-level menu. Four problem/solution cards that
 * tell a visitor, in business terms, what Forgeonix does. Uses the existing
 * panel + ticks + eyebrow system so it reads as native to the site.
 */
export function Capabilities() {
  return (
    <Section id="solutions" connector pulse className="border-t border-[var(--fx-line)]">
      <SectionHead
        index="01"
        label="Solutions"
        titleId="solutions-title"
        title="Solutions built from real business problems."
        lede="Every engagement starts with a problem a business actually has, not a product we're trying to sell."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {CAPABILITIES.map((cap, i) => (
          <Reveal key={cap.id} delay={i * 70}>
            <article className="fx-panel fx-ticks flex h-full flex-col p-6 sm:p-7">
              <Eyebrow index={cap.index}>Solution</Eyebrow>

              <h3 className="fx-h3 mt-4 text-[1.3rem] text-ink">{cap.title}</h3>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="fx-mono text-ink-faint">Problem</dt>
                  <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-muted">
                    {cap.problem}
                  </dd>
                </div>
                <div>
                  <dt className="fx-mono text-signal-soft">Solution</dt>
                  <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-dim">
                    {cap.solution}
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--fx-line)] pt-5">
                {cap.examples.map((ex) => (
                  <li
                    key={ex}
                    className="rounded-[var(--fx-radius)] border border-[var(--fx-line)] bg-[var(--fx-shell)] px-2.5 py-1 text-[0.75rem] text-ink-muted"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
