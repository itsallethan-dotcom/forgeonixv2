import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PRICING } from "@/content/pricing";

/**
 * Pricing preview — concise starting floors only, no feature lists. Full detail
 * and support plans live on /pricing.
 */
export function PricingPreview() {
  return (
    <section className="fx-section border-b border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="pricing-preview-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow index="04">Pricing</Eyebrow>
            <h2 id="pricing-preview-title" className="fx-h2 mt-4 text-ink">
              Starting Prices
            </h2>
          </div>
          <Link href="/pricing" className="fx-btn fx-btn--ghost">
            View Pricing &amp; Details
          </Link>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 60}>
              <div className="fx-panel fx-ticks flex h-full flex-col p-6">
                <dt className="fx-h3 text-[1.02rem] text-ink">{tier.name}</dt>
                <dd className="mt-4 flex items-baseline gap-0.5">
                  <span className="fx-mono text-[0.58rem] text-ink-faint">
                    Starting at&nbsp;
                  </span>
                  <span className="fx-display text-[1.7rem] leading-none text-ink">
                    {tier.price}
                  </span>
                  {tier.cadence ? (
                    <span className="text-[0.85rem] text-ink-muted">{tier.cadence}</span>
                  ) : null}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl text-[0.82rem] leading-relaxed text-ink-muted">
          These are starting points, not fixed quotes. Final pricing depends on
          project scope and requirements.
        </p>
      </Container>
    </section>
  );
}
