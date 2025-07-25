// API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  // BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  BASE_URL: "http://localhost:3000",
  // BASE_URL: import.meta.env.VITE_API_ONLY_BASE_URL,

  // API Version
  API_VERSION: "v1",

  // Timeout settings
  TIMEOUT: 30000, // 30 seconds

  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: "/api/users/register",
    AFFILIATE_REGISTER: "/api/admin/registration",
    LOGIN: "/api/users/login",
    LOGOUT: "/api/users/logout",
    REFRESH_TOKEN: "/api/users/refresh-token",
    FORGOT_PASSWORD: "/api/users/forgot-password",
    RESET_PASSWORD: "/api/users/reset-password",
    VERIFY_EMAIL: "/api/users/verify-email",
    VERIFY_PHONE: "/api/users/verify-phone",
  },

  PAYMENT: {
    GET_METHODS: "/api/payment-method",
  },

  // User endpoints
  USER: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    CHANGE_PASSWORD: "/api/users/change-password",
    UPLOAD_AVATAR: "/api/users/avatar",
  },
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to build versioned API URLs
export const buildVersionedApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}/api/${API_CONFIG.API_VERSION}${endpoint}`;
};
