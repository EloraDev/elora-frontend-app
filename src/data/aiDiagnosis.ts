// Mock AI diagnosis data
export interface DiagnosisCondition {
  name: string;
  confidence: number; // 0-100
  severity: "mild" | "moderate" | "severe";
  description: string;
  recommendations: string[];
}

export interface DiagnosisResult {
  id: string;
  imageUrl: string;
  conditions: DiagnosisCondition[];
  analysisDate: string;
  requiresDermatologist: boolean;
  similarCases?: {
    imageUrl: string;
    condition: string;
  }[];
}

// Simulate AI analysis with random delay
export const simulateAIAnalysis = async (
  files: File[]
): Promise<DiagnosisResult[]> => {
  // Simulate processing time (2-4 seconds)
  await new Promise((resolve) =>
    setTimeout(resolve, 2000 + Math.random() * 2000)
  );

  // Mock results for each image
  const results: DiagnosisResult[] = files.map((file) => ({
    id: `diagnosis-${Date.now()}-${Math.random()}`,
    imageUrl: URL.createObjectURL(file),
    conditions: getMockConditions(),
    analysisDate: new Date().toISOString(),
    requiresDermatologist: Math.random() > 0.5,
    similarCases: [
      {
        imageUrl: "https://via.placeholder.com/150",
        condition: "Similar case - Acne Vulgaris",
      },
      {
        imageUrl: "https://via.placeholder.com/150",
        condition: "Similar case - Moderate Acne",
      },
    ],
  }));

  return results;
};

// Generate random mock conditions
const getMockConditions = (): DiagnosisCondition[] => {
  const allConditions = [
    {
      name: "Acne Vulgaris",
      confidence: 87,
      severity: "moderate" as const,
      description:
        "Common inflammatory skin condition affecting oil glands and hair follicles, typically presenting with comedones, papules, and pustules.",
      recommendations: [
        "Cleanse face twice daily with gentle, non-comedogenic cleanser",
        "Apply benzoyl peroxide 2.5-5% topical treatment",
        "Avoid touching or picking at affected areas",
        "Consider booking consultation for prescription treatment",
      ],
    },
    {
      name: "Atopic Dermatitis (Eczema)",
      confidence: 92,
      severity: "mild" as const,
      description:
        "Chronic inflammatory skin condition characterized by dry, itchy, and inflamed skin patches.",
      recommendations: [
        "Moisturize skin regularly with fragrance-free emollients",
        "Avoid known triggers (harsh soaps, hot water, irritants)",
        "Apply hydrocortisone cream for flare-ups",
        "Consult dermatologist for severe or persistent symptoms",
      ],
    },
    {
      name: "Psoriasis",
      confidence: 78,
      severity: "moderate" as const,
      description:
        "Autoimmune condition causing rapid skin cell buildup, resulting in thick, scaly patches.",
      recommendations: [
        "Keep skin moisturized to reduce scaling",
        "Avoid triggers such as stress and skin injuries",
        "Apply topical corticosteroids as directed",
        "Book consultation for comprehensive treatment plan",
      ],
    },
    {
      name: "Contact Dermatitis",
      confidence: 85,
      severity: "mild" as const,
      description:
        "Allergic or irritant reaction causing red, itchy rash after contact with a substance.",
      recommendations: [
        "Identify and avoid the triggering substance",
        "Apply cold compress to reduce itching",
        "Use over-the-counter hydrocortisone cream",
        "See dermatologist if rash persists or worsens",
      ],
    },
    {
      name: "Rosacea",
      confidence: 81,
      severity: "moderate" as const,
      description:
        "Chronic inflammatory condition causing facial redness, visible blood vessels, and sometimes acne-like bumps.",
      recommendations: [
        "Use gentle, non-irritating skincare products",
        "Apply sunscreen SPF 30+ daily",
        "Avoid triggers (alcohol, spicy foods, extreme temperatures)",
        "Consult dermatologist for prescription treatments",
      ],
    },
    {
      name: "Seborrheic Dermatitis",
      confidence: 79,
      severity: "mild" as const,
      description:
        "Inflammatory condition causing scaly patches and red skin, mainly on scalp and oily areas of face.",
      recommendations: [
        "Use medicated shampoo with ketoconazole or selenium sulfide",
        "Apply anti-fungal cream to affected areas",
        "Keep skin clean and moisturized",
        "Book consultation if condition doesn't improve",
      ],
    },
  ];

  // Return top 3 random conditions
  const shuffled = allConditions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// Helper to format confidence
export const formatConfidence = (confidence: number): string => {
  return `${confidence}%`;
};

// Helper to get severity color
export const getSeverityColor = (
  severity: "mild" | "moderate" | "severe"
): {
  text: string;
  bg: string;
} => {
  switch (severity) {
    case "mild":
      return { text: "text-green-700", bg: "bg-green-50" };
    case "moderate":
      return { text: "text-orange-700", bg: "bg-orange-50" };
    case "severe":
      return { text: "text-red-700", bg: "bg-red-50" };
  }
};

