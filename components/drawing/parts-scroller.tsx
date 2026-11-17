"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { RoomDrawing, type DrawingPhase } from "./room-drawing"

export type Part = {
  numeral: string
  heading: ReactNode
  body: ReactNode
  media?: ReactNode
}

export function PartsScroller({ parts }: { parts: Part[] }) {
  const [phase, setPhase] = useState<DrawingPhase>(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            setPhase((index + 1) as DrawingPhase)
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    for (const el of refs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        {parts.map((part, i) => (
          <div
            key={part.numeral}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            className="flex flex-col justify-center py-16 lg:min-h-[85vh] lg:py-24"
          >
            <div className="mb-12 lg:hidden">
              <RoomDrawing phase={(i + 1) as DrawingPhase} />
            </div>
            <div className="flex gap-6 md:gap-10">
              <span
                aria-hidden="true"
                className="w-16 shrink-0 text-[96px] font-extrabold leading-[0.8] tracking-[-0.04em] text-[#F4A023] md:w-28 md:text-[160px]"
              >
                {part.numeral}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#F3F5F7] md:text-[40px]">
                  {part.heading}
                </h3>
                <div className="mt-6 max-w-[600px] space-y-4 text-xl leading-normal text-[#8A94A3]">{part.body}</div>
              </div>
            </div>
            {part.media ? <div className="mt-12">{part.media}</div> : null}
          </div>
        ))}
      </div>
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <RoomDrawing phase={phase} className="w-full" />
        </div>
      </div>
    </div>
  )
}
