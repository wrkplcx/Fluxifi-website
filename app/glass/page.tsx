import type { Metadata } from "next"
import { CALENDLY_URL } from "@/lib/content"
import { ImageSlot } from "@/components/site/image-slot"
import { Heading, LeadItem, SearchLine, Section, splitLead } from "@/components/site/primitives"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi Glass: 3D Record of Your Building Technology" },
  description:
    "Fluxifi Glass stores your room designs and a 3D record of exactly what was installed in every space. Runs in your own account.",
}

const FEATURES = [
  "Stores your room designs. One approved design for each type of room. Change it once and every future project follows.",
  "Designs new rooms in minutes. Pick a room type and see it in 3D. Get the equipment list and the documents vendors price from. No special skills needed.",
  "Records what was built. Every room as installed, with photos, equipment and network details.",
  "Works with any brand. Not tied to one manufacturer.",
  "Stays yours. Runs in your account. You own the data.",
]

const GALLERY = [
  { slot: "glass-1", alt: "Room design library in Fluxifi Glass" },
  { slot: "glass-2", alt: "3D room model with generated equipment list" },
  { slot: "glass-3", alt: "Installed room record with photos and device details" },
]

export default function GlassPage() {
  return (
    <>
      <Section className="pt-36 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <SearchLine>3D as-built records, room standards and room design software</SearchLine>
            <Heading as="h1">Fluxifi Glass. See every room you own.</Heading>
            <p className="mt-8 text-lg text-white/60 leading-relaxed">
              When a project ends, the knowledge of what was built leaves with the people who built it. Glass keeps it.
              One place for how your rooms should be designed and what was actually installed.
            </p>
          </div>
          <ImageSlot
            slot="glass-hero"
            alt="Fluxifi Glass 3D view of a conference room with equipment labeled"
            className="aspect-[4/3]"
            priority
          />
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <Heading>What it does</Heading>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const { lead, rest } = splitLead(f)
            return (
              <li key={f} className="rounded-xl border border-white/10 bg-[#111111] p-6 leading-relaxed">
                <LeadItem lead={lead} rest={rest} />
              </li>
            )
          })}
        </ul>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g) => (
            <ImageSlot key={g.slot} slot={g.slot} alt={g.alt} className="aspect-[4/3]" />
          ))}
        </div>
      </Section>

      <Section className="border-t border-white/5">
        <div className="max-w-3xl">
          <Heading>Who it&apos;s for</Heading>
          <p className="mt-8 text-lg text-white/60 leading-relaxed">
            Internal teams responsible for technology across many locations.
          </p>
          <p className="mt-6 text-sm text-[#F4A023]">In early access with Fluxifi clients.</p>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#F4A023] text-black font-medium rounded-lg text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(244,160,35,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A023]"
            >
              Request a demo
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
