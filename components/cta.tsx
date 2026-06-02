"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function CTA() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section id="contact" ref={containerRef} className="relative py-24 md:py-32 px-4 md:px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Animated background orb */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: bgScale }}
      >
        <motion.div
          className="w-[1000px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(244,160,35,0.15) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating particles - using deterministic positions */}
      {[
        { left: '5%', top: '10%', duration: 3, delay: 0 },
        { left: '15%', top: '25%', duration: 4, delay: 0.5 },
        { left: '25%', top: '60%', duration: 3.5, delay: 1 },
        { left: '35%', top: '80%', duration: 4.5, delay: 1.5 },
        { left: '45%', top: '15%', duration: 3, delay: 2 },
        { left: '55%', top: '45%', duration: 5, delay: 0.3 },
        { left: '65%', top: '70%', duration: 3.8, delay: 0.8 },
        { left: '75%', top: '30%', duration: 4.2, delay: 1.2 },
        { left: '85%', top: '55%', duration: 3.3, delay: 2.5 },
        { left: '95%', top: '85%', duration: 4.8, delay: 0.7 },
        { left: '10%', top: '50%', duration: 3.6, delay: 1.8 },
        { left: '20%', top: '90%', duration: 4.1, delay: 2.2 },
        { left: '30%', top: '35%', duration: 3.9, delay: 0.4 },
        { left: '40%', top: '65%', duration: 4.4, delay: 1.1 },
        { left: '50%', top: '20%', duration: 3.2, delay: 2.8 },
        { left: '60%', top: '75%', duration: 4.6, delay: 0.6 },
        { left: '70%', top: '40%', duration: 3.7, delay: 1.4 },
        { left: '80%', top: '5%', duration: 4.3, delay: 2.1 },
        { left: '90%', top: '50%', duration: 3.4, delay: 0.9 },
        { left: '12%', top: '72%', duration: 4.7, delay: 1.6 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#F4A023] rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}

      <div ref={ref} className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ y: contentY }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 relative"
          >
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 border-2 border-[#F4A023] rounded-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border border-[#F4A023]/50 rounded-2xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            
            <div className="w-full h-full bg-[#F4A023] rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05 }}
            style={{ willChange: 'transform, opacity' }}
          >
            Ready to own
            <br />
            <span className="text-[#F4A023]">your technology program?</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/50 mt-6 md:mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
          >
            Most clients start with the Ownership Audit. Thirty days. One deliverable. Everything you need to make the next decision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="https://calendly.com/fluxifi/fluxifi-intro" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <motion.div
                className="group relative w-full sm:w-auto px-10 py-5 bg-[#F4A023] text-black font-medium rounded-lg text-lg overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 60px rgba(244,160,35,0.5)'
                }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: 'transform' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a consultation
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  style={{ opacity: 0.2 }}
                />
              </motion.div>
            </Link>
            
            <Link 
              href="mailto:hello@fluxifi.co"
              className="px-8 py-4 text-white/60 hover:text-white font-medium text-lg transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:text-[#F4A023] transition-colors">hello@fluxifi.co</span>
            </Link>
          </motion.div>
        </motion.div>


      </div>
    </section>
  )
}
