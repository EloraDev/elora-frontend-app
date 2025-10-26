import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Card } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"

export const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    // Mock signup - store in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.find((u: any) => u.email === formData.email)) {
      setError("Email already registered")
      return
    }

    users.push({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "patient",
    })
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: "patient",
      }),
    )

    navigate({ to: "/onboarding" })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="p-8 border border-border">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
            <p className="text-text-secondary">Join ELORA to get expert dermatology care</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
              />
              <label className="text-sm text-text-secondary">
                I agree to the terms and conditions. I understand this is not a substitute for emergency care.
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white mt-6">
              Create Account
            </Button>
          </form>

          <p className="text-center text-text-secondary text-sm mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:text-primary-dark font-medium">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
