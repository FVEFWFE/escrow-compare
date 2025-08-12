'use client'

import { useState, useEffect } from 'react'
import { ComparisonTable } from '@/components/ComparisonTable'
import { Search, Plus, X } from 'lucide-react'

export default function ComparePage() {
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?limit=50')
      const data = await response.json()
      setServices(data.services)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = services.filter((service: any) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId)
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 services at a time')
        return prev
      }
      return [...prev, serviceId]
    })
  }

  const selectedServiceData = services.filter((s: any) => 
    selectedServices.includes(s.id)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Compare Escrow Services</h1>
          <p className="mt-2 text-gray-600">
            Select up to 4 services to compare side-by-side
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Select Services</h2>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Selected Services */}
              {selectedServices.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Selected ({selectedServices.length}/4)
                  </p>
                  <div className="space-y-2">
                    {selectedServiceData.map((service: any) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between bg-white p-2 rounded"
                      >
                        <span className="text-sm">{service.name}</span>
                        <button
                          onClick={() => toggleService(service.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500">Loading services...</p>
                ) : (
                  filteredServices.map((service: any) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      disabled={selectedServices.includes(service.id)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedServices.includes(service.id)
                          ? 'bg-blue-100 border-blue-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      } ${
                        selectedServices.length >= 4 && !selectedServices.includes(service.id)
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{service.name}</p>
                          <p className="text-xs text-gray-600">
                            Trust Score: {service.trustScore}
                          </p>
                        </div>
                        {!selectedServices.includes(service.id) && (
                          <Plus className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-2">
            <ComparisonTable 
              initialServices={selectedServiceData}
              maxCompare={4}
            />
          </div>
        </div>
      </div>
    </div>
  )
}