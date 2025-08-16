import React, { useEffect, useState } from "react";
import { CircleDollarSignIcon } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import axiosInstance from "../../lib/api/axios";

interface BalanceData {
  userId: number;
  currencyId: number;
  currencyCode: string;
  currentBalance: number;
}

export const UserBalance: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/balance/player/${user.id}`);
        setBalance(res.data?.data);
      } catch {
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, [user?.id]);

  const bdtBalance = balance?.currentBalance ?? 0;
  const dollarBalance = (bdtBalance * 120).toFixed(2);

  if (!user) return null;

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setShow((s) => !s)}>
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {show ? (loading ? "..." : `${bdtBalance} BDT`) : "****"}
          </span>
        </div>
      </button>
      <button onClick={() => setShow((s) => !s)}>
        <div className="flex items-center gap-2">
          <CircleDollarSignIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {show ? (loading ? "..." : `$${dollarBalance}`) : "****"}
          </span>
        </div>
      </button>
    </div>
  );
};