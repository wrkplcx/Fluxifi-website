import Link from "next/link"
import { BUYERS } from "@/lib/content"
import { ImageSlot } from "@/components/site/image-slot"
import { BookButton, Heading, LeadItem, SearchLine, Section, splitLead } from "@/components/site/primitives"

const PROOF_STATS = [
  { value: "15 years", label: "in AV and IT" },
  { value: "$7M+", label: "in avoided spend" },
  { value: "30%", label: "lower equipment cost" },
  { value: "98%", label: "of projects delivered on time" },
]

export function ProofBar() {
  return (
    <section aria-label="Proof" className="px-4 md:px-6 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-6xl mx-auto py-12">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PROOF_STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl md:text-4xl font-semibold text-[#F4A023] tracking-tight">{s.value}</dd>
              <dd className="text-sm text-white/60">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-white/40 text-pretty">
          Trusted by a global streaming company, a global cybersecurity company and an 80-office recruiting firm.
        </p>
      </div>
    </section>
  )
}

export function Problem() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Heading>Everyone did their job. The room still doesn&apos;t work.</Heading>
        <div className="mt-8 flex flex-col gap-5 text-lg text-white/60 leading-relaxed">
          <p>
            Every building project has an architect, a contractor, an IT team, a screen and sound installer and a
            cabling crew. Each handles one piece. Nobody is responsible for whether the technology works on day one.
          </p>
          <p>
            So the display lands where the outlet isn&apos;t. The network room has no cooling. The room opens and the
            video call fails.
          </p>
        </div>
      </div>
    </Section>
  )
}

function ItemList({ items, columns = 2 }: { items: string[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-4 md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item) => {
        const { lead, rest } = splitLead(item)
        return (
          <li
            key={item}
            className="rounded-xl border border-white/10 bg-[#111111] p-6 leading-relaxed hover:border-[#F4A023]/40 transition-colors"
          >
            <LeadItem lead={lead} rest={rest} />
          </li>
        )
      })}
    </ul>
  )
}

export function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <SearchLine>AV consulting, technology design and program management</SearchLine>
      <Heading>We are the one in charge.</Heading>
      <div className="mt-12">
        <ItemList
          columns={3}
          items={[
            "Design. We create one approved design for each type of room, and the drawings contractors build from.",
            "Manage. We run the vendors, the schedule and the budget on every project.",
            "Verify. We test every room before it opens.",
            "Support. After opening, your team calls us. We sort out who fixes it.",
            "Build. We build the systems your team runs projects on, and automate the manual work out of them.",
          ]}
        />
      </div>
    </Section>
  )
}

export function WhatWeCover() {
  return (
    <Section id="what-we-cover" className="border-t border-white/5">
      <SearchLine>Audiovisual, network infrastructure and structured cabling</SearchLine>
      <ItemList
        columns={3}
        items={[
          "Screens, cameras and sound. Meeting rooms, lobbies, event spaces. The industry calls this AV.",
          "Wi-Fi and network. The equipment rooms and gear that connect everything. The IT side.",
          "Cabling. Every wire behind the walls and above the ceiling. Also called structured cabling or low voltage.",
          "Digital signs. Displays in lobbies, hallways and stores.",
          "Security and building systems. We coordinate with whoever installs them.",
        ]}
      />
      <p className="mt-8 text-sm text-white/40">Offices, retail, healthcare, venues and government.</p>
    </Section>
  )
}

