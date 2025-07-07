import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BaseModal from "../components/Promotion/BaseModal";
import { LuGift } from "react-icons/lu";
import DepositPromotionSelect from "../components/InnerComponent/DepositPromotionSelect";
import bankCard from "../assets/bank-card.png";

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

const SingleDeposit = () => {
  const [selectedPromotion, setSelectedPromotion] = useState({
    id: 2,
    title: "৮০% রিলোড বোনাস",
    type: "এক্সক্লুসিভ অফার",
    time: "2025-07-05 22:07:00 ~ 2025-07-12 21:07:00",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { depositId } = useParams();
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

  return (
    <div className="!max-w-[650px] mx-auto px-4 py-8">
      <h2 className="text-[22px] flex items-center font-bold ">
        <button
          onClick={() => navigate(-1)}
          className=" font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
        >
          <IoIosArrowBack />
        </button>
        {formattedTitle}
      </h2>

      <div
        className="mt-5
      "
      >
        <p htmlFor="" className="text-base text-left mb-2">
          Select Promotion
        </p>
        <div
          className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 rounded-md text-[18px] font-semibold flex items-center w-full gap-2 justify-between"
          onClick={handleOpenModal}
        >
          <span className="flex items-center gap-2">
            <LuGift size={22} />
            Promotions
          </span>
          <span className="flex items-center gap-3 text-[24px]">
            <small className="text-yellow-400 text-[14px] font-medium">
              {selectedPromotion?.title}
            </small>
            <IoIosArrowForward />
          </span>
        </div>
        <div>
          <p htmlFor="" className="text-base text-left mb-2 mt-4">
            Select Payment
          </p>
          <div className="border border-yellow-400 overflow-hidden flex items-center justify-center flex-col rounded-md max-w-[200px] p-3 pt-4 relative">
            <span className="absolute top-0 right-0 bg-yellow-400 rounded-bl-md px-2 text-black text-[14px] font-semibold">
              100%
            </span>
            <img className="w-[30px]" src={bankCard} />
            <p>Local Bank</p>
          </div>
        </div>
      </div>

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

export default SingleDeposit;
