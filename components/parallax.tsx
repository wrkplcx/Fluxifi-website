"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  fadeOut?: boolean
}

export function ParallaxSection({ 
  children, 
  className = "", 
  speed = 0.5,
  fadeOut = false 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const opacity = fadeOut 
    ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    : useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxBackgroundProps {
  children: ReactNode
  className?: string
}

export function ParallaxBackground({ children, className = "" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4A023]/5 to-transparent" />
      </motion.div>
      {children}
    </div>
  )
}

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function RevealOnScroll({ children, className = "", delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y }} transition={{ delay }}>
        {children}
      </motion.div>
    </div>
  )
}

interface StickyScrollProps {
  children: ReactNode
  className?: string
}

export function StickyScroll({ children, className = "" }: StickyScrollProps) {
  return (
    <div className={`sticky top-0 ${className}`}>
      {children}
    </div>
  )
}
