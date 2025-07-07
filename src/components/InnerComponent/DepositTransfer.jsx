import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import DepositSubmit from "./DepositSubmit";
import { toast } from "react-toastify";

const DepositTransfer = ({ depositOptions, setStep, stepDetails }) => {
  console.log(depositOptions);
  const [transferInfoValid, setTransferInfoValid] = useState(false);
  const availableBalance = { min: 30000, max: 50000 };
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="mt-5">
      {!transferInfoValid ? (
        <>
          <p className="text-base text-left mb-2 font-medium">
            Available Balance{" "}
            <span className="text-yellow-400">
              ৳{availableBalance.min} ~ ৳{availableBalance.max}
            </span>
          </p>

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
                {error || "Something wen't wrong"}
              </p>
            )}
          </div>

          <div>
            <p className="text-base text-left mb-2 mt-4 font-medium">
              Payment Method
            </p>
            <div
              className="flex hover:bg-gray-900 cursor-pointer items-center justify-between second-bg px-5 border-yellow-400 border py-4 rounded-md"
              onClick={() => setStep(stepDetails?.LOCAL_BANK)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={depositOptions?.payment_type?.icon}
                  className="w-[30px]"
                  alt=""
                />
                <div className="text-left">
                  <h4 className="text-[16px] font-medium">
                    {depositOptions?.payment_type?.title}
                  </h4>
                  <p className="text-gray-400 text-[14px] capitalize">
                    {depositOptions?.transfer_type}
                  </p>
                  <p className="text-gray-400 text-[14px] capitalize">
                    {depositOptions?.deposit_channel?.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <p className="text-yellow-400 font-medium">3%</p>
                <span className="text-[24px]">
                  <MdOutlineModeEdit />
                </span>
              </div>
            </div>
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
              your registered name on your account to prevent from withdrawal
              rejection.
            </p>
          </div>

          <div className="header-auth mt-5">
            <button
              className="signup-btn w-full h-[45px]"
              onClick={() => {
                const amountValue = Number(amount);

                const isAmountValid =
                  amountValue >= availableBalance.min &&
                  amountValue <= availableBalance.max;

                const hasValidOptions =
                  depositOptions?.payment_type &&
                  depositOptions?.transfer_type &&
                  depositOptions?.deposit_channel;

                if (isAmountValid && hasValidOptions) {
                  setTransferInfoValid(true);
                } else {
                  setError("Something is wrong, check your payment details");
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <DepositSubmit />
      )}
    </div>
  );
};

export default DepositTransfer;
