import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BaseModal from "../components/Promotion/BaseModal";
import { LuGift } from "react-icons/lu";
import DepositPromotionSelect from "../components/InnerComponent/DepositPromotionSelect";

import { MdOutlineRadioButtonChecked } from "react-icons/md";
import DepositOptionsInfo from "../components/InnerComponent/DepositOptionsInfo";
import WithdrawOptionsInfo from "../components/InnerComponent/WithdrawOptionsInfo";
import DepositAmountProvider from "../components/InnerComponent/DepositAmountProvider";
import bankCard from "../assets/bank-card.png";
import bkash from "../assets/payment-type/bkash.png";
import nagad from "../assets/payment-type/nagad.png";
import rocket from "../assets/payment-type/rocket.png";
import { useQuery } from "@tanstack/react-query";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import axiosInstance from "../lib/api/axios";
import { API_CONFIG, API_ENDPOINTS } from "../lib/api/config";

const fakePromotions = {
  valid: [
    {
      id: 1,
      title: "৪% পর্যন্ত আনলিমিটেড বুস্ট",
      type: "ডেইলি অফার",
      time: "2025-03-26 18:03:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 2,
      title: "৮০% রিলোড বোনাস",
      type: "এক্সক্লুসিভ অফার",
      time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
    },
    {
      id: 3,
      title: "সব গেমের উপর ১০০% বোনাস",
      type: "ওয়েলকাম অফার",
      time: "2025-01-20 00:01:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 4,
      title: "৪% পর্যন্ত আনলিমিটেড বুস্ট",
      type: "ডেইলি অফার",
      time: "2025-03-26 18:03:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 5,
      title: "৮০% রিলোড বোনাস",
      type: "এক্সক্লুসিভ অফার",
      time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
    },
    {
      id: 6,
      title: "সব গেমের উপর ১০০% বোনাস",
      type: "ওয়েলকাম অফার",
      time: "2025-01-20 00:01:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 7,
      title: "৪% পর্যন্ত আনলিমিটেড বুস্ট",
      type: "ডেইলি অফার",
      time: "2025-03-26 18:03:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 8,
      title: "৮০% রিলোড বোনাস",
      type: "এক্সক্লুসিভ অফার",
      time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
    },
    {
      id: 9,
      title: "সব গেমের উপর ১০০% বোনাস",
      type: "ওয়েলকাম অফার",
      time: "2025-01-20 00:01:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 10,
      title: "৪% পর্যন্ত আনলিমিটেড বুস্ট",
      type: "ডেইলি অফার",
      time: "2025-03-26 18:03:00 ~ 2025-12-31 21:12:00",
    },
    {
      id: 11,
      title: "৮০% রিলোড বোনাস",
      type: "এক্সক্লুসিভ অফার",
      time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
    },
    {
      id: 12,
      title: "সব গেমের উপর ১০০% বোনাস",
      type: "ওয়েলকাম অফার",
      time: "2025-01-20 00:01:00 ~ 2025-12-31 21:12:00",
    },
  ],
  invalid: [],
};

const stepDetails = {
  LOCAL_BANK: "local-bank",
  E_WALLET: "e-wallet",
  CRYPTO: "crypto",
  INTERNATIONAL: "international",
  LOCAL_BANK_TRANSFER: "local-bank-transfer",
  E_WALLET_TRANSFER: "e-wallet-transfer",
  CRYPTO_TRANSFER: "crypto-transfer",
  INTERNATIONAL_TRANSFER: "international-transfer",
};

const localBankDetails = {
  payment_types: [
    {
      bonus: "100%",
      icon: bankCard,
      title: "Local Bank",
      transfer_type: [{ id: 1, title: "Bank Transfer" }],
      deposit_channel: [
        {
          id: 1,
          name: "City Bank PLC",
        },
        {
          id: 2,
          name: "Islami Bank PLC",
        },
        {
          id: 3,
          name: "Dutch Bangla Bank",
        },
      ],
    },
  ],
};

const eWalletDetails = {
  payment_types: [
    {
      bonus: "3%",
      icon: bkash,
      title: "bKash",
      transfer_type: [{ id: 1, title: "bKash Transfer" }],
      deposit_channel: [
        {
          id: 1,
          name: "SG Cashout",
        },
        {
          id: 2,
          name: "BK Cashout",
        },
        {
          id: 3,
          name: "Make Payment",
        },
        {
          id: 4,
          name: "Send Money",
        },
      ],
    },
    {
      bonus: "3%",
      icon: nagad,
      title: "Nagad",
      transfer_type: [{ id: 1, title: "Nagad Transfer" }],
      deposit_channel: [
        {
          id: 1,
          name: "SG Cashout",
        },
      ],
    },
    {
      bonus: "3%",
      icon: rocket,
      title: "Rocket",
      transfer_type: [{ id: 1, title: "Rocket Transfer" }],
      deposit_channel: [
        {
          id: 1,
          name: "BK Cashout",
        },
      ],
    },
  ],
};

const cryptoDetails = {
  payment_types: [
    {
      bonus: "3%",
      icon: bkash,
      title: "USD TRC20",
      deposit_channel: [
        {
          id: 1,
          name: "SG Cashout",
        },
        {
          id: 2,
          name: "BK Cashout",
        },
        {
          id: 3,
          name: "Make Payment",
        },
        {
          id: 4,
          name: "Send Money",
        },
      ],
      transfer_type: [{ id: 1, title: "TRC20" }],
    },
    {
      bonus: "3%",
      icon: nagad,
      title: "Nagad",
      deposit_channel: [
        {
          id: 1,
          name: "SG Cashout",
        },
      ],
    },
    {
      bonus: "3%",
      icon: rocket,
      title: "Rocket",
      deposit_channel: [
        {
          id: 1,
          name: "BK Cashout",
        },
      ],
    },
  ],
};

