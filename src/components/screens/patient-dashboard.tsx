"use client"

// import { useState } from "react"
import {
  Camera,
  TrendingUp,
  AlertTriangle,
  Clock,
  Calendar,
  ChevronRight,
  Heart,
  Shield,
  Activity,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

interface PatientDashboardProps {
  user: any
  onNavigateToScan?: () => void
}

export function PatientDashboard({ 
  // user, 
  onNavigateToScan }: PatientDashboardProps) {
  // const [greeting] = useState(() => {
  //   const hour = new Date().getHours()
  //   if (hour < 12) return "Good morning"
  //   if (hour < 17) return "Good afternoon"
  //   return "Good evening"
  // })

  const healthMetrics = {
    totalScans: 15,
    riskScore: 23, // Low risk
    lastScan: "3 days ago",
    nextCheckup: "2024-02-15",
    benignFindings: 14,
    monitoringRequired: 1,
  }

  const recentAnalyses = [
    {
      id: 1,
      condition: "Melanocytic nevus",
      date: "2024-01-15",
      confidence: 91,
      status: "benign",
      bodyPart: "Back",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      condition: "Seborrheic keratosis",
      date: "2024-01-10",
      confidence: 85,
      status: "benign",
      bodyPart: "Arm",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const upcomingReminders = [
    {
      id: 1,
      title: "Monthly Skin Check",
      date: "2024-01-20",
      type: "self-exam",
      icon: Activity,
    },
    {
      id: 2,
      title: "Dermatologist Appointment",
      date: "2024-02-15",
      type: "appointment",
      icon: Calendar,
    },
  ]

  const healthInsights = [
    {
      title: "Excellent Progress",
      description: "Your recent scans show consistent healthy patterns",
      type: "positive",
      icon: Heart,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Sun Protection Reminder",
      description: "Remember to apply SPF 30+ daily for optimal skin health",
      type: "reminder",
      icon: Shield,
      color: "bg-yellow-100 text-yellow-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {/* {greeting}, {user.name.split(" ")[0]}! */}
              </h1>
              <p className="text-gray-600">Your skin health dashboard</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Quick Skin Analysis</h3>
                <p className="text-blue-100 text-sm">Get instant AI-powered diagnosis</p>
                <Button
                  onClick={onNavigateToScan}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold mt-3"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Scan
                </Button>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Overview */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Health Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{healthMetrics.totalScans}</div>
                <div className="text-xs text-gray-600">Total Scans</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{healthMetrics.riskScore}</div>
                <div className="text-xs text-gray-600">Risk Score (Low)</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last scan:</span>
                <span className="font-medium">{healthMetrics.lastScan}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Benign findings:</span>
                <Badge className="bg-green-100 text-green-700">{healthMetrics.benignFindings}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monitoring required:</span>
                <Badge className="bg-yellow-100 text-yellow-700">{healthMetrics.monitoringRequired}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overall Health Score</span>
                <span className="font-medium text-green-600">Excellent</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

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
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <span>{analysis.bodyPart}</span>
                    <span>•</span>
                    <span>{new Date(analysis.date).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-700">
                    {analysis.confidence}% confidence
                  </Badge>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <span>Upcoming Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingReminders.map((reminder) => {
              const Icon = reminder.icon
              return (
                <div
                  key={reminder.id}
                  className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">{reminder.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(reminder.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Set Reminder
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Health Insights */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Health Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthInsights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${insight.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">{insight.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h4 className="font-medium text-red-900 mb-1">Emergency Skin Changes</h4>
                <p className="text-red-700 text-xs leading-relaxed mb-2">
                  If you notice rapid changes, bleeding, or concerning symptoms, contact your healthcare provider
                  immediately.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-100 bg-transparent"
                >
                  Emergency Contacts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
