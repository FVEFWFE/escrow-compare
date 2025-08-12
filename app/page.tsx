import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustIndicators } from "@/components/trust-indicators"
import { FeaturedComparison } from "@/components/featured-comparison"
import { FeeCalculator } from "@/components/fee-calculator"
import { ComparisonMatrix } from "@/components/comparison-matrix"
import { ResponseTracker } from "@/components/response-tracker"
import { JurisdictionMap } from "@/components/jurisdiction-map"
import { StatsDashboard } from "@/components/stats-dashboard"
import { VerifiedBadges } from "@/components/verified-badges"
import { ApiPreview } from "@/components/api-preview"
import { Testimonials } from "@/components/testimonials"
import { NewsUpdates } from "@/components/news-updates"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <HeroSection />
        <TrustIndicators />
        <FeaturedComparison />
        <FeeCalculator />
        <ComparisonMatrix />
        <ResponseTracker />
        <JurisdictionMap />
        <StatsDashboard />
        <VerifiedBadges />
        <ApiPreview />
        <Testimonials />
        <NewsUpdates />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
