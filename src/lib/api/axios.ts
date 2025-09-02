import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { API_CONFIG } from "./config";
import { useAuth } from "../../contexts/auth-context";

// Extend AxiosRequestConfig to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
  retry?: boolean;
  retryCount?: number;
}

// Types for API responses
export interface ApiResponse<T = unknown> {
  data: {
    status: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    data: T;
  };
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  // timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token to headers if available
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    (config as ExtendedAxiosRequestConfig).metadata = { startTime: new Date() };

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          data: config.data,
          params: config.params,
          headers: config.headers,
        }
      );
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Calculate request duration
    const endTime = new Date();
    const startTime = (response.config as ExtendedAxiosRequestConfig).metadata
      ?.startTime;
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        {
          status: response.status,
          duration: `${duration}ms`,
          data: response.data,
        }
      );
    }

    // Handle successful responses
    return response;
  },

  async (error: AxiosError<ApiError>) => {
    const { logout: handleContextLogout } = useAuth();
    const originalRequest = error.config as ExtendedAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error in development
    if (import.meta.env.DEV) {
      console.error(
        `❌ API Error: ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        }`,
        {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        }
      );
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const refreshResponse = await axios.post(
            `${API_CONFIG.BASE_URL}/api/users/refresh-token`,
            { refresh_token: refreshToken }
          );

          const { access_token, refresh_token } = refreshResponse.data.data;

          // Update tokens in localStorage
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        handleContextLogout();
        // Refresh token failed, redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // You can dispatch a logout action here if using Redux/Context
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  }
);

// Retry interceptor for failed requests
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (!config || !(config as ExtendedAxiosRequestConfig).retry) {
      return Promise.reject(error);
    }

    const extendedConfig = config as ExtendedAxiosRequestConfig;
    extendedConfig.retryCount = extendedConfig.retryCount || 0;

    if (extendedConfig.retryCount >= API_CONFIG.MAX_RETRIES) {
      return Promise.reject(error);
    }

    extendedConfig.retryCount += 1;

    // Exponential backoff
    const delay =
      API_CONFIG.RETRY_DELAY * Math.pow(2, extendedConfig.retryCount - 1);

    await new Promise((resolve) => setTimeout(resolve, delay));

    return axiosInstance(config);
  }
);

// Export the configured axios instance
export default axiosInstance;

// Export types for use in other files
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
