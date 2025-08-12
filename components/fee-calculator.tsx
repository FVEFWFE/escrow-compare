"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign } from "lucide-react"

export function FeeCalculator() {
  const [amount, setAmount] = useState([10000])
  const [serviceType, setServiceType] = useState("real-estate")
  const [location, setLocation] = useState("us")

  const calculateFees = () => {
    const baseAmount = amount[0]
    const services = [
      { name: "Escrow.com", rate: 0.0089, fee: Math.round(baseAmount * 0.0089) },
      { name: "Escrow Europe", rate: 0.012, fee: Math.round(baseAmount * 0.012) },
      { name: "PaymentCloud", rate: 0.0095, fee: Math.round(baseAmount * 0.0095) },
      { name: "SecureEscrow Pro", rate: 0.0075, fee: Math.round(baseAmount * 0.0075) },
    ]
    return services.sort((a, b) => a.fee - b.fee)
  }

  const fees = calculateFees()

  return (
    <section id="calculator" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Interactive Fee Calculator</h2>
          <p className="text-lg text-slate-600">Calculate and compare escrow fees across all services instantly</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Controls */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Transaction Amount: ${amount[0].toLocaleString()}
                </label>
                <Slider
                  value={amount}
                  onValueChange={setAmount}
                  max={1000000}
                  min={100}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$100</span>
                  <span>$1,000,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="business">Business Sale</SelectItem>
                    <SelectItem value="domain">Domain Transfer</SelectItem>
                    <SelectItem value="vehicle">Vehicle Sale</SelectItem>
                    <SelectItem value="general">General Transaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Fee Results */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Fee Comparison Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fees.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-sm text-slate-600">{(service.rate * 100).toFixed(2)}% fee</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">${service.fee.toLocaleString()}</div>
                      {index === 0 && <div className="text-xs text-emerald-600 font-medium">Lowest Fee</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Savings with lowest fee:</strong> $
                  {(fees[fees.length - 1].fee - fees[0].fee).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
