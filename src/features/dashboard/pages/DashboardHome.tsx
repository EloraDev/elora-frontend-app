import { useAuth } from "../../../providers/auth.provider";
import { useNavigate } from "@tanstack/react-router";
import {
  Upload,
  Calendar,
  Activity,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - replace with real data later
  const stats = {
    totalDiagnoses: 3,
    upcomingAppointments: 1,
    completedConsultations: 2,
    pendingReviews: 1,
  };

  const upcomingAppointment = {
    doctor: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    date: "Dec 25, 2025",
    time: "10:00 AM",
    type: "Video Consultation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  };

  const recentActivity = [
    {
      id: 1,
      title: "AI Diagnosis Completed",
      description: "Possible acne vulgaris detected",
      time: "2 hours ago",
      icon: Activity,
      color: "text-[#E4B68A]",
      bgColor: "bg-[#E4B68A]/10",
    },
    {
      id: 2,
      title: "Consultation Booked",
      description: "Dr. Sarah Johnson - Dec 25",
      time: "1 day ago",
      icon: Calendar,
      color: "text-[#E4B68A]",
      bgColor: "bg-[#E4B68A]/10",
    },
    {
      id: 3,
      title: "Treatment Plan Updated",
      description: "New prescription added",
      time: "3 days ago",
      icon: CheckCircle2,
      color: "text-[#E4B68A]",
      bgColor: "bg-[#E4B68A]/10",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
              Welcome back, {user?.first_name}! 👋
            </h1>
            <p className="text-(--color-slate) text-sm md:text-base">
              Here's what's happening with your skin health today
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate({ to: "/dashboard/scan" })}
              className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-11 px-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <Button
              onClick={() => navigate({ to: "/dashboard/appointments" })}
              variant="outline"
              className="border-gray-300 text-(--color-gray-darker) hover:bg-gray-50 rounded-lg h-11 px-6"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="AI Diagnoses"
          value={stats.totalDiagnoses}
          icon={Activity}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
        <StatCard
          title="Upcoming"
          value={stats.upcomingAppointments}
          icon={Clock}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
        <StatCard
          title="Completed"
          value={stats.completedConsultations}
          icon={CheckCircle2}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingReviews}
          icon={Calendar}
          color="bg-[#E4B68A]/10 text-[#E4B68A]"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Upcoming Appointment & Treatment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-(--color-gray-darker)">
                Upcoming Appointment
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/dashboard/appointments" })}
                className="text-[#3A9BA5] hover:text-[#2a7b85]"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex items-start gap-4 p-4 bg-(--color-cream) rounded-xl">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white">
                <img
                  src={upcomingAppointment.avatar}
                  alt={upcomingAppointment.doctor}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-(--color-gray-darker) mb-1">
                  {upcomingAppointment.doctor}
                </h3>
                <p className="text-sm text-(--color-slate) mb-3">
                  {upcomingAppointment.specialty} •{" "}
                  {upcomingAppointment.type}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-(--color-brown)">
                    <Calendar className="w-4 h-4" />
                    <span>{upcomingAppointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-(--color-brown)">
                    <Clock className="w-4 h-4" />
                    <span>{upcomingAppointment.time}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black shrink-0"
              >
                Join Call
              </Button>
            </div>
          </div>

          {/* Active Treatment Plan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-(--color-gray-darker)">
                Active Treatment Plan
              </h2>
            </div>

            <div className="space-y-3">
              <TreatmentItem
                title="Morning Routine"
                items={["Cleanser", "Vitamin C Serum", "Sunscreen SPF 50"]}
                time="8:00 AM"
              />
              <TreatmentItem
                title="Evening Routine"
                items={["Cleanser", "Tretinoin 0.05%", "Moisturizer"]}
                time="10:00 PM"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-(--color-gray-darker) mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${activity.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-(--color-gray-darker) mb-1">
                        {activity.title}
                      </p>
                      <p className="text-xs text-(--color-slate) mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-(--color-gray-blue)">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <p className="text-xs md:text-sm text-(--color-slate) mb-1">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-(--color-gray-darker)">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Reusable Treatment Item Component
interface TreatmentItemProps {
  title: string;
  items: string[];
  time: string;
}

const TreatmentItem = ({ title, items, time }: TreatmentItemProps) => {
  return (
    <div className="p-4 bg-(--color-cream) rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-(--color-gray-darker)">{title}</h3>
        <span className="text-xs text-(--color-slate) bg-white px-2 py-1 rounded-full">
          {time}
        </span>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-(--color-slate) flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4B68A]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

