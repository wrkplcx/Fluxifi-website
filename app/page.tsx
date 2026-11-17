import type { Metadata } from "next"
import Link from "next/link"
import { ImageSlot } from "@/components/site/image-slot"
import { Body, Container, CtaButton, PlainHeading, PlainSection, linkClass } from "@/components/site/plain"
import { RoomDrawing } from "@/components/drawing/room-drawing"
import { PartsScroller } from "@/components/drawing/parts-scroller"

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

const TRADES = [
  { word: "AV.", color: "#F4A023" },
  { word: "Network.", color: "#4DA3FF" },
  { word: "Cabling.", color: "#3ECF8E" },
  { word: "Security.", color: "#FF5C5C" },
]

const huge = "font-extrabold tracking-[-0.035em] leading-[0.95]"

export default function Home() {
  return (
    <div className="bg-[#0C0F13] text-[#F3F5F7]">
      {/* Hero */}
      <section className="overflow-x-clip pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 md:px-12 lg:grid-cols-12 lg:pr-0 lg:pl-20">
          <div className="lg:col-span-6">
            <PlainHeading as="h1">Fluxifi designs, manages and supports the technology in your buildings.</PlainHeading>
            <p className="mt-10 flex flex-wrap gap-x-3 text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">
              {TRADES.map((t) => (
                <span key={t.word} style={{ color: t.color }}>
                  {t.word}
                </span>
              ))}
            </p>
            <p className="mt-4 text-xl leading-normal text-[#8A94A3]">One team. One contract. One monthly fee.</p>
            <div className="mt-12">
              <CtaButton label="Book a call" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <RoomDrawing assemble className="lg:w-[118%]" />
          </div>
        </div>
      </section>

      {/* Three parts */}
      <section className="py-28 md:py-40">
        <Container>
          <PlainHeading>There are three parts.</PlainHeading>
          <PartsScroller
            parts={[
              {
                numeral: "1",
                heading: "First, we design it.",
                body: (
                  <p>
                    You get one drawing set covering all four trades, a 3D model of every room, and an equipment list
                    with part numbers. Contractors build from our drawings.
                  </p>
                ),
                media: (
                  <div className="space-y-6">
                    <ImageSlot
                      slot="work-1"
                      alt="Drawing set covering AV, network, cabling and security"
                      className="aspect-[16/9]"
                      frame="square"
                      hideIfEmpty
                    />
                    <ImageSlot slot="work-3" alt="3D model of a room" className="aspect-[16/9]" frame="square" hideIfEmpty />
                  </div>
                ),
              },
              {
                numeral: "2",
                heading: "Second, we manage the build.",
                body: (
                  <>
                    <p>We bid it, pick the installers, and run the schedule and the budget.</p>
                    <p>We test every room before you move in.</p>
                  </>
                ),
                media: (
                  <ImageSlot slot="work-4" alt="Build in progress on site" className="aspect-[16/9]" frame="square" hideIfEmpty />
                ),
              },
              {
                numeral: "3",
                heading: "Third, we support it.",
                body: (
                  <>
                    <p>When something breaks, you call us. We find the cause and send the right vendor.</p>
                    <p>
                      {"We keep the record of what's installed in every room in "}
                      <Link href="/glass" className={linkClass}>
                        Fluxifi Glass
                      </Link>
                      , our platform. You own it.
                    </p>
                  </>
                ),
                media: (
                  <ImageSlot
                    slot="work-6"
                    alt="Installed room record in Fluxifi Glass"
                    className="aspect-[16/9]"
                    frame="square"
                    hideIfEmpty
                  />
                ),
              },
            ]}
          />
        </Container>
      </section>

      {/* Why */}
      <PlainSection tone="sheet">
        <PlainHeading>Why</PlainHeading>
        <Body tone="sheet">
          <p>Today you hire four vendors. Each one draws its own piece. Nobody checks that the pieces fit.</p>
          <p>So the problems show up on site, where they cost the most.</p>
          <p>We put all four on one drawing, under one contract.</p>
        </Body>
        <p className={`mt-16 text-[56px] md:text-[96px] lg:text-[128px] ${huge}`}>{"That's the whole idea."}</p>
      </PlainSection>

      {/* What we don't do */}
      <PlainSection>
        <PlainHeading>{"What we don't do"}</PlainHeading>
        <p className={`mt-16 text-[44px] md:text-[80px] lg:text-[120px] ${huge}`}>
          <span className="block">{"We don't sell equipment."}</span>
          <span className="block">{"We don't take commissions."}</span>
          <span className="block">{"We don't install."}</span>
        </p>
        <div className="mt-16 lg:grid lg:grid-cols-12">
          <p className="max-w-[600px] text-xl leading-normal text-[#8A94A3] lg:col-span-5 lg:col-start-8">
            {"We work for you. That's why we can tell you when a vendor is wrong."}
          </p>
        </div>
      </PlainSection>

      {/* Proof */}
      <PlainSection className="border-t border-white/10">
        <PlainHeading>Proof</PlainHeading>
        <p className="mt-12 max-w-[1100px] text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-balance md:text-[48px]">
          One client has 80 offices and 400 rooms. We run all 15 to 20 of their projects a year under one contract.
        </p>
        <dl className="mt-20 grid border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-white/15">
          {STATS.map((s, i) => (
            <div
              key={s.value}
              className={`flex flex-col-reverse py-10 md:px-10 md:first:pl-0 ${i > 0 ? "border-t border-white/15 md:border-t-0" : ""}`}
            >
              <dt className="mt-3 text-lg text-[#8A94A3]">{s.label}</dt>
              <dd className={`text-[72px] md:text-[96px] lg:text-[120px] ${huge}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-16 max-w-[600px] text-xl leading-normal text-[#8A94A3]">
          15 years doing this, as an integrator, a manufacturer and a consultant.
        </p>
      </PlainSection>

      {/* Who it's for */}
      <PlainSection className="border-t border-white/10">
        <PlainHeading>{"Who it's for"}</PlainHeading>
        <Body>
          <p>Companies with many locations. And the architects and general contractors who build for them.</p>
        </Body>
      </PlainSection>

      {/* Price */}
      <section aria-labelledby="price-heading" className="border-t border-white/10 py-28 md:py-40">
        <Container>
          <h2 id="price-heading" className="sr-only">
            Price
          </h2>
          <p className={`max-w-[1200px] text-balance text-[48px] md:text-[72px] lg:text-[88px] ${huge}`}>
            Programs start at $19,000 a month. A 30-day audit is $9,000.
          </p>
        </Container>
      </section>

      {/* Final call */}
      <PlainSection tone="amber">
        <PlainHeading>Send us one floor plan.</PlainHeading>
        <Body tone="amber">
          <p className="text-[#0C0F13]">{"We'll model the room and show you what we'd change."}</p>
        </Body>
        <div className="mt-12">
          <CtaButton label="Book a call" variant="dark" />
        </div>
      </PlainSection>
    </div>
  )
}
