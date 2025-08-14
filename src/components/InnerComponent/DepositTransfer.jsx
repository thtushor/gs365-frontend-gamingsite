import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import DepositSubmit from "./DepositSubmit";
import { toast } from "react-toastify";

const DepositTransfer = ({ depositOptions, setStep, stepDetails }) => {
  console.log("DepositTransfer received data:", depositOptions);

  const [transferInfoValid, setTransferInfoValid] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Get the first payment gateway as default, or use the first one from the array
  const defaultGateway = depositOptions?.paymentGateways?.[0] || null;
  const currentGateway = selectedGateway || defaultGateway;

  // Get the first provider as default for the selected gateway
  const defaultProvider = currentGateway?.providers?.[0] || null;
  const currentProvider = selectedProvider || defaultProvider;

  // Use the selected gateway's limits, or fallback to default values
  const availableBalance = {
    min: currentGateway?.minDeposit || 200,
    max: currentGateway?.maxDeposit || 20000,
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const num = Number(value);

    setAmount(value);

    if (!value) {
      setError("");
    } else if (num < availableBalance.min) {
      setError(`Amount must be at least ৳${availableBalance.min}`);
    } else if (num > availableBalance.max) {
      setError(`Amount must not exceed ৳${availableBalance.max}`);
    } else {
      setError("");
    }
  };

  const isNextDisabled =
    !amount ||
    Number(amount) < availableBalance.min ||
    Number(amount) > availableBalance.max ||
    !currentGateway ||
    !currentProvider;

  // Show loading state if no data is available yet
  if (!depositOptions) {
    return (
      <div className="mt-5">
        <div className="second-bg px-5 py-8 rounded-md">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-600 rounded mb-4"></div>
            <div className="h-12 bg-gray-600 rounded mb-4"></div>
            <div className="h-20 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {!transferInfoValid ? (
        <>
          {/* Balance Info */}
          <p className="text-base text-left mb-2 font-medium">
            Available Balance{" "}
            <span className="text-yellow-400">
              ৳{availableBalance.min} ~ ৳{availableBalance.max}
            </span>
          </p>

          {/* Amount Input */}
          <div
            className={`second-bg relative border ${
              error ? "border-red-500" : "border-yellow-400"
            } text-yellow-400 transition rounded-md text-[18px] font-semibold flex items-center w-full gap-2 justify-between`}
          >
            <input
              type="number"
              className="px-5 py-4 pb-6 text-[30px] placeholder:text-[16px] pr-3 w-full bg-transparent outline-none border-none text-white"
              value={amount}
              onChange={handleChange}
              placeholder={`Enter amount between ৳${availableBalance.min} and ৳${availableBalance.max}`}
            />
            {error && (
              <p className="text-white px-2 rounded-full pb-1 bg-red-500 absolute top-[-5px] left-[15px] text-xs font-medium">
                {error || "Something went wrong"}
              </p>
            )}
          </div>

          {/* Payment Method Selection */}
          <div>
            <p className="text-base text-left mb-2 mt-4 font-medium">
              Payment Method
            </p>

            {/* Payment Gateway Selection */}
            {depositOptions?.paymentGateways?.length > 0 ? (
              depositOptions.paymentGateways.map((gateway, index) => (
                <div
                  key={gateway.id}
                  className={`flex hover:bg-gray-900 cursor-pointer items-center justify-between second-bg px-5 border py-4 rounded-md mb-2 ${
                    selectedGateway?.id === gateway.id ||
                    (!selectedGateway && index === 0)
                      ? "border-yellow-400"
                      : "border-gray-600"
                  }`}
                  onClick={() => {
                    setSelectedGateway(gateway);
                    setSelectedProvider(gateway.providers?.[0] || null);
                    // Reset amount when changing gateway to ensure it's within new limits
                    if (amount) {
                      const num = Number(amount);
                      if (
                        num < gateway.minDeposit ||
                        num > gateway.maxDeposit
                      ) {
                        setAmount("");
                        setError("");
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={gateway.iconUrl}
                      className="w-[30px] h-[30px] object-contain"
                      alt={gateway.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="text-left">
                      <h4 className="text-[16px] font-medium text-white">
                        {gateway.name}
                      </h4>
                      <p className="text-gray-400 text-[14px]">
                        Min: ৳{gateway.minDeposit} | Max: ৳{gateway.maxDeposit}
                      </p>
                      {gateway.providers?.length > 0 && (
                        <p className="text-gray-400 text-[14px]">
                          Providers: {gateway.providers.length}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[24px] text-yellow-400">
                      <MdOutlineModeEdit />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="second-bg px-5 border border-gray-600 py-4 rounded-md">
                <p className="text-gray-400 text-center">
                  No payment methods available
                </p>
              </div>
            )}

            {/* Provider Selection */}
            {currentGateway && currentGateway.providers?.length > 0 && (
              <div className="mt-4">
                <p className="text-base text-left mb-2 font-medium">
                  Select Provider
                </p>
                {currentGateway.providers.map((provider, index) => (
                  <div
                    key={provider.id}
                    className={`flex hover:bg-gray-900 cursor-pointer items-center justify-between second-bg px-5 border py-4 rounded-md mb-2 ${
                      selectedProvider?.id === provider.id ||
                      (!selectedProvider && index === 0)
                        ? "border-yellow-400"
                        : "border-gray-600"
                    }`}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-left">
                        <h4 className="text-[16px] font-medium text-white">
                          {provider.name}
                        </h4>
                        <p className="text-gray-400 text-[14px]">
                          Commission: {provider.commission}%
                        </p>
                        {provider.isRecomended && (
                          <p className="text-yellow-400 text-[10px]">
                            Recommended
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[24px] text-yellow-400">
                        <MdOutlineModeEdit />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reminder Section */}
          <div className="second-bg mt-6 rounded-md border border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <FaInfoCircle className="text-white" />
              <h4 className="text-white font-medium">Reminder</h4>
            </div>
            <hr className="border-gray-600 mb-3" />
            <p className="text-gray-300 text-sm leading-relaxed text-left">
              <span className="text-yellow-400">
                Dear all member, to speed up your deposit process, kindly follow
                these steps:
              </span>
              <br />
              1. Verify the account number you used for deposit.
              <br />
              2. Input the correct reference number.
              <br />
              3. Process only selected amount.
              <br />
              4. Attach the successful Slip.
              <br />
              5. Please make sure your bank account holder name should match
              your registered name on your account to prevent withdrawal
              rejection.
            </p>
          </div>

          {/* Next Button */}
          <div className="header-auth mt-5">
            <button
              className={`w-full h-[45px] transition duration-300
              ${
                isNextDisabled
                  ? "bg-gray-600 text-gray-300 pointer-events-none"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
              disabled={isNextDisabled}
              onClick={() => {
                const amountValue = Number(amount);
                const isAmountValid =
                  amountValue >= availableBalance.min &&
                  amountValue <= availableBalance.max;

                const hasValidOptions =
                  currentGateway && currentProvider && amount;

                if (isAmountValid && hasValidOptions) {
                  setTransferInfoValid(true);
                } else {
                  if (!currentGateway) {
                    toast.error("Please select a payment method");
                  } else if (!currentProvider) {
                    toast.error("Please select a provider");
                  } else if (!amount) {
                    toast.error("Please enter an amount");
                  } else {
                    toast.error(
                      `Amount must be between ৳${availableBalance.min} and ৳${availableBalance.max}`
                    );
                  }
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <DepositSubmit
          depositOptions={{
            ...depositOptions,
            selectedGateway: currentGateway,
            selectedProvider: currentProvider,
            amount: amount,
          }}
          stepDetails={stepDetails}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default DepositTransfer;
