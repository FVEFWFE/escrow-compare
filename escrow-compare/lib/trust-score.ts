import { EscrowService, Review } from '@prisma/client'

interface TrustScoreFactors {
  yearsInBusiness: number
  disputeResolution: number
  responseTime: number
  userRatings: number
  insurance: number
  transparency: number
  volume: number
  features: number
}

interface TrustScoreResult {
  score: number
  breakdown: TrustScoreFactors
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  confidence: 'High' | 'Medium' | 'Low'
}

export function calculateTrustScore(
  service: EscrowService & { reviews?: Review[] }
): TrustScoreResult {
  const currentYear = new Date().getFullYear()
  const yearsInBusiness = currentYear - service.foundedYear

  // Calculate average rating from reviews
  const avgRating = service.reviews?.length
    ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
    : 3.5

  // Calculate individual factors
  const factors: TrustScoreFactors = {
    // Years in business (max 20 points)
    yearsInBusiness: Math.min(yearsInBusiness * 1.5, 20),
    
    // Dispute resolution rate (max 25 points)
    disputeResolution: service.disputeWinRate * 25,
    
    // Response time (max 15 points)
    responseTime: Math.max(0, 15 - (service.avgResponseTime / 4)),
    
    // User ratings (max 20 points)
    userRatings: (avgRating / 5) * 20,
    
    // Insurance coverage (max 10 points)
    insurance: service.insuranceAmount 
      ? Math.min((service.insuranceAmount / 1000000) * 2, 10) 
      : 0,
    
    // Transparency & features (max 5 points)
    transparency: (service.apiAvailable ? 2.5 : 0) + 
                 (service.verificationLevel === 'High' || service.verificationLevel === 'Very High' ? 2.5 : 1),
    
    // Transaction volume (max 3 points)
    volume: Math.min((service.totalVolume / 1000000000) * 0.5, 3),
    
    // Feature richness (max 2 points)
    features: Math.min(service.features.length * 0.2, 2),
  }

  // Calculate total score
  const totalScore = Object.values(factors).reduce((sum, val) => sum + val, 0)
  const score = Math.min(Math.round(totalScore), 100)

  // Determine grade
  let grade: TrustScoreResult['grade']
  if (score >= 95) grade = 'A+'
  else if (score >= 90) grade = 'A'
  else if (score >= 80) grade = 'B'
  else if (score >= 70) grade = 'C'
  else if (score >= 60) grade = 'D'
  else grade = 'F'

  // Determine confidence level based on data completeness
  let confidence: TrustScoreResult['confidence']
  const reviewCount = service.reviews?.length || 0
  if (reviewCount >= 50 && yearsInBusiness >= 3) {
    confidence = 'High'
  } else if (reviewCount >= 20 || yearsInBusiness >= 2) {
    confidence = 'Medium'
  } else {
    confidence = 'Low'
  }

  return {
    score,
    breakdown: factors,
    grade,
    confidence,
  }
}

export function getTrustScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600'
  if (score >= 80) return 'text-yellow-600'
  if (score >= 70) return 'text-orange-600'
  return 'text-red-600'
}

export function getTrustScoreBadgeColor(score: number): string {
  if (score >= 90) return 'bg-green-100 text-green-800 border-green-200'
  if (score >= 80) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  if (score >= 70) return 'bg-orange-100 text-orange-800 border-orange-200'
  return 'bg-red-100 text-red-800 border-red-200'
}