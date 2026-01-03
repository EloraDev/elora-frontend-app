import { queryOptions, useQuery } from "@tanstack/react-query";
import { authService } from "../../../service/auth.service";
import { handleError, handleResponse } from "../../../utils/response";
import { apiClient } from "../../../lib/client";
import { authKeys } from "./key";
import type { LoginUser } from "../types";

// Profile API response structure - the actual response from /auth/profile
// The response is: { success, message, data: { permissions, roles, user } }
interface ProfileApiResponse {
  success: boolean;
  message: string;
  data: {
    permissions: string[];
    roles: string[];
    user: LoginUser;
  };
}

export const useAuthUser = () => {
  // Get cached user for initialData - this provides immediate data while fetching
  const cachedUser = authService.getUser();
  
  return useQuery({
    queryKey: authKeys.me(),
    retry: false,
    // Provide cached user as initial data for immediate display
    initialData: cachedUser ?? undefined,
    queryFn: async () => {
      try {
        const response = await apiClient("/auth/profile");

        const result = await handleResponse<ProfileApiResponse>(response);

        if (!result.success) {
          // If API call fails but we have cached user, return it
          if (cachedUser) {
            return cachedUser;
          }
          throw new Error(result.error);
        }
        
        // Extract user from nested response: result.data is the API response, 
        // result.data.data is { permissions, roles, user }, result.data.data.user is the user
        const user = result.data.data.user;
        if (user) {
          authService.setUser(user);
        }
        
        return user;
      } catch (error) {
        // If API call fails but we have cached user, return it
        if (cachedUser) {
          return cachedUser;
        }
        handleError(error);
        throw error;
      }
    },
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAuthUserQueryOptions = () => {
  return queryOptions({
      queryKey: authKeys.me(),
      retry: false,
      queryFn: async () => {
        const cachedUser = authService.getUser();
        
        try {
          const response = await apiClient("/auth/profile");
  
          const result = await handleResponse<ProfileApiResponse>(response);
  
          if (!result.success) {
            if (cachedUser) {
              return cachedUser;
            }
            throw new Error(result.error);
          }
          
          // Extract user from nested response
          const user = result.data.data.user;
          if (user) {
            authService.setUser(user);
          }
          
          return user;
        } catch (error) {
          if (cachedUser) {
            return cachedUser;
          }
          handleError(error);
          throw error;
        }
      },
      enabled: authService.isAuthenticated(),
  });
};