import { useMutation } from "@tanstack/react-query"

// import { apiClient } from "../../../lib/client"
import { handleError, handleResponse } from "../../../utils/response";
import type { DiagnosisFormData } from "../schemas";
import type { CreateDiagnosisResponse, DiagnosisResult } from "../types";


export const useCreateDiagnosisMutation = () => {
    return useMutation<CreateDiagnosisResponse, unknown, DiagnosisFormData>({
        mutationFn: async (variables: DiagnosisFormData) => {
            try {
                const formData = new FormData();
                
                if (variables.image) {
                    formData.append('image', variables.image);
                }
                
                if (variables.symptoms) {
                    formData.append('symptoms', variables.symptoms);
                }
                
                // Use direct fetch for public endpoint
                const response = await fetch(`http://127.0.0.1:8000/diagnose`, {
                    method: "POST",
                    body: formData,
                    // No headers needed - browser will set correct Content-Type for FormData
                });
                
                return await handleResponse<DiagnosisResult>(response);
            } catch (error) {
                return handleError(error);
            }
        },
    });
};


