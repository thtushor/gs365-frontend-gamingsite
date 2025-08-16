import React, { useState } from "react";
import { CircleDollarSignIcon } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";
import { useQuery } from "@tanstack/react-query";

interface BalanceData {
  userId: number;
  currencyId: number;
  currencyCode: string;
  currentBalance: number;
}

export const UserBalance: React.FC = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(true);

  const {
    data: balance,
    isLoading,
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

  const bdtBalance = balance?.currentBalance ?? 0;
  const dollarBalance = (bdtBalance / 120).toFixed(2)||0;

  if (!user) return null;

  return (
    <div className="flex gap-2 items-center">
      
      <button onClick={() => setShow((s) => !s)}>
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {show ? (isLoading ? "..." : `$${dollarBalance}`) : "****"}
          </span>
        </div>
      </button>

      <button onClick={() => setShow((s) => !s)}>
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {show ? (isLoading ? "..." : `${bdtBalance} BDT`) : "****"}
          </span>
        </div>
      </button>
    </div>
  );
};