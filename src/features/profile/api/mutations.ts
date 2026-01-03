import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/client";
import { toast } from "sonner";
import { authKeys } from "../../auth/api/key";
import type { LoginUser } from "../../auth/types";
import { handleResponse } from "../../../utils/response";

// Types
export interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  date_of_birth?: string;
  avatar?: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  appointmentReminders: boolean;
  resultsReady: boolean;
  promotions: boolean;
}

export interface PrivacySettings {
  shareData: boolean;
  showProfile: boolean;
}

// Update Profile Mutation
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginUser, Error, UpdateProfileInput>({
    mutationFn: async (data) => {
      const response = await apiClient("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const result = await handleResponse<LoginUser>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to update profile");
      }

      return result.data;
    },
    onSuccess: (data) => {
      // Update the cache with new user data
      queryClient.setQueryData(authKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

// Change Password Mutation
export const useChangePasswordMutation = () => {
  return useMutation<{ message: string }, Error, ChangePasswordInput>({
    mutationFn: async (data) => {
      // Validate passwords match
      if (data.new_password !== data.confirm_password) {
        throw new Error("Passwords do not match");
      }

      // Validate password strength
      if (data.new_password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const response = await apiClient("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          current_password: data.current_password,
          new_password: data.new_password,
        }),
      });

      const result = await handleResponse<{ message: string }>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to change password");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};

// Update Notification Settings Mutation
export const useUpdateNotificationsMutation = () => {
  return useMutation<{ message: string }, Error, NotificationSettings>({
    mutationFn: async (data) => {
      const response = await apiClient("/settings/notifications", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const result = await handleResponse<{ message: string }>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to update notification settings");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Notification settings updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update settings");
    },
  });
};

// Update Privacy Settings Mutation
export const useUpdatePrivacyMutation = () => {
  return useMutation<{ message: string }, Error, PrivacySettings>({
    mutationFn: async (data) => {
      const response = await apiClient("/settings/privacy", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const result = await handleResponse<{ message: string }>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to update privacy settings");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Privacy settings updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update settings");
    },
  });
};

// Export Data Mutation
export const useExportDataMutation = () => {
  return useMutation<{ message: string; download_url?: string }, Error>({
    mutationFn: async () => {
      const response = await apiClient("/auth/export-data", {
        method: "POST",
      });

      const result = await handleResponse<{
        message: string;
        download_url?: string;
      }>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to request data export");
      }

      return result.data;
    },
    onSuccess: (data) => {
      if (data.download_url) {
        // If download URL is provided, trigger download
        window.open(data.download_url, "_blank");
        toast.success("Your data export is ready");
      } else {
        toast.success(
          "Your data export is being prepared. You'll receive it via email."
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to export data");
    },
  });
};

// Delete Account Mutation
export const useDeleteAccountMutation = () => {
  return useMutation<{ message: string }, Error, { password: string }>({
    mutationFn: async (data) => {
      const response = await apiClient("/auth/delete-account", {
        method: "DELETE",
        body: JSON.stringify(data),
      });

      const result = await handleResponse<{ message: string }>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete account");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Account deletion request submitted");
      // Redirect to logout or home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account");
    },
  });
};

// Upload Avatar Mutation
export const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginUser, Error, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiClient("/auth/avatar", {
        method: "POST",
        body: formData,
      });

      const result = await handleResponse<LoginUser>(response);

      if (!result.success) {
        throw new Error(result.error || "Failed to upload avatar");
      }

      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success("Profile photo updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload photo");
    },
  });
};

