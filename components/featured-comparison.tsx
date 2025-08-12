import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Shield, DollarSign } from "lucide-react"

export function FeaturedComparison() {
  const services = [
    {
      name: "Escrow.com",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 4.8,
      fee: "0.89%",
      processingTime: "3-5 days",
      disputeRate: "0.2%",
      minTransaction: "$500",
      features: ["Licensed", "API Available", "Mobile App"],
      badge: "Most Popular",
    },
    {
      name: "Escrow Europe",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 4.6,
      fee: "1.2%",
      processingTime: "2-4 days",
      disputeRate: "0.3%",
      minTransaction: "$1,000",
      features: ["EU Licensed", "Multi-Currency", "White Label"],
      badge: "Best for Europe",
    },
    {
      name: "PaymentCloud Escrow",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 4.5,
      fee: "0.95%",
      processingTime: "1-3 days",
      disputeRate: "0.4%",
      minTransaction: "$100",
      features: ["Fast Processing", "Low Minimum", "Crypto Support"],
      badge: "Fastest",
    },
    {
      name: "SecureEscrow Pro",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 4.7,
      fee: "0.75%",
      processingTime: "4-6 days",
      disputeRate: "0.1%",
      minTransaction: "$2,500",
      features: ["Enterprise", "Bulk Transactions", "24/7 Support"],
      badge: "Enterprise",
    },
    {
      name: "TrustGuard Escrow",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 4.4,
      fee: "1.1%",
      processingTime: "3-7 days",
      disputeRate: "0.5%",
      minTransaction: "$250",
      features: ["Insurance", "Domain Specialist", "Fraud Protection"],
      badge: "Most Secure",
    },
  ]

  return (
    <section id="compare" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Top 5 Escrow Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Compare the most popular escrow services based on fees, processing time, and user ratings.
            <span className="block text-sm mt-2 text-slate-500">Last updated: December 8, 2025 at 2:30 PM EST</span>
          </p>
        </div>

        <div className="grid gap-6">
          {services.map((service, index) => (
            <Card key={index} className="gradient-card border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={service.logo || "/placeholder.svg"} alt={service.name} className="h-10" />
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{service.rating}</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {service.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <div>
                      <div className="text-sm text-slate-600">Fee</div>
                      <div className="font-semibold text-emerald-600">{service.fee}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-sm text-slate-600">Processing</div>
                      <div className="font-semibold">{service.processingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-amber-600" />
                    <div>
                      <div className="text-sm text-slate-600">Dispute Rate</div>
                      <div className="font-semibold text-amber-600">{service.disputeRate}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Minimum</div>
                    <div className="font-semibold">{service.minTransaction}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
            View All 30+ Services
          </Button>
        </div>
      </div>
    </section>
  )
}
