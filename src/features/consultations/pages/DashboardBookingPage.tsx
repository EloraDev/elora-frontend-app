import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Video,
  MessageSquare,
  Calendar,
  Clock,
  Search,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";     
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { toast } from "sonner";
import { DOCTORS, type Doctor } from "../../../data/doctors";

// Available time slots
const TIME_SLOTS = {
  morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
  evening: ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"],
};

type ConsultationType = "video" | "async" | null;

export const DashboardBookingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationType, setConsultationType] = useState<ConsultationType>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Filter doctors
  const filteredDoctors = DOCTORS.filter((doctor: Doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties
  const specialties = Array.from(new Set(DOCTORS.map((d: Doctor) => d.specialty)));

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setConsultationType(null);
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  const handleConsultationTypeSelect = (type: ConsultationType) => {
    setConsultationType(type);
  };

  const handleBooking = () => {
    if (!selectedDoctor || !consultationType) return;

    if (consultationType === "video" && (!selectedDate || !selectedTime)) {
      toast.error("Please select date and time for video consultation");
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmBooking = () => {
    // TODO: API call to book consultation
    toast.success("Consultation booked successfully!");
    setShowConfirmDialog(false);
    navigate({ to: "/dashboard/appointments" });
  };

  const getConsultationPrice = () => {
    if (!selectedDoctor || !consultationType) return 0;
    // Async is the base price, video is typically 1.5x
    return consultationType === "video"
      ? Math.round(selectedDoctor.price * 1.5)
      : selectedDoctor.price;
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  const handleBack = () => {
    // If consultation type is selected, go back to consultation type selection
    if (consultationType) {
      setConsultationType(null);
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
      return;
    }
    
    // If doctor is selected, go back to doctor list
    if (selectedDoctor) {
      setSelectedDoctor(null);
      return;
    }
    
    // Otherwise, go back to appointments page
    navigate({ to: "/dashboard/appointments" });
  };

  const getBackButtonText = () => {
    if (consultationType) return "Back to Consultation Type";
    if (selectedDoctor) return "Back to Doctor Selection";
    return "Back to Appointments";
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-(--color-slate) hover:text-(--color-gray-darker)"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {getBackButtonText()}
        </Button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
          Book Consultation
        </h1>
        <p className="text-(--color-slate)">
          Choose a dermatologist and schedule your appointment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Doctor Selection */}
        <div className="lg:col-span-2 space-y-4">
          {!selectedDoctor ? (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-(--color-slate)" />
                    <Input
                      placeholder="Search doctors by name or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Doctor List */}
              <div className="space-y-3">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#E4B68A] transition-all cursor-pointer w-full"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex gap-4 w-full">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-(--color-gray-darker) mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-(--color-slate) mb-2">
                          {doctor.specialty}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#E4B68A] text-[#E4B68A]" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span className="text-(--color-slate)">
                              ({doctor.reviewCount})
                            </span>
                          </div>
                          <div className="text-(--color-slate)">
                            {doctor.experience}y exp
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-(--color-slate) mb-1">From</p>
                        <p className="font-bold text-(--color-gray-darker)">
                          ₦{doctor.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Selected Doctor */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                <div className="flex items-start justify-between mb-4 w-full">
                  <div className="flex gap-4">
                    <img
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-(--color-gray-darker) mb-1">
                        {selectedDoctor.name}
                      </h3>
                      <p className="text-(--color-slate) mb-2">
                        {selectedDoctor.specialty}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#E4B68A] text-[#E4B68A]" />
                        <span className="font-medium">{selectedDoctor.rating}</span>
                        <span className="text-sm text-(--color-slate)">
                          ({selectedDoctor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDoctor(null)}
                    className="text-(--color-slate)"
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Consultation Type Selection */}
              {!consultationType ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                  <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-4">
                    Choose Consultation Type
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Video Consultation */}
                    <div
                      onClick={() => handleConsultationTypeSelect("video")}
                      className="border-2 border-gray-200 hover:border-[#E4B68A] rounded-xl p-4 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                          <Video className="w-6 h-6 text-[#E4B68A]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-(--color-gray-darker)">
                            Video Consultation
                          </h4>
                          <p className="text-lg font-bold text-[#E4B68A]">
                            ₦{Math.round(selectedDoctor.price * 1.5).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-(--color-slate)">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          Live video call with doctor
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          Instant face-to-face consultation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          30 minutes session
                        </li>
                      </ul>
                    </div>

                    {/* Async Consultation */}
                    <div
                      onClick={() => handleConsultationTypeSelect("async")}
                      className="border-2 border-gray-200 hover:border-[#E4B68A] rounded-xl p-4 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-[#E4B68A]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-(--color-gray-darker)">
                            Async Consultation
                          </h4>
                          <p className="text-lg font-bold text-[#E4B68A]">
                            ₦{selectedDoctor.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-(--color-slate)">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          Message-based consultation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          Response within 24 hours
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E4B68A]" />
                          More affordable option
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Selected Consultation Type */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
                    <div className="flex items-center justify-between mb-6 w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                          {consultationType === "video" ? (
                            <Video className="w-6 h-6 text-[#E4B68A]" />
                          ) : (
                            <MessageSquare className="w-6 h-6 text-[#E4B68A]" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-(--color-gray-darker)">
                            {consultationType === "video"
                              ? "Video Consultation"
                              : "Async Consultation"}
                          </h4>
                          <p className="text-lg font-bold text-[#E4B68A]">
                            ₦{getConsultationPrice().toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setConsultationType(null)}
                        className="text-(--color-slate)"
                      >
                        Change
                      </Button>
                    </div>

                    {/* Scheduling Form */}
                    {consultationType === "video" && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-(--color-gray-darker)">
                          Select Date & Time
                        </h4>

                        <div>
                          <Label htmlFor="date">Preferred Date</Label>
                          <Input
                            id="date"
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        {selectedDate && (
                          <div>
                            <Label>Select Time Slot</Label>
                            <Tabs defaultValue="morning" className="mt-2">
                              <TabsList className="bg-gray-100 p-1 rounded-lg">
                                <TabsTrigger value="morning" className="text-sm">
                                  Morning
                                </TabsTrigger>
                                <TabsTrigger value="afternoon" className="text-sm">
                                  Afternoon
                                </TabsTrigger>
                                <TabsTrigger value="evening" className="text-sm">
                                  Evening
                                </TabsTrigger>
                              </TabsList>

                              {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                                <TabsContent
                                  key={period}
                                  value={period}
                                  className="grid grid-cols-3 gap-2 mt-3"
                                >
                                  {slots.map((time) => (
                                    <button
                                      key={time}
                                      onClick={() => setSelectedTime(time)}
                                      className={`p-2 text-sm rounded-lg border-2 transition-all ${
                                        selectedTime === time
                                          ? "border-[#E4B68A] bg-[#E4B68A]/10 text-[#E4B68A] font-medium"
                                          : "border-gray-200 hover:border-[#E4B68A]"
                                      }`}
                                    >
                                      {time}
                                    </button>
                                  ))}
                                </TabsContent>
                              ))}
                            </Tabs>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    <div className="mt-4">
                      <Label htmlFor="notes">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Describe your symptoms or concerns..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Column - Booking Summary */}
        {selectedDoctor && consultationType && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-4">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-(--color-gray-darker)">
                      {selectedDoctor.name}
                    </p>
                    <p className="text-sm text-(--color-slate)">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-(--color-slate)">Consultation Type</span>
                    <span className="font-medium text-(--color-gray-darker)">
                      {consultationType === "video" ? "Video" : "Async"}
                    </span>
                  </div>

                  {consultationType === "video" && selectedDate && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-(--color-slate)">Date</span>
                        <span className="font-medium text-(--color-gray-darker)">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {selectedTime && (
                        <div className="flex justify-between text-sm">
                          <span className="text-(--color-slate)">Time</span>
                          <span className="font-medium text-(--color-gray-darker)">
                            {selectedTime}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-semibold text-(--color-gray-darker)">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#E4B68A]">
                        ₦{getConsultationPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={
                  consultationType === "video" && (!selectedDate || !selectedTime)
                }
                className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-12"
              >
                Proceed to Payment
              </Button>

              <p className="text-xs text-(--color-slate) text-center mt-3">
                You'll be redirected to secure payment
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-(--color-gray-darker)">
              Confirm Booking
            </DialogTitle>
            <DialogDescription className="text-(--color-slate)">
              Please review your consultation details before proceeding
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="flex justify-between">
              <span className="text-(--color-slate)">Doctor</span>
              <span className="font-medium text-(--color-gray-darker)">
                {selectedDoctor?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-(--color-slate)">Type</span>
              <span className="font-medium text-(--color-gray-darker)">
                {consultationType === "video" ? "Video Consultation" : "Async Consultation"}
              </span>
            </div>
            {consultationType === "video" && selectedDate && selectedTime && (
              <>
                <div className="flex justify-between">
                  <span className="text-(--color-slate)">Date</span>
                  <span className="font-medium text-(--color-gray-darker)">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-(--color-slate)">Time</span>
                  <span className="font-medium text-(--color-gray-darker)">
                    {selectedTime}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-semibold text-(--color-gray-darker)">Total</span>
              <span className="text-xl font-bold text-[#E4B68A]">
                ₦{getConsultationPrice().toLocaleString()}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmBooking}
              className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black"
            >
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

