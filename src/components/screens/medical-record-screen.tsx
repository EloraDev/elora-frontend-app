"use client"

import { useState } from "react"
import { FileText, Search, Download, Eye, Calendar, MapPin, TrendingUp, AlertCircle, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface MedicalRecordsScreenProps {
  user: any
}

export function MedicalRecordsScreen({ user }: MedicalRecordsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)

  const medicalRecords = [
    {
      id: 1,
      date: "2024-01-15T10:30:00Z",
      diagnosis: "Melanocytic nevus",
      confidence: 91,
      status: "benign",
      bodyPart: "Upper back",
      symptoms: "Small dark spot, no changes observed",
      recommendations: "Monitor for changes, routine follow-up in 6 months",
      image: "/placeholder.svg?height=60&width=60",
      doctorNotes: "Typical benign mole characteristics. Patient advised on ABCDE rule.",
      followUpRequired: false,
      riskLevel: "low",
    },
    {
      id: 2,
      date: "2024-01-10T14:20:00Z",
      diagnosis: "Seborrheic keratosis",
      confidence: 85,
      status: "benign",
      bodyPart: "Left arm",
      symptoms: "Rough, waxy patch with irregular surface",
      recommendations: "No treatment required, cosmetic removal optional",
      image: "/placeholder.svg?height=60&width=60",
      doctorNotes: "Classic seborrheic keratosis appearance. No malignant features.",
      followUpRequired: false,
      riskLevel: "low",
    },
    {
      id: 3,
      date: "2024-01-05T09:15:00Z",
      diagnosis: "Actinic keratosis",
      confidence: 78,
      status: "monitor",
      bodyPart: "Face - cheek",
      symptoms: "Scaly, rough patch, sun-exposed area",
      recommendations: "Dermatologist consultation recommended, possible treatment needed",
      image: "/placeholder.svg?height=60&width=60",
      doctorNotes: "Pre-cancerous lesion. Requires monitoring and possible intervention.",
      followUpRequired: true,
      riskLevel: "medium",
    },
    {
      id: 4,
      date: "2023-12-28T16:45:00Z",
      diagnosis: "Dermatofibroma",
      confidence: 82,
      status: "benign",
      bodyPart: "Right leg",
      symptoms: "Hard bump, slightly raised, brown color",
      recommendations: "No treatment necessary, monitor for changes",
      image: "/placeholder.svg?height=60&width=60",
      doctorNotes: "Typical dermatofibroma. Benign fibrous tissue growth.",
      followUpRequired: false,
      riskLevel: "low",
    },
    {
      id: 5,
      date: "2023-12-20T11:30:00Z",
      diagnosis: "Basal cell carcinoma (suspected)",
      confidence: 76,
      status: "urgent",
      bodyPart: "Nose",
      symptoms: "Growing lesion with irregular border, occasional bleeding",
      recommendations: "URGENT: Immediate dermatologist consultation required",
      image: "/placeholder.svg?height=60&width=60",
      doctorNotes: "Suspicious lesion requiring immediate professional evaluation.",
      followUpRequired: true,
      riskLevel: "high",
    },
  ]

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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.bodyPart.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalRecords: medicalRecords.length,
    benignCount: medicalRecords.filter((r) => r.status === "benign").length,
    monitorCount: medicalRecords.filter((r) => r.status === "monitor").length,
    urgentCount: medicalRecords.filter((r) => r.status === "urgent").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600">Complete history of your skin analyses</p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search diagnoses or body parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="benign">Benign</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="diagnosis">Diagnosis</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-2">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{stats.totalRecords}</div>
              <div className="text-xs text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.benignCount}</div>
              <div className="text-xs text-gray-600">Benign</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-yellow-600">{stats.monitorCount}</div>
              <div className="text-xs text-gray-600">Monitor</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">{stats.urgentCount}</div>
              <div className="text-xs text-gray-600">Urgent</div>
            </CardContent>
          </Card>
        </div>

        {/* Medical Records List */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Analysis Records ({filteredRecords.length})</span>
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={record.image || "/placeholder.svg"}
                      alt="Analysis"
                      className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-gray-900 truncate">{record.diagnosis}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{record.bodyPart}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            expandedRecord === record.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusColor(record.status)} variant="secondary">
                          {record.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {record.confidence}% confidence
                        </Badge>
                        <span className={`text-xs font-medium ${getRiskColor(record.riskLevel)}`}>
                          {record.riskLevel} risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRecord === record.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm text-gray-900 mb-1">Symptoms Reported:</h5>
                        <p className="text-xs text-gray-600">{record.symptoms}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm text-gray-900 mb-1">AI Recommendations:</h5>
                        <p className="text-xs text-gray-600">{record.recommendations}</p>
                      </div>

                      {record.doctorNotes && (
                        <div>
                          <h5 className="font-medium text-sm text-gray-900 mb-1">Medical Notes:</h5>
                          <p className="text-xs text-gray-600">{record.doctorNotes}</p>
                        </div>
                      )}

                      {record.followUpRequired && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Follow-up Required</span>
                          </div>
                          <p className="text-xs text-yellow-700 mt-1">
                            This condition requires professional medical evaluation.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        <Download className="w-3 h-3 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Summary */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Health Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Overall Health Status: Good</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Most recent analyses show benign findings. Continue regular monitoring.
              </p>
            </div>

            {stats.urgentCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Action Required</span>
                </div>
                <p className="text-xs text-red-700 mt-1">
                  You have {stats.urgentCount} finding(s) that require immediate medical attention.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
