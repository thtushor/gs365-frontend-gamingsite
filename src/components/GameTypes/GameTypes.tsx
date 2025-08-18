import { useState } from "react";
// import sports from "../../assets/gameType/icon-sport.png";
// import Casino from "../../assets/gameType/icon-casino.png";
// import Slots from "../../assets/gameType/icon-slot.png";
// import Table from "../../assets/gameType/icon-table.png";
// import Crash from "../../assets/gameType/icon-crash.png";
// import Lottery from "../../assets/gameType/icon-lottery.png";
// import Fishing from "../../assets/gameType/icon-fish.png";
// import Arcade from "../../assets/gameType/icon-arcade.png";
// import CockFighting from "../../assets/gameType/icon-cockfighting.png";
import "./GameTypes.scss";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Define game category types
// const gameCategories = [
//   { id: 1, name: "Sports", image: sports },
//   { id: 2, name: "Casino", image: Casino },
//   { id: 3, name: "Slot", image: Slots },
//   { id: 4, name: "Table", image: Table },
//   { id: 5, name: "Crash", image: Crash },
//   { id: 6, name: "Lottery", image: Lottery },
//   { id: 7, name: "Fishing", image: Fishing },
//   { id: 8, name: "Arcade", image: Arcade },
//   { id: 9, name: "Cock", image: CockFighting },
// ];

// Define the game data structure
interface GameItem {
  id: number | string;
  key: string;
  name: string;
  vendorCode: string;
  gameType: number;
  extraData?: string;
  imageSrc: string;
  imageAlt: string;
}

// Define types
interface CategoryOption {
  id: number;
  title: string;
  status: string;
  imgUrl?: string;
  created_at?: string;
  created_by?: string;
}

interface Category {
  id: number;
  title: string;
  status: string;
  options: CategoryOption[];
}

interface CategoriesResponse {
  data: Category;
}

interface Provider {
  id: number;
  name: string;
  parentId: number;
  status: string;
  minBalanceLimit: string;
  mainBalance: string;
  totalExpense: string;
  providerIp: string;
  licenseKey: string;
  phone: string;
  email: string;
  whatsapp: string;
  parentName: string;
  telegram: string;
  country: string;
  logo: string;
  createdAt: string;
}

export const GameTypes = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(1);
  const [animate, setAnimate] = useState(false);
  console.log("selected", selected);

  const getRequest = useGetRequest();

  // Use in useQuery
  const {
    data: categoriesList,
    isLoading: categoryLoading,
    isError: categoryErr,
  } = useQuery<CategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
        successMessage: "Categories fetched successfully", // ✅ Added
        errorMessage: "Failed to fetch categories",
      }),
  });
  const categoryOption: CategoryOption[] = categoriesList?.data?.options || [];

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

  const providerList = providerData?.data?.game_providers || [];
  const providerListSports = providerData?.data?.sport_providers || [];

  const handleSelect = (id: number) => {
    if (selected !== id) {
      setAnimate(false);
      setTimeout(() => {
        setSelected(id);
        setAnimate(true);
      }, 10);
    }
  };

  // Function to ensure 4 items per row
  const getGridItems = (items: GameItem[] | Provider[], type: string) => {
    const itemsPerRow = 4;
    const totalItems = items.length;
    const rows = Math.ceil(totalItems / itemsPerRow);
    const totalSlots = rows * itemsPerRow;
    const emptySlots = totalSlots - totalItems;

    const gameItems = items.map((item) => {
      // Type guard to check if it's a provider
      const isProvider = (obj: unknown): obj is Provider => {
        return typeof obj === "object" && obj !== null && "logo" in obj;
      };

      console.log(item);
      return (
        <li
          onClick={() =>
            navigate(
              `/${type}/${item?.id}?type=${type}&providerName=${item?.name}`
            )
          }
          key={isProvider(item) ? item.id : item.key}
          className="ng-star-inserted"
          data-web-category-type="GAME"
          data-game-type={isProvider(item) ? "provider" : item?.gameType}
          data-vendor-code={isProvider(item) ? item.name : item?.vendorCode}
          {...(!isProvider(item) && item?.extraData
            ? { "data-extra-data": item?.extraData }
            : {})}
        >
          <a>
            <img
              loading="lazy"
              alt={isProvider(item) ? item?.name : item?.imageAlt}
              src={isProvider(item) ? item?.logo : item?.imageSrc}
              className="md:!w-[50px] md:!h-[50px]"
            />
            <p className="md:!leading-3 md:!text-[12px]">{item?.name}</p>
          </a>
        </li>
      );
    });

    const emptyItems = Array(emptySlots)
      .fill(null)
      .map((_, index) => <li key={`empty-${index}`}></li>);

    return [...gameItems, ...emptyItems];
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
        {categoryOption.map((item) => (
          <div
            key={item?.id}
            className={`gametype-box md:min-w-[80px] ${
              selected === item?.id ? "active" : ""
            }`}
            onClick={() => handleSelect(item.id)}
          >
            <img
              src={item?.imgUrl}
              alt={item?.title}
              className="game-icon md:min-w-[70px] md:h-[70px]"
            />
            <span className="game-name md:!text-[14px] md:!font-medium">
              {item?.title}
            </span>
          </div>
        ))}
      </div>

      {providerLoading ? (
        <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[80px] md:!min-h-[150px]">
          <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
        </div>
      ) : providerList?.length > 0 || providerListSports?.length > 0 ? (
        <>
          {providerList?.length > 0 ? (
            <div>
              <div className="content-title !mb-0 !pb-0 max-w-[1200px] md:px-[15px] mx-auto">
                <h2 className="md:!text-[24px] ">Game Providers</h2>
              </div>

              <ul
                className={`game-types-list md:grid-cols-12 max-w-[1200px] md:px-[15px] mx-auto ${
                  animate ? "slide-in" : ""
                }`}
              >
                {getGridItems(providerList || [], "games")}
              </ul>
            </div>
          ) : (
            ""
          )}
          {providerListSports?.length > 0 ? (
            <div>
              <div className="content-title !mb-0 !pb-0 max-w-[1200px] md:px-[15px] mx-auto">
                <h2 className="md:!text-[24px] ">Sport Providers</h2>
              </div>

              <ul
                className={`game-types-list md:grid-cols-12 max-w-[1200px] md:px-[15px] mx-auto ${
                  animate ? "slide-in" : ""
                }`}
              >
                {getGridItems(providerListSports || [], "sports")}
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="text-[18px] border-l-[3px] border-yellow-300 max-w-[1190px] px-1 md:px-[10px] md:mx-auto rounded-md font-medium py-5 text-left">
          Provider data not found.
        </div>
      )}
    </div>
  );
};
