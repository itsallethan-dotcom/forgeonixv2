import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SiteFrame } from "@/components/site/SiteFrame";
import { DELIVERED } from "@/content/delivered";

/**
 * Delivered products — proof of shipped client work. Deliberately distinct from
 * the interactive Solutions band: each entry is a framed case card (real
 * screenshot, LIVE status, capabilities, a link to the running site) rather than
 * an embedded app. Same Forgeonix design system — no new visual language.
 */
export function Delivered() {
  return (
    <Section id="delivered" connector className="border-t border-[var(--fx-line)]">
      <header className="max-w-2xl">
        <Reveal>
          <Eyebrow>Delivered work</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="delivered-title" className="fx-h2 mt-5 text-ink">
            Delivered products.
            <span className="mt-1 block text-ink-dim">Real clients. Real deployments.</span>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="fx-lede mt-4">Software that&apos;s already helping real businesses.</p>
        </Reveal>
      </header>

      <div className="mt-12 space-y-6">
        {DELIVERED.map((p) => (
          <Reveal key={p.id}>
            <article className="fx-panel fx-ticks grid items-center gap-6 p-5 sm:p-6 md:grid-cols-[1.05fr_1fr] md:gap-8">
              {/* The product itself — a live, browser-framed view of the site */}
              <SiteFrame url={p.href} host={p.host} />

              {/* Content */}
              <div className="md:pr-2">
                <h3 className="fx-h3 text-[1.35rem] text-ink">{p.name}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
                  {p.description}
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[0.86rem] text-ink-muted">
                      <span
                        aria-hidden
                        className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                      />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href={p.href}
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit site
                    <span aria-hidden> ↗</span>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
