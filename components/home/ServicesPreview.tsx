import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
  {
    title: "Custom Business Systems",
    body: "Build tools around the way your business actually operates.",
  },
  {
    title: "Business Automation",
    body: "Remove repetitive tasks and connect disconnected processes.",
  },
  {
    title: "Websites & Digital Tools",
    body: "Create digital experiences that actively support your business.",
  },
  {
    title: "Technology Support",
    body: "Practical help when technology slows your business down.",
  },
];

export function ServicesPreview() {
  return (
    <section className="fx-section border-b border-[var(--fx-line)] bg-[var(--fx-shell)]" aria-labelledby="services-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow index="02">Services</Eyebrow>
            <h2 id="services-title" className="fx-h2 mt-4 text-ink">
              How Forgeonix Can Help
            </h2>
          </div>
          <Link href="/solutions" className="fx-btn fx-btn--ghost">
            Explore Solutions
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article className="fx-panel fx-ticks flex h-full flex-col p-6">
                <h3 className="fx-h3 text-[1.05rem] text-ink">{s.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
