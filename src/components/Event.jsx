import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GameSlider/GameSlider.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // optional: using react-icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
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

export const Event = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRequest = useGetRequest();

  const {
    data: eventsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ALL_PUBLIC_EVENTS,
        errorMessage: "Failed to fetch events",
      }),
  });
  const eventList = eventsData?.data || [];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 2.2,
        },
      },
    ],
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

  // If only one provider, render it normally
  if (eventList.length === 1) {
    const event = eventList[0];
    return (
      <div className="max-w-[1200px] px-[15px] mx-auto text-left pt-5 mb-5">
        <h1 className="text-[18px] capitalize md:text-[22px] font-semibold border-l-[2px] sm:border-l-[4px] pl-1 border-yellow-300">
          Events
        </h1>
        <div
          onClick={() => handlePlayGame(eventList[0]?.sportId)}
          className="pr-2 md:pr-3 mt-3 cursor-pointer"
        >
          <img
            loading="lazy"
            src={eventList[0]?.images?.original}
            className="w-full rounded-md full max-w-[378px] max-h-[195px] md:min-h-[195px] object-cover"
          />
        </div>
      </div>
    );
  }

  if(eventList?.length <1){
    return null;
  }

  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left pt-5">
      <h1 className="text-[18px] capitalize md:text-[22px] font-semibold border-l-[2px] sm:border-l-[4px] pl-1 border-yellow-300">
        Events
      </h1>
      <div className="game-slider-container  !p-0 !py-3 !pb-5 relative justify-start">
        <Slider {...settings}>
          {eventList.map((event) => (
            <div
              onClick={() => handlePlayGame(event?.sportId)}
              key={event.id}
              className="pr-2 md:pr-3 cursor-pointer"
            >
              <img
                loading="lazy"
                src={event?.images?.original || ""}
                className="w-full rounded-md full max-w-[378px] max-h-[195px] md:min-h-[195px] min-h-[80px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
