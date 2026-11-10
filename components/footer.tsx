import Link from "next/link"
import Image from "next/image"
import { BUYERS, SERVICES } from "@/lib/content"

const linkClass = "text-sm text-white/60 hover:text-white transition-colors"

export function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-4 md:px-6 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 md:gap-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center">
              <Image src="/images/fluxifi-logo.png" alt="Fluxifi" width={200} height={54} className="h-14 w-auto" />
            </Link>
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              Fluxifi
              <br />
              Fort Lauderdale, Florida
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            <div>
              <h2 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Company</h2>
              <nav aria-label="Company" className="flex flex-col gap-3">
                <Link href="/" className={linkClass}>Home</Link>
                <Link href="/glass" className={linkClass}>Glass</Link>
                <Link href="/about" className={linkClass}>About</Link>
                <Link href="/faq" className={linkClass}>FAQ</Link>
              </nav>
            </div>
            <div>
              <h2 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Services</h2>
              <nav aria-label="Services" className="flex flex-col gap-3">
                <Link href="/services" className={linkClass}>Services</Link>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h2 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Who We Work With</h2>
              <nav aria-label="Who we work with" className="flex flex-col gap-3">
                {BUYERS.map((b) => (
                  <Link key={b.slug} href={`/for/${b.slug}`} className={linkClass}>
                    {b.cardName.replace(/\.$/, "")}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm">
            {"\u00A9"} {new Date().getFullYear()} Fluxifi. Fort Lauderdale, Florida.
          </p>
        </div>
      </div>
    </footer>
  )
}
