import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { handleError, handleResponse } from "../../../utils/response";
import { authService } from "../../../service/auth.service";
import { apiClient } from "../../../lib/client";
import type { CreateUserData, UserLoginData, LoginType } from "../types";
import type { z } from "zod";
import type { registerSchema } from "../schemas";

type RegisterFormInput = z.infer<typeof registerSchema>;
type RegisterApiInput = RegisterFormInput & { primary_role: "patient" };

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  
  return useMutation<UserLoginData, unknown, RegisterApiInput>({
    mutationFn: async (userData) => {
      try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...apiData } = userData;
        
        const response = await apiClient("/auth/register", {
          method: "POST",
          body: JSON.stringify(apiData),
        });
        
        const result = await handleResponse<UserLoginData>(response);
        
        if (!result.success) {
          throw new Error(result.error || "Registration failed");
        }
        
        return result.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created! Please check your email to verify your account before logging in.", {
        duration: 6000,
      });
      // Don't auto-login or store token - user needs to verify email first
      // Redirect to login page
      navigate({ to: "/auth/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation<UserLoginData, unknown, LoginType>({
    mutationFn: async (credentials) => {
      try {
        const response = await apiClient("/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        
        const result = await handleResponse<UserLoginData>(response);
        
        if (!result.success) {
          throw new Error(result.error || "Login failed");
        }
        
        return result.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response) => {
      // The response contains the full API response with nested data
      const { data } = response;
      
      // Store the token
      if (data?.token) {
        authService.setToken(data.token);
      }
      
      // Store user data
      if (data?.user) {
        authService.setUser(data.user);
      }
      
      // Invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Logged in successfully!");
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      // Check for email verification error
      const errorMessage = error.message || "Invalid email or password";
      
      if (errorMessage.includes("verify your email")) {
        toast.error("Please verify your email address before logging in. Check your inbox for the verification link.");
      } else {
        toast.error(errorMessage);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Clear all local auth data
      await authService.logout();
    },
    onSuccess: () => {
      // Clear all query cache
      queryClient.clear();
      // Navigate to login page
      navigate({ to: "/auth/login" });
      toast.success("Successfully logged out!");
    },
  });
};

// export const useLogoutMutation = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async () => {
//       await apiClient("/admin/logout", { method: "POST" });
//       await authService.logout();
//     },
//     onSuccess: () => {
//       queryClient.clear();
//       navigate({ to: "/", search: { redirect: "/dashboard" } });
//       toast.success("Successfully logged out!");
//     },
//   });
// };

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient("/admin/update-password", {
        method: "PUT",
        body: JSON.stringify({
          token: data.token,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        return {
          details: {
            message: responseData.error || "Failed to update password"
          }
        };
      }

      return responseData;
    }
  });
};

export const useResetPasswordMutation = ()=> {
  return useMutation<any, any, any>({
    mutationFn: async (data: any)=> {
      const response = await apiClient("/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          reset_link: "https://proxymedicinedash.pages.dev/update-password"
        }),
      })

      const responseData = await response.json();
      
      if (!response.ok) {
        return {
          details: {
            message: responseData.error || "Failed to reset password"
          }
        };
      }

      return responseData;
    }
  });
}
