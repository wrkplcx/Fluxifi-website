import type { Metadata } from "next"
import Link from "next/link"
import { InView, CountUp } from "@/components/austere/motion"
import {
  BODY_TYPE,
  Container,
  GREY,
  HERO_TYPE,
  Line,
  OutlineButton,
  PageGrid,
  STATEMENT_TYPE,
  SectionRule,
  StatementScreen,
} from "@/components/austere/ui"
import { HeroRoom, HeroTrades } from "@/components/austere/hero-room"
import { PinnedParts, PinnedStatements } from "@/components/austere/pinned"
import { PlanWire } from "@/components/austere/plan-wire"
import { Shot, publicFileExists } from "@/components/austere/shot"

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

const inlineLink =
  "link-draw text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

export default function Home() {
  const heroVideo = publicFileExists("hero.mp4")

  return (
    <div className="relative bg-black text-white">
      <PageGrid />

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block" aria-hidden="true">
          {heroVideo ? (
            <video className="h-full w-full object-cover" src="/hero.mp4" autoPlay muted loop playsInline />
          ) : (
            <HeroRoom />
          )}
        </div>
        <Container className="relative z-10 pt-32 pb-24">
          <InView as="h1" className={HERO_TYPE} threshold={0}>
            <Line i={0}>Fluxifi designs,</Line>
            <Line i={1}>manages and supports</Line>
            <Line i={2}>the technology in</Line>
            <Line i={3}>your buildings.</Line>
          </InView>
          <InView threshold={0}>
            <p className="mt-10 text-[clamp(22px,2vw,32px)] font-bold tracking-[-0.02em]">
              <Line i={4}>
                <HeroTrades />
              </Line>
            </p>
            <p className={`mt-4 ${BODY_TYPE}`}>
              <Line i={5}>One team. One contract. One monthly fee.</Line>
            </p>
            <div className="mt-12">
              <OutlineButton label="Book a call" />
            </div>
          </InView>
        </Container>
      </section>

      {/* Three parts */}
      <section aria-labelledby="parts-heading" className="relative">
        <Container>
          <SectionRule index={1} />
          <InView as="h2" id="parts-heading" className={`pb-16 ${STATEMENT_TYPE}`}>
            <Line>There are three parts.</Line>
          </InView>
        </Container>
        <PinnedParts
          parts={[
            {
              numeral: "1",
              heading: "First, we design it.",
              body: (
                <p>
                  You get one drawing set covering all four trades, a 3D model of every room, and an equipment list with
                  part numbers. Contractors build from our drawings.
                </p>
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
            },
            {
              numeral: "3",
              heading: "Third, we support it.",
              body: (
                <>
                  <p>When something breaks, you call us. We find the cause and send the right vendor.</p>
                  <p>
                    {"We keep the record of what's installed in every room in "}
                    <Link href="/glass" className={inlineLink}>
                      Fluxifi Glass
                    </Link>
                    , our platform. You own it.
                  </p>
                </>
              ),
            },
          ]}
          shots={[
            {
              part: 0,
              caption: "3D model of a room",
              media: (
                <Shot slot="work-3" alt="3D model of a room" fallback={<PlanWire state="plan" label="Plan view of a meeting room with dimensions" />} />
              ),
            },
            {
              part: 0,
              caption: "Drawing set, all four trades",
              media: (
                <Shot
                  slot="work-1"
                  alt="Drawing set covering AV, network, cabling and security"
                  fallback={<PlanWire state="plan" label="Plan view of a meeting room with dimensions" />}
                />
              ),
            },
            {
              part: 1,
              caption: "Every device tested",
              media: (
                <Shot
                  slot="work-4"
                  alt="Build in progress on site"
                  fallback={<PlanWire state="check" label="Meeting room plan with every device checked" />}
                />
              ),
            },
            {
              part: 2,
              caption: "Installed room record in Fluxifi Glass",
              media: (
                <Shot
                  slot="work-6"
                  alt="Installed room record in Fluxifi Glass"
                  fallback={<PlanWire state="trace" label="Meeting room plan with one cable traced back to the rack" />}
                />
              ),
            },
          ]}
        />
      </section>

      {/* Why */}
      <section aria-labelledby="why-heading" className="relative">
        <Container>
          <SectionRule index={2} name="Why" id="why-heading" />
        </Container>
        <PinnedStatements
          steps={[
            <p key="a" className={STATEMENT_TYPE}>
              Today you hire four vendors. Each one draws its own piece. Nobody checks that the pieces fit.
            </p>,
            <p key="b" className={STATEMENT_TYPE}>
              So the problems show up on site, where they cost the most.
            </p>,
            <p key="c" className={STATEMENT_TYPE}>
              We put all four on one drawing, under one contract.
            </p>,
            <p key="d" className={HERO_TYPE}>
              {"That's the whole idea."}
            </p>,
          ]}
        />
      </section>

      {/* What we don't do */}
      <section aria-labelledby="dont-heading" className="relative pb-40">
        <Container>
          <SectionRule index={3} name={"What we don't do"} id="dont-heading" />
          <InView>
            <p className={STATEMENT_TYPE}>
              <Line i={0}>{"We don't sell equipment."}</Line>
              <Line i={1}>{"We don't take commissions."}</Line>
              <Line i={2}>{"We don't install."}</Line>
            </p>
            <p className={`mt-16 ${BODY_TYPE}`}>
              <Line i={3}>{"We work for you. That's why we can tell you when a vendor is wrong."}</Line>
            </p>
          </InView>
        </Container>
      </section>

      {/* Proof */}
      <section aria-labelledby="proof-heading" className="relative pb-40">
        <Container>
          <SectionRule index={4} name="Proof" id="proof-heading" />
          <InView className="max-w-[1100px]">
            <p className={STATEMENT_TYPE}>
              <Line>
                One client has 80 offices and 400 rooms. We run all 15 to 20 of their projects a year under one
                contract.
              </Line>
            </p>
          </InView>
          <InView as="dl" className="relative mt-24 grid md:grid-cols-3">
            <span aria-hidden="true" className="draw-x absolute top-0 left-0 h-px w-full bg-[#2A2A2A]" />
            <span aria-hidden="true" className="draw-x absolute bottom-0 left-0 h-px w-full bg-[#2A2A2A]" />
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className={`flex flex-col-reverse py-12 md:px-10 md:first:pl-0 ${
                  i > 0 ? "border-t border-[#2A2A2A] md:border-t-0 md:border-l" : ""
                }`}
              >
                <dt className={`mt-4 text-sm ${GREY}`}>{s.label}</dt>
                <dd className="text-[clamp(72px,8vw,144px)] font-extrabold leading-[0.9] tracking-[-0.045em] tabular-nums">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </InView>
          <p className={`mt-16 ${BODY_TYPE}`}>15 years doing this, as an integrator, a manufacturer and a consultant.</p>
        </Container>
      </section>

      {/* Who it's for */}
      <StatementScreen index={5} name={"Who it's for"} id="who-we-work-with">
        <p className={STATEMENT_TYPE}>
          <Line>Companies with many locations. And the architects and general contractors who build for them.</Line>
        </p>
      </StatementScreen>

      {/* Price */}
      <StatementScreen index={6} name="Price">
        <p className={STATEMENT_TYPE}>
          <Line i={0}>Programs start at $19,000 a month.</Line>
          <Line i={1}>A 30-day audit is $9,000.</Line>
        </p>
      </StatementScreen>

      {/* Final call */}
      <section aria-labelledby="cta-heading" className="relative flex min-h-[100svh] flex-col">
        <Container>
          <SectionRule index={7} />
        </Container>
        <Container className="flex flex-1 items-center pb-32">
          <InView>
            <h2 id="cta-heading" className={HERO_TYPE}>
              <Line>Send us one floor plan.</Line>
            </h2>
            <span aria-hidden="true" className="draw-x mt-8 block h-px w-full max-w-[720px] bg-[#F4A023]" />
            <p className={`mt-8 ${BODY_TYPE}`}>
              <Line i={1}>{"We'll model the room and show you what we'd change."}</Line>
            </p>
            <div className="mt-12">
              <OutlineButton label="Book a call" />
            </div>
          </InView>
        </Container>
      </section>
    </div>
  )
}
