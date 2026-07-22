const STROKE = "rgba(255,255,255,0.10)";
const STROKE_HOT = "rgba(77,151,255,0.42)";
const FILL = "rgba(255,255,255,0.03)";

/** Intake form resolving into a structured record and a work queue. */
export function PipelineSchematic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 150" className={className} aria-hidden focusable="false">
      <rect x="1" y="26" width="104" height="98" rx="4" fill={FILL} stroke={STROKE} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="14"
          y={44 + i * 20}
          width={i === 3 ? 44 : 78}
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.10)"
        />
      ))}
      <text x="14" y="20" fill="#5c6673" fontSize="8" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        INTAKE
      </text>

      <path d="M105 75h48" stroke={STROKE_HOT} strokeWidth="1.2" fill="none" />
      <path d="M147 71l6 4-6 4z" fill="#4d97ff" />

      <rect x="154" y="40" width="108" height="70" rx="4" fill={FILL} stroke={STROKE_HOT} />
      <path d="M154 60h108" stroke={STROKE} />
      <text x="166" y="55" fill="#8fbcff" fontSize="8" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        RECORD
      </text>
      {[0, 1].map((i) => (
        <rect key={i} x="166" y={72 + i * 16} width={i ? 52 : 76} height="7" rx="2" fill="rgba(255,255,255,0.12)" />
      ))}

      <path d="M262 75h48" stroke={STROKE_HOT} strokeWidth="1.2" fill="none" />
      <path d="M304 71l6 4-6 4z" fill="#4d97ff" />

      <rect x="311" y="26" width="104" height="98" rx="4" fill={FILL} stroke={STROKE} />
      <text x="324" y="20" fill="#5c6673" fontSize="8" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        QUEUE
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="322" y={40 + i * 26} width="82" height="18" rx="3" fill="rgba(255,255,255,0.045)" stroke={STROKE} />
          <circle cx="333" cy={49 + i * 26} r="2.5" fill={i === 0 ? "#4fbf8b" : i === 1 ? "#dfa04a" : "#4d5663"} />
          <rect x="342" y={45 + i * 26} width={52 - i * 10} height="6" rx="2" fill="rgba(255,255,255,0.11)" />
        </g>
      ))}
    </svg>
  );
}

/** Compact operations readout. */
export function DashboardSchematic({ className = "" }: { className?: string }) {
  const bars = [34, 52, 28, 66, 44, 74, 58];
  return (
    <svg viewBox="0 0 300 150" className={className} aria-hidden focusable="false">
      <rect x="1" y="1" width="298" height="148" rx="4" fill={FILL} stroke={STROKE} />
      <path d="M1 28h298" stroke={STROKE} />
      <circle cx="16" cy="14.5" r="3" fill="#4fbf8b" />
      <text x="28" y="18" fill="#5c6673" fontSize="8" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        TODAY
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={14 + i * 92} y="42" width="80" height="34" rx="3" fill="rgba(255,255,255,0.04)" stroke={STROKE} />
          <rect x={24 + i * 92} y="52" width="28" height="5" rx="2" fill="rgba(255,255,255,0.10)" />
          <rect x={24 + i * 92} y="62" width={44 - i * 8} height="8" rx="2" fill={i === 0 ? "rgba(77,151,255,0.55)" : "rgba(255,255,255,0.16)"} />
        </g>
      ))}

      {bars.map((h, i) => (
        <rect
          key={i}
          x={16 + i * 40}
          y={132 - h}
          width="24"
          height={h}
          rx="2"
          fill={i === 5 ? "rgba(77,151,255,0.55)" : "rgba(255,255,255,0.10)"}
        />
      ))}
      <path d="M10 132h280" stroke={STROKE} />
    </svg>
  );
}

/** Repeating manual step being replaced by a trigger. */
export function AutomationSchematic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 96" className={className} aria-hidden focusable="false">
      <rect x="1" y="26" width="72" height="44" rx="4" fill={FILL} stroke={STROKE} />
      <text x="14" y="52" fill="#aab3c0" fontSize="9" fontFamily="var(--fx-font-body)">
        Trigger
      </text>
      <path d="M73 48h34" stroke={STROKE_HOT} strokeWidth="1.2" />
      <path d="M101 44l6 4-6 4z" fill="#4d97ff" />
      <rect x="108" y="18" width="60" height="60" rx="30" fill="rgba(77,151,255,0.10)" stroke={STROKE_HOT} />
      <path d="M130 40l10 8-10 8z" fill="#8fbcff" />
      <path d="M168 48h34" stroke={STROKE_HOT} strokeWidth="1.2" />
      <path d="M196 44l6 4-6 4z" fill="#4d97ff" />
      <rect x="203" y="26" width="56" height="44" rx="4" fill={FILL} stroke={STROKE} />
      <text x="214" y="52" fill="#aab3c0" fontSize="9" fontFamily="var(--fx-font-body)">
        Done
      </text>
    </svg>
  );
}
