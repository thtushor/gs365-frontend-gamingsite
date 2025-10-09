import React from "react";
import "./SupportUs.scss";
import logo from "../../assets/brand-logo.png";
import { useChat } from "../../contexts/ChatContext";
// import SupportPanel from "./SupportPanel";

const SupportUs: React.FC<{handleClick:()=>void}> = ({handleClick}) => {
  
const {unreadMsgCount} = useChat();

const hasNewMessages = Number(unreadMsgCount?.total||0) > 0;

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

         {/* Ping animation when there are new messages */}
         {hasNewMessages && (
          <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        )}
      </button>
    </>
  );
};

export default SupportUs;
