import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ShotFrame } from "@/components/site/ShotFrame";
import { CASE_STUDIES } from "@/content/shipped";

/**
 * Featured case study — Causey Roofing as the primary business-system proof.
 * Brief on purpose; the full story lives at /work/causey-roofing.
 */
export function FeaturedCase() {
  const causey = CASE_STUDIES.find((c) => c.slug === "causey-roofing");
  if (!causey || causey.media.kind !== "shot") return null;
  const { media } = causey;

  return (
    <section className="fx-section border-b border-[var(--fx-line)]" aria-labelledby="featured-title">
      <Container>
        <Eyebrow index="03">Featured build</Eyebrow>
        <h2 id="featured-title" className="fx-h2 mt-4 text-ink">
          Built Around a Real Business
        </h2>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.05fr_1fr]">
          <Reveal className="fx-panel fx-ticks p-4 sm:p-5">
            <ShotFrame src={media.src} alt={media.alt} host={media.host} demo={media.demo} />
          </Reveal>

          <Reveal delay={80}>
            <h3 className="fx-h3 text-[1.4rem] text-ink">Causey Roofing CRM</h3>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="fx-mono text-ink-faint">Problem</dt>
                <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-muted">
                  Generic tools did not match the company&apos;s workflow.
                </dd>
              </div>
              <div>
                <dt className="fx-mono text-signal-soft">Solution</dt>
                <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-dim">
                  A custom CRM and operations system designed around leads,
                  customers, estimates, materials, jobs, and follow-ups.
                </dd>
              </div>
            </dl>
            <div className="mt-7">
              <Button href="/work/causey-roofing" variant="primary">
                View the Causey Roofing Case Study
                <span aria-hidden> →</span>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
