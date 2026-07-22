"use client";

import { useId, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { WorkPreview, type PreviewVariant } from "@/components/visuals/WorkPreview";

type Project = {
  id: string;
  name: string;
  sector: string;
  status: "Build" | "Prototype" | "Concept";
  file: string;
  variant: PreviewVariant;
  problem: string;
  built: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    id: "studio",
    name: "Studio media and portfolio system",
    sector: "Tattoo and special-effects studio",
    status: "Build",
    file: "studio_media.app",
    variant: "gallery",
    problem:
      "Years of work lived in phone camera rolls and social posts. Nothing was organised, and there was no reliable way to show a client past work in a specific style.",
    built:
      "A website with a managed media library behind it: upload, tag by artist and style, arrange galleries, and publish without touching code.",
    stack: ["Next.js", "Postgres", "Object storage", "Auth"],
  },
  {
    id: "gym",
    name: "Workout and leaderboard platform",
    sector: "Gym and training group",
    status: "Build",
    file: "leaderboard.app",
    variant: "leaderboard",
    problem:
      "Lifts and attendance were logged on paper and a whiteboard, so the standings were always out of date and nobody trusted them.",
    built:
      "Member accounts, workout logging, team grouping, and standings that update as results are entered.",
    stack: ["Next.js", "Supabase", "Row-level security"],
  },
  {
    id: "nails",
    name: "Nail design application",
    sector: "Beauty services",
    status: "Build",
    file: "design_studio.app",
    variant: "designer",
    problem:
      "Design ideas were traded through screenshots and text threads, which made it hard to agree on anything before the appointment.",
    built:
      "A design tool where a look can be assembled, saved, and shared as a reference the artist can work from.",
    stack: ["React", "Canvas rendering", "Persistent saves"],
  },
  {
    id: "command",
    name: "Owner command dashboard",
    sector: "Small business operations",
    status: "Build",
    file: "command_center.app",
    variant: "command",
    problem:
      "An owner had numbers in four places and no single view of how the week was going.",
    built:
      "One screen pulling the operational signals together: activity over time, current status, and what needs attention today.",
    stack: ["Next.js", "Scheduled jobs", "Charting"],
  },
  {
    id: "it",
    name: "Device and campaign tracker",
    sector: "IT deployment",
    status: "Build",
    file: "rollout_tracker.app",
    variant: "tracker",
    problem:
      "A hardware rollout was being tracked in a shared spreadsheet that several technicians edited at once.",
    built:
      "A tracker with a stage per device, technician assignment, and progress that management can read without asking.",
    stack: ["Next.js", "Postgres", "CSV import"],
  },
  {
    id: "queue",
    name: "Digital walk-in queue",
    sector: "Barbershop",
    status: "Concept",
    file: "queue_display.app",
    variant: "queue",
    problem:
      "Walk-ins wait without knowing how long, and staff get interrupted to answer the same question.",
    built:
      "A concept for a shop-floor display and a customer view: join the list, see position, get told when to come back.",
    stack: ["Next.js", "Realtime updates"],
  },
];

const STATUS_STYLE: Record<Project["status"], string> = {
  Build: "text-good border-[rgba(79,191,139,0.35)] bg-[rgba(79,191,139,0.08)]",
  Prototype: "text-amber border-[rgba(223,160,74,0.35)] bg-[rgba(223,160,74,0.08)]",
  Concept: "text-ink-muted border-[var(--fx-line-strong)] bg-[rgba(255,255,255,0.03)]",
};

export function Work() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const baseId = useId();
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <section
      id="work"
      className="fx-section border-t border-[var(--fx-line)] bg-[var(--fx-shell)]"
    >
      <div className="fx-shell">
        <SectionHead
          index="03"
          label="Selected work"
          title="Systems I have built"
          lede="A mix of client work, internal tools, and prototypes. Some are running, some are still being shaped."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          {/* Selector */}
          <Reveal>
            <div
              role="tablist"
              aria-label="Selected work"
              aria-orientation="vertical"
              className="flex flex-col gap-1 border-l border-[var(--fx-line)] pl-0"
            >
              {PROJECTS.map((project) => {
                const selected = project.id === active.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${project.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    className="fx-work-item"
                    onClick={() => setActiveId(project.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                      event.preventDefault();
                      const i = PROJECTS.findIndex((p) => p.id === active.id);
                      const next =
                        event.key === "ArrowDown"
                          ? (i + 1) % PROJECTS.length
                          : (i - 1 + PROJECTS.length) % PROJECTS.length;
                      setActiveId(PROJECTS[next].id);
                      document
                        .getElementById(`${baseId}-tab-${PROJECTS[next].id}`)
                        ?.focus();
                    }}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span
                          className={`fx-h3 block text-[0.98rem] transition-colors ${
                            selected ? "text-ink" : "text-ink-dim"
                          }`}
                        >
                          {project.name}
                        </span>
                        <span className="mt-1 block text-[0.78rem] text-ink-faint">
                          {project.sector}
                        </span>
                      </span>
                      <span
                        className={`fx-mono shrink-0 rounded-full border px-2 py-0.5 text-[0.55rem] ${STATUS_STYLE[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Detail */}
          <Reveal delay={90}>
            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${active.id}`}
              tabIndex={0}
              className="fx-panel fx-ticks h-full overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--fx-line)] px-4 py-2.5">
                <span className="fx-mono text-[0.58rem] text-ink-faint">
                  {active.file}
                </span>
                <span className="fx-mono text-[0.58rem] text-ink-faint">
                  {active.status.toUpperCase()}
                </span>
              </div>

              <div className="border-b border-[var(--fx-line)] bg-[rgba(0,0,0,0.28)] p-4 sm:p-6">
                {/* keyed so the schematic re-mounts and fades on each selection */}
                <WorkPreview
                  key={active.id}
                  variant={active.variant}
                  label={active.file}
                  className="fx-swap h-auto w-full"
                />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="fx-h3 text-[1.2rem] text-ink">{active.name}</h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="fx-mono text-[0.58rem] text-ink-faint">
                      The problem
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
                      {active.problem}
                    </p>
                  </div>
                  <div>
                    <p className="fx-mono text-[0.58rem] text-ink-faint">
                      What was built
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-dim">
                      {active.built}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--fx-line)] pt-5">
                  {active.stack.map((tech) => (
                    <li
                      key={tech}
                      className="fx-mono rounded-[2px] border border-[var(--fx-line)] px-2 py-1 text-[0.55rem] text-ink-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
