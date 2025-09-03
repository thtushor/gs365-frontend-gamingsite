import React from "react";
import GameCard from "../GameCard/GameCard";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../lib/api/config";
import { toast } from "react-toastify";

const FavoriteGames = () => {
  const { favorites, user } = useAuth();
  const navigate = useNavigate();

  // Play game handler (just redirect or call your existing handler)
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

  if (!favorites || favorites.length === 0) {
    return (
      <div className="max-w-[1200px] px-[15px] mx-auto text-center py-10">
        <h2 className="text-[18px] md:text-[22px] font-semibold mb-4">
          No favorite games yet
        </h2>
        <p className="mb-5 text-gray-500">
          You haven’t added any games to your favorites.
        </p>
        <button
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Browse Games
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left">
      <div className="py-5 md:py-10">
        <h1 className="text-[18px] md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
          Your Favorite Games
        </h1>
        <div className="game-grid-container !px-0 !pb-0 mt-4">
          <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-center md:!justify-start">
            {favorites.map((game, index) => (
              <div
                key={game.gameId}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <GameCard
                  id={game.gameId}
                  name={game.gameName}
                  logo={game.gameLogo}
                  gameLogo={game.gameLogo}
                  sportLogo={game.gameLogo}
                  status="active" // Or get real status if available
                  onPlayClick={handlePlayGame}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteGames;
