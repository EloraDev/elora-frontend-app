import { Link } from "@tanstack/react-router";
import { Star, Clock, Languages, Award, ArrowRight } from "lucide-react";
// import { DOCTORS, formatPrice, type Doctor } from "../../../../data/doctors";
import Header from "../../public/components/header";
import Footer from "../../public/components/footer";
import { Button } from "../../../components/ui/button";
import { DOCTORS, formatPrice, type Doctor } from "../../../data/doctors";
// import { Button } from "../../../../components/ui/button";
// import Header from "../../../public/components/header";
// import Footer from "../../../public/components/footer";

export const BookConsultationsPage = () => {
  return (
    <div className="min-h-screen bg-(--color-cream)">
      <Header />

      {/* Hero Section */}
      <section className="px-4 md:px-12.5 pt-12 pb-16 bg-white">
        <div className="mx-auto w-full max-w-335">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-[#3A9BA5]/10 text-[#3A9BA5] text-sm font-medium">
              Expert Care
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--color-gray-darker) mb-4">
              Book a Consultation with Our Dermatologists
            </h1>
            <p className="text-lg text-(--color-slate) mb-8">
              Connect with board-certified dermatologists from the comfort of your home.
              Get expert advice, treatment plans, and prescriptions delivered.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="px-4 md:px-12.5 py-16">
        <div className="mx-auto w-full max-w-335">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DOCTORS.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Reusable Doctor Card Component
interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Doctor Image */}
      <div className="relative h-64 bg-(--color-cream) overflow-hidden">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails
            e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`;
          }}
        />
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-(--color-gray-darker) shadow-sm">
            {doctor.availability}
          </span>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5">
        {/* Name & Specialty */}
        <h3 className="text-lg font-bold text-(--color-gray-darker) mb-1">
          {doctor.name}
        </h3>
        <p className="text-sm text-(--color-slate) mb-3">{doctor.specialty}</p>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-(--color-gray-darker)">
              {doctor.rating}
            </span>
            <span className="text-(--color-slate)">({doctor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-(--color-slate)">
            <Award className="w-4 h-4" />
            <span>{doctor.experience} yrs</span>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-4 h-4 text-(--color-slate)" />
          <span className="text-xs text-(--color-slate)">
            {doctor.languages.join(", ")}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-(--color-slate) mb-1">Starting at</p>
            <p className="text-xl font-bold text-(--color-gray-darker)">
              {formatPrice(doctor.price)}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/book-consultations/$doctor" params={{ doctor: doctor.id }}>
          <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-11">
            View Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

