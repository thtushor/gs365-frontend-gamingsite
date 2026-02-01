import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiService } from "./services";
import type { RegisterRequest, LoginRequest, UserProfile } from "./services";
import type { ApiResponse } from "./axios";
import { useCallback, useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import { API_LIST, BASE_URL } from "./apiClient";
import { useSocket } from "../../socket";

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
  // const queryClient = useQueryClient();

  // const { setAuthState } = useAuth();

  const { emitEvent } = useSocket();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiService.auth.login(data),
    onSuccess: (response) => {
      // Store tokens
      // setAuthState((prev) => ({ ...prev, token: (response as unknown as { accessToken: string }).accessToken }))
      emitEvent("loggedin-user", {
        id: (response.data as unknown as { id: number }).id.toString(),
        token: (response as unknown as { accessToken: string }).accessToken
      })
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
      // queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
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
const Axios = axios.create({
  baseURL: BASE_URL, // Change to your API base URL
  // baseURL: "http://localhost:3000", // Change to your API base URL
  timeout: 30000,
});
export const useBetResults = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ["betResults", filters],
    queryFn: async () => {
      const token = localStorage.getItem("access_token"); // get token from localStorage
      const res = await Axios.get(API_LIST.GET_BET_RESULTS, {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`, // add token to headers
        },
      });
      return res.data;
    },
    ...options,
  });
};
const QUERY_KEYS = {
  TRANSACTIONS: "transactions",
};

interface TransactionFilters {
  page?: number;
  pageSize?: number;
  limit?: number;
  type?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  userId?: string;
  affiliateId?: string;
  historyType?: string;
}

// Fetch transactions with filters
export const useTransactions = ({
  page = 1,
  pageSize = 20,
  limit,
  type,
  status,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  userId,
  affiliateId,
  historyType = "user",
}: TransactionFilters = {}) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.TRANSACTIONS,
      {
        page,
        pageSize,
        limit,
        type,
        status,
        search,
        sortBy,
        sortOrder,
        userId,
        affiliateId,
        historyType,
      },
    ],
    queryFn: async () => {
      const params: Record<string, unknown> = {
        page,
        sortBy,
        sortOrder,
      };

      if (pageSize != null) params.pageSize = pageSize;
      if (limit != null) params.limit = limit;
      if (type) params.type = type;
      if (status) params.status = status;
      if (search) params.search = search;
      if (userId) params.userId = userId;
      if (affiliateId) params.affiliateId = affiliateId;
      if (historyType) params.historyType = historyType;

      // 🔑 Get token from localStorage
      const token = localStorage.getItem("access_token");

      const { data } = await Axios.get(API_LIST.PAYMENT_TRANSACTION, {
        params,
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in headers
        },
      });

      return data;
    },
    staleTime: 30 * 1000,
  });
};

// Get all settings
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      const response = await Axios.get(API_LIST.GET_SETTINGS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
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

export const useAutoLogout = (timeout = 300000) => {
  const { clearAuth } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return;

    // Update last activity timestamp
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    // Check inactivity
    const checkInactivity = () => {
      const last = localStorage.getItem("lastActivity");
      if (!last) return;
      const now = Date.now();
      if (now - parseInt(last) >= timeout) {
        clearAuth();
        localStorage.removeItem("lastActivity");
        alert("Your session has expired. Please login again.");
        window.location.reload();
      }
    };

    // Activity events
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, updateActivity));

    // Visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkInactivity();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Check every second
    const interval = setInterval(checkInactivity, 1000);

    // Initialize
    updateActivity();

    // Cleanup
    return () => {
      clearInterval(interval);
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [clearAuth, timeout]);
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: { username?: string; email: string; phone?: string }) =>
      apiService.auth.forgotPassword({ email: data.email }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => apiService.auth.resetPassword({ token: data.token, newPassword: data.password }),
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
