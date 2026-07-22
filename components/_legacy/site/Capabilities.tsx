import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import {
  AutomationSchematic,
  DashboardSchematic,
  PipelineSchematic,
} from "@/components/visuals/Schematics";

const SMALL = [
  {
    code: "C.04",
    title: "Customer portals",
    body: "A place for clients to book, upload, approve, pay, or check status without calling.",
  },
  {
    code: "C.05",
    title: "Tracking systems",
    body: "Jobs, devices, inventory, deliveries, applications. Anything you currently track on a whiteboard.",
  },
  {
    code: "C.06",
    title: "Business websites",
    body: "Sites wired into the operation: real forms, real routing, real follow-up. Not a brochure.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="fx-section border-t border-[var(--fx-line)]">
      <div className="fx-shell">
        <SectionHead
          index="02"
          label="Capabilities"
          title="What I build"
          lede="Six things, done properly, rather than a menu of everything. Most projects combine two or three of them."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* Feature — custom software */}
          <Reveal className="fx-panel fx-ticks flex flex-col overflow-hidden lg:col-span-7">
            <div className="p-7 sm:p-9">
              <span className="fx-mono text-[0.62rem] text-signal">C.01</span>
              <h3 className="fx-h3 mt-4 text-[1.35rem] text-ink">
                Custom business software
              </h3>
              <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-dim">
                When off-the-shelf tools force you to work around them, the
                software should be shaped to the process instead. Intake,
                records, permissions, reporting, and the small rules that only
                your business has.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {["Role-based access", "Audit history", "Reporting", "Data import"].map(
                  (item) => (
                    <li
                      key={item}
                      className="fx-mono flex items-center gap-2 text-[0.6rem] text-ink-muted"
                    >
                      <span aria-hidden className="h-1 w-1 rounded-full bg-signal" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="mt-auto border-t border-[var(--fx-line)] bg-[rgba(0,0,0,0.25)] px-5 py-6">
              <PipelineSchematic className="h-auto w-full" />
            </div>
          </Reveal>

          {/* Feature — dashboards */}
          <Reveal delay={80} className="fx-panel flex flex-col overflow-hidden lg:col-span-5">
            <div className="p-7 sm:p-9">
              <span className="fx-mono text-[0.62rem] text-signal">C.02</span>
              <h3 className="fx-h3 mt-4 text-[1.35rem] text-ink">
                Dashboards and admin tools
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
                One screen that answers the questions you ask every morning, and
                an admin side where staff can actually fix things themselves.
              </p>
            </div>
            <div className="mt-auto border-t border-[var(--fx-line)] bg-[rgba(0,0,0,0.25)] px-5 py-6">
              <DashboardSchematic className="h-auto w-full" />
            </div>
          </Reveal>

          {/* Wide — automation */}
          <Reveal
            delay={140}
            className="fx-panel grid items-center gap-6 p-7 sm:p-9 lg:col-span-12 lg:grid-cols-[minmax(0,1fr)_auto]"
          >
            <div className="max-w-xl">
              <span className="fx-mono text-[0.62rem] text-signal">C.03</span>
              <h3 className="fx-h3 mt-4 text-[1.35rem] text-ink">
                Workflow automation
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-dim">
                Find the step someone repeats fifty times a week and remove the
                typing from it. Scheduled jobs, form-to-record handoffs,
                notifications, exports, and syncing between tools that were never
                designed to cooperate.
              </p>
            </div>
            <AutomationSchematic className="h-auto w-full max-w-[280px] lg:w-[280px]" />
          </Reveal>

          {/* Trio */}
          {SMALL.map((item, i) => (
            <Reveal
              key={item.code}
              delay={180 + i * 70}
              className="fx-panel p-7 lg:col-span-4"
            >
              <span className="fx-mono text-[0.62rem] text-signal">{item.code}</span>
              <h3 className="fx-h3 mt-4 text-[1.08rem] text-ink">{item.title}</h3>
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
