import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Mark";

/**
 * Hero — answers one question: "What do you do?" Static by design. Vertical
 * rhythm is tuned so the top of the Solutions section (connector, "01
 * Solutions" label, and heading) reaches the first viewport on a typical
 * desktop, making the transition feel continuous. Typography and CTA sizes are
 * unchanged — only spacing is tightened.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="fx-grid-bg relative flex min-h-[73svh] items-center pt-24 pb-10"
    >
      <Container>
        <div className="max-w-3xl">
          <span className="flex items-center gap-3">
            <Mark className="h-[26px] w-auto" title="Forgeonix" />
            <span className="fx-mono text-ink-muted">
              Technology partner for small businesses
            </span>
          </span>

          <h1
            id="hero-title"
            className="fx-display mt-6 text-[clamp(2.7rem,1.5rem+5.2vw,5.1rem)] text-ink"
          >
            Technology should fit your business.
            <span className="mt-1.5 block text-ink-dim">
              Not the other way around.
            </span>
          </h1>

          <p className="fx-lede mt-6 max-w-2xl">
            Forgeonix helps small businesses eliminate bottlenecks with custom
            software, automation, websites, and practical technology solutions.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="#solutions" variant="primary">
              Find a Solution
            </Button>
            <Button href="#work" variant="ghost">
              View Our Work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
