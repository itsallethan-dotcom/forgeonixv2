import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SUPPORT_PLANS, SUPPORT_SCOPE } from "@/content/support";

export const metadata: Metadata = {
  title: "Your Technology Partner | Forgeonix",
  description:
    "Ongoing technology support for small businesses — maintenance, troubleshooting, minor changes, and guidance, with clear scope and no unlimited promises.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Ongoing support"
        title="Your Technology Partner"
        lede="Technology doesn't stop changing after launch. Forgeonix offers ongoing support to keep your systems reliable — with clear boundaries, not vague promises."
      />

      {/* Plans */}
      <section className="fx-section" aria-labelledby="plans">
        <Container>
          <h2 id="plans" className="fx-h2 text-ink">
            Support plans
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {SUPPORT_PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 70}>
                <article
                  className={`fx-panel fx-ticks relative flex h-full flex-col p-6 sm:p-7 ${
                    plan.featured ? "border-[var(--fx-signal-line)] bg-[var(--fx-panel-2)]" : ""
                  }`}
                >
                  {plan.featured ? (
                    <span className="fx-mono absolute -top-2.5 left-6 rounded-[var(--fx-radius)] bg-signal px-2 py-0.5 text-[0.55rem] text-[var(--fx-void)]">
                      Recommended
                    </span>
                  ) : null}
                  <h3 className="fx-h3 text-[1.2rem] text-ink">{plan.name}</h3>
                  <p className="mt-3 flex items-baseline gap-0.5">
                    <span className="fx-display text-[1.7rem] leading-none text-ink">
                      {plan.price}
                    </span>
                    {plan.cadence ? (
                      <span className="text-[0.85rem] text-ink-muted">{plan.cadence}</span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-dim">
                    {plan.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-[var(--fx-line)] pt-5">
                    {plan.features.map((f) => (
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
                  <p className="fx-mono mt-5 text-[0.58rem] text-ink-faint">{plan.response}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* What's covered vs project work */}
      <section className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="scope">
        <Container>
          <h2 id="scope" className="fx-h2 text-ink">
            What&apos;s covered — and what isn&apos;t
          </h2>
          <p className="fx-lede mt-4 max-w-2xl">
            Clear boundaries keep support fair for everyone. Here&apos;s the
            difference between what a monthly plan includes and what counts as
            project work.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal className="fx-panel fx-ticks p-7">
              <h3 className="fx-h3 text-[1.1rem] text-ink">Included in monthly support</h3>
              <ul className="mt-5 space-y-3">
                {SUPPORT_SCOPE.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.88rem] text-ink-dim">
                    <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-good" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="fx-panel fx-ticks p-7">
              <h3 className="fx-h3 text-[1.1rem] text-ink">Billed as project work</h3>
              <ul className="mt-5 space-y-3">
                {SUPPORT_SCOPE.projectWork.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.88rem] text-ink-dim">
                    <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <p className="mt-8 max-w-3xl text-[0.85rem] leading-relaxed text-ink-muted">
            {SUPPORT_SCOPE.note}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[var(--fx-line)] pt-10">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
            <Link href="/pricing" className="fx-btn fx-btn--ghost">
              See pricing
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
