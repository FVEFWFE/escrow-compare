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

// Escrow services data
const escrowServices = [
  {
    name: "Escrow.com",
    website: "https://www.escrow.com",
    logo: "https://www.escrow.com/images/logo.svg",
    foundedYear: 1999,
    headquarters: "San Francisco, USA",
    description: "The world's most secure payment method from a counterparty risk perspective. Licensed, bonded, and regularly audited.",
    trustScore: 98,
    fees: {
      buyer: { percentage: 3.25, min: 25 },
      seller: { percentage: 0, min: 0 },
      split: { percentage: 1.625, min: 12.50 }
    },
    currencies: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY"],
    minTransaction: 100,
    maxTransaction: 10000000,
    avgResponseTime: 15,
    disputeWinRate: 0.89,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: true,
    verificationLevel: "High",
    insuranceAmount: 5000000,
    languages: ["English", "Spanish", "Chinese", "French", "German"],
    jurisdictions: ["USA", "Canada", "UK", "EU", "Australia", "Japan"],
    features: ["Domain Transfer", "Vehicle Purchase", "Milestone Payments", "Broker Integration"],
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
    fees: {
      buyer: { percentage: 2.9, min: 20 },
      seller: { percentage: 1, min: 10 },
      split: { percentage: 1.95, min: 15 }
    },
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "INR", "BRL"],
    minTransaction: 50,
    maxTransaction: 5000000,
    avgResponseTime: 18,
    disputeWinRate: 0.87,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 3000000,
    languages: ["English", "Spanish", "Portuguese", "Chinese", "Japanese", "Hindi"],
    jurisdictions: ["USA", "EU", "UK", "Asia", "Latin America"],
    features: ["Mass Payouts", "Currency Exchange", "Tax Compliance", "Invoice Management"],
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
    fees: {
      buyer: { percentage: 2.5, min: 15 },
      seller: { percentage: 0.5, min: 5 },
      split: { percentage: 1.5, min: 10 }
    },
    currencies: ["USD", "EUR", "GBP", "SGD", "AED", "CHF", "USDT", "USDC", "ETH", "BTC"],
    minTransaction: 25,
    maxTransaction: 2000000,
    avgResponseTime: 12,
    disputeWinRate: 0.91,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "High",
    insuranceAmount: 2000000,
    languages: ["English", "Chinese", "Arabic", "Spanish", "French"],
    jurisdictions: ["Singapore", "UAE", "Switzerland", "UK", "Hong Kong"],
    features: ["Smart Contract Integration", "Instant Crypto Support", "DeFi Bridge", "Multi-sig Wallets", "AI Dispute Resolution"],
    badge: "2024 Rising Star",
    marketShare: 8.7,
    totalVolume: 1200000000,
    activeUsers: 450000
  },
  {
    name: "Transpact",
    website: "https://www.transpact.com",
    logo: "https://transpact.com/logo.svg",
    foundedYear: 2016,
    headquarters: "Amsterdam, Netherlands",
    description: "European escrow leader specializing in B2B transactions and supply chain finance.",
    trustScore: 92,
    fees: {
      buyer: { percentage: 2.75, min: 30 },
      seller: { percentage: 0.75, min: 10 },
      split: { percentage: 1.75, min: 20 }
    },
    currencies: ["EUR", "USD", "GBP", "CHF", "SEK", "NOK"],
    minTransaction: 500,
    maxTransaction: 50000000,
    avgResponseTime: 20,
    disputeWinRate: 0.85,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 10000000,
    languages: ["English", "Dutch", "German", "French", "Spanish"],
    jurisdictions: ["EU", "UK", "Switzerland", "Norway"],
    features: ["Supply Chain Finance", "Letter of Credit", "Performance Bonds", "Bulk Transactions"],
    marketShare: 6.2,
    totalVolume: 980000000,
    activeUsers: 125000
  },
  {
    name: "SafeFunds",
    website: "https://www.safefunds.com",
    logo: "https://safefunds.com/logo.svg",
    foundedYear: 2012,
    headquarters: "London, UK",
    description: "UK's trusted escrow service for property transactions and high-value purchases.",
    trustScore: 91,
    fees: {
      buyer: { percentage: 3.0, min: 35 },
      seller: { percentage: 1.0, min: 15 },
      split: { percentage: 2.0, min: 25 }
    },
    currencies: ["GBP", "EUR", "USD"],
    minTransaction: 1000,
    maxTransaction: 25000000,
    avgResponseTime: 25,
    disputeWinRate: 0.83,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 15000000,
    languages: ["English"],
    jurisdictions: ["UK", "Ireland"],
    features: ["Property Transactions", "Legal Integration", "Solicitor Network", "Compliance Reporting"],
    marketShare: 4.8,
    totalVolume: 750000000,
    activeUsers: 85000
  },
  {
    name: "TrustPay Global",
    website: "https://www.trustpayglobal.com",
    logo: "https://trustpayglobal.com/logo.svg",
    foundedYear: 2018,
    headquarters: "Dubai, UAE",
    description: "Middle East's fastest-growing escrow platform with focus on cross-border trade.",
    trustScore: 89,
    fees: {
      buyer: { percentage: 2.8, min: 25 },
      seller: { percentage: 0.7, min: 8 },
      split: { percentage: 1.75, min: 16 }
    },
    currencies: ["AED", "USD", "EUR", "GBP", "SAR", "QAR", "KWD"],
    minTransaction: 100,
    maxTransaction: 10000000,
    avgResponseTime: 22,
    disputeWinRate: 0.82,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Medium",
    insuranceAmount: 5000000,
    languages: ["English", "Arabic", "Hindi", "Urdu"],
    jurisdictions: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
    features: ["Islamic Finance Compliant", "Trade Finance", "Gold Trading", "Real Estate"],
    marketShare: 3.5,
    totalVolume: 620000000,
    activeUsers: 180000
  },
  {
    name: "EscrowTech",
    website: "https://www.escrowtech.io",
    logo: "https://escrowtech.io/logo.svg",
    foundedYear: 2020,
    headquarters: "Berlin, Germany",
    description: "Tech-focused escrow for SaaS, software licenses, and digital assets.",
    trustScore: 88,
    fees: {
      buyer: { percentage: 2.2, min: 12 },
      seller: { percentage: 0.3, min: 3 },
      split: { percentage: 1.25, min: 7.5 }
    },
    currencies: ["EUR", "USD", "GBP", "USDC", "DAI"],
    minTransaction: 10,
    maxTransaction: 1000000,
    avgResponseTime: 8,
    disputeWinRate: 0.88,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Medium",
    insuranceAmount: 1000000,
    languages: ["English", "German", "French"],
    jurisdictions: ["Germany", "EU"],
    features: ["Source Code Escrow", "SaaS Escrow", "API Integration", "Automated Release"],
    marketShare: 2.1,
    totalVolume: 280000000,
    activeUsers: 95000
  },
  {
    name: "Guardian Escrow Services",
    website: "https://www.guardianescrow.net",
    logo: "https://guardianescrow.net/logo.svg",
    foundedYear: 2008,
    headquarters: "Toronto, Canada",
    description: "Canada's premier escrow service for real estate and business transactions.",
    trustScore: 90,
    fees: {
      buyer: { percentage: 3.1, min: 40 },
      seller: { percentage: 0.9, min: 12 },
      split: { percentage: 2.0, min: 26 }
    },
    currencies: ["CAD", "USD"],
    minTransaction: 500,
    maxTransaction: 20000000,
    avgResponseTime: 30,
    disputeWinRate: 0.84,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 8000000,
    languages: ["English", "French"],
    jurisdictions: ["Canada", "USA"],
    features: ["Real Estate", "M&A Transactions", "Legal Hold", "Trust Accounting"],
    marketShare: 3.2,
    totalVolume: 520000000,
    activeUsers: 65000
  },
  {
    name: "AsiaSecure Escrow",
    website: "https://www.asiasecure.com",
    logo: "https://asiasecure.com/logo.svg",
    foundedYear: 2015,
    headquarters: "Hong Kong",
    description: "Pan-Asian escrow platform specializing in cross-border e-commerce.",
    trustScore: 87,
    fees: {
      buyer: { percentage: 2.6, min: 18 },
      seller: { percentage: 0.6, min: 6 },
      split: { percentage: 1.6, min: 12 }
    },
    currencies: ["HKD", "CNY", "USD", "EUR", "JPY", "KRW", "SGD"],
    minTransaction: 50,
    maxTransaction: 5000000,
    avgResponseTime: 16,
    disputeWinRate: 0.81,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: false,
    verificationLevel: "Medium",
    insuranceAmount: 3000000,
    languages: ["English", "Chinese", "Japanese", "Korean"],
    jurisdictions: ["Hong Kong", "China", "Japan", "South Korea", "Taiwan"],
    features: ["E-commerce Integration", "Bulk Orders", "Quality Inspection", "Customs Support"],
    marketShare: 4.1,
    totalVolume: 680000000,
    activeUsers: 220000
  },
  {
    name: "NeutralPay",
    website: "https://www.neutralpay.com",
    logo: "https://neutralpay.com/logo.svg",
    foundedYear: 2017,
    headquarters: "Zurich, Switzerland",
    description: "Swiss precision in escrow services with focus on privacy and security.",
    trustScore: 93,
    fees: {
      buyer: { percentage: 3.5, min: 50 },
      seller: { percentage: 1.5, min: 25 },
      split: { percentage: 2.5, min: 37.5 }
    },
    currencies: ["CHF", "EUR", "USD", "GBP"],
    minTransaction: 1000,
    maxTransaction: 100000000,
    avgResponseTime: 35,
    disputeWinRate: 0.86,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: true,
    verificationLevel: "Very High",
    insuranceAmount: 20000000,
    languages: ["English", "German", "French", "Italian"],
    jurisdictions: ["Switzerland", "Liechtenstein"],
    features: ["Private Banking Integration", "Art & Collectibles", "Precious Metals", "Anonymous Transactions"],
    marketShare: 2.8,
    totalVolume: 890000000,
    activeUsers: 45000
  },
  {
    name: "RapidEscrow",
    website: "https://www.rapidescrow.com",
    logo: "https://rapidescrow.com/logo.svg",
    foundedYear: 2019,
    headquarters: "Miami, USA",
    description: "Fast and affordable escrow for freelancers and small businesses.",
    trustScore: 85,
    fees: {
      buyer: { percentage: 2.0, min: 10 },
      seller: { percentage: 0, min: 0 },
      split: { percentage: 1.0, min: 5 }
    },
    currencies: ["USD", "EUR", "GBP", "BRL", "MXN"],
    minTransaction: 20,
    maxTransaction: 100000,
    avgResponseTime: 10,
    disputeWinRate: 0.79,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Low",
    insuranceAmount: 500000,
    languages: ["English", "Spanish", "Portuguese"],
    jurisdictions: ["USA", "Mexico", "Brazil"],
    features: ["Freelance Marketplace", "Milestone Payments", "Invoice Factoring", "Quick Release"],
    marketShare: 1.9,
    totalVolume: 180000000,
    activeUsers: 150000
  },
  {
    name: "BlockShield Escrow",
    website: "https://www.blockshield.io",
    logo: "https://blockshield.io/logo.svg",
    foundedYear: 2022,
    headquarters: "Malta",
    description: "Blockchain-native escrow service with full DeFi integration.",
    trustScore: 83,
    fees: {
      buyer: { percentage: 1.8, min: 8 },
      seller: { percentage: 0.2, min: 2 },
      split: { percentage: 1.0, min: 5 }
    },
    currencies: ["USDT", "USDC", "DAI", "ETH", "BTC", "BNB", "MATIC"],
    minTransaction: 10,
    maxTransaction: 500000,
    avgResponseTime: 5,
    disputeWinRate: 0.77,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Low",
    insuranceAmount: 250000,
    languages: ["English"],
    jurisdictions: ["Malta", "Estonia", "Gibraltar"],
    features: ["DeFi Integration", "Yield Farming", "NFT Escrow", "DAO Governance"],
    marketShare: 0.8,
    totalVolume: 95000000,
    activeUsers: 75000
  },
  {
    name: "TradeGuard",
    website: "https://www.tradeguard.com",
    logo: "https://tradeguard.com/logo.svg",
    foundedYear: 2014,
    headquarters: "Sydney, Australia",
    description: "Australia's leading escrow service for international trade.",
    trustScore: 88,
    fees: {
      buyer: { percentage: 2.9, min: 35 },
      seller: { percentage: 0.8, min: 10 },
      split: { percentage: 1.85, min: 22.5 }
    },
    currencies: ["AUD", "USD", "NZD", "EUR", "GBP", "CNY"],
    minTransaction: 200,
    maxTransaction: 15000000,
    avgResponseTime: 24,
    disputeWinRate: 0.83,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 6000000,
    languages: ["English", "Chinese"],
    jurisdictions: ["Australia", "New Zealand", "Pacific Islands"],
    features: ["Import/Export", "Commodity Trading", "Agricultural Products", "Mining Equipment"],
    marketShare: 2.4,
    totalVolume: 410000000,
    activeUsers: 88000
  },
  {
    name: "SecureDeal Pro",
    website: "https://www.securedealpro.com",
    logo: "https://securedealpro.com/logo.svg",
    foundedYear: 2011,
    headquarters: "Tel Aviv, Israel",
    description: "Technology and startup focused escrow with IP protection.",
    trustScore: 86,
    fees: {
      buyer: { percentage: 2.4, min: 20 },
      seller: { percentage: 0.4, min: 5 },
      split: { percentage: 1.4, min: 12.5 }
    },
    currencies: ["ILS", "USD", "EUR"],
    minTransaction: 100,
    maxTransaction: 10000000,
    avgResponseTime: 14,
    disputeWinRate: 0.85,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Medium",
    insuranceAmount: 2000000,
    languages: ["English", "Hebrew", "Russian"],
    jurisdictions: ["Israel", "USA", "EU"],
    features: ["IP Transfer", "Startup Acquisitions", "R&D Agreements", "Patent Escrow"],
    marketShare: 1.3,
    totalVolume: 220000000,
    activeUsers: 42000
  },
  {
    name: "PremierEscrow",
    website: "https://www.premierescrow.com",
    logo: "https://premierescrow.com/logo.svg",
    foundedYear: 2006,
    headquarters: "Los Angeles, USA",
    description: "Entertainment industry specialist for film, music, and media transactions.",
    trustScore: 87,
    fees: {
      buyer: { percentage: 3.2, min: 45 },
      seller: { percentage: 1.2, min: 20 },
      split: { percentage: 2.2, min: 32.5 }
    },
    currencies: ["USD", "EUR", "GBP"],
    minTransaction: 5000,
    maxTransaction: 50000000,
    avgResponseTime: 28,
    disputeWinRate: 0.82,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 10000000,
    languages: ["English", "Spanish"],
    jurisdictions: ["USA"],
    features: ["Film Production", "Music Rights", "Royalty Management", "Talent Contracts"],
    marketShare: 1.6,
    totalVolume: 340000000,
    activeUsers: 28000
  },
  {
    name: "GlobalTrust Escrow",
    website: "https://www.globaltrustescrow.com",
    logo: "https://globaltrustescrow.com/logo.svg",
    foundedYear: 2013,
    headquarters: "Frankfurt, Germany",
    description: "European leader in automotive and machinery escrow transactions.",
    trustScore: 89,
    fees: {
      buyer: { percentage: 2.7, min: 32 },
      seller: { percentage: 0.7, min: 9 },
      split: { percentage: 1.7, min: 20.5 }
    },
    currencies: ["EUR", "USD", "GBP", "CHF", "PLN", "CZK"],
    minTransaction: 1000,
    maxTransaction: 30000000,
    avgResponseTime: 26,
    disputeWinRate: 0.84,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 12000000,
    languages: ["English", "German", "French", "Polish"],
    jurisdictions: ["Germany", "EU", "Switzerland"],
    features: ["Vehicle Export", "Heavy Machinery", "Industrial Equipment", "Fleet Sales"],
    marketShare: 2.7,
    totalVolume: 580000000,
    activeUsers: 72000
  },
  {
    name: "SafeHarbor Payments",
    website: "https://www.safeharborpay.com",
    logo: "https://safeharborpay.com/logo.svg",
    foundedYear: 2010,
    headquarters: "Boston, USA",
    description: "Marine and shipping industry escrow specialist.",
    trustScore: 86,
    fees: {
      buyer: { percentage: 3.0, min: 50 },
      seller: { percentage: 1.0, min: 20 },
      split: { percentage: 2.0, min: 35 }
    },
    currencies: ["USD", "EUR", "GBP", "NOK", "DKK"],
    minTransaction: 10000,
    maxTransaction: 100000000,
    avgResponseTime: 32,
    disputeWinRate: 0.81,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 25000000,
    languages: ["English"],
    jurisdictions: ["USA", "Panama", "Marshall Islands"],
    features: ["Vessel Purchase", "Charter Agreements", "Marine Insurance", "Port Services"],
    marketShare: 1.1,
    totalVolume: 450000000,
    activeUsers: 15000
  },
  {
    name: "MedEscrow",
    website: "https://www.medescrow.com",
    logo: "https://medescrow.com/logo.svg",
    foundedYear: 2016,
    headquarters: "Chicago, USA",
    description: "Healthcare and medical equipment transaction specialist.",
    trustScore: 85,
    fees: {
      buyer: { percentage: 2.8, min: 40 },
      seller: { percentage: 0.8, min: 15 },
      split: { percentage: 1.8, min: 27.5 }
    },
    currencies: ["USD", "EUR", "CAD"],
    minTransaction: 1000,
    maxTransaction: 20000000,
    avgResponseTime: 22,
    disputeWinRate: 0.83,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 5000000,
    languages: ["English", "Spanish"],
    jurisdictions: ["USA", "Canada"],
    features: ["Medical Equipment", "Practice Sales", "FDA Compliance", "HIPAA Compliant"],
    marketShare: 0.9,
    totalVolume: 180000000,
    activeUsers: 25000
  },
  {
    name: "CryptoVault Escrow",
    website: "https://www.cryptovault.io",
    logo: "https://cryptovault.io/logo.svg",
    foundedYear: 2021,
    headquarters: "Zug, Switzerland",
    description: "Pure crypto escrow with multi-chain support and DeFi yields.",
    trustScore: 82,
    fees: {
      buyer: { percentage: 1.5, min: 5 },
      seller: { percentage: 0, min: 0 },
      split: { percentage: 0.75, min: 2.5 }
    },
    currencies: ["BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "AVAX", "MATIC"],
    minTransaction: 50,
    maxTransaction: 10000000,
    avgResponseTime: 3,
    disputeWinRate: 0.75,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Low",
    insuranceAmount: 1000000,
    languages: ["English", "Chinese", "Russian"],
    jurisdictions: ["Switzerland", "Singapore", "Cayman Islands"],
    features: ["Multi-chain", "Staking Rewards", "Flash Loans", "Atomic Swaps"],
    marketShare: 0.6,
    totalVolume: 120000000,
    activeUsers: 95000
  },
  {
    name: "ArtSecure",
    website: "https://www.artsecure.com",
    logo: "https://artsecure.com/logo.svg",
    foundedYear: 2009,
    headquarters: "Paris, France",
    description: "Luxury goods, art, and collectibles escrow specialist.",
    trustScore: 88,
    fees: {
      buyer: { percentage: 4.0, min: 100 },
      seller: { percentage: 2.0, min: 50 },
      split: { percentage: 3.0, min: 75 }
    },
    currencies: ["EUR", "USD", "GBP", "CHF", "JPY"],
    minTransaction: 5000,
    maxTransaction: 500000000,
    avgResponseTime: 48,
    disputeWinRate: 0.87,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "Very High",
    insuranceAmount: 50000000,
    languages: ["English", "French", "Italian", "Chinese"],
    jurisdictions: ["France", "UK", "Switzerland", "Monaco"],
    features: ["Art Authentication", "Provenance Verification", "Auction House Integration", "Private Sales"],
    marketShare: 0.7,
    totalVolume: 280000000,
    activeUsers: 12000
  },
  {
    name: "AgriEscrow",
    website: "https://www.agriescrow.com",
    logo: "https://agriescrow.com/logo.svg",
    foundedYear: 2018,
    headquarters: "Des Moines, USA",
    description: "Agricultural commodities and farmland transaction specialist.",
    trustScore: 84,
    fees: {
      buyer: { percentage: 2.5, min: 30 },
      seller: { percentage: 0.5, min: 10 },
      split: { percentage: 1.5, min: 20 }
    },
    currencies: ["USD", "CAD", "BRL", "AUD"],
    minTransaction: 1000,
    maxTransaction: 50000000,
    avgResponseTime: 36,
    disputeWinRate: 0.80,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "Medium",
    insuranceAmount: 10000000,
    languages: ["English", "Spanish", "Portuguese"],
    jurisdictions: ["USA", "Canada", "Brazil", "Australia"],
    features: ["Grain Trading", "Livestock Sales", "Farm Equipment", "Land Transactions"],
    marketShare: 0.8,
    totalVolume: 320000000,
    activeUsers: 35000
  },
  {
    name: "EduEscrow",
    website: "https://www.eduescrow.com",
    logo: "https://eduescrow.com/logo.svg",
    foundedYear: 2020,
    headquarters: "Singapore",
    description: "Education sector escrow for tuition, courses, and institutional transactions.",
    trustScore: 83,
    fees: {
      buyer: { percentage: 2.0, min: 15 },
      seller: { percentage: 0, min: 0 },
      split: { percentage: 1.0, min: 7.5 }
    },
    currencies: ["SGD", "USD", "EUR", "GBP", "AUD", "INR"],
    minTransaction: 100,
    maxTransaction: 1000000,
    avgResponseTime: 18,
    disputeWinRate: 0.82,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: false,
    verificationLevel: "Medium",
    insuranceAmount: 2000000,
    languages: ["English", "Chinese", "Hindi", "Malay"],
    jurisdictions: ["Singapore", "Malaysia", "India", "Australia"],
    features: ["Tuition Protection", "Course Refunds", "Student Loans", "Scholarship Management"],
    marketShare: 0.5,
    totalVolume: 85000000,
    activeUsers: 120000
  },
  {
    name: "GreenEscrow",
    website: "https://www.greenescrow.com",
    logo: "https://greenescrow.com/logo.svg",
    foundedYear: 2019,
    headquarters: "Copenhagen, Denmark",
    description: "Sustainable and renewable energy project escrow specialist.",
    trustScore: 85,
    fees: {
      buyer: { percentage: 2.6, min: 35 },
      seller: { percentage: 0.6, min: 10 },
      split: { percentage: 1.6, min: 22.5 }
    },
    currencies: ["EUR", "USD", "GBP", "DKK", "SEK", "NOK"],
    minTransaction: 5000,
    maxTransaction: 100000000,
    avgResponseTime: 40,
    disputeWinRate: 0.81,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 15000000,
    languages: ["English", "Danish", "German", "Swedish"],
    jurisdictions: ["Denmark", "EU", "UK", "Norway"],
    features: ["Carbon Credits", "Solar Projects", "Wind Farms", "Green Bonds"],
    marketShare: 0.6,
    totalVolume: 240000000,
    activeUsers: 18000
  },
  {
    name: "LegalEscrow",
    website: "https://www.legalescrow.com",
    logo: "https://legalescrow.com/logo.svg",
    foundedYear: 2007,
    headquarters: "Washington DC, USA",
    description: "Legal settlement and litigation escrow services.",
    trustScore: 90,
    fees: {
      buyer: { percentage: 3.5, min: 75 },
      seller: { percentage: 1.5, min: 35 },
      split: { percentage: 2.5, min: 55 }
    },
    currencies: ["USD", "EUR", "GBP"],
    minTransaction: 5000,
    maxTransaction: 500000000,
    avgResponseTime: 45,
    disputeWinRate: 0.88,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "Very High",
    insuranceAmount: 100000000,
    languages: ["English"],
    jurisdictions: ["USA"],
    features: ["Settlement Funds", "Class Actions", "Trust Accounts", "Court Orders"],
    marketShare: 1.4,
    totalVolume: 680000000,
    activeUsers: 22000
  },
  {
    name: "SportEscrow",
    website: "https://www.sportescrow.com",
    logo: "https://sportescrow.com/logo.svg",
    foundedYear: 2017,
    headquarters: "Manchester, UK",
    description: "Sports industry escrow for transfers, sponsorships, and events.",
    trustScore: 84,
    fees: {
      buyer: { percentage: 3.0, min: 50 },
      seller: { percentage: 1.0, min: 20 },
      split: { percentage: 2.0, min: 35 }
    },
    currencies: ["GBP", "EUR", "USD"],
    minTransaction: 10000,
    maxTransaction: 200000000,
    avgResponseTime: 30,
    disputeWinRate: 0.80,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 20000000,
    languages: ["English", "Spanish", "French", "German"],
    jurisdictions: ["UK", "EU"],
    features: ["Player Transfers", "Sponsorship Deals", "Event Management", "Prize Money"],
    marketShare: 0.7,
    totalVolume: 420000000,
    activeUsers: 8000
  },
  {
    name: "TechBridge Escrow",
    website: "https://www.techbridge.com",
    logo: "https://techbridge.com/logo.svg",
    foundedYear: 2021,
    headquarters: "Austin, USA",
    description: "AI and machine learning model marketplace escrow.",
    trustScore: 81,
    fees: {
      buyer: { percentage: 2.2, min: 18 },
      seller: { percentage: 0.3, min: 4 },
      split: { percentage: 1.25, min: 11 }
    },
    currencies: ["USD", "EUR", "USDC"],
    minTransaction: 50,
    maxTransaction: 5000000,
    avgResponseTime: 12,
    disputeWinRate: 0.78,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Medium",
    insuranceAmount: 1000000,
    languages: ["English"],
    jurisdictions: ["USA"],
    features: ["AI Models", "Dataset Trading", "API Subscriptions", "Compute Resources"],
    marketShare: 0.4,
    totalVolume: 65000000,
    activeUsers: 45000
  },
  {
    name: "RealtyShield",
    website: "https://www.realtyshield.com",
    logo: "https://realtyshield.com/logo.svg",
    foundedYear: 2012,
    headquarters: "Phoenix, USA",
    description: "Residential and commercial real estate escrow services.",
    trustScore: 89,
    fees: {
      buyer: { percentage: 3.2, min: 60 },
      seller: { percentage: 1.2, min: 25 },
      split: { percentage: 2.2, min: 42.5 }
    },
    currencies: ["USD", "CAD", "MXN"],
    minTransaction: 10000,
    maxTransaction: 100000000,
    avgResponseTime: 38,
    disputeWinRate: 0.85,
    apiAvailable: false,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "High",
    insuranceAmount: 30000000,
    languages: ["English", "Spanish"],
    jurisdictions: ["USA", "Canada", "Mexico"],
    features: ["Title Insurance", "Property Inspection", "Mortgage Integration", "1031 Exchanges"],
    marketShare: 2.3,
    totalVolume: 920000000,
    activeUsers: 55000
  },
  {
    name: "FreightSecure",
    website: "https://www.freightsecure.com",
    logo: "https://freightsecure.com/logo.svg",
    foundedYear: 2016,
    headquarters: "Rotterdam, Netherlands",
    description: "Logistics and freight forwarding escrow specialist.",
    trustScore: 86,
    fees: {
      buyer: { percentage: 2.4, min: 28 },
      seller: { percentage: 0.6, min: 8 },
      split: { percentage: 1.5, min: 18 }
    },
    currencies: ["EUR", "USD", "GBP", "CNY"],
    minTransaction: 500,
    maxTransaction: 20000000,
    avgResponseTime: 20,
    disputeWinRate: 0.82,
    apiAvailable: true,
    instantTransfer: false,
    cryptoSupported: false,
    verificationLevel: "Medium",
    insuranceAmount: 8000000,
    languages: ["English", "Dutch", "German", "Chinese"],
    jurisdictions: ["Netherlands", "EU", "China"],
    features: ["Container Tracking", "Bill of Lading", "Customs Clearance", "Insurance Claims"],
    marketShare: 1.2,
    totalVolume: 380000000,
    activeUsers: 62000
  },
  {
    name: "GameTrust Escrow",
    website: "https://www.gametrust.gg",
    logo: "https://gametrust.gg/logo.svg",
    foundedYear: 2020,
    headquarters: "Seoul, South Korea",
    description: "Gaming and virtual asset escrow for in-game items and accounts.",
    trustScore: 80,
    fees: {
      buyer: { percentage: 1.8, min: 5 },
      seller: { percentage: 0.2, min: 1 },
      split: { percentage: 1.0, min: 3 }
    },
    currencies: ["USD", "EUR", "KRW", "JPY", "USDT"],
    minTransaction: 5,
    maxTransaction: 100000,
    avgResponseTime: 6,
    disputeWinRate: 0.76,
    apiAvailable: true,
    instantTransfer: true,
    cryptoSupported: true,
    verificationLevel: "Low",
    insuranceAmount: 500000,
    languages: ["English", "Korean", "Chinese", "Japanese"],
    jurisdictions: ["South Korea", "Japan", "USA"],
    features: ["Account Trading", "Item Marketplace", "Boosting Services", "Tournament Prizes"],
    marketShare: 0.3,
    totalVolume: 45000000,
    activeUsers: 180000
  }
]

