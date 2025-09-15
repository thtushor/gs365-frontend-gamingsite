import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GameSlider/GameSlider.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // optional: using react-icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import GameCard from "./GameCard/GameCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/api/axios";
import { API_ENDPOINTS } from "../lib/api/config";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth-context";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow right-7 md:right-8 bg-gray-800 w-[25px] h-[25px] flex items-center justify-center rounded-md"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 2,
        top: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      <IoIosArrowBack size={20} color="white" />
    </div>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow right-0 md:right-0 bg-gray-800 w-[25px] h-[25px] flex items-center justify-center rounded-md"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 2,
        top: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      <IoIosArrowForward size={20} color="white" />
    </div>
  );
};

const eventList = [
  {
    id: 1,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 2,
    name: "https://img.b112j.com/upload/announcement/image_247687.jpg",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 3,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 4,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247687.jpg",
  },
  {
    id: 5,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 6,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247687.jpg",
  },
];
export const ExclusiveGames = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // enable arrows
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const getRequest = useGetRequest();

  // Fetch all exclusive list
  const {
    data: exclusiveData,
    isLoading: gameLoading,
    isError: gameErr,
  } = useQuery({
    queryKey: ["exclusive"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ALL_EXCLUSIVE,
      }),
  });
  console.log(exclusiveData?.data);
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
      console.log(data);
      if (data.success) {
        const token = localStorage.getItem("access_token");
        // toast.success("Game session created successfully!");
        // Open game in new window
        const tempUrl = `https://gsgameprovider-git-dev-branch-sohidulislams-projects.vercel.app/?sessionId=${data?.data?.sessionId}&token=${data?.data?.sessionToken}`;
        // window.open(data.data.url, "_blank", "noopener,noreferrer");
        window.open(tempUrl, "_blank", "noopener,noreferrer");
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

  // If only one provider, render it normally
  if (exclusiveData?.data.length === 1) {
    const event = exclusiveData?.data[0];
    return (
      <div className="game-slider-container !p-0 !py-3 !pb-5">
        <div
          onClick={() =>
            navigate(
              `/event/${event?.id}?type=${type}&eventName=${event?.name}`
            )
          }
          className=""
        >
          <img loading="lazy" src={event?.img} className="w-full h-full" />
        </div>
      </div>
    );
  }

  if (gameLoading) {
    return (
      <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  if (gameErr) {
    return;
  }

  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left pt-5">
      <h1 className="text-[18px] capitalize md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
        Exclusive
      </h1>
      <div className="game-slider-container  !p-0 !py-3 !pb-5 relative justify-start">
        {exclusiveData?.data?.length > 0 ? (
          <Slider {...settings}>
            {exclusiveData?.data.map((exclusive) => (
              <div key={exclusive.id} className="pr-2 md:pr-3">
                <GameCard
                  key={exclusive.id}
                  {...exclusive}
                  onPlayClick={handlePlayGame}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div>Exclusive data not found!</div>
        )}
      </div>
    </div>
  );
};
