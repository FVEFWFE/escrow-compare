'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Shield, Clock, Globe, Zap, TrendingUp, Award } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    slug: string
    logo: string
    trustScore: number
    avgResponseTime: number
    cryptoSupported: boolean
    instantTransfer: boolean
    minTransaction: number
    fees: any
    badge?: string
    headquarters: string
    foundedYear: number
    reviews?: { rating: number }[]
  }
  featured?: boolean
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const avgRating = service.reviews?.length
    ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length
    : 0

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 80) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getFeeDisplay = (fees: any) => {
    const buyerFee = fees?.buyer?.percentage || 0
    const minFee = fees?.buyer?.min || 0
    return `${buyerFee}% + $${minFee}`
  }

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 overflow-hidden ${
        featured ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold">
          FEATURED
        </div>
      )}

      {/* Special Badge */}
      {service.badge && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-br-lg text-xs font-semibold flex items-center gap-1">
            <Award className="h-3 w-3" />
            {service.badge}
          </div>
        </div>
      )}

      <Link href={`/services/${service.slug}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {service.logo ? (
                  <Image
                    src={service.logo}
                    alt={service.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <Shield className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-xs text-gray-500">
                  {service.headquarters} • Est. {service.foundedYear}
                </p>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Trust Score</span>
              <span className={`text-2xl font-bold ${getTrustScoreColor(service.trustScore).split(' ')[0]}`}>
                {service.trustScore}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  service.trustScore >= 90 ? 'bg-green-500' :
                  service.trustScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${service.trustScore}%` }}
              />
            </div>
          </div>

          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= avgRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({service.reviews?.length} reviews)
              </span>
            </div>
          )}

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="h-3 w-3 mr-1" />
              {service.avgResponseTime} min response
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Fees: {getFeeDisplay(service.fees)}
            </div>
            {service.cryptoSupported && (
              <div className="flex items-center text-xs text-green-600">
                <Zap className="h-3 w-3 mr-1" />
                Crypto Support
              </div>
            )}
            {service.instantTransfer && (
              <div className="flex items-center text-xs text-green-600">
                <Globe className="h-3 w-3 mr-1" />
                Instant Transfer
              </div>
            )}
          </div>

          {/* Min Transaction */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Min Transaction</span>
              <span className="font-semibold text-gray-900">
                ${service.minTransaction.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors">
              View Details
            </button>
            <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Compare
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}