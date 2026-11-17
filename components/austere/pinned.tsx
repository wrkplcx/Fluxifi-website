"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { Container, GREY, STATEMENT_TYPE, BODY_TYPE } from "./ui"
import { InView } from "./motion"

function useStepProgress(count: number) {
  const ref = useRef<HTMLDivElement | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`
      setStep(Math.min(count - 1, Math.floor(progress * count)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [count])

  return { ref, fillRef, step }
}

function wipe(i: number, active: number): CSSProperties {
  const clipPath = i === active ? "inset(0% 0 0% 0)" : i < active ? "inset(0% 0 100% 0)" : "inset(100% 0 0% 0)"
  return { clipPath, transition: "clip-path 900ms cubic-bezier(0.16, 1, 0.3, 1)" }
}

function Panel({ i, active, children, className = "" }: { i: number; active: number; children: ReactNode; className?: string }) {
  const hidden = i !== active
  return (
    <div style={wipe(i, active)} aria-hidden={hidden} inert={hidden} className={`col-start-1 row-start-1 ${className}`}>
      {children}
    </div>
  )
}

export type PartText = { numeral: string; heading: ReactNode; body: ReactNode }
export type PartShot = { part: number; media: ReactNode; caption: string }

/** Pinned screen: text for one part at left, its visual at right, swapped with a vertical wipe. */
export function PinnedParts({ parts, shots }: { parts: PartText[]; shots: PartShot[] }) {
  const { ref, fillRef, step } = useStepProgress(shots.length)
  const activePart = shots[step]?.part ?? 0

  return (
    <>
      <div ref={ref} className="pinned-live relative" style={{ height: `${shots.length * 100}svh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center">
          <Container className="relative">
            <div aria-hidden="true" className="absolute top-0 -left-12 h-full w-px bg-[#2A2A2A]">
              <span
                ref={fillRef}
                className="absolute inset-0 origin-top bg-[#F4A023]"
                style={{ transform: "scaleY(0)" }}
              />
              {parts.map((p, i) => {
                const first = shots.findIndex((s) => s.part === i)
                return (
                  <span
                    key={p.numeral}
                    className={`absolute left-3 -translate-y-1/2 text-xs tabular-nums transition-colors duration-700 ${
                      i === activePart ? "text-white" : GREY
                    }`}
                    style={{ top: `${(first / shots.length) * 100}%` }}
                  >
                    {p.numeral}
                  </span>
                )
              })}
            </div>

            <div className="grid grid-cols-4 items-center">
              <div className="col-span-2 grid pr-16">
                {parts.map((p, i) => (
                  <Panel key={p.numeral} i={i} active={activePart}>
                    <h3 className={STATEMENT_TYPE}>{p.heading}</h3>
                    <div className={`mt-8 space-y-4 ${BODY_TYPE}`}>{p.body}</div>
                  </Panel>
                ))}
              </div>
              <div className="col-span-2 grid">
                {shots.map((s, i) => (
                  <Panel key={i} i={i} active={step}>
                    {s.media}
                    <p className={`mt-4 text-sm ${GREY}`}>{s.caption}</p>
                  </Panel>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="pinned-stack space-y-24 pb-24">
        {parts.map((p, i) => (
          <div key={p.numeral}>
            <span className={`text-sm tabular-nums ${GREY}`} aria-hidden="true">
              {p.numeral}
            </span>
            <h3 className={`mt-4 ${STATEMENT_TYPE}`}>{p.heading}</h3>
            <div className={`mt-6 space-y-4 ${BODY_TYPE}`}>{p.body}</div>
            <div className="mt-10 space-y-10">
              {shots
                .filter((s) => s.part === i)
                .map((s, j) => (
                  <figure key={j}>
                    {s.media}
                    <figcaption className={`mt-4 text-sm ${GREY}`}>{s.caption}</figcaption>
                  </figure>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  )
}

/** Pinned screen of statements, each replacing the last in the same position. */
export function PinnedStatements({ steps }: { steps: ReactNode[] }) {
  const { ref, step } = useStepProgress(steps.length)
  return (
    <>
      <div ref={ref} className="pinned-live relative" style={{ height: `${steps.length * 100}svh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center">
          <Container>
            <div className="grid max-w-[1100px]">
              {steps.map((s, i) => (
                <Panel key={i} i={i} active={step}>
                  {s}
                </Panel>
              ))}
            </div>
          </Container>
        </div>
      </div>
      <Container className="pinned-stack space-y-12 pb-32">
        {steps.map((s, i) => (
          <InView key={i}>{s}</InView>
        ))}
      </Container>
    </>
  )
}
