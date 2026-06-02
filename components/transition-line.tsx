"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function TransitionLine() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Text fades in then back out as you scroll through
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  )

  // Subtle scale — starts slightly small, grows to full
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.92, 1, 1, 0.96]
  )

  // First part fades in first
  const firstLineOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0, 1, 1, 0]
  )

  // Second part fades in slightly after
  const secondLineOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.9, 1],
    [0, 1, 1, 0]
  )

  return (
    // Tall container — scroll distance determines how long user stays on this section
    <div ref={containerRef} className="relative h-[300vh] bg-[#0A0A0A]">

      {/* Sticky viewport — pins while user scrolls through the tall container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-[#0A0A0A]">

        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(244,160,35,0.06) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          style={{ opacity, scale, willChange: 'transform, opacity' }}
        >
          <motion.span
            className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white/50 font-light leading-relaxed"
            style={{ opacity: firstLineOpacity }}
          >
            Most technology programs don&apos;t fail because of bad products.
          </motion.span>
          <motion.span
            className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-medium leading-relaxed mt-4"
            style={{ opacity: secondLineOpacity }}
          >
            They fail because nobody owns the outcome.
          </motion.span>
        </motion.div>

      </div>
    </div>
  )
}