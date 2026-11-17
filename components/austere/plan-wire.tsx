type PlanState = "plan" | "check" | "trace"

const W = "#FFFFFF"
const AMBER = "#F4A023"

const DEVICES: { x: number; y: number }[] = [
  { x: 87, y: 280 },
  { x: 180, y: 150 },
  { x: 500, y: 150 },
  { x: 180, y: 410 },
  { x: 500, y: 410 },
  { x: 340, y: 150 },
  { x: 340, y: 280 },
  { x: 200, y: 474 },
  { x: 588, y: 94 },
  { x: 702, y: 130 },
]

function Check({ x, y }: { x: number; y: number }) {
  return <path d={`M${x + 12} ${y - 14} l4 4 l8 -9`} stroke={W} strokeWidth={1.25} fill="none" />
}

/** Monochrome plan of a meeting room. plan: dimension lines. check: devices checked. trace: one cable lit amber to the rack. */
export function PlanWire({ state, label }: { state: PlanState; label: string }) {
  const dim = state === "trace" ? 0.3 : 1
  return (
    <svg viewBox="0 0 800 560" role="img" aria-label={label} className="block h-full w-full">
      <g fill="none" stroke={W} vectorEffect="non-scaling-stroke">
        <g strokeOpacity={0.55 * dim} strokeWidth={1}>
          <path d="M80 80 H600 V480 H190 M140 480 H80 Z" />
          <path d="M600 80 H740 V230 H690 M650 230 H600" />
          <path d="M140 480 A50 50 0 0 1 190 430" strokeDasharray="3 4" />
          <rect x={220} y={240} width={240} height={80} />
          {[240, 290, 340, 390, 440].map((x) => (
            <g key={x}>
              <rect x={x - 12} y={218} width={24} height={14} />
              <rect x={x - 12} y={328} width={24} height={14} />
            </g>
          ))}
          <rect x={192} y={268} width={14} height={24} />
          <rect x={474} y={268} width={14} height={24} />
        </g>

        <g strokeOpacity={0.35 * dim} strokeDasharray="4 5" strokeWidth={1}>
          <path d="M110 120 H680" />
          {[180, 340, 500].map((x) => (
            <path key={x} d={`M${x} 120 V140`} />
          ))}
          <path d="M110 120 V420 H180" />
          <path d="M570 120 V410 H510" />
        </g>

        <g strokeOpacity={0.85 * dim} strokeWidth={1.25}>
          <rect x={84} y={220} width={6} height={120} />
          {[[180, 150], [500, 150], [180, 410], [500, 410]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={8} />
          ))}
          <circle cx={340} cy={150} r={10} />
          <circle cx={340} cy={150} r={3} />
          <rect x={333} y={273} width={14} height={14} />
          <rect x={194} y={468} width={12} height={10} />
          <path d="M580 88 L598 88 L588 104 Z" />
          <rect x={680} y={100} width={44} height={60} />
          <path d="M680 115 H724 M680 130 H724 M680 145 H724" />
        </g>

        {state === "plan" ? (
          <g strokeOpacity={0.6} strokeWidth={1}>
            <path d="M80 46 H740 M80 38 V54 M600 38 V54 M740 38 V54" />
            <path d="M46 80 V480 M38 80 H54 M38 480 H54" />
          </g>
        ) : null}

        {state === "check" ? DEVICES.map((d) => <Check key={`${d.x}-${d.y}`} x={d.x} y={d.y} />) : null}

        {state === "trace" ? (
          <path
            className="trace-path"
            pathLength={1}
            d="M90 280 H110 V120 H702 V130"
            stroke={AMBER}
            strokeWidth={1.75}
          />
        ) : null}
      </g>

      {state === "plan" ? (
        <g fill="#8C8C8C" fontSize={12} fontFamily="inherit">
          <text x={340} y={32} textAnchor="middle">{"36' 0\""}</text>
          <text x={670} y={32} textAnchor="middle">{"12' 0\""}</text>
          <text x={30} y={284} textAnchor="middle" transform="rotate(-90 30 280)">{"28' 0\""}</text>
          <text x={670} y={206} textAnchor="middle">Equipment room</text>
        </g>
      ) : null}
    </svg>
  )
}
