import { useEffect, useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  FileText,
  History,
  Menu,
  X,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface Booking {
  id: number
  doctorId: string
  date: string
  time: string
  status: string
  paymentId?: string
}

interface Task {
  id: number
  consultationId: number
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export const DashboardPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      navigate({ to: "/auth/login" })
      return
    }
    setUser(JSON.parse(currentUser))

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(allBookings)

    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(allTasks)

    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    navigate({ to: "/" })
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  const doctors: any = {
    "1": { name: "Dr. Sarah Johnson", specialty: "Dermatology" },
    "2": { name: "Dr. Michael Chen", specialty: "Dermatology" },
    "3": { name: "Dr. Emily Rodriguez", specialty: "Dermatology" },
  }

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed")
  const reviewBookings = bookings.filter((b) => b.status === "in_review")
  const pendingBookings = bookings.filter((b) => b.status === "pending_payment")
  const activeTasks = tasks.filter((t) => !t.completed)

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-white border-r border-border transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3A9BA5] flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <div>
              <p className="font-semibold text-[#111827]">ELORA</p>
              <p className="text-xs text-[#6b7280]">Patient Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/dashboard">
            <div className="px-4 py-3 rounded-lg bg-[#3A9BA5]/10 text-[#3A9BA5] font-medium flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Dashboard
            </div>
          </Link>
          <Link to="/onboarding/booking">
            <div className="px-4 py-3 rounded-lg text-[#111827] hover:bg-[#F9FAFB] flex items-center gap-3 cursor-pointer">
              <Plus className="w-5 h-5" />
              Book Consultation
            </div>
          </Link>
          <div className="px-4 py-3 rounded-lg text-[#111827] hover:bg-[#F9FAFB] flex items-center gap-3 cursor-pointer">
            <History className="w-5 h-5" />
            Consultation History
          </div>
          <div className="px-4 py-3 rounded-lg text-[#111827] hover:bg-[#F9FAFB] flex items-center gap-3 cursor-pointer">
            <Zap className="w-5 h-5 text-[#E4B68A]" />
            <span>
              AI Diagnosis{" "}
              <span className="text-xs bg-[#E4B68A]/20 text-[#E4B68A] px-2 py-1 rounded ml-1">Coming Soon</span>
            </span>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#ef4444] hover:bg-[#ef4444]/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#F9FAFB] rounded-lg">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-[#111827]">{user?.name}</p>
                <p className="text-xs text-[#6b7280]">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#111827] mb-2">Welcome back, {user?.name?.split(" ")[0]}!</h1>
              <p className="text-[#6b7280]">Manage your consultations and health records</p>
            </div>

            {/* AI Features Teaser */}
            <div className="mb-8 bg-gradient-to-r from-[#3A9BA5]/10 to-[#E4B68A]/10 border border-[#3A9BA5]/20 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-[#E4B68A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">AI Diagnosis Coming Soon</h3>
                  <p className="text-sm text-[#6b7280]">
                    Our advanced AI-powered skin analysis will provide instant preliminary assessments. Currently, we're
                    offering expert telemedicine consultations with our specialist doctors.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link to="/onboarding/booking">
                <Card className="p-6 border border-[#e5e7eb] hover:border-[#3A9BA5]/50 cursor-pointer transition bg-white">
                  <Plus className="w-8 h-8 text-[#3A9BA5] mb-3" />
                  <h3 className="font-semibold text-[#111827]">Book Consultation</h3>
                  <p className="text-sm text-[#6b7280] mt-1">Schedule a new appointment</p>
                </Card>
              </Link>
              <Card className="p-6 border border-[#e5e7eb] hover:border-[#3A9BA5]/50 cursor-pointer transition bg-white">
                <FileText className="w-8 h-8 text-[#E4B68A] mb-3" />
                <h3 className="font-semibold text-[#111827]">My Records</h3>
                <p className="text-sm text-[#6b7280] mt-1">View past consultations</p>
              </Card>
              <Card className="p-6 border border-[#e5e7eb] hover:border-[#3A9BA5]/50 cursor-pointer transition bg-white">
                <History className="w-8 h-8 text-[#3A9BA5] mb-3" />
                <h3 className="font-semibold text-[#111827]">Payment History</h3>
                <p className="text-sm text-[#6b7280] mt-1">View all transactions</p>
              </Card>
            </div>

            {/* Pending Payments */}
            {pendingBookings.length > 0 && (
              <div className="mb-8">
                <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg p-6">
                  <h3 className="font-semibold text-[#f59e0b] mb-2">Pending Payment</h3>
                  <p className="text-sm text-[#6b7280] mb-4">
                    You have {pendingBookings.length} consultation(s) awaiting payment.
                  </p>
                  <Link to="/onboarding/payment">
                    <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">Complete Payment</Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Consultations in Review */}
            {reviewBookings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-[#3A9BA5]" />
                  Consultations in Review
                </h2>
                <div className="grid gap-4">
                  {reviewBookings.map((booking) => (
                    <Card key={booking.id} className="p-6 border border-[#3A9BA5]/30 bg-[#3A9BA5]/5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#3A9BA5]/20 flex items-center justify-center">
                              <User className="w-6 h-6 text-[#3A9BA5]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#111827]">{doctors[booking.doctorId]?.name}</h3>
                              <p className="text-sm text-[#6b7280]">{doctors[booking.doctorId]?.specialty}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-[#6b7280]">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-[#6b7280]">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-[#3A9BA5]/20 text-[#3A9BA5] text-xs font-medium rounded-full">
                            In Review
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned Tasks */}
            {activeTasks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#E4B68A]" />
                  Assigned Tasks
                </h2>
                <div className="grid gap-4">
                  {activeTasks.map((task) => (
                    <Card key={task.id} className="p-6 border border-[#E4B68A]/30 bg-[#E4B68A]/5">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-[#E4B68A] text-[#E4B68A] mt-1"
                          onChange={(e) => {
                            const updatedTasks = tasks.map((t) =>
                              t.id === task.id ? { ...t, completed: e.target.checked } : t,
                            )
                            setTasks(updatedTasks)
                            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#111827]">{task.title}</h3>
                          <p className="text-sm text-[#6b7280] mt-1">{task.description}</p>
                          <p className="text-xs text-[#9ca3af] mt-3">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Consultations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Upcoming Consultations</h2>
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingBookings.map((booking) => (
                    <Card
                      key={booking.id}
                      className="p-6 border border-[#e5e7eb] hover:border-[#3A9BA5]/50 transition bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#3A9BA5]/20 flex items-center justify-center">
                              <User className="w-6 h-6 text-[#3A9BA5]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#111827]">{doctors[booking.doctorId]?.name}</h3>
                              <p className="text-sm text-[#6b7280]">{doctors[booking.doctorId]?.specialty}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-[#6b7280]">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-[#6b7280]">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded-full">
                            Confirmed
                          </span>
                          <Button className="mt-4 bg-[#3A9BA5] hover:bg-[#2a7b85] text-white w-full">Join Call</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 border border-[#e5e7eb] text-center bg-white">
                  <Calendar className="w-12 h-12 text-[#9ca3af] mx-auto mb-4" />
                  <p className="text-[#6b7280] mb-4">No upcoming consultations</p>
                  <Link to="/onboarding/booking">
                    <Button className="bg-[#3A9BA5] hover:bg-[#2a7b85] text-white">Book Your First Consultation</Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
