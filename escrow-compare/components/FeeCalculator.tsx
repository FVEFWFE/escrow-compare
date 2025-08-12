'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react'

interface FeeResult {
  serviceName: string
  totalFee: number
  percentageFee: number
  fixedFee: number
  savings: number
}

export function FeeCalculator() {
  const [amount, setAmount] = useState<number>(1000)
  const [currency, setCurrency] = useState<string>('USD')
  const [transactionType, setTransactionType] = useState<string>('standard')
  const [results, setResults] = useState<FeeResult[]>([])
  const [loading, setLoading] = useState(false)

  const calculateFees = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, transactionType }),
      })
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Failed to calculate fees:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">Fee Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="standard">Standard</option>
            <option value="international">International</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="business">Business</option>
          </select>
        </div>

        <button
          onClick={calculateFees}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Fees'}
        </button>

        {results.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="font-semibold">Fee Comparison</p>
            </div>

            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{result.serviceName}</p>
                    <p className="text-sm text-gray-600">
                      {result.percentageFee}% + ${result.fixedFee?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${result.totalFee?.toFixed(2)}
                    </p>
                    {result.savings > 0 && (
                      <p className="text-sm text-green-600">
                        Save ${result.savings?.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-900">
                SecureHold Escrow offers competitive rates with instant crypto support
                and smart contract integration for enhanced security.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}