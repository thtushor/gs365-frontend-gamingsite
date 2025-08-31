import React from "react";
import { useNavigate } from "react-router-dom";

const KycModal = ({ data, onClose }) => {
  const navigate = useNavigate();

  const handleSubmitKYC = () => {
    // Close the modal first
    if (onClose) onClose();

    // Navigate to KYC verification page
    navigate("/profile/verification");
  };

  return (
    <div className="">
      <h1 className="text-[18px] font-semibold mb-2 text-yellow-300">
        KYC Verification Required
      </h1>
      <p className="text-[14px] font-normal opacity-70">
        To ensure the security of your account, we require you to complete the
        KYC (Know Your Customer) verification process. Withdrawals will only be
        available once your KYC information has been successfully verified.
      </p>

      <div className="header-auth mt-3">
        <div
          onClick={handleSubmitKYC}
          className="signup-btn mx-auto !pt-1 cursor-pointer"
        >
          Submit KYC
        </div>
      </div>
    </div>
  );
};

export default KycModal;
