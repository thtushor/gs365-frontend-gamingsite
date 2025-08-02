import React from "react";
import { BsBank } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbReceiptBitcoin } from "react-icons/tb";
import { PiWalletBold } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../lib/api/config";
import axiosInstance from "../lib/api/axios";
import { CircleDollarSign, DollarSign } from "lucide-react";

const depositIconMap = {
  1: <BsBank size={20} />,
  2: <PiWalletBold size={22} />,
  3: <TbReceiptBitcoin size={24} />,
  4: <AiOutlineGlobal size={24} />,
};

const DepositAndWithdrawPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentQuery = location.search; // e.g., ?promotionId=promo_002
  const isDeposit = location?.pathname?.includes("deposit");
  const isWithdraw = location?.pathname?.includes("withdraw");

  const { data: paymentMethods } = useQuery({
    queryKey: [API_ENDPOINTS.PAYMENT.GET_METHODS],
    queryFn: () => {
      return axiosInstance.get(API_ENDPOINTS.PAYMENT.GET_METHODS, {
        params: {
          status: "active",
        },
      });
    },
    refetchOnWindowFocus: true,
  });

  const paymentMethodsData = paymentMethods?.data || [];

  const depositOptions = [
    {
      label: "Local Bank",
      icon: <BsBank size={20} />,
      path: "local-bank",
    },
    {
      label: "E-Wallet",
      icon: <PiWalletBold size={22} />,
      path: "e-wallet",
    },
    {
      label: "Crypto",
      icon: <TbReceiptBitcoin size={24} />,
      path: "crypto",
    },
    {
      label: "International Pay",
      icon: <AiOutlineGlobal size={24} />,
      path: "international-pay",
    },
  ];

  return (
    <div className="!max-w-[650px] mx-auto px-4 py-8">
      <h1 className="text-[22px] flex items-center font-bold ">
        <button
          onClick={() => navigate(-1)}
          className=" font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
        >
          <IoIosArrowBack />
        </button>
        {isDeposit ? "Deposit" : isWithdraw ? "Withdraw" : "N/A"}
      </h1>

      <div className="flex flex-col gap-2 mt-8">
        {paymentMethodsData.map((item) => (
          <Link
            key={item.id}
            to={`/deposit/${item.name}${currentQuery}`}
            className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 text-white rounded-md text-[18px] font-semibold flex items-center w-full justify-between"
          >
            <span className="flex items-center gap-2">
              {depositIconMap[item?.id] || <CircleDollarSign size={20} />}
              {item.name}
            </span>
            <span className="flex items-center gap-3 text-[24px]">
              <small className="text-yellow-400 text-[14px] font-medium">
                Up to 100%
              </small>
              <IoIosArrowForward />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepositAndWithdrawPage;
