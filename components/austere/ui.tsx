import type { CSSProperties, ReactNode } from "react"
import { CALENDLY_URL } from "@/lib/content"
import { InView } from "./motion"

export const GREY = "text-[#8C8C8C]"
export const HERO_TYPE = "font-extrabold text-[clamp(44px,5.6vw,96px)] leading-[0.98] tracking-[-0.04em]"
export const STATEMENT_TYPE = "font-bold text-[clamp(32px,4vw,64px)] leading-[1.04] tracking-[-0.03em]"
export const BODY_TYPE = `text-xl leading-[1.5] ${GREY} max-w-[560px]`

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 ${className}`}>{children}</div>
}

/** Thin vertical guide lines at the page margins and column edges, full height of the parent. */
export function PageGrid() {
  const cols = ["0%", "25%", "50%", "75%", "100%"]
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <Container className="relative h-full">
        <div className="relative h-full">
          {cols.map((left, i) => (
            <span
              key={left}
              className={`guide-y absolute top-0 h-full w-px bg-[#1C1C1C] ${i === 0 || i === 4 ? "" : "hidden lg:block"}`}
              style={{ left, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

/** A line of text that rises into place from behind a mask. Use inside <InView>. */
export function Line({ children, i = 0, className = "" }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <span className={`reveal-line ${className}`} style={{ "--i": i } as CSSProperties}>
      <span>{children}</span>
    </span>
  )
}

export function SectionRule({ index, name, id }: { index: number; name?: string; id?: string }) {
  return (
    <InView className="relative flex items-baseline gap-6 pt-5 pb-16 md:pb-24" threshold={0.5}>
      <span aria-hidden="true" className="draw-x absolute top-0 left-0 h-px w-full bg-[#2A2A2A]" />
      <span aria-hidden="true" className={`w-6 text-sm tabular-nums ${GREY}`}>
        {index}
      </span>
      {name ? (
        <h2 id={id} className={`text-sm ${GREY}`}>
          {name}
        </h2>
      ) : null}
    </InView>
  )
}

export function OutlineButton({ label, href = CALENDLY_URL }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center border border-white px-8 py-4 text-base font-medium text-white transition-colors duration-500 ease-out hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {label}
    </a>
  )
}

/** Plain statement on a full screen of its own. */
export function StatementScreen({
  index,
  name,
  id,
  children,
}: {
  index: number
  name: string
  id?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-label={name} className="relative flex min-h-[100svh] flex-col">
      <Container>
        <SectionRule index={index} name={name} />
      </Container>
      <Container className="flex flex-1 items-center pb-32">
        <InView className="max-w-[1100px]">{children}</InView>
      </Container>
    </section>
  )
}
