import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const DepositSubmit = ({ depositOptions, stepDetails, setStep }) => {
  const [accountName, setAccountName] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  console.log("depositOptions", { depositOptions });

  // Extract data from depositOptions
  const selectedGateway = depositOptions?.selectedGateway;
  const selectedProvider = depositOptions?.selectedProvider;
  const amount = depositOptions?.amount;

  // Get account information from the selected provider
  const accountInfo = selectedProvider?.gatewayProvider?.account?.[0] || null;

  // Transfer details from the account information
  const transferDetails = accountInfo
    ? {
        amount: amount || "0",
        bankName: accountInfo.bankName || "Bank",
        accountNumber: accountInfo.accountNumber || "N/A",
        accountName: accountInfo.holderName || "N/A",
        branch: accountInfo.branchName || "N/A",
        swiftCode: accountInfo.swiftCode || "N/A",
        iban: accountInfo.iban || "N/A",
        walletAddress: accountInfo.walletAddress || "N/A",
        network: accountInfo.network || "N/A",
      }
    : {
        amount: amount || "0",
        bankName: "Bank",
        accountNumber: "N/A",
        accountName: "N/A",
        branch: "N/A",
        swiftCode: "N/A",
        iban: "N/A",
        walletAddress: "N/A",
        network: "N/A",
      };

  // Extract from depositOptions
  const selectedTransferType = depositOptions?.name || "Transfer";
  const selectedDepositChannel = selectedGateway?.name || "Deposit Channel";

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
      gateway: selectedGateway,
      provider: selectedProvider,
    };

    console.log("Submitted Data:", formData);
    toast.success("Deposit information submitted successfully!");
  };

  return (
    <div className="text-white">
      {/* Payment Type Info */}
      <div className="flex flex-col items-center second-bg justify-center p-5 rounded-md">
        <img
          src={selectedGateway?.iconUrl}
          alt={selectedGateway?.name}
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h4 className="text-[18px] font-bold mt-2">
          {selectedGateway?.name || "Payment Method"}
        </h4>
        {selectedProvider && (
          <p className="text-[14px] text-gray-400 mt-1">
            Provider: {selectedProvider.name}
          </p>
        )}
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
        {selectedProvider && (
          <p>
            Provider:{" "}
            <span className="font-medium text-white">
              {selectedProvider.name}
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

        {/* Dynamic account details based on available information */}
        {accountInfo ? (
          <>
            {transferDetails.bankName && transferDetails.bankName !== "N/A" && (
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm text-gray-400">Bank name</p>
                  <p className="text-lg font-semibold text-[20px]">
                    {transferDetails.bankName}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(transferDetails.bankName)}
                  className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            )}

            {transferDetails.accountNumber &&
              transferDetails.accountNumber !== "N/A" && (
                <div className="flex justify-between items-center text-left">
                  <div>
                    <p className="text-sm text-gray-400">Account number</p>
                    <p className="text-lg font-semibold text-[20px]">
                      {transferDetails.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(transferDetails.accountNumber)}
                    className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              )}

            {transferDetails.accountName &&
              transferDetails.accountName !== "N/A" && (
                <div className="flex justify-between items-center text-left">
                  <div>
                    <p className="text-sm text-gray-400">Bank account name</p>
                    <p className="text-lg font-semibold text-[20px]">
                      {transferDetails.accountName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(transferDetails.accountName)}
                    className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              )}

            {transferDetails.branch && transferDetails.branch !== "N/A" && (
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm text-gray-400">Bank branch</p>
                  <p className="text-lg font-semibold text-[20px]">
                    {transferDetails.branch}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(transferDetails.branch)}
                  className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            )}

            {transferDetails.swiftCode &&
              transferDetails.swiftCode !== "N/A" && (
                <div className="flex justify-between items-center text-left">
                  <div>
                    <p className="text-sm text-gray-400">Swift Code</p>
                    <p className="text-lg font-semibold text-[20px]">
                      {transferDetails.swiftCode}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(transferDetails.swiftCode)}
                    className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              )}

            {transferDetails.iban && transferDetails.iban !== "N/A" && (
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm text-gray-400">IBAN</p>
                  <p className="text-lg font-semibold text-[20px]">
                    {transferDetails.iban}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(transferDetails.iban)}
                  className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            )}

            {transferDetails.walletAddress &&
              transferDetails.walletAddress !== "N/A" && (
                <div className="flex justify-between items-center text-left">
                  <div>
                    <p className="text-sm text-gray-400">Wallet Address</p>
                    <p className="text-lg font-semibold text-[20px]">
                      {transferDetails.walletAddress}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(transferDetails.walletAddress)}
                    className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              )}

            {transferDetails.network && transferDetails.network !== "N/A" && (
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm text-gray-400">Network</p>
                  <p className="text-lg font-semibold text-[20px]">
                    {transferDetails.network}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(transferDetails.network)}
                  className="bg-yellow-400 hover:bg-yellow-600 text-black px-4 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400">No account information available</p>
          </div>
        )}
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
