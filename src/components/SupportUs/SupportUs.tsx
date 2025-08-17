import React, { useState } from "react";
import "./SupportUs.scss";
import logo from "../../assets/brand-logo.png";
import SupportPanel from "./SupportPanel";

const BUTTON_SIZE = 64;

const SupportUs: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <SupportPanel open={open} onClose={handleClose} />}
      <button
        className="support-us-floating-button !w-[40px] !h-[40px] md:w-[50px] md:h-[50px] text-[18px] md:text-[20px] text-black p-0"
        style={{
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={handleClick}
        aria-label="Support Us"
      >
        <img src={logo} className="h-[30px] md:h-[40px]" />
      </button>
    </>
  );
};

export default SupportUs;
