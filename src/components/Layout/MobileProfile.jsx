import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, RefreshCcw } from "lucide-react";
import takaIcon from "../../assets/taka.png";
import dollarIcon from "../../assets/dollar.png";

const MobileProfile = ({
  user,
  profileNavOption,
  handleUserProfileClick,
  handleLogout,
  handleCopyName,
  profilePic,
  formatDate,
}) => {
  const location = useLocation();
  const { user: authUser } = useAuth();

  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // fetch balance
  const {
    data: balance,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["player-balance", authUser?.id],
    queryFn: async () => {
      if (!authUser?.id) return null;
      const res = await axiosInstance.get(`/api/balance/player/${authUser.id}`);
      return res.data?.data;
    },
    enabled: !!authUser?.id,
    refetchOnWindowFocus: false,
  });

  const bdtBalance = balance?.currentBalance ?? 0;
  const dollarBalance = (bdtBalance / 120).toFixed(2) || "0";

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <div className="text-left text-[14px] h-full pb-[70px]">
      {/* Header Section */}
      <div className="px-4 py-3">
        <div className="flex gap-2 items-start">
          <img src={profilePic} className="w-[40px] h-[40px] mt-1" />
          <div className="w-full">
            <div className="flex items-center justify-between w-full mb-2">
              {/* Full Legal Name */}
              <div className="pr-2">
                <span className="opacity-60 text-[14px]">Full legal name</span>
                <p
                  onClick={() => handleCopyName(user?.fullname || "Player")}
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <span className="block truncate max-w-[100px] md:max-w-[200px]">
                    {user?.fullname || "Player"}
                  </span>
                  <LuCopy />
                </p>
              </div>

              <div className="h-[40px] mt-[5px] w-[1px] bg-[#2b2b2b]"></div>

              {/* Username */}
              <div className="pl-2">
                <span className="opacity-60 text-[14px]">Username</span>
                <p
                  onClick={() => handleCopyName(user?.username || "Player")}
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <span className="truncate max-w-[90px] md:max-w-[200px]">
                    {user?.username || "Player"}
                  </span>
                  <LuCopy />
                </p>
              </div>
            </div>

            <span className="opacity-50 text-[14px]">
              Sign up date : {formatDate(user?.created_at || "", true)}
            </span>
          </div>
        </div>
      </div>

      {/* Deposit / Withdraw */}
      <div className="px-4 flex gap-5 py-[2px] header-auth">
        <div
          onClick={() => handleUserProfileClick("/deposit")}
          className="text-[#121212] !font-semibold rounded-md text-[14px] w-full px-5 !py-[14px] text-center hover:text-[#121212] signup-btn"
        >
          Deposit
        </div>
        <div
          onClick={() => handleUserProfileClick("/withdraw")}
          className="text-[#121212] text-center !font-semibold rounded-md text-[14px] w-full px-5 hover:text-[#121212] signup-btn-green"
        >
          Withdraw
        </div>
      </div>

      {/* Wallet Section */}
      <div className="px-4 py-4">
        <div className="rounded-md relative p-3 text-white bg-gradient-to-r from-[#04c0722b] via-[#0260391d] to-[#04c07136]">
          {/* Header Icons */}
          <div className="absolute right-3 top-[10px] z-[2] flex items-center gap-2">
            <EyeIcon
              size={18}
              className="cursor-pointer"
              onClick={() => setShowBalance(!showBalance)}
            />
            <RefreshCcw
              size={15}
              className={`cursor-pointer mt-[-1px] ${
                refreshing ? "animate-spin" : ""
              }`}
              onClick={handleRefresh}
            />
          </div>

          {/* Main Wallet */}
          <div className="mb-[10px]">
            <p className="text-[14px] text-white">Main wallet (BDT)</p>
            <p className="font-medium text-yellow-300 text-[15px] mt-1 gap-[5px] flex items-center justify-start">
              <img src={takaIcon} className="inline-block w-[20px]" />
              {showBalance ? (
                isLoading ? (
                  "..."
                ) : (
                  `${Number(bdtBalance).toFixed(2)}`
                )
              ) : (
                <span className="mb-[-7px] block text-[18px]">*********</span>
              )}
            </p>
          </div>

          {/* Dollar Balance */}
          <div className="mt-4">
            <p className="text-[14px] text-white">Dollar Balance (USD)</p>
            <p className="font-medium text-yellow-300 text-[15px] mt-1 gap-[5px] flex items-center justify-start">
              <img src={dollarIcon} className="inline-block w-[20px]" />
              {showBalance ? (
                isLoading ? (
                  "..."
                ) : (
                  `${dollarBalance}`
                )
              ) : (
                <span className="mb-[-7px] block text-[18px]">*********</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Options */}
      <div>
        {profileNavOption?.map((p, idx) => {
          const isActive = location.pathname === p.url;
          return (
            <div
              onClick={() => handleUserProfileClick(p.url)}
              key={idx}
              className={`font-normal px-4 py-3 pr-4 cursor-pointer text-[14px] flex justify-between items-center w-full
                ${
                  isActive
                    ? "text-yellow-400 opacity-100"
                    : "opacity-70 hover:opacity-100 hover:text-yellow-400"
                }`}
            >
              <p className="flex items-center gap-[6px]">
                <span className="text-[18px]">{p.icon}</span>
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
      <div className="px-4 py-3">
        <button
          className="w-full px-4 py-2 border light-border text-center hover:border-yellow-400 hover:text-yellow-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileProfile;
