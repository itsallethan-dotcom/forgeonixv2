const INPUTS = ["Spreadsheets", "Email + texts", "Paper forms", "Point of sale"];
const CORE = ["Model the process", "Connect the data", "Build the interface"];
const OUTPUTS = [
  "Operations dashboard",
  "Customer portal",
  "Automated alerts",
  "Job tracking",
];

function Arrow() {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <svg viewBox="0 0 12 26" className="h-6 w-3" focusable="false">
        <path d="M6 0v18" stroke="rgba(77,151,255,0.45)" strokeWidth="1.2" />
        <path d="M2 17l4 6 4-6z" fill="rgba(77,151,255,0.7)" />
      </svg>
    </div>
  );
}

/**
 * Small-screen version of the hero diagram. Real DOM instead of a scaled SVG,
 * so every label stays legible at 320px.
 */
export function SystemMapCompact({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="fx-mono text-[0.55rem] text-ink-faint">Scattered inputs</p>
      <ul className="mt-2.5 grid grid-cols-2 gap-2">
        {INPUTS.map((item) => (
          <li
            key={item}
            className="rounded-[3px] border border-[var(--fx-line)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-[0.78rem] text-ink-dim"
          >
            {item}
          </li>
        ))}
      </ul>

      <Arrow />

      <div className="rounded-[4px] border border-[var(--fx-signal-line)] bg-[rgba(77,151,255,0.05)] p-4">
        <p className="fx-mono text-center text-[0.55rem] text-signal-soft">
          Forgeonix
        </p>
        <ul className="mt-3 space-y-2">
          {CORE.map((item) => (
            <li
              key={item}
              className="rounded-[3px] border border-[var(--fx-line)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-center text-[0.78rem] text-ink-dim"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Arrow />

      <p className="fx-mono text-[0.55rem] text-ink-faint">Things people use</p>
      <ul className="mt-2.5 grid grid-cols-2 gap-2">
        {OUTPUTS.map((item) => (
          <li
            key={item}
            className="rounded-[3px] border border-[rgba(77,151,255,0.22)] bg-[rgba(255,255,255,0.03)] px-3 py-2.5 text-[0.78rem] text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
