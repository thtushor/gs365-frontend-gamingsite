// API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

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
    LOGIN: "/api/users/login",
    LOGOUT: "/api/users/logout",
    REFRESH_TOKEN: "/api/users/refresh-token",
    FORGOT_PASSWORD: "/api/users/forgot-password",
    RESET_PASSWORD: "/api/users/reset-password",
    VERIFY_EMAIL: "/api/users/verify-email",
    VERIFY_PHONE: "/api/users/verify-phone",
  },

  // User endpoints
  USER: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    CHANGE_PASSWORD: "/api/users/change-password",
    UPLOAD_AVATAR: "/api/users/avatar",
  },

  // Game endpoints
  GAMES: {
    LIST: "/api/games",
    DETAILS: (id: string) => `/api/games/${id}`,
    PROVIDERS: "/api/games/providers",
    CATEGORIES: "/api/games/categories",
    FEATURED: "/api/games/featured",
    POPULAR: "/api/games/popular",
  },

  // Payment endpoints
  PAYMENTS: {
    DEPOSIT: "/api/payments/deposit",
    WITHDRAW: "/api/payments/withdraw",
    HISTORY: "/api/payments/history",
    METHODS: "/api/payments/methods",
    VERIFY: "/api/payments/verify",
  },

  // Promotions endpoints
  PROMOTIONS: {
    LIST: "/api/promotions",
    DETAILS: (id: string) => `/api/promotions/${id}`,
    ACTIVE: "/api/promotions/active",
  },

  // Support endpoints
  SUPPORT: {
    TICKETS: "/api/support/tickets",
    CREATE_TICKET: "/api/support/tickets",
    MESSAGES: (ticketId: string) => `/api/support/tickets/${ticketId}/messages`,
    SEND_MESSAGE: (ticketId: string) =>
      `/api/support/tickets/${ticketId}/messages`,
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
