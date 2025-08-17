import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/auth-context";
import axiosInstance from "../lib/api/axios";
import { API_ENDPOINTS } from "../lib/api/config";
import { toast } from "react-toastify";
import { FaFilter, FaSearch, FaGamepad, FaStar, FaPlay } from "react-icons/fa";
import GameCard from "../components/GameCard/GameCard";

interface GameData {
  id: number;
  name: string;
  status: string;
  isFavorite: boolean;
  gameLogo: string;
  gameUrl: string;
  ggrPercent: string;
  categoryInfo: string;
  providerInfo: string;
  provider: {
    id: number;
    name: string;
    logo: string;
    status: string;
    country: string;
  };
  createdAt: string;
}

interface GamesResponse {
  success: boolean;
  message: string;
  data: GameData[];
  count: number;
}

interface PlayGameRequest {
  userId: number;
  gameId: number;
  betAmount: number;
  userScore: number;
}

interface PlayGameResponse {
  success: boolean;
  message: string;
  data: {
    sessionToken: string;
    sessionId: string;
    url: string;
    expiresIn: string;
  };
}

const TestGame: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");

  // Fetch games using React Query
  const { data: gamesData, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: async (): Promise<GamesResponse> => {
      const response = await axiosInstance.get(API_ENDPOINTS.GAME.GAME_LIST);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Play game mutation
  const playGameMutation = useMutation({
    mutationFn: async (request: PlayGameRequest): Promise<PlayGameResponse> => {
      const response = await axiosInstance.post(API_ENDPOINTS.GAME.PLAY_GAME, request);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Game session created successfully!");
        // Open game in new window
        window.open(data.data.url, '_blank', 'noopener,noreferrer');
      } else {
        toast.error(data.message || "Failed to create game session");
      }
    },
    onError: (error: any) => {
      console.error("Play game error:", error);
      toast.error(error.response?.data?.message || "Failed to start game");
    },
  });

  const handlePlayGame = (gameId: number) => {
    if (!user?.id) {
      toast.error("Please login to play games");
      return;
    }

    const request: PlayGameRequest = {
      userId: user.id,
      gameId: gameId,
      betAmount: 0, // As requested
      userScore: 0, // As requested
    };

    playGameMutation.mutate(request);
  };

  // Filter games based on search and category
  const filteredGames = gamesData?.data?.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                           (() => {
                             try {
                               const parsed = JSON.parse(game.categoryInfo);
                               return parsed.category?.toLowerCase() === selectedCategory.toLowerCase();
                             } catch {
                               return false;
                             }
                           })();
    
    const matchesProvider = selectedProvider === "all" || 
                           game.provider.name.toLowerCase() === selectedProvider.toLowerCase();

    return matchesSearch && matchesCategory && matchesProvider;
  }) || [];

  // Get unique categories and providers for filters
  const categories = ["all", ...Array.from(new Set(
    gamesData?.data?.map(game => {
      try {
        const parsed = JSON.parse(game.categoryInfo);
        return parsed.category;
      } catch {
        return "Unknown";
      }
    }).filter(Boolean) || []
  ))];

  const providers = ["all", ...Array.from(new Set(
    gamesData?.data?.map(game => game.provider.name).filter(Boolean) || []
  ))];

  if (isLoading) {
    return (
      <div className="min-h-screen second-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen second-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <FaGamepad className="mx-auto h-16 w-16 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Games</h2>
            <p className="text-gray-400">Failed to load games. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen second-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaGamepad className="text-3xl text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Test Gaming</h1>
          </div>
          <p className="text-gray-300">Test and play all available games</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <FaGamepad className="text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Games</p>
                <p className="text-2xl font-bold text-white">{gamesData?.count || 0}</p>
              </div>
            </div>
          </div>

          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-900 rounded-lg">
                <FaPlay className="text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Active Games</p>
                <p className="text-2xl font-bold text-white">
                  {gamesData?.data?.filter(g => g.status === "active").length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-900 rounded-lg">
                <FaStar className="text-purple-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Favorite Games</p>
                <p className="text-2xl font-bold text-white">
                  {gamesData?.data?.filter(g => g.isFavorite).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="light-bg rounded-lg shadow-lg mb-6">
          <div className="p-6 second-border border-b">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FaFilter className="text-yellow-400" />
              Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Search Games</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 second-bg border second-border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 second-bg border second-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-3 py-2 second-bg border second-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider === "all" ? "All Providers" : provider}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedProvider("all");
                  }}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="light-bg rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">
              Games ({filteredGames.length})
            </h3>
            {playGameMutation.isPending && (
              <div className="flex items-center gap-2 text-yellow-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                <span className="text-sm">Starting game...</span>
              </div>
            )}
          </div>

          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <FaGamepad className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-white">No games found</h3>
              <p className="mt-1 text-sm text-gray-400">
                No games match your current filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  {...game}
                  onPlayClick={handlePlayGame}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestGame;
