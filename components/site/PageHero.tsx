import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Shared subpage header. Owns the single <h1> for the route and clears the
 * fixed nav. Homepage uses its own hero instead.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="fx-grid-bg border-b border-[var(--fx-line)] pt-28 pb-14 sm:pt-32 sm:pb-16">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="fx-display mt-5 text-[clamp(2.1rem,1.4rem+3vw,3.4rem)] text-ink">
            {title}
          </h1>
          {lede ? <p className="fx-lede mt-5 max-w-2xl">{lede}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
