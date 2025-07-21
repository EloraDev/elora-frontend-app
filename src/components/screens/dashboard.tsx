"use client"

import { useState } from "react"
import { Camera, TrendingUp, Shield, Clock, AlertCircle, ChevronRight, Heart, Award, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

interface DashboardProps {
  onNavigateToScan: () => void
}

export function Dashboard({ onNavigateToScan }: DashboardProps) {
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  })

  const recentAnalyses = [
    {
      id: 1,
      condition: "Melanocytic nevus",
      date: "2 days ago",
      confidence: 91,
      status: "benign",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      condition: "Seborrheic keratosis",
      date: "1 week ago",
      confidence: 85,
      status: "benign",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const healthTips = [
    {
      title: "Daily Sun Protection",
      description: "Apply SPF 30+ sunscreen daily, even on cloudy days",
      icon: Shield,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Monthly Self-Checks",
      description: "Examine your skin monthly for any changes or new spots",
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Stay Hydrated",
      description: "Drink plenty of water to keep your skin healthy and moisturized",
      icon: Heart,
      color: "bg-green-100 text-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{greeting}!</h1>
              <p className="text-gray-600">How's your skin health today?</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Quick Scan CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Quick Skin Scan</h3>
                <p className="text-blue-100 text-sm">Get instant AI analysis of your skin</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <Button
              onClick={onNavigateToScan}
              className="w-full mt-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Start Scan
            </Button>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-600">Total Scans</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">89%</div>
              <div className="text-xs text-gray-600">Avg Confidence</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="w-10 h-10 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-xs text-gray-600">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Analyses</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={analysis.image || "/placeholder.svg"}
                  alt="Analysis"
                  className="w-12 h-12 object-cover rounded-lg border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">{analysis.condition}</h4>
                  <p className="text-xs text-gray-600">{analysis.date}</p>
                  <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-700">
                    {analysis.confidence}% confidence
                  </Badge>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span>Daily Health Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tip.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">{tip.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h4 className="font-medium text-red-900 mb-1">When to See a Doctor</h4>
                <p className="text-red-700 text-xs leading-relaxed">
                  If you notice rapid changes, bleeding, irregular borders, or multiple colors in a mole, consult a
                  dermatologist immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
