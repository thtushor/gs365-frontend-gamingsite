import axiosInstance, { ApiResponse } from "./axios";
import { API_ENDPOINTS } from "./config";

// Types for API requests and responses
export interface RegisterRequest {
  username: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
  currency_id: number;
  refer_code?: string;
  isAgreeWithTerms: boolean;
}

export interface LoginRequest {
  userNameOrEmailorPhone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  data: {
    id: string;
    username: string;
    email: string;
    realName: string;
    phoneNumber: string;
    currencyType: string;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  realName: string;
  phoneNumber: string;
  currencyType: string;
  avatar?: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  id: string;
  name: string;
  provider: string;
  category: string;
  thumbnail: string;
  isFeatured: boolean;
  isPopular: boolean;
  minBet: number;
  maxBet: number;
}

export interface GameProvider {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
}

// Payment types
export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  logo: string;
  isActive: boolean;
  minAmount: number;
  maxAmount: number;
}

export interface PaymentTransaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepositRequest {
  amount: number;
  method: string;
  currency: string;
}

export interface WithdrawalRequest {
  amount: number;
  method: string;
  accountDetails: Record<string, unknown>;
}

export interface PaymentVerification {
  transactionId: string;
  verificationData: Record<string, unknown>;
}

// Promotion types
export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

// Support types
export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  message: string;
  isFromUser: boolean;
  createdAt: string;
}

export interface CreateTicketRequest {
  subject: string;
  message: string;
  category: string;
  priority: string;
}

interface RegisterResponseData {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

// Auth Services
export const authService = {
  // Register new user
  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<RegisterResponseData>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response;
  },

  // Refresh token
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refresh_token: refreshToken }
    );
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data: {
    username: string;
    email?: string;
    phone?: string;
  }): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      token,
    });
    return response.data;
  },

  // Verify phone
  verifyPhone: async (data: {
    phoneNumber: string;
    code: string;
  }): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.VERIFY_PHONE,
      data
    );
    return response.data;
  },
};

// User Services
export const userService = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (
    data: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data
    );
    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      data
    );
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (
    file: File
  ): Promise<ApiResponse<{ avatar: string }>> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post(
      API_ENDPOINTS.USER.UPLOAD_AVATAR,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

// Export all services
export const apiService = {
  auth: authService,
  user: userService,
};
