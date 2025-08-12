'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Shield, TrendingUp, Award, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { value: '30+', label: 'Escrow Services' },
    { value: '$15.8B', label: 'Total Volume' },
    { value: '2.5M+', label: 'Protected Users' },
    { value: '99.9%', label: 'Uptime' },
  ]

  const features = [
    { icon: Shield, text: 'Verified & Trusted', color: 'text-green-600' },
    { icon: TrendingUp, text: 'Real-time Metrics', color: 'text-blue-600' },
    { icon: Award, text: 'Independent Reviews', color: 'text-purple-600' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 mb-6"
          >
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              SecureHold Escrow ranked #3 with 94/100 Trust Score
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Compare <span className="text-blue-600">30+ Escrow Services</span>
            <br />
            Find Your Perfect Match
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Make informed decisions with real-time data, verified reviews, and comprehensive 
            comparisons of the world's leading escrow services.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search escrow services, features, or jurisdictions..."
                className="w-full px-6 py-4 pr-32 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Link
                  href={`/services?q=${searchQuery}`}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/compare"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Comparing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Calculate Fees
            </Link>
          </motion.div>

          {/* Trust Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center space-x-2">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}