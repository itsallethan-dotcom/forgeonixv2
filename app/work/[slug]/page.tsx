import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SiteFrame } from "@/components/site/SiteFrame";
import { ShotFrame } from "@/components/site/ShotFrame";
import { CASE_STUDIES, type CaseStudy } from "@/content/shipped";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) return { title: "Case study | Forgeonix" };
  return {
    title: `${study.name} | Forgeonix`,
    description: study.subtitle,
  };
}

function Media({ study }: { study: CaseStudy }) {
  const m = study.media;
  if (m.kind === "live") return <SiteFrame url={m.href} host={m.host} />;
  return <ShotFrame src={m.src} alt={m.alt} host={m.host} demo={m.demo} />;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <>
      {/* Header */}
      <section className="fx-grid-bg border-b border-[var(--fx-line)] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <Container>
          <Link
            href="/work"
            className="fx-mono rounded-sm text-[0.6rem] text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden>← </span>Back to work
          </Link>
          <div className="mt-6 max-w-3xl">
            <Eyebrow>{study.kind}</Eyebrow>
            <h1 className="fx-display mt-4 text-[clamp(2rem,1.4rem+2.6vw,3.2rem)] text-ink">
              {study.name}
            </h1>
            <p className="fx-lede mt-5 max-w-2xl">{study.subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Media */}
      <section className="fx-section" aria-label={`${study.name} preview`}>
        <Container>
          <Reveal className="fx-panel fx-ticks p-4 sm:p-6">
            <Media study={study} />
          </Reveal>

          {study.href ? (
            <div className="mt-6">
              <Button href={study.href} variant="ghost" target="_blank" rel="noopener noreferrer">
                {study.hrefLabel ?? "Visit site"}
                <span aria-hidden> ↗</span>
              </Button>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Overview */}
      <section className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="overview">
        <Container>
          <h2 id="overview" className="fx-h2 text-ink">
            Overview
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              {study.problem ? (
                <dl className="space-y-6">
                  <div>
                    <dt className="fx-mono text-ink-faint">Problem</dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
                      {study.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="fx-mono text-signal-soft">Solution</dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
                      {study.solution}
                    </dd>
                  </div>
                  {study.outcome ? (
                    <div>
                      <dt className="fx-mono text-good">Outcome</dt>
                      <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
                        {study.outcome}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : (
                <p className="text-[0.95rem] leading-relaxed text-ink-dim">
                  {study.description}
                </p>
              )}
            </div>

            <div>
              <p className="fx-mono text-[0.58rem] text-ink-faint">Built features</p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {study.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[0.88rem] text-ink-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="fx-section border-t border-[var(--fx-line)]" aria-labelledby="cta">
        <Container>
          <div className="max-w-2xl">
            <h2 id="cta" className="fx-h3 text-[1.5rem] text-ink">
              Need something similar for your business?
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Start a Project
              </Button>
              <Link href="/work" className="fx-btn fx-btn--ghost">
                See more work
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
