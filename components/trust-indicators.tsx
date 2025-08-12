import { Users, Database, Calendar, Award } from "lucide-react"

export function TrustIndicators() {
  const indicators = [
    {
      icon: Users,
      value: "50K+",
      label: "Transactions Analyzed",
      description: "Real transaction data from verified sources",
    },
    {
      icon: Database,
      value: "Real-Time",
      label: "Fee Data",
      description: "Updated every 15 minutes",
    },
    {
      icon: Calendar,
      value: "Since 2021",
      label: "Independent",
      description: "Unbiased comparison platform",
    },
    {
      icon: Award,
      value: "30+",
      label: "Verified Services",
      description: "Licensed and regulated providers",
    },
  ]

  return (
    <section className="bg-white py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <indicator.icon className="h-8 w-8 text-blue-900" />
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">{indicator.value}</div>
              <div className="font-semibold text-slate-900 mb-1">{indicator.label}</div>
              <div className="text-sm text-slate-600">{indicator.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
