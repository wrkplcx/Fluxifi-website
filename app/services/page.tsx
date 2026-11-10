import type { Metadata } from "next"
import Link from "next/link"
import { SERVICES } from "@/lib/content"
import { Heading, Section } from "@/components/site/primitives"

export const metadata: Metadata = {
  title: { absolute: "AV and IT Design, Project Management and Support: Fluxifi" },
  description:
    "Five ways to work with Fluxifi: technology audit, design, program management, ongoing support, and systems and automation.",
}

export default function ServicesPage() {
  return (
    <Section className="pt-36 md:pt-44">
      <Heading as="h1">Five ways to work with us.</Heading>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-[#111111] p-6 transition-colors hover:border-[#F4A023]/50 focus-visible:outline-2 focus-visible:outline-[#F4A023]"
            >
              <h2 className="text-xl font-semibold text-white">{s.name}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="text-white/60 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.details.map((d) => (
                <p key={d.text} className="text-sm text-white/60 leading-relaxed">
                  {d.label && <span className="text-white font-medium">{d.label}: </span>}
                  {d.text}
                </p>
              ))}
              <span aria-hidden="true" className="mt-auto text-[#F4A023] transition-transform group-hover:translate-x-1">
                {"\u2192"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
