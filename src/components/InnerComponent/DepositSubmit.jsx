import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const DepositSubmit = ({ depositOptions, stepDetails, setStep }) => {
  const [accountName, setAccountName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  // Static transfer details (You can replace this later with dynamic data)
  const transferDetails = {
    amount: "30,000",
    bankName: "Real Bank",
    accountNumber: "1116205019670001",
    accountName: "Care Point",
    branch: "Chawkbazar Branch",
  };

  // Extract from depositOptions
  const selectedTransferType =
    depositOptions?.transfer_type?.title || "Transfer";
  const selectedDepositChannel =
    depositOptions?.deposit_channel?.name || "Deposit Channel";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      if (file.size <= 3 * 1024 * 1024) {
        setReceiptFile(file);
      } else {
        toast.error("File must be under 3MB");
      }
    } else {
      toast.error("Only JPG, JPEG or PNG files are allowed");
    }
  };

  const handleSubmit = () => {
    if (!accountName || !referenceId || !receiptFile) {
      toast.error("Please fill all the fields and upload the receipt.");
      return;
    }

    const formData = {
      accountName,
      referenceId,
      receiptFile,
      depositAmount: transferDetails.amount,
      bankDetails: transferDetails,
      depositChannel: selectedDepositChannel,
      transferType: selectedTransferType,
    };

    console.log("Submitted Data:", formData);
    toast.success("Deposit information submitted successfully!");
  };

  return (
    <div className="text-white">
      {/* Payment Type Info */}
      <div className="flex flex-col items-center second-bg justify-center p-5 rounded-md">
        <img src={depositOptions?.payment_type?.icon} alt="" className="h-10" />
        <h4 className="text-[18px] font-bold mt-2">
          {depositOptions?.payment_type?.title}
        </h4>
      </div>

      {/* Transfer Info */}
      <div className="border-t border-b second-border py-3 mt-5">
        <p className="text-[14px] text-gray-200 mt-1">
          Cash Out to the account below and fill in the required information.
        </p>
      </div>

      {/* Transfer method and channel */}
      <div className="mt-3 text-sm text-gray-300">
        <p>
          Transfer Method:{" "}
          <span className="font-medium text-white">{selectedTransferType}</span>
        </p>
        <p>
          Channel:{" "}
          <span className="font-medium text-white">
            {selectedDepositChannel}
          </span>
        </p>
      </div>

      {/* Transfer Details */}
      <div className="mt-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Transfer amount</p>
            <p className="font-bold text-green-400 text-left text-[20px]">
              ৳ {transferDetails.amount}
            </p>
          </div>
          <button
            onClick={() => handleCopy(transferDetails.amount)}
            className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
          >
            Copy
          </button>
        </div>

        {[
          { label: "Bank name", value: transferDetails.bankName },
          { label: "Account number", value: transferDetails.accountNumber },
          { label: "Bank account name", value: transferDetails.accountName },
          { label: "Bank branch", value: transferDetails.branch },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-left"
          >
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-lg font-semibold text-[20px]">{item.value}</p>
            </div>
            <button
              onClick={() => handleCopy(item.value)}
              className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
            >
              Copy
            </button>
          </div>
        ))}
      </div>

      {/* Reminder Section */}
      <div className="bg-[#1e1e1e] p-4 mt-6 rounded-md border border-gray-700">
        <div className="flex items-center gap-2 mb-2 text-white font-medium">
          <FaInfoCircle />
          Reminder
        </div>
        <ul className="text-sm text-gray-300 list-decimal text-left pl-5 space-y-1">
          <li>
            Please ensure the deposited amount matches the transferred amount.
          </li>
          <li>Use the registered phone number for Deposit/Withdrawal.</li>
          <li>
            Transfer the funds within <strong>09:35 minutes</strong> after
            submitting.
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="mt-6 space-y-4">
        {/* Bank Account Name */}
        <div>
          <label className="block text-sm mb-1 text-left">
            Bank account name
          </label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-700 rounded text-white"
            placeholder="Enter your bank account name"
          />
        </div>

        {/* Reference ID */}
        <div>
          <label className="block text-sm mb-1 text-left">
            Reference No. / Trans ID
          </label>
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-700 rounded text-white"
            placeholder="Reference No. / Trans ID"
          />
        </div>

        {/* Upload Receipt */}
        <div>
          <label className="block text-sm mb-1 text-left">Receipt</label>
          <div className="bg-[#1e1e1e] border border-gray-700 p-4 rounded flex flex-col items-center">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              className="hidden"
              id="receiptUpload"
            />
            <label
              htmlFor="receiptUpload"
              className="bg-yellow-400 hover:bg-yellow-600 font-medium text-black px-6 py-2 rounded cursor-pointer"
            >
              Upload
            </label>
            <p className="text-sm mt-2 text-gray-400">
              Max 3 MB in JPG or JPEG or PNG
            </p>
            {receiptFile && (
              <p className="text-sm text-green-400 mt-1">{receiptFile.name}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!accountName || !referenceId || !receiptFile}
          className={`w-full mt-4 py-3 rounded transition duration-300 ${
            !accountName || !referenceId || !receiptFile
              ? "bg-gray-600 cursor-not-allowed text-gray-300 pointer-events-none"
              : "bg-yellow-400 hover:bg-yellow-600 text-black"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DepositSubmit;
