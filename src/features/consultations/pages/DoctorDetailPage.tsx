import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { getDoctorById, formatPrice } from "../../../data/doctors";
import {
  Star,
  Award,
  Languages,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import Header from "../../public/components/header";
import Footer from "../../public/components/footer";
import { useState } from "react";
import { useAuth } from "../../../providers/auth.provider";
import { AuthState } from "../../../types/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

export const DoctorDetailPage = () => {
  const { doctor: doctorId } = useParams({ from: "/(public)/_public/book-consultations/$doctor" });
  const doctor = getDoctorById(doctorId);
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [selectedConsultationType, setSelectedConsultationType] = useState<
    "video" | "async" | null
  >(null);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-(--color-cream) flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-(--color-gray-darker) mb-4">
            Doctor Not Found
          </h1>
          <Link to="/book-consultations">
            <Button>Browse All Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = (type: "video" | "async") => {
    setSelectedConsultationType(type);

    // Check if user is logged in
    if (authState !== AuthState.AUTHENTICATED) {
      setShowSignupDialog(true);
    } else {
      // Navigate to booking flow (will implement later)
      navigate({
        to: "/dashboard/appointments",
        search: { doctor: doctor.id, type },
      });
    }
  };

  return (
    <div className="min-h-screen bg-(--color-cream)">
      <Header />

      {/* Doctor Profile Section */}
      <section className="px-4 md:px-12.5 py-12">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Back Button */}
          <Link
            to="/book-consultations"
            className="inline-flex items-center gap-2 text-(--color-slate) hover:text-(--color-gray-darker) mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Doctor Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Doctor Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-(--color-cream) shrink-0">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-(--color-gray-darker) mb-2">
                      {doctor.name}
                    </h1>
                    <p className="text-lg text-(--color-slate) mb-4">
                      {doctor.specialty}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-(--color-gray-darker)">
                          {doctor.rating}
                        </span>
                        <span className="text-(--color-slate)">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-(--color-slate)">
                        <Award className="w-5 h-5" />
                        <span>{doctor.experience} years experience</span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 mb-4">
                      <Languages className="w-5 h-5 text-(--color-slate)" />
                      <span className="text-(--color-slate)">
                        Speaks: {doctor.languages.join(", ")}
                      </span>
                    </div>

                    {/* Availability */}
                    <div className="inline-block px-4 py-2 rounded-lg bg-(--color-cream) text-(--color-brown) text-sm font-medium">
                      <Clock className="w-4 h-4 inline mr-2" />
                      {doctor.availability}
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-(--color-gray-darker) mb-4">
                  About Dr. {doctor.name.split(" ")[1]}
                </h2>
                <p className="text-(--color-slate) leading-relaxed">
                  {doctor.bio}
                </p>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-(--color-gray-darker) mb-4">
                  Education & Certifications
                </h2>
                <div className="space-y-3">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3A9BA5] shrink-0 mt-0.5" />
                      <span className="text-(--color-slate)">{edu}</span>
                    </div>
                  ))}
                  {doctor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#E4B68A] shrink-0 mt-0.5" />
                      <span className="text-(--color-slate)">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-4">
                <h3 className="text-lg font-bold text-(--color-gray-darker) mb-4">
                  Book Consultation
                </h3>

                {/* Consultation Types */}
                <div className="space-y-3 mb-6">
                  {/* Video Consultation */}
                  <button
                    onClick={() => handleBookNow("video")}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#E4B68A] transition-all text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3A9BA5]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3A9BA5]/20 transition-colors">
                        <Video className="w-5 h-5 text-[#3A9BA5]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-(--color-gray-darker) mb-1">
                          Video Consultation
                        </h4>
                        <p className="text-sm text-(--color-slate) mb-2">
                          Live video call with instant diagnosis
                        </p>
                        <p className="text-lg font-bold text-(--color-gray-darker)">
                          {formatPrice(doctor.price)}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Async Consultation */}
                  <button
                    onClick={() => handleBookNow("async")}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-[#E4B68A] transition-all text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E4B68A]/20 transition-colors">
                        <MessageSquare className="w-5 h-5 text-[#E4B68A]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-(--color-gray-darker) mb-1">
                          Async Consultation
                        </h4>
                        <p className="text-sm text-(--color-slate) mb-2">
                          Get response within 24-48 hours
                        </p>
                        <p className="text-lg font-bold text-(--color-gray-darker)">
                          {formatPrice(doctor.price * 0.7)}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-(--color-slate)">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Secure & HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-(--color-slate)">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Prescription Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-(--color-slate)">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Follow-up Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-(--color-gray-darker) mb-2">
              Sign Up to Book
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-4">
            <p className="text-(--color-slate) mb-6">
              Create an account to book a consultation with {doctor.name}
            </p>

            <div className="space-y-3">
              <Link to="/auth/signup">
                <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-11">
                  Create Account
                </Button>
              </Link>

              <Link to="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-(--color-gray-darker) hover:bg-gray-50 rounded-lg h-11"
                >
                  Already have an account? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

