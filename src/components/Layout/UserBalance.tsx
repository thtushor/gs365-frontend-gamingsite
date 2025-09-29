import React, { useState } from "react";
import { EyeIcon } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import takaIcon from "../../assets/taka.png";
import dollarIcon from "../../assets/dollar.png";
import BaseModal from "../Promotion/BaseModal";
import BalanceModal from "./BalanceModal";
import { TbRefresh } from "react-icons/tb";
// import { useSettings } from "../../lib/api/hooks";

interface BalanceData {
  userId: number;
  currencyId: number;
  currencyCode: string;
  currentBalance: number;
  currentBalanceUSD:number;
}

export const UserBalance: React.FC = () => {
  // const { data: settingsData } = useSettings();
  // const conversionRate =
  //   settingsData?.data?.length > 0 ? settingsData?.data[0]?.conversionRate : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [showDollar, setShowDollar] = useState(false);
  const [showTaka, setShowTaka] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: balance,
    isLoading,
    refetch,
  } = useQuery<BalanceData | null>({
    queryKey: ["player-balance", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const res = await axiosInstance.get(`/api/balance/player/${user.id}`);
      return res.data?.data;
    },
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
  });

  const bdtBalance = Number(balance?.currentBalance ?? 0).toFixed(2);
  const dollarBalance = Number(balance?.currentBalanceUSD??0).toFixed(2);
    // (Number(bdtBalance) / Number(conversionRate)).toFixed(2) || "0";

  if (!user) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true); // Start spinning
    try {
      await refetch(); // Fetch latest data
    } finally {
      setIsRefreshing(false); // Stop spinning after data is fetched
    }
  };

  return (
    <div className="flex gap-[1px] items-center border border-yellow-300 overflow-hidden text-yellow-300 bg-yellow-300 rounded-md">
      {/* Dollar */}
      <div
        onClick={() => setShowDollar((s) => !s)}
        className="bg-[#121212] rounded-[4px] md:rounded-md py-1 px-1 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <img src={dollarIcon} className="w-[18px]" />
          <span className="text-[14px] font-medium text-white">
            {showDollar ? (
              isLoading ? (
                "..."
              ) : (
                `${
                  Number(dollarBalance) > 0
                    ? Number(dollarBalance).toFixed(2)
                    : 0
                }`
              )
            ) : (
              <div className="flex items-center gap-1">
                <span className="mb-[-7px] block text-[18px]">*****</span>
                <EyeIcon className="text-yellow-300" size={18} />
              </div>
            )}
          </span>
        </div>
      </div>

      {/* Taka */}
      <div
        onClick={() => setShowTaka((s) => !s)}
        className="bg-[#121212] rounded-[4px] md:rounded-md py-1 px-1 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <img src={takaIcon} className="w-[18px]" />
          <span className="text-[14px] font-medium text-white">
            {showTaka ? (
              isLoading ? (
                "..."
              ) : (
                `${Number(bdtBalance) > 0 ? Number(bdtBalance).toFixed(2) : 0}`
              )
            ) : (
              <div className="flex items-center gap-1">
                <span className="mb-[-7px] block text-[18px]">*****</span>
                <EyeIcon className="text-yellow-300" size={18} />
              </div>
            )}
          </span>
        </div>
      </div>

      <div
        onClick={() => setIsModalOpen(true)}
        className="h-full w-[25px] flex md:hidden items-center justify-center py-[2px] bg-yellow-300 text-[#121212] text-[20px]"
      >
        <FiPlus />
      </div>

      {/* Refresh button */}
      <div
        onClick={handleRefresh}
        className={`text-black px-1 cursor-pointer transition-transform duration-500 ${
          isRefreshing ? "animate-spin" : ""
        }`}
      >
        <TbRefresh />
      </div>

      <BaseModal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        children={
          <BalanceModal
            bdtBalance={bdtBalance}
            dollarBalance={dollarBalance}
            dollarIcon={dollarIcon}
            takaIcon={takaIcon}
            onClose={() => setIsModalOpen(false)}
          />
        }
      />
    </div>
  );
};
