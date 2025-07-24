import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiService } from "./services";
import type { RegisterRequest, LoginRequest, UserProfile } from "./services";
import type { ApiResponse } from "./axios";
import { useCallback } from "react";
import { useAuth } from "../../contexts/auth-context";

/**
 * Authentication Hooks
 *
 * Usage:
 *
 * // Wrap your app with AuthProvider
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // In your component
 * const { isAuthenticated, isLoading, user, login, logout } = useAuth();
 * const { user: profileUser, isLoading: profileLoading } = useUserProfile();
 *
 * // The useUserProfile hook will automatically:
 * // - Only run when user is authenticated
 * // - Log out user if profile fetch fails with 401/403
 * // - Handle retries intelligently
 * // - Provide user data in a clean format
 */

// Query Keys
export const queryKeys = {
  // Auth
  auth: ["auth"] as const,

  // User
  user: {
    profile: ["user", "profile"] as const,
  },
} as const;

// Define the registration response data type
interface RegisterResponseData {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  // const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiService.auth.login(data),
    onSuccess: (response) => {
      // Store tokens

      localStorage.setItem(
        "access_token",
        (response as unknown as { accessToken: string }).accessToken
      );

      localStorage.setItem(
        "refresh_token",
        (response as unknown as { accessToken: string }).accessToken
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      // setUser(response.data)
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => apiService.auth.register(data),
    onSuccess: (response: ApiResponse<RegisterResponseData>) => {
      console.log(response, { response });

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout: handleContextLogout } = useAuth();

  return useMutation({
    mutationFn: () => apiService.auth.logout(),
    onSuccess: () => {
      // Clear tokens
      handleContextLogout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Clear all queries
      queryClient.clear();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: { username: string; email?: string; phone?: string }) =>
      apiService.auth.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => apiService.auth.resetPassword(data),
  });
};

// Enhanced User Profile Hook with Authentication
export const useUserProfile = (
  options?: UseQueryOptions<ApiResponse<UserProfile>>
) => {
  const getToken = useCallback(() => {
    return localStorage.getItem("access_token");
  }, []);

  const query = useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => apiService.user.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: Boolean(getToken()),
    // retry: (failureCount, error: any) => {
    //   // Don't retry if it's a 401/403 error (unauthorized/forbidden)
    //   if (error?.response?.status === 401 || error?.response?.status === 403) {
    //     return false;
    //   }
    //   return failureCount < 2;
    // },
    ...options,
  });

  return {
    ...query,
    user: query?.data?.data as unknown as UserProfile,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      apiService.user.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => apiService.user.changePassword(data),
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => apiService.user.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};
