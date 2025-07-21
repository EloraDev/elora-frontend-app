"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingSteps] = useState([
    "Initializing AI models...",
    "Loading skin analysis engine...",
    "Preparing medical database...",
    "Calibrating diagnostic algorithms...",
    "Ready for analysis!",
  ])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1.5
      })
    }, 60)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 800)

    return () => clearInterval(stepTimer)
  }, [loadingSteps.length])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="text-center space-y-12 max-w-sm relative z-10">
        {/* Main Logo */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
            <span className="text-white font-bold text-6xl tracking-tight">E</span>
          </div>

          {/* Animated rings around logo */}
          <div className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-3xl border border-white/20 animate-pulse"></div>
        </div>

        {/* App Name */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white tracking-tight">Elora</h1>
          <p className="text-white/80 text-lg font-medium">AI-Powered Skin Health</p>
        </div>

        {/* Loading Section */}
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full space-y-3">
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div
                className="bg-white h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-white/70 text-sm font-medium">
              <span>{Math.round(progress)}%</span>
              <span>Loading...</span>
            </div>
          </div>

          {/* Loading Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
              <span className="text-white font-medium">Preparing AI Models</span>
            </div>
            <p className="text-white/80 text-sm text-center">{loadingSteps[currentStep]}</p>
          </div>

          {/* Model Loading Indicators */}
          <div className="grid grid-cols-3 gap-3">
            {["Vision AI", "NLP Engine", "Medical DB"].map((model, index) => (
              <div key={model} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-center space-y-2">
                  <div
                    className={`w-3 h-3 mx-auto rounded-full transition-all duration-500 ${
                      currentStep > index
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : currentStep === index
                          ? "bg-yellow-400 animate-pulse"
                          : "bg-white/30"
                    }`}
                  ></div>
                  <span className="text-white/70 text-xs font-medium">{model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-white/70 text-xs leading-relaxed">
            This app provides AI-assisted skin analysis for educational purposes. Always consult healthcare
            professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
