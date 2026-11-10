import type { Metadata } from "next"
import { BookButton, Heading, Section } from "@/components/site/primitives"

export const metadata: Metadata = {
  title: { absolute: "AV and Technology Consulting FAQ: Fluxifi" },
  description:
    "What an AV and technology consultant does, what it costs, and how Fluxifi differs from an AV integrator.",
}

const FAQS = [
  {
    q: "What does an AV and technology consultant do?",
    a: "Designs the audiovisual, network and cabling systems in a building, and makes sure the vendors build them correctly.",
  },
  {
    q: "What is a technology owner's representative?",
    a: "An independent team that works for the company that owns the space, not for a vendor. It manages every technology vendor on the project.",
  },
  {
    q: "How is Fluxifi different from an AV integrator?",
    a: "An integrator installs equipment. We design the systems, pick and manage the integrator, and test the result.",
  },
  { q: "Do you install equipment?", a: "No. Installation is done by integrators we select and oversee." },
  {
    q: "What does AV and IT design cost?",
    a: "Audits start at $9,000. Ongoing programs start at $19,000 a month.",
  },
  { q: "Do you only work on offices?", a: "No. We work on offices, retail, healthcare, venues and government." },
  {
    q: "Do you work with architects and general contractors?",
    a: "Yes. We act as the technology design team on their projects.",
  },
]

export default function FAQPage() {
  return (
    <Section className="pt-36 md:pt-44">
      <div className="max-w-3xl">
        <Heading as="h1">Questions we get.</Heading>
        <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="text-lg font-medium text-white">{f.q}</dt>
              <dd className="mt-2 text-white/60 leading-relaxed">{f.a}</dd>
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
