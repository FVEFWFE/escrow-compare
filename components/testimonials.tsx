"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Real Estate Agent",
      company: "Century 21",
      content:
        "EscrowCompare saved me hours of research. I found the perfect escrow service for my client's $2M transaction with fees 30% lower than my usual provider.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Rodriguez",
      role: "Business Broker",
      company: "Rodriguez & Associates",
      content:
        "The fee calculator is incredibly accurate. I use it for every deal to ensure my clients get the best rates. The API integration was seamless.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Jennifer Walsh",
      role: "Domain Investor",
      company: "Walsh Domains",
      content:
        "As someone who does 50+ domain transactions per year, EscrowCompare has become essential. The response time tracker helps me avoid slow services.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      company: "TechFlow Inc",
      content:
        "When selling our company, we needed an escrow service that could handle complex terms. EscrowCompare helped us find one with enterprise features.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-600">
            Trusted by real estate agents, business brokers, and domain investors
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="gradient-card">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <Quote className="h-12 w-12 text-blue-900 flex-shrink-0 mt-2" />
                <div className="flex-1">
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed">"{testimonials[currentIndex].content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">{testimonials[currentIndex].name}</div>
                        <div className="text-sm text-slate-600">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-900" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
