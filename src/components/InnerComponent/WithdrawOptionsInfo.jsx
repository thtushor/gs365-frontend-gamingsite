import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/api/axios";
import { API_ENDPOINTS } from "../../lib/api/config";
import { useAuth } from "../../contexts/auth-context";
import BaseModal from "../Promotion/BaseModal";
import CustomSelect from "../UI/CustomSelect";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const WithdrawOptionsInfo = ({ 
  withdrawOptions, 
  setStep, 
  stepDetails,
  setWithdrawOptions,
  gatewayInfo,
}) => {
  const { user } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paymentMethod = withdrawOptions.paymentMethod

  // Transform the new data structure to match the expected format
  const transformedPaymentTypes =
    gatewayInfo?.paymentGateways?.map((gateway) => ({
      bonus: gateway?.bonus ? `${gateway?.bonus}%` : undefined,
      icon: gateway.iconUrl,
      title: gateway.name,
      transfer_type: [{ id: gateway.id, title: `${gateway.name} Transfer` }],
      deposit_channel: gateway.providers,
      gateway: gateway // Keep original gateway data for reference
    })) || [];

  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState(null);
  const [selectedDepositChannel, setSelectedDepositChannel] = useState(null);

  // Set default selections when data is loaded
  useEffect(() => {
    if (transformedPaymentTypes.length > 0 && !selectedPaymentTypes) {
      const firstPaymentType = transformedPaymentTypes[0];
      // Select recommended channel or first one if no recommended
      const recommendedChannel = firstPaymentType?.deposit_channel?.find(
        (channel) => channel.isRecomended
      );
      const defaultChannel =
        recommendedChannel || firstPaymentType?.deposit_channel?.[0];

      setSelectedPaymentTypes(firstPaymentType);
      setSelectedDepositChannel(defaultChannel);
    }
  }, [transformedPaymentTypes, selectedPaymentTypes]);

  // Update payment type
  useEffect(() => {
    if (selectedPaymentTypes) {
      const transferTypes = selectedPaymentTypes.transfer_type;
      const defaultTransferType =
        Array.isArray(transferTypes) && transferTypes.length > 0
          ? transferTypes[0] // full object
          : null;

      setWithdrawOptions((prev) => ({
        ...prev,
        payment_type: selectedPaymentTypes,
        transfer_type: defaultTransferType,
      }));
    }
  }, [selectedPaymentTypes]);

  // Update deposit channel
  useEffect(() => {
    if (selectedDepositChannel) {
      setWithdrawOptions((prev) => ({
        ...prev,
        deposit_channel: selectedDepositChannel,
      }));
    }
  }, [selectedDepositChannel]);

  // Withdrawal mutation
  const withdrawMutation = useMutation({
    mutationFn: (data) => axiosInstance.post(API_ENDPOINTS.PAYMENT.WITHDRAW_TRANSACTION, data),
    onSuccess: () => {
      setIsModalOpen(true);
      // Reset form
      setAccountNumber("");
      setAccountHolderName("");
      setBankName("");
      setSwiftCode("");
      setNotes("");
      setAmount("");
      setErrors({});
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit withdrawal request");
    }
  });

  // Validate form based on payment type
  const validateForm = () => {
    const newErrors = {};
    
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    // For bank transfers, validate all required fields
    if (selectedPaymentTypes?.title?.toLowerCase().includes("bank")) {
      if (!accountNumber) newErrors.accountNumber = "Account number is required";
      if (!accountHolderName) newErrors.accountHolderName = "Account holder name is required";
      if (!bankName) newErrors.bankName = "Bank name is required";
      if (!swiftCode) newErrors.swiftCode = "SWIFT code is required";
    }

    // For crypto, only account number is required
    if (selectedPaymentTypes?.title?.toLowerCase().includes("crypto")) {
      if (!accountNumber) newErrors.accountNumber = "Account number is required";
    }

    // For wallet, no additional fields needed (uses user's phone number)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Prepare data based on payment type
    const requestData = {
      userId: user?.id,
      amount: Number(amount),
      currencyId: 1, // Default currency ID
      paymentMethod: selectedPaymentTypes?.title,
      notes: notes || ""
    };

    // Add payment details based on payment type
    if (selectedPaymentTypes?.title?.toLowerCase().includes("wallet")) {
      requestData.walletPhoneNumber = user?.phone;
    } else if (selectedPaymentTypes?.title?.toLowerCase().includes("bank")) {
      requestData.accountNumber = accountNumber;
      requestData.accountHolderName = accountHolderName;
      requestData.bankName = bankName;
      requestData.swiftCode = swiftCode;
    } else if (selectedPaymentTypes?.title?.toLowerCase().includes("crypto")) {
      requestData.accountNumber = accountNumber;
    }

    withdrawMutation.mutate(requestData);
  };

  // Get minimum and maximum amounts from payment options
  const getAmountLimits = () => {
    // This would typically come from the API, but we'll use defaults for now
    return {
      min: 100,
      max: 100000
    };
  };

  const amountLimits = getAmountLimits();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    
    if (value && (isNaN(value) || Number(value) <= 0)) {
      setErrors(prev => ({ ...prev, amount: "Please enter a valid amount" }));
    } else if (value && Number(value) < amountLimits.min) {
      setErrors(prev => ({ ...prev, amount: `Minimum amount is ${amountLimits.min}` }));
    } else if (value && Number(value) > amountLimits.max) {
      setErrors(prev => ({ ...prev, amount: `Maximum amount is ${amountLimits.max}` }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.amount;
        return newErrors;
      });
    }
  };

  return (
    <div className="mt-5">
      {/* Select Payment Type */}
      <div className="">
        <p className="text-base text-left mb-2 mt-4">Select Payment</p>
        <div className="flex flex-wrap gap-3">
          {transformedPaymentTypes?.map((info, idx) => (
            <div
              key={idx}
              className={`border flex-1 md:min-w-[30%] group cursor-pointer overflow-hidden flex items-center justify-center flex-col rounded-md max-w-[200px] p-3 pt-4 relative ${
                selectedPaymentTypes?.title === info.title
                  ? "border-yellow-400"
                  : "border-[#1a1a1a]"
              }`}
              onClick={() => {
                setSelectedPaymentTypes(info);
                // Select recommended channel or first one if no recommended
                const recommendedChannel = info.deposit_channel.find(
                  (channel) => channel.isRecomended
                );
                const defaultChannel =
                  recommendedChannel || info.deposit_channel[0];
                setSelectedDepositChannel(defaultChannel);
                
                // Reset form fields when payment type changes
                setAccountNumber("");
                setAccountHolderName("");
                setBankName("");
                setSwiftCode("");
                setNotes("");
                setErrors({});
              }}
            >
              <img className="w-[60px]" src={info?.icon} alt="icon" />
              <p className="group-hover:text-yellow-400 font-medium">
                {info.title || ""}
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
                withdrawOptions?.transfer_type?.title === type.title
                  ? "border-yellow-400 text-yellow-400"
                  : "border-[#1a1a1a]"
              }`}
              onClick={() => {
                setWithdrawOptions((prev) => ({
                  ...prev,
                  transfer_type: type,
                }));
              }}
            >
              <span className="flex items-center gap-2">{type.title}</span>
              {withdrawOptions?.transfer_type?.title === type.title && (
                <span className="text-[24px] text-yellow-400">
                  <MdOutlineRadioButtonChecked />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Channel Dropdown */}
      {/* <div className="flex flex-col">
        <p className="text-base text-left mb-2 mt-4">Withdraw Channel</p>
        <CustomSelect
          options={selectedPaymentTypes?.deposit_channel || []}
          value={selectedDepositChannel?.name}
          onChange={(selected) => setSelectedDepositChannel(selected)}
          placeholder="Select withdraw channel"
          showRecommended={true}
          disabled={!selectedPaymentTypes}
        />
      </div> */}

      {/* Amount Input */}
      <div className="mb-4 mt-4">
        <p className="text-base text-left mb-2">Withdrawal Amount</p>
        <div className={`second-bg relative border ${
          errors.amount ? "border-red-500" : "border-yellow-400"
        } text-yellow-400 transition rounded-md text-[18px] font-semibold flex items-center w-full gap-2 justify-between`}>
          <input
            type="number"
            className="px-5 py-4 pb-6 text-[30px] placeholder:text-[16px] pr-3 w-full bg-transparent outline-none border-none text-white"
            value={amount}
            onChange={handleAmountChange}
            onWheel={(e) => e.currentTarget.blur()}
            placeholder={`Enter amount between ৳${amountLimits.min} and ৳${amountLimits.max}`}
          />
          {errors.amount && (
            <p className="text-white px-2 rounded-full pb-1 bg-red-500 absolute top-[-5px] left-[15px] text-xs font-medium">
              {errors.amount}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-1 text-left">
          Min: ৳{amountLimits.min} | Max: ৳{amountLimits.max}
        </p>
      </div>

      {/* Wallet Payment - Show Phone Number */}
      {selectedPaymentTypes?.title?.toLowerCase().includes("wallet") && (
        <div className="mb-4">
          <p className="text-base text-left mb-2">Wallet Phone Number</p>
          <div className="second-bg border border-yellow-400 rounded-md px-5 py-4 text-white font-medium">
            {user?.phone || "Phone number not available"}
          </div>
        </div>
      )}

      {/* Bank Transfer Fields */}
      {selectedPaymentTypes?.title?.toLowerCase().includes("bank") && (
        <>
          <div className="mb-4">
            <p className="text-base text-left mb-2">Account Number *</p>
            <input
              type="text"
              className={`second-bg border ${
                errors.accountNumber ? "border-red-500" : "border-gray-600"
              } rounded-md px-5 py-4 w-full text-white font-medium outline-none`}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.accountNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-base text-left mb-2">Account Holder Name *</p>
            <input
              type="text"
              className={`second-bg border ${
                errors.accountHolderName ? "border-red-500" : "border-gray-600"
              } rounded-md px-5 py-4 w-full text-white font-medium outline-none`}
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              placeholder="Enter account holder name"
            />
            {errors.accountHolderName && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.accountHolderName}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-base text-left mb-2">Bank Name *</p>
            <input
              type="text"
              className={`second-bg border ${
                errors.bankName ? "border-red-500" : "border-gray-600"
              } rounded-md px-5 py-4 w-full text-white font-medium outline-none`}
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.bankName}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-base text-left mb-2">SWIFT Code *</p>
            <input
              type="text"
              className={`second-bg border ${
                errors.swiftCode ? "border-red-500" : "border-gray-600"
              } rounded-md px-5 py-4 w-full text-white font-medium outline-none`}
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              placeholder="Enter SWIFT code"
            />
            {errors.swiftCode && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.swiftCode}</p>
            )}
          </div>
        </>
      )}

      {/* Crypto Payment Fields */}
      {selectedPaymentTypes?.title?.toLowerCase().includes("crypto") && (
        <div className="mb-4">
          <p className="text-base text-left mb-2">Account Number *</p>
          <input
            type="text"
            className={`second-bg border ${
              errors.accountNumber ? "border-red-500" : "border-gray-600"
            } rounded-md px-5 py-4 w-full text-white font-medium outline-none`}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.accountNumber}</p>
          )}
        </div>
      )}

      {/* Notes Field (Optional for all payment types) */}
      <div className="mb-4">
        <p className="text-base text-left mb-2">Notes (Optional)</p>
        <textarea
          className="second-bg border border-gray-600 rounded-md px-5 py-4 w-full text-white font-medium outline-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional notes"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="header-auth mt-5">
        <button
          className={`signup-btn w-full h-[45px] ${
            withdrawMutation.isPending || !selectedPaymentTypes ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={withdrawMutation.isPending || !selectedPaymentTypes}
        >
          {withdrawMutation.isPending ? "Processing..." : "Submit Withdrawal"}
        </button>
      </div>

      {/* Confirmation Modal */}
      <BaseModal open={isModalOpen} onClose={() => setIsModalOpen(false)} showClose={false}>
        <div className="flex flex-col items-center justify-center p-6 text-white">
          <div className="bg-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <span className="text-3xl">⏳</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Withdrawal Request Submitted</h2>
          <p className="text-gray-300 mb-4 text-center">
            Please wait for approval of your withdrawal request. This may take some time.
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-2 rounded"
          >
            Close
          </button>
        </div>
      </BaseModal>
    </div>
  );
};

export default WithdrawOptionsInfo;