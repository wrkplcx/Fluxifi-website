"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

type Mode = "standards" | "pm" | "ops" | "lifecycle" | "trackb"

const modes: { id: Mode; label: string }[] = [
  { id: "standards", label: "Standards & Architecture" },
  { id: "pm", label: "Program Management" },
  { id: "ops", label: "Ops & Intelligence" },
  { id: "lifecycle", label: "Full Lifecycle" },
  { id: "trackb", label: "Track B: Process & Platform" },
]

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

function Slider({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step,
  formatValue
}: { 
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  formatValue?: (v: number) => string
}) {
  const percentage = ((value - min) / (max - min)) * 100
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white/70 text-sm">{label}</span>
        <span className="text-[#F4A023] font-semibold text-lg">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer touch-pan-x
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-11
            [&::-webkit-slider-thumb]:h-11
            [&::-webkit-slider-thumb]:md:w-5
            [&::-webkit-slider-thumb]:md:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#F4A023]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(244,160,35,0.5)]
            [&::-moz-range-thumb]:w-11
            [&::-moz-range-thumb]:h-11
            [&::-moz-range-thumb]:md:w-5
            [&::-moz-range-thumb]:md:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#F4A023]
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #F4A023 0%, #F4A023 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
      </div>
    </div>
  )
}

