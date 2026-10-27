import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumb, services, pageMeta } from "@/content/seo";

export const metadata: Metadata = pageMeta({
  title: "Business Automation Services in Kentucky",
  description:
    "Business automation and custom software for small businesses across Kentucky — automate lead follow-ups, reporting, data entry, approvals, and tool integrations.",
  path: "/solutions",
});

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
      "Lead follow-ups",
      "Reporting",
      "Data entry",
      "Approval workflows",
      "Software integrations",
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

// Practical automation examples — described as capabilities, not results.
const AUTOMATION = [
  {
    term: "Lead follow-ups",
    body: "New enquiries get an immediate, consistent response instead of sitting in an inbox until someone has time.",
  },
  {
    term: "Reporting",
    body: "The numbers you check every week pulled together automatically, rather than rebuilt by hand in a spreadsheet.",
  },
  {
    term: "Data entry",
    body: "Information captured once and pushed everywhere it needs to go, so no one retypes the same record twice.",
  },
  {
    term: "Approval workflows",
    body: "Requests routed to the right person, with a clear record of what was approved and when.",
  },
  {
    term: "Software integrations",
    body: "Scheduling, billing, and the other tools you already use kept in sync instead of copied between tabs.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          ...services(
            SOLUTIONS.map((s) => ({ name: s.title, description: s.body })),
          ),
        ]}
      />
      <PageHero
        eyebrow="Solutions"
        title="Business automation and custom software for Kentucky businesses"
        lede="Forgeonix builds business automation and custom software — plus websites and practical IT support — for small businesses across Kentucky, focused on removing operational bottlenecks rather than tooling for its own sake."
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
        </Container>
      </section>

      {/* Business automation deep-dive — the page's focus */}
      <section
        className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]"
        aria-labelledby="automation-detail"
      >
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <span className="fx-mono text-ink-muted">Business automation</span>
            </Reveal>
            <Reveal delay={70}>
              <h2 id="automation-detail" className="fx-h2 mt-4 text-ink">
                Business automation, in practice
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="fx-lede mt-4">
                Most small businesses lose hours every week to the same manual
                steps. Business process automation connects the tools you already
                use and takes that repetitive work off your team&apos;s plate.
                When one person is the only one who knows how a process runs,
                that&apos;s usually a good place to start.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {AUTOMATION.map((item, i) => (
              <Reveal key={item.term} delay={i * 60}>
                <article className="fx-panel fx-ticks h-full p-6">
                  <h3 className="fx-h3 text-[1.02rem] text-ink">{item.term}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-[0.92rem] leading-relaxed text-ink-dim">
              Workflow automation usually pairs with a custom system that holds
              the data. For a Kentucky example, see how we built a custom CRM and
              operations system for a roofing contractor in the{" "}
              <Link
                href="/work/causey-roofing"
                className="text-signal-soft underline-offset-4 hover:underline"
              >
                Causey Roofing case study
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Service area — honest, no fabricated offices */}
      <section
        className="fx-section border-t border-[var(--fx-line)]"
        aria-labelledby="service-area"
      >
        <Container>
          <div className="max-w-2xl">
            <h2 id="service-area" className="fx-h2 text-ink">
              Working with Kentucky businesses
            </h2>
            <p className="fx-lede mt-4">
              Based in Richmond, Kentucky, Forgeonix works with businesses
              throughout Kentucky and neighboring states, delivering custom
              software and automation solutions remotely.
            </p>
          </div>
        </Container>
      </section>

      {/* Strengthened CTA — invite the visitor to describe a real problem */}
      <section
        className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]"
        aria-labelledby="solutions-cta"
      >
        <Container>
          <div className="max-w-2xl">
            <h2 id="solutions-cta" className="fx-h2 text-ink">
              Tell us where your business is losing time.
            </h2>
            <p className="fx-lede mt-4">
              Describe the process that keeps causing problems — the manual step,
              the thing only one person knows how to do, the tools that
              don&apos;t talk to each other. We&apos;ll tell you whether
              automation or custom software is the right fix, or if something
              simpler will do.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Describe your problem
              </Button>
              <Link href="/work" className="fx-btn fx-btn--ghost">
                See shipped work
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