export function WhoWeWorkWith() {
  return (
    <Section id="who-we-work-with" className="border-t border-white/5 scroll-mt-24">
      <div className="max-w-3xl">
        <Heading>Whoever is building the space, we handle the technology.</Heading>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BUYERS.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/for/${b.slug}`}
              className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-white/10 bg-[#111111] p-6 transition-colors hover:border-[#F4A023]/50 focus-visible:outline-2 focus-visible:outline-[#F4A023]"
            >
              <p className="leading-relaxed">
                <LeadItem lead={b.cardName} rest={b.cardText} />
              </p>
              <span aria-hidden="true" className="text-[#F4A023] transition-transform group-hover:translate-x-1">
                {"\u2192"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

const WORK_SLOTS = [
  { slot: "work-1", alt: "3D model of a meeting room showing display, camera and table layout" },
  { slot: "work-2", alt: "Animated 3D walkthrough of a conference room design" },
  { slot: "work-3", alt: "AV construction drawing for a boardroom" },
  { slot: "work-4", alt: "Finished conference room with dual displays" },
  { slot: "work-5", alt: "Finished meeting room with ceiling microphones and camera" },
  { slot: "work-6", alt: "Project dashboard tracking the build and testing of each room" },
]

export function OurWork() {
  return (
    <Section id="our-work" className="border-t border-white/5">
      <div className="max-w-3xl">
        <SearchLine>3D room modeling and AV construction drawings</SearchLine>
        <Heading>We find the mistakes on screen. Everyone else finds them on site.</Heading>
        <p className="mt-8 text-lg text-white/60 leading-relaxed">
          We model every room in 3D before anyone orders equipment. Moving a display in a model takes a minute. Moving
          it on a finished wall takes a crew.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORK_SLOTS.map((w) => (
          <ImageSlot key={w.slot} slot={w.slot} alt={w.alt} className="aspect-[4/3]" />
        ))}
      </div>
      <aside className="mt-10 rounded-xl border border-[#F4A023]/30 bg-[#F4A023]/5 p-6 md:p-8">
        <p className="text-white/80 leading-relaxed text-pretty">
          A client asked for a computer mounted behind every sign. Their tech team approved it. Our 3D model showed it
          would put the displays out of accessibility compliance. We caught it before a single unit shipped.
        </p>
      </aside>
    </Section>
  )
}

const RESULTS = [
  { value: "$7M+", label: "in avoided spend" },
  { value: "30%", label: "lower equipment cost" },
  { value: "120 hours", label: "a week returned to internal teams" },
  { value: "98%", label: "on-time delivery" },
]

export function Results() {
  return (
    <Section id="results" className="border-t border-white/5">
      <SearchLine>Multi-site technology rollouts</SearchLine>
      <Heading>What clients get.</Heading>
      <ul className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {RESULTS.map((r) => (
          <li key={r.label} className="rounded-xl border border-white/10 bg-[#111111] p-6">
            <p className="text-3xl md:text-4xl font-semibold text-[#F4A023] tracking-tight">{r.value}</p>
            <p className="mt-2 text-sm text-white/60">{r.label}</p>
          </li>
        ))}
      </ul>
      <aside className="mt-6 rounded-xl border border-white/10 bg-[#111111] p-6 md:p-8">
        <p className="text-white/80 leading-relaxed text-pretty">
          An 80-office company paid a consultant per project and had no documentation on the small ones. We now handle
          all 15 to 20 of their projects a year under one design.
        </p>
      </aside>
    </Section>
  )
}

const STEPS = [
  "Call. 30 minutes. You tell us what you're building.",
  "Audit. 30 days. We review your standards, vendors and upcoming projects. You get a written plan.",
  "Program. We run your technology projects for a flat monthly fee.",
]

export function HowToStart() {
  return (
    <Section id="how-to-start" className="border-t border-white/5">
      <div className="max-w-3xl">
        <Heading>Send us one floor plan. We&apos;ll show you what your vendors missed.</Heading>
      </div>
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const { lead, rest } = splitLead(step)
          return (
            <li key={step} className="rounded-xl border border-white/10 bg-[#111111] p-6 leading-relaxed">
              <span className="block text-sm font-mono text-[#F4A023] mb-3">{i + 1}.</span>
              <LeadItem lead={lead} rest={rest} />
            </li>
          )
        })}
      </ol>
      <div className="mt-12">
        <BookButton />
      </div>
    </Section>
  )
}
