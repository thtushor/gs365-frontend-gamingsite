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
import { IoIosAddCircle, IoIosArrowBack, IoMdGift } from "react-icons/io";
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiPoliceBadgeLine,
  RiVipDiamondLine,
} from "react-icons/ri";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { BiWallet } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profileNavOption } from "./MobileNav";
import { useAuth } from "../../contexts/auth-context";
import { showToaster } from "../../lib/utils/toast";
import { IoClose } from "react-icons/io5";

const MobileSideBar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, logout: handleContextLogout } = useAuth();
  const sidebarLinks = [
    { id: 2, name: "Promotion", link: "/promotions", image: <IoMdGift /> },
    {
      name: "Favorites",
      image: <RiHeart3Fill />,
      url: "/favorites",
    },
    {
      id: 3,
      name: "Reward Center",
      link: "/profile/referral-details/cash-reward-history",
      image: <RiPoliceBadgeLine />,
    },
    { id: 4, name: "VIP", link: "/vip", image: <RiVipDiamondLine /> },
    { id: 6, name: "Deposit", link: "/deposit", image: <IoIosAddCircle /> },
    { id: 6, name: "Withdraw", link: "/withdraw", image: <BiWallet /> },
    {
      id: 1,
      name: "Invite Friends",
      link: "/profile/referral-details",
      image: <TbUserShare />,
    },
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

  const handleNavigate = (g) => {
    const url = `/category/${g.id}`;
    navigate(url);
    setSidebarOpen(false);
  };
  const handleNavigateStatic = (g) => {
    const url = g?.link;
    navigate(url);
    setSidebarOpen(false);
  };

  const handleUserProfileClick = (url) => {
    navigate(url);
    setSidebarOpen(false);
  };
  const handleLogout = async () => {
    // Clear localStorage data
    handleContextLogout();

    // Show success message
    showToaster("Logged out successfully", "success");
    setSidebarOpen(false);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-1">
        {categoryOption?.map((g) => (
          <div
            onClick={() => {
              handleNavigate(g);
            }}
            key={g?.id}
            className="flex rounded-md font-normal cursor-pointer text-[14px] gap-1 my-1 items-center justify-between"
          >
            <div className="flex items-center gap-[6px]">
              <div className="w-[17px] h-[17px] border border-white rounded-[4px] flex items-center justify-center">
                <img src={g?.imgUrl} alt={g?.title} className="w-[17px]" />
              </div>
              <p className="font-normal !text-white hover:text-yellow-400">
                {g?.title}
              </p>
            </div>

            <span className="rotate-180 text-[20px] text-white mr-[-3px] block">
              <IoIosArrowBack />
            </span>
          </div>
        ))}
        {sidebarLinks?.map((g) => (
          <div
            onClick={() => {
              handleNavigateStatic(g);
            }}
            key={g?.id}
            className=" flex gap-1 font-normal my-[6px] cursor-pointer text-[14px] rounded-md items-center justify-between"
          >
            <div className="flex items-center gap-[6px]">
              <div className="w-[17px] h-[17px] bg-white flex items-center rounded-[4px] text-[14px] justify-center text-black">
                {g?.image}
              </div>
              <p className="font-normal !text-white  hover:text-yellow-400">
                {g?.name}
              </p>
            </div>
            <span className="rotate-180 text-[20px] text-white mr-[-3px] block">
              <IoIosArrowBack />
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Options */}
      <div className="mt-[-2px]">
        {profileNavOption?.map((p, idx) => {
          const isActive = location.pathname === p.url;
          return (
            <div
              onClick={() => handleUserProfileClick(p.url)}
              key={idx}
              className={`font-normal my-4 cursor-pointer text-[14px] flex justify-between items-center w-full
                      ${isActive ? "text-yellow-400 opacity-100" : ""}`}
            >
              <p className="flex items-center gap-[6px]">
                <div className="w-[17px] h-[17px] bg-white flex items-center rounded-[4px] text-[14px] justify-center text-black">
                  {p.icon}
                </div>
                {p?.name}
              </p>
              <span className="rotate-180 text-[20px] mr-[-3px] block">
                <IoIosArrowBack />
              </span>
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="my-4">
        <button
          className="w-full px-4 py-[6px] text-[14px] border light-border text-center hover:border-yellow-400 hover:text-yellow-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileSideBar;
