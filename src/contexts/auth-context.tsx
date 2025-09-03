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
// Types
interface Language {
  id: number;
  code: string;
  name: string;
  status: string;
}

interface Currency {
  id: number;
  code: string;
  symbol: string;
  symbol_native: string;
  name: string;
  status: string;
}

interface Country {
  id: number;
  name: string;
  code?: string;
  flagUrl?: string;
  currencyId?: number;
  status?: string;
  currency?: Currency;
  languages: Language[];
}

interface SelectedCurrency {
  currency: string;
  language: string;
  country: Country;
}

// Authentication state interface
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
}
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
}

interface SocialImage {
  original: string;
  thumbnail: string;
}

interface Social {
  id: number;
  status: string;
  images: SocialImage;
  title: string;
  link: string;
  createdAt: string;
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
  countries: Country[] | null;
  setCountries: React.Dispatch<React.SetStateAction<Country[] | null>>;
  selectedCurrency: SelectedCurrency;
  setSelectedCurrency: (value: SelectedCurrency) => void;
  social: Social[]; // ✅ social data
  setSocial: React.Dispatch<React.SetStateAction<Social[]>>;
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
  const [social, setSocial] = useState<Social[]>([]);
  const { user, isLoading: isLoadingUserProfile, error } = useUserProfile();
  const [countries, setCountries] = useState<Country[] | null>(null);

  const fallbackCurrency: SelectedCurrency = {
    currency: "BDT",
    language: "bn",
    country: {
      flagUrl:
        "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Rjk1NzM4RTE3NzExMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RkMxQjIzMDE3NzExMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZGOTU3MzhDMTc3MTExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZGOTU3MzhEMTc3MTExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oE4gsAAAAkNJREFUeNrEVk1r1FAUPS8vmY9M2tJSpG4q6kIYu7LUTXWjG1EQCuJOf4Abf4BuXIi49Q/4A3TRXRfdCK6KCC5Uit1UFxXGQqXTZDL5ep6XpOCAM8lMBnzwXiaZd++59+S+cyPw6O4x/sMwOWfGthKcqjpw8dAgBmeDi+Q1ycEFl5A3fZXtEdME1iBNepQCq50QNw5jnO8liPjoiyOxdcbEjwVG4xM5VKXBzUJQx4BDp68/uLh3EOTOc+9KIWoaeHmhjqeXmxkr/XLg5kh6mWmTjnbed9HuRFBzEl5jcFuLgTz55GG5p/BwzQZiGsbFwMbIf0jvm48u2r8iuKTT+8fuE0sgmDfx4JuPx7s+YMtShTccmBRe+RnizkGIeFZqVocWeGBk7DzbD1A7YbqWqJbx/cMopa0nR782waCCuoE5N8ZNsoP6pMDajvaX3CQ9PqIEdaG2YZAr2kZUoXq8Y1nOYeE+ldX7nm2kWagSEVh6ITtftU2l4iJjbxfN1FkjKRa2Wj+By4re1jaBqgDsJ9g5a+HdkgXzOB7Ke0qOXjyF58s1+LNGJjITA8eZ141VG9/nJVpHcZr5AO387UQKjaMImxfreNGmuvRUxVrQANTk33xnV6/PYOtcDZJ0Osy+xcpNp2aCwbxasbGx1sokNlRT0GoN3k3QsQVurzu4RkG5xXN62iQ+s0lsLpnYW2Rp9fMuVbKsBT8EikM8bYtUs/Qa5UFRUkGqdT1Mvy3+3fi9ZPCAq8kPvQbujq0SFb8+9PgjwAAqQMkwoAhtcwAAAABJRU5ErkJggg==",
      id: 18,
      name: "Bangladesh",
      languages: [{ id: 38, code: "bn", name: "Bengali", status: "active" }],
      currency: {
        id: 11,
        code: "BDT",
        symbol: "Tk",
        symbol_native: "৳",
        name: "Bangladeshi Taka",
        status: "active",
      },
    },
  };

  const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>(
    () => {
      if (typeof window === "undefined") return fallbackCurrency;

      const country = countries?.find(
        (c) => c.id === 18 && c.languages?.some((l) => l.code === "bn")
      );

      if (country) {
        const language = country.languages.find((l) => l.code === "bn");
        if (language) {
          return {
            currency: country.currency?.code || "USD",
            language: language.code,
            country: { ...country, flagUrl: String(country.flagUrl) },
          };
        }
      }

      return fallbackCurrency;
    }
  );

  const handleSetSelectedCurrency = useCallback((value: SelectedCurrency) => {
    localStorage.setItem("selectedCurrency", JSON.stringify(value));
    setSelectedCurrency(value);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedCurrency");
      if (stored) {
        setSelectedCurrency(JSON.parse(stored));
      }
    }
  }, [countries?.length]);

  const loginMutation = useLogin();

  const [isInitialized, setIsInitialized] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) {
      clearAuth();
      return;
    }
    if (user?.id) {
      localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.removeItem("kycModalShown");
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
    countries,
    setCountries,
    selectedCurrency,
    setSelectedCurrency: handleSetSelectedCurrency,
    social,
    setSocial,
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
