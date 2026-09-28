import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PRICING } from "@/content/pricing";
import { SUPPORT_PLANS, SUPPORT_SCOPE } from "@/content/support";

export const metadata: Metadata = {
  title: "Pricing | Forgeonix",
  description:
    "Transparent starting prices for websites, custom business systems, automation, and technology support, plus ongoing monthly support plans.",
};

const FACTORS = [
  "Scope",
  "Number of features",
  "Integrations",
  "Number of workflows",
  "Data migration",
  "Number of users",
  "Custom design needs",
  "Ongoing support",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing"
        lede="Every business is different. These starting prices are intended to set expectations before a conversation."
      />

      {/* Project pricing */}
      <section className="fx-section" aria-labelledby="project-pricing">
        <Container>
          <h2 id="project-pricing" className="fx-h2 text-ink">
            Project pricing
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 60}>
                <article className="fx-panel fx-ticks flex h-full flex-col p-6">
                  <h3 className="fx-h3 text-[1.05rem] text-ink">{tier.name}</h3>
                  <p className="mt-4 flex items-baseline gap-0.5">
                    <span className="fx-mono text-[0.58rem] text-ink-faint">
                      Starting at&nbsp;
                    </span>
                    <span className="fx-display text-[1.8rem] leading-none text-ink">
                      {tier.price}
                    </span>
                    {tier.cadence ? (
                      <span className="text-[0.85rem] text-ink-muted">{tier.cadence}</span>
                    ) : null}
                  </p>
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-dim">
                    {tier.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[var(--fx-line)] pt-5">
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.83rem] text-ink-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Ongoing support */}
      <section className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="support-pricing">
        <Container>
          <h2 id="support-pricing" className="fx-h2 text-ink">
            Ongoing support
          </h2>
          <p className="fx-lede mt-4 max-w-2xl">
            Optional monthly plans to keep delivered work reliable over time.
          </p>

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

          <p className="mt-8 max-w-3xl text-[0.85rem] leading-relaxed text-ink-muted">
            {SUPPORT_SCOPE.note}
          </p>
        </Container>
      </section>

      {/* What affects project pricing */}
      <section className="fx-section border-t border-[var(--fx-line)]" aria-labelledby="factors">
        <Container>
          <h2 id="factors" className="fx-h2 text-ink">
            What Affects Project Pricing
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FACTORS.map((f) => (
              <li key={f} className="fx-panel fx-ticks flex items-center gap-3 p-4">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span className="text-[0.9rem] text-ink-dim">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-[var(--fx-line)] pt-10">
            <Button href="/contact" variant="primary">
              Tell Us What You Need
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
