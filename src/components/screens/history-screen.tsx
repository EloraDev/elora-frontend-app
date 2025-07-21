"use client"

import { useState } from "react"
import { Calendar, Eye, Clock, TrendingUp, Filter, Search, MoreVertical, Download, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Mock history data
  const mockHistory = [
    {
      id: 1,
      date: "2024-01-15T10:30:00Z",
      diagnosis: "Melanocytic nevus",
      confidence: 0.91,
      image: "/placeholder.svg?height=60&width=60",
      status: "benign",
      symptoms: "Small dark spot, no changes",
    },
    {
      id: 2,
      date: "2024-01-10T14:20:00Z",
      diagnosis: "Seborrheic keratosis",
      confidence: 0.85,
      image: "/placeholder.svg?height=60&width=60",
      status: "benign",
      symptoms: "Rough, waxy patch",
    },
    {
      id: 3,
      date: "2024-01-05T09:15:00Z",
      diagnosis: "Dermatofibroma",
      confidence: 0.78,
      image: "/placeholder.svg?height=60&width=60",
      status: "benign",
      symptoms: "Hard bump, slightly raised",
    },
    {
      id: 4,
      date: "2023-12-28T16:45:00Z",
      diagnosis: "Actinic keratosis",
      confidence: 0.82,
      image: "/placeholder.svg?height=60&width=60",
      status: "monitor",
      symptoms: "Scaly, rough patch on arm",
    },
    {
      id: 5,
      date: "2023-12-20T11:30:00Z",
      diagnosis: "Basal cell carcinoma",
      confidence: 0.76,
      image: "/placeholder.svg?height=60&width=60",
      status: "urgent",
      symptoms: "Growing lesion with irregular border",
    },
  ]

  const stats = {
    totalAnalyses: 15,
    thisMonth: 3,
    avgConfidence: 0.84,
    benignCount: 12,
    monitorCount: 2,
    urgentCount: 1,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "benign":
        return "bg-green-100 text-green-700"
      case "monitor":
        return "bg-yellow-100 text-yellow-700"
      case "urgent":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "benign":
        return "✓"
      case "monitor":
        return "⚠"
      case "urgent":
        return "!"
      default:
        return "?"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Analysis History</h1>
            <p className="text-gray-600">Track your skin health journey</p>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search diagnoses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={filterType === "benign" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("benign")}
                className="text-xs"
              >
                Benign
              </Button>
              <Button
                variant={filterType === "monitor" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("monitor")}
                className="text-xs"
              >
                Monitor
              </Button>
              <Button
                variant={filterType === "urgent" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("urgent")}
                className="text-xs"
              >
                Urgent
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalAnalyses}</div>
              <div className="text-xs text-gray-600">Total Scans</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.thisMonth}</div>
              <div className="text-xs text-gray-600">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Health Summary */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Health Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-lg font-bold text-green-600">{stats.benignCount}</div>
                <div className="text-xs text-gray-600">Benign</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-yellow-600">{stats.monitorCount}</div>
                <div className="text-xs text-gray-600">Monitor</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-red-600">{stats.urgentCount}</div>
                <div className="text-xs text-gray-600">Urgent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Recent Analyses</span>
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockHistory.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt="Analysis"
                    className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{item.diagnosis}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        {getStatusIcon(item.status)} {item.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(item.confidence * 100)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border">
                  <p className="text-xs text-gray-600">
                    <strong>Symptoms:</strong> {item.symptoms}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-red-600 bg-transparent">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-gray-900">Export Health Report</h4>
                <p className="text-xs text-gray-600">Download your complete analysis history</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
