import React, { useState } from "react";
import "./SupportUs.scss";
import logo from "../../assets/brand-logo.png";
import SupportPanel from "./SupportPanel";

const SupportUs: React.FC<{handleClick:()=>void}> = ({handleClick}) => {
  

  return (
    <>
      {/* {open && <SupportPanel open={open} onClose={handleClose} />} */}
      <button
        className="support-us-floating-button border w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-[18px] md:text-[20px] text-black p-0"
        style={{
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
