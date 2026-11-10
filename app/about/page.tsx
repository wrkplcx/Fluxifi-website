import type { Metadata } from "next"
import { ImageSlot } from "@/components/site/image-slot"
import { BookButton, Heading, Section } from "@/components/site/primitives"

export const metadata: Metadata = {
  title: { absolute: "About Fluxifi: 15 Years in AV and IT" },
  description: "Founded by a 15-year AV and IT veteran who has worked as integrator, manufacturer and consultant.",
}

export default function AboutPage() {
  return (
    <Section className="pt-36 md:pt-44">
      <div className="max-w-3xl">
        <Heading as="h1">Built by someone who has sat in every seat.</Heading>
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
        <ImageSlot slot="founder-photo" alt="Mark, founder of Fluxifi" className="aspect-[4/5]" priority />
        <div className="flex flex-col gap-5 text-lg text-white/60 leading-relaxed">
          <p>
            Mark, Fluxifi&apos;s founder, has spent 15 years in AV and IT. He has worked for the integrator who
            installs it, the manufacturer who makes it, and the consultant who designs it.
          </p>
          <p>
            He saw the same failure from all three sides. Good people, each doing their part, and nobody responsible
            for the whole.
          </p>
          <p>
            Fluxifi is that responsible party. We work for you, not for a vendor. We sell no equipment and take no
            commissions.
          </p>
          <dl className="mt-4 flex flex-col gap-3 text-base">
            <div>
              <dt className="inline text-white font-medium">The team: </dt>
              <dd className="inline">Mark leads every engagement, backed by a design and drawing team.</dd>
            </div>
            <div>
              <dt className="inline text-white font-medium">Based in: </dt>
              <dd className="inline">Fort Lauderdale, Florida.</dd>
            </div>
            <div>
              <dt className="inline text-white font-medium">Insured: </dt>
              <dd className="inline">$5M professional liability.</dd>
            </div>
          </dl>
          <div className="mt-6">
            <BookButton />
          </div>
        </div>
      </div>
    </Section>
  )
}
