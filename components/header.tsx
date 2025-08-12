"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Compare Services", href: "#compare" },
    { name: "Fee Calculator", href: "#calculator" },
    { name: "How Escrow Works", href: "#how-it-works" },
    { name: "For Businesses", href: "#businesses" },
    { name: "Resources", href: "#resources" },
    { name: "About", href: "#about" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-900 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">EscrowCompare.io</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-blue-900 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-blue-900 hover:bg-blue-800">Start Comparing</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 hover:text-blue-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-blue-900 hover:bg-blue-800 w-full mt-4">Start Comparing</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
