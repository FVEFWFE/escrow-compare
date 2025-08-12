import { Shield, Users, DollarSign, Clock } from 'lucide-react'

interface TrustIndicatorsProps {
  metrics: {
    totalServices: number
    totalReviews: number
    totalVolume: number
    avgResponseTime: number
  }
}

export function TrustIndicators({ metrics }: TrustIndicatorsProps) {
  const indicators = [
    {
      icon: Shield,
      value: metrics.totalServices,
      label: 'Verified Services',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Users,
      value: `${(metrics.totalReviews / 1000).toFixed(1)}k+`,
      label: 'User Reviews',
      color: 'text-green-600 bg-green-50',
    },
    {
      icon: DollarSign,
      value: `$${(metrics.totalVolume / 1000000000).toFixed(1)}B`,
      label: 'Total Volume',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: Clock,
      value: `${metrics.avgResponseTime} min`,
      label: 'Avg Response',
      color: 'text-orange-600 bg-orange-50',
    },
  ]

  return (
    <div className="bg-white py-8 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((indicator) => (
            <div key={indicator.label} className="text-center">
              <div className={`inline-flex p-3 rounded-lg ${indicator.color.split(' ')[1]} mb-2`}>
                <indicator.icon className={`h-6 w-6 ${indicator.color.split(' ')[0]}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{indicator.value}</div>
              <div className="text-sm text-gray-600">{indicator.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}