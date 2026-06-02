"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  const bgX = useTransform(smoothX, [-1, 1], [-15, 15])
  const bgY = useTransform(smoothY, [-1, 1], [-10, 10])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">

{/* Circuit board background — muted, behind everything */}
{mounted && (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      x: bgX,
      y: bgY,
      willChange: 'transform',
    }}
  >
    <svg
      viewBox="0 0 1200 800"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="30%" y2="0%">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="1" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fadeRight" x1="70%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="fadeCenter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#0A0A0A" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#0A0A0A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* All circuit paths */}
      <g stroke="#F4A023" strokeWidth="1.5" fill="none" opacity="0.35">

        {/* LEFT CLUSTER */}
        <path d="M 0,180 H 60 L 80,160 H 160 L 180,180 H 280" />
        <path d="M 0,220 H 40 L 60,200 H 120 L 140,220 H 200 L 220,200 H 320" />
        <path d="M 0,350 H 80 L 100,330 H 200 L 220,350 H 300" />
        <path d="M 0,420 H 60 L 80,400 H 180 L 200,420 H 260 L 280,400 H 380" />
        <path d="M 0,500 H 100 L 120,480 H 220 L 240,500 H 300" />
        <path d="M 0,580 H 80 L 100,560 H 160 L 180,580 H 240 L 260,560 H 340" />
        <path d="M 100,160 V 120 H 140 L 160,100 H 220" />
        <path d="M 160,180 V 220" />
        <path d="M 200,200 V 160 H 240 L 260,140 H 300" />
        <path d="M 120,330 V 280 H 160 L 180,260 H 260" />
        <path d="M 200,350 V 400" />
        <path d="M 80,480 V 420 H 120" />
        <path d="M 180,500 V 540 H 220 L 240,560" />
        <path d="M 140,560 V 500 H 180" />
        <path d="M 220,140 H 260 L 280,160 H 300 L 320,140 H 360" />
        <path d="M 260,260 H 300 L 320,240 H 360 L 380,260 H 400" />
        <path d="M 300,560 H 340 L 360,540 H 400" />

        {/* RIGHT CLUSTER */}
        <path d="M 1200,150 H 1140 L 1120,170 H 1040 L 1020,150 H 920" />
        <path d="M 1200,200 H 1160 L 1140,220 H 1080 L 1060,200 H 1000 L 980,220 H 880" />
        <path d="M 1200,320 H 1120 L 1100,340 H 1000 L 980,320 H 900" />
        <path d="M 1200,400 H 1140 L 1120,420 H 1020 L 1000,400 H 940 L 920,420 H 820" />
        <path d="M 1200,480 H 1100 L 1080,500 H 980 L 960,480 H 900" />
        <path d="M 1200,580 H 1120 L 1100,600 H 1040 L 1020,580 H 960 L 940,600 H 860" />
        <path d="M 1100,170 V 120 H 1060 L 1040,100 H 980" />
        <path d="M 1040,150 V 200" />
        <path d="M 1000,220 V 160 H 960 L 940,140 H 900" />
        <path d="M 1080,340 V 280 H 1040 L 1020,260 H 940" />
        <path d="M 1000,320 V 400" />
        <path d="M 1120,500 V 440 H 1080" />
        <path d="M 1020,480 V 540 H 980 L 960,560" />
        <path d="M 1060,600 V 540 H 1020" />
        <path d="M 980,140 H 940 L 920,160 H 900 L 880,140 H 840" />
        <path d="M 940,260 H 900 L 880,280 H 840 L 820,260 H 800" />
        <path d="M 860,600 H 820 L 800,580 H 760" />

        {/* TOP */}
        <path d="M 300,80 H 360 L 380,60 H 460 L 480,80 H 540" />
        <path d="M 660,60 H 720 L 740,80 H 800 L 820,60 H 880" />
        <path d="M 400,60 V 40 H 440 L 460,20 H 520" />
        <path d="M 760,40 V 20 H 800 L 820,40" />

        {/* BOTTOM */}
        <path d="M 280,720 H 340 L 360,700 H 440 L 460,720 H 520" />
        <path d="M 680,700 H 740 L 760,720 H 820 L 840,700 H 900" />
        <path d="M 380,740 V 760 H 420 L 440,780" />
        <path d="M 800,740 V 760 H 760" />
      </g>

      {/* Node dots */}
      <g fill="#F4A023" opacity="0.5">
        <circle cx="280" cy="180" r="3" />
        <circle cx="320" cy="200" r="3" />
        <circle cx="220" cy="140" r="3" />
        <circle cx="260" cy="260" r="3" />
        <circle cx="300" cy="350" r="3" />
        <circle cx="380" cy="400" r="3" />
        <circle cx="300" cy="500" r="3" />
        <circle cx="340" cy="580" r="3" />
        <circle cx="360" cy="260" r="2" />
        <circle cx="400" cy="260" r="2" />
        <circle cx="300" cy="140" r="2" />
        <circle cx="360" cy="140" r="2" />
        <circle cx="400" cy="560" r="2" />
        <circle cx="920" cy="150" r="3" />
        <circle cx="880" cy="200" r="3" />
        <circle cx="980" cy="140" r="3" />
        <circle cx="940" cy="260" r="3" />
        <circle cx="900" cy="320" r="3" />
        <circle cx="820" cy="400" r="3" />
        <circle cx="900" cy="480" r="3" />
        <circle cx="860" cy="580" r="3" />
        <circle cx="840" cy="140" r="2" />
        <circle cx="800" cy="260" r="2" />
        <circle cx="760" cy="600" r="2" />
        <circle cx="540" cy="80" r="2" />
        <circle cx="520" cy="20" r="2" />
        <circle cx="660" cy="60" r="2" />
        <circle cx="880" cy="60" r="2" />
        <circle cx="820" cy="40" r="2" />
        <circle cx="520" cy="720" r="2" />
        <circle cx="440" cy="780" r="2" />
        <circle cx="680" cy="700" r="2" />
        <circle cx="900" cy="700" r="2" />
        <circle cx="760" cy="760" r="2" />
      </g>

      {/* Fade overlays */}
      <rect x="0" y="0" width="1200" height="800" fill="url(#fadeCenter)" />
      <rect x="0" y="0" width="1200" height="800" fill="url(#fadeLeft)" />
      <rect x="0" y="0" width="1200" height="800" fill="url(#fadeRight)" />
    </svg>
  </motion.div>
)}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center"
        style={{
          opacity,
          willChange: 'opacity',
        }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ willChange: 'opacity' }}
        >
          <span className="block">We Own Your Technology</span>
          <span className="block mt-2">Program. <span className="text-[#F4A023]">End to End.</span></span>
        </motion.h1>

        <motion.p
          className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ willChange: 'opacity' }}
        >
          One team. Every vendor. Every location. Concept to Day 2.
        </motion.p>

        <motion.p
          className="mt-4 text-xs md:text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ willChange: 'opacity' }}
        >
          Actively deployed inside Fortune 100 and enterprise technology programs.
        </motion.p>

        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ willChange: 'opacity' }}
        >
          <Link
            href="https://calendly.com/fluxifi/fluxifi-intro"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-8 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(244,160,35,0.4)]"
          >
            <span className="relative z-10">Book a consultation</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-4 text-white/70 hover:text-white font-medium text-lg transition-colors flex items-center gap-2 group"
          >
            See how it works
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ opacity }}
      >
        <motion.div
          className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-[#F4A023] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}