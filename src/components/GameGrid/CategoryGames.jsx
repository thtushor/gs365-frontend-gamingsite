import React from "react";
import "./GameGrid.scss";
import { useQuery } from "@tanstack/react-query";
import GameCard from "../GameCard/GameCard";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { API_ENDPOINTS } from "../../lib/api/config";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";
import { useParams, useSearchParams } from "react-router-dom";

const CategoryGames = () => {
  const { user } = useAuth();
  const { categoryId } = useParams();

  const getRequest = useGetRequest();

  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: [categoryId],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_GAMES_OR_SPORTS_BY_CATEGORY,
        params: {
          categoryId,
        },
      }),
    enabled: !!categoryId,
  });

  const games = gamesData?.data || [];

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

  if (gamesLoading) {
    return (
      <div className="game-grid-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  console.log(games);
  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left">
      <div className="py-5 md:py-10">
        <h1 className="text-[18px] md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
          Play Now
        </h1>
        <div className="game-grid-container !px-0 !pb-0">
          {/* No Games */}
          {games?.length > 0 ? (
            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-center">
              {games.map((game, index) => (
                <div
                  key={game.id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <GameCard {...game} onPlayClick={handlePlayGame} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-games-message">
              No games and sports found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGames;
