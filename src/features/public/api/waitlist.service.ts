import { handleError } from "../../../utils/response";

export interface WaitlistFormData {
  name: string;
  email: string;
  skinConcern?: string;
  timestamp?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Service to handle waitlist submissions to Google Sheets
 * Uses Google Apps Script Web App as a backend endpoint
 */
export class WaitlistService {
  private static endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

  /**
   * Submit waitlist form data to Google Sheets
   * @param data - Waitlist form data
   * @returns Promise with submission result
   */
  static async submitToWaitlist(
    data: WaitlistFormData
  ): Promise<WaitlistResponse> {
    try {
      if (!this.endpoint) {
        console.error("Google Sheets webhook URL is not configured");
        return {
          success: false,
          error: "Configuration error. Please contact support.",
        };
      }

      // Add timestamp to the data
      const submissionData = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        mode: "no-cors", // Required for Google Apps Script
      });

      // Note: With no-cors mode, we can't read the response
      // So we assume success if no error was thrown
      return {
        success: true,
        message: "Successfully joined the waitlist!",
      };
    } catch (error) {
      console.error("Waitlist submission error:", error);
      return handleError(error) as WaitlistResponse;
    }
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

