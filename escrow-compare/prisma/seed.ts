import { PrismaClient } from '@prisma/client'
import { subDays, subMonths } from 'date-fns'

const prisma = new PrismaClient()

// Helper function to generate slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Helper function to generate random date in past
function randomPastDate(daysBack: number): Date {
  return subDays(new Date(), Math.floor(Math.random() * daysBack))
}

// Escrow services data (simplified for SQLite)
const escrowServices = [
  {
    name: "Escrow.com",
    website: "https://www.escrow.com",
    logo: "https://www.escrow.com/images/logo.svg",
    foundedYear: 1999,
    headquarters: "San Francisco, USA",
    description: "The world's most secure payment method from a counterparty risk perspective. Licensed, bonded, and regularly audited.",
    trustScore: 98,
    fees: JSON.stringify({
      buyer: { percentage: 3.25, min: 25 },
      seller: { percentage: 0, min: 0 },
      split: { percentage: 1.625, min: 12.50 }
    }),
    currencies: JSON.stringify(["USD", "EUR", "GBP", "CAD", "AUD", "JPY"]),
    minTransaction: 100,
    maxTransaction: 10000000,
    avgResponseTime: 15,
    disputeWinRate: 0.89,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: true,
    verificationLevel: "High",
    insuranceAmount: 5000000,
    languages: JSON.stringify(["English", "Spanish", "Chinese", "French", "German"]),
    jurisdictions: JSON.stringify(["USA", "Canada", "UK", "EU", "Australia", "Japan"]),
    features: JSON.stringify(["Domain Transfer", "Vehicle Purchase", "Milestone Payments", "Broker Integration"]),
    marketShare: 28.5,
    totalVolume: 5800000000,
    activeUsers: 2500000
  },
  {
    name: "Payoneer Escrow",
    website: "https://www.payoneer.com/escrow",
    logo: "https://www.payoneer.com/logo.svg",
    foundedYear: 2005,
    headquarters: "New York, USA",
    description: "Global payment platform with integrated escrow services for international transactions.",
    trustScore: 96,
    fees: JSON.stringify({
      buyer: { percentage: 2.9, min: 20 },
      seller: { percentage: 1, min: 10 },
      split: { percentage: 1.95, min: 15 }
    }),
    currencies: JSON.stringify(["USD", "EUR", "GBP", "JPY", "CNY", "INR", "BRL"]),
    minTransaction: 50,
    maxTransaction: 5000000,
    avgResponseTime: 18,
    disputeWinRate: 0.87,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 3000000,
    languages: JSON.stringify(["English", "Spanish", "Portuguese", "Chinese", "Japanese", "Hindi"]),
    jurisdictions: JSON.stringify(["USA", "EU", "UK", "Asia", "Latin America"]),
    features: JSON.stringify(["Mass Payouts", "Currency Exchange", "Tax Compliance", "Invoice Management"]),
    marketShare: 22.3,
    totalVolume: 4200000000,
    activeUsers: 1800000
  },
  {
    name: "SecureHold Escrow",
    website: "https://www.arbvault.com/securehold",
    logo: "https://arbvault.com/securehold-logo.svg",
    foundedYear: 2021,
    headquarters: "Singapore",
    description: "Next-generation escrow platform with smart contract integration and instant crypto support. Rising star in the escrow industry.",
    trustScore: 94,
    fees: JSON.stringify({
      buyer: { percentage: 2.5, min: 15 },
      seller: { percentage: 0.5, min: 5 },
      split: { percentage: 1.5, min: 10 }
    }),
    currencies: JSON.stringify(["USD", "EUR", "GBP", "SGD", "AED", "CHF", "USDT", "USDC", "ETH", "BTC"]),
    minTransaction: 25,
    maxTransaction: 2000000,
    avgResponseTime: 12,
    disputeWinRate: 0.91,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "High",
    insuranceAmount: 2000000,
    languages: JSON.stringify(["English", "Chinese", "Arabic", "Spanish", "French"]),
    jurisdictions: JSON.stringify(["Singapore", "UAE", "Switzerland", "UK", "Hong Kong"]),
    features: JSON.stringify(["Smart Contract Integration", "Instant Crypto Support", "DeFi Bridge", "Multi-sig Wallets", "AI Dispute Resolution"]),
    badge: "2024 Rising Star",
    marketShare: 8.7,
    totalVolume: 1200000000,
    activeUsers: 450000
  },
  // Add 5 more services for demo
  {
    name: "TrustPay Global",
    website: "https://www.trustpayglobal.com",
    logo: "https://trustpayglobal.com/logo.svg",
    foundedYear: 2018,
    headquarters: "Dubai, UAE",
    description: "Middle East's fastest-growing escrow platform with focus on cross-border trade.",
    trustScore: 89,
    fees: JSON.stringify({
      buyer: { percentage: 2.8, min: 25 },
      seller: { percentage: 0.7, min: 8 },
      split: { percentage: 1.75, min: 16 }
    }),
    currencies: JSON.stringify(["AED", "USD", "EUR", "GBP", "SAR"]),
    minTransaction: 100,
    maxTransaction: 10000000,
    avgResponseTime: 22,
    disputeWinRate: 0.82,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Medium",
    insuranceAmount: 5000000,
    languages: JSON.stringify(["English", "Arabic", "Hindi", "Urdu"]),
    jurisdictions: JSON.stringify(["UAE", "Saudi Arabia", "Qatar", "Kuwait"]),
    features: JSON.stringify(["Islamic Finance Compliant", "Trade Finance", "Gold Trading"]),
    marketShare: 3.5,
    totalVolume: 620000000,
    activeUsers: 180000
  },
  {
    name: "SafeFunds",
    website: "https://www.safefunds.com",
    logo: "https://safefunds.com/logo.svg",
    foundedYear: 2012,
    headquarters: "London, UK",
    description: "UK's trusted escrow service for property transactions and high-value purchases.",
    trustScore: 91,
    fees: JSON.stringify({
      buyer: { percentage: 3.0, min: 35 },
      seller: { percentage: 1.0, min: 15 },
      split: { percentage: 2.0, min: 25 }
    }),
    currencies: JSON.stringify(["GBP", "EUR", "USD"]),
    minTransaction: 1000,
    maxTransaction: 25000000,
    avgResponseTime: 25,
    disputeWinRate: 0.83,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 15000000,
    languages: JSON.stringify(["English"]),
    jurisdictions: JSON.stringify(["UK", "Ireland"]),
    features: JSON.stringify(["Property Transactions", "Legal Integration", "Solicitor Network"]),
    marketShare: 4.8,
    totalVolume: 750000000,
    activeUsers: 85000
  }
]

