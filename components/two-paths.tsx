"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"

export function TwoPaths() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [auditOption, setAuditOption] = useState<'spend' | 'health' | 'standards'>('spend')

  const auditOutputs = {
    spend: "Output: Prioritized cost reduction opportunities, estimated savings, and recommended action plan.",
    health: "Output: Project risk register, gap analysis, and recovery plan.",
    standards: "Output: Standards baseline document and remediation roadmap."
  }

  return (
    <section id="pricing" ref={ref} className="relative py-24 md:py-32 px-4 md:px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Section number */}
      <div className="absolute top-8 right-8 text-white/10 text-sm font-mono">/03</div>
      
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F4A023]/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">Engagement Models</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mt-4">
            Three paths forward
          </h2>
          <p className="text-lg md:text-xl text-white/50 mt-6 max-w-2xl mx-auto">
            Start with a sprint or go straight to full ownership. Every path leads to one point of accountability.
          </p>
        </motion.div>

        {/* Card 0 - Ownership Audit */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05 }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-8"
        >
          <div className="group relative bg-[#111111] border-2 border-[#F4A023]/40 rounded-2xl p-6 md:p-8 hover:border-[#F4A023]/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4A023]/15 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#F4A023] text-sm font-mono">Start Here</span>
                    <span className="px-3 py-1 bg-[#F4A023] text-black text-xs font-medium rounded-full">30 Days</span>
                  </div>
                  
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    The Ownership Audit
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed mb-6 max-w-xl">
                    Not sure where to start? We identify exactly where your technology program is losing time, money, and accountability and hand you a plan to fix it. Fixed scope. Fixed price. 30 days.
                  </p>

                  {/* Audit option toggles */}
                  <div className="space-y-3 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer group/option">
                      <input 
                        type="radio" 
                        name="audit-option" 
                        checked={auditOption === 'spend'}
                        onChange={() => setAuditOption('spend')}
                        className="mt-1 w-4 h-4 accent-[#F4A023]"
                      />
                      <div>
                        <span className="text-white font-medium">Technology Spend</span>
                        <p className="text-white/40 text-sm">Are you buying the right things at the right price?</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group/option">
                      <input 
                        type="radio" 
                        name="audit-option" 
                        checked={auditOption === 'health'}
                        onChange={() => setAuditOption('health')}
                        className="mt-1 w-4 h-4 accent-[#F4A023]"
                      />
                      <div>
                        <span className="text-white font-medium">Project Health</span>
                        <p className="text-white/40 text-sm">Why are your projects slipping and what is it costing you?</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group/option">
                      <input 
                        type="radio" 
                        name="audit-option" 
                        checked={auditOption === 'standards'}
                        onChange={() => setAuditOption('standards')}
                        className="mt-1 w-4 h-4 accent-[#F4A023]"
                      />
                      <div>
                        <span className="text-white font-medium">Standards Gap</span>
                        <p className="text-white/40 text-sm">Are your locations actually consistent?</p>
                      </div>
                    </label>
                  </div>

                  {/* Output line */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                    <p className="text-white/70 text-sm">{auditOutputs[auditOption]}</p>
                  </div>

                  <p className="text-white/40 text-xs">
                    Delivered in 30 days. Actionable on day 31.
                  </p>
                </div>

                <div className="md:text-right md:min-w-[200px]">
                  <p className="text-white/40 text-sm mb-2">Fixed price</p>
                  <p className="text-4xl font-semibold text-white mb-2">$9,000</p>
                  <p className="text-white/40 text-xs mb-6">One-time. No retainer required.</p>
                  
                  <a href="https://calendly.com/fluxifi/fluxifi-audit-intro" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className="px-6 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-center cursor-pointer w-full md:w-auto"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 40px rgba(244,160,35,0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: 'transform' }}
                    >
                      Book your audit →
                    </motion.div>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Full Service */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
            className="group relative bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#F4A023]/30 transition-all duration-300 h-full order-2 lg:order-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A023]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#F4A023] text-sm font-mono">/A</span>
                <span className="px-3 py-1 bg-[#F4A023]/10 text-[#F4A023] text-xs font-medium rounded-full">Full Service</span>
              </div>
              
              <h3 className="text-3xl font-semibold text-white mb-4">
                End-to-end ownership
              </h3>
              
              <p className="text-white/60 leading-relaxed mb-4">
                Full Service is built around your program. You choose the scope. We own the execution. Most clients start with one or two modules and expand as the relationship deepens.
              </p>

              <p className="text-white/60 leading-relaxed mb-8">
                Some clients come to us audit-first. Others already know what they need. Either way the engagement is the same. We own it.
              </p>

              {/* Module pricing table */}
              <div className="space-y-0 mb-6">
                {/* Row 1: Standards & Architecture */}
                <div className="py-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Standards & Architecture</span>
                    <span className="text-sm font-medium text-white">$9k/month</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Technology standards, equipment specs, system design, and budget frameworks</p>
                  <p className="text-xs text-white/30 mt-0.5 italic">Replaces 2 FTEs</p>
                </div>

                {/* Row 2: Program Management */}
                <div className="py-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Program Management</span>
                    <span className="text-sm font-medium text-white">$21k/month</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Full project ownership, vendor coordination, milestone tracking, and commissioning</p>
                  <p className="text-xs text-white/30 mt-0.5 italic">Up to 5 concurrent projects. Replaces 3-4 FTEs.</p>
                </div>

                {/* Row 2B: Standards + PM */}
                <div className="py-3 border-b border-white/10 bg-white/[0.02] -mx-3 px-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Standards + PM</span>
                    <span className="text-sm font-medium text-white">$27k/month</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Full design and project ownership combined</p>
                  <p className="text-xs text-white/30 mt-0.5 italic">Replaces 5-6 FTEs</p>
                </div>

                {/* Row 3: Ops & Intelligence */}
                <div className="py-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Ops & Intelligence</span>
                    <span className="text-sm font-medium text-white">$24k/month</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Day 2 support, issue triage, SLA tracking, and performance reporting</p>
                  <p className="text-xs text-white/30 mt-0.5 italic">Up to 500 rooms. 501-1,000 rooms at $40/room/month. Above 1,000 rooms custom pricing. Replaces 3+ FTEs.</p>
                </div>

                {/* Row 4: Full Lifecycle */}
                <div className="py-3 bg-[#F4A023]/5 -mx-3 px-3 rounded">
                  <p className="text-xs text-white/40 line-through mb-1">$54k/month if purchased separately</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">Full Lifecycle (all three)</span>
                    <span className="text-sm font-medium text-[#F4A023]">$45k/month</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Complete end-to-end ownership across all three modules</p>
                  <p className="text-xs text-white/30 mt-0.5 italic">8+ FTE equivalent. One team, full accountability.</p>
                </div>
              </div>

              <p className="text-white/40 text-xs mb-6">
                Annual engagements typically range from $108k-$540k depending on scope and project volume.
              </p>

              <div className="mt-auto">
                <a href="https://calendly.com/fluxifi/fluxifi-scope-program-intro" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-full px-6 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-center cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 40px rgba(244,160,35,0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ willChange: 'transform' }}
                  >
                    Let&apos;s scope your program →
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Coordination System */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="group relative bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#F4A023]/30 transition-all duration-300 h-full order-3 lg:order-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A023]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#F4A023] text-sm font-mono">/B</span>
                <span className="px-3 py-1 bg-[#F4A023]/10 text-[#F4A023] text-xs font-medium rounded-full">Process & Platform</span>
              </div>
              
              <h3 className="text-3xl font-semibold text-white mb-4">
                Coordination System & Process Engineering
              </h3>
              
              <p className="text-white/60 leading-relaxed mb-8">
                We build your custom coordination system and engineer the processes around it. Your team operates it. We provide ongoing support, training, and advisory.
              </p>

              {/* Line item list matching Card A structure */}
              <div className="space-y-0 mb-6">
                {[
                  { item: 'Discovery & Audit', description: 'Environment and needs assessment' },
                  { item: 'System Build', description: 'Custom coordination platform configured for your environment' },
                  { item: 'Process Design', description: 'Documented workflows and standards your team can own' },
                  { item: 'Training & Handoff', description: 'Full team onboarding and 90-day advisory support' },
                ].map((row, i) => (
                  <div 
                    key={row.item}
                    className={`py-3 ${i < 3 ? 'border-b border-white/10' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">{row.item}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{row.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-white/40 text-sm mb-2">Starting at</p>
                <p className="text-3xl font-semibold text-white">
                  $36k <span className="text-lg font-normal text-white/40">implementation</span>
                </p>
                <p className="text-white/40 text-xs mt-3">
                  Ongoing support available after implementation.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <a href="https://calendly.com/fluxifi/fluxifi-build-your-system-intro" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="w-full px-6 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-center cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 40px rgba(244,160,35,0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ willChange: 'transform' }}
                  >
                    Let&apos;s build your system →
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ willChange: 'opacity' }}
          className="text-center mt-12"
        >
          <p className="text-white/50 mb-4">
            <a 
              href="https://calendly.com/fluxifi/fluxifi-audit-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4A023] hover:text-white transition-colors"
            >
              Most clients start with the Ownership Audit
            </a>
            . The plan it delivers usually makes the next decision obvious.
          </p>
          <a 
            href="https://calendly.com/fluxifi/fluxifi-intro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#F4A023] hover:text-white transition-colors"
          >
            Not sure which path? Let&apos;s talk
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
