import React, { useState } from "react";
import "./GameGrid.scss";
import { useQuery } from "@tanstack/react-query";
import GameCard from "../GameCard/GameCard";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { API_ENDPOINTS } from "../../lib/api/config";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";
import { useParams, useSearchParams } from "react-router-dom";

const ProviderGames = () => {
  const { user } = useAuth();
  const { providerId } = useParams(); // providerId from URL
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // type from query params
  const providerName = searchParams.get("providerName");

  const [activeCategory, setActiveCategory] = useState("all");
  const getRequest = useGetRequest();

  // Fetch categories
  const { data: categoriesList, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
      }),
  });

  const categoryOption = categoriesList?.data?.options || [];

  // Fetch games (auto refetch on category change)
  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: [type, providerId, type, activeCategory],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_GAMES_OR_SPORTS_BY_CATEGORY_PROVIDER,
        params:
          activeCategory === "all"
            ? { type, providerId }
            : { type, providerId, categoryId: Number(activeCategory) },
      }),
    enabled: !!providerId && !!type, // only fetch if both exist
  });

  const games = gamesData?.data || [];
  console.log(games);

  // Handlers
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId); // triggers re-fetch
  };

  // Play game
  const handlePlayGame = async (gameId) => {
    if (!user?.id) {
      toast.error("Please login to play games");
      return;
    }

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.GAME.PLAY_GAME, {
        userId: user.id,
        gameId: gameId,
        betAmount: 0,
        userScore: 0,
      });

      if (response.data.success) {
        toast.success("Game session created successfully!");
        window.open(response.data.data.url, "_blank", "noopener,noreferrer");
      } else {
        toast.error(response.data.message || "Failed to create game session");
      }
    } catch (error) {
      console.error("Play game error:", error);
      toast.error(error.response?.data?.message || "Failed to start game");
    }
  };

  if (categoryLoading || gamesLoading) {
    return (
      <div className="game-grid-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  return (
    <div className="game-grid-container !px-0 !pb-0">
      {/* Category Tabs */}
      <div className="category-tabs !justify-start !mb-[10px]">
        <button
          className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          All <span className="capitalize">{type}</span>
        </button>
        {categoryOption.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              activeCategory === String(category.id) ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(String(category.id))}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="flex flex-wrap px-[10px] gap-[6px] md:gap-3 items-center justify-start">
        {games.map((game, index) => (
          <div key={game.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <GameCard key={game.id} {...game} onPlayClick={handlePlayGame} />
          </div>
        ))}
      </div>

      {/* No Games */}
      {games.length === 0 && (
        <div className="no-games-message">
          No {type} found in this category.
        </div>
      )}
    </div>
  );
};

export default ProviderGames;
