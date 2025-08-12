"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, TrendingUp, FileText, Bell } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setEmail("")
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Weekly analysis of fee trends and market movements",
    },
    {
      icon: FileText,
      title: "Industry Reports",
      description: "Quarterly deep-dive reports on escrow industry changes",
    },
    {
      icon: Bell,
      title: "Service Updates",
      description: "Instant notifications when services change fees or terms",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="gradient-card">
            <CardHeader className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-900" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">Get Weekly Escrow Market Report</CardTitle>
              <p className="text-lg text-slate-600">
                Stay ahead with insider insights, fee changes, and market trends delivered to your inbox
              </p>
            </CardHeader>
            <CardContent>
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                      Subscribe Free
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 text-center mt-3">
                    No spam. Unsubscribe anytime. 12,000+ subscribers trust us.
                  </p>
                </form>
              ) : (
                <div className="text-center mb-8">
                  <div className="bg-emerald-100 text-emerald-800 rounded-lg p-4 max-w-md mx-auto">
                    <strong>Thank you for subscribing!</strong> You'll receive your first report next Tuesday.
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-sm">
                      <benefit.icon className="h-6 w-6 text-blue-900" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
