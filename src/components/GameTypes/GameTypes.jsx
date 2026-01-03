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
import exclusive1 from "../../assets/kyc-verify.png";
import placeholder from "../../assets/placeholder.svg";
import GameSkeleton from "../Shared/GameSkeleton";
import { NotFound, ThemeRed } from "../Shared/empty";
import SmallProviderCard from "../GameGrid/SmallProviderCard";

export const GameTypes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("exclusive");
  const [animate, setAnimate] = useState(false);

  const getRequest = useGetRequest();

  // Fetch categories
  const {
    data: categoriesList,
    isLoading: categoryLoading,
    isError: categoryErr,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
        successMessage: "Categories fetched successfully",
        errorMessage: "Failed to fetch categories",
      }),
  });

  const categoryOption = categoriesList?.data?.options || [];

  // Fetch providers/games based on selected category
  const {
    data: providerData,
    isLoading: providerLoading,
    isError: providerErr,
  } = useQuery({
    queryKey: ["providers", selected],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORY_WISE_PROVIDER}/${selected}`,
        successMessage: "Category wise provider fetched successfully",
        errorMessage: "Failed to fetch providers",
      }),
    enabled: !!selected,
  });

  const exclusiveGames = selected === "exclusive" ? providerData?.data || [] : [];
  const providerList = selected !== "exclusive" ? providerData?.data || [] : [];

  const handleSelect = (id) => {
    if (selected !== id) {
      setAnimate(false);
      setTimeout(() => {
        setSelected(id);
        setAnimate(true);
      }, 10);
    }
  };

  const playGameMutation = useMutation({
    mutationFn: async (request) => {
      const response = await axiosInstance.post(API_ENDPOINTS.GAME.PLAY_GAME, request);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        window.open(data.data.url, "_blank", "noopener,noreferrer");
      } else {
        toast.error(data.message || "Failed to create game session");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to start game");
    },
  });

  const handlePlayGame = (gameId) => {
    if (!user?.id) {
      toast.error("Please login to play games");
      return;
    }

    playGameMutation.mutate({
      userId: user.id,
      gameId,
      betAmount: 0,
      userScore: 0,
    });
  };

  // Function to render provider items (for non-exclusive categories)
  const getGridItems = (items, type, navigate, selected) => {
  return items.map((item) => {
    const isProvider = item && "logo" in item;

    // For providers → use the reusable SmallProviderCard with custom navigation
    if (isProvider) {
      return (
        <SmallProviderCard
          key={item.id}
          provider={item}
          type={type} 
         url={`/play/${item.id}/${selected}?type=${type}&providerName=${item.name}`}
         navigate={navigate}
          // Optional: override any outer wrapper classes if needed
          className="!py-0" // adjusts padding to match your original grid item
          version={3}
          isDynamic
        />
      );
    }

    // For games (non-providers) → keep original rendering
    return (
      <div
        key={item.key}
        onClick={() =>
          navigate(
            `/play/${item?.id}/${selected}?type=${type}&providerName=${item?.name}`
          )
        }
        className="flex items-center cursor-pointer hover:bg-gray-600 bg-gray-700 gap-3 px-[15px] py-2 rounded-md"
        data-web-category-type="GAME"
        data-game-type={item?.gameType}
        data-vendor-code={item?.vendorCode}
        {...(item?.extraData ? { "data-extra-data": item.extraData } : {})}
      >
        <img
          loading="lazy"
          alt={item?.imageAlt}
          src={item?.imageSrc || placeholder}
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
        <p className="md:!leading-3 !text-[14px]">{item?.name}</p>
      </div>
    );
  });
};

  // Loading state for categories
  if (categoryLoading) {
    return (
      <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  if (categoryErr || providerErr) {
    return null; // Or render an error message component
  }

  return (
    <div className="game-types-container select-none">
      {/* Category Tabs */}
      <div className="game-types-selector max-w-[1190px] px-1 md:px-2 md:mx-auto rounded-md header-auth gap-[6px]">
        <div
          key="exclusive"
          className={`gametype-box !px-1 !gap-[4px] !shadow-none hover:!shadow-none min-w-[100px] !py-2 !pb-[5px] !w-fit ${selected === "exclusive" ? "signup-btn-green"  : " signup-btn-dynamic"}`}
          onClick={() => handleSelect("exclusive")}
        > 
          <div className="h-[30px] p-[2px] rounded-[4px] bg-black  overflow-hidden w-[30px]">
            <img
      src={exclusive1} 
      className=" object-contain !p-0"
    />
          </div>
          <span className="game-name !text-black !text-[13px] uppercase !font-bold">Exclusive</span>
        </div>

        {categoryOption?.map((item) => (
  <div
    key={item?.id}
    className={`gametype-box !px-1 !gap-[4px] !shadow-none hover:!shadow-none min-w-[100px]  !py-2 !pb-[5px] !w-fit ${selected === item?.id ? "signup-btn-green "  :  "signup-btn-dynamic"}`}
    onClick={() => handleSelect(item.id)}
  >
    
     <div className="h-[30px] p-[2px] rounded-[4px] bg-black  overflow-hidden w-[30px]">
          
    <img
      src={item?.imgUrl || placeholder}
      alt={item?.title}
      className="object-contain !p-0"
    />
          </div>
    <span className="game-name !text-black !text-[13px] uppercase !font-bold">
      {item?.title}
    </span>
  </div>
))}
      </div>

      {/* Main Content */}
      <div className="mt-3">
        {selected === "exclusive" ? (
          /* Exclusive Games Grid */
          <div className="w-full md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-start max-w-[1200px] mx-auto">
            {providerLoading || exclusiveGames.length === 0 ? (
              <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-start max-w-[1200px] mx-auto">
                {
                  Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <GameCard isNothing version={"content"} onPlayClick={handlePlayGame}  />
                </div>
                
              ))}
                </div>
            ) : (
              // Show actual games
              <div className="grid grid-cols-3 md:flex md:flex-wrap gap-[6px] md:gap-3 items-center justify-start max-w-[1200px] px-[5px] md:px-[15px] mx-auto mt-3 w-full">
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
            )}
          </div>
        ) : (
          /* Other Categories - Provider List */
          <>
            {providerLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="loading-spinner !w-[40px] !h-[40px]"></div>
              </div>
            ) : providerList.length > 0 ? (
              <ul
                className={`game-types-list !cursor-default flex items-center flex-wrap max-w-[1200px] md:px-[15px] mx-auto ${
                  animate ? "slide-in" : ""
                }`}
              >
                {getGridItems(providerList, "games", navigate, selected)}
              </ul>
            ) : (
              <ThemeRed> No games found for this provider.</ThemeRed>
            )}
          </>
        )}
      </div>
    </div>
  );
};