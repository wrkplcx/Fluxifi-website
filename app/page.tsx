import type { Metadata } from "next"
import Link from "next/link"
import { ImageSlot } from "@/components/site/image-slot"
import { Body, CtaButton, PlainHeading, PlainSection, Step } from "@/components/site/plain"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi: AV, IT, Cabling and Security Design and Management" },
  description:
    "Fluxifi designs, manages and supports the AV, network, cabling and security in your buildings. One team, one contract, one monthly fee.",
}

const STATS = [
  { value: "$7M+", label: "in avoided spend" },
  { value: "30%", label: "lower equipment cost" },
  { value: "98%", label: "of projects on time" },
]

export default function Home() {
  return (
    <>
      <PlainSection first>
        <PlainHeading as="h1">Fluxifi designs, manages and supports the technology in your buildings.</PlainHeading>
        <p className="mt-10 text-3xl font-medium text-white md:text-5xl">AV. Network. Cabling. Security.</p>
        <p className="mt-6 text-xl text-white/70 md:text-2xl">One team. One contract. One monthly fee.</p>
        <div className="mt-12">
          <CtaButton label="Book a call" />
        </div>
        <ImageSlot
          slot="hero-image"
          alt="3D model of a conference room with displays, camera and speakers"
          className="mt-24 aspect-[16/9]"
          priority
        />
      </PlainSection>

      <PlainSection>
        <PlainHeading>There are three parts.</PlainHeading>

        <Step
          ordinal="First,"
          title="we design it."
          images={
            <div className="grid gap-6 md:grid-cols-2">
              <ImageSlot slot="work-1" alt="Drawing set covering AV, network, cabling and security" className="aspect-[4/3]" />
              <ImageSlot slot="work-3" alt="3D model of a room" className="aspect-[4/3]" />
            </div>
          }
        >
          <p>
            You get one drawing set covering all four trades, a 3D model of every room, and an equipment list with
            part numbers. Contractors build from our drawings.
          </p>
        </Step>

        <Step
          ordinal="Second,"
          title="we manage the build."
          images={<ImageSlot slot="work-4" alt="Build in progress on site" className="aspect-[16/9]" />}
        >
          <p>We bid it, pick the installers, and run the schedule and the budget.</p>
          <p>We test every room before you move in.</p>
        </Step>

        <Step
          ordinal="Third,"
          title="we support it."
          images={<ImageSlot slot="work-6" alt="Installed room record in Fluxifi Glass" className="aspect-[16/9]" />}
        >
          <p>When something breaks, you call us. We find the cause and send the right vendor.</p>
          <p>
            {"We keep the record of what's installed in every room in "}
            <Link href="/glass" className="text-white underline underline-offset-4 hover:text-[#F4A023]">
              Fluxifi Glass
            </Link>
            , our platform. You own it.
          </p>
        </Step>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Why</PlainHeading>
        <Body>
          <p>Today you hire four vendors. Each one draws its own piece. Nobody checks that the pieces fit.</p>
          <p>So the problems show up on site, where they cost the most.</p>
          <p>{"We put all four on one drawing, under one contract. That's the whole idea."}</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>{"What we don't do"}</PlainHeading>
        <Body>
          <p>{"We don't sell equipment. We don't take commissions. We don't install."}</p>
          <p>{"We work for you. That's why we can tell you when a vendor is wrong."}</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Proof</PlainHeading>
        <Body>
          <p>
            One client has 80 offices and 400 rooms. We run all 15 to 20 of their projects a year under one contract.
          </p>
        </Body>
        <dl className="mt-20 grid gap-12 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-6xl font-semibold tracking-tight text-white md:text-7xl">{s.value}</span>
                <span className="mt-3 block text-lg text-white/70">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-20 max-w-[640px] text-lg leading-relaxed text-white/70 md:text-xl">
          15 years doing this, as an integrator, a manufacturer and a consultant.
        </p>
      </PlainSection>

      <PlainSection>
        <PlainHeading>{"Who it's for"}</PlainHeading>
        <Body>
          <p>Companies with many locations. And the architects and general contractors who build for them.</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Price</PlainHeading>
        <Body>
          <p>Programs start at $19,000 a month. A 30-day audit is $9,000.</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Send us one floor plan.</PlainHeading>
        <Body>
          <p>{"We'll model the room and show you what we'd change."}</p>
        </Body>
        <div className="mt-12">
          <CtaButton label="Book a call" />
        </div>
      </PlainSection>
    </>
  )
}
