import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, AlertCircle, ExternalLink } from "lucide-react"

export function NewsUpdates() {
  const news = [
    {
      title: "New EU Regulations Impact Escrow Services",
      summary: "Updated MiFID II requirements now in effect for European escrow providers.",
      date: "2025-12-07",
      category: "Regulation",
      impact: "high",
      readTime: "3 min read",
    },
    {
      title: "Escrow.com Reduces Fees by 15%",
      summary: "Market leader announces competitive pricing changes effective January 2025.",
      date: "2025-12-06",
      category: "Pricing",
      impact: "medium",
      readTime: "2 min read",
    },
    {
      title: "Cryptocurrency Escrow Services Growing",
      summary: "Three new providers now offer Bitcoin and Ethereum transaction support.",
      date: "2025-12-05",
      category: "Technology",
      impact: "medium",
      readTime: "4 min read",
    },
    {
      title: "Q4 2024 Market Report Released",
      summary: "Transaction volumes up 23% year-over-year, average fees down 8%.",
      date: "2025-12-04",
      category: "Market Data",
      impact: "low",
      readTime: "5 min read",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-4 w-4" />
      case "medium":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Industry News & Updates</h2>
          <p className="text-lg text-slate-600">Stay informed about the latest developments in the escrow industry</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {news.map((article, index) => (
            <Card key={index} className="gradient-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getImpactColor(article.impact)}>
                    <span className="flex items-center space-x-1">
                      {getImpactIcon(article.impact)}
                      <span className="capitalize">{article.impact} Impact</span>
                    </span>
                  </Badge>
                  <span className="text-sm text-slate-500">{article.readTime}</span>
                </div>
                <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-slate-500">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-800">
                    Read More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white bg-transparent"
          >
            View All News & Updates
          </Button>
        </div>
      </div>
    </section>
  )
}
