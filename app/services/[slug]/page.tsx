import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SERVICES } from "@/lib/content"
import { BookButton, Heading, Section } from "@/components/site/primitives"

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: { absolute: service.title }, description: service.description }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <Section className="pt-36 md:pt-44">
      <div className="max-w-3xl">
        <Heading as="h1">{service.name}</Heading>
        <div className="mt-8 flex flex-col gap-5 text-lg text-white/60 leading-relaxed">
          {service.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="mt-10 flex flex-col gap-4">
          {service.details.map((d) => (
            <div key={d.text} className="rounded-xl border border-white/10 bg-[#111111] p-6 leading-relaxed">
              {d.label ? (
                <>
                  <dt className="text-white font-medium">{d.label}:</dt>
                  <dd className="mt-1 text-white/60">{d.text}</dd>
                </>
              ) : (
                <dd className="text-[#F4A023] font-medium">{d.text}</dd>
              )}
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <BookButton />
        </div>
      </div>
    </Section>
  )
}
