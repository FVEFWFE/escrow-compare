import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin } from "lucide-react"

export function JurisdictionMap() {
  const regions = [
    {
      name: "North America",
      countries: ["United States", "Canada", "Mexico"],
      services: 8,
      regulations: "State & Federal Licensed",
    },
    {
      name: "Europe",
      countries: ["United Kingdom", "Germany", "France", "Netherlands", "Spain"],
      services: 12,
      regulations: "EU MiFID II Compliant",
    },
    {
      name: "Asia Pacific",
      countries: ["Australia", "Singapore", "Hong Kong", "Japan"],
      services: 6,
      regulations: "ASIC & MAS Licensed",
    },
    {
      name: "Other Regions",
      countries: ["Brazil", "South Africa", "UAE"],
      services: 4,
      regulations: "Local Licensing",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Global Jurisdiction Coverage</h2>
          <p className="text-lg text-slate-600">Escrow services available across 40+ countries with proper licensing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* World Map Placeholder */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Coverage Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg p-8 text-center">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="World coverage map"
                  className="w-full h-64 object-contain"
                />
                <p className="text-sm text-slate-600 mt-4">
                  Interactive map showing escrow service availability by region
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Regional Breakdown */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Regional Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {regions.map((region, index) => (
                  <div key={index} className="border-l-4 border-blue-900 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{region.name}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{region.services} Services</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{region.regulations}</p>
                    <div className="flex flex-wrap gap-2">
                      {region.countries.map((country, countryIndex) => (
                        <Badge key={countryIndex} variant="outline" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">40+</div>
              <div className="text-sm text-slate-600">Countries</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">30+</div>
              <div className="text-sm text-slate-600">Licensed Services</div>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">15+</div>
              <div className="text-sm text-slate-600">Currencies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
