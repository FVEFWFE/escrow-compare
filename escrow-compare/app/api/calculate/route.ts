import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const calculateSchema = z.object({
  amount: z.number().min(0),
  currency: z.string().default('USD'),
  transactionType: z.enum(['standard', 'international', 'crypto', 'business']).default('standard'),
  fromCountry: z.string().optional(),
  toCountry: z.string().optional(),
  serviceIds: z.array(z.string()).optional(),
})

// Currency conversion rates (simplified - in production, use a real API)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  BTC: 0.000024,
  ETH: 0.00039,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149.50,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const params = calculateSchema.parse(body)

    // Convert amount to USD for calculation
    const amountInUSD = params.amount / (exchangeRates[params.currency] || 1)

    // Get services to calculate fees for
    const whereClause = params.serviceIds?.length
      ? { id: { in: params.serviceIds } }
      : {}

    const services = await prisma.escrowService.findMany({
      where: whereClause,
      take: params.serviceIds?.length || 10,
      orderBy: { trustScore: 'desc' },
    })

    // Calculate fees for each service
    const results = services.map(service => {
      const fees = service.fees as any
      let percentageFee = 0
      let fixedFee = 0
      let totalFee = 0

      // Determine which fee structure to use
      let feeStructure = fees.buyer || fees.standard || { percentage: 3, min: 25 }

      // Apply transaction type modifiers
      switch (params.transactionType) {
        case 'international':
          percentageFee = (feeStructure.percentage || 3) * 1.2 // 20% higher for international
          fixedFee = (feeStructure.min || 25) * 1.5
          break
        case 'crypto':
          if (service.cryptoSupported) {
            percentageFee = (feeStructure.percentage || 3) * 0.8 // 20% discount for crypto
            fixedFee = (feeStructure.min || 25) * 0.8
          } else {
            percentageFee = (feeStructure.percentage || 3) * 1.5 // 50% higher if not supported
            fixedFee = (feeStructure.min || 25) * 1.5
          }
          break
        case 'business':
          percentageFee = (feeStructure.percentage || 3) * 0.9 // 10% discount for business
          fixedFee = (feeStructure.min || 25)
          break
        default:
          percentageFee = feeStructure.percentage || 3
          fixedFee = feeStructure.min || 25
      }

      // Calculate total fee
      const calculatedFee = (amountInUSD * percentageFee) / 100
      totalFee = Math.max(calculatedFee, fixedFee)

      // Apply maximum fee cap if exists
      if (feeStructure.max) {
        totalFee = Math.min(totalFee, feeStructure.max)
      }

      // Check if amount is within service limits
      const isAvailable = 
        amountInUSD >= service.minTransaction &&
        (!service.maxTransaction || amountInUSD <= service.maxTransaction)

      return {
        serviceId: service.id,
        serviceName: service.name,
        serviceSlug: service.slug,
        trustScore: service.trustScore,
        percentageFee,
        fixedFee,
        totalFee: Math.round(totalFee * 100) / 100,
        totalFeeInCurrency: Math.round(totalFee * (exchangeRates[params.currency] || 1) * 100) / 100,
        currency: params.currency,
        isAvailable,
        features: {
          instantTransfer: service.instantTransfer,
          cryptoSupported: service.cryptoSupported,
          apiAvailable: service.apiAvailable,
        },
        responseTime: service.avgResponseTime,
      }
    })

    // Sort by total fee (lowest first)
    results.sort((a, b) => a.totalFee - b.totalFee)

    // Calculate savings compared to most expensive
    const maxFee = Math.max(...results.map(r => r.totalFee))
    const resultsWithSavings = results.map(result => ({
      ...result,
      savings: Math.round((maxFee - result.totalFee) * 100) / 100,
      savingsPercentage: Math.round(((maxFee - result.totalFee) / maxFee) * 100),
    }))

    // Save calculation to database for analytics
    await prisma.feeCalculation.create({
      data: {
        amount: amountInUSD,
        currency: params.currency,
        serviceIds: services.map(s => s.id),
        fromCountry: params.fromCountry,
        toCountry: params.toCountry,
        transactionType: params.transactionType,
        results: resultsWithSavings,
      },
    })

    return NextResponse.json({
      results: resultsWithSavings,
      amount: params.amount,
      currency: params.currency,
      transactionType: params.transactionType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error calculating fees:', error)
    return NextResponse.json(
      { error: 'Failed to calculate fees' },
      { status: 500 }
    )
  }
}