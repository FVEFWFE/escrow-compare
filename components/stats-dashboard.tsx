import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Shield } from "lucide-react"

export function StatsDashboard() {
  const stats = [
    {
      title: "Average Fee Rate",
      value: "0.94%",
      change: "-0.05%",
      trend: "down",
      icon: DollarSign,
      description: "Across all services",
    },
    {
      title: "Average Processing Time",
      value: "3.2 days",
      change: "-0.3 days",
      trend: "down",
      icon: Clock,
      description: "Industry average",
    },
    {
      title: "Total Transactions",
      value: "52,847",
      change: "+2,341",
      trend: "up",
      icon: Users,
      description: "This month",
    },
    {
      title: "Success Rate",
      value: "99.7%",
      change: "+0.1%",
      trend: "up",
      icon: Shield,
      description: "Completed successfully",
    },
  ]

  const topPerformers = [
    { name: "SecureEscrow Pro", metric: "Lowest Fees", value: "0.75%" },
    { name: "PaymentCloud", metric: "Fastest Processing", value: "1-3 days" },
    { name: "Escrow.com", metric: "Highest Rating", value: "4.8/5" },
    { name: "TrustGuard", metric: "Best Security", value: "99.9%" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Market Statistics Dashboard</h2>
          <p className="text-lg text-slate-600">Real-time aggregate data across all escrow services</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-8 w-8 text-blue-900" />
                  <div
                    className={`flex items-center text-sm ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.title}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Performers */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Top Performers by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{performer.name}</div>
                    <div className="text-sm text-slate-600">{performer.metric}</div>
                  </div>
                  <div className="text-xl font-bold text-blue-900">{performer.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Trends Chart Placeholder */}
        <Card className="gradient-card mt-8">
          <CardHeader>
            <CardTitle>Market Trends (Last 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 rounded-lg p-8 text-center">
              <img
                src="/placeholder.svg?height=200&width=800"
                alt="Market trends chart"
                className="w-full h-48 object-contain"
              />
              <p className="text-sm text-slate-600 mt-4">Fee trends, transaction volume, and market growth over time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
