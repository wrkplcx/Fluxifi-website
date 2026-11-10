import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { ImageSlot } from "@/components/site/image-slot"
import {
  HowToStart,
  OurWork,
  Problem,
  ProofBar,
  Results,
  WhatWeCover,
  WhatWeDo,
  WhoWeWorkWith,
} from "@/components/home/sections"

export const metadata: Metadata = {
  title: { absolute: "Fluxifi: AV and IT Design and Project Management" },
  description:
    "Fluxifi designs and manages the AV, IT and cabling in your buildings. One team, responsible from first drawing to working room.",
}

export default function Home() {
  return (
    <>
      <Hero
        image={
          <ImageSlot
            slot="hero-image"
            alt="3D model of a conference room with displays, camera and speakers"
            className="aspect-[4/3]"
            priority
          />
        }
      />
      <ProofBar />
      <Problem />
      <WhatWeDo />
      <WhatWeCover />
      <WhoWeWorkWith />
      <OurWork />
      <Results />
      <HowToStart />
    </>
  )
}
