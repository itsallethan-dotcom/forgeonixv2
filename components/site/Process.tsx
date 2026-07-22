import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const STEPS = [
  {
    step: "01",
    title: "Understand the real problem",
    body: "A conversation and a look at how the work happens now. Often the thing that needs building is smaller than expected.",
  },
  {
    step: "02",
    title: "Design the system",
    body: "Decide what the tool tracks, who touches it, and where it fits. You see the shape of it before anything is built.",
  },
  {
    step: "03",
    title: "Build and test it",
    body: "Built in working pieces you can try, with real data, so problems surface early instead of at handoff.",
  },
  {
    step: "04",
    title: "Launch and keep improving",
    body: "Put it in front of the people using it, fix what the first two weeks reveal, and adjust as the business changes.",
  },
];

export function Process() {
  return (
    <Section id="process" connector className="border-t border-[var(--fx-line)]">
      <SectionHead
        index="02"
        label="How it works"
        titleId="process-title"
        title="Four steps, no ceremony"
        lede="Small projects should not need a discovery phase with its own invoice."
      />

      <div className="relative mt-14">
        <Reveal
          variant="draw"
          as="div"
          className="absolute inset-x-0 top-[13px] hidden h-px bg-[var(--fx-line-strong)] lg:block"
        >
          <span className="sr-only" />
        </Reveal>

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 90} as="li" className="relative">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="relative z-10 grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--fx-line-strong)] bg-[var(--fx-void)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                <span className="fx-mono text-[0.62rem] text-ink-faint">
                  Step {item.step}
                </span>
              </div>
              <h3 className="fx-h3 mt-5 text-[1.05rem] text-ink">{item.title}</h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
