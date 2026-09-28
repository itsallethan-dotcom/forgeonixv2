import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { SolutionSection } from "@/components/solutions/SolutionSection";
import { SOLUTIONS } from "@/content/solutions";

/**
 * Interactive Concepts & Demos — self-initiated, interactive product concepts.
 * Explicitly NOT client work: every demo uses fictional businesses and fictional
 * data. Kept clearly separate from the Shipped Client Work band so the two are
 * never confused.
 */
export function Concepts() {
  return (
    <Section id="concepts" connector pulse className="border-t border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <SectionHead
        index="04"
        label="Interactive concepts & demos"
        titleId="concepts-title"
        title="Interactive concepts & demos."
        lede="Self-initiated builds that show what these systems feel like to use. These are concept demos — not client projects — and every one uses fictional businesses and fictional data."
      />

      <div className="mt-14">
        {SOLUTIONS.map((solution) => (
          <SolutionSection key={solution.id} solution={solution} />
        ))}
      </div>
    </Section>
  );
}
