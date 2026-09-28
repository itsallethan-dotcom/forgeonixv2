import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { PRICING, PRICING_DISCLAIMER } from "@/content/pricing";

/**
 * Starting Investments — indicative starting points, not a fixed price list.
 * Four tiers in the shared panel system; the disclaimer keeps it honest and
 * routes scope conversations to contact.
 */
export function Pricing() {
  return (
    <Section id="pricing" connector className="border-t border-[var(--fx-line)]">
      <SectionHead
        index="05"
        label="Starting investments"
        titleId="pricing-title"
        title="Starting Investments"
        lede="Every business is different. These are typical starting points."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 70}>
            <article className="fx-panel fx-ticks flex h-full flex-col p-6">
              <h3 className="fx-h3 text-[1.1rem] text-ink">{tier.name}</h3>

              <p className="mt-4 flex items-baseline gap-1">
                <span className="fx-mono text-[0.58rem] text-ink-faint">Starting at</span>
              </p>
              <p className="mt-1 flex items-baseline gap-0.5">
                <span className="fx-display text-[2rem] leading-none text-ink">
                  {tier.price}
                </span>
                {tier.cadence ? (
                  <span className="text-[0.9rem] text-ink-muted">{tier.cadence}</span>
                ) : null}
              </p>

              <p className="mt-4 text-[0.86rem] leading-relaxed text-ink-dim">
                {tier.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-[var(--fx-line)] pt-5">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.84rem] text-ink-muted"
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

      <Reveal delay={120}>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.86rem] text-ink-muted">{PRICING_DISCLAIMER}</p>
          <Button href="#contact" variant="ghost">
            Get a custom quote
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
