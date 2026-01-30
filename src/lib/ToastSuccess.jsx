import { CheckCircle2Icon, ShieldCloseIcon } from "lucide-react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const ToastSuccess = ({
  title = "Success",
  description = "Your request is successful.",
  onClose,
  location = "/",
  isRedirect = true,
  extraFn,
  icon = false,
  buttonLabel = "Done",
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (isRedirect) {
      navigate(location);
      // window.location.reload();
    }
    onClose(false);
    if (extraFn) {
      extraFn();
    }
  };
  return (
    <div className="popup-content-wrapper select-none">
      {/* <button
        className="absolute top-0 right-0 md:top-[-10px] md:right-[-10px] text-gray-900 bg-[#00ff99] text-xl p-1 rounded"
        onClick={handleClose}
        aria-label="Close"
      >
        <FaTimes />
      </button> */}

      {icon >= 0 ? (
        <div className="header-auth flex items-center justify-center">
          <h1 className="signup-btn !min-h-[60px] !text-[30px] !p-5 !py-3 flex items-center justify-center !rounded-[10px]">
            {icon} <span className="text-[35px] ml-1 mt-[-4px]">৳</span>
          </h1>
        </div>
      ) : (
        <div className="text-[#00ff99] text-[50px] text-center w-full flex items-center justify-center">
          <IoShieldCheckmark />
        </div>
      )}
      <h2 className="text-[18px] md:text-[22px] font-bold w-fit rounded-full mx-auto text-[#00ff99] mt-2">
        {title}
      </h2>
      <div className="popup-message text-center mt-1 text-[14px] md:text-[16px]">
        {" "}
        {description}
      </div>

      <div className="header-auth select-none flex items-center justify-center mt-3 mb-2">
        <div onClick={handleClose} className="signup-btn-green cursor-pointer">
          {buttonLabel}
        </div>
      </div>
    </div>
  );
};

export default ToastSuccess;
