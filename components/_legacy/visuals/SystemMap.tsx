const INPUTS = [
  { id: "in-1", label: "Spreadsheets", meta: "csv" },
  { id: "in-2", label: "Email + texts", meta: "imap" },
  { id: "in-3", label: "Paper forms", meta: "manual" },
  { id: "in-4", label: "Point of sale", meta: "api" },
];

const OUTPUTS = [
  { id: "out-1", label: "Operations dashboard", meta: "live" },
  { id: "out-2", label: "Customer portal", meta: "auth" },
  { id: "out-3", label: "Automated alerts", meta: "queue" },
  { id: "out-4", label: "Job tracking", meta: "sync" },
];

const IN_Y = [52, 140, 228, 316];
const OUT_Y = [76, 164, 252, 340];
const CORE_Y = [170, 200, 240, 270];

const NODE_W = 148;
const NODE_H = 52;

const inPath = (i: number) =>
  `M156 ${IN_Y[i] + NODE_H / 2} C 198 ${IN_Y[i] + NODE_H / 2}, 198 ${CORE_Y[i]}, 236 ${CORE_Y[i]}`;

const outPath = (i: number) =>
  `M364 ${CORE_Y[i]} C 406 ${CORE_Y[i]}, 406 ${OUT_Y[i] + NODE_H / 2}, 444 ${OUT_Y[i] + NODE_H / 2}`;

/**
 * The hero visual: scattered business inputs resolving into one system,
 * and that system producing things people actually use.
 * Pure SVG — no images, no canvas, no particle library.
 */