// Review templates for generating realistic reviews
const reviewTemplates = {
  positive: [
    {
      title: "Excellent service and support",
      pros: ["Fast response time", "Professional staff", "Secure platform"],
      cons: ["Slightly higher fees"],
      template: "I've been using {service} for {months} months and the experience has been exceptional. {specific}"
    },
    {
      title: "Highly recommended for international transactions",
      pros: ["Multi-currency support", "Clear documentation", "Reliable"],
      cons: ["Could improve mobile app"],
      template: "As someone who deals with cross-border transactions regularly, {service} has been a game-changer. {specific}"
    },
    {
      title: "Trustworthy and transparent",
      pros: ["Transparent fees", "Good dispute resolution", "Easy to use"],
      cons: ["Limited weekend support"],
      template: "After trying several escrow services, {service} stands out for its transparency. {specific}"
    },
    {
      title: "Great for business transactions",
      pros: ["API integration", "Bulk processing", "Detailed reporting"],
      cons: ["Learning curve for advanced features"],
      template: "Our company has processed over ${amount} through {service}. {specific}"
    },
    {
      title: "Smooth and secure experience",
      pros: ["High security", "Insurance coverage", "Quick verification"],
      cons: ["Verification can be strict"],
      template: "Security was my top concern and {service} delivered. {specific}"
    }
  ],
  neutral: [
    {
      title: "Decent service with room for improvement",
      pros: ["Established platform", "Multiple payment options"],
      cons: ["Slow support response", "Complex fee structure"],
      template: "{service} gets the job done but there are areas that need work. {specific}"
    },
    {
      title: "Average experience overall",
      pros: ["Reliable transactions", "Good documentation"],
      cons: ["Higher fees than competitors", "Limited features"],
      template: "My experience with {service} has been mixed. {specific}"
    },
    {
      title: "Works but nothing special",
      pros: ["Does what it promises", "Stable platform"],
      cons: ["Outdated interface", "Slow processing"],
      template: "If you need basic escrow services, {service} will work. {specific}"
    }
  ],
  negative: [
    {
      title: "Disappointed with the service",
      pros: ["Well-known brand"],
      cons: ["Poor customer service", "Hidden fees", "Slow resolution"],
      template: "I had high expectations for {service} but was let down. {specific}"
    },
    {
      title: "Too many issues to recommend",
      pros: ["Wide availability"],
      cons: ["Technical problems", "Unresponsive support", "Confusing process"],
      template: "Unfortunately, my experience with {service} has been frustrating. {specific}"
    }
  ]
}

const specificComments = {
  positive: [
    "The dispute was resolved fairly and quickly.",
    "Their API documentation is comprehensive and well-maintained.",
    "The verification process was thorough but not overly burdensome.",
    "Funds were released exactly as scheduled.",
    "The milestone payment feature saved our project.",
    "Customer support went above and beyond to help.",
    "The platform handled our high-value transaction flawlessly.",
    "Integration with our existing systems was seamless."
  ],
  neutral: [
    "The process works but could be more streamlined.",
    "Fees are reasonable but not the cheapest.",
    "Support is helpful when you reach them.",
    "The platform is functional but feels dated.",
    "It took longer than expected but got done eventually."
  ],
  negative: [
    "Support took days to respond to urgent issues.",
    "The fee calculator showed different amounts than charged.",
    "The dispute resolution seemed biased.",
    "Platform went down during a critical transaction.",
    "Verification requirements kept changing."
  ]
}

const authorNames = [
  "John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis", "Robert Wilson",
  "Lisa Anderson", "David Martinez", "Jennifer Taylor", "William Brown", "Maria Garcia",
  "James Lee", "Patricia White", "Christopher Moore", "Linda Jackson", "Daniel Thompson",
  "Barbara Harris", "Matthew Clark", "Susan Lewis", "Joseph Robinson", "Karen Walker",
  "Thomas Hall", "Nancy Allen", "Mark Young", "Betty King", "Donald Wright",
  "Helen Scott", "Paul Green", "Sandra Baker", "Kevin Adams", "Laura Nelson",
  "Alex Rivera", "Emma Watson", "Oliver Zhang", "Sophia Patel", "Lucas Kim",
  "Isabella Singh", "Mason Nakamura", "Ava Fernandez", "Ethan O'Brien", "Mia Kowalski"
]

