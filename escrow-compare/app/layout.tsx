import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EscrowCompare.io - Compare 30+ Trusted Escrow Services',
  description: 'Find the best escrow service for your needs. Compare fees, features, and trust scores from 30+ verified escrow providers.',
  keywords: 'escrow, escrow services, payment protection, secure transactions, escrow comparison',
  openGraph: {
    title: 'EscrowCompare.io - Compare 30+ Trusted Escrow Services',
    description: 'Find the best escrow service for your needs',
    url: 'https://escrowcompare.io',
    siteName: 'EscrowCompare.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EscrowCompare.io',
    description: 'Compare 30+ Trusted Escrow Services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}