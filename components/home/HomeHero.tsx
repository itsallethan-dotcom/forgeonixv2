import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Homepage hero — concise gateway. One primary CTA (Start a Project), a
 * secondary text link, industries folded into the supporting copy. No large
 * logo treatment; the wordmark lives in the header.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="fx-grid-bg relative flex min-h-[66svh] items-center pt-28 pb-14 sm:pt-32"
    >
      <Container>
        <div className="max-w-3xl">
          <span className="fx-mono text-ink-muted">
            Technology partner for small businesses
          </span>

          <h1
            id="hero-title"
            className="fx-display mt-5 text-[clamp(2.5rem,1.5rem+4.6vw,4.7rem)] text-ink"
          >
            Technology should fit your business.
            <span className="mt-1.5 block text-ink-dim">
              Not the other way around.
            </span>
          </h1>

          <p className="fx-lede mt-6 max-w-2xl">
            Forgeonix helps small businesses solve operational and technology
            problems with custom software, automation, websites, and practical
            support. Built for contractors, home-service companies, and other
            small businesses that need technology to work better.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
            <Link
              href="/work"
              className="rounded-sm text-[0.9rem] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              View Our Work
              <span aria-hidden> →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
