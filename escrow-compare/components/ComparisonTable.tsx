'use client'

import { Check, X, Star, Download, Filter } from 'lucide-react'

interface ComparisonTableProps {
  initialServices?: any[]
  maxCompare?: number
}

export function ComparisonTable({ 
  initialServices = [], 
  maxCompare = 4 
}: ComparisonTableProps) {
  const features = [
    { key: 'trustScore', label: 'Trust Score', type: 'score' },
    { key: 'avgResponseTime', label: 'Avg Response Time', type: 'time' },
    { key: 'minTransaction', label: 'Min Transaction', type: 'currency' },
    { key: 'maxTransaction', label: 'Max Transaction', type: 'currency' },
    { key: 'disputeWinRate', label: 'Dispute Win Rate', type: 'percentage' },
    { key: 'apiAvailable', label: 'API Available', type: 'boolean' },
    { key: 'instantTransfer', label: 'Instant Transfer', type: 'boolean' },
    { key: 'cryptoSupported', label: 'Crypto Supported', type: 'boolean' },
    { key: 'insuranceAmount', label: 'Insurance', type: 'currency' },
  ]

  const renderValue = (service: any, feature: any) => {
    const value = service[feature.key]

    switch (feature.type) {
      case 'score':
        return (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{value}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(value / 20)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )
      case 'boolean':
        return value ? (
          <Check className="h-5 w-5 text-green-600" />
        ) : (
          <X className="h-5 w-5 text-red-600" />
        )
      case 'currency':
        return value ? `$${value.toLocaleString()}` : 'N/A'
      case 'time':
        return `${value} min`
      case 'percentage':
        return `${(value * 100).toFixed(0)}%`
      default:
        return String(value || 'N/A')
    }
  }

  if (initialServices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Selected</h3>
        <p className="text-gray-600">
          Select services from the list to start comparing
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Service Comparison</h2>
            <p className="text-sm text-gray-600 mt-1">
              Comparing {initialServices.length} services
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
              {initialServices.map(service => (
                <th key={service.id} className="text-center py-3 px-4">
                  <div>
                    <p className="font-semibold">{service.name}</p>
                    {service.badge && (
                      <span className="mt-1 inline-block px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(feature => (
              <tr key={feature.key} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">{feature.label}</p>
                </td>
                {initialServices.map(service => (
                  <td key={service.id} className="text-center py-3 px-4">
                    {renderValue(service, feature)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}