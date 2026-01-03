import { AlertCircle, CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import type { DiagnosisResult } from "../../data/aiDiagnosis";
import { formatConfidence, getSeverityColor } from "../../data/aiDiagnosis";

interface AIResultsProps {
  results: DiagnosisResult[];
  onBookConsultation?: () => void;
  onUploadAnother?: () => void;
  showActions?: boolean;
}

export const AIResults = ({
  results,
  onBookConsultation,
  onUploadAnother,
  showActions = true,
}: AIResultsProps) => {
  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={result.id} className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#E4B68A]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-(--color-gray-darker)">
                Analysis Complete
              </h3>
              <p className="text-sm text-(--color-slate)">
                Image {index + 1} of {results.length}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Image Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-(--color-gray-darker) mb-3">
                  Uploaded Image
                </p>
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={result.imageUrl}
                    alt="Uploaded skin condition"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="lg:col-span-2 space-y-4">
              {/* Detected Conditions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-(--color-gray-darker)">
                    Detected Conditions
                  </h4>
                  <span className="text-xs text-(--color-slate) bg-(--color-cream) px-3 py-1 rounded-full">
                    Top {result.conditions.length} Matches
                  </span>
                </div>

                <div className="space-y-4">
                  {result.conditions.map((condition, idx) => {
                    const severityColors = getSeverityColor(condition.severity);

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-gray-200 hover:border-[#E4B68A] transition-colors"
                      >
                        {/* Condition Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl font-bold text-(--color-gray-darker)">
                                #{idx + 1}
                              </span>
                              <h5 className="text-lg font-semibold text-(--color-gray-darker)">
                                {condition.name}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${severityColors.bg} ${severityColors.text}`}
                              >
                                {condition.severity.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Confidence Badge */}
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#E4B68A]">
                              {formatConfidence(condition.confidence)}
                            </div>
                            <p className="text-xs text-(--color-slate)">
                              Confidence
                            </p>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="mb-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E4B68A] rounded-full transition-all duration-500"
                              style={{ width: `${condition.confidence}%` }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-(--color-slate) mb-3">
                          {condition.description}
                        </p>

                        {/* Recommendations */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-(--color-gray-darker)">
                            Recommendations:
                          </p>
                          <ul className="space-y-1">
                            {condition.recommendations.map((rec, recIdx) => (
                              <li
                                key={recIdx}
                                className="text-sm text-(--color-slate) flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E4B68A] mt-1.5 shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Important Notice */}
              {result.requiresDermatologist && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-orange-900 mb-1">
                        Dermatologist Review Recommended
                      </p>
                      <p className="text-sm text-orange-700">
                        While our AI provides preliminary insights, we strongly
                        recommend booking a consultation with a board-certified
                        dermatologist for accurate diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900">
                      <strong>Medical Disclaimer:</strong> This AI analysis is
                      for informational purposes only and should not be
                      considered medical advice. Always consult with a
                      qualified healthcare provider for diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      {showActions && (
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          {onBookConsultation && (
            <Button
              onClick={onBookConsultation}
              className="flex-1 bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-12"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation with Dermatologist
            </Button>
          )}
          {onUploadAnother && (
            <Button
              onClick={onUploadAnother}
              variant="outline"
              className="flex-1 border-gray-300 text-(--color-gray-darker) hover:bg-gray-50 rounded-lg h-12"
            >
              Upload Another Image
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

