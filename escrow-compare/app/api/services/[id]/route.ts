import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateTrustScore } from '@/lib/trust-score'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.escrowService.findFirst({
      where: {
        OR: [
          { id: params.id },
          { slug: params.id }
        ]
      },
      include: {
        reviews: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 30,
        },
        priceHistory: {
          orderBy: { timestamp: 'desc' },
          take: 12,
        },
      },
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Parse JSON strings
    const parsedService = {
      ...service,
      fees: typeof service.fees === 'string' ? JSON.parse(service.fees) : service.fees,
      currencies: typeof service.currencies === 'string' ? JSON.parse(service.currencies) : service.currencies,
      languages: typeof service.languages === 'string' ? JSON.parse(service.languages) : service.languages,
      jurisdictions: typeof service.jurisdictions === 'string' ? JSON.parse(service.jurisdictions) : service.jurisdictions,
      features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
      reviews: service.reviews.map(review => ({
        ...review,
        pros: typeof review.pros === 'string' ? JSON.parse(review.pros) : review.pros,
        cons: typeof review.cons === 'string' ? JSON.parse(review.cons) : review.cons,
      })),
    }

    // Calculate additional metrics
    const avgRating = parsedService.reviews.length
      ? parsedService.reviews.reduce((sum, r) => sum + r.rating, 0) / parsedService.reviews.length
      : 0

    const trustScoreDetails = calculateTrustScore(parsedService)

    // Get comparison data
    const competitorCount = await prisma.escrowService.count({
      where: {
        trustScore: { gt: parsedService.trustScore },
      },
    })

    const response = {
      ...parsedService,
      avgRating,
      reviewCount: parsedService.reviews.length,
      trustScoreDetails,
      ranking: competitorCount + 1,
      currentMetrics: parsedService.metrics[0] || null,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}