import { CheckCircle2Icon, ShieldCloseIcon } from "lucide-react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const ToastError = ({
  title = "Failed",
  description = "Your request is failed.",
  onClose,
  location = "/",
  isRedirect = true,
  extraFn,
  loginSignupBtn = false,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (isRedirect) {
      navigate(location);
      window.location.reload();
    }
    onClose(false);
    if (extraFn) {
      extraFn();
    }
  };
  return (
    <div className="popup-content-wrapper">
      {/* <button
        className="absolute top-0 right-0 md:top-[-10px] md:right-[-10px] text-gray-900 bg-[#00ff99] text-xl p-1 rounded"
        onClick={handleClose}
        aria-label="Close"
      >
        <FaTimes />
      </button> */}
      <div className="text-[#ff4400] text-[50px] text-center w-full flex items-center justify-center">
        <IoShieldCheckmark />
      </div>
      <h2 className="text-[18px] md:text-[22px] font-bold w-fit rounded-full mx-auto text-[#ff4400] mt-2">
        {title}
      </h2>
      <div className="popup-message mt-1 text-[14px] md:text-[16px]">
        {" "}
        {description}
      </div>

      <div className="header-auth flex items-center justify-center mt-3 mb-2">
        {loginSignupBtn ? (
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                onClose();
                extraFn();
              }}
              className="custom-error-btn cursor-pointer"
            >
              Login
            </div>
            <div
              onClick={() => {
                onClose();
                navigate("/register");
              }}
              className="custom-error-btn hover:!text-white cursor-pointer"
            >
              Signup
            </div>
          </div>
        ) : (
          <div
            onClick={handleClose}
            className="custom-error-btn cursor-pointer"
          >
            Done
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastError;
