import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { INDUSTRIES } from "@/content/industries";

/**
 * Who we help — a quick relevance check for the visitor. Industry tiles reuse
 * the panel + ticks system; deliberately light so it reads fast.
 */
export function WhoWeHelp() {
  return (
    <Section id="who-we-help" connector className="border-t border-[var(--fx-line)] bg-[var(--fx-shell)]">
      <SectionHead
        index="02"
        label="Who we help"
        titleId="who-we-help-title"
        title="Built for small businesses."
        lede="Every business has unique problems. Forgeonix helps identify those problems and build practical solutions."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry, i) => (
          <Reveal key={industry} delay={i * 60} as="li">
            <div className="fx-panel fx-ticks flex items-center gap-3.5 p-5">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              <span className="fx-h3 text-[1.05rem] text-ink">{industry}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
