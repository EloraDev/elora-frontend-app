import type { ErrorResponse, SuccessResponse } from "../types/response";

type ValidationError = {
    type: string;
    loc: string[];
    msg: string;
    input: string;
};

export const handleApiError = (error: unknown): never => {
    console.log("handleApiError", {error})
    if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred");
};

export const handleError = <T>(error: unknown, action?: string): { success: false; error: string; data?: T } => {
    console.error(`${action} error:`, error);
    return {
        success: false,
        error: error instanceof Error ? error.message : `${action} failed`,
    };
};

export const handleResponse = async <T>(
    response: Response,
): Promise<SuccessResponse<T> | ErrorResponse> => {
    const data = await response.json();

    if (!response.ok) {
        if (response.status === 400 || response.status === 422) {
            const errorMessage = Array.isArray(data.detail)
                ? data.detail.map((err: ValidationError) => err.msg).join(', ')
                : data.detail || "Validation error";

            return {
                success: false,
                error: errorMessage,
            }
        }

        return {
            success: false,
            error: data.message || "Operation failed",
        };
    }

    return {
        success: true,
        error: null,
        data: data as T
    };
};