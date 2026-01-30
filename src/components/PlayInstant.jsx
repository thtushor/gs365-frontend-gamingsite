import React from "react";
import playGif from "../assets/play.gif";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../contexts/auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../lib/api/config";
import { toast } from "react-toastify";
import axiosInstance from "../lib/api/axios";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";

const PlayInstant = ({ settingsData }) => {
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
        request,
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

  const getRequest = useGetRequest();

  // Fetch the existing featured game (id = 1)
  const {
    data: featuredGameDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredGame"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_FEATURED_GAME,
        errorMessage: "Failed to fetch featured game",
      }),
  });

  return showPlayInstant ? (
    isLoading || !featuredGameDetails?.data ? (
      ""
    ) : (
      <div
        className={`fixed ${settingsData ? "bottom-[145px] md:bottom-[185px]" : "bottom-[95px] md:bottom-[115px]"} select-none  left-4 z-[999]`}
      >
        <div
          onClick={handleClose}
          className="ml-auto mr-[-15px] mb-[-14px] cursor-pointer text-[18px] bg-yellow-500 text-black w-[20px] h-[20px] flex items-center justify-center rounded-full"
        >
          <IoClose />
        </div>
        <div
          onClick={() => handlePlayGame(1)}
          className="w-[50px] h-[50px] cursor-pointer"
        >
          <img
            src={featuredGameDetails?.data?.images?.original || playGif}
            className="w-[50px] h-[50px] rounded-full"
            alt=""
          />
        </div>
      </div>
    )
  ) : null;
};

export default PlayInstant;
