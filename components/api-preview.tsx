import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, ExternalLink, Book } from "lucide-react"

export function ApiPreview() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/services",
      description: "List all escrow services with current rates",
    },
    {
      method: "GET",
      path: "/api/services/{id}/fees",
      description: "Calculate fees for specific service and amount",
    },
    {
      method: "GET",
      path: "/api/compare",
      description: "Compare multiple services side-by-side",
    },
    {
      method: "GET",
      path: "/api/status",
      description: "Real-time service availability status",
    },
  ]

  const codeExample = `// Calculate fees across all services
const response = await fetch('https://api.escrowcompare.io/api/services/fees', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 10000,
    type: 'real-estate',
    location: 'us'
  })
});

const fees = await response.json();
console.log(fees.services); // Array of services with calculated fees`

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Developer API</h2>
          <p className="text-lg text-slate-600">Integrate escrow comparison data directly into your applications</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Endpoints */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Available Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge
                        className={`${
                          endpoint.method === "GET" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-slate-600">{endpoint.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-4">
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Book className="mr-2 h-4 w-4" />
                  Full Documentation
                </Button>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Try in Postman
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-slate-100">
                  <code>{codeExample}</code>
                </pre>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Rate Limit</span>
                  <span className="text-sm font-medium">1000 requests/hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Response Format</span>
                  <span className="text-sm font-medium">JSON</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Authentication</span>
                  <span className="text-sm font-medium">API Key</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-900 hover:bg-blue-800">Get Free API Key</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
