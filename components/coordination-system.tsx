"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function CoordinationSystem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      title: "Project Tracking",
      description: "Track projects, vendors, milestones, gaps, and budget in one unified view",
      icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
    },
    {
      title: "Real-time Visibility",
      description: "See status across all locations instantly with live dashboards",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    {
      title: "Automated Alerts",
      description: "Get notified before problems become crises with smart triggers",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    },
    {
      title: "Document Hub",
      description: "Centralized specs, drawings, and documentation with version control",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
      title: "Vendor Management",
      description: "Track contracts, performance, and communications in one place",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
      title: "Budget Analytics",
      description: "Real-time spend tracking with variance analysis and forecasting",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    }
  ]

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Section number */}
      <div className="absolute top-8 right-8 text-white/10 text-sm font-mono">/04</div>
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">The Platform</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 max-w-3xl">
            Your coordination command center
          </h2>
          <p className="text-xl text-white/50 mt-6 max-w-2xl">
            This is how we deliver. Every project, every vendor, every milestone — tracked, visible, and accountable in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-[#F4A023]/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F4A023]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              
              <div className="relative">
                <div className="w-12 h-12 bg-[#F4A023]/10 border border-[#F4A023]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#F4A023]/20 transition-colors">
                  <svg className="w-6 h-6 text-[#F4A023]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance trust lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-2"
        >
          <p className="text-white/50 text-sm">
            Powered by Airtable and the Claude API.
          </p>
          <p className="text-white/30 text-xs max-w-md text-center">
            Both SOC 2 Type II certified. Your project data is always visible, always exportable, and never held hostage.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
