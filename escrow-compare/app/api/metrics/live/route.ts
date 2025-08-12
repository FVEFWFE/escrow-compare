import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCachedData, setCachedData } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Try to get from cache first
    const cacheKey = 'metrics:live'
    const cached = await getCachedData(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Get latest metrics for all services
    const [
      latestMetrics,
      marketData,
      activeTransactions,
      topServices,
    ] = await Promise.all([
      // Get latest metric for each service
      prisma.serviceMetric.findMany({
        distinct: ['serviceId'],
        orderBy: { timestamp: 'desc' },
        take: 30,
        include: {
          service: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      }),
      // Get latest market data
      prisma.marketData.findFirst({
        orderBy: { date: 'desc' },
      }),
      // Count recent transactions
      prisma.feeCalculation.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
      // Get top services by volume
      prisma.escrowService.findMany({
        orderBy: { totalVolume: 'desc' },
        take: 5,
        select: {
          name: true,
          slug: true,
          totalVolume: true,
          marketShare: true,
        },
      }),
    ])

    // Calculate aggregate metrics
    const avgResponseTime = latestMetrics.length
      ? latestMetrics.reduce((sum, m) => sum + m.responseTime, 0) / latestMetrics.length
      : 18

    const avgUptime = latestMetrics.length
      ? latestMetrics.reduce((sum, m) => sum + m.uptime, 0) / latestMetrics.length
      : 99.5

    const totalActiveUsers = latestMetrics.reduce((sum, m) => sum + m.activeUsers, 0)

    // Add some randomization for demo purposes (simulating live data)
    const liveMetrics = {
      timestamp: new Date().toISOString(),
      aggregate: {
        avgResponseTime: Math.round(avgResponseTime + (Math.random() - 0.5) * 2),
        avgUptime: Math.round(avgUptime * 100) / 100,
        totalActiveUsers: totalActiveUsers + Math.floor(Math.random() * 100),
        activeTransactions: activeTransactions + Math.floor(Math.random() * 50),
        volume24h: marketData?.totalVolume || 48500000,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
      },
      services: latestMetrics.map(metric => ({
        serviceId: metric.serviceId,
        serviceName: metric.service.name,
        serviceSlug: metric.service.slug,
        responseTime: metric.responseTime + Math.floor((Math.random() - 0.5) * 5),
        uptime: Math.min(100, Math.max(95, metric.uptime + (Math.random() - 0.5) * 0.5)),
        activeUsers: metric.activeUsers + Math.floor(Math.random() * 20),
        volume: metric.volume,
        successRate: metric.successRate,
        status: metric.uptime > 99 ? 'operational' : metric.uptime > 95 ? 'degraded' : 'down',
      })),
      topServices: topServices.map(service => ({
        name: service.name,
        slug: service.slug,
        marketShare: service.marketShare,
        volume: service.totalVolume,
      })),
      marketTrends: marketData?.trends || {
        cryptoGrowth: 15,
        crossBorderGrowth: 12,
        b2bGrowth: 8,
      },
    }

    // Cache for 10 seconds (since it's "live" data)
    await setCachedData(cacheKey, liveMetrics, 10)

    return NextResponse.json(liveMetrics)
  } catch (error) {
    console.error('Error fetching live metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live metrics' },
      { status: 500 }
    )
  }
}

// WebSocket endpoint for real-time updates (optional)
export async function POST(request: NextRequest) {
  // This would typically set up a WebSocket connection
  // For now, return instructions on how to connect
  return NextResponse.json({
    message: 'WebSocket endpoint',
    instructions: 'Connect to wss://escrowcompare.io/api/metrics/live/ws for real-time updates',
    supported: false, // Not implemented in this demo
  })
}