"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      category: "Strategy",
      items: ["Technology Strategy & Planning", "Standards Development", "Budget Frameworks"]
    },
    {
      category: "Design",
      items: ["Design Coordination", "Equipment Specifications", "System Architecture"]
    },
    {
      category: "Execution",
      items: ["Project Management", "Vendor Coordination", "Installation & Commissioning"]
    },
    {
      category: "Operations",
      items: ["Day 2 Support", "Workflow Automation", "Custom Development"]
    }
  ]

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 px-4 md:px-6 bg-[#111111] overflow-hidden">
      {/* Section number */}
      <div className="absolute top-8 right-8 text-white/10 text-sm font-mono">/05</div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-4">
            What we do
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(0.05 * index, 0.2), ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="mb-6">
                <span className="text-[#F4A023] text-sm font-mono">/{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-semibold text-white mt-2">{service.category}</h3>
              </div>
              
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex items-start gap-3 text-white/60 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-[#F4A023] rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Horizontal line with progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
          style={{ willChange: 'opacity' }}
          className="mt-12 md:mt-20"
        >
          <div className="relative h-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#F4A023]"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 2, delay: 0.3 }}
              style={{ willChange: 'width' }}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs text-white/40">
            <span>Planning</span>
            <span>Design</span>
            <span>Build</span>
            <span>Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
