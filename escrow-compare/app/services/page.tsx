import { Suspense } from 'react'
import { ServiceCard } from '@/components/ServiceCard'
import { prisma } from '@/lib/prisma'
import { Filter, Search, TrendingUp } from 'lucide-react'

interface ServicesPageProps {
  searchParams: {
    filter?: string
    search?: string
    sort?: string
  }
}

export const metadata = {
  title: 'All Escrow Services - EscrowCompare.io',
  description: 'Browse and compare 30+ verified escrow services. Filter by features, fees, and trust scores.',
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  // Build where clause based on filters
  const where: any = {}
  
  if (searchParams.filter) {
    switch (searchParams.filter) {
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

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  // Determine sort order
  let orderBy: any = { trustScore: 'desc' } // Default
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'fees':
        orderBy = { minTransaction: 'asc' }
        break
      case 'response':
        orderBy = { avgResponseTime: 'asc' }
        break
      case 'newest':
        orderBy = { foundedYear: 'desc' }
        break
    }
  }

  // Fetch services
  const services = await prisma.escrowService.findMany({
    where,
    orderBy,
    include: {
      reviews: {
        select: { rating: true },
      },
    },
  })

  const totalServices = await prisma.escrowService.count()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Escrow Services</h1>
              <p className="mt-2 text-gray-600">
                Compare {totalServices} verified escrow providers
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Updated hourly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton href="/services" active={!searchParams.filter}>
                All Services
              </FilterButton>
              <FilterButton href="/services?filter=top-rated" active={searchParams.filter === 'top-rated'}>
                Top Rated (90+)
              </FilterButton>
              <FilterButton href="/services?filter=crypto" active={searchParams.filter === 'crypto'}>
                Crypto Support
              </FilterButton>
              <FilterButton href="/services?filter=business" active={searchParams.filter === 'business'}>
                Business
              </FilterButton>
              <FilterButton href="/services?filter=international" active={searchParams.filter === 'international'}>
                International
              </FilterButton>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                className="text-sm border-gray-300 rounded-md"
                defaultValue={searchParams.sort || 'trust'}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set('sort', e.target.value)
                  window.location.href = url.toString()
                }}
              >
                <option value="trust">Trust Score</option>
                <option value="name">Name</option>
                <option value="fees">Lowest Fees</option>
                <option value="response">Response Time</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {services.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {services.length} of {totalServices} services
              </p>
              {searchParams.search && (
                <p className="text-sm text-gray-600">
                  Results for "{searchParams.search}"
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
            <a
              href="/services"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Clear filters
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterButton({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
        active
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </a>
  )
}