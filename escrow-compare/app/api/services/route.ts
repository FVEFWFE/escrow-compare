import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCachedData, setCachedData } from '@/lib/redis'
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

    // Try to get from cache
    const cacheKey = `services:${JSON.stringify(params)}`
    const cached = await getCachedData(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

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
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
        { headquarters: { contains: params.search, mode: 'insensitive' } },
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
          where.jurisdictions = { hasSome: ['USA', 'EU', 'UK', 'Asia'] }
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

    // Calculate average ratings
    const servicesWithRatings = services.map(service => ({
      ...service,
      avgRating: service.reviews.length
        ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
        : 0,
      reviewCount: service.reviews.length,
      currentMetrics: service.metrics[0] || null,
    }))

    const response = {
      services: servicesWithRatings,
      total,
      limit: params.limit,
      offset: params.offset,
      hasMore: params.offset + params.limit < total,
    }

    // Cache the response
    await setCachedData(cacheKey, response, 60) // Cache for 1 minute

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}