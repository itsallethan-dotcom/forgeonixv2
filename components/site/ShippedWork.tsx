import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SiteFrame } from "@/components/site/SiteFrame";
import { ShotFrame } from "@/components/site/ShotFrame";
import { CASE_STUDIES, type CaseStudy } from "@/content/shipped";

function Media({ study }: { study: CaseStudy }) {
  const m = study.media;
  if (m.kind === "live") return <SiteFrame url={m.href} host={m.host} />;
  return <ShotFrame src={m.src} alt={m.alt} host={m.host} demo={m.demo} />;
}

function CaseCard({ study }: { study: CaseStudy }) {
  const featured = Boolean(study.featured);

  return (
    <article
      className={`fx-panel fx-ticks grid items-center gap-6 p-5 sm:p-6 md:grid-cols-[1.05fr_1fr] md:gap-8 ${
        featured ? "border-[var(--fx-signal-line)]" : ""
      }`}
    >
      <Media study={study} />

      <div className="md:pr-2">
        <span className="flex flex-wrap items-center gap-2">
          <Eyebrow>{study.kind}</Eyebrow>
          {featured ? (
            <span className="fx-mono rounded-[var(--fx-radius)] border border-[var(--fx-signal-line)] bg-[var(--fx-signal-glow)] px-2 py-0.5 text-[0.55rem] text-signal-soft">
              Flagship build
            </span>
          ) : null}
        </span>

        <h3
          className={`fx-h3 mt-3 text-ink ${featured ? "text-[1.6rem]" : "text-[1.35rem]"}`}
        >
          {study.name}
        </h3>

        {study.problem ? (
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="fx-mono text-ink-faint">Problem</dt>
              <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-muted">
                {study.problem}
              </dd>
            </div>
            <div>
              <dt className="fx-mono text-signal-soft">Solution</dt>
              <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-dim">
                {study.solution}
              </dd>
            </div>
            {study.outcome ? (
              <div>
                <dt className="fx-mono text-good">Outcome</dt>
                <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-dim">
                  {study.outcome}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
            {study.description}
          </p>
        )}

        <div className="mt-6">
          <p className="fx-mono text-[0.58rem] text-ink-faint">Built features</p>
          <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {study.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-[0.85rem] text-ink-muted"
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

        {study.href ? (
          <div className="mt-7">
            <Button
              href={study.href}
              variant={featured ? "primary" : "ghost"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {study.hrefLabel ?? "Visit site"}
              <span aria-hidden> ↗</span>
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Shipped Client Work — real, delivered client projects, ordered by emphasis
 * (Causey Roofing CRM first as the flagship custom-systems build). Distinct
 * from the Interactive Concepts & Demos band, which is clearly labelled as
 * non-client work.
 */
export function ShippedWork() {
  return (
    <Section id="work" connector className="border-t border-[var(--fx-line)]">
      <header className="max-w-2xl">
        <Reveal>
          <Eyebrow index="03">Shipped client work</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="work-title" className="fx-h2 mt-5 text-ink">
            Shipped client work.
            <span className="mt-1 block text-ink-dim">Real businesses. Real builds.</span>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="fx-lede mt-4">
            Custom systems and sites delivered for real clients, each built around
            how that business actually operates.
          </p>
        </Reveal>
      </header>

      <div className="mt-12 space-y-6">
        {CASE_STUDIES.map((study) => (
          <Reveal key={study.id}>
            <CaseCard study={study} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
