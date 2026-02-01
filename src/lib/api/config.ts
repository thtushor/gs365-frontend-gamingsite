export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: "https://api.gamestar365.com",
  SOCKET_URL: "https://api.gamestar365.com",
  // BASE_URL: "http://localhost:3000",
  // SOCKET_URL: "http://localhost:3000",
  // BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  // BASE_URL: import.meta.env.VITE_API_ONLY_BASE_URL,
  SINGLE_IMAGE_UPLOAD_URL: `https://api.gamestar365.com/image-upload/upload`,
  MULTIPLE_IMAGE_UPLOAD_URL: `https://api.gamestar365.com/image-upload/uploads`,

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
    GET_METHODS: "/api/payment-method", // PAy
    GET_PAYMENT_METHODS_BY_NAME: "/api/payment-method/name",
    DEPOSIT_TRANSACTION: "/api/transactions/deposit",
    WITHDRAW_TRANSACTION: "/api/transactions/withdraw",
    TURNOVER: "/api/turnover",
    CHECK_WITHDRAWAL_CAPABILITY: "/api/transactions/withdraw-capability",
    CLAIM_NOTIFICATION: "/api/transactions/claim-notification",
    CLAIM_SPIN_BONUS: "/api/transactions/claim-spin-bonus",
  },

  GAME: {
    GAME_LIST: "/api/games/games",
    PLAY_GAME: "/api/games/play",
  },

  // User endpoints
  USER: {
    PROFILE: "/api/users/profile",
    USER_BALANCE: "/api/balance/player",
    UPDATE_PROFILE: "/api/users/profile",
    CHANGE_PASSWORD: "/api/users/change-password",
    UPLOAD_AVATAR: "/api/users/avatar",
    TURNOVER: "/api/turnover",
  },

  // kyc endpoints
  KYC: {
    SUBMIT_KYC: "/api/users/create-update-kyc",
    GET_ALL_KYC: "/api/users/kyc",
  },

  // Chat endpoints
  CHAT: {
    CREATE_CHAT: "/api/chats",
    CHAT_UNREAD_COUNT: "/api/chats/count-unread",
    GET_MESSAGES: "/api/messages/chat", // Will append chatId
    SEND_MESSAGE: "/api/messages/send-message",
    READ_MESSAGES: "/api/messages/read", // Will append chatId
    ADMIN_USER_MESSAGES: "/api/messages/user-admin",
    GUEST_USER_MESSAGES: "/api/messages/guest-sender/:guestSenderId",
  },

  // User phone endpoints
  USER_PHONES: {
    CREATE: "/api/user-phones",
    BY_USER: "/api/user-phones/user/:userId",
    UPDATE: "/api/user-phones/update/:id",
    DELETE: "/api/user-phones/delete/:id",
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

// Image Upload Server configuration
export const Image_BASE_URL = "https://glorypos.com/image-upload";
export const SINGLE_IMAGE_UPLOAD_URL = `${Image_BASE_URL}/upload`;
export const MULTIPLE_IMAGE_UPLOAD_URL = `${Image_BASE_URL}/uploads`;
