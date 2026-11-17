"use client"

import { useState, type CSSProperties } from "react"

export const LAYERS = [
  { key: "av", label: "AV", color: "#F4A023" },
  { key: "network", label: "Network", color: "#4DA3FF" },
  { key: "cabling", label: "Cabling", color: "#3ECF8E" },
  { key: "security", label: "Security", color: "#FF5C5C" },
] as const

type LayerKey = (typeof LAYERS)[number]["key"]

/**
 * hero: assembled drawing, dimensions shown.
 * 0: before the three parts come into view (dimensions not yet drawn).
 * 1: design, dimensions drawn in.
 * 2: build, each device checked off in turn.
 * 3: support, drawing dims, the room camera faults and its cable path is traced.
 */
export type DrawingPhase = "hero" | 0 | 1 | 2 | 3

const AMBER = "#F4A023"
const BLUE = "#4DA3FF"
const GREEN = "#3ECF8E"
const RED = "#FF5C5C"
const LINE = "#56606D"
const WALL = "#8A94A3"
const TEXT = "#8A94A3"

const CHECK_POINTS: [number, number][] = [
  [92, 170],
  [92, 350],
  [104, 290],
  [310, 300],
  [430, 300],
  [180, 140],
  [560, 140],
  [180, 450],
  [560, 450],
  [370, 300],
  [470, 150],
  [396, 300],
  [104, 215],
  [104, 395],
  [201, 487],
  [604, 96],
]

const TOP_CHAIRS = [250, 310, 370, 430, 490]

const ASSEMBLE_FROM: Record<LayerKey, string> = {
  av: "translate(-220px, -150px) scale(0.45)",
  network: "translate(220px, -150px) scale(0.45)",
  cabling: "translate(-220px, 150px) scale(0.45)",
  security: "translate(220px, 150px) scale(0.45)",
}