const SingleDepositAndWithdrawPage = () => {
  const { depositId, withdrawId } = useParams();

  const [searchParams] = useSearchParams();
  const promotionIdFromUrl = searchParams.get("promotionId");

  const [step, setStep] = useState(
    depositId === "Local Bank" ? stepDetails?.LOCAL_BANK : 1
  );

  const { data: paymentMethods } = useQuery({
    queryKey: [
      API_ENDPOINTS.PAYMENT.GET_PAYMENT_METHODS,
      {
        name: depositId || withdrawId,
      },
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PAYMENT.GET_PAYMENT_METHODS_BY_NAME}/${
          depositId || withdrawId
        }`,
        {
          params: {
            status: "active",
          },
        }
      );
      return response?.data;
    },
  });

  console.log({ paymentMethods: paymentMethods });

  const paymentMethodData = paymentMethods?.[0];

  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [depositOptions, setDepositOptions] = useState({
    payment_type: "",
    payment_channel: "",
    deposit_channel: "",
    transfer_type: "",
  });

  // Set default deposit options when payment method data is loaded
  useEffect(() => {
    if (paymentMethodData?.paymentGateways?.length > 0) {
      const firstGateway = paymentMethodData.paymentGateways[0];
      const firstProvider = firstGateway?.providers?.[0];
      const paymentType = paymentMethodData?.name;

      setDepositOptions({
        payment_type: {
          bonus: "3%",

          icon: firstGateway.iconUrl,
          title: firstGateway.name,
          transfer_type: [
            { id: firstGateway.id, title: `${firstGateway.name} Transfer` },
          ],
          deposit_channel: firstGateway.providers,
          gateway: firstGateway,
        },

        paymentMethod: paymentType,

        payment_channel: "",
        deposit_channel: firstProvider,
        transfer_type: {
          id: firstGateway.id,
          title: `${firstGateway.name} Transfer`,
        },
      });
    }
  }, [paymentMethodData]);

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const formatDepositId = (options) => {
    if (options.depositId) return "Deposit";

    if (options.withdrawId) return "Withdraw";

    return "Deposit";
  };

  const formattedTitle = formatDepositId({ depositId, withdrawId });

  // modal logic
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  // step logic
  const handleSetStep = (crStep) => {
    setStep(crStep);
  };

  // promotion

  // promotions
  const getRequest = useGetRequest();
  const {
    data: promotionList,
    isLoading: promotionLoading,
    isError: promotionErr,
  } = useQuery({
    queryKey: ["promotions"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_PROMOTIONS,
        errorMessage: "Failed to fetch promotions",
        isPublic: true,
      }),
  });

  useEffect(() => {
    if (promotionList?.data?.length > 0) {
      let defaultPromotion = promotionList.data[0]; // fallback
      if (promotionIdFromUrl) {
        const promoFromUrl = promotionList.data.find(
          (promo) => String(promo.id) === promotionIdFromUrl
        );
        if (promoFromUrl) defaultPromotion = promoFromUrl;
      }

      setSelectedPromotion(defaultPromotion);

      setDepositOptions((prev) => ({
        ...prev,
        promotionId: defaultPromotion.id,
        promotionDetails: defaultPromotion,
      }));
    }
  }, [promotionList?.data, promotionIdFromUrl]);

  return (
    <div className="!max-w-[650px] mx-auto px-4 py-8">
      <h2 className="text-[22px] flex items-center font-bold ">
        <button
          onClick={() => navigate(-1)}
          className=" font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
        >
          <IoIosArrowBack />
        </button>
        {String(step).toLowerCase().includes("transfer")
          ? "Enter the amount"
          : formattedTitle}
      </h2>

      {withdrawId ? (
        <WithdrawOptionsInfo
          withdrawOptions={depositOptions}
          setStep={setStep}
          stepDetails={stepDetails}
          setWithdrawOptions={setDepositOptions}
          gatewayInfo={paymentMethodData || ""}
        />
      ) : step === stepDetails?.LOCAL_BANK_TRANSFER ? (
        <DepositAmountProvider
          stepDetails={stepDetails}
          setStep={setStep}
          depositOptions={depositOptions}
        />
      ) : (
        <DepositOptionsInfo
          handleOpenModal={handleOpenModal}
          selectedPromotion={selectedPromotion}
          stepDetails={stepDetails}
          handleSetStep={handleSetStep}
          setDepositOptions={setDepositOptions}
          depositOptions={depositOptions}
          gatewayInfo={paymentMethodData || ""}
        />
      )}

      <BaseModal
        open={modalOpen}
        onClose={handleCloseModal}
        children={
          <DepositPromotionSelect
            promotionList={promotionList?.data || []}
            selectedPromotion={selectedPromotion}
            setSelectedPromotion={(promo) => {
              setSelectedPromotion(promo);
              setDepositOptions((prev) => ({
                ...prev,
                promotionId: promo.id,
                promotionDetails: promo,
              }));
            }}
            onClose={handleCloseModal}
            promotionLoading={promotionLoading}
          />
        }
      />
    </div>
  );
};

export default SingleDepositAndWithdrawPage;
