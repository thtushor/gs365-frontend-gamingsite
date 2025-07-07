import React, { useEffect, useState } from "react";
import bankCard from "../../assets/bank-card.png";
import { IoIosArrowForward } from "react-icons/io";
import { LuGift } from "react-icons/lu";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const localBankDetails = {
  payment_types: [
    {
      bonus: "100%",
      icon: bankCard,
      title: "Local Bank",
    },
  ],
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
};

const LocalBankInfo = ({
  selectedPromotion,
  handleOpenModal,
  stepDetails,
  handleSetStep,
  setDepositOptions,
  depositOptions,
}) => {
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState(
    localBankDetails?.payment_types[0]
  );
  const [selectedDepositChannel, setSelectedDepositChannel] = useState(
    localBankDetails?.deposit_channel[0]
  );

  // Update payment type
  useEffect(() => {
    if (selectedPaymentTypes) {
      setDepositOptions((prev) => ({
        ...prev,
        payment_type: selectedPaymentTypes,
        transfer_type: "bank transfer",
      }));
    }
  }, [selectedPaymentTypes]);

  // Update deposit channel
  useEffect(() => {
    if (selectedDepositChannel) {
      setDepositOptions((prev) => ({
        ...prev,
        deposit_channel: selectedDepositChannel,
      }));
    }
  }, [selectedDepositChannel]);

  console.log(depositOptions);

  return (
    <div className="mt-5">
      <p className="text-base text-left mb-2">Select Promotion</p>
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
        <p className="text-base text-left mb-2 mt-4">Select Payment</p>
        <div>
          {localBankDetails?.payment_types?.length > 0 &&
            localBankDetails?.payment_types?.map((info, idx) => (
              <div
                key={idx}
                className="border group border-yellow-400 cursor-pointer overflow-hidden flex items-center justify-center flex-col rounded-md max-w-[200px] p-3 pt-4 relative"
                onClick={() => setSelectedPaymentTypes(info)}
              >
                <span className="absolute top-0 right-0 bg-yellow-400 rounded-bl-md px-2 text-black text-[14px] font-semibold">
                  {info?.bonus}
                </span>
                <img className="w-[30px]" src={info?.icon} alt="icon" />
                <p className="group-hover:text-yellow-400 font-medium">
                  {info?.title}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div>
        <p className="text-base text-left mb-2 mt-4">Select Type</p>
        <div className="second-bg border border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 rounded-md text-[18px] font-semibold flex items-center w-full gap-2 justify-between">
          <span className="flex items-center gap-2">Bank Transfer</span>
          <span className="flex items-center gap-3 text-[24px] text-yellow-400">
            <MdOutlineRadioButtonChecked />
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-base text-left mb-2 mt-4">Deposit Channel</p>
        <select
          className="border border-yellow-400 rounded px-3 py-2 second-bg font-medium outline-none"
          name="deposit_channel"
          value={selectedDepositChannel?.name}
          onChange={(e) => {
            const selected = localBankDetails.deposit_channel.find(
              (item) => item.name === e.target.value
            );
            setSelectedDepositChannel(selected);
          }}
        >
          {localBankDetails.deposit_channel.map((channel) => (
            <option key={channel.id} value={channel.name}>
              {channel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="header-auth mt-5">
        <button
          className="signup-btn w-full h-[45px]"
          onClick={() => handleSetStep(stepDetails?.LOCAL_BANK_TRANSFER)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LocalBankInfo;
