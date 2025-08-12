import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  sortBy: z.enum(['trustScore', 'name', 'fees', 'responseTime', 'foundedYear']).default('trustScore'),
  order: z.enum(['asc', 'desc']).default('desc'),
  minTrustScore: z.coerce.number().min(0).max(100).optional(),
  cryptoSupported: z.coerce.boolean().optional(),
  instantTransfer: z.coerce.boolean().optional(),
  search: z.string().optional(),
  filter: z.enum(['top-rated', 'crypto', 'business', 'international']).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = querySchema.parse(Object.fromEntries(searchParams))

    // Build where clause
    const where: any = {}
    
    if (params.minTrustScore) {
      where.trustScore = { gte: params.minTrustScore }
    }
    
    if (params.cryptoSupported !== undefined) {
      where.cryptoSupported = params.cryptoSupported
    }
    
    if (params.instantTransfer !== undefined) {
      where.instantTransfer = params.instantTransfer
    }
    
    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { description: { contains: params.search } },
        { headquarters: { contains: params.search } },
      ]
    }

    // Apply filters
    if (params.filter) {
      switch (params.filter) {
        case 'top-rated':
          where.trustScore = { gte: 90 }
          break
        case 'crypto':
          where.cryptoSupported = true
          break
        case 'business':
          where.minTransaction = { gte: 1000 }
          where.apiAvailable = true
          break
        case 'international':
          // For SQLite, we can't use array operations, so we'll filter in memory
          break
      }
    }

    // Fetch services
    const [services, total] = await Promise.all([
      prisma.escrowService.findMany({
        where,
        orderBy: { [params.sortBy]: params.order },
        take: params.limit,
        skip: params.offset,
        include: {
          reviews: {
            select: {
              rating: true,
            },
          },
          metrics: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.escrowService.count({ where }),
    ])

    // Parse JSON strings and calculate average ratings
    const servicesWithParsedData = services.map(service => {
      // Parse JSON strings
      const parsedService = {
        ...service,
        fees: typeof service.fees === 'string' ? JSON.parse(service.fees) : service.fees,
        currencies: typeof service.currencies === 'string' ? JSON.parse(service.currencies) : service.currencies,
        languages: typeof service.languages === 'string' ? JSON.parse(service.languages) : service.languages,
        jurisdictions: typeof service.jurisdictions === 'string' ? JSON.parse(service.jurisdictions) : service.jurisdictions,
        features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
        avgRating: service.reviews.length
          ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
          : 0,
        reviewCount: service.reviews.length,
        currentMetrics: service.metrics[0] || null,
      }

      // Apply international filter if needed
      if (params.filter === 'international') {
        const jurisdictions = parsedService.jurisdictions
        const hasInternational = jurisdictions.some((j: string) => 
          ['USA', 'EU', 'UK', 'Asia'].includes(j)
        )
        if (!hasInternational) return null
      }

      return parsedService
    }).filter(Boolean)

    const response = {
      services: servicesWithParsedData,
      total,
      limit: params.limit,
      offset: params.offset,
      hasMore: params.offset + params.limit < total,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}