import { useState } from "react";
import "./GameTypes.scss";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import GameCard from "../GameCard/GameCard";
import { API_ENDPOINTS } from "../../lib/api/config";
import axiosInstance from "../../lib/api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { LuCrown } from "react-icons/lu";

export const GameTypes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("exclusive");
  const [animate, setAnimate] = useState(false);
  console.log("selected", selected);

  const getRequest = useGetRequest();

  // Use in useQuery
  const {
    data: categoriesList,
    isLoading: categoryLoading,
    isError: categoryErr,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
        successMessage: "Categories fetched successfully", // ✅ Added
        errorMessage: "Failed to fetch categories",
      }),
  });
  const categoryOption = categoriesList?.data?.options || [];

  const {
    data: providerData,
    isLoading: providerLoading,
    isError: providerErr,
  } = useQuery({
    queryKey: ["providers", selected], // 👈 include `selected`
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORY_WISE_PROVIDER}/${selected}`,
        successMessage: "Category wise provider fetched successfully",
        errorMessage: "Failed to fetch categories",
      }),
    enabled: !!selected, // 👈 only run if `selected` has a value
  });

  const exclusiveGames = providerData?.data || [];
  console.log("exclusive", exclusiveGames);
  const providerList = providerData?.data || [];

  const handleSelect = (id) => {
    if (selected !== id) {
      setAnimate(false);
      setTimeout(() => {
        setSelected(id);
        setAnimate(true);
      }, 10);
    }
  };

  // Function to ensure 4 items per row
  const getGridItems = (items, type) => {
    const itemsPerRow = 4;
    const totalItems = items.length;
    const rows = Math.ceil(totalItems / itemsPerRow);
    const totalSlots = rows * itemsPerRow;
    const emptySlots = totalSlots - totalItems;

    const gameItems = items.map((item) => {
      // Type guard to check if it's a provider
      const isProvider = (obj) => {
        return typeof obj === "object" && obj !== null && "logo" in obj;
      };

      console.log(item);
      return (
        <div
          onClick={() =>
            navigate(
              `/play/${item?.id}/${selected}?type=${type}&providerName=${item?.name}`
            )
          }
          key={isProvider(item) ? item.id : item.key}
          className="flex items-center cursor-pointer hover:bg-gray-600 bg-gray-700 gap-3 px-[15px] py-2 rounded-md"
          data-web-category-type="GAME"
          data-game-type={isProvider(item) ? "provider" : item?.gameType}
          data-vendor-code={isProvider(item) ? item.name : item?.vendorCode}
          {...(!isProvider(item) && item?.extraData
            ? { "data-extra-data": item?.extraData }
            : {})}
        >
          <img
            loading="lazy"
            alt={isProvider(item) ? item?.name : item?.imageAlt}
            src={isProvider(item) ? item?.logo : item?.imageSrc}
            className="w-[25px] h-[25px] object-cover rounded-full"
          />
          <p className="md:!leading-3 !text-[14px]">{item?.name}</p>
        </div>
      );
    });

    return [...gameItems];
  };

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

  if (categoryLoading) {
    return (
      <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  if (categoryErr || providerErr) {
    return;
  }

  return (
    <div className="game-types-container">
      <div className="game-types-selector max-w-[1190px] px-1 md:px-[10px] md:mx-auto rounded-md">
        <div
          key="exclusive"
          className={`gametype-box min-w-[80px] ${
            selected === "exclusive" ? "active" : ""
          }`}
          onClick={() => handleSelect("exclusive")}
        >
          <div className="game-icon flex items-center justify-center text-yellow-300 min-w-[70px] h-[50px] !object-cover !p-0">
            <LuCrown size={35} />
          </div>
          <span className="game-name !text-[14px] !font-semibold">
            Exclusive
          </span>
        </div>
        {categoryOption?.length > 0 &&
          categoryOption?.map((item) => (
            <div
              key={item?.id}
              className={`gametype-box min-w-[80px] ${
                selected === item?.id ? "active" : ""
              }`}
              onClick={() => handleSelect(item.id)}
            >
              <img
                src={item?.imgUrl}
                alt={item?.title}
                className="game-icon min-w-[70px] h-[50px] !object-cover !p-0"
              />
              <span className="game-name !text-[14px] !font-semibold">
                {item?.title}
              </span>
            </div>
          ))}
      </div>

      {providerLoading ? (
        <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[80px] md:!min-h-[150px]">
          <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
        </div>
      ) : selected === "exclusive" ? (
        exclusiveGames?.length > 0 && (
          <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-start max-w-[1200px] px-[5px] md:px-[15px] mx-auto mt-3">
            {exclusiveGames.map((item, index) => (
              <div key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <GameCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlayGame}
                />
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          {providerList?.length > 0 ? (
            <div className="mt-3">
              <ul
                className={`game-types-list !cursor-default flex items-center flex-wrap max-w-[1200px] md:px-[15px] mx-auto ${
                  animate ? "slide-in" : ""
                }`}
              >
                {getGridItems(providerList || [], "games")}
              </ul>
            </div>
          ) : (
            <div className="text-[18px] border-l-[3px] border-yellow-300 max-w-[1190px] px-1 md:px-[10px] md:mx-auto rounded-md font-medium py-5 text-left">
              Provider data not found.
            </div>
          )}
        </>
      )}
    </div>
  );
};
