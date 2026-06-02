"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// All diagram geometry calculated from a 400x400 viewBox
// Center hub: cx=200, cy=200, size=80x80
// Node size: 80x40
// Radius from center to node center: 140px
// 6 nodes at 60 degree intervals starting from top (270 degrees)

const VIEWBOX = 400
const CENTER = 200
const RADIUS = 140
const NODE_W = 80
const NODE_H = 40
const HUB_SIZE = 80

// Calculate node positions at 60 degree intervals
// Starting at -90 degrees (12 o'clock) going clockwise
const nodeAngles = [-90, -30, 30, 90, 150, 210]
const nodeLabels = ['PM', 'Install', 'External Vendors', 'Internal Teams', 'Ops & Intelligence', 'Design']

const nodes = nodeAngles.map((angle, i) => {
  const rad = (angle * Math.PI) / 180
  const cx = CENTER + RADIUS * Math.cos(rad)
  const cy = CENTER + RADIUS * Math.sin(rad)
  return {
    cx,
    cy,
    x: cx - NODE_W / 2,
    y: cy - NODE_H / 2,
    label: nodeLabels[i],
    delay: i * 0.1,
    // Point on node box closest to center for line endpoint
    // Line from center hub edge to node box edge
    lineStartX: CENTER + (HUB_SIZE / 2 + 4) * Math.cos(rad),
    lineStartY: CENTER + (HUB_SIZE / 2 + 4) * Math.sin(rad),
    lineEndX: cx - (NODE_W / 2 + 2) * Math.cos(rad),
    lineEndY: cy - (NODE_H / 2 + 2) * Math.sin(rad),
  }
})

const solutions = [
  { text: "We sit on your side of the table", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { text: "We coordinate all your vendors", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
  { text: "One point of accountability", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { text: "From concept to Day 2 and beyond", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
]

export function Solution() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-4 md:px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line x1="0%" y1="40%" x2="100%" y2="45%" stroke="#F4A023" strokeWidth="0.5" />
          <line x1="0%" y1="70%" x2="100%" y2="65%" stroke="#F4A023" strokeWidth="0.5" />
          <line x1="40%" y1="0%" x2="35%" y2="100%" stroke="#F4A023" strokeWidth="0.5" />
          <line x1="60%" y1="0%" x2="65%" y2="100%" stroke="#F4A023" strokeWidth="0.5" />
        </svg>
        <div className="absolute w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#F4A023]/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Section number */}
      <div className="absolute top-8 right-8 text-white/20 text-6xl md:text-8xl font-bold font-mono">
        02
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Outer border */}
              <div className="absolute inset-0 border border-[#F4A023]/20 rounded-2xl bg-[#111]">
                <div className="absolute inset-0 grid-pattern opacity-30" />
              </div>

              {/* SVG diagram — everything in one coordinate system */}
              <svg
                viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Spoke lines */}
                {nodes.map((node, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={node.lineStartX}
                    y1={node.lineStartY}
                    x2={node.lineEndX}
                    y2={node.lineEndY}
                    stroke="#F4A023"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + node.delay }}
                  />
                ))}

                {/* Data flow particles */}
                {nodes.map((node, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    r="2.5"
                    fill="#F4A023"
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                      opacity: [0, 1, 1, 0],
                      cx: [node.lineStartX, node.lineEndX],
                      cy: [node.lineStartY, node.lineEndY],
                    } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 2 + i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                  />
                ))}

                {/* Center hub */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                >
                  <rect
                    x={CENTER - HUB_SIZE / 2}
                    y={CENTER - HUB_SIZE / 2}
                    width={HUB_SIZE}
                    height={HUB_SIZE}
                    rx="12"
                    fill="url(#hubGradient)"
                  />
                  <image
                    href="/images/fluxifi-logo.png"
                    x={CENTER - 32}
                    y={CENTER - 32}
                    width="64"
                    height="64"
                    style={{ filter: 'brightness(0)' }}
                  />
                </motion.g>

                {/* Node boxes */}
                {nodes.map((node, i) => (
                  <motion.g
                    key={`node-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + node.delay }}
                    style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx="6"
                      fill="#1a1a1a"
                      stroke="#F4A023"
                      strokeOpacity="0.5"
                      strokeWidth="1"
                    />
                    <foreignObject
                      x={node.x}
                      y={node.y}
                      width={NODE_W}
                      height={NODE_H}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                        }}
                      >
                        <span style={{
                          fontSize: '9px',
                          color: 'rgba(244,160,35,0.9)',
                          fontWeight: 500,
                          textAlign: 'center',
                          lineHeight: '1.2',
                        }}>
                          {node.label}
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                ))}

                {/* Gradients */}
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(244,160,35,0.4)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4A023" />
                    <stop offset="100%" stopColor="#E89500" />
                  </linearGradient>
                </defs>

                {/* Hub glow circle */}
                <motion.circle
                  cx={CENTER}
                  cy={CENTER}
                  r="60"
                  fill="url(#hubGlow)"
                  animate={{
                    r: [55, 65, 55],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>

              {/* Coordinated badge */}
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-emerald-400">Coordinated</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-12"
            >
              <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">The Solution</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mt-4 leading-tight">
                We own it.
              </h2>
              <p className="text-white/60 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
                This is what an owner&apos;s rep does. Not just advise, not just review drawings. Ownership on tap.
              </p>
            </motion.div>

            <div className="space-y-4 md:space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.div
                    className="w-12 h-12 bg-[#F4A023]/10 border border-[#F4A023]/30 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: 'rgba(244,160,35,0.2)',
                      boxShadow: '0 0 20px rgba(244,160,35,0.3)'
                    }}
                  >
                    <svg className="w-5 h-5 text-[#F4A023]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={solution.icon} />
                    </svg>
                  </motion.div>
                  <span className="text-xl text-white/80 pt-2.5 group-hover:text-white transition-colors">{solution.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}