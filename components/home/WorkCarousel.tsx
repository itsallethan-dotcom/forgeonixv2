"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CaseVisual } from "@/components/site/CaseVisual";
import { CASE_STUDIES } from "@/content/shipped";

export function WorkCarousel() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const gap = 20;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="fx-section border-b border-[var(--fx-line)]" aria-labelledby="shipped-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow index="01">Shipped work</Eyebrow>
            <h2 id="shipped-title" className="fx-h2 mt-4 text-ink">
              Work We&apos;ve Shipped
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/work" className="fx-btn fx-btn--ghost">
              View All Work
            </Link>
            <span className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Previous project"
                className="fx-btn fx-btn--ghost !px-3 disabled:opacity-40"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Next project"
                className="fx-btn fx-btn--ghost !px-3 disabled:opacity-40"
              >
                <span aria-hidden>→</span>
              </button>
            </span>
          </div>
        </div>

        <ul
          ref={trackRef}
          aria-label="Shipped projects"
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CASE_STUDIES.map((study) => (
            <li
              key={study.id}
              data-slide
              className="w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-[46%]"
            >
              <article className="fx-panel fx-ticks flex h-full flex-col p-4 sm:p-5">
                <CaseVisual study={study} />
                <div className="mt-5 flex flex-1 flex-col">
                  <h3 className="fx-h3 text-[1.2rem] text-ink">{study.name}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-dim">
                    {study.blurb}
                  </p>
                  <div className="mt-5 pt-1">
                    <Button href={`/work/${study.slug}`} variant="primary">
                      View Case Study
                      <span aria-hidden> →</span>
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
