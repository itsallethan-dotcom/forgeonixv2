import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const SYMPTOMS = [
  {
    code: "01",
    title: "The real records live in six spreadsheets",
    body: "Every copy is slightly different and nobody is sure which one is current.",
  },
  {
    code: "02",
    title: "Someone retypes the same data every day",
    body: "Hours disappear into copying between an inbox, a sheet, and an invoice.",
  },
  {
    code: "03",
    title: "Only one person knows the process",
    body: "When they are out, the work stops. When they leave, it walks out the door.",
  },
  {
    code: "04",
    title: "The tools do not talk to each other",
    body: "Scheduling, billing, and inventory each hold a piece of the same job.",
  },
  {
    code: "05",
    title: "Customers still call to ask for a status",
    body: "There is no place to look it up, so the phone becomes the interface.",
  },
  {
    code: "06",
    title: "The owner cannot see what is happening",
    body: "Answering a simple question takes a day of digging through records.",
  },
];

export function Friction() {
  return (
    <section
      id="problems"
      className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]"
    >
      <div className="fx-shell">
        <SectionHead
          index="01"
          label="What this fixes"
          title="Most businesses do not need more software. They need the right piece."
          lede="These are the patterns that show up before anyone thinks to call a developer. If a few of them sound familiar, there is usually a system worth building."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--fx-radius-lg)] border border-[var(--fx-line)] bg-[var(--fx-line)] sm:grid-cols-2 lg:grid-cols-3">
          {SYMPTOMS.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 60}
              className="group bg-[var(--fx-panel)] p-6 transition-colors duration-300 hover:bg-[var(--fx-panel-2)] sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="fx-mono text-[0.62rem] text-signal">
                  {item.code}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-[var(--fx-line-strong)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <h3 className="fx-h3 mt-5 text-[1.02rem] text-ink">{item.title}</h3>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
