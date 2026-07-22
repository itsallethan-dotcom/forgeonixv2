export type PreviewVariant =
  | "gallery"
  | "leaderboard"
  | "designer"
  | "command"
  | "tracker"
  | "queue";

const LINE = "rgba(255,255,255,0.10)";
const LINE_HOT = "rgba(77,151,255,0.40)";
const PANE = "rgba(255,255,255,0.035)";
const BAR = "rgba(255,255,255,0.12)";
const HOT = "rgba(77,151,255,0.55)";

function Chrome({ label }: { label: string }) {
  return (
    <>
      <rect x="0.5" y="0.5" width="479" height="269" rx="5" fill="rgba(0,0,0,0.28)" stroke={LINE} />
      <path d="M0 26h480" stroke={LINE} />
      <circle cx="16" cy="13.5" r="3" fill="rgba(255,255,255,0.16)" />
      <circle cx="27" cy="13.5" r="3" fill="rgba(255,255,255,0.10)" />
      <circle cx="38" cy="13.5" r="3" fill="rgba(255,255,255,0.10)" />
      <text x="54" y="17" fill="#5c6673" fontSize="8" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        {label}
      </text>
    </>
  );
}

function Gallery() {
  return (
    <>
      <rect x="16" y="42" width="120" height="14" rx="3" fill={BAR} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const h = row === 0 ? (col === 1 ? 96 : 72) : 72;
        return (
          <g key={i}>
            <rect
              x={16 + col * 152}
              y={70 + row * 106}
              width="136"
              height={h}
              rx="4"
              fill={PANE}
              stroke={col === 1 && row === 0 ? LINE_HOT : LINE}
            />
            <path
              d={`M${28 + col * 152} ${70 + row * 106 + h - 18}h${col === 1 && row === 0 ? 90 : 62}`}
              stroke={col === 1 && row === 0 ? HOT : BAR}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
}

function Leaderboard() {
  return (
    <>
      <rect x="16" y="42" width="96" height="12" rx="3" fill={BAR} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="16"
            y={66 + i * 38}
            width="290"
            height="30"
            rx="4"
            fill={i === 0 ? "rgba(77,151,255,0.10)" : PANE}
            stroke={i === 0 ? LINE_HOT : LINE}
          />
          <text
            x="30"
            y={85 + i * 38}
            fill={i === 0 ? "#8fbcff" : "#5c6673"}
            fontSize="9"
            fontFamily="var(--fx-font-mono)"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
          <rect x="50" y={76 + i * 38} width={90 - i * 8} height="7" rx="2" fill={BAR} />
          <rect x="240" y={76 + i * 38} width={52 - i * 6} height="7" rx="2" fill={i === 0 ? HOT : BAR} />
        </g>
      ))}
      <rect x="322" y="66" width="142" height="182" rx="4" fill={PANE} stroke={LINE} />
      <rect x="336" y="82" width="70" height="8" rx="2" fill={BAR} />
      {[42, 66, 30, 78, 54].map((h, i) => (
        <rect key={i} x={338 + i * 24} y={218 - h} width="14" height={h} rx="2" fill={i === 3 ? HOT : BAR} />
      ))}
      <path d="M332 220h124" stroke={LINE} />
    </>
  );
}

function Designer() {
  return (
    <>
      <rect x="16" y="42" width="90" height="206" rx="4" fill={PANE} stroke={LINE} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="28" y={58 + i * 34} width="66" height="24" rx="3" fill={i === 1 ? "rgba(77,151,255,0.16)" : "rgba(255,255,255,0.05)"} stroke={i === 1 ? LINE_HOT : LINE} />
      ))}
      <rect x="120" y="42" width="230" height="206" rx="4" fill="rgba(0,0,0,0.3)" stroke={LINE} />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={168 + i * 42}
          cy={150 - Math.abs(2 - i) * 10}
          rx="16"
          ry="26"
          fill={i === 2 ? "rgba(77,151,255,0.18)" : "rgba(255,255,255,0.05)"}
          stroke={i === 2 ? LINE_HOT : LINE}
        />
      ))}
      <rect x="364" y="42" width="100" height="206" rx="4" fill={PANE} stroke={LINE} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="376" y={58 + i * 40} width="48" height="6" rx="2" fill={BAR} />
          <rect x="376" y={70 + i * 40} width="76" height="14" rx="3" fill="rgba(255,255,255,0.05)" stroke={LINE} />
        </g>
      ))}
      <rect x="376" y="212" width="76" height="22" rx="3" fill={HOT} />
    </>
  );
}

