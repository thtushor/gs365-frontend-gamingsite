import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiService } from "./services";
import type { RegisterRequest, LoginRequest, UserProfile } from "./services";
import type { ApiResponse } from "./axios";
import { useAuth } from "../../contexts/AuthContext";

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
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiService.auth.login(data),
    onSuccess: (response) => {
      // Store tokens
      console.log({ response, data: response.data }, response);
      localStorage.setItem(
        "access_token",
        (response as unknown as { accessToken: string }).accessToken
      );

      localStorage.setItem(
        "refresh_token",
        (response as unknown as { accessToken: string }).accessToken
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response?.data || null); // set user data in context api for handling the private route

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

// User Hooks
export const useUserProfile = (
  options?: UseQueryOptions<ApiResponse<UserProfile>>
) => {
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => apiService.user.getProfile(),
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
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
