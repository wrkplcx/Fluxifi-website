"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-4 md:px-6 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/images/fluxifi-logo.png" 
                alt="Fluxifi" 
                width={200} 
                height={54} 
                className="h-14 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              Ownership on tap. One point of accountability from concept through Day 2 and beyond.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16">
            <div>
              <h4 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Company</h4>
              <nav className="flex flex-col gap-3">
                <Link href="#services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link>
                <Link href="#industries" className="text-sm text-white/60 hover:text-white transition-colors">Industries</Link>
                <Link href="#results" className="text-sm text-white/60 hover:text-white transition-colors">Results</Link>
              </nav>
            </div>
            
            <div>
              <h4 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Engage</h4>
              <nav className="flex flex-col gap-3">
                <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
                <a href="https://calendly.com/fluxifi/fluxifi-intro" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            
            <div>
              <h4 className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Connect</h4>
              <nav className="flex flex-col gap-3">
                <a href="mailto:hello@fluxifi.co" className="text-sm text-white/60 hover:text-white transition-colors">Email</a>
                <a href="https://www.linkedin.com/in/mark-templeton" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
              </nav>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ willChange: 'opacity' }}
          className="mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Fluxifi. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/30 text-sm">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