function Command() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={16 + i * 114} y="42" width="102" height="52" rx="4" fill={PANE} stroke={i === 0 ? LINE_HOT : LINE} />
          <rect x={28 + i * 114} y="56" width="40" height="6" rx="2" fill={BAR} />
          <rect x={28 + i * 114} y="70" width={54 - i * 6} height="10" rx="2" fill={i === 0 ? HOT : BAR} />
        </g>
      ))}
      <rect x="16" y="108" width="272" height="140" rx="4" fill={PANE} stroke={LINE} />
      <polyline
        points="32,222 76,196 120,206 164,166 208,178 252,140"
        fill="none"
        stroke={HOT}
        strokeWidth="1.6"
      />
      {[[32, 222], [76, 196], [120, 206], [164, 166], [208, 178], [252, 140]].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="2.2" fill="#8fbcff" />
      ))}
      <path d="M28 236h248" stroke={LINE} />
      <rect x="300" y="108" width="164" height="140" rx="4" fill={PANE} stroke={LINE} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="316" cy={130 + i * 30} r="3" fill={i === 1 ? "#dfa04a" : "#4fbf8b"} />
          <rect x="328" y={126 + i * 30} width={104 - i * 14} height="7" rx="2" fill={BAR} />
        </g>
      ))}
    </>
  );
}

function Tracker() {
  const cols = ["Queued", "Imaging", "Deployed"];
  const counts = [3, 2, 2];
  return (
    <>
      {cols.map((c, i) => (
        <g key={c}>
          <text x={24 + i * 152} y="54" fill="#5c6673" fontSize="8.5" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
            {c.toUpperCase()}
          </text>
          <rect x={16 + i * 152} y="62" width="136" height="186" rx="4" fill="rgba(255,255,255,0.02)" stroke={LINE} />
          {Array.from({ length: counts[i] }).map((_, j) => (
            <g key={j}>
              <rect
                x={28 + i * 152}
                y={76 + j * 46}
                width="112"
                height="34"
                rx="3"
                fill={PANE}
                stroke={i === 2 ? LINE_HOT : LINE}
              />
              <rect x={38 + i * 152} y={86 + j * 46} width={62 - j * 8} height="6" rx="2" fill={BAR} />
              <rect x={38 + i * 152} y={97 + j * 46} width="34" height="5" rx="2" fill={i === 2 ? HOT : "rgba(255,255,255,0.08)"} />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}

function Queue() {
  return (
    <>
      <rect x="16" y="42" width="200" height="206" rx="4" fill={PANE} stroke={LINE} />
      <text x="30" y="64" fill="#5c6673" fontSize="8.5" letterSpacing="1.6" fontFamily="var(--fx-font-mono)">
        NOW SERVING
      </text>
      <text x="30" y="112" fill="#8fbcff" fontSize="34" fontFamily="var(--fx-font-mono)">
        A-14
      </text>
      <path d="M30 128h172" stroke={LINE} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="30" y={144 + i * 26} width="172" height="18" rx="3" fill="rgba(255,255,255,0.04)" stroke={LINE} />
          <text x="40" y={157 + i * 26} fill="#5c6673" fontSize="8.5" fontFamily="var(--fx-font-mono)">
            {`A-${15 + i}`}
          </text>
          <rect x="80" y={150 + i * 26} width={78 - i * 12} height="6" rx="2" fill={BAR} />
        </g>
      ))}
      <rect x="232" y="42" width="232" height="206" rx="4" fill="rgba(0,0,0,0.3)" stroke={LINE_HOT} />
      <rect x="252" y="66" width="90" height="8" rx="2" fill={BAR} />
      <rect x="252" y="88" width="192" height="46" rx="4" fill="rgba(77,151,255,0.10)" stroke={LINE_HOT} />
      <text x="268" y="117" fill="#8fbcff" fontSize="11" fontFamily="var(--fx-font-body)">
        Est. wait 18 min
      </text>
      {[0, 1].map((i) => (
        <rect key={i} x="252" y={148 + i * 34} width="192" height="24" rx="3" fill={PANE} stroke={LINE} />
      ))}
      <rect x="252" y="216" width="192" height="24" rx="3" fill={HOT} />
    </>
  );
}

const VARIANTS: Record<PreviewVariant, () => React.ReactElement> = {
  gallery: Gallery,
  leaderboard: Leaderboard,
  designer: Designer,
  command: Command,
  tracker: Tracker,
  queue: Queue,
};

export function WorkPreview({
  variant,
  label,
  className = "",
}: {
  variant: PreviewVariant;
  label: string;
  className?: string;
}) {
  const Body = VARIANTS[variant];
  return (
    <svg viewBox="0 0 480 270" className={className} aria-hidden focusable="false">
      <Chrome label={label} />
      <Body />
    </svg>
  );
}
