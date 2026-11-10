"use client"

import type { ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { BookButton } from "@/components/site/primitives"

export function Hero({ image }: { image: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
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
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0A0A0A] pt-36 pb-20 md:pt-44 md:pb-28">

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs md:text-sm text-white/40 mb-4">
            AV, IT and low-voltage design and project management
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight text-balance">
            {"Your building has a dozen technology vendors. Not one of them answers for whether it works. "}
            <span className="text-[#F4A023]">We do.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-pretty">
            The screens, cameras, sound, Wi-Fi and cabling that make a building work. We design it, manage everyone
            who installs it, and answer for the result.
          </p>
          <p className="mt-4 text-xs md:text-sm text-white/40 leading-relaxed">
            For companies opening or renovating many locations, and the architects, contractors and IT providers who
            work with them.
          </p>
          <div className="mt-10">
            <BookButton />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {image}
        </motion.div>
      </div>
    </section>
  )
}
