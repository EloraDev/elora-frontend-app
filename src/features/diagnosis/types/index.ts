import type { ErrorResponse, SuccessResponse } from "../../../types/response"

export interface DiagnosisResult {
    image?: {
      diagnosis: string
      confidence: number
    }
    text?: {
      diagnosis: string
      confidence: number
    }
    combined: {
      combined_diagnosis: string
      avg_confidence: number
    }
    similar_cases: Array<{
      case_id: number
      similarity: number
      condition: string
      image_url: string
    }>
    timestamp?: string
    uploaded_image?: File
  }

  export type CreateDiagnosisResponse = SuccessResponse<DiagnosisResult> | ErrorResponse;
  
  export interface DiagnosisRequest {
    image?: File
    symptoms?: string
  }
  
  export interface ApiResponse {
    success: boolean
    data?: DiagnosisResult
    error?: string
  }
  