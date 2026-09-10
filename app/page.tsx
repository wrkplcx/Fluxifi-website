import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TransitionLine } from "@/components/transition-line"
import { Problem } from "@/components/problem"
import { Solution } from "@/components/solution"
import { TwoPaths } from "@/components/two-paths"
import { CoordinationSystem } from "@/components/coordination-system"
import { Services } from "@/components/services"
import { Industries } from "@/components/industries"
import { Results } from "@/components/results"
import { ROICalculator } from "@/components/roi-calculator"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TransitionLine />
        <Problem />
        <Solution />
        <TwoPaths />
        <CoordinationSystem />
        <Services />
        <Industries />
        <Results />
        <ROICalculator />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
