import { useMutation } from "@tanstack/react-query";
import { WaitlistService, type WaitlistFormData, type WaitlistResponse } from "./waitlist.service";

/**
 * React Query mutation hook for waitlist submission
 */
export const useWaitlistMutation = () => {
  return useMutation<WaitlistResponse, Error, WaitlistFormData>({
    mutationFn: async (data: WaitlistFormData) => {
      return await WaitlistService.submitToWaitlist(data);
    },
  });
};

