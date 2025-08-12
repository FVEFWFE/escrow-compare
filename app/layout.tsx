import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
})

export const metadata: Metadata = {
  title: "EscrowCompare.io - Compare 30+ Escrow Services Instantly",
  description:
    "Professional escrow service comparison platform. Compare fees, processing times, and features across 30+ verified escrow providers.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
