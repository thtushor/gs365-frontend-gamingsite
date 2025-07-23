import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BaseModal from "../components/Promotion/BaseModal";
import { LuGift } from "react-icons/lu";
import DepositPromotionSelect from "../components/InnerComponent/DepositPromotionSelect";

import { MdOutlineRadioButtonChecked } from "react-icons/md";
import LocalBankInfo from "../components/InnerComponent/LocalBankInfo";
import DepositTransfer from "../components/InnerComponent/DepositTransfer";
import bankCard from "../assets/bank-card.png";
import bkash from "../assets/payment-type/bkash.png";
import nagad from "../assets/payment-type/nagad.png";
import rocket from "../assets/payment-type/rocket.png";

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
  const { depositId } = useParams();
  const [step, setStep] = useState(
    depositId === "local-bank" ? stepDetails?.LOCAL_BANK : 1
  );
  const [selectedPromotion, setSelectedPromotion] = useState({
    id: 2,
    title: "৮০% রিলোড বোনাস",
    type: "এক্সক্লুসিভ অফার",
    time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
  });
  const [depositOptions, setDepositOptions] = useState({
    payment_type: "",
    payment_channel: "",
    deposit_channel: "",
    transfer_type: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const formatDepositId = (id) => {
    if (!id) return "Deposit";
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedTitle = formatDepositId(depositId);

  // modal logic
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  // step logic
  const handleSetStep = (crStep) => {
    setStep(crStep);
  };

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

      {step === stepDetails?.LOCAL_BANK_TRANSFER ? (
        <DepositTransfer
          stepDetails={stepDetails}
          setStep={setStep}
          depositOptions={depositOptions}
        />
      ) : (
        <LocalBankInfo
          handleOpenModal={handleOpenModal}
          selectedPromotion={selectedPromotion}
          stepDetails={stepDetails}
          handleSetStep={handleSetStep}
          setDepositOptions={setDepositOptions}
          depositOptions={depositOptions}
          gatewayInfo={
            depositId === "local-bank"
              ? localBankDetails
              : depositId === "e-wallet"
              ? eWalletDetails
              : ""
          }
        />
      )}

      <BaseModal
        open={modalOpen}
        onClose={handleCloseModal}
        children={
          <DepositPromotionSelect
            fakePromotions={fakePromotions}
            selectedPromotion={selectedPromotion}
            setSelectedPromotion={setSelectedPromotion}
            onClose={handleCloseModal}
          />
        }
      />
    </div>
  );
};

export default SingleDepositAndWithdrawPage;
