/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/api/services";
import type {
  RegisterRequest,
  LoginRequest,
  UserProfile,
} from "../lib/api/services";
import { useLogin, useUserProfile } from "../lib/api/hooks";

/**
 * Authentication Context Provider
 *
 * Usage in your App.tsx or main component:
 *
 * import { AuthProvider } from './lib/api/auth-context';
 *
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <AuthProvider>
 *         <YourAppComponents />
 *       </AuthProvider>
 *     </QueryClientProvider>
 *   );
 * }
 *
 * Then in any component:
 * const { isAuthenticated, user, login, logout } = useAuth();
 */

// Authentication state interface
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
}

// Auth Context interface
interface AuthContextType extends AuthState {
  isInitialized: boolean;
  isPendingLogin: boolean;
  login: (data: LoginRequest) => Promise<any>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<any>;
  clearAuth: () => void;
  getToken: () => string | null;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  });

  const { user, isLoading: isLoadingUserProfile, error } = useUserProfile();

  const loginMutation = useLogin();

  const [isInitialized, setIsInitialized] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      clearAuth();
      return;
    }
    if (user?.id) {
      setAuthState((prev) => ({
        ...prev,
        user: user,
      }));
    }
  }, [user, error]);

  // Get token from localStorage
  const getToken = useCallback(() => {
    return localStorage.getItem("access_token");
  }, []);

  // Set token in localStorage
  const setToken = useCallback((token: string) => {
    localStorage.setItem("access_token", token);
  }, []);

  // Clear all auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    queryClient.clear();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });
  }, [queryClient]);

  // Initialize auth state
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        token,
        isLoading: false,
      }));
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
    setIsInitialized(true);
  }, [getToken]);

  // Login function
  const login = useCallback(
    async (data: LoginRequest) => {
      try {
        const response = await loginMutation.mutateAsync(data);

        const accessToken = (response as unknown as { accessToken: string })
          .accessToken;

        setToken(accessToken);
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: true,
          token: accessToken,
          isLoading: false,
        }));

        // Store user data if available - handle the response structure properly
        if (response) {
          const userData = response as any;
          // Check if the response has a nested data structure
          const actualUserData = userData.data || userData;

          localStorage.setItem("user", JSON.stringify(actualUserData));
          setAuthState((prev) => ({
            ...prev,
            user: actualUserData as UserProfile,
          }));
        }

        return response;
      } catch (error) {
        clearAuth();
        throw error;
      }
    },
    [setToken, clearAuth]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call logout API if we have a token
      const token = getToken();
      if (token) {
        await apiService.auth.logout();
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      clearAuth();
    }
  }, [getToken, clearAuth]);

  // Register function
  const { mutateAsync: register } = useMutation({
    mutationFn: (data: any) => apiService.auth.register(data),
  });

  const contextValue: AuthContextType = {
    ...authState,
    isLoading: isLoadingUserProfile || authState.isLoading,
    isInitialized,
    isPendingLogin: loginMutation?.isPending,
    login,
    logout,
    register,
    clearAuth,
    getToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
