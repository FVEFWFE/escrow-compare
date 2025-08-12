import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateTrustScore } from '@/lib/trust-score'
import { z } from 'zod'

const querySchema = z.object({
  ids: z.string().transform(val => val.split(',')),
  amount: z.coerce.number().optional(),
  transactionType: z.enum(['goods', 'services', 'domain', 'vehicle', 'property']).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = querySchema.parse({
      ids: searchParams.get('ids') || '',
      amount: searchParams.get('amount'),
      transactionType: searchParams.get('transactionType'),
    })

    if (params.ids.length === 0 || params.ids.length > 4) {
      return NextResponse.json(
        { error: 'Please provide 1-4 service IDs' },
        { status: 400 }
      )
    }

    // Fetch services
    const services = await prisma.escrowService.findMany({
      where: {
        OR: params.ids.map(id => ({
          OR: [{ id }, { slug: id }]
        }))
      },
      include: {
        reviews: {
          select: { rating: true },
        },
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    })

    if (services.length === 0) {
      return NextResponse.json(
        { error: 'No services found' },
        { status: 404 }
      )
    }

    // Parse and enhance service data
    const enhancedServices = services.map(service => {
      // Parse JSON strings
      const parsed = {
        ...service,
        fees: typeof service.fees === 'string' ? JSON.parse(service.fees) : service.fees,
        currencies: typeof service.currencies === 'string' ? JSON.parse(service.currencies) : service.currencies,
        languages: typeof service.languages === 'string' ? JSON.parse(service.languages) : service.languages,
        jurisdictions: typeof service.jurisdictions === 'string' ? JSON.parse(service.jurisdictions) : service.jurisdictions,
        features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
      }

      const avgRating = service.reviews.length
        ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
        : 0

      const trustScoreDetails = calculateTrustScore(parsed)

      // Calculate fee if amount provided
      let calculatedFee = null
      if (params.amount && parsed.fees) {
        const baseFee = parsed.fees.buyer || parsed.fees.split || {}
        calculatedFee = {
          percentage: baseFee.percentage || 0,
          fixed: baseFee.min || 0,
          total: Math.max(
            baseFee.min || 0,
            (params.amount * (baseFee.percentage || 0)) / 100
          )
        }
      }

      return {
        id: service.id,
        name: service.name,
        slug: service.slug,
        logo: service.logo,
        trustScore: service.trustScore,
        trustScoreDetails,
        avgRating,
        reviewCount: service.reviews.length,
        fees: parsed.fees,
        calculatedFee,
        currencies: parsed.currencies,
        languages: parsed.languages,
        jurisdictions: parsed.jurisdictions,
        features: parsed.features,
        minTransaction: service.minTransaction,
        maxTransaction: service.maxTransaction,
        avgResponseTime: service.avgResponseTime,
        disputeWinRate: service.disputeWinRate,
        apiAvailable: service.apiAvailable,
        instantTransfer: service.instantTransfer,
        cryptoSupported: service.cryptoSupported,
        verificationLevel: service.verificationLevel,
        insuranceAmount: service.insuranceAmount,
        badge: service.badge,
        currentMetrics: service.metrics[0] || null,
      }
    })

    // Create comparison summary
    const summary = {
      bestTrustScore: enhancedServices.reduce((best, s) => 
        s.trustScore > best.trustScore ? s : best
      ),
      bestResponseTime: enhancedServices.reduce((best, s) => 
        s.avgResponseTime < best.avgResponseTime ? s : best
      ),
      bestFees: params.amount ? enhancedServices.reduce((best, s) => 
        (s.calculatedFee?.total || Infinity) < (best.calculatedFee?.total || Infinity) ? s : best
      ) : null,
      mostFeatures: enhancedServices.reduce((best, s) => 
        s.features.length > best.features.length ? s : best
      ),
    }

    // Save comparison
    const comparison = await prisma.comparison.create({
      data: {
        parameters: JSON.stringify({
          amount: params.amount,
          transactionType: params.transactionType,
        }),
        result: JSON.stringify({
          services: enhancedServices,
          summary,
        }),
      },
    })

    // Create comparison service relationships
    for (const service of services) {
      await prisma.comparisonService.create({
        data: {
          comparisonId: comparison.id,
          serviceId: service.id,
        },
      })
    }

    return NextResponse.json({
      comparisonId: comparison.id,
      services: enhancedServices,
      summary,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error comparing services:', error)
    return NextResponse.json(
      { error: 'Failed to compare services' },
      { status: 500 }
    )
  }
}