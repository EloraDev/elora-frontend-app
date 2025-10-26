import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"

export const PaymentPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [processing, setProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock payment success
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    if (bookings.length > 0) {
      bookings[bookings.length - 1].status = "confirmed"
      bookings[bookings.length - 1].paymentId = "PAY_" + Date.now()
      localStorage.setItem("bookings", JSON.stringify(bookings))
    }

    setProcessing(false)
    navigate({ to: "/dashboard" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Payment</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card className="p-8 border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Cardholder Name</label>
                  <Input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Card Number</label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4532 1234 5678 9010"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Expiry Date</label>
                    <Input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">CVV</label>
                    <Input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3 mt-6">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">
                    Your payment is secure and encrypted. We use industry-standard SSL encryption to protect your
                    information.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-primary hover:bg-primary-dark text-white mt-6"
                >
                  {processing ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border border-border sticky top-6">
              <h3 className="font-semibold text-text-primary mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Consultation Fee</span>
                  <span className="font-medium text-text-primary">$49.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Platform Fee</span>
                  <span className="font-medium text-text-primary">$5.00</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="text-2xl font-bold text-primary">$54.99</span>
              </div>
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <p className="text-xs text-success font-medium">Secure Payment Guaranteed</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
