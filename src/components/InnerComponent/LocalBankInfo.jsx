import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LuGift } from "react-icons/lu";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const LocalBankInfo = ({
  selectedPromotion,
  handleOpenModal,
  stepDetails,
  handleSetStep,
  setDepositOptions,
  depositOptions,
  gatewayInfo,
}) => {
  console.log(gatewayInfo);
  
  // Transform the new data structure to match the expected format
  const transformedPaymentTypes = gatewayInfo?.paymentGateways?.map(gateway => ({
    bonus: "100%", // Static bonus as requested
    icon: gateway.iconUrl,
    title: gateway.name,
    transfer_type: [{ id: gateway.id, title: `${gateway.name} Transfer` }],
    deposit_channel: [
      {
        id: gateway.id,
        name: gateway.name,
      }
    ],
    gateway: gateway // Keep original gateway data for reference
  })) || [];

  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState(
    transformedPaymentTypes[0] || null
  );

  const [selectedDepositChannel, setSelectedDepositChannel] = useState(
    transformedPaymentTypes[0]?.deposit_channel?.[0] || null
  );

  // Update payment type
  useEffect(() => {
    if (selectedPaymentTypes) {
      const transferTypes = selectedPaymentTypes.transfer_type;
      const defaultTransferType =
        Array.isArray(transferTypes) && transferTypes.length > 0
          ? transferTypes[0] // full object
          : null;

      setDepositOptions((prev) => ({
        ...prev,
        payment_type: selectedPaymentTypes,
        transfer_type: defaultTransferType,
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

  return (
    <div className="mt-5">
      {/* Select Promotion */}
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

      {/* Select Payment Type */}
      <div>
        <p className="text-base text-left mb-2 mt-4">Select Payment</p>
        <div className="flex flex-wrap gap-3">
          {transformedPaymentTypes?.map((info, idx) => (
            <div
              key={idx}
              className={`border group cursor-pointer overflow-hidden flex items-center justify-center flex-col rounded-md max-w-[200px] p-3 pt-4 relative ${
                selectedPaymentTypes?.title === info.title
                  ? "border-yellow-400"
                  : "border-[#1a1a1a]"
              }`}
              onClick={() => {
                setSelectedPaymentTypes(info);
                setSelectedDepositChannel(info.deposit_channel[0]); // reset deposit channel on type change
              }}
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

      {/* Fixed Bank Transfer Type */}
      <div>
        <p className="text-base text-left mb-2 mt-4">Select Type</p>
        <div className="flex flex-wrap gap-3">
          {selectedPaymentTypes?.transfer_type?.map((type, idx) => (
            <div
              key={type.id || idx}
              className={`second-bg border cursor-pointer w-full transition px-5 py-4 pr-3 rounded-md text-[16px] font-semibold flex items-center justify-between gap-2 ${
                depositOptions?.transfer_type?.title === type.title
                  ? "border-yellow-400 text-yellow-400"
                  : "border-[#1a1a1a]"
              }`}
              onClick={() => {
                setDepositOptions((prev) => ({
                  ...prev,
                  transfer_type: type,
                }));
              }}
            >
              <span className="flex items-center gap-2">{type.title}</span>
              {depositOptions?.transfer_type?.title === type.title && (
                <span className="text-[24px] text-yellow-400">
                  <MdOutlineRadioButtonChecked />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Channel Dropdown */}
      <div className="flex flex-col">
        <p className="text-base text-left mb-2 mt-4">Deposit Channel</p>
        <select
          className="border border-yellow-400 rounded px-3 py-2 second-bg font-medium outline-none text-white"
          name="deposit_channel"
          value={selectedDepositChannel?.name}
          onChange={(e) => {
            const selected = selectedPaymentTypes?.deposit_channel.find(
              (item) => item.name === e.target.value
            );
            setSelectedDepositChannel(selected);
          }}
        >
          {selectedPaymentTypes?.deposit_channel.map((channel) => (
            <option key={channel.id} value={channel.name}>
              {channel.name}
            </option>
          ))}
        </select>
      </div>

      {/* Continue Button */}
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
