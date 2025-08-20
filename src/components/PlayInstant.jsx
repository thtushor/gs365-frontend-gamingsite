import React from "react";
import playGif from "../assets/play.gif";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../contexts/auth-context";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../lib/api/config";
import { toast } from "react-toastify";
import axiosInstance from "../lib/api/axios";

const PlayInstant = () => {
  const { user } = useAuth();
  const [showPlayInstant, setShowPlayInstant] = React.useState(true);
  const handleClose = () => {
    setShowPlayInstant(false);
  };

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
        toast.success("Game session created successfully!");
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
  return showPlayInstant ? (
    <div className="fixed bottom-16 md:bottom-5 left-3 md:left-10 z-[9999]">
      <div
        onClick={handleClose}
        className="ml-auto mr-[-15px] mb-[-10px] cursor-pointer text-[17px] md:text-[25px] bg-white/10 md:w-[35px] md:h-[35px] w-[23px] h-[23px] flex items-center justify-center rounded-full"
      >
        <IoClose />
      </div>
      <div
        onClick={() => handlePlayGame(1)}
        className="md:w-[130px] cursor-pointer md:h-[130px] w-[70px] h-[70px]"
      >
        <img
          src={playGif}
          className="md:w-[130px] md:h-[130px] w-[70px] h-[70px]"
          alt=""
        />
      </div>
    </div>
  ) : null;
};

export default PlayInstant;
