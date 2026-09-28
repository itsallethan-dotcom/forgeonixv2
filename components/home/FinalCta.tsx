import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Homepage closing CTA — one clear action into /contact.
 */
export function FinalCta() {
  return (
    <section
      className="fx-grid-bg relative overflow-hidden fx-section"
      aria-labelledby="final-cta-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(77,151,255,0.10), transparent 65%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 id="final-cta-title" className="fx-h2 text-ink">
              Have a problem? Let&apos;s find the solution.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="fx-lede mx-auto mt-5 max-w-xl">
              Tell Forgeonix what&apos;s slowing your business down. We&apos;ll
              help determine what technology actually makes sense.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
