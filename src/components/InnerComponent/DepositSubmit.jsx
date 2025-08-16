import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/api/axios";
import { SINGLE_IMAGE_UPLOAD_URL, API_ENDPOINTS } from "../../lib/api/config";
import { useAuth } from "../../contexts/auth-context";
import BaseModal from "../Promotion/BaseModal";

const PaymentConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-4">
        <span className="text-3xl">✔</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Payment Submitted!</h2>
      <p className="text-gray-300 mb-4">
        Your deposit information has been received successfully.  
        Funds will be processed shortly.
      </p>
      <button
        onClick={() => window.location.reload()} // Or navigate to dashboard
        className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};


const DepositSubmit = ({ depositOptions, stepDetails, setStep }) => {
  const [accountName, setAccountName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadRes, setUploadRes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600s
   const [isCompleted, setIsCompleted] = useState(false);
  const { user } = useAuth();


   // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Extract main details
  const paymentType = depositOptions?.payment_type;
  const selectedGateway = depositOptions?.selectedGateway;
  const selectedProvider = depositOptions?.selectedProvider;
  const depositChannel = depositOptions?.deposit_channel;
  const transferType = depositOptions?.transfer_type;
  const amount = depositOptions?.amount;

  // Extract account info
  const accountInfo = depositChannel?.gatewayProvider?.account?.[0] || null;

  const transferDetails = {
    amount: amount || "0",
    bankName: accountInfo?.bankName || null,
    accountNumber: accountInfo?.accountNumber || null,
    accountName: accountInfo?.holderName || null,
    branch: accountInfo?.branchName || null,
    swiftCode: accountInfo?.swiftCode || null,
    iban: accountInfo?.iban || null,
    walletAddress: accountInfo?.walletAddress || null,
    network: accountInfo?.network || null,
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      if (file.size <= 3 * 1024 * 1024) {
        setReceiptFile(file);
        setUploadRes(null);
        uploadSingleImage(file);
      } else {
        toast.error("File must be under 3MB");
      }
    } else {
      toast.error("Only JPG, JPEG or PNG files are allowed");
    }
  };

  const uploadSingleImage = async (file) => {
    setLoading(true);
    setErrorMsg("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(SINGLE_IMAGE_UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadRes(res.data);
      toast.success("Receipt uploaded successfully");
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Upload failed";
      setUploadRes({ status: false, message });
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!accountName || !referenceId || !receiptFile) {
      toast.error("Please fill all the fields and upload the receipt.");
      return;
    }
    if (loading) {
      toast.info("Please wait until the receipt upload completes.");
      return;
    }

    const formData = {
      userId: user?.id,
      amount: Number(amount),
      currencyId: selectedGateway?.currencyId || 1,
      promotionId: depositOptions?.promotionId || null,
      paymentGatewayProviderAccountId: accountInfo?.id,
      notes: referenceId,
      attachment: uploadRes?.data?.original || uploadRes?.original,
    };

    try {
      setIsSubmitting(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.PAYMENT.DEPOSIT_TRANSACTION,
        formData
      );

      const success = res?.status >= 200 && res?.status < 300;
      const apiStatus = res?.data?.status;
      const message =
        res?.data?.message ||
        (success
          ? "Deposit information submitted successfully!"
          : "Failed to submit deposit information");

      if (apiStatus === false) {
        toast.error(message);
      } else {
        toast.success(message);
        // setStep(stepDetails?.nextStep || 0);
        setIsCompleted(true); // ✅ show confirmation screen
      }
    } catch (error) {
      const message = error?.message || "Failed to submit deposit information";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
  return <BaseModal showClose={false} open={true}><PaymentConfirmation /></BaseModal>;
}

  return (
    <div className="text-white">
      {/* Timer */}
    <div className="flex justify-center items-center p-3 bg-black/40 rounded-md mb-4">
      <p className="text-yellow-400 font-bold text-lg">
        Time Remaining: {formatTime(timeLeft)}
      </p>
    </div>

    {/* If expired */}
    {timeLeft <= 0 && (
      <p className="text-red-400 font-semibold mb-3">
        Deposit window expired. Please try again.
      </p>
    )}
      {/* Payment Type Info */}
      <div className="flex flex-col items-center second-bg justify-center p-5 rounded-md">
        <img
          src={paymentType?.icon}
          alt={paymentType?.title}
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h4 className="text-[18px] font-bold mt-2">{paymentType?.title}</h4>
        {paymentType?.bonus && (
          <p className="text-[14px] text-green-400 mt-1">
            Bonus: {paymentType?.bonus}
          </p>
        )}
      </div>

      {/* Transfer Info */}
      <div className="border-t border-b second-border py-3 mt-5">
        <p className="text-[14px] text-gray-200 mt-1">
          Please transfer to the account below and fill in required details.
        </p>
      </div>

      {/* Transfer method and channel */}
      <div className="mt-3 text-sm text-gray-300">
        <p>
          Transfer Method:{" "}
          <span className="font-medium text-white">{transferType?.title}</span>
        </p>
        <p>
          Channel:{" "}
          <span className="font-medium text-white">
            {depositChannel?.name}
          </span>
        </p>
        {selectedProvider && (
          <p>
            Provider:{" "}
            <span className="font-medium text-white">
              {selectedProvider?.name}
            </span>
          </p>
        )}
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

        {/* Account Info */}
        {Object.entries(transferDetails).map(([key, value]) =>
          key !== "amount" && value ? (
            <div
              key={key}
              className="flex justify-between items-center text-left"
            >
              <div>
                <p className="text-sm text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
                <p className="text-lg font-semibold text-[20px]">{value}</p>
              </div>
              <button
                onClick={() => handleCopy(value)}
                className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
              >
                Copy
              </button>
            </div>
          ) : null
        )}
      </div>

      {/* Reminder Section */}
      <div className="bg-[#1e1e1e] p-4 mt-6 rounded-md border border-gray-700">
        <div className="flex items-center gap-2 mb-2 text-white font-medium">
          <FaInfoCircle />
          Reminder
        </div>
        <ul className="text-sm text-gray-300 list-decimal text-left pl-5 space-y-1">
          <li>Please ensure the deposited amount matches the transferred amount.</li>
          <li>Use your registered phone number for Deposit/Withdrawal.</li>
          <li>Transfer funds within <strong>10 minutes</strong> after submitting.</li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="mt-6 space-y-4">
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
            {loading && (
              <p className="text-sm text-yellow-400 mt-1">Uploading...</p>
            )}
            {!loading && uploadRes?.status && (
              <p className="text-sm text-green-400 mt-1">Upload successful</p>
            )}
            {!loading && errorMsg && (
              <p className="text-sm text-red-400 mt-1">{errorMsg}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!accountName || !referenceId || !receiptFile || loading || isSubmitting}
          className={`w-full mt-4 py-3 rounded transition duration-300 ${
            !accountName || !referenceId || !receiptFile || loading || isSubmitting
              ? "bg-gray-600 cursor-not-allowed text-gray-300 pointer-events-none"
              : "bg-yellow-400 hover:bg-yellow-600 text-black"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default DepositSubmit;
