import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export const BookingPage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")

  // Mock doctors
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Dermatology", rating: 4.9 },
    { id: 2, name: "Dr. Michael Chen", specialty: "Dermatology", rating: 4.8 },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatology", rating: 4.9 },
  ]

  // Mock available slots
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot || !selectedDoctor) {
      alert("Please select date, time, and doctor")
      return
    }

    const booking = {
      id: Date.now(),
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedSlot,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    bookings.push(booking)
    localStorage.setItem("bookings", JSON.stringify(bookings))

    navigate({ to: "/onboarding/payment" })
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
          <h1 className="text-3xl font-bold text-text-primary">Book Your Consultation</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Doctors */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Select Doctor</h2>
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id.toString())}
                  className={`p-4 cursor-pointer border transition ${
                    selectedDoctor === doctor.id.toString()
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{doctor.name}</p>
                      <p className="text-xs text-text-secondary">{doctor.specialty}</p>
                      <p className="text-xs text-accent mt-1">★ {doctor.rating}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Select Date
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Time
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border transition font-medium ${
                      selectedSlot === slot
                        ? "bg-primary text-white border-primary"
                        : "border-border text-text-primary hover:border-primary"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {selectedDoctor && selectedDate && selectedSlot && (
              <Card className="p-6 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-text-primary mb-4">Consultation Summary</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-text-secondary">Doctor:</span>{" "}
                    <span className="font-medium">{doctors.find((d) => d.id.toString() === selectedDoctor)?.name}</span>
                  </p>
                  <p>
                    <span className="text-text-secondary">Date:</span>{" "}
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                  </p>
                  <p>
                    <span className="text-text-secondary">Time:</span>{" "}
                    <span className="font-medium">{selectedSlot}</span>
                  </p>
                  <p className="pt-2 border-t border-primary/20">
                    <span className="text-text-secondary">Consultation Fee:</span>{" "}
                    <span className="font-bold text-primary">$49.99</span>
                  </p>
                </div>
              </Card>
            )}

            <Button
              onClick={handleBooking}
              disabled={!selectedDoctor || !selectedDate || !selectedSlot}
              className="w-full bg-primary hover:bg-primary-dark text-white"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
