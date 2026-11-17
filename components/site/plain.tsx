import type { ReactNode } from "react"
import { CALENDLY_URL } from "@/lib/content"

type Tone = "dark" | "sheet" | "amber"

const TONE: Record<Tone, string> = {
  dark: "bg-[#0C0F13] text-[#F3F5F7]",
  sheet: "bg-[#EEF1F4] text-[#0C0F13]",
  amber: "bg-[#F4A023] text-[#0C0F13]",
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 ${className}`}>{children}</div>
}

export function PlainSection({
  children,
  tone = "dark",
  className = "",
  label,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  label?: string
}) {
  return (
    <section aria-label={label} className={`${TONE[tone]} py-28 md:py-40 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function PlainHeading({
  children,
  as = "h2",
  className = "",
}: {
  children: ReactNode
  as?: "h1" | "h2"
  className?: string
}) {
  const Tag = as
  const size =
    as === "h1"
      ? "text-[48px] md:text-[72px] lg:text-[88px] leading-[0.95]"
      : "text-[40px] md:text-[56px] leading-[1]"
  return <Tag className={`${size} font-extrabold tracking-[-0.035em] text-balance ${className}`}>{children}</Tag>
}

export function Body({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  const color = tone === "dark" ? "text-[#8A94A3]" : "text-[#0C0F13]/75"
  return <div className={`mt-10 max-w-[600px] space-y-5 text-xl leading-normal ${color} ${className}`}>{children}</div>
}

export function CtaButton({ label, variant = "light" }: { label: string; variant?: "light" | "dark" }) {
  const styles =
    variant === "dark"
      ? "bg-[#0C0F13] text-[#F3F5F7] hover:bg-black focus-visible:outline-[#0C0F13]"
      : "bg-[#F3F5F7] text-[#0C0F13] hover:bg-white focus-visible:outline-[#F3F5F7]"
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 ${styles}`}
    >
      {label}
    </a>
  )
}

export const linkClass =
  "text-[#F4A023] underline underline-offset-4 hover:text-[#ffb341] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A023]"
