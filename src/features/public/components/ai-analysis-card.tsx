import { useState } from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";

type SkinDefects = Array<{
  type: string;
  confidenceLevel: number;
  severity: "mild" | "moderate" | "severe";
  recommendations: string[];
}>;

const skinDefects: SkinDefects = [
  {
    type: "acne",
    confidenceLevel: 92,
    severity: "moderate",
    recommendations: [
      "Topical retinoid treatment",
      "Benzoyl peroxide cleanser",
      "Consult for oral antibiotics",
    ],
  },
  {
    type: "eczema",
    confidenceLevel: 88,
    severity: "mild",
    recommendations: [
      "Moisturize frequently with fragrance-free emollients",
      "Use gentle, non-soap cleansers",
      "Apply topical corticosteroid cream as needed",
      "Avoid known triggers (harsh soaps, wool, stress)",
    ],
  },
  {
    type: "psoriasis",
    confidenceLevel: 85,
    severity: "moderate",
    recommendations: [
      "Use vitamin D analogue creams (calcipotriene)",
      "Moisturize with thick creams or ointments",
      "Consider phototherapy (UV light treatment)",
      "Consult dermatologist for systemic treatments if severe",
    ],
  },
];

function AIAnalysisCard() {
  const [activeSkinDefect, setActiveSkinDefect] = useState("acne");

  const activeFilteredSkinDefect = skinDefects.find(
    (skinDefect) => skinDefect.type === activeSkinDefect,
  );

  return (
    <div className="min-h-[555.8159790039062px] w-full max-w-[616px] space-y-6 rounded-2xl border-t-[0.77px] border-white bg-[linear-gradient(180deg,#F5F1EB_0%,#FFFFFF_100%)] p-[32.76px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
      {/* HEADING */}
      <div className="flex items-center justify-between">
        <h3 className="text-[28px] font-semibold text-(--color-brown-dark)">
          AI Analysis Results
        </h3>
        <span className="font-inter flex h-7 w-[87.58799743652344px] items-center justify-center rounded-full bg-(--color-green-light) text-sm text-(--color-green)">
          Complete
        </span>
      </div>

      {/* SKIN DEFECT COVERAGE */}
      <ul
        aria-label="Skin condition filters"
        className="font-inter flex items-center gap-x-2 text-base"
      >
        {skinDefects.map((skinDefect) => (
          <li key={skinDefect.type}>
            <Button
              aria-pressed={activeSkinDefect === skinDefect.type}
              aria-label={`Filter by ${skinDefect.type}`}
              onClick={() => setActiveSkinDefect(skinDefect.type)}
              className={cn(
                "bg-white text-(--color-slate) capitalize",
                activeSkinDefect === skinDefect.type
                  ? "bg-(--color-brown) text-white"
                  : "bg-white",
              )}
            >
              {skinDefect.type}
            </Button>
          </li>
        ))}
      </ul>

      <div>
        <div className="font-inter mb-3 flex items-center justify-between">
          <h6 className="text-sm text-(--color-slate)">Confidence Level</h6>
          <span className="text-base text-(--color-brown)">
            {activeFilteredSkinDefect?.confidenceLevel}%
          </span>
        </div>
        <Progress
          className="bg-[#171717]/20 [&>[data-slot=progress-indicator]]:bg-[#171717]"
          value={activeFilteredSkinDefect?.confidenceLevel}
        />
      </div>

      <div className="flex h-[77.58px] items-center gap-x-3 rounded-[10px] bg-white px-4">
        <CircleAlert size={20} className="text-(--color-brown)" />
        <div className="font-inter flex flex-col">
          <h6 className="text-sm text-(--color-slate)">Severity Assessment</h6>
          <span className="text-base text-(--color-slate-darker) capitalize">
            {activeFilteredSkinDefect?.severity}
          </span>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="font-inter text-sm leading-5">
        <h6 className="mb-[11.47px] text-(--color-slate)">
          Recommended Actions
        </h6>

        <ul className="flex flex-col gap-2">
          {activeFilteredSkinDefect?.recommendations.map(
            (recommendation, i) => (
              <li className="flex gap-x-2 text-(--color-slate-dark)" key={i}>
                <CircleCheckBig size={16} className="text-[#00A63E]" />{" "}
                {recommendation}
              </li>
            ),
          )}
        </ul>
      </div>

      {/* DISCLAIMER */}
      <div className="flex min-h-14 rounded-[10px] bg-(--color-blue-light) px-3">
        <div className="my-auto flex gap-x-[7.16px]">
          <CircleAlert size={16} className="text-(--color-blue)" />
          <p className="font-inter text-xs leading-4 text-(--color-blue-dark)">
            This is an AI-generated suggestion. Please consult with a licensed
            dermatologist for confirmation and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysisCard;
