import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Archivo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const archivo = Archivo({
  subsets: ["latin"],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: "Fluxifi: AV and IT Design and Project Management",
  description: "Fluxifi designs and manages the AV, IT and cabling in your buildings. One team, responsible from first drawing to working room.",
  openGraph: {
    siteName: 'Fluxifi',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
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
      <body className={`${archivo.variable} font-sans antialiased bg-[#0C0F13] text-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
