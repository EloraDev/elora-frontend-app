import { AlertCircle, CheckCircle2, Info, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  type DiagnosisResult,
  formatConfidence,
  getSeverityColor,
} from "../../data/aiDiagnosis";
import { Progress } from "../../components/ui/progress";

interface DiagnosisResultsProps {
  results: DiagnosisResult[];
  onBookConsultation?: () => void;
  onUploadAnother?: () => void;
  showActions?: boolean;
}

export const DiagnosisResults = ({
  results,
  onBookConsultation,
  onUploadAnother,
  showActions = true,
}: DiagnosisResultsProps) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={result.id} className="space-y-6">
          {/* Header with Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={result.imageUrl}
                  alt="Analyzed skin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-(--color-gray-darker)">
                      Analysis Result {results.length > 1 ? `#${index + 1}` : ""}
                    </h3>
                    <p className="text-sm text-(--color-slate)">
                      {new Date(result.analysisDate).toLocaleString()}
                    </p>
                  </div>
                  {result.requiresDermatologist && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-700">
                        Consultation Recommended
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-(--color-slate)">
                  <CheckCircle2 className="w-4 h-4 text-[#E4B68A]" />
                  <span>
                    {result.conditions.length} potential conditions detected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            {result.conditions.map((condition, condIndex) => {
              const severityColors = getSeverityColor(condition.severity);

              return (
                <div
                  key={condIndex}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  {/* Condition Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-(--color-gray-darker)">
                          {condition.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors.bg} ${severityColors.text}`}
                        >
                          {condition.severity.charAt(0).toUpperCase() +
                            condition.severity.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-(--color-slate)">
                        {condition.description}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-(--color-gray-darker)">
                        Confidence Level
                      </span>
                      <span className="text-sm font-bold text-[#E4B68A]">
                        {formatConfidence(condition.confidence)}
                      </span>
                    </div>
                    <Progress value={condition.confidence} className="h-2" />
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 bg-(--color-cream) rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-5 h-5 text-[#E4B68A]" />
                      <h5 className="font-semibold text-(--color-gray-darker)">
                        Recommended Actions
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {condition.recommendations.map((rec, recIndex) => (
                        <li
                          key={recIndex}
                          className="flex items-start gap-2 text-sm text-(--color-slate)"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E4B68A] mt-1.5 shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Important:</strong> This AI analysis is for informational
                  purposes only and should not replace professional medical advice.
                  Please consult with a licensed dermatologist for accurate diagnosis
                  and treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex flex-col sm:flex-row gap-3">
              {onBookConsultation && (
                <Button
                  onClick={onBookConsultation}
                  className="flex-1 bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg h-12"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Dermatologist Consultation
                </Button>
              )}
              {onUploadAnother && (
                <Button
                  onClick={onUploadAnother}
                  variant="outline"
                  className="flex-1 border-gray-300 text-(--color-gray-darker) hover:bg-gray-50 rounded-lg h-12"
                >
                  Upload Another Image
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