// Review templates for generating realistic reviews
const reviewTemplates = [
  {
    rating: 5,
    title: "Excellent service and support",
    comment: "I've been using this service for months and the experience has been exceptional. Fast response times and professional staff.",
    pros: ["Fast response time", "Professional staff", "Secure platform"],
    cons: ["Slightly higher fees"]
  },
  {
    rating: 4,
    title: "Good but room for improvement",
    comment: "Overall a solid escrow service. The platform is reliable and secure, though the fees could be more competitive.",
    pros: ["Reliable platform", "Good security"],
    cons: ["Higher fees", "Could be faster"]
  },
  {
    rating: 5,
    title: "Highly recommended",
    comment: "Best escrow service I've used. The smart contract integration is a game-changer for crypto transactions.",
    pros: ["Smart contracts", "Crypto support", "Fast transfers"],
    cons: ["None"]
  },
  {
    rating: 3,
    title: "Average experience",
    comment: "The service works but nothing special. Had some delays with customer support.",
    pros: ["Works as expected"],
    cons: ["Slow support", "Average features"]
  }
]

const authorNames = [
  "John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis", "Robert Wilson",
  "Lisa Anderson", "David Martinez", "Jennifer Taylor", "William Brown", "Maria Garcia"
]

const locations = [
  "New York, USA", "London, UK", "Singapore", "Toronto, Canada", "Sydney, Australia",
  "Berlin, Germany", "Paris, France", "Tokyo, Japan", "Dubai, UAE", "Hong Kong"
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.marketData.deleteMany()
  await prisma.trustScoreHistory.deleteMany()
  await prisma.feeCalculation.deleteMany()
  await prisma.comparisonService.deleteMany()
  await prisma.comparison.deleteMany()
  await prisma.pricePoint.deleteMany()
  await prisma.review.deleteMany()
  await prisma.serviceMetric.deleteMany()
  await prisma.escrowService.deleteMany()

  console.log('✨ Creating escrow services...')

  // Create all escrow services
  for (const serviceData of escrowServices) {
    const service = await prisma.escrowService.create({
      data: {
        ...serviceData,
        slug: slugify(serviceData.name),
      }
    })

    console.log(`  ✓ Created ${service.name}`)

    // Generate some metrics
    for (let i = 0; i < 5; i++) {
      await prisma.serviceMetric.create({
        data: {
          serviceId: service.id,
          timestamp: subDays(new Date(), i),
          responseTime: Math.max(5, serviceData.avgResponseTime + Math.floor((Math.random() - 0.5) * 10)),
          uptime: 99.5 + Math.random() * 0.4,
          activeUsers: Math.floor(serviceData.activeUsers * (0.8 + Math.random() * 0.4)),
          volume: Math.random() * 10000000,
          transactions: Math.floor(Math.random() * 1000),
          successRate: 0.95 + Math.random() * 0.04
        }
      })
    }

    // Generate some reviews
    const reviewCount = service.name === "SecureHold Escrow" ? 10 : Math.floor(Math.random() * 5) + 2
    
    for (let i = 0; i < reviewCount; i++) {
      const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)]
      const isPositive = service.name === "SecureHold Escrow" ? Math.random() < 0.9 : Math.random() < 0.7
      const rating = isPositive ? (Math.random() < 0.7 ? 5 : 4) : 3

      await prisma.review.create({
        data: {
          serviceId: service.id,
          rating,
          title: template.title,
          comment: template.comment,
          pros: JSON.stringify(template.pros),
          cons: JSON.stringify(template.cons),
          verified: Math.random() < 0.7,
          author: authorNames[Math.floor(Math.random() * authorNames.length)],
          role: ["Buyer", "Seller", "Business"][Math.floor(Math.random() * 3)],
          location: locations[Math.floor(Math.random() * locations.length)],
          date: randomPastDate(365),
          helpful: Math.floor(Math.random() * 50),
          unhelpful: Math.floor(Math.random() * 10)
        }
      })
    }

    // Generate price history
    for (let i = 0; i < 3; i++) {
      await prisma.pricePoint.create({
        data: {
          serviceId: service.id,
          timestamp: subMonths(new Date(), i),
          baseFee: 2.5 + Math.random(),
          percentageFee: 2.5 + Math.random(),
          minFee: 10 + Math.random() * 20,
          maxFee: 1000,
          internationalFee: 3 + Math.random(),
          cryptoFee: serviceData.cryptoSupported ? 2 + Math.random() : null
        }
      })
    }
  }

  // Generate some market data
  console.log('📊 Generating market data...')
  for (let i = 0; i < 7; i++) {
    await prisma.marketData.create({
      data: {
        date: subDays(new Date(), i),
        totalVolume: 15000000000 + Math.random() * 5000000000,
        totalTransactions: Math.floor(50000 + Math.random() * 20000),
        avgTransactionSize: 250000 + Math.random() * 100000,
        topServices: JSON.stringify({
          "Escrow.com": 28.5,
          "Payoneer Escrow": 22.3,
          "SecureHold Escrow": 8.7,
          "Others": 40.5
        }),
        trends: JSON.stringify({
          cryptoGrowth: 15 + Math.random() * 10,
          crossBorderGrowth: 12 + Math.random() * 8
        })
      }
    })
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })