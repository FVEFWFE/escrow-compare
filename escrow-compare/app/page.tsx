import { HeroSection } from '@/components/HeroSection'
import { ServiceGrid } from '@/components/ServiceGrid'
import { ComparisonCTA } from '@/components/ComparisonCTA'
import { TrustIndicators } from '@/components/TrustIndicators'
import { LiveMetrics } from '@/components/LiveMetrics'
import { prisma } from '@/lib/prisma'

export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  // Fetch top services
  const rawServices = await prisma.escrowService.findMany({
    orderBy: { trustScore: 'desc' },
    take: 6,
    include: {
      reviews: {
        select: { rating: true },
      },
    },
  })

  // Parse JSON strings for each service
  const services = rawServices.map(service => ({
    ...service,
    fees: typeof service.fees === 'string' ? JSON.parse(service.fees) : service.fees,
    currencies: typeof service.currencies === 'string' ? JSON.parse(service.currencies) : service.currencies,
    languages: typeof service.languages === 'string' ? JSON.parse(service.languages) : service.languages,
    jurisdictions: typeof service.jurisdictions === 'string' ? JSON.parse(service.jurisdictions) : service.jurisdictions,
    features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
  }))

  // Calculate metrics
  const [totalServices, totalReviews, latestMarketData] = await Promise.all([
    prisma.escrowService.count(),
    prisma.review.count(),
    prisma.marketData.findFirst({
      orderBy: { date: 'desc' },
    }),
  ])

  const metrics = {
    totalServices,
    totalReviews,
    totalVolume: latestMarketData?.totalVolume || 15800000000,
    avgResponseTime: 18,
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustIndicators metrics={metrics} />
      <ServiceGrid 
        services={services}
        title="Top Rated Escrow Services"
        description="Trusted by millions of users worldwide for secure transactions"
      />
      <LiveMetrics />
      <ComparisonCTA />
    </div>
  )
}