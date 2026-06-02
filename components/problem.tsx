"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Problem() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const closingRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.01 })

  const { scrollYProgress: closingProgress } = useScroll({
    target: closingRef,
    offset: ["start end", "end start"]
  })

  const closingScale = useTransform(closingProgress, [0, 0.4, 0.7, 1], [0.8, 1, 1.4, 2])
  const closingOpacity = useTransform(closingProgress, [0, 0.3, 0.6, 0.85, 1], [0, 1, 1, 0.3, 0])

  const problems = [
    {
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      header: "Between design and deployment.",
      text: "What was designed and what gets built are two different things. Nobody caught the gap. You find out when it doesn't work."
    },
    {
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      header: "Between deployment and operations.",
      text: "The consultant is gone. The integrator is gone. Your team is left holding a system nobody explained and nobody owns."
    },
    {
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      header: "Between operations and the next project.",
      text: "Nothing was captured. Nothing was documented. Your next location starts from scratch and repeats every mistake."
    },
  ]

  return (
    <>
      <section
        id="how-it-works"
        ref={containerRef}
        className="relative py-24 md:py-32 px-4 md:px-6 bg-[#0A0A0A] overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] -left-[400px] top-0 bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute w-[600px] h-[600px] -right-[200px] bottom-0 bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Section number */}
        <div className="absolute top-8 right-8 text-white/20 text-6xl md:text-8xl font-bold font-mono">
          01
        </div>

        <div ref={ref} className="relative max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-12 md:mb-20"
          >
            <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">The Problem</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mt-4 leading-tight max-w-4xl">
              There are three places every technology project falls apart.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Problem list */}
            <div className="space-y-6 md:space-y-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-red-500/30 transition-colors mt-1">
                    <svg className="w-5 h-5 text-white/60 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={problem.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{problem.header}</h3>
                    <p className="text-white/60 leading-relaxed">{problem.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chaos visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <div className="aspect-square max-w-md mx-auto relative px-10 py-12 md:px-12 md:py-16">
                <motion.div
                  className="absolute inset-0 border border-red-500/15 rounded-2xl overflow-hidden bg-[#0d0d0d]"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  {/* Floating chaos boxes */}
                  {[
                    { left: 15, top: 8, rotate: -15, scale: 0.9, opacity: 0.6, label: "Design" },
                    { left: 52, top: 6, rotate: 18, scale: 0.95, opacity: 0.7, label: "PM" },
                    { left: 72, top: 18, rotate: -10, scale: 0.9, opacity: 0.55, label: "Install" },
                    { left: 8, top: 52, rotate: 12, scale: 0.95, opacity: 0.65, label: "Day 2" },
                    { left: 42, top: 58, rotate: -20, scale: 0.85, opacity: 0.6, label: "Internal Teams" },
                    { left: 68, top: 65, rotate: 10, scale: 0.95, opacity: 0.7, label: "External Vendors" },
                  ].map((config, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-red-500/50 rounded-lg bg-red-500/10 backdrop-blur-sm flex items-center justify-center"
                      style={{
                        left: `${config.left}%`,
                        top: `${config.top}%`,
                        width: "5rem",
                        height: "3.5rem",
                      }}
                      animate={{
                        rotate: [`${config.rotate}deg`, `${config.rotate + 3}deg`, `${config.rotate}deg`],
                        scale: [config.scale, config.scale + 0.04, config.scale],
                        y: [0, -5, 0],
                        opacity: [config.opacity, config.opacity + 0.1, config.opacity]
                      }}
                      transition={{
                        duration: 4 + i * 0.6,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-xs font-medium text-red-400/80 text-center px-1 pointer-events-none leading-tight">
                        {config.label}
                      </span>
                    </motion.div>
                  ))}

                  {/* Disconnected dashed lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 30% 25% L 45% 35%"
                      stroke="rgba(239, 68, 68, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      fill="none"
                      animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.path
                      d="M 55% 40% L 70% 55%"
                      stroke="rgba(239, 68, 68, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      fill="none"
                      animate={{ opacity: [0.3, 0.5, 0.3], strokeDashoffset: [0, -10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.path
                      d="M 25% 60% L 40% 75%"
                      stroke="rgba(239, 68, 68, 0.2)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      fill="none"
                      animate={{ opacity: [0.2, 0.4, 0.2], strokeDashoffset: [0, 15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </svg>

                  {/* Warning indicator */}
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs text-red-400">Uncoordinated</span>
                  </motion.div>

                  {/* Subtle glitch */}
                  <motion.div
                    className="absolute inset-0 bg-red-500/3"
                    animate={{ opacity: [0, 0.08, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 4 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing statement — magnifies and fades on scroll out */}
      <div
        ref={closingRef}
        className="relative h-[60vh] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: closingOpacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(244,160,35,0.08) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F4A023] text-center px-6"
          style={{
            scale: closingScale,
            opacity: closingOpacity,
            willChange: 'transform, opacity',
            transformOrigin: 'center center',
          }}
        >
          Fluxifi owns all three.
        </motion.p>
      </div>
    </>
  )
}