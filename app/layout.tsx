import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "We Own Your Technology Program. End to End. | Fluxifi",
  description: "Fluxifi is the owner's rep for technology in the built environment. One point of accountability from concept through Day 2.",
  keywords: "owner's rep, built environment technology, multi-site technology, technology coordination, vendor coordination, project management",
  openGraph: {
    title: "We Own Your Technology Program. End to End. | Fluxifi",
    description: "Fluxifi is the owner's rep for technology in the built environment. One point of accountability from concept through Day 2.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0A0A0A]">
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        {/* Apollo tracking script */}
        <Script
          id="apollo-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"68b0a17a43b2e1001d94bb3c"})},document.head.appendChild(o)}initApollo();`
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0A0A0A] text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
