import React, { useState } from "react";
import "./GameGrid.scss";
import { Logo } from "../Logo/Logo";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameCardComponent from "../GameCard/GameCardComponent";
import GameCard from "../GameCard/GameCard";
import { API_ENDPOINTS } from "../../lib/api/config";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";

const GameGrid = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

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

  // Fetch games
  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: ["games", activeCategory, currentPage],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_CATEGORY_WISE_GAME,
        params:
          activeCategory === "all"
            ? { page: currentPage, pageSize: gamesPerPage }
            : {
                page: currentPage,
                pageSize: gamesPerPage,
                categoryId: Number(activeCategory),
              },
      }),
    keepPreviousData: true,
  });

  const games = gamesData?.data || [];
  const totalGames = gamesData?.pagination?.total || 0;

  console.log(games);

  // Handlers
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset page when category changes
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const progressPercentage = Math.min((games.length / totalGames) * 100, 100);

  // Play game mutation
  const playGameMutation = useMutation({
    mutationFn: async (request) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.GAME.PLAY_GAME,
        request
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        // toast.success("Game session created successfully!");
        // Open game in new window
        window.open(data.data.url, "_blank", "noopener,noreferrer");
      } else {
        toast.error(data.message || "Failed to create game session");
      }
    },
    onError: (error) => {
      console.error("Play game error:", error);
      toast.error(error.response?.data?.message || "Failed to start game");
    },
  });

  const handlePlayGame = (gameId) => {
    if (!user?.id) {
      toast.error("Please login to play games");
      return;
    }

    const request = {
      userId: user.id,
      gameId: gameId,
      betAmount: 0, // As requested
      userScore: 0, // As requested
    };

    playGameMutation.mutate(request);
  };

  if (categoryLoading || gamesLoading) {
    return (
      <div className="game-grid-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  console.log(games);

  return (
    <div className="game-grid-container">
      <h2 className="game-grid-title">Popular Games ({totalGames})</h2>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          All Games
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
      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-center md:!justify-start">
        {games.map((game, index) => (
          <div key={game.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <GameCard key={game.id} {...game} onPlayClick={handlePlayGame} />
          </div>
        ))}
      </div>

      {/* No Games */}
      {games.length === 0 && (
        <div className="no-games-message">No games found in this category.</div>
      )}

      {/* Load More */}
      {games.length < totalGames && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            আরও লোড করুন
          </button>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {totalGames}টির মধ্যে {games.length}টি দেখানো হয়েছে
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
