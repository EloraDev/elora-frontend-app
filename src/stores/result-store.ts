import { create } from 'zustand'
import type { DiagnosisResult } from '../features/diagnosis/types'

interface ResultStore {
  result: DiagnosisResult | null
  setResult: (result: DiagnosisResult) => void
  clearResult: () => void
}

export const useResultStore = create<ResultStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
}))
