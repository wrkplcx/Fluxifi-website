"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

function motionAllowed() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("motion-ok")
}

/** Sets data-inview="true" once the element scrolls into view. CSS handles the motion. */
export function InView({
  as = "div",
  children,
  className = "",
  threshold = 0.2,
  id,
  ...rest
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  threshold?: number
  id?: string
  [key: `aria-${string}`]: string | undefined
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const Tag = as
  return (
    <Tag ref={ref} id={id} className={className} data-inview={seen ? "true" : "false"} {...rest}>
      {children}
    </Tag>
  )
}

/** Counts up from zero once in view. Server and no-JS render the final value. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/)
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || !motionAllowed()) return
    const [, prefix, num, suffix] = match
    const target = Number.parseFloat(num)
    const decimals = num.includes(".") ? num.split(".")[1].length : 0
    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`)

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4)
          setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
