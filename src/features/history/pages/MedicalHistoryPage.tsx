import { useState } from "react";
import {
  FileText,
  Calendar,
  Brain,
  Pill,
  Download,
  Filter,
  Search,
  Eye,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";

// Mock data types
interface ScanRecord {
  id: string;
  date: string;
  images: string[];
  condition: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  status: "reviewed" | "pending";
}

interface ConsultationRecord {
  id: string;
  date: string;
  doctor: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  type: "video" | "async";
  diagnosis: string;
  notes: string;
  prescriptions?: string[];
  followUp?: string;
}

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: "active" | "completed" | "discontinued";
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  category: "scan" | "consultation" | "prescription" | "lab" | "other";
}

// Mock data
const MOCK_SCANS: ScanRecord[] = [
  {
    id: "scan-1",
    date: "2025-12-20T10:30:00Z",
    images: ["/img/doc_1.png"],
    condition: "Possible Acne Vulgaris",
    confidence: 87,
    severity: "medium",
    status: "reviewed",
  },
  {
    id: "scan-2",
    date: "2025-11-15T14:20:00Z",
    images: ["/img/doc_2.png"],
    condition: "Seborrheic Dermatitis",
    confidence: 92,
    severity: "low",
    status: "reviewed",
  },
];

const MOCK_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: "consult-1",
    date: "2025-12-15T16:00:00Z",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
    },
    type: "video",
    diagnosis: "Acne Vulgaris - Moderate",
    notes:
      "Patient presenting with moderate acne on face and upper back. Prescribed topical treatment and recommended lifestyle modifications.",
    prescriptions: ["Benzoyl Peroxide 5% Gel", "Adapalene 0.1% Cream"],
    followUp: "4 weeks",
  },
  {
    id: "consult-2",
    date: "2025-11-28T10:00:00Z",
    doctor: {
      name: "Dr. Michael Chen",
      specialty: "Clinical Dermatologist",
    },
    type: "async",
    diagnosis: "Seborrheic Dermatitis",
    notes:
      "Mild seborrheic dermatitis on scalp. Recommended medicated shampoo and topical antifungal.",
    prescriptions: ["Ketoconazole 2% Shampoo"],
  },
];

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-1",
    date: "2025-12-15T16:00:00Z",
    doctor: "Dr. Sarah Johnson",
    medication: "Benzoyl Peroxide 5% Gel",
    dosage: "Apply thin layer",
    frequency: "Twice daily",
    duration: "4 weeks",
    status: "active",
  },
  {
    id: "rx-2",
    date: "2025-12-15T16:00:00Z",
    doctor: "Dr. Sarah Johnson",
    medication: "Adapalene 0.1% Cream",
    dosage: "Pea-sized amount",
    frequency: "Once daily (evening)",
    duration: "8 weeks",
    status: "active",
  },
  {
    id: "rx-3",
    date: "2025-11-28T10:00:00Z",
    doctor: "Dr. Michael Chen",
    medication: "Ketoconazole 2% Shampoo",
    dosage: "5ml",
    frequency: "Twice weekly",
    duration: "6 weeks",
    status: "completed",
  },
];

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    name: "AI Analysis Report - Dec 2025",
    type: "PDF",
    date: "2025-12-20T10:30:00Z",
    size: "234 KB",
    category: "scan",
  },
  {
    id: "doc-2",
    name: "Consultation Summary - Dr. Johnson",
    type: "PDF",
    date: "2025-12-15T16:00:00Z",
    size: "156 KB",
    category: "consultation",
  },
  {
    id: "doc-3",
    name: "Prescription - Acne Treatment",
    type: "PDF",
    date: "2025-12-15T16:00:00Z",
    size: "98 KB",
    category: "prescription",
  },
  {
    id: "doc-4",
    name: "AI Analysis Report - Nov 2025",
    type: "PDF",
    date: "2025-11-15T14:20:00Z",
    size: "245 KB",
    category: "scan",
  },
];

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "discontinued":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MedicalHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);
  const [selectedConsultation, setSelectedConsultation] =
    useState<ConsultationRecord | null>(null);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
            Medical History
          </h1>
          <p className="text-(--color-slate)">
            View and manage your medical records
          </p>
        </div>

        <Button
          variant="outline"
          className="border-[#E4B68A] text-[#E4B68A] hover:bg-[#E4B68A]/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Export All Records
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-(--color-slate)" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Records</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <FileText className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">All Records</span>
            <span className="sm:hidden">All</span>
          </TabsTrigger>
          <TabsTrigger
            value="scans"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <Brain className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">AI Scans</span>
            <span className="sm:hidden">Scans</span>
          </TabsTrigger>
          <TabsTrigger
            value="consultations"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <Calendar className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">Consultations</span>
            <span className="sm:hidden">Visits</span>
          </TabsTrigger>
          <TabsTrigger
            value="prescriptions"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <Pill className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">Prescriptions</span>
            <span className="sm:hidden">Meds</span>
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-[#E4B68A] data-[state=active]:text-black px-3 py-2 md:px-4 md:py-2.5 text-sm"
          >
            <FileText className="w-4 h-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">Documents</span>
            <span className="sm:hidden">Docs</span>
          </TabsTrigger>
        </TabsList>

        {/* All Records Tab */}
        <TabsContent value="all" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-(--color-gray-darker)">
              Timeline
            </h3>
            {/* Mixed timeline of all records */}
            <div className="space-y-3">
              {MOCK_SCANS.slice(0, 1).map((scan) => (
                <ScanCard
                  key={scan.id}
                  scan={scan}
                  onClick={() => setSelectedScan(scan)}
                />
              ))}
              {MOCK_CONSULTATIONS.slice(0, 1).map((consultation) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  onClick={() => setSelectedConsultation(consultation)}
                />
              ))}
              {MOCK_SCANS.slice(1, 2).map((scan) => (
                <ScanCard
                  key={scan.id}
                  scan={scan}
                  onClick={() => setSelectedScan(scan)}
                />
              ))}
              {MOCK_CONSULTATIONS.slice(1, 2).map((consultation) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  onClick={() => setSelectedConsultation(consultation)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* AI Scans Tab */}
        <TabsContent value="scans" className="space-y-4">
          {MOCK_SCANS.map((scan) => (
            <ScanCard
              key={scan.id}
              scan={scan}
              onClick={() => setSelectedScan(scan)}
            />
          ))}
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-4">
          {MOCK_CONSULTATIONS.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
              onClick={() => setSelectedConsultation(consultation)}
            />
          ))}
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-4">
          {MOCK_PRESCRIPTIONS.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-3">
            {MOCK_DOCUMENTS.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Scan Detail Dialog */}
      <Dialog open={!!selectedScan} onOpenChange={() => setSelectedScan(null)}>
        <DialogContent className="bg-white rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-(--color-gray-darker)">
              AI Scan Details
            </DialogTitle>
          </DialogHeader>

          {selectedScan && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-(--color-slate)">
                  {formatDate(selectedScan.date)}
                </span>
                <Badge className={getSeverityColor(selectedScan.severity)}>
                  {selectedScan.severity} severity
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                  Detected Condition
                </h4>
                <p className="text-(--color-slate)">{selectedScan.condition}</p>
                <p className="text-sm text-(--color-slate) mt-1">
                  Confidence: {selectedScan.confidence}%
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                  Status
                </h4>
                <Badge variant="outline" className="capitalize">
                  {selectedScan.status}
                </Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#E4B68A] hover:bg-[#D4A67A] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#E4B68A] text-[#E4B68A]"
                >
                  View Full Analysis
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Consultation Detail Dialog */}
      <Dialog
        open={!!selectedConsultation}
        onOpenChange={() => setSelectedConsultation(null)}
      >
        <DialogContent className="bg-white rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-(--color-gray-darker)">
              Consultation Details
            </DialogTitle>
          </DialogHeader>

          {selectedConsultation && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#E4B68A]" />
                </div>
                <div>
                  <p className="font-semibold text-(--color-gray-darker)">
                    {selectedConsultation.doctor.name}
                  </p>
                  <p className="text-sm text-(--color-slate)">
                    {selectedConsultation.doctor.specialty}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-(--color-slate) mb-1">
                  {formatDate(selectedConsultation.date)} •{" "}
                  {selectedConsultation.type === "video"
                    ? "Video Consultation"
                    : "Async Consultation"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                  Diagnosis
                </h4>
                <p className="text-(--color-slate)">
                  {selectedConsultation.diagnosis}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                  Doctor's Notes
                </h4>
                <p className="text-(--color-slate)">
                  {selectedConsultation.notes}
                </p>
              </div>

              {selectedConsultation.prescriptions && (
                <div>
                  <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                    Prescriptions
                  </h4>
                  <ul className="space-y-1">
                    {selectedConsultation.prescriptions.map((rx, index) => (
                      <li
                        key={index}
                        className="text-(--color-slate) flex items-center gap-2"
                      >
                        <Pill className="w-4 h-4 text-[#E4B68A]" />
                        {rx}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedConsultation.followUp && (
                <div>
                  <h4 className="font-semibold text-(--color-gray-darker) mb-2">
                    Follow-up
                  </h4>
                  <p className="text-(--color-slate)">
                    Recommended in {selectedConsultation.followUp}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-[#E4B68A] hover:bg-[#D4A67A] text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Download Summary
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#E4B68A] text-[#E4B68A]"
                >
                  Book Follow-up
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Scan Card Component
const ScanCard = ({
  scan,
  onClick,
}: {
  scan: ScanRecord;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#E4B68A] cursor-pointer transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center shrink-0">
          <Brain className="w-6 h-6 text-[#E4B68A]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-(--color-gray-darker)">
                AI Skin Analysis
              </h4>
              <p className="text-sm text-(--color-slate) flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(scan.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-(--color-slate) shrink-0" />
          </div>
          <p className="text-(--color-slate) mb-2">{scan.condition}</p>
          <div className="flex items-center gap-2">
            <Badge className={`${getSeverityColor(scan.severity)} capitalize`}>
              {scan.severity}
            </Badge>
            <span className="text-sm text-(--color-slate)">
              {scan.confidence}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Consultation Card Component
const ConsultationCard = ({
  consultation,
  onClick,
}: {
  consultation: ConsultationRecord;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#E4B68A] cursor-pointer transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#E4B68A]/10 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-[#E4B68A]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-(--color-gray-darker)">
                {consultation.doctor.name}
              </h4>
              <p className="text-sm text-(--color-slate)">
                {consultation.doctor.specialty}
              </p>
              <p className="text-xs text-(--color-slate) flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {new Date(consultation.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-(--color-slate) shrink-0" />
          </div>
          <p className="text-(--color-slate) font-medium mb-1">
            {consultation.diagnosis}
          </p>
          <Badge variant="outline" className="capitalize">
            {consultation.type} consultation
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Prescription Card Component
const PrescriptionCard = ({
  prescription,
}: {
  prescription: Prescription;
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center shrink-0">
          <Pill className="w-6 h-6 text-[#E4B68A]" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-(--color-gray-darker)">
                {prescription.medication}
              </h4>
              <p className="text-sm text-(--color-slate)">
                Prescribed by {prescription.doctor}
              </p>
              <p className="text-xs text-(--color-slate) mt-1">
                {new Date(prescription.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <Badge className={getStatusColor(prescription.status)}>
              {prescription.status}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
            <div>
              <span className="text-(--color-slate)">Dosage:</span>
              <p className="font-medium text-(--color-gray-darker)">
                {prescription.dosage}
              </p>
            </div>
            <div>
              <span className="text-(--color-slate)">Frequency:</span>
              <p className="font-medium text-(--color-gray-darker)">
                {prescription.frequency}
              </p>
            </div>
            <div>
              <span className="text-(--color-slate)">Duration:</span>
              <p className="font-medium text-(--color-gray-darker)">
                {prescription.duration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Document Card Component
const DocumentCard = ({ document }: { document: Document }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "scan":
        return <Brain className="w-5 h-5 text-[#E4B68A]" />;
      case "consultation":
        return <Calendar className="w-5 h-5 text-[#E4B68A]" />;
      case "prescription":
        return <Pill className="w-5 h-5 text-[#E4B68A]" />;
      default:
        return <FileText className="w-5 h-5 text-[#E4B68A]" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#E4B68A] transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center shrink-0">
          {getCategoryIcon(document.category)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-(--color-gray-darker) truncate">
            {document.name}
          </h4>
          <p className="text-sm text-(--color-slate)">
            {document.type} • {document.size} •{" "}
            {new Date(document.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-[#E4B68A]"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-[#E4B68A]"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

