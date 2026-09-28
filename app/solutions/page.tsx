import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Solutions Built Around Your Business | Forgeonix",
  description:
    "Custom business systems, automation, websites and digital tools, and technology support — built around how your business actually operates.",
};

const SOLUTIONS = [
  {
    id: "systems",
    title: "Custom Business Systems",
    body: "Software shaped to your process, so the tool fits the business instead of the other way around.",
    examples: [
      "CRM",
      "Lead tracking",
      "Scheduling",
      "Estimates and invoices",
      "Dashboards",
      "Internal tools",
    ],
  },
  {
    id: "automation",
    title: "Business Automation",
    body: "Remove repetitive work and connect the tools that should already be talking to each other.",
    examples: [
      "Follow-ups",
      "Notifications",
      "Reports",
      "Forms",
      "Integrations",
      "AI-assisted workflows",
    ],
  },
  {
    id: "websites",
    title: "Websites & Digital Tools",
    body: "Sites and tools that actively support the business, not just a page that exists.",
    examples: [
      "Business websites",
      "Booking systems",
      "Customer portals",
      "Interactive tools",
    ],
  },
  {
    id: "support",
    title: "Technology Support",
    body: "Practical help with the everyday technology that keeps a small business running.",
    examples: [
      "Troubleshooting",
      "Microsoft 365",
      "Device setup",
      "Software problems",
      "Networks",
      "Technology consulting",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions Built Around Your Business"
        lede="Forgeonix builds and supports the technology small businesses actually need — focused on outcomes, not tooling for its own sake."
      />

      <section className="fx-section" aria-label="Service detail">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <article className="fx-panel fx-ticks flex h-full flex-col p-7 sm:p-8">
                  <h2 className="fx-h3 text-[1.3rem] text-ink">{s.title}</h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
                    {s.body}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-[var(--fx-line)] pt-6 sm:grid-cols-2">
                    {s.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-start gap-2.5 text-[0.86rem] text-ink-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                        />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[var(--fx-line)] pt-10">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
            <Link href="/work" className="fx-btn fx-btn--ghost">
              See shipped work
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
