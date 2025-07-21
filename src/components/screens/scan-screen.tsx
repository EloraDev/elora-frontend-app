"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, FileText, Loader2, X, Lightbulb, CheckCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { useCreateDiagnosisMutation } from "../../features/diagnosis/api/mutation"
import { useResultStore } from "../../stores/result-store"
import type { DiagnosisResult } from "../../features/diagnosis/types"

interface ScanScreenProps {
  onDiagnosisComplete: (result: DiagnosisResult) => void
}

export function ScanScreen({ onDiagnosisComplete }: ScanScreenProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  
  const { setResult } = useResultStore()
  const diagnosisMutation = useCreateDiagnosisMutation()

  const analysisSteps = [
    "Preprocessing image...",
    "Running AI analysis...",
    "Analyzing symptoms...",
    "Finding similar cases...",
    "Generating report...",
  ]

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const handleSubmit = async () => {
    if (!selectedImage && !symptoms.trim()) {
      alert("Please upload an image or describe your symptoms")
      return
    }

    setIsAnalyzing(true)
    setAnalysisStep(0)

    // Simulate step-by-step analysis
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    try {
      const result = await diagnosisMutation.mutateAsync({
        image: selectedImage || undefined,
        symptoms: symptoms.trim() || undefined,
      })
      console.log("result", result)

      if (result.success && result.data) {
        // Add timestamp and uploaded image to the result
        const enhancedResult: DiagnosisResult = {
          ...result.data,
          timestamp: new Date().toISOString(),
          uploaded_image: selectedImage || undefined,
        }
        
        setResult(enhancedResult)
        onDiagnosisComplete(enhancedResult)
      } else {
        alert("Analysis failed.")
      }
    } catch (error) {
      console.error("Diagnosis error:", error)
      alert("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const commonSymptoms = [
    "Itchy skin",
    "Red patches",
    "Dry skin",
    "Bumps or lumps",
    "Scaling",
    "Burning sensation",
    "Swelling",
    "Changes in mole",
  ]

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12 space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Analyzing Your Skin</h3>
              <p className="text-gray-600 text-sm">Our AI is processing your data using advanced medical models</p>
            </div>

            <div className="space-y-3">
              {analysisSteps.map((step, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className={index <= analysisStep ? "text-gray-900" : "text-gray-400"}>{step}</span>
                  {index < analysisStep ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : index === analysisStep ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                Analysis typically takes 10-15 seconds. Please wait while we process your data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Skin Analysis</h1>
            <p className="text-gray-600">Upload a photo and describe your symptoms</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Photo Tips */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h4 className="font-medium text-yellow-900 mb-1">Photo Tips</h4>
                <ul className="text-yellow-800 text-xs space-y-1">
                  <li>• Use good lighting (natural light preferred)</li>
                  <li>• Keep camera steady and focused</li>
                  <li>• Fill the frame with the affected area</li>
                  <li>• Avoid shadows and reflections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload Section */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <span>Upload Image</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Selected skin area"
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-3 right-3 rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Image ready for analysis
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="h-32 flex-col space-y-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">Take Photo</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-32 flex-col space-y-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-700">From Gallery</span>
                </Button>
              </div>
            )}

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </CardContent>
        </Card>

        {/* Symptoms Section */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span>Describe Symptoms</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe what you're experiencing... (e.g., itchy red patches that appeared 3 days ago, changes in size or color)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] resize-none"
            />

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Quick add symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    onClick={() => {
                      const newSymptoms = symptoms ? `${symptoms}, ${symptom.toLowerCase()}` : symptom.toLowerCase()
                      setSymptoms(newSymptoms)
                    }}
                  >
                    + {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
          disabled={!selectedImage && !symptoms.trim()}
        >
          <Camera className="w-5 h-5 mr-2" />
          Analyze My Skin
        </Button>

        {/* Disclaimer */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <div className="text-xs text-red-800 leading-relaxed">
                <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not
                replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and
                treatment.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
