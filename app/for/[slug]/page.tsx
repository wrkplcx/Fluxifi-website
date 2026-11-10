import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BUYERS } from "@/lib/content"
import { BookButton, Heading, Section } from "@/components/site/primitives"

export const dynamicParams = false

export function generateStaticParams() {
  return BUYERS.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const buyer = BUYERS.find((b) => b.slug === slug)
  if (!buyer) return {}
  return { title: { absolute: buyer.title }, description: buyer.description }
}

export default async function BuyerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const buyer = BUYERS.find((b) => b.slug === slug)
  if (!buyer) notFound()

  return (
    <Section className="pt-36 md:pt-44">
      <div className="max-w-3xl">
        <Heading as="h1">{buyer.heading}</Heading>
        <p className="mt-8 text-lg text-white/60 leading-relaxed text-pretty">{buyer.intro}</p>
        <ul className="mt-10 flex flex-col gap-3">
          {buyer.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#111111] p-5 text-white/80"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F4A023]" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <BookButton />
        </div>
      </div>
    </Section>
  )
}
