import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function ResponseTracker() {
  const services = [
    {
      name: "Escrow.com",
      status: "online",
      responseTime: "1.2s",
      uptime: "99.9%",
      lastCheck: "2 min ago",
    },
    {
      name: "Escrow Europe",
      status: "online",
      responseTime: "2.1s",
      uptime: "99.7%",
      lastCheck: "1 min ago",
    },
    {
      name: "PaymentCloud",
      status: "online",
      responseTime: "0.8s",
      uptime: "99.8%",
      lastCheck: "30s ago",
    },
    {
      name: "SecureEscrow Pro",
      status: "slow",
      responseTime: "4.2s",
      uptime: "99.5%",
      lastCheck: "45s ago",
    },
    {
      name: "TrustGuard",
      status: "online",
      responseTime: "1.8s",
      uptime: "99.6%",
      lastCheck: "1 min ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "slow":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-emerald-100 text-emerald-800">Online</Badge>
      case "slow":
        return <Badge className="bg-amber-100 text-amber-800">Slow</Badge>
      default:
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Live Response Time Tracker</h2>
          <p className="text-lg text-slate-600">Real-time monitoring of escrow service availability and performance</p>
        </div>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Service Status Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-sm text-slate-600">Last checked: {service.lastCheck}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Response Time</div>
                      <div className="font-semibold">{service.responseTime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-600">Uptime</div>
                      <div className="font-semibold">{service.uptime}</div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Status updates every 30 seconds • Average response time across all services: 2.0s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
