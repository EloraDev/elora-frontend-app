import { create } from "zustand"
import type { DiagnosisResult } from "../types"

interface DiagnosisStore {
  currentResult: DiagnosisResult | null
  isAnalyzing: boolean
  analysisStep: number
  setCurrentResult: (result: DiagnosisResult | null) => void
  setIsAnalyzing: (analyzing: boolean) => void
  setAnalysisStep: (step: number) => void
}

export const useDiagnosisStore = create<DiagnosisStore>((set) => ({
  currentResult: null,
  isAnalyzing: false,
  analysisStep: 0,
  setCurrentResult: (result) => set({ currentResult: result }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setAnalysisStep: (step) => set({ analysisStep: step }),
}))
