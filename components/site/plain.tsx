import type { ReactNode } from "react"
import { CALENDLY_URL } from "@/lib/content"

export function PlainSection({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <section
      className={`bg-[#0A0A0A] px-6 ${first ? "pt-40 pb-32 md:pt-52 md:pb-48" : "py-32 md:py-48"}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function PlainHeading({ children, as = "h2" }: { children: ReactNode; as?: "h1" | "h2" }) {
  const Tag = as
  const size = as === "h1" ? "text-4xl md:text-6xl lg:text-7xl" : "text-3xl md:text-5xl lg:text-6xl"
  return (
    <Tag className={`${size} max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-balance`}>
      {children}
    </Tag>
  )
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 max-w-[640px] space-y-6 text-lg leading-relaxed text-white/70 md:text-xl">{children}</div>
  )
}

export function CtaButton({ label }: { label: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-lg bg-[#F4A023] px-8 py-4 text-lg font-medium text-black hover:bg-[#ffb341] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A023]"
    >
      {label}
    </a>
  )
}

export function Step({
  ordinal,
  title,
  children,
  images,
}: {
  ordinal: string
  title: string
  children: ReactNode
  images: ReactNode
}) {
  return (
    <div className="mt-24 first:mt-20 md:mt-40">
      <h3 className="max-w-[640px] text-2xl font-semibold leading-snug text-white md:text-4xl">
        <span className="text-[#F4A023]">{ordinal}</span> {title}
      </h3>
      <div className="mt-8 max-w-[640px] space-y-4 text-lg leading-relaxed text-white/70 md:text-xl">{children}</div>
      <div className="mt-12">{images}</div>
    </div>
  )
}
