"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, Shield, Clock } from "lucide-react"

export function HeroSection() {
  const [transactionAmount, setTransactionAmount] = useState("")
  const [serviceType, setServiceType] = useState("")

  return (
    <section className="gradient-hero text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Compare 30+ Escrow Services
            <span className="block text-emerald-400">Instantly</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Find the perfect escrow service for your transaction. Compare fees, processing times, and features across
            verified providers in real-time.
          </p>
        </div>

        {/* Quick Comparison Tool */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Quick Comparison Tool</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Transaction Amount</label>
              <Input
                type="text"
                placeholder="$10,000"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select type" />
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
              <Select>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
            <Search className="mr-2 h-5 w-5" />
            Compare Services Now
          </Button>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
            <p className="text-blue-100">Live fee updates and processing times from all major providers</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
            <p className="text-blue-100">Only licensed and verified escrow services in our database</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-blue-100">Compare all options in minutes instead of hours of research</p>
          </div>
        </div>
      </div>
    </section>
  )
}
