import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

// import { AdminLoginData, AdminLoginResponse, CreateAdminData, CreateAdminResponse, ResetErrorMessage, ResetPasswordType, ResetSuccessMessage, UpdatePasswordType } from "../types";
import { handleError, handleResponse } from "../../../utils/response";
import { authService } from "../../../service/auth.service";
import { apiClient } from "../../../lib/client";
// import type { CreateAdminInput, LoginInput } from "../../../types/auth";


export const useCreateAdminMutation = () => {
  return useMutation<any, unknown, any>({
    mutationFn: async (userData: any) => {
      try {
        const response = await apiClient("/admin/create-admin", {
          method: "POST",
          body: JSON.stringify(userData),
        });
        return await handleResponse<any>(response);
      } catch (error) {
        return handleError(error);
      }
    },
  });
};

export const useLoginMutation = () => {
  return useMutation<any, unknown, any>({
    mutationFn: async (userData: any) => {
      try {
        const response = await apiClient("/admin/login", {
          method: "POST",
          body: JSON.stringify(userData),
        });
        return await handleResponse<any>(response);
      } catch (error) {
        return handleError(error);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await apiClient("/admin/logout", { method: "POST" });
      await authService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/", search: { redirect: "/dashboard" } });
      toast.success("Successfully logged out!");
    },
  });
};

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
