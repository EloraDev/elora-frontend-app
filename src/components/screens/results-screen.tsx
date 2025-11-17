"use client"

import { useState } from "react"
import { CheckCircle, AlertTriangle, Eye, Share2, Download, ArrowLeft, Calendar, TrendingUp, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import type { DiagnosisResult } from "../../features/diagnosis/types"

interface ResultsScreenProps {
  result: DiagnosisResult
  onBackToDashboard: () => void
}

export function ResultsScreen({ result, onBackToDashboard }: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState("diagnosis")

  // const getConfidenceColor = (confidence: number) => {
  //   if (confidence >= 0.8) return "text-green-600"
  //   if (confidence >= 0.6) return "text-yellow-600"
  //   return "text-red-600"
  // }

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-700"
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  // const getProgressColor = (confidence: number) => {
  //   if (confidence >= 0.8) return "bg-green-500"
  //   if (confidence >= 0.6) return "bg-yellow-500"
  //   return "bg-red-500"
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBackToDashboard} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Analysis Results</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{result.timestamp ? new Date(result.timestamp).toLocaleDateString() : 'Just now'}</span>
                <span>•</span>
                <span>{result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Success Header */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
          <CardContent className="text-center py-6">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Analysis Complete</h2>
            <p className="text-blue-100 text-sm">Your skin has been analyzed using advanced AI</p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="diagnosis" className="text-xs">
              Diagnosis
            </TabsTrigger>
            <TabsTrigger value="similar" className="text-xs">
              Similar Cases
            </TabsTrigger>
            <TabsTrigger value="details" className="text-xs">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnosis" className="space-y-4">
            {/* Main Result */}
            <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>AI Diagnosis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-bold text-xl text-gray-900">{result.combined.combined_diagnosis}</h3>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Confidence Level:</span>
                    <Badge className={getConfidenceBg(result.combined.avg_confidence)}>
                      {Math.round(result.combined.avg_confidence * 100)}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress value={result.combined.avg_confidence * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-blue-900 mb-1">Analysis Summary:</h4>
                      <p className="text-sm text-blue-800">
                        Based on the analysis, this appears to be a {result.combined.combined_diagnosis.toLowerCase()} 
                        with {Math.round(result.combined.avg_confidence * 100)}% confidence. 
                        Please consult with a healthcare provider for professional medical advice.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Analysis Results */}
            <div className="space-y-3">
              {result.image && (
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-sm">Image Analysis</span>
                      </div>
                      <Badge variant="outline">{Math.round(result.image.confidence * 100)}%</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{result.image.diagnosis}</p>
                      <Progress value={result.image.confidence * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.text && (
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-sm">Symptom Analysis</span>
                      </div>
                      <Badge variant="outline">{Math.round(result.text.confidence * 100)}%</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{result.text.diagnosis}</p>
                      <Progress value={result.text.confidence * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="similar" className="space-y-4">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Similar Cases</CardTitle>
                <p className="text-sm text-gray-600">Cases with similar characteristics from our medical database</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.similar_cases.map((case_item, index) => (
                  <div key={case_item.case_id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative">
                      <img
                        src={case_item.image_url || "/placeholder.svg"}
                        alt={`Similar case ${case_item.case_id}`}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">{case_item.condition}</h4>
                      <p className="text-xs text-gray-600 mb-2">Medical Case #{case_item.case_id}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Match:</span>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {Math.round(case_item.similarity * 100)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {/* Uploaded Image */}
            {result.uploaded_image && (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Analyzed Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={URL.createObjectURL(result.uploaded_image) || "/placeholder.svg"}
                    alt="Analyzed skin area"
                    className="w-full h-64 object-cover rounded-xl border shadow-sm"
                  />
                </CardContent>
              </Card>
            )}

            {/* Technical Details */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Analysis Date:</span>
                    <p className="font-medium">{result.timestamp ? new Date(result.timestamp).toLocaleDateString() : 'Just now'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Processing Time:</span>
                    <p className="font-medium">12.3 seconds</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Model Version:</span>
                    <p className="font-medium">ViT-B/16 v2.1</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Database Size:</span>
                    <p className="font-medium">50,000+ cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center space-x-2 bg-white shadow-sm">
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2 bg-white shadow-sm">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
        </div>

        {/* New Analysis Button */}
        <Button
          onClick={onBackToDashboard}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
        >
          Back to Dashboard
        </Button>

        {/* Medical Disclaimer */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-red-800 leading-relaxed">
                <strong>Important Medical Disclaimer:</strong> This AI analysis is not a substitute for professional
                medical diagnosis. The results are for informational purposes only. Please consult a dermatologist or
                healthcare provider for proper medical evaluation, diagnosis, and treatment recommendations.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