export function ROICalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const [activeMode, setActiveMode] = useState<Mode>("standards")
  
  // Standards & Architecture sliders
  const [standardsProjects, setStandardsProjects] = useState(5)
  const [standardsRooms, setStandardsRooms] = useState(10)
  
  // Program Management sliders
  const [pmActiveProjects, setPmActiveProjects] = useState(3)
  
  // Ops & Intelligence sliders
  const [opsRooms, setOpsRooms] = useState(300)
  const [opsFTEs, setOpsFTEs] = useState(2)
  
  // Full Lifecycle sliders
  const [lifecycleProjects, setLifecycleProjects] = useState(3)
  const [lifecycleRoomsPerProject, setLifecycleRoomsPerProject] = useState(10)
  const [lifecycleTotalRooms, setLifecycleTotalRooms] = useState(200)

  // Check for custom pricing thresholds
  const standardsExceedsLimit = standardsProjects > 20 || standardsRooms > 30
  const pmExceedsLimit = pmActiveProjects > 5
  const opsExceedsLimit = opsRooms > 1000
  const lifecycleExceedsLimit = lifecycleProjects > 5 || lifecycleTotalRooms > 1000

  // Calculation functions
  const calculateStandards = () => {
    const consultantFee = standardsProjects * standardsRooms * 4500
    const ftesNeeded = Math.ceil((standardsProjects * standardsRooms) / 50)
    const fteCost = ftesNeeded * 140000
    const typicalCost = Math.max(consultantFee, fteCost)
    const fluxifiCost = 9000 * 12 // $108,000/year flat
    const savings = typicalCost - fluxifiCost
    const threeYearROI = savings * 3
    const paybackMonths = savings > 0 ? Math.ceil(fluxifiCost / (savings / 12)) : 0
    
    return {
      typicalCost,
      fluxifiCost,
      savings,
      threeYearROI,
      paybackMonths,
      breakdown: {
        consultantFee,
        ftesNeeded,
        fteCost
      }
    }
  }

  const calculatePM = () => {
    const ftesNeeded = Math.ceil(pmActiveProjects / 2) // 1 FTE per 2 active projects
    const fteCost = ftesNeeded * 140000
    const consultantCost = pmActiveProjects * 40 * 200 * 12
    const typicalCost = Math.max(consultantCost, fteCost)
    const fluxifiCost = 21000 * 12 // $252,000/year flat
    const savings = typicalCost - fluxifiCost
    const threeYearROI = savings * 3
    const paybackMonths = savings > 0 ? Math.ceil(fluxifiCost / (savings / 12)) : 0
    
    return {
      typicalCost,
      fluxifiCost,
      savings,
      threeYearROI,
      paybackMonths,
      breakdown: {
        consultantCost,
        ftesNeeded,
        fteCost
      }
    }
  }

  const calculateOps = () => {
    const ftesNeeded = Math.ceil(opsRooms / 75)
    const calculatedFteCost = ftesNeeded * 140000
    const currentFteCost = opsFTEs * 140000
    const typicalCost = Math.max(calculatedFteCost, currentFteCost)
    
    // Tiered Fluxifi pricing
    let fluxifiCost: number
    let fluxifiPricing: { type: 'flat' | 'perRoom', monthlyRate?: number, perRoomRate?: number, rooms?: number }
    
    if (opsRooms <= 500) {
      // Tier 1: flat rate
      fluxifiCost = 24000 * 12 // $288,000/year
      fluxifiPricing = { type: 'flat', monthlyRate: 24000 }
    } else {
      // Tier 2: per room (501-1000)
      fluxifiCost = opsRooms * 40 * 12
      fluxifiPricing = { type: 'perRoom', perRoomRate: 40, rooms: opsRooms }
    }
    
    const savings = typicalCost - fluxifiCost
    const threeYearROI = savings * 3
    const paybackMonths = savings > 0 ? Math.ceil(fluxifiCost / (savings / 12)) : 0
    
    return {
      typicalCost,
      fluxifiCost,
      savings,
      threeYearROI,
      paybackMonths,
      fluxifiPricing,
      breakdown: {
        ftesNeeded,
        calculatedFteCost,
        currentFteCost
      }
    }
  }

  const calculateLifecycle = () => {
    const designCost = lifecycleProjects * lifecycleRoomsPerProject * 4500
    const pmCost = Math.ceil(lifecycleProjects / 2) * 140000
    const opsCost = Math.ceil(lifecycleTotalRooms / 75) * 140000
    const typicalCost = designCost + pmCost + opsCost
    const fluxifiCost = 45000 * 12 // $540,000/year flat
    const savings = typicalCost - fluxifiCost
    const threeYearROI = savings * 3
    const paybackMonths = savings > 0 ? Math.ceil(fluxifiCost / (savings / 12)) : 0
    
    return {
      typicalCost,
      fluxifiCost,
      savings,
      threeYearROI,
      paybackMonths,
      breakdown: {
        designCost,
        pmCost,
        opsCost
      }
    }
  }

  // Get current calculations based on active mode
  const getCalculations = () => {
    switch (activeMode) {
      case "standards": return calculateStandards()
      case "pm": return calculatePM()
      case "ops": return calculateOps()
      case "lifecycle": return calculateLifecycle()
      default: return calculateStandards() // fallback for trackb
    }
  }

  const calc = getCalculations()
  const savings = calc.savings
  const showNegativeMessage = savings <= 0

  // Check if we need to show custom pricing message
  const showCustomPricingMessage = 
    (activeMode === "standards" && standardsExceedsLimit) ||
    (activeMode === "pm" && pmExceedsLimit) ||
    (activeMode === "ops" && opsExceedsLimit) ||
    (activeMode === "lifecycle" && lifecycleExceedsLimit)

  const getCustomPricingMessage = () => {
    if (activeMode === "standards") {
      return "Your design program scale qualifies for custom pricing. Let's talk about what Standards & Architecture looks like at your volume."
    }
    if (activeMode === "pm") {
      return "Your project volume qualifies for custom pricing. Let's talk about what full lifecycle ownership looks like at your scale."
    }
    if (activeMode === "ops") {
      return "Your portfolio scale qualifies for custom pricing. Let's talk about what Ops & Intelligence looks like across your full portfolio."
    }
    if (activeMode === "lifecycle") {
      return "Your program qualifies for custom pricing across one or more modules. Let's build the right structure for your scale."
    }
    return ""
  }

  return (
    <section ref={ref} id="roi-calculator" className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,160,35,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,160,35,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#F4A023] text-sm font-medium uppercase tracking-wider">The Math</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mt-4">
            See what Fluxifi saves you.
          </h2>
          <p className="text-lg md:text-xl text-white/50 mt-6 max-w-3xl mx-auto">
            Run the numbers against your current approach.
          </p>
        </motion.div>

        {/* Mode Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05 }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0"
        >
          <div className="flex gap-2 min-w-max md:justify-center">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-3 md:px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeMode === mode.id
                    ? "bg-[#F4A023] text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sliders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
        >
          {activeMode === "standards" && (
            <>
              <Slider
                label="Projects per year"
                value={standardsProjects}
                onChange={setStandardsProjects}
                min={1}
                max={20}
                step={1}
              />
              <Slider
                label="Average rooms per project"
                value={standardsRooms}
                onChange={setStandardsRooms}
                min={1}
                max={30}
                step={1}
              />
            </>
          )}

          {activeMode === "pm" && (
            <>
              <Slider
                label="Active projects at any time"
                value={pmActiveProjects}
                onChange={setPmActiveProjects}
                min={1}
                max={10}
                step={1}
              />
            </>
          )}

          {activeMode === "ops" && (
            <>
              <Slider
                label="Total rooms under management"
                value={opsRooms}
                onChange={setOpsRooms}
                min={10}
                max={1500}
                step={10}
              />
              <Slider
                label="Current support FTEs dedicated to technology operations"
                value={opsFTEs}
                onChange={setOpsFTEs}
                min={0.5}
                max={10}
                step={0.5}
              />
            </>
          )}

          {activeMode === "lifecycle" && (
            <>
              <Slider
                label="Projects per year"
                value={lifecycleProjects}
                onChange={setLifecycleProjects}
                min={1}
                max={10}
                step={1}
              />
              <Slider
                label="Average rooms per project"
                value={lifecycleRoomsPerProject}
                onChange={setLifecycleRoomsPerProject}
                min={1}
                max={100}
                step={1}
              />
              <Slider
                label="Total rooms under management"
                value={lifecycleTotalRooms}
                onChange={setLifecycleTotalRooms}
                min={10}
                max={1500}
                step={10}
              />
            </>
          )}

          {activeMode === "trackb" && (
            <div className="text-center py-8">
              <h3 className="text-xl md:text-2xl text-white font-medium mb-4">
                Process & Platform ROI is different for every organization.
              </h3>
              <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto mb-6">
                It depends on your current tools, team size, and coordination overhead. There is no meaningful number without a conversation first.
              </p>
              <p className="text-white/40 text-xs md:text-sm mb-8">
                Most organizations recoup the implementation cost within the first project cycle.
              </p>
              <Link
                href="https://calendly.com/fluxifi/fluxifi-build-your-system-intro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#F4A023] text-black font-medium rounded-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(244,160,35,0.4)] transition-all"
              >
                Let&apos;s build your system →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Custom Pricing Message OR Results Cards (skip for Track B) */}
        {activeMode !== "trackb" && (showCustomPricingMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#111111] border border-[#F4A023]/30 rounded-2xl p-12 text-center mb-8"
          >
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              {getCustomPricingMessage()}
            </p>
            <a href="https://calendly.com/fluxifi/fluxifi-intro" target="_blank" rel="noopener noreferrer">
              <motion.div
                className="inline-block px-8 py-4 bg-[#F4A023] text-black font-medium rounded-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(244,160,35,0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s talk about your program →
              </motion.div>
            </a>
          </motion.div>
        ) : (
          <>
            {/* Results Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              {/* Typical Approach Card */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
                <h3 className="text-white/50 text-sm uppercase tracking-wider mb-4">Typical Approach</h3>
                <p className="text-4xl md:text-5xl font-semibold text-white mb-4">
                  {formatCurrency(calc.typicalCost)}
                  <span className="text-lg font-normal text-white/40">/year</span>
                </p>
                
                {activeMode === "standards" && (
                  <div className="text-sm text-white/40 space-y-1">
                    <p>Estimated FTEs needed: {(calc as ReturnType<typeof calculateStandards>).breakdown.ftesNeeded}</p>
                    <p>FTE annual cost: {formatCurrency((calc as ReturnType<typeof calculateStandards>).breakdown.fteCost)}</p>
                    <p>vs. AV consultant fees: {formatCurrency((calc as ReturnType<typeof calculateStandards>).breakdown.consultantFee)}</p>
                  </div>
                )}
                
                {activeMode === "pm" && (
                  <div className="text-sm text-white/40 space-y-1">
                    <p>Estimated FTEs needed: {(calc as ReturnType<typeof calculatePM>).breakdown.ftesNeeded}</p>
                    <p>FTE annual cost: {formatCurrency((calc as ReturnType<typeof calculatePM>).breakdown.fteCost)}</p>
                    <p>vs. PM consultant fees: {formatCurrency((calc as ReturnType<typeof calculatePM>).breakdown.consultantCost)}</p>
                  </div>
                )}
                
                {activeMode === "ops" && (
                  <div className="text-sm text-white/40 space-y-1">
                    <p>Estimated FTEs needed: {(calc as ReturnType<typeof calculateOps>).breakdown.ftesNeeded}</p>
                    <p>FTE annual cost: {formatCurrency((calc as ReturnType<typeof calculateOps>).breakdown.calculatedFteCost)}</p>
                  </div>
                )}
                
                {activeMode === "lifecycle" && (
                  <div className="text-sm text-white/40 space-y-1">
                    <p>Standards & Architecture: {formatCurrency((calc as ReturnType<typeof calculateLifecycle>).breakdown.designCost)}</p>
                    <p>Program Management: {formatCurrency((calc as ReturnType<typeof calculateLifecycle>).breakdown.pmCost)}</p>
                    <p>Ops & Intelligence: {formatCurrency((calc as ReturnType<typeof calculateLifecycle>).breakdown.opsCost)}</p>
                    <p className="pt-1 border-t border-white/10 mt-2">Total: {formatCurrency(calc.typicalCost)}</p>
                  </div>
                )}
              </div>

              {/* Fluxifi Card */}
              <div className="bg-[#111111] border border-[#F4A023]/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A023]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <h3 className="text-[#F4A023] text-sm uppercase tracking-wider mb-4">Fluxifi</h3>
                  {activeMode === "ops" ? (
                    <>
                      <p className="text-4xl md:text-5xl font-semibold text-white mb-2">
                        {formatCurrency(calc.fluxifiCost)}
                        <span className="text-lg font-normal text-white/40">/year</span>
                      </p>
                      {(calc as ReturnType<typeof calculateOps>).fluxifiPricing.type === 'flat' ? (
                        <p className="text-sm text-white/40">$24,000/month flat rate</p>
                      ) : (
                        <div className="text-sm text-white/40 space-y-1">
                          <p>$40 per room per month</p>
                          <p>{opsRooms} rooms under management</p>
                          <p>Total: {formatCurrency(calc.fluxifiCost)}/year</p>
                        </div>
                      )}
                    </>
                  ) : activeMode === "lifecycle" ? (
                    <>
                      <p className="text-sm text-white/40 line-through mb-1">$54,000/month if purchased separately</p>
                      <p className="text-4xl md:text-5xl font-semibold text-white mb-2">
                        {formatCurrency(calc.fluxifiCost)}
                        <span className="text-lg font-normal text-white/40">/year</span>
                      </p>
                      <p className="text-sm text-white/40">$45,000/month</p>
                      <p className="text-sm text-white/30 mt-2">8+ FTE equivalent. Saves $9k/month vs. purchasing modules separately.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-4xl md:text-5xl font-semibold text-white mb-4">
                        {formatCurrency(calc.fluxifiCost)}
                        <span className="text-lg font-normal text-white/40">/year</span>
                      </p>
                      <p className="text-sm text-white/40">
                        {activeMode === "standards" && "$9,000/month flat rate"}
                        {activeMode === "pm" && "$21,000/month flat rate"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Metrics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ willChange: 'transform, opacity' }}
              className="mb-8"
            >
              {showNegativeMessage ? (
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center">
                  <p className="text-white/60 text-lg">
                    Your current approach may be cost-competitive at this scale. Let&apos;s talk about what else you&apos;re getting for that spend.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Annual Savings</p>
                    <p className="text-3xl md:text-4xl font-semibold text-[#F4A023]">
                      {formatCurrency(savings)}
                    </p>
                  </div>
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-2">3-Year ROI</p>
                    <p className="text-3xl md:text-4xl font-semibold text-white">
                      {formatCurrency(calc.threeYearROI)}
                    </p>
                  </div>
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Payback Period</p>
                    <p className="text-3xl md:text-4xl font-semibold text-white">
                      {calc.paybackMonths} months
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ))}

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ willChange: 'opacity' }}
          className="text-center text-white/40 text-xs md:text-sm mb-10"
        >
          Estimates based on industry benchmarks. Fully loaded FTE cost assumed at $140,000/year. AV/IT consultant fees based on average engagement rates. Actual savings will vary based on program complexity and location count.
        </motion.p>

        {/* CTA Button */}
        {!showCustomPricingMessage && activeMode !== "trackb" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ willChange: 'transform, opacity' }}
            className="text-center"
          >
            <a href="https://calendly.com/fluxifi/fluxifi-intro" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto inline-block">
              <motion.div
                className="w-full md:w-auto px-10 py-5 bg-[#F4A023] text-black font-medium rounded-lg text-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(244,160,35,0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: 'transform' }}
              >
                Let&apos;s talk about your program →
              </motion.div>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
