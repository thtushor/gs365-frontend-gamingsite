import axiosInstance, { ApiResponse, PaginatedResponse } from "./axios";
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
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
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

// Auth Services
export const authService = {
  // Register new user
  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<LoginResponse>> => {
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
    return response.data;
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

// Game Services
export const gameService = {
  // Get games list with pagination
  getGames: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    provider?: string;
    search?: string;
  }): Promise<PaginatedResponse<Game>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.LIST, {
      params,
    });
    return response.data;
  },

  // Get game details
  getGameDetails: async (id: string): Promise<ApiResponse<Game>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.DETAILS(id));
    return response.data;
  },

  // Get game providers
  getProviders: async (): Promise<ApiResponse<GameProvider[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.PROVIDERS);
    return response.data;
  },

  // Get game categories
  getCategories: async (): Promise<ApiResponse<GameCategory[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.CATEGORIES);
    return response.data;
  },

  // Get featured games
  getFeaturedGames: async (): Promise<ApiResponse<Game[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.FEATURED);
    return response.data;
  },

  // Get popular games
  getPopularGames: async (): Promise<ApiResponse<Game[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.GAMES.POPULAR);
    return response.data;
  },
};

// Payment Services
export const paymentService = {
  // Get payment methods
  getMethods: async (): Promise<ApiResponse<PaymentMethod[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.METHODS);
    return response.data;
  },

  // Get payment history
  getHistory: async (params?: {
    page?: number;
    limit?: number;
    type?: "deposit" | "withdraw";
    status?: string;
  }): Promise<PaginatedResponse<PaymentTransaction>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.HISTORY, {
      params,
    });
    return response.data;
  },

  // Create deposit
  createDeposit: async (
    data: DepositRequest
  ): Promise<ApiResponse<PaymentTransaction>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PAYMENTS.DEPOSIT,
      data
    );
    return response.data;
  },

  // Create withdrawal
  createWithdrawal: async (
    data: WithdrawalRequest
  ): Promise<ApiResponse<PaymentTransaction>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PAYMENTS.WITHDRAW,
      data
    );
    return response.data;
  },

  // Verify payment
  verifyPayment: async (
    data: PaymentVerification
  ): Promise<ApiResponse<PaymentTransaction>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PAYMENTS.VERIFY,
      data
    );
    return response.data;
  },
};

// Promotion Services
export const promotionService = {
  // Get promotions list
  getPromotions: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<PaginatedResponse<Promotion>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROMOTIONS.LIST, {
      params,
    });
    return response.data;
  },

  // Get promotion details
  getPromotionDetails: async (id: string): Promise<ApiResponse<Promotion>> => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PROMOTIONS.DETAILS(id)
    );
    return response.data;
  },

  // Get active promotions
  getActivePromotions: async (): Promise<ApiResponse<Promotion[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROMOTIONS.ACTIVE);
    return response.data;
  },
};

// Support Services
export const supportService = {
  // Get support tickets
  getTickets: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<SupportTicket>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.SUPPORT.TICKETS, {
      params,
    });
    return response.data;
  },

  // Create support ticket
  createTicket: async (
    data: CreateTicketRequest
  ): Promise<ApiResponse<SupportTicket>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SUPPORT.CREATE_TICKET,
      data
    );
    return response.data;
  },

  // Get ticket messages
  getTicketMessages: async (
    ticketId: string
  ): Promise<ApiResponse<TicketMessage[]>> => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.SUPPORT.MESSAGES(ticketId)
    );
    return response.data;
  },

  // Send message to ticket
  sendMessage: async (
    ticketId: string,
    data: { message: string }
  ): Promise<ApiResponse<TicketMessage>> => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SUPPORT.SEND_MESSAGE(ticketId),
      data
    );
    return response.data;
  },
};

// Export all services
export const apiService = {
  auth: authService,
  user: userService,
  game: gameService,
  payment: paymentService,
  promotion: promotionService,
  support: supportService,
};