export function RoomDrawing({
  phase = "hero",
  assemble = false,
  title = "Plan of Conference 4B showing AV, network, cabling and security on one drawing",
  className = "",
}: {
  phase?: DrawingPhase
  assemble?: boolean
  title?: string
  className?: string
}) {
  const [visible, setVisible] = useState<Record<LayerKey, boolean>>({
    av: true,
    network: true,
    cabling: true,
    security: true,
  })

  const dimsDrawn = phase === "hero" || (typeof phase === "number" && phase >= 1)
  const checking = phase === 2
  const fault = phase === 3
  const dim = fault ? 0.22 : 1

  const layerStyle = (key: LayerKey): CSSProperties => ({
    opacity: visible[key] ? dim : 0,
    transition: "opacity 500ms ease",
  })

  const assembleStyle = (key: LayerKey): CSSProperties | undefined =>
    assemble ? ({ "--assemble-from": ASSEMBLE_FROM[key] } as CSSProperties) : undefined

  const assembleClass = assemble ? "drawing-assemble" : undefined

  return (
    <figure className={`drawing ${className}`}>
      <svg
        viewBox="0 0 820 620"
        role="img"
        aria-label={title}
        className="block h-auto w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className={assemble ? "drawing-fade" : undefined} style={{ opacity: fault ? 0.45 : 1, transition: "opacity 500ms ease" }}>
          {/* Dimensions */}
          <g stroke={LINE} strokeWidth={1}>
            {[
              "M80,50 H620",
              "M620,50 H760",
              "M45,80 V500",
            ].map((d) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={dimsDrawn ? 0 : 1}
                style={{ transition: "stroke-dashoffset 1200ms ease" }}
              />
            ))}
            <path d="M75,55 L85,45 M615,55 L625,45 M755,55 L765,45 M40,85 L50,75 M40,505 L50,495" />
            <path d="M80,58 V72 M620,58 V72 M760,58 V72 M53,80 H72 M53,500 H72" />
          </g>
          <g fill={TEXT} fontSize={12} style={{ opacity: dimsDrawn ? 1 : 0, transition: "opacity 600ms ease 600ms" }}>
            <text x={350} y={42} textAnchor="middle">
              {"36' 0\""}
            </text>
            <text x={690} y={42} textAnchor="middle">
              {"12' 0\""}
            </text>
            <text x={37} y={290} textAnchor="middle" transform="rotate(-90 37 290)">
              {"28' 0\""}
            </text>
          </g>

          {/* Walls */}
          <g stroke={WALL} strokeWidth={1.5}>
            <path d="M140,500 H80 V80 H620 V500 H190" />
            <path d="M140,494 H86 V86 H614 V494 H190" strokeWidth={1} />
            <path d="M620,80 H760 V240 H700 M660,240 H620" />
            <path d="M626,86 H754 V234 H700 M660,234 H626" strokeWidth={1} />
          </g>
          <g stroke={LINE} strokeWidth={1}>
            <path d="M140,500 L140,450" />
            <path d="M140,450 A50,50 0 0,1 190,500" strokeDasharray="3 3" />
            <path d="M660,240 L660,280" />
            <path d="M660,280 A40,40 0 0,0 700,240" strokeDasharray="3 3" />
          </g>

          {/* Furniture */}
          <g stroke={LINE} strokeWidth={1}>
            <rect x={220} y={255} width={300} height={90} rx={4} />
            {TOP_CHAIRS.map((c) => (
              <rect key={`t${c}`} x={c - 13} y={233} width={26} height={18} rx={3} />
            ))}
            {TOP_CHAIRS.map((c) => (
              <rect key={`b${c}`} x={c - 13} y={349} width={26} height={18} rx={3} />
            ))}
            <rect x={196} y={287} width={18} height={26} rx={3} />
            <rect x={526} y={287} width={18} height={26} rx={3} />
            <rect x={690} y={100} width={50} height={64} />
            <path d="M690,140 H740 M690,152 H740" />
          </g>
          <g fill={TEXT} fontSize={11}>
            <text x={690} y={210} textAnchor="middle">
              Equipment room
            </text>
          </g>

          {/* Title block */}
          <g stroke={LINE} strokeWidth={1}>
            <rect x={600} y={520} width={200} height={84} />
            <path d="M600,556 H800 M720,556 V604" />
          </g>
          <g fill={TEXT}>
            <text x={612} y={545} fontSize={17} fontWeight={700} fill="#F3F5F7">
              Conference 4B
            </text>
            <text x={612} y={576} fontSize={10}>
              Plan, level 4
            </text>
            <text x={612} y={594} fontSize={10}>
              {"Scale 1/4\" = 1'"}
            </text>
            <text x={732} y={576} fontSize={10}>
              Sheet
            </text>
            <text x={732} y={594} fontSize={10}>
              T-401
            </text>
          </g>
        </g>

        {/* Cabling */}
        <g className={assembleClass} style={assembleStyle("cabling")}>
          <g style={layerStyle("cabling")} stroke={GREEN} strokeWidth={1.25} strokeDasharray="6 4">
            <path d="M100,118 H690" />
            <path d="M100,170 V118" />
            <path d="M96,390 H120 V118" />
            <path d="M110,300 H140 V118" />
            <path d="M310,291 V118 M430,291 V118 M370,292 V118 M470,140 V118" />
            <path d="M180,132 V118 M560,132 V118" />
            <path d="M172,450 H150 V118 M568,450 H590 V118" />
            <path d="M201,480 V466 H600 V118" />
            <path d="M600,100 V118" />
          </g>
        </g>

        {/* Network */}
        <g className={assembleClass} style={assembleStyle("network")}>
          <g style={layerStyle("network")} stroke={BLUE} strokeWidth={1.5}>
            <circle cx={470} cy={150} r={10} />
            <circle cx={470} cy={150} r={3} fill={BLUE} />
            <path d="M480,150 H715 V164" />
            <rect x={697} y={108} width={36} height={10} />
            <path d="M390,306 L396,294 L402,306 Z" />
            <path d="M98,221 L110,215 L98,209 Z" />
            <path d="M98,401 L110,395 L98,389 Z" />
          </g>
        </g>

        {/* AV */}
        <g className={assembleClass} style={assembleStyle("av")}>
          <g style={layerStyle("av")} stroke={AMBER} strokeWidth={1.5}>
            <rect x={88} y={170} width={8} height={80} />
            <rect x={88} y={350} width={8} height={80} />
            <circle cx={310} cy={300} r={9} />
            <path d="M304,300 H316 M310,294 V306" />
            <circle cx={430} cy={300} r={9} />
            <path d="M424,300 H436 M430,294 V306" />
            {[
              [180, 140],
              [560, 140],
              [180, 450],
              [560, 450],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r={8} />
                <circle cx={x} cy={y} r={3} />
              </g>
            ))}
            <rect x={362} y={292} width={16} height={16} />
          </g>
          {/* Room camera sits outside the dimmed group so it can fault in red */}
          <g
            style={{ opacity: visible.av ? 1 : 0, transition: "opacity 500ms ease" }}
            stroke={fault ? RED : AMBER}
            strokeWidth={1.5}
          >
            <g style={{ opacity: fault ? 1 : dim }}>
              <rect x={88} y={293} width={10} height={14} />
              <path d="M98,296 L110,290 V310 L98,304 Z" />
            </g>
          </g>
        </g>

        {/* Security */}
        <g className={assembleClass} style={assembleStyle("security")}>
          <g style={layerStyle("security")} stroke={RED} strokeWidth={1.5}>
            <rect x={196} y={480} width={10} height={14} />
            <path d="M199,485 H203" />
            <path d="M612,88 L594,96 L604,108 Z" />
            <circle cx={604} cy={96} r={3} />
          </g>
        </g>

        {/* Support: fault trace from the room camera back to the equipment room */}
        <path
          d="M110,300 H140 V118 H690"
          stroke={RED}
          strokeWidth={2.5}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={fault && visible.av ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1400ms ease 300ms" }}
        />

        {/* Build: devices checked off one at a time */}
        <g stroke="#F3F5F7" strokeWidth={2}>
          {CHECK_POINTS.map(([x, y], i) => (
            <g
              key={`${x}-${y}`}
              transform={`translate(${x + 12} ${y - 12})`}
              style={{
                opacity: checking ? 1 : 0,
                transition: `opacity 250ms ease ${checking ? i * 140 : 0}ms`,
              }}
            >
              <circle r={7} fill="#0C0F13" strokeWidth={1} stroke="#3ECF8E" />
              <path d="M-3.5,0 L-1,2.8 L3.5,-2.8" stroke="#3ECF8E" />
            </g>
          ))}
        </g>
      </svg>

      <figcaption className="mt-6">
        <span className="sr-only">Show or hide a trade on the drawing.</span>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {LAYERS.map((layer) => {
            const on = visible[layer.key]
            return (
              <li key={layer.key}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setVisible((v) => ({ ...v, [layer.key]: !v[layer.key] }))}
                  className="flex items-center gap-3 py-1 text-base text-[#F3F5F7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3F5F7]"
                  style={{ opacity: on ? 1 : 0.4 }}
                >
                  <span aria-hidden="true" className="block h-[2px] w-6" style={{ backgroundColor: layer.color }} />
                  {layer.label}
                </button>
              </li>
            )
          })}
        </ul>
      </figcaption>
    </figure>
  )
}
