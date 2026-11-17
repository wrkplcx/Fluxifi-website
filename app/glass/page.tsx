import type { Metadata } from "next"
import { InView } from "@/components/austere/motion"
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
import { PinnedParts, PinnedStatements } from "@/components/austere/pinned"
import { Shot, publicFileExists } from "@/components/austere/shot"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi Glass: The As-Built Record of Every Room You Own" },
  description:
    "Fluxifi Glass records every device and connection in every room, exactly as built. Runs in your own account. You own the data.",
}

export default function GlassPage() {
  const glassVideo = publicFileExists("glass.mp4")

  return (
    <div className="relative bg-black text-white">
      <PageGrid />

      <section className="relative pt-40 pb-32 md:pt-48">
        <Container>
          <InView as="h1" className={HERO_TYPE} threshold={0}>
            <Line>Fluxifi Glass</Line>
          </InView>
          <InView threshold={0}>
            <p className={`mt-6 ${STATEMENT_TYPE} ${GREY}`}>
              <Line i={1}>Every room you own,</Line>
              <Line i={2}>exactly as it was built.</Line>
            </p>
            <p className={`mt-10 ${BODY_TYPE}`}>
              <Line i={3}>When a room goes down, you open it in Glass before anyone walks over to look.</Line>
            </p>
            <div className="mt-12">
              <OutlineButton label="Request a demo" />
            </div>
          </InView>
          <div className="mt-24">
            {glassVideo ? (
              <div className="aspect-[16/9] w-full overflow-hidden border border-[#2A2A2A] bg-black">
                <video className="h-full w-full object-cover" src="/glass.mp4" autoPlay muted loop playsInline />
              </div>
            ) : (
              <Shot
                slot="glass-hero"
                alt="Fluxifi Glass 3D view of a conference room with equipment labeled"
                aspect="aspect-[16/9]"
                priority
              />
            )}
          </div>
        </Container>
      </section>

      <section aria-labelledby="glass-parts-heading" className="relative">
        <Container>
          <SectionRule index={1} />
          <InView as="h2" id="glass-parts-heading" className={`pb-16 ${STATEMENT_TYPE}`}>
            <Line>Glass does three things.</Line>
          </InView>
        </Container>
        <PinnedParts
          parts={[
            {
              numeral: "1",
              heading: "First, it holds your standards.",
              body: <p>One approved design for each type of room. Change it once and every new project follows it.</p>,
            },
            {
              numeral: "2",
              heading: "Second, it records what was built.",
              body: (
                <p>
                  Every device and every connection in every room, with photos, serial numbers and network details.
                  Organized by location, floor and room.
                </p>
              ),
            },
            {
              numeral: "3",
              heading: "Third, it shows you where to look.",
              body: (
                <p>
                  {
                    "A room fails. You open it in Glass. You see what's in it, how it's connected, and what changed last. You know where the problem is before you send anyone."
                  }
                </p>
              ),
            },
          ]}
          shots={[
            {
              part: 0,
              caption: "Room standards library",
              media: <Shot slot="glass-1" alt="Room standards library in Fluxifi Glass" />,
            },
            {
              part: 1,
              caption: "As-built room record",
              media: <Shot slot="glass-2" alt="As-built room record with devices and connections" />,
            },
            {
              part: 2,
              caption: "What changed last",
              media: <Shot slot="glass-3" alt="Room view showing what changed last" />,
            },
          ]}
        />
      </section>

      <section aria-labelledby="glass-why-heading" className="relative">
        <Container>
          <SectionRule index={2} name="Why" id="glass-why-heading" />
        </Container>
        <PinnedStatements
          steps={[
            <p key="a" className={STATEMENT_TYPE}>
              When a project ends, the knowledge of what was built leaves with the people who built it.
            </p>,
            <p key="b" className={STATEMENT_TYPE}>
              {"Six months later a room fails, and nobody knows what's in the ceiling."}
            </p>,
            <p key="c" className={STATEMENT_TYPE}>
              Glass keeps that knowledge.
            </p>,
            <p key="d" className={HERO_TYPE}>
              {"That's the whole idea."}
            </p>,
          ]}
        />
      </section>

      <StatementScreen index={3} name={"What it isn't"}>
        <p className={STATEMENT_TYPE}>
          <Line i={0}>{"It isn't a rendering tool. It isn't one more dashboard."}</Line>
        </p>
        <p className={`mt-8 ${STATEMENT_TYPE} ${GREY}`}>
          <Line i={1}>{"It's the record your team opens when a room is down."}</Line>
        </p>
      </StatementScreen>

      <StatementScreen index={4} name="Where it runs">
        <p className={STATEMENT_TYPE}>
          <Line i={0}>In your account, on your infrastructure. You own the data.</Line>
        </p>
        <p className={`mt-8 ${STATEMENT_TYPE} ${GREY}`}>
          <Line i={1}>{"We have access while we're working with you. Not after."}</Line>
        </p>
      </StatementScreen>

      <StatementScreen index={5} name={"Who it's for"}>
        <p className={STATEMENT_TYPE}>
          <Line>Internal AV and IT teams responsible for many rooms.</Line>
        </p>
      </StatementScreen>

      <section aria-labelledby="status-heading" className="relative pb-40">
        <Container>
          <SectionRule index={6} name="Status" id="status-heading" />
          <InView>
            <p className={STATEMENT_TYPE}>
              <Line>In early access with Fluxifi clients.</Line>
            </p>
            <div className="mt-12">
              <OutlineButton label="Request a demo" />
            </div>
          </InView>
        </Container>
      </section>
    </div>
  )
}
