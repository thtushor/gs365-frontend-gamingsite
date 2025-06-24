import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { apiService } from "./services";
import type {
  RegisterRequest,
  LoginRequest,
  UserProfile,
  Game,
  GameProvider,
  GameCategory,
  PaymentMethod,
  PaymentTransaction,
  DepositRequest,
  WithdrawalRequest,
  PaymentVerification,
  Promotion,
  SupportTicket,
  CreateTicketRequest,
} from "./services";

// Query Keys
export const queryKeys = {
  // Auth
  auth: ["auth"] as const,

  // User
  user: {
    profile: ["user", "profile"] as const,
  },

  // Games
  games: {
    all: ["games"] as const,
    lists: () => [...queryKeys.games.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.games.lists(), filters] as const,
    details: () => [...queryKeys.games.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.games.details(), id] as const,
    providers: ["games", "providers"] as const,
    categories: ["games", "categories"] as const,
    featured: ["games", "featured"] as const,
    popular: ["games", "popular"] as const,
  },

  // Payments
  payments: {
    all: ["payments"] as const,
    methods: ["payments", "methods"] as const,
    history: (filters: Record<string, unknown>) =>
      [...queryKeys.payments.all, "history", filters] as const,
  },

  // Promotions
  promotions: {
    all: ["promotions"] as const,
    lists: () => [...queryKeys.promotions.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.promotions.lists(), filters] as const,
    details: () => [...queryKeys.promotions.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.promotions.details(), id] as const,
    active: ["promotions", "active"] as const,
  },

  // Support
  support: {
    all: ["support"] as const,
    tickets: (filters: Record<string, unknown>) =>
      [...queryKeys.support.all, "tickets", filters] as const,
    messages: (ticketId: string) =>
      [...queryKeys.support.all, "tickets", ticketId, "messages"] as const,
  },
} as const;

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiService.auth.login(data),
    onSuccess: (response) => {
      // Store tokens
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => apiService.auth.register(data),
    onSuccess: (response) => {
      // Store tokens
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiService.auth.logout(),
    onSuccess: () => {
      // Clear tokens
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
  options?: UseQueryOptions<{ data: UserProfile }>
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

// Game Hooks
export const useGames = (
  params?: {
    page?: number;
    limit?: number;
    category?: string;
    provider?: string;
    search?: string;
  },
  options?: UseQueryOptions<{
    data: Game[];
    pagination: Record<string, unknown>;
  }>
) => {
  return useQuery({
    queryKey: queryKeys.games.list(params || {}),
    queryFn: () => apiService.game.getGames(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useGameDetails = (
  id: string,
  options?: UseQueryOptions<{ data: Game }>
) => {
  return useQuery({
    queryKey: queryKeys.games.detail(id),
    queryFn: () => apiService.game.getGameDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useGameProviders = (
  options?: UseQueryOptions<{ data: GameProvider[] }>
) => {
  return useQuery({
    queryKey: queryKeys.games.providers,
    queryFn: () => apiService.game.getProviders(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const useGameCategories = (
  options?: UseQueryOptions<{ data: GameCategory[] }>
) => {
  return useQuery({
    queryKey: queryKeys.games.categories,
    queryFn: () => apiService.game.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const useFeaturedGames = (
  options?: UseQueryOptions<{ data: Game[] }>
) => {
  return useQuery({
    queryKey: queryKeys.games.featured,
    queryFn: () => apiService.game.getFeaturedGames(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const usePopularGames = (
  options?: UseQueryOptions<{ data: Game[] }>
) => {
  return useQuery({
    queryKey: queryKeys.games.popular,
    queryFn: () => apiService.game.getPopularGames(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Payment Hooks
export const usePaymentMethods = (
  options?: UseQueryOptions<{ data: PaymentMethod[] }>
) => {
  return useQuery({
    queryKey: queryKeys.payments.methods,
    queryFn: () => apiService.payment.getMethods(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const usePaymentHistory = (
  params?: {
    page?: number;
    limit?: number;
    type?: "deposit" | "withdraw";
    status?: string;
  },
  options?: UseQueryOptions<{
    data: PaymentTransaction[];
    pagination: Record<string, unknown>;
  }>
) => {
  return useQuery({
    queryKey: queryKeys.payments.history(params || {}),
    queryFn: () => apiService.payment.getHistory(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepositRequest) =>
      apiService.payment.createDeposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawalRequest) =>
      apiService.payment.createWithdrawal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentVerification) =>
      apiService.payment.verifyPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
};

// Promotion Hooks
export const usePromotions = (
  params?: {
    page?: number;
    limit?: number;
    type?: string;
  },
  options?: UseQueryOptions<{
    data: Promotion[];
    pagination: Record<string, unknown>;
  }>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.list(params || {}),
    queryFn: () => apiService.promotion.getPromotions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const usePromotionDetails = (
  id: string,
  options?: UseQueryOptions<{ data: Promotion }>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.detail(id),
    queryFn: () => apiService.promotion.getPromotionDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useActivePromotions = (
  options?: UseQueryOptions<{ data: Promotion[] }>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.active,
    queryFn: () => apiService.promotion.getActivePromotions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Support Hooks
export const useSupportTickets = (
  params?: {
    page?: number;
    limit?: number;
    status?: string;
  },
  options?: UseQueryOptions<{
    data: SupportTicket[];
    pagination: Record<string, unknown>;
  }>
) => {
  return useQuery({
    queryKey: queryKeys.support.tickets(params || {}),
    queryFn: () => apiService.support.getTickets(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) =>
      apiService.support.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.all });
    },
  });
};

export const useTicketMessages = (
  ticketId: string,
  options?: UseQueryOptions<{ data: Record<string, unknown>[] }>
) => {
  return useQuery({
    queryKey: queryKeys.support.messages(ticketId),
    queryFn: () => apiService.support.getTicketMessages(ticketId),
    enabled: !!ticketId,
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      message,
    }: {
      ticketId: string;
      message: string;
    }) => apiService.support.sendMessage(ticketId, { message }),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.support.messages(ticketId),
      });
    },
  });
};
