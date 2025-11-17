"use client"

// import { useState } from "react"
// import { MapPin, Video } from "lucide-react"

interface AppointmentsScreenProps {
  user: any
}

export function AppointmentsScreen({ 
  // user 
}: AppointmentsScreenProps) {
  // const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming")

  // const upcomingAppointments = [
  //   {
  //     id: 1,
  //     doctorName: "Dr. Sarah Mitchell",
  //     specialty: "Dermatologist",
  //     date: "2024-02-15",
  //     time: "10:30 AM",
  //     type: "in-person",
  //     location: "Skin Health Clinic, 123 Medical Ave",
  //     reason: "Follow-up for actinic keratosis",
  //     status: "confirmed",
  //     avatar: "/placeholder.svg?height=40&width=40"
  //   },
  //   {
  //     id: 2,
  //     doctorName: "Dr. Michael Chen",
  //     specialty: "Dermatologist",
  //     date: "2024-03-01",
  //     time: "2:00 PM", 
  //     type: "telemedicine",
  //     location: "Video consultation",
  //     reason: "Routine skin check consultation",
  //     status: "pending",
  //     avatar: "/placeholder.svg?height=40&width=40"
  //   }
  // ]

  // const appointmentHistory = [
  //   {
  //     id: 3,
  //     doctorName: "Dr. Emily Rodriguez",
  //     specialty: "Dermatologist",
  //     date: "2023-12-10",
  //     time: "11:00 AM",
  //     type: "in-person",
  //     location: "Downtown Dermatology Center",
  //     reason: "Annual skin screening",
  //     status: "completed",
  //     notes: "All clear, continue regular monitoring",
  //     avatar: "/placeholder.svg?height=40&width=40"
  //   },
  //   {
  //     id: 4,
  //     doctorName: "Dr. James Wilson",
  //     specialty: "Dermatologist", 
  //     date: "2023-09-15",
  //     time: "3:30 PM",
  //     type: "in-person",
  //     location: "Skin Health Clinic",
  //     reason: "Mole removal consultation",
  //     status: "completed",
  //     notes: "Benign mole removed successfully",
  //     avatar: "/placeholder.svg?height=40&width=40"
  //   }
  // ]

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "confirmed":
  //       return "bg-green-100 text-green-700"
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-700"
  //     case "completed":
  //       return "bg-blue-100 text-blue-700"
  //     case "cancelled":
  //       return "bg-red-100 text-red-700"
  //     default:
  //       return "bg-gray-100 text-gray-700"
  //   }
  // }

  // const getTypeIcon = (type: string) => {
  //   return type === "telemedicine" ? Video : MapPin
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage your dermatology appointments</p>
          </div>
        </div>
      </div>
    </div>
  )}
