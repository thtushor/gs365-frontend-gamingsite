import React, { useState } from "react";
import "./SupportUs.scss";
import { Logo } from "../Logo/Logo";
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
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        <button
          className="support-us-floating-button"
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleClick}
          aria-label="Support Us"
        >
          <div className="icon-container">
            <Logo />
          </div>
        </button>
      </div>
    </>
  );
};

export default SupportUs;
