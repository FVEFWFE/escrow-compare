import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, CheckCircle } from "lucide-react"

export function VerifiedBadges() {
  const badges = [
    {
      name: "Licensed & Regulated",
      description: "Verified state and federal licensing",
      icon: Shield,
      services: 28,
    },
    {
      name: "Insurance Coverage",
      description: "Professional liability insurance verified",
      icon: Award,
      services: 24,
    },
    {
      name: "Security Audited",
      description: "Annual third-party security audits",
      icon: CheckCircle,
      services: 22,
    },
  ]

  const certifications = [
    "SOC 2 Type II Compliant",
    "PCI DSS Level 1",
    "ISO 27001 Certified",
    "GDPR Compliant",
    "CCPA Compliant",
    "FINTRAC Registered",
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">"Verified by EscrowCompare" Standards</h2>
          <p className="text-lg text-slate-600">
            Our rigorous verification process ensures only the most trustworthy services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {badges.map((badge, index) => (
            <Card key={index} className="gradient-card text-center">
              <CardHeader>
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <badge.icon className="h-8 w-8 text-blue-900" />
                </div>
                <CardTitle className="text-xl">{badge.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{badge.description}</p>
                <Badge className="bg-emerald-100 text-emerald-800">{badge.services} Services Verified</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Verification Process */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Our Verification Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Required Certifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="justify-center p-2">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Verification Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span>License verification with regulatory bodies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span>Financial stability and insurance review</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span>Security audit and compliance check</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <span>Ongoing monitoring and annual review</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
