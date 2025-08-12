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
        reviews: true,
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
    }

    const trustScoreDetails = calculateTrustScore(parsedService)

    // Get historical trust scores
    const history = await prisma.trustScoreHistory.findMany({
      where: { serviceId: service.id },
      orderBy: { timestamp: 'desc' },
      take: 30,
    })

    // Parse history breakdown
    const parsedHistory = history.map(h => ({
      ...h,
      breakdown: typeof h.breakdown === 'string' ? JSON.parse(h.breakdown) : h.breakdown,
    }))

    // Get percentile ranking
    const betterServices = await prisma.escrowService.count({
      where: {
        trustScore: { gt: service.trustScore },
      },
    })

    const totalServices = await prisma.escrowService.count()
    const percentile = Math.round(((totalServices - betterServices) / totalServices) * 100)

    // Industry averages
    const industryAverages = {
      trustScore: 85,
      yearsInBusiness: 8,
      disputeResolution: 0.82,
      responseTime: 25,
      userRatings: 4.2,
      insurance: 0.7, // 70% have insurance
      transparency: 0.8,
    }

    return NextResponse.json({
      serviceId: service.id,
      serviceName: service.name,
      currentScore: service.trustScore,
      details: trustScoreDetails,
      history: parsedHistory,
      ranking: betterServices + 1,
      percentile,
      totalServices,
      industryAverages,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching trust score:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trust score' },
      { status: 500 }
    )
  }
}