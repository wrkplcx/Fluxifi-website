"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { CALENDLY_URL, NAV_ITEMS } from "@/lib/content"

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-500 ease-out ${
          scrolled || mobileMenuOpen ? "border-b border-[#1C1C1C] bg-black" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
          <Link href="/" className={`flex items-center ${focus}`}>
            <Image
              src="/images/fluxifi-logo.png"
              alt="Fluxifi"
              width={280}
              height={76}
              className="h-11 w-auto brightness-0 invert"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-draw text-[13px] text-[#8C8C8C] transition-colors duration-300 hover:text-white ${focus}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-white px-4 py-2 text-[13px] text-white transition-colors duration-500 ease-out hover:bg-white hover:text-black ${focus}`}
            >
              Book a call
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={`p-2 text-white md:hidden ${focus}`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth={1} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div id="mobile-nav" className="fixed inset-0 z-40 bg-black px-6 pt-24 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`border-b border-[#1C1C1C] py-4 text-lg text-[#8C8C8C] hover:text-white ${focus}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-8 border border-white px-6 py-4 text-center text-white hover:bg-white hover:text-black ${focus}`}
            >
              Book a call
            </a>
          </nav>
        </div>
      ) : null}
    </>
  )
}
