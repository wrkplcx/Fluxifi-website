import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "We Own Your Technology Projects. End to End. | Fluxifi",
  description: "Fluxifi is the owner's rep for technology in the built environment. One point of accountability from concept through Day 2.",
  keywords: "owner's rep, built environment technology, multi-site technology, technology coordination, vendor coordination, project management",
  openGraph: {
    title: "We Own Your Technology Projects. End to End. | Fluxifi",
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
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0A0A0A] text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
