import type { ReactNode } from "react"
import type { Metadata } from "next"
import { ImageSlot } from "@/components/site/image-slot"
import { Body, Container, CtaButton, PlainHeading, PlainSection } from "@/components/site/plain"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi Glass: The As-Built Record of Every Room You Own" },
  description:
    "Fluxifi Glass records every device and connection in every room, exactly as built. Runs in your own account. You own the data.",
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border border-white/15 bg-[#11151B]">
      <div className="flex h-9 items-center gap-2 border-b border-white/15 px-4" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  )
}

function GlassPart({
  numeral,
  heading,
  children,
  media,
  reverse = false,
}: {
  numeral: string
  heading: string
  children: ReactNode
  media: ReactNode
  reverse?: boolean
}) {
  return (
    <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}>
        <div className="flex gap-6 md:gap-10">
          <span
            aria-hidden="true"
            className="w-16 shrink-0 text-[96px] font-extrabold leading-[0.8] tracking-[-0.04em] text-[#F4A023] md:w-28 md:text-[160px]"
          >
            {numeral}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[40px]">{heading}</h3>
            <div className="mt-6 max-w-[600px] space-y-4 text-xl leading-normal text-[#8A94A3]">{children}</div>
          </div>
        </div>
      </div>
      <div className={`lg:col-span-7 ${reverse ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>{media}</div>
    </div>
  )
}

export default function GlassPage() {
  return (
    <div className="bg-[#0C0F13] text-[#F3F5F7]">
      <section className="overflow-hidden pt-36 md:pt-44">
        <Container>
          <PlainHeading as="h1">Fluxifi Glass</PlainHeading>
          <p className="mt-8 max-w-4xl text-[32px] font-bold leading-[1.05] tracking-[-0.025em] text-balance md:text-[48px]">
            Every room you own, exactly as it was built.
          </p>
          <p className="mt-6 max-w-[600px] text-xl leading-normal text-[#8A94A3]">
            When a room goes down, you open it in Glass before anyone walks over to look.
          </p>
          <div className="mt-10">
            <CtaButton label="Request a demo" />
          </div>
          <div className="mt-20">
            <BrowserFrame>
              <ImageSlot
                slot="glass-hero"
                alt="Fluxifi Glass 3D view of a conference room with equipment labeled"
                className="aspect-[16/9]"
                frame="none"
                priority
              />
            </BrowserFrame>
          </div>
        </Container>
      </section>

      <PlainSection>
        <PlainHeading>Glass does three things.</PlainHeading>
        <GlassPart
          numeral="1"
          heading="First, it holds your standards."
          media={
            <BrowserFrame>
              <ImageSlot slot="glass-1" alt="Room standards library in Fluxifi Glass" className="aspect-[16/10]" frame="none" />
            </BrowserFrame>
          }
        >
          <p>One approved design for each type of room. Change it once and every new project follows it.</p>
        </GlassPart>
        <GlassPart
          numeral="2"
          heading="Second, it records what was built."
          reverse
          media={
            <BrowserFrame>
              <ImageSlot
                slot="glass-2"
                alt="As-built room record with devices and connections"
                className="aspect-[16/10]"
                frame="none"
              />
            </BrowserFrame>
          }
        >
          <p>
            Every device and every connection in every room, with photos, serial numbers and network details. Organized
            by location, floor and room.
          </p>
        </GlassPart>
        <GlassPart
          numeral="3"
          heading="Third, it shows you where to look."
          media={
            <BrowserFrame>
              <ImageSlot slot="glass-3" alt="Room view showing what changed last" className="aspect-[16/10]" frame="none" />
            </BrowserFrame>
          }
        >
          <p>
            {
              "A room fails. You open it in Glass. You see what's in it, how it's connected, and what changed last. You know where the problem is before you send anyone."
            }
          </p>
        </GlassPart>
      </PlainSection>

      <PlainSection className="border-t border-white/10">
        <PlainHeading>Why</PlainHeading>
        <Body>
          <p>When a project ends, the knowledge of what was built leaves with the people who built it.</p>
          <p>{"Six months later a room fails, and nobody knows what's in the ceiling."}</p>
          <p>Glass keeps that knowledge.</p>
        </Body>
        <p className="mt-16 text-[56px] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[96px] lg:text-[128px]">
          {"That's the whole idea."}
        </p>
      </PlainSection>

      <PlainSection className="border-t border-white/10">
        <PlainHeading>{"What it isn't"}</PlainHeading>
        <Body>
          <p>{"It isn't a rendering tool. It isn't one more dashboard."}</p>
          <p>{"It's the record your team opens when a room is down."}</p>
        </Body>
      </PlainSection>

      <PlainSection tone="sheet">
        <PlainHeading>Where it runs</PlainHeading>
        <Body tone="sheet">
          <p>In your account, on your infrastructure. You own the data.</p>
          <p>{"We have access while we're working with you. Not after."}</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>{"Who it's for"}</PlainHeading>
        <Body>
          <p>Internal AV and IT teams responsible for many rooms.</p>
        </Body>
      </PlainSection>

      <PlainSection className="border-t border-white/10">
        <PlainHeading>Status</PlainHeading>
        <Body>
          <p>In early access with Fluxifi clients.</p>
        </Body>
        <div className="mt-12">
          <CtaButton label="Request a demo" />
        </div>
      </PlainSection>
    </div>
  )
}
