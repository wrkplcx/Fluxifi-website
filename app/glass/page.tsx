import type { Metadata } from "next"
import { ImageSlot } from "@/components/site/image-slot"
import { Body, CtaButton, PlainHeading, PlainSection, Step } from "@/components/site/plain"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi Glass: The As-Built Record of Every Room You Own" },
  description:
    "Fluxifi Glass records every device and connection in every room, exactly as built. Runs in your own account. You own the data.",
}

export default function GlassPage() {
  return (
    <>
      <PlainSection first>
        <PlainHeading as="h1">Fluxifi Glass</PlainHeading>
        <p className="mt-10 max-w-4xl text-3xl font-medium leading-tight text-white md:text-5xl text-balance">
          Every room you own, exactly as it was built.
        </p>
        <p className="mt-6 max-w-[640px] text-xl leading-relaxed text-white/70 md:text-2xl">
          When a room goes down, you open it in Glass before anyone walks over to look.
        </p>
        <div className="mt-12">
          <CtaButton label="Request a demo" />
        </div>
        <ImageSlot
          slot="glass-hero"
          alt="Fluxifi Glass 3D view of a conference room with equipment labeled"
          className="mt-24 aspect-[16/9]"
          priority
        />
      </PlainSection>

      <PlainSection>
        <PlainHeading>Glass does three things.</PlainHeading>

        <Step
          ordinal="First,"
          title="it holds your standards."
          images={<ImageSlot slot="glass-1" alt="Room standards library in Fluxifi Glass" className="aspect-[16/9]" />}
        >
          <p>One approved design for each type of room. Change it once and every new project follows it.</p>
        </Step>

        <Step
          ordinal="Second,"
          title="it records what was built."
          images={<ImageSlot slot="glass-2" alt="As-built room record with devices and connections" className="aspect-[16/9]" />}
        >
          <p>
            Every device and every connection in every room, with photos, serial numbers and network details.
            Organized by location, floor and room.
          </p>
        </Step>

        <Step
          ordinal="Third,"
          title="it shows you where to look."
          images={<ImageSlot slot="glass-3" alt="Room view showing what changed last" className="aspect-[16/9]" />}
        >
          <p>
            {
              "A room fails. You open it in Glass. You see what's in it, how it's connected, and what changed last. You know where the problem is before you send anyone."
            }
          </p>
        </Step>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Why</PlainHeading>
        <Body>
          <p>When a project ends, the knowledge of what was built leaves with the people who built it.</p>
          <p>{"Six months later a room fails, and nobody knows what's in the ceiling."}</p>
          <p>{"Glass keeps that knowledge. That's the whole idea."}</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>{"What it isn't"}</PlainHeading>
        <Body>
          <p>{"It isn't a rendering tool. It isn't one more dashboard."}</p>
          <p>{"It's the record your team opens when a room is down."}</p>
        </Body>
      </PlainSection>

      <PlainSection>
        <PlainHeading>Where it runs</PlainHeading>
        <Body>
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

      <PlainSection>
        <PlainHeading>Status</PlainHeading>
        <Body>
          <p>In early access with Fluxifi clients.</p>
        </Body>
        <div className="mt-12">
          <CtaButton label="Request a demo" />
        </div>
      </PlainSection>
    </>
  )
}