const locations = [
  "New York, USA", "London, UK", "Singapore", "Toronto, Canada", "Sydney, Australia",
  "Berlin, Germany", "Paris, France", "Tokyo, Japan", "Dubai, UAE", "Hong Kong",
  "Amsterdam, Netherlands", "Zurich, Switzerland", "Mumbai, India", "São Paulo, Brazil",
  "Mexico City, Mexico", "Seoul, South Korea", "Stockholm, Sweden", "Tel Aviv, Israel",
  "Dublin, Ireland", "Barcelona, Spain", "Vienna, Austria", "Copenhagen, Denmark",
  "Oslo, Norway", "Brussels, Belgium", "Milan, Italy", "Prague, Czech Republic",
  "Warsaw, Poland", "Budapest, Hungary", "Athens, Greece", "Lisbon, Portugal"
]

const roles = ["Buyer", "Seller", "Business Owner", "Freelancer", "Investor", "Trader", "Developer", "Consultant"]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.marketData.deleteMany()
  await prisma.trustScoreHistory.deleteMany()
  await prisma.feeCalculation.deleteMany()
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

    // Generate historical metrics (last 30 days)
    const metrics = []
    for (let i = 0; i < 30; i++) {
      const timestamp = subDays(new Date(), i)
      const baseResponseTime = serviceData.avgResponseTime
      const baseUptime = 99.5 + Math.random() * 0.4 // 99.5-99.9%
      const baseUsers = serviceData.activeUsers

      metrics.push({
        serviceId: service.id,
        timestamp,
        responseTime: Math.max(1, baseResponseTime + Math.floor((Math.random() - 0.5) * 10)),
        uptime: i === 15 && service.name === "DataSync Pro" ? 0 : baseUptime, // Simulate one service having downtime
        activeUsers: Math.floor(baseUsers * (0.8 + Math.random() * 0.4)),
        volume: Math.random() * 10000000,
        transactions: Math.floor(Math.random() * 1000),
        successRate: 0.95 + Math.random() * 0.04
      })
    }

    await prisma.serviceMetric.createMany({ data: metrics })

    // Generate price history (last 12 months)
    const priceHistory = []
    for (let i = 0; i < 12; i++) {
      const timestamp = subMonths(new Date(), i)
      const baseFee = (serviceData.fees as any).buyer?.percentage || 2.5
      const variation = 1 + (Math.random() - 0.5) * 0.1 // ±5% variation

      priceHistory.push({
        serviceId: service.id,
        timestamp,
        baseFee: baseFee * variation,
        percentageFee: baseFee * variation,
        minFee: ((serviceData.fees as any).buyer?.min || 20) * variation,
        maxFee: 1000,
        internationalFee: baseFee * variation * 1.2,
        cryptoFee: serviceData.cryptoSupported ? baseFee * variation * 0.8 : null
      })
    }

    await prisma.pricePoint.createMany({ data: priceHistory })

    // Generate reviews
    const reviewCount = service.name === "SecureHold Escrow" ? 127 : 
                       Math.floor(Math.random() * 100) + 20

    const reviews = []
    for (let i = 0; i < reviewCount; i++) {
      const isPositive = service.name === "SecureHold Escrow" ? 
                        Math.random() < 0.85 : // 85% positive for SecureHold
                        Math.random() < 0.7   // 70% positive for others

      const isNeutral = !isPositive && Math.random() < 0.6
      const sentiment = isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative'
      const templates = reviewTemplates[sentiment]
      const template = templates[Math.floor(Math.random() * templates.length)]
      const specific = specificComments[sentiment][Math.floor(Math.random() * specificComments[sentiment].length)]

      const rating = isPositive ? (Math.random() < 0.7 ? 5 : 4) :
                    isNeutral ? 3 :
                    (Math.random() < 0.5 ? 2 : 1)

      const comment = template.template
        .replace('{service}', service.name)
        .replace('{months}', String(Math.floor(Math.random() * 24) + 1))
        .replace('{amount}', String(Math.floor(Math.random() * 1000000)))
        .replace('{specific}', specific)

      reviews.push({
        serviceId: service.id,
        rating,
        title: template.title,
        comment,
        pros: template.pros,
        cons: template.cons,
        verified: Math.random() < 0.7,
        author: authorNames[Math.floor(Math.random() * authorNames.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        date: randomPastDate(730), // Random date within last 2 years
        helpful: Math.floor(Math.random() * 50),
        unhelpful: Math.floor(Math.random() * 10)
      })
    }

    await prisma.review.createMany({ data: reviews })

    // Generate trust score history
    const trustHistory = []
    for (let i = 0; i < 12; i++) {
      const timestamp = subMonths(new Date(), i)
      const baseScore = serviceData.trustScore
      const variation = (Math.random() - 0.5) * 4 // ±2 points variation

      trustHistory.push({
        serviceId: service.id,
        timestamp,
        score: Math.min(100, Math.max(0, baseScore + variation)),
        breakdown: {
          yearsInBusiness: (new Date().getFullYear() - serviceData.foundedYear) * 2,
          disputeResolution: serviceData.disputeWinRate * 25,
          responseTime: Math.max(0, 15 - serviceData.avgResponseTime / 4),
          userRatings: 18, // Will be calculated from actual reviews
          insurance: serviceData.insuranceAmount ? 10 : 0,
          transparency: 14
        }
      })
    }

    await prisma.trustScoreHistory.createMany({ data: trustHistory })
  }

  // Generate market data
  console.log('📊 Generating market data...')
  const marketData = []
  for (let i = 0; i < 365; i++) {
    const date = subDays(new Date(), i)
    marketData.push({
      date,
      totalVolume: 15000000000 + Math.random() * 5000000000,
      totalTransactions: Math.floor(50000 + Math.random() * 20000),
      avgTransactionSize: 250000 + Math.random() * 100000,
      topServices: {
        "Escrow.com": 28.5 + (Math.random() - 0.5) * 2,
        "Payoneer Escrow": 22.3 + (Math.random() - 0.5) * 2,
        "SecureHold Escrow": 8.7 + (Math.random() - 0.5) * 1,
        "Others": 40.5
      },
      trends: {
        cryptoGrowth: 15 + Math.random() * 10,
        crossBorderGrowth: 12 + Math.random() * 8,
        b2bGrowth: 8 + Math.random() * 6
      }
    })
  }

  await prisma.marketData.createMany({ data: marketData })

  console.log('✅ Seed completed successfully!')
  console.log(`  - ${escrowServices.length} escrow services created`)
  console.log(`  - ${30 * escrowServices.length} days of metrics generated`)
  console.log(`  - Reviews, price history, and market data populated`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })