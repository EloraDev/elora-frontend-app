import { queryOptions, useQuery } from "@tanstack/react-query";
import { authService } from "../../../service/auth.service";
import { handleError, handleResponse } from "../../../utils/response";
import { apiClient } from "../../../lib/client";
import { authKeys } from "./key";
import type { AuthUser } from "../types";


export const useAuthUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    retry: false,
    queryFn: async () => {
      try {
        const response = await apiClient("/users/me?include_consultation=true");

        const result = await handleResponse<AuthUser>(response);

        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: authService.isAuthenticated(),
  });
};

export const useAuthUserQueryOptions = () => {
  return queryOptions({
      queryKey: authKeys.me(),
      retry: false,
      queryFn: async () => {
        try {
          const response = await apiClient("/users/me?include_consultation=true");
  
          const result = await handleResponse<AuthUser>(response);
  
          if (!result.success) {
            throw new Error(result.error);
          }
          return result.data;
        } catch (error) {
          handleError(error);
        }
      },
      enabled: authService.isAuthenticated(),
  });
};