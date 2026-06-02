"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
  ]

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ willChange: 'transform, opacity' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/images/fluxifi-logo.png" 
              alt="Fluxifi" 
              width={280} 
              height={76} 
              className="h-16 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="https://calendly.com/fluxifi/fluxifi-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#F4A023] transition-all duration-200"
            >
              Get started
            </a>
          </nav>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-4 text-lg text-white/70 hover:text-white transition-colors border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <a 
                href="https://calendly.com/fluxifi/fluxifi-intro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[#F4A023] text-black text-center font-medium px-6 py-4 rounded-lg"
              >
                Get started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
