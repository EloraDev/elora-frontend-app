import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Brain, Loader2 } from "lucide-react";
import Header from "../../public/components/header";
import Footer from "../../public/components/footer";
import { ImageUpload } from "../../../components/shared/ImageUpload";
import { AIResults } from "../../../components/shared/AIResults";
import { simulateAIAnalysis, type DiagnosisResult } from "../../../data/aiDiagnosis";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Link } from "@tanstack/react-router";

export const PublicAIDiagnosisPage = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzing(true);
    try {
      const analysisResults = await simulateAIAnalysis(selectedFiles);
      setResults(analysisResults);
      // After showing results, prompt to sign up
      setTimeout(() => {
        setShowSignupDialog(true);
      }, 3000); // Show dialog 3 seconds after results
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setResults(null);
    setShowSignupDialog(false);
  };

  const handleBookConsultation = () => {
    setShowSignupDialog(true);
  };

  return (
    <div className="min-h-screen bg-(--color-cream)">
      <Header />

      {/* Hero Section */}
      <section className="px-4 md:px-12.5 pt-12 pb-8 bg-white">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
              <Brain className="w-8 h-8 text-[#E4B68A]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-(--color-gray-darker) mb-4">
              AI Skin Analysis
            </h1>
            <p className="text-lg text-(--color-slate) mb-6">
              Get instant insights about your skin condition using advanced AI
              technology. Upload an image and receive preliminary analysis in
              seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-(--color-slate)">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E4B68A]" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E4B68A]" />
                <span>100+ Conditions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E4B68A]" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-12.5 py-12">
        <div className="mx-auto w-full max-w-[1200px]">
          {!isAnalyzing && !results && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <ImageUpload
                onImagesSelected={setSelectedFiles}
                maxFiles={3}
                maxSizeMB={5}
              />

              {selectedFiles.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={handleAnalyze}
                    className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-12 px-8"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze with AI ({selectedFiles.length}{" "}
                    {selectedFiles.length === 1 ? "image" : "images"})
                  </Button>
                </div>
              )}
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[#E4B68A] animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-(--color-gray-darker)">
                  Analyzing Your Images...
                </h3>
                <p className="text-(--color-slate)">
                  Our AI is analyzing your skin condition. This usually takes
                  2-5 seconds.
                </p>
              </div>
            </div>
          )}

          {results && (
            <AIResults
              results={results}
              onBookConsultation={handleBookConsultation}
              onUploadAnother={handleReset}
            />
          )}
        </div>
      </section>

      {/* Info Section */}
      {!results && (
        <section className="px-4 md:px-12.5 pb-16">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="grid md:grid-cols-3 gap-6">
              <InfoCard
                title="Instant Analysis"
                description="Get preliminary insights about your skin condition in seconds using our advanced AI technology."
              />
              <InfoCard
                title="Expert Review"
                description="Follow up with board-certified dermatologists for accurate diagnosis and personalized treatment."
              />
              <InfoCard
                title="Secure & Private"
                description="Your images and data are encrypted and HIPAA compliant. We prioritize your privacy."
              />
            </div>
          </div>
        </section>
      )}

      {/* Signup Dialog */}
      <Dialog open={showSignupDialog} onOpenChange={setShowSignupDialog}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-(--color-gray-darker) mb-2">
              Get Full Access
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-4">
            <p className="text-(--color-slate) mb-6">
              Create an account to save your results, book consultations with
              dermatologists, and track your skin health over time.
            </p>

            <div className="space-y-3">
              <Link to="/auth/signup">
                <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-11">
                  Create Free Account
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

            <p className="text-xs text-(--color-slate) mt-4">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

// Info Card Component
const InfoCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-(--color-gray-darker) mb-2">
        {title}
      </h3>
      <p className="text-sm text-(--color-slate)">{description}</p>
    </div>
  );
};

