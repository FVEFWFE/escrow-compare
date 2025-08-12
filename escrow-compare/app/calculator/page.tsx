'use client'

import { FeeCalculator } from '@/components/FeeCalculator'
import { Calculator, Info, DollarSign, TrendingDown } from 'lucide-react'

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Escrow Fee Calculator</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Calculate and compare fees across 30+ escrow services instantly. 
              Find the most cost-effective option for your transaction.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <FeeCalculator />
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* How it Works */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">How It Works</h3>
              </div>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex">
                  <span className="font-semibold mr-2">1.</span>
                  Enter your transaction amount and currency
                </li>
                <li className="flex">
                  <span className="font-semibold mr-2">2.</span>
                  Select transaction type (standard, international, crypto)
                </li>
                <li className="flex">
                  <span className="font-semibold mr-2">3.</span>
                  Get instant fee comparisons from all services
                </li>
                <li className="flex">
                  <span className="font-semibold mr-2">4.</span>
                  See potential savings and choose the best option
                </li>
              </ol>
            </div>

            {/* Fee Types */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Common Fee Structures</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">Percentage Fee</h4>
                  <p className="text-xs text-gray-600">Usually 1-4% of transaction amount</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900">Minimum Fee</h4>
                  <p className="text-xs text-gray-600">Fixed minimum charge regardless of amount</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900">International Fee</h4>
                  <p className="text-xs text-gray-600">Additional charges for cross-border transactions</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900">Crypto Fee</h4>
                  <p className="text-xs text-gray-600">Special rates for cryptocurrency transactions</p>
                </div>
              </div>
            </div>

            {/* Savings Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-900">Savings Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Compare multiple services before committing
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Consider crypto options for lower fees
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Check for business accounts if you're a frequent user
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Look for services with fee caps on large transactions
                </li>
              </ul>
            </div>

            {/* SecureHold Highlight */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-purple-900">Featured Service</h3>
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                  Rising Star 2024
                </span>
              </div>
              <p className="text-sm text-purple-800 mb-3">
                <strong>SecureHold Escrow</strong> offers competitive rates with instant crypto support 
                and smart contract integration.
              </p>
              <ul className="space-y-1 text-xs text-purple-700">
                <li>• 2.5% + $15 standard fee</li>
                <li>• 20% discount on crypto transactions</li>
                <li>• No hidden fees</li>
                <li>• 12 min average response time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}