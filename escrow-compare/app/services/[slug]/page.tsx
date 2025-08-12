import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { calculateTrustScore, getTrustScoreColor } from '@/lib/trust-score'
import { 
  Shield, Clock, Globe, DollarSign, Star, Users, 
  TrendingUp, Award, CheckCircle, AlertCircle, 
  ArrowRight, ExternalLink, Calendar
} from 'lucide-react'

export async function generateStaticParams() {
  const services = await prisma.escrowService.findMany({
    select: { slug: true }
  })
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await prisma.escrowService.findUnique({
    where: { slug: params.slug }
  })

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.name} Review & Analysis | EscrowCompare.io`,
    description: `Detailed review of ${service.name} - Trust Score: ${service.trustScore}/100. Compare fees, features, and user reviews. ${service.description}`,
    openGraph: {
      title: `${service.name} - Escrow Service Review`,
      description: service.description,
      images: [service.logo],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = await prisma.escrowService.findUnique({
    where: { slug: params.slug },
    include: {
      reviews: {
        orderBy: { date: 'desc' },
        take: 10,
      },
      metrics: {
        orderBy: { timestamp: 'desc' },
        take: 1,
      },
      priceHistory: {
        orderBy: { timestamp: 'desc' },
        take: 6,
      },
    },
  })

  if (!service) {
    notFound()
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

  const avgRating = parsedService.reviews.length
    ? parsedService.reviews.reduce((sum, r) => sum + r.rating, 0) / parsedService.reviews.length
    : 0

  const trustScoreDetails = calculateTrustScore(parsedService)
  const currentMetrics = parsedService.metrics[0]

  // Get competitors for comparison
  const competitors = await prisma.escrowService.findMany({
    where: {
      id: { not: service.id },
      trustScore: {
        gte: service.trustScore - 10,
        lte: service.trustScore + 10,
      },
    },
    take: 3,
    orderBy: { trustScore: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    src={service.logo}
                    alt={service.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  <p className="text-gray-600">{service.headquarters} • Founded {service.foundedYear}</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-6">{service.description}</p>
              
              {service.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" />
                  {service.badge}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={`/compare?services=${service.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Compare with Others
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Trust Score Card */}
            <div className="w-full md:w-80">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score Analysis</h3>
                
                <div className="text-center mb-6">
                  <div className={`text-5xl font-bold ${getTrustScoreColor(service.trustScore)}`}>
                    {service.trustScore}
                  </div>
                  <div className="text-gray-600">out of 100</div>
                  <div className="text-2xl font-semibold text-gray-800 mt-2">
                    {trustScoreDetails.grade}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Years in Business</span>
                    <span className="font-medium">{new Date().getFullYear() - service.foundedYear}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dispute Resolution</span>
                    <span className="font-medium">{(service.disputeWinRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">{service.avgResponseTime} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">User Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {avgRating.toFixed(1)}
                    </span>
                  </div>
                  {service.insuranceAmount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">${(service.insuranceAmount / 1000000).toFixed(1)}M</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">Confidence Level</div>
                  <div className="text-lg font-semibold text-gray-900">{trustScoreDetails.confidence}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Avg Response Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{service.avgResponseTime} min</div>
            {currentMetrics && (
              <div className="text-xs text-green-600 mt-1">
                Current: {currentMetrics.responseTime} min
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Active Users</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {(service.activeUsers / 1000).toFixed(0)}K+
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((service.marketShare || 0)).toFixed(1)}% market share
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Total Volume</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${(service.totalVolume / 1000000000).toFixed(1)}B
            </div>
            {currentMetrics && (
              <div className="text-xs text-gray-500 mt-1">
                24h: ${(currentMetrics.volume / 1000000).toFixed(1)}M
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentMetrics ? (currentMetrics.successRate * 100).toFixed(1) : '99.5'}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Uptime: {currentMetrics ? currentMetrics.uptime.toFixed(1) : '99.9'}%
            </div>
          </div>
        </div>
      </div>

      {/* Features and Fees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="space-y-3">
              {parsedService.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Available</span>
                  {service.apiAvailable ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Instant Transfer</span>
                  {service.instantTransfer ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Crypto Support</span>
                  {service.cryptoSupported ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fees */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Structure</h2>
            <div className="space-y-4">
              {parsedService.fees.buyer && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Buyer Fees</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {parsedService.fees.buyer.percentage}% (min ${parsedService.fees.buyer.min})
                  </div>
                </div>
              )}
              {parsedService.fees.seller && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Seller Fees</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {parsedService.fees.seller.percentage}% (min ${parsedService.fees.seller.min})
                  </div>
                </div>
              )}
              {parsedService.fees.split && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Split Fees</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {parsedService.fees.split.percentage}% (min ${parsedService.fees.split.min})
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Min Transaction</span>
                  <span className="font-medium">${service.minTransaction}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Transaction</span>
                  <span className="font-medium">
                    {service.maxTransaction ? `$${(service.maxTransaction / 1000000).toFixed(1)}M` : 'Unlimited'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
        <div className="space-y-4">
          {parsedService.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{review.title}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    by {review.author} • {review.role} • {review.location}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              <div className="flex gap-6 text-sm">
                {review.pros.length > 0 && (
                  <div>
                    <span className="font-medium text-green-600">Pros:</span>
                    <span className="text-gray-600 ml-2">{review.pros.join(', ')}</span>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <span className="font-medium text-red-600">Cons:</span>
                    <span className="text-gray-600 ml-2">{review.cons.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Services */}
      {competitors.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitors.map((competitor) => (
              <Link
                key={competitor.id}
                href={`/services/${competitor.slug}`}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={competitor.logo}
                      alt={competitor.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{competitor.name}</div>
                    <div className="text-sm text-gray-600">Trust Score: {competitor.trustScore}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{competitor.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}