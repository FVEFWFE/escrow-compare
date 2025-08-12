import { Shield, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: ["Compare Escrow Services", "Fee Calculator", "API Documentation", "Enterprise Solutions"],
    },
    {
      title: "Resources",
      links: ["How Escrow Works", "Industry Reports", "Market Analysis", "Security Guide"],
    },
    {
      title: "Company",
      links: ["About Us", "Methodology", "Press & Media", "Careers"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
    },
  ]

  const pressLogos = [
    "/placeholder.svg?height=30&width=100",
    "/placeholder.svg?height=30&width=100",
    "/placeholder.svg?height=30&width=100",
    "/placeholder.svg?height=30&width=100",
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EscrowCompare.io</span>
            </div>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              The most comprehensive escrow service comparison platform. Independent, unbiased, and trusted by
              professionals since 2021.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">hello@escrowcompare.io</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">1-800-ESCROW-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Press Mentions */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <h3 className="text-center text-slate-400 text-sm mb-4">As Featured In</h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {pressLogos.map((logo, index) => (
              <img key={index} src={logo || "/placeholder.svg"} alt="Press logo" className="h-6 grayscale" />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © 2025 EscrowCompare.io. All rights reserved.
              <span className="ml-4">Last updated: December 8, 2025 at 2:30 PM EST</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-400">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
