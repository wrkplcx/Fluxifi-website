import Link from "next/link"
import Image from "next/image"
import { BUYERS, SERVICES } from "@/lib/content"
import { Container, PageGrid } from "@/components/austere/ui"

const linkClass =
  "link-draw text-sm text-[#8C8C8C] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
const headingClass = "mb-6 text-sm text-white"

export function Footer() {
  return (
    <footer className="relative bg-black">
      <PageGrid />
      <Container className="relative">
        <div className="h-px w-full bg-[#2A2A2A]" aria-hidden="true" />
        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <div className="lg:pr-10">
            <Link href="/" className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src="/images/fluxifi-logo.png" alt="Fluxifi" width={200} height={54} className="h-10 w-auto brightness-0 invert" />
            </Link>
          </div>
          <div className="lg:pl-10">
            <h2 className={headingClass}>Company</h2>
            <nav aria-label="Company" className="flex flex-col items-start gap-3">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/glass" className={linkClass}>Glass</Link>
              <Link href="/about" className={linkClass}>About</Link>
              <Link href="/faq" className={linkClass}>FAQ</Link>
            </nav>
          </div>
          <div className="lg:pl-10">
            <h2 className={headingClass}>Services</h2>
            <nav aria-label="Services" className="flex flex-col items-start gap-3">
              <Link href="/services" className={linkClass}>Services</Link>
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="lg:pl-10">
            <h2 className={headingClass}>Who We Work With</h2>
            <nav aria-label="Who we work with" className="flex flex-col items-start gap-3">
              {BUYERS.map((b) => (
                <Link key={b.slug} href={`/for/${b.slug}`} className={linkClass}>
                  {b.cardName.replace(/\.$/, "")}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="h-px w-full bg-[#1C1C1C]" aria-hidden="true" />
        <p className="py-8 text-sm text-[#8C8C8C]">
          {"\u00A9"} {new Date().getFullYear()} Fluxifi. Fort Lauderdale, Florida.
        </p>
      </Container>
    </footer>
  )
}
