import Link from 'next/link'
import { ArrowRight, BarChart3, Calculator, Shield } from 'lucide-react'

export function ComparisonCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Escrow Service?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Compare fees, features, and trust scores side-by-side. Our comprehensive comparison tool 
            helps you make informed decisions with confidence.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <BarChart3 className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Side-by-Side Comparison</h3>
              <p className="text-sm opacity-80">Compare up to 4 services simultaneously</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Calculator className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Real-Time Fee Calculator</h3>
              <p className="text-sm opacity-80">Calculate exact fees for your transaction</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Shield className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Trust Score Analysis</h3>
              <p className="text-sm opacity-80">Detailed breakdown of security metrics</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Comparing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-all"
            >
              Try Fee Calculator
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center space-x-2 text-sm opacity-80">
            <Shield className="h-4 w-4" />
            <span>100% Independent • No Hidden Affiliations • Data-Driven Rankings</span>
          </div>
        </div>
      </div>
    </section>
  )
}