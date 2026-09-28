import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { SUPPORT_PLANS } from "@/content/support";

/**
 * Your Technology Partner — recurring support plans. The middle plan is marked
 * as recommended with a signal-blue border; the rest share the standard panel.
 */
export function Support() {
  return (
    <Section id="support" connector className="border-t border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <SectionHead
        index="06"
        label="Ongoing support"
        titleId="support-title"
        title="Your Technology Partner"
        lede="Technology does not stop changing after launch. Forgeonix provides ongoing support to keep your systems reliable."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {SUPPORT_PLANS.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 80}>
            <article
              className={`fx-panel fx-ticks relative flex h-full flex-col p-6 sm:p-7 ${
                plan.featured
                  ? "border-[var(--fx-signal-line)] bg-[var(--fx-panel-2)]"
                  : ""
              }`}
            >
              {plan.featured ? (
                <span className="fx-mono absolute -top-2.5 left-6 rounded-[var(--fx-radius)] bg-signal px-2 py-0.5 text-[0.55rem] text-[var(--fx-void)]">
                  Recommended
                </span>
              ) : null}

              <h3 className="fx-h3 text-[1.2rem] text-ink">{plan.name}</h3>

              <p className="mt-3 flex items-baseline gap-0.5">
                <span className="fx-display text-[1.75rem] leading-none text-ink">
                  {plan.price}
                </span>
                {plan.cadence ? (
                  <span className="text-[0.9rem] text-ink-muted">{plan.cadence}</span>
                ) : null}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-[var(--fx-line)] pt-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[0.86rem] text-ink-dim"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-1">
                <Button
                  href="#contact"
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  {plan.price === "Custom pricing" ? "Talk to us" : "Get started"}
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
