'use client'

import { useEffect, useState } from 'react'
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react'

interface MetricData {
  responseTime: number
  uptime: number
  activeTransactions: number
  volume24h: number
  trend: 'up' | 'down' | 'stable'
}

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    responseTime: 12,
    uptime: 99.9,
    activeTransactions: 1247,
    volume24h: 48500000,
    trend: 'up',
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        responseTime: Math.max(5, prev.responseTime + (Math.random() - 0.5) * 2),
        uptime: Math.min(100, Math.max(99, prev.uptime + (Math.random() - 0.5) * 0.1)),
        activeTransactions: Math.floor(prev.activeTransactions + (Math.random() - 0.3) * 50),
        volume24h: prev.volume24h + Math.random() * 100000,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Live Platform Metrics</h2>
          <p className="mt-2 text-gray-600">Real-time performance across all services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.responseTime.toFixed(0)} min
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${100 - metrics.responseTime}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {metrics.responseTime < 15 ? 'Excellent' : metrics.responseTime < 25 ? 'Good' : 'Slow'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Platform Uptime</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600">Live</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.uptime.toFixed(2)}%
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.uptime}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Transactions</span>
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.activeTransactions.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className={`h-3 w-3 ${
                metrics.trend === 'up' ? 'text-green-600' : 
                metrics.trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`} />
              <span className="text-xs text-gray-600">
                {metrics.trend === 'up' ? '+12%' : metrics.trend === 'down' ? '-5%' : '0%'} vs yesterday
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">24h Volume</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${(metrics.volume24h / 1000000).toFixed(1)}M
            </p>
            <div className="flex gap-1 mt-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Escrow.com: 28%
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                SecureHold: 9%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}