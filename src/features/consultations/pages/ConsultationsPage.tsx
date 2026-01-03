import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

// Mock appointment data
interface Appointment {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  type: "video" | "async";
  status: "upcoming" | "completed" | "cancelled";
  date: string;
  time: string;
  price: number;
  notes?: string;
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorAvatar: "/img/doc_1.png",
    specialty: "Clinical Dermatologist",
    type: "video",
    status: "upcoming",
    date: "Dec 25, 2025",
    time: "10:00 AM",
    price: 15000,
    notes: "Follow-up for acne treatment",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    doctorAvatar: "/img/doc_2.png",
    specialty: "Cosmetic Dermatologist",
    type: "async",
    status: "completed",
    date: "Dec 15, 2025",
    time: "2:00 PM",
    price: 12600,
    notes: "Skincare routine consultation",
  },
  {
    id: "3",
    doctorName: "Dr. Amina Yusuf",
    doctorAvatar: "/img/doc_3.png",
    specialty: "Pediatric Dermatologist",
    type: "video",
    status: "completed",
    date: "Dec 10, 2025",
    time: "11:30 AM",
    price: 16000,
  },
];

export const ConsultationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filteredAppointments = MOCK_APPOINTMENTS.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const upcomingCount = MOCK_APPOINTMENTS.filter(
    (apt) => apt.status === "upcoming"
  ).length;
  const completedCount = MOCK_APPOINTMENTS.filter(
    (apt) => apt.status === "completed"
  ).length;

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
            My Consultations
          </h1>
          <p className="text-(--color-slate)">
            View and manage your appointments
          </p>
        </div>

        <Button
          onClick={() => navigate({ to: "/dashboard/appointments/booking" })}
          className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-11 px-6 w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book New Consultation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="Total"
          value={MOCK_APPOINTMENTS.length}
          icon={Calendar}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
        <StatCard
          title="Upcoming"
          value={upcomingCount}
          icon={Clock}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={CheckCircle2}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 inline-flex gap-1">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-(--color-peach-light) text-white"
              : "text-(--color-slate) hover:text-(--color-gray-darker)"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "upcoming"
              ? "bg-(--color-peach-light) text-white"
              : "text-(--color-slate) hover:text-(--color-gray-darker)"
          }`}
        >
          Upcoming ({upcomingCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "completed"
              ? "bg-(--color-peach-light) text-white"
              : "text-(--color-slate) hover:text-(--color-gray-darker)"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <AlertCircle className="w-12 h-12 text-(--color-slate) mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-2">
              No consultations found
            </h3>
            <p className="text-(--color-slate) mb-6">
              You haven't booked any consultations yet
            </p>
            <Button
              onClick={() => navigate({ to: "/dashboard/appointments/booking" })}
              className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
            >
              Book Your First Consultation
            </Button>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${color} flex items-center justify-center shrink-0`}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-(--color-slate) mb-1">
            {title}
          </p>
          <p className="text-xl md:text-2xl font-bold text-(--color-gray-darker)">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Appointment Card Component
interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const statusConfig = {
    upcoming: {
      icon: Clock,
      color: "text-[#E4B68A]",
      bgColor: "bg-[#E4B68A]/10",
      label: "Upcoming",
    },
    completed: {
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      label: "Completed",
    },
    cancelled: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      label: "Cancelled",
    },
  };

  const status = statusConfig[appointment.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Doctor Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-(--color-cream) shrink-0">
            <img
              src={appointment.doctorAvatar}
              alt={appointment.doctorName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.doctorName}`;
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-(--color-gray-darker) mb-1">
              {appointment.doctorName}
            </h3>
            <p className="text-sm text-(--color-slate) mb-3">
              {appointment.specialty}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-(--color-brown)">
                <Calendar className="w-4 h-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-1 text-(--color-brown)">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-1 text-(--color-slate)">
                {appointment.type === "video" ? (
                  <>
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Async</span>
                  </>
                )}
              </div>
            </div>

            {appointment.notes && (
              <p className="text-sm text-(--color-slate) mt-3 bg-(--color-cream) rounded-lg px-3 py-2">
                📝 {appointment.notes}
              </p>
            )}
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex md:flex-col items-center md:items-end gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${status.bgColor}`}
          >
            <StatusIcon className={`w-4 h-4 ${status.color}`} />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>

          {appointment.status === "upcoming" && (
            <Button
              size="sm"
              className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
            >
              {appointment.type === "video" ? "Join Call" : "View Messages"}
            </Button>
          )}

          {appointment.status === "completed" && (
            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 text-(--color-gray-darker) hover:bg-gray-50"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

