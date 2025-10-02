import React, { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbReceiptBitcoin } from "react-icons/tb";
import { PiWalletBold } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../lib/api/config";
import axiosInstance from "../lib/api/axios";
import { CircleDollarSign, AlertTriangle, Info } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";

const depositIconMap = {
  1: <BsBank size={20} />,
  2: <PiWalletBold size={22} />,
  3: <TbReceiptBitcoin size={24} />,
  4: <AiOutlineGlobal size={24} />,
};

const DepositAndWithdrawPage = () => {
  const getRequest = useGetRequest();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const currentQuery = location.search;
  const isDeposit = location?.pathname?.includes("deposit");
  const isWithdraw = location?.pathname?.includes("withdraw");

  const [showModal, setShowModal] = useState(false);
  const [modalReason, setModalReason] = useState("");

  const [isSystemActive, setIsSystemActive] = useState(true);

  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_SETTINGS,
        errorMessage: "Failed to fetch settings",
        isPublic: false,
      }),
  });

  const { data: paymentMethods } = useQuery({
    queryKey: [API_ENDPOINTS.PAYMENT.GET_METHODS],
    queryFn: () =>
      axiosInstance.get(API_ENDPOINTS.PAYMENT.GET_METHODS, {
        params: { status: "active" },
      }),
    refetchOnWindowFocus: true,
  });

  const { data: withdrawalCapability } = useQuery({
    queryKey: [API_ENDPOINTS.PAYMENT.CHECK_WITHDRAWAL_CAPABILITY, user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return axiosInstance.get(
        `${API_ENDPOINTS.PAYMENT.CHECK_WITHDRAWAL_CAPABILITY}/${user.id}`
      );
    },
    enabled: isWithdraw && !!user?.id,
    refetchOnWindowFocus: true,
  });

  const withdrawalData = withdrawalCapability?.data?.data;
  const paymentMethodsData = paymentMethods?.data || [];

  // Check system active time
  useEffect(() => {
    const settingsDatas = settingsData?.data?.[0];
    const { start, end } = settingsDatas?.systemActiveTime || {};

    
    if (start && end) {
      const now = new Date();
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      
      const startDate = new Date();
      startDate.setHours(startHour, startMinute, 0, 0);
      
      const endDate = new Date();
      endDate.setHours(endHour, endMinute, 0, 0);

      if (now < startDate || now > endDate) {
        setIsSystemActive(false);
        setModalReason(
          `System is inactive now. Active hours: ${start} - ${end}`
        );
        setShowModal(true);
      } else if (withdrawalData?.withdrawReason && isWithdraw) {
        setModalReason(withdrawalData.withdrawReason);
        setShowModal(true);
      }
    } else if (withdrawalData?.withdrawReason && isWithdraw) {
      setModalReason(withdrawalData.withdrawReason);
      setShowModal(true);
    }
  }, [settingsData, withdrawalData, isWithdraw]);

  const depositOptions = [
    { label: "Local Bank", icon: <BsBank size={20} />, path: "local-bank" },
    { label: "E-Wallet", icon: <PiWalletBold size={22} />, path: "e-wallet" },
    { label: "Crypto", icon: <TbReceiptBitcoin size={24} />, path: "crypto" },
    {
      label: "International Pay",
      icon: <AiOutlineGlobal size={24} />,
      path: "international-pay",
    },
  ];

  // Modal component
  const ReasonModal = () => {
    if (!showModal || !modalReason) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="rounded-2xl shadow-2xl max-w-lg w-full p-6 relative second-bg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-900 bg-yellow-400 hover:bg-yellow-600 text-xl p-1 rounded"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                {isSystemActive ? (
                  <Info size={32} className="text-yellow-400" />
                ) : (
                  <AlertTriangle size={32} className="text-red-500" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isSystemActive
                  ? "Withdrawal Restriction Details"
                  : "System Inactive"}
              </h3>
              <p className="text-gray-200">{modalReason}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-600 text-gray-900 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

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
        {paymentMethodsData.map((item) => {
          const isDisabled =
            !isSystemActive ||
            (isWithdraw && withdrawalData && !withdrawalData.canWithdraw);

          return (
            <Link
              key={item.id}
              to={
                isDisabled
                  ? "#"
                  : `/${isWithdraw ? "withdraw" : "deposit"}/${
                      item.name
                    }${currentQuery}`
              }
              onClick={isDisabled ? (e) => e.preventDefault() : undefined}
              className={`second-bg border border-[#1a1a1a] transition px-5 py-4 pr-3 text-white rounded-md text-[18px] font-semibold flex items-center w-full justify-between ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed border-gray-600"
                  : "hover:border-yellow-400 hover:text-yellow-400 cursor-pointer"
              }`}
            >
              <span className="flex items-center gap-2">
                {depositIconMap[item?.id] || <CircleDollarSign size={20} />}
                {item.name}
              </span>
              <span className="flex items-center gap-3 text-[24px]">
                {isWithdraw ? (
                  <small
                    className={`text-[14px] font-medium ${
                      isDisabled ? "text-gray-400" : "text-yellow-400"
                    }`}
                  >
                    {isDisabled
                      ? !isSystemActive
                        ? "Inactive"
                        : "Unavailable"
                      : "Available"}
                  </small>
                ) : (
                  <small className="text-yellow-400 text-[14px] font-medium">
                    {!isSystemActive ? "Inactive" : "Up to 100%"}
                  </small>
                )}
                <IoIosArrowForward />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Single modal for both cases */}
      <ReasonModal />
    </div>
  );
};

export default DepositAndWithdrawPage;
