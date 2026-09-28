import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Mark } from "@/components/ui/Mark";

const PRINCIPLES = [
  {
    title: "It has to hold up",
    body: "Built for real work, not just a polished demo.",
  },
  {
    title: "People have to want to use it",
    body: "Usable beats clever.",
  },
  {
    title: "You should own it",
    body: "Documented, understandable, and free from unnecessary lock-in.",
  },
];

export function About() {
  return (
    <Section id="about" connector className="border-t border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <SectionHead
            index="08"
            label="About"
            titleId="about-title"
            title="Experience from both sides of the screen."
          />

          <Reveal delay={120}>
            <p className="fx-lede mt-6">
              I&apos;ve spent years helping people solve technical problems across
              IT support, infrastructure, automation, and software development.
              Those experiences taught me that the best software isn&apos;t the one
              with the most features—it&apos;s the one people enjoy using because it
              fits naturally into their work.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="fx-lede mt-4">That&apos;s the philosophy behind Forgeonix.</p>
          </Reveal>
        </div>

        <Reveal delay={100} className="fx-panel fx-ticks self-start p-7 sm:p-9">
          <Mark className="h-8 w-auto opacity-80" title="Forgeonix" />
          <p className="fx-mono mt-6 text-[0.58rem] text-ink-faint">How I work</p>
          <ul className="mt-4 divide-y divide-[var(--fx-line)]">
            {PRINCIPLES.map((item) => (
              <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                <h3 className="fx-h3 text-[0.98rem] text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
