import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { SolutionSection } from "@/components/solutions/SolutionSection";
import { SOLUTIONS } from "@/content/solutions";

/**
 * Solutions band — the core of the site. Each entry pairs a light problem /
 * solution statement with a live interactive showcase (the demo itself).
 */
export function Solutions() {
  return (
    <Section id="solutions" connector pulse>
      <SectionHead
        index="01"
        label="Solutions"
        titleId="solutions-title"
        title="Real problems, solved with software."
        lede="Each of these started as a problem a business actually had. Every demo below uses fictional businesses and fictional data."
      />

      <div className="mt-14">
        {SOLUTIONS.map((solution) => (
          <SolutionSection key={solution.id} solution={solution} />
        ))}
      </div>
    </Section>
  );
}
