import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card } from "../../../components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"

export const IntakePage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    skinConcern: "",
    duration: "",
    allergies: "",
    medications: "",
    consultationType: "video",
    images: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))
    }
  }

  const handleNext = () => {
    if (step === 1 && !formData.skinConcern) {
      alert("Please describe your skin concern")
      return
    }
    if (step === 2 && formData.images.length === 0) {
      alert("Please upload at least one image")
      return
    }
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const intakeData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    const intakes = JSON.parse(localStorage.getItem("intakes") || "[]")
    intakes.push(intakeData)
    localStorage.setItem("intakes", JSON.stringify(intakes))
    navigate({ to: "/onboarding/booking" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Pre-Consultation Intake</h1>
          <p className="text-text-secondary mt-2">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-2 rounded-full transition ${s <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 border border-border">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Describe Your Skin Concern</h2>
                <p className="text-text-secondary">Help us understand what you're experiencing</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Main Skin Concern</label>
                <textarea
                  name="skinConcern"
                  value={formData.skinConcern}
                  onChange={handleChange as any}
                  placeholder="e.g., Red, itchy patches on my face for 2 weeks..."
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Duration</label>
                  <Input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Consultation Type</label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="video">Video Call</option>
                    <option value="async">Asynchronous (24-48 hrs)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Upload Images</h2>
                <p className="text-text-secondary">Clear photos help with accurate diagnosis</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary mb-4">Drag and drop images or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <button
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition cursor-pointer font-medium"
                >
                  Choose Images
                </button>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-text-primary mb-4">Uploaded Images ({formData.images.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Upload ${idx}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute top-2 right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Medical History</h2>
                <p className="text-text-secondary">Help us provide better care</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Known Allergies</label>
                <Input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Latex"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Current Medications</label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange as any}
                  placeholder="List any medications you're currently taking"
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  Your information is secure and HIPAA-compliant. We'll use this to provide you with the best possible
                  care.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex-1"
            >
              Previous
            </Button>
            <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary-dark text-white">
              {step === 3 ? "Complete Intake" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