export function SystemMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 440"
      className={className}
      role="img"
      aria-label="Diagram: scattered business inputs such as spreadsheets, email, paper forms and point of sale data feed into a Forgeonix system, which produces an operations dashboard, customer portal, automated alerts and job tracking."
    >
      <defs>
        <linearGradient id="fx-edge-in" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4d97ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4d97ff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="fx-edge-out" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4d97ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4d97ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="fx-core-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b222c" />
          <stop offset="100%" stopColor="#0e1116" />
        </linearGradient>
        <radialGradient id="fx-core-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#4d97ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4d97ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft core bloom */}
      <ellipse cx="300" cy="220" rx="190" ry="150" fill="url(#fx-core-glow)" />

      {/* edges */}
      <g fill="none" strokeWidth="1.25">
        {IN_Y.map((_, i) => (
          <path
            key={`e-in-${i}`}
            d={inPath(i)}
            stroke="url(#fx-edge-in)"
            pathLength={1}
            className="fx-map__edge"
            style={{ "--len": 1, "--d": `${240 + i * 90}ms` } as React.CSSProperties}
          />
        ))}
        {OUT_Y.map((_, i) => (
          <path
            key={`e-out-${i}`}
            d={outPath(i)}
            stroke="url(#fx-edge-out)"
            pathLength={1}
            className="fx-map__edge"
            style={{ "--len": 1, "--d": `${640 + i * 90}ms` } as React.CSSProperties}
          />
        ))}
      </g>

      {/* travelling packets */}
      <g>
        {IN_Y.map((_, i) => (
          <circle key={`p-in-${i}`} r="2.4" fill="#8fbcff" className="fx-map__packet">
            <animateMotion
              dur="3.6s"
              begin={`${1.2 + i * 0.55}s`}
              repeatCount="indefinite"
              path={inPath(i)}
            />
          </circle>
        ))}
        {OUT_Y.map((_, i) => (
          <circle key={`p-out-${i}`} r="2.4" fill="#8fbcff" className="fx-map__packet">
            <animateMotion
              dur="3.6s"
              begin={`${2.1 + i * 0.55}s`}
              repeatCount="indefinite"
              path={outPath(i)}
            />
          </circle>
        ))}
      </g>

      {/* input nodes */}
      {INPUTS.map((node, i) => (
        <g
          key={node.id}
          className="fx-map__node"
          style={{ "--d": `${120 + i * 90}ms` } as React.CSSProperties}
        >
          <rect
            x="8"
            y={IN_Y[i]}
            width={NODE_W}
            height={NODE_H}
            rx="4"
            fill="#0f1216"
            stroke="rgba(255,255,255,0.09)"
          />
          <rect x="8" y={IN_Y[i]} width="2" height={NODE_H} rx="1" fill="#3d4551" />
          <text
            x="24"
            y={IN_Y[i] + 22}
            fill="#c3cad4"
            fontSize="12.5"
            fontFamily="var(--fx-font-body)"
          >
            {node.label}
          </text>
          <text
            x="24"
            y={IN_Y[i] + 38}
            fill="#5c6673"
            fontSize="8.5"
            letterSpacing="1.6"
            fontFamily="var(--fx-font-mono)"
          >
            {node.meta.toUpperCase()}
          </text>
        </g>
      ))}

      {/* core */}
      <g className="fx-map__node" style={{ "--d": "480ms" } as React.CSSProperties}>
        <rect
          x="236"
          y="130"
          width="128"
          height="180"
          rx="6"
          fill="url(#fx-core-fill)"
          stroke="rgba(77,151,255,0.34)"
        />
        <path d="M236 160h128" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <text
          x="300"
          y="151"
          textAnchor="middle"
          fill="#8fbcff"
          fontSize="9"
          letterSpacing="2.4"
          fontFamily="var(--fx-font-mono)"
        >
          FORGEONIX
        </text>

        {["Model the process", "Connect the data", "Build the interface"].map((line, i) => (
          <g key={line}>
            <rect
              x="252"
              y={176 + i * 38}
              width="96"
              height="26"
              rx="3"
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(255,255,255,0.07)"
            />
            <text
              x="300"
              y={193 + i * 38}
              textAnchor="middle"
              fill="#aab3c0"
              fontSize="9.5"
              fontFamily="var(--fx-font-body)"
            >
              {line}
            </text>
          </g>
        ))}

        <circle cx="350" cy="296" r="3" fill="#4fbf8b" className="fx-map__pulse">
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* output nodes */}
      {OUTPUTS.map((node, i) => (
        <g
          key={node.id}
          className="fx-map__node"
          style={{ "--d": `${700 + i * 90}ms` } as React.CSSProperties}
        >
          <rect
            x="444"
            y={OUT_Y[i]}
            width={NODE_W}
            height={NODE_H}
            rx="4"
            fill="#111721"
            stroke="rgba(77,151,255,0.22)"
          />
          <rect
            x="444"
            y={OUT_Y[i]}
            width="2"
            height={NODE_H}
            rx="1"
            fill="#4d97ff"
          />
          <text
            x="460"
            y={OUT_Y[i] + 22}
            fill="#dfe4ea"
            fontSize="12.5"
            fontFamily="var(--fx-font-body)"
          >
            {node.label}
          </text>
          <text
            x="460"
            y={OUT_Y[i] + 38}
            fill="#5f7893"
            fontSize="8.5"
            letterSpacing="1.6"
            fontFamily="var(--fx-font-mono)"
          >
            {node.meta.toUpperCase()}
          </text>
        </g>
      ))}

      {/* baseline readout */}
      <g className="fx-map__node" style={{ "--d": "1060ms" } as React.CSSProperties}>
        <path d="M8 412h584" stroke="rgba(255,255,255,0.07)" />
        <text
          x="8"
          y="431"
          fill="#5c6673"
          fontSize="9"
          letterSpacing="1.8"
          fontFamily="var(--fx-font-mono)"
        >
          INPUTS 4
        </text>
        <text
          x="108"
          y="431"
          fill="#5c6673"
          fontSize="9"
          letterSpacing="1.8"
          fontFamily="var(--fx-font-mono)"
        >
          SURFACES 4
        </text>
        <text
          x="232"
          y="431"
          fill="#5c6673"
          fontSize="9"
          letterSpacing="1.8"
          fontFamily="var(--fx-font-mono)"
        >
          RE-ENTRY REMOVED
        </text>
      </g>
    </svg>
  );
}
