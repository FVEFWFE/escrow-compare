import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function ComparisonMatrix() {
  const services = ["Escrow.com", "Escrow Europe", "PaymentCloud", "SecureEscrow Pro", "TrustGuard"]

  const factors = [
    { name: "Base Fee Rate", values: ["0.89%", "1.2%", "0.95%", "0.75%", "1.1%"] },
    { name: "Minimum Transaction", values: ["$500", "$1,000", "$100", "$2,500", "$250"] },
    { name: "Maximum Transaction", values: ["$10M", "$5M", "$1M", "$50M", "$2M"] },
    { name: "Processing Time", values: ["3-5 days", "2-4 days", "1-3 days", "4-6 days", "3-7 days"] },
    { name: "API Available", values: [true, false, true, true, false] },
    { name: "Mobile App", values: [true, true, false, false, true] },
    { name: "Multi-Currency", values: [true, true, false, true, false] },
    { name: "Crypto Support", values: [false, false, true, false, false] },
    { name: "White Label", values: [false, true, false, true, false] },
    { name: "Bulk Transactions", values: [true, false, false, true, false] },
    { name: "24/7 Support", values: [true, false, true, true, false] },
    { name: "Insurance Coverage", values: [true, true, false, true, true] },
    { name: "Dispute Resolution", values: [true, true, true, true, true] },
    { name: "Fraud Protection", values: [true, true, true, true, true] },
    { name: "Domain Specialist", values: [true, false, false, false, true] },
  ]

  const renderValue = (value: any, index: number) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-4 w-4 text-emerald-600 mx-auto" />
      ) : (
        <X className="h-4 w-4 text-red-500 mx-auto" />
      )
    }
    return <span className="text-sm">{value}</span>
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Detailed Comparison Matrix</h2>
          <p className="text-lg text-slate-600">Compare 15+ key factors across all major escrow services</p>
        </div>

        <Card className="gradient-card overflow-hidden">
          <CardHeader>
            <CardTitle>Service Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {services.map((service, index) => (
                      <th key={index} className="text-center p-4 font-semibold min-w-32">
                        {service}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factors.map((factor, factorIndex) => (
                    <tr key={factorIndex} className={factorIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-4 font-medium text-slate-900">{factor.name}</td>
                      {factor.values.map((value, valueIndex) => (
                        <td key={valueIndex} className="p-4 text-center">
                          {renderValue(value, valueIndex)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-sm">Not Available</span>
          </div>
          <div className="text-sm text-slate-500">Last updated: December 8, 2025</div>
        </div>
      </div>
    </section>
  )
}
