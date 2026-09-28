import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CaseVisual } from "@/components/site/CaseVisual";
import { SolutionSection } from "@/components/solutions/SolutionSection";
import { CASE_STUDIES } from "@/content/shipped";
import { SOLUTIONS } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Work | Forgeonix",
  description:
    "Shipped client work — Causey Roofing CRM, Blackgate Studios, and Solea Nails — plus interactive concept demos built to show what these systems feel like.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Work we've shipped."
        lede="Real client builds, plus interactive concept demos. The two are kept clearly separate."
      />

      {/* Shipped client work */}
      <section className="fx-section" aria-labelledby="shipped">
        <Container>
          <h2 id="shipped" className="fx-h2 text-ink">
            Shipped Client Work
          </h2>
          <p className="fx-lede mt-4 max-w-2xl">
            Custom systems and sites delivered for real businesses.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.id} delay={i * 70}>
                <article className="fx-panel fx-ticks flex h-full flex-col p-4 sm:p-5">
                  <CaseVisual study={study} />
                  <div className="mt-5 flex flex-1 flex-col">
                    <span className="fx-mono text-[0.55rem] text-ink-faint">{study.kind}</span>
                    <h3 className="fx-h3 mt-2 text-[1.15rem] text-ink">{study.name}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-dim">
                      {study.blurb}
                    </p>
                    <div className="mt-5 pt-1">
                      <Button href={`/work/${study.slug}`} variant="primary">
                        View Case Study
                        <span aria-hidden> →</span>
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive concepts & demos */}
      <section className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="concepts">
        <Container>
          <h2 id="concepts" className="fx-h2 text-ink">
            Interactive Concepts &amp; Demos
          </h2>
          <p className="fx-lede mt-4 max-w-2xl">
            Self-initiated, interactive builds that show what these systems feel
            like to use. These are concept demos — not client projects — and
            every one uses fictional businesses and fictional data.
          </p>

          <div className="mt-10">
            {SOLUTIONS.map((solution) => (
              <SolutionSection key={solution.id} solution={solution} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
