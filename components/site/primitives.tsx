import type { ReactNode } from "react"
import { CALENDLY_URL } from "@/lib/content"

export function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-8 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(244,160,35,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A023] ${className}`}
    >
      Book a call
    </a>
  )
}

export function SearchLine({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-xs md:text-sm text-white/40 mb-3 ${center ? "text-center" : ""}`}>{children}</p>
  )
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 px-4 md:px-6 bg-[#0A0A0A] ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

export function Heading({ children, as = "h2" }: { children: ReactNode; as?: "h1" | "h2" }) {
  const Tag = as
  const size =
    as === "h1"
      ? "text-4xl md:text-5xl lg:text-6xl"
      : "text-3xl md:text-4xl lg:text-5xl"
  return (
    <Tag className={`${size} font-semibold text-white leading-[1.1] tracking-tight text-balance`}>{children}</Tag>
  )
}

export function LeadItem({ lead, rest }: { lead: string; rest: string }) {
  return (
    <>
      <span className="text-white font-medium">{lead}</span>{" "}
      <span className="text-white/60">{rest}</span>
    </>
  )
}

export function splitLead(text: string) {
  const i = text.indexOf(". ")
  if (i === -1) return { lead: text, rest: "" }
  return { lead: text.slice(0, i + 1), rest: text.slice(i + 2) }
}
