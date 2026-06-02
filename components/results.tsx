"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            let startTime: number | null = null
            const duration = 2000

            const animate = (currentTime: number) => {
              if (startTime === null) startTime = currentTime
              const progress = Math.min((currentTime - startTime) / duration, 1)
              
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              setDisplayValue(Math.floor(easeOutQuart * value))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setDisplayValue(value)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [value, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function Results() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const statY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const stats = [
    {
      label: "Unnecessary spend avoided",
      value: 7,
      prefix: "$",
      suffix: "M+",
      sublabel: "Technology identified as unused before it was procured"
    },
    {
      label: "Equipment cost reduction",
      value: 30,
      prefix: "",
      suffix: "%",
      sublabel: "Through consolidated procurement via a single VAR"
    },
    {
      label: "On-time delivery",
      value: 98,
      prefix: "",
      suffix: "%",
      sublabel: "Across active client engagements"
    },
    {
      label: "Returned to your team weekly",
      value: 120,
      prefix: "",
      suffix: "hrs",
      sublabel: "The equivalent of 3 internal FTEs"
    },
    {
      label: "Cost reduction on complex rooms",
      value: 20,
      prefix: "",
      suffix: "%",
      sublabel: "By eliminating unnecessary equipment through standards"
    },
    {
      label: "Source of truth",
      value: 1,
      prefix: "",
      suffix: "",
      sublabel: "Every spec, drawing, and decision in one place"
    }
  ]

  return (
    <section id="results" ref={containerRef} className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden bg-[#0A0A0A]">
      {/* Large parallax number */}
      <motion.div 
        className="absolute top-8 right-8 text-white/5 text-[20rem] font-bold leading-none pointer-events-none select-none hidden lg:block"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
      >
        07
      </motion.div>
      
      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4A023]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Floating metric indicators */}
        <motion.div
          className="absolute left-[10%] top-[20%] w-32 h-32 border border-[#F4A023]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-[15%] top-[30%] w-24 h-24 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-[5%] bottom-[20%] w-40 h-40 border border-[#F4A023]/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">Outcomes</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mt-4">
            Outcomes for our clients
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          style={{ y: useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]) }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: Math.min(0.05 + index * 0.05, 0.3) }}
              style={{ willChange: 'transform, opacity' }}
              className="relative group"
            >
              <motion.div 
                className="bg-[#111111] border border-white/10 rounded-2xl p-4 md:p-6 h-full transition-all duration-500"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(244,160,35,0.5)',
                  boxShadow: '0 0 60px rgba(244,160,35,0.15)'
                }}
                style={{ willChange: 'transform' }}
              >
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#F4A023]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative">
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F4A023]">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </span>
                  </div>
                  
                  <p className="text-white text-sm md:text-base font-medium mb-1 md:mb-2">{stat.label}</p>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">{stat.sublabel}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ willChange: 'opacity' }}
          className="text-center text-white/40 text-sm mt-8 md:mt-12"
        >
          Outcomes from active client engagements.
        </motion.p>
      </div>
    </section>
  )
}
