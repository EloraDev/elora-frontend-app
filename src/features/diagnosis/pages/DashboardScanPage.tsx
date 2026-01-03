import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Brain, Loader2, History } from "lucide-react";
import { ImageUpload } from "../../../components/shared/ImageUpload";
import { AIResults } from "../../../components/shared/AIResults";
import {
  simulateAIAnalysis,
  type DiagnosisResult,
} from "../../../data/aiDiagnosis";
import { Button } from "../../../components/ui/button";

// Mock history data
const MOCK_HISTORY: DiagnosisResult[] = [];

export const DashboardScanPage = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [history] = useState<DiagnosisResult[]>(MOCK_HISTORY);

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzing(true);
    try {
      const analysisResults = await simulateAIAnalysis(selectedFiles);
      setResults(analysisResults);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setResults(null);
  };

  const handleBookConsultation = () => {
    navigate({ to: "/dashboard/appointments" });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-gray-darker) mb-2">
            AI Skin Analysis
          </h1>
          <p className="text-(--color-slate)">
            Upload images for instant AI-powered analysis
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="outline"
            className="border-gray-300 text-(--color-gray-darker) hover:bg-gray-50 rounded-lg"
          >
            <History className="w-4 h-4 mr-2" />
            View History
          </Button>
        )}
      </div>

      {/* Main Content */}
      {!isAnalyzing && !results && (
        <>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <ImageUpload
              onImagesSelected={setSelectedFiles}
              maxFiles={5}
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

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#E4B68A]" />
                </div>
                <h3 className="font-semibold text-(--color-gray-darker)">
                  AI-Powered
                </h3>
              </div>
              <p className="text-sm text-(--color-slate)">
                Advanced machine learning trained on millions of dermatology
                images
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-[#E4B68A]" />
                </div>
                <h3 className="font-semibold text-(--color-gray-darker)">
                  Track Progress
                </h3>
              </div>
              <p className="text-sm text-(--color-slate)">
                Save and compare results over time to monitor skin health
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E4B68A]/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#E4B68A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-(--color-gray-darker)">
                  Secure & Private
                </h3>
              </div>
              <p className="text-sm text-(--color-slate)">
                HIPAA-compliant encryption keeps your data safe
              </p>
            </div>
          </div>
        </>
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
              Our AI is analyzing your skin condition. This usually takes 2-5
              seconds.
            </p>
            <div className="max-w-xs mx-auto">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#E4B68A] rounded-full animate-[shimmer_2s_ease-in-out_infinite]" />
              </div>
            </div>
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
  );
};

