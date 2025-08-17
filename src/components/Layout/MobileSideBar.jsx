import React from "react";
import sports from "../../assets/gameType/icon-sport.png";
import Casino from "../../assets/gameType/icon-casino.png";
import Slots from "../../assets/gameType/icon-slot.png";
import Table from "../../assets/gameType/icon-table.png";
import Crash from "../../assets/gameType/icon-crash.png";
import Lottery from "../../assets/gameType/icon-lottery.png";
import Fishing from "../../assets/gameType/icon-fish.png";
import Arcade from "../../assets/gameType/icon-arcade.png";
import CockFighting from "../../assets/gameType/icon-cockfighting.png";
import { TbTargetArrow, TbUserShare } from "react-icons/tb";
import { IoIosAddCircle, IoMdGift } from "react-icons/io";
import { RiPoliceBadgeLine, RiVipDiamondLine } from "react-icons/ri";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const MobileSideBar = () => {
  const sidebarLinks = [
    { id: 1, name: "Invite Friends", link: "", image: <TbUserShare /> },
    { id: 2, name: "Promotion", link: "", image: <IoMdGift /> },
    { id: 3, name: "Reward Center", link: "", image: <RiPoliceBadgeLine /> },
    { id: 4, name: "VIP", link: "", image: <RiVipDiamondLine /> },
    { id: 6, name: "Deposit", link: "", image: <IoIosAddCircle /> },
  ];

  const getRequest = useGetRequest();

  const {
    data: categoriesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
        errorMessage: "Failed to fetch categories",
      }),
  });

  const categoryOption = categoriesList?.data?.options || [];
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-1">
        {categoryOption?.map((g) => (
          <div
            key={g?.id}
            className="bg-[#1a1a2ef2] flex flex-col rounded-md pt-3 p-2 items-center justify-center"
          >
            <div className="border-yellow-300 border w-[25px] text-[18px] flex items-center justify-center h-[25px] rounded-full">
              <img src={g?.imgUrl} alt={g?.title} className="object-cover" />
            </div>
            <p className="text-[10px] font-normal">{g?.title}</p>
          </div>
        ))}
        {sidebarLinks?.map((g) => (
          <div
            key={g?.id}
            className="bg-[#1a1a2ef2] flex flex-col rounded-md pt-3 p-2 items-center justify-center"
          >
            <div className="bg-yellow-300 text-black w-[25px] text-[18px] flex items-center justify-center h-[25px] rounded-full">
              {g?.image}
            </div>
            <p className="text-[10px] font-normal">{g?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSideBar;
