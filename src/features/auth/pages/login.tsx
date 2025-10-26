import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Card } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"

export const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    // Mock login
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

    if (!user) {
      setError("Invalid email or password")
      return
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    )

    if (user.role === "admin") {
      navigate({ to: "/dashboard" })
    } else {
      navigate({ to: "/dashboard" })
    }
  }

  // Demo credentials
  const fillDemoPatient = () => {
    setFormData({
      email: "patient@demo.com",
      password: "demo123",
    })
  }

  const fillDemoAdmin = () => {
    setFormData({
      email: "admin@demo.com",
      password: "demo123",
    })
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">Sign In</h1>
            <p className="text-text-secondary">Access your ELORA account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white mt-6">
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-xs text-text-tertiary text-center font-medium">Demo Credentials</p>
            <Button type="button" variant="outline" onClick={fillDemoPatient} className="w-full text-xs bg-transparent">
              Patient Demo
            </Button>
            <Button type="button" variant="outline" onClick={fillDemoAdmin} className="w-full text-xs bg-transparent">
              Admin Demo
            </Button>
          </div>

          <p className="text-center text-text-secondary text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:text-primary-dark font-medium">
              Sign Up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}