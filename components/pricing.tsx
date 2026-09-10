"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"

type BillingPeriod = "monthly" | "semiAnnual" | "annual"

const billingOptions: { id: BillingPeriod; label: string; note: string }[] = [
  { id: "monthly", label: "Month-to-month", note: "" },
  { id: "semiAnnual", label: "Semi-annual", note: "Save more" },
  { id: "annual", label: "Annual", note: "Best value" }
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billing, setBilling] = useState<BillingPeriod>("monthly")

  const tiers = [
    {
      name: "Standards & Architecture",
      prices: { monthly: "$9k", semiAnnual: "$8.5k", annual: "$7.5k" },
      description: "Design and documentation",
      features: [
        "Multi-site technology standards",
        "Full engineering specs",
        "System architecture",
        "Budget frameworks",
        "Documentation"
      ],
      featured: false
    },
    {
      name: "Program Management",
      prices: { monthly: "$21k", semiAnnual: "$20k", annual: "$18k" },
      description: "Design + 5 active projects",
      features: [
        "Everything in Standards",
        "Technical PM + analyst",
        "Up to 5 active projects",
        "Vendor coordination",
        "Progress tracking"
      ],
      featured: false
    },
    {
      name: "Standards + PM",
      prices: { monthly: "$27k", semiAnnual: "$25.5k", annual: "$23k" },
      description: "Architecture + program delivery",
      features: [
        "Standards & Architecture",
        "Program Management",
        "Bundled coordination",
        "Vendor + milestone tracking",
        "One accountable team"
      ],
      featured: false
    },
    {
      name: "Ops & Intelligence",
      prices: { monthly: "$24k", semiAnnual: "$22.5k", annual: "$20k" },
      description: "Up to 500 rooms",
      features: [
        "Remote support coordination",
        "Real-time monitoring",
        "Issue tracking & triage",
        "Usage analytics",
        "Annual site visits"
      ],
      featured: false
    },
    {
      name: "Full Lifecycle",
      prices: { monthly: "$45k", semiAnnual: "$42.5k", annual: "$38k" },
      description: "12-month minimum",
      features: [
        "Standards + PM + Operations",
        "Integrated lifecycle approach",
        "One team, end-to-end",
        "Built for scale",
        "Measurable ROI"
      ],
      featured: true
    }
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-32 px-6 bg-[#111111] overflow-hidden">
      {/* Section number */}
      <div className="absolute top-8 right-8 text-white/10 text-sm font-mono">/08</div>
      
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4">
            Transparent pricing
          </h2>
          <p className="text-xl text-white/50 mt-6 max-w-2xl mx-auto">
            Choose the module that fits. All include one point of accountability.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#0A0A0A] border border-white/10">
            {billingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setBilling(option.id)}
                aria-pressed={billing === option.id}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  billing === option.id
                    ? "bg-[#F4A023] text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {option.label}
                {option.note && (
                  <span className={`ml-2 text-xs ${billing === option.id ? "text-black/60" : "text-[#F4A023]"}`}>
                    {option.note}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative group rounded-2xl p-6 transition-all duration-300 ${
                tier.featured 
                  ? 'bg-[#F4A023] text-black' 
                  : 'bg-[#0A0A0A] border border-white/10 hover:border-white/20'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-[#F4A023] text-xs font-medium rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div className={`text-sm mb-6 ${tier.featured ? 'text-black/60' : 'text-white/40'}`}>
                {tier.name}
              </div>
              
              <div className="mb-2">
                <span className={`text-4xl font-semibold ${tier.featured ? 'text-black' : 'text-white'}`}>
                  {tier.prices[billing]}
                </span>
                <span className={tier.featured ? 'text-black/60' : 'text-white/40'}>/month</span>
              </div>
              
              <p className={`text-sm mb-6 ${tier.featured ? 'text-black/60' : 'text-white/40'}`}>
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-sm">
                    <svg 
                      className={`w-5 h-5 flex-shrink-0 ${tier.featured ? 'text-black' : 'text-[#F4A023]'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={tier.featured ? 'text-black/80' : 'text-white/60'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link 
                href="#contact"
                className={`block text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  tier.featured 
                    ? 'bg-black text-white hover:bg-black/80' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get started
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-white/40 mt-12"
        >
          Custom pricing available for enterprise.{" "}
          <Link href="#contact" className="text-[#F4A023] hover:underline">Contact us</Link>.
        </motion.p>
      </div>
    </section>
  )
}
