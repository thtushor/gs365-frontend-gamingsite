import React, { useState, useRef, useCallback } from "react";
import "./FloatingContact.scss";
// Import social icons
import { FaWhatsapp, FaFacebookF, FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import qrCode from "../../assets/qrcode.jpg";
// Import expand/collapse icon
import { FaPlus, FaMinus } from "react-icons/fa";
// Import headset icon
import { FiHeadphones } from "react-icons/fi";
import { Logo } from "../Logo/Logo"; // Import the Logo component
// import SupportUs from "../SupportUs/SupportUs"; // Adjust the path as needed
// import DraggableContainer from "../DraggableContainer/DraggableContainer";
import { LuPhoneCall } from "react-icons/lu";

const FloatingContact: React.FC = () => {
  const [showFloatingContactSubMenu, setShowFloatingContactSubMenu] =
    useState(false);
  const floatingContactSubMenuRef = useRef<HTMLDivElement>(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  // Handle click outside for the floating contact submenu
  React.useEffect(() => {
    const handleClickOutsideFloating = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showFloatingContactSubMenu &&
        floatingContactSubMenuRef.current &&
        !floatingContactSubMenuRef.current.contains(target)
      ) {
        setShowFloatingContactSubMenu(false);
        setExpandedContact(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideFloating);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideFloating);
  }, [showFloatingContactSubMenu]);

  const handleContactButtonClick = useCallback(() => {
    setShowFloatingContactSubMenu((prev) => !prev);
    setExpandedContact(null);
  }, []);

  const handleContactClick = useCallback((contact: string) => {
    setExpandedContact((prev) => (prev === contact ? null : contact));
  }, []);

  return (
    <>
      {/* Floating Contact Button */}

      <button
        // className=""
        className="floating-contact-button fixed right-5 bottom-[103px] w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-[18px] md:text-[20px] text-black p-0"
        onClick={handleContactButtonClick}
        aria-label="Open contact options"
      >
        <LuPhoneCall />
      </button>

      {showFloatingContactSubMenu && (
        <div
          ref={floatingContactSubMenuRef}
          className={`floating-contact-submenu ${
            showFloatingContactSubMenu ? "visible" : ""
          }`}
          style={{
            pointerEvents: showFloatingContactSubMenu ? "auto" : "none",
            position: "fixed",
          }}
        >
          {/* Logo Area */}
          <div className="submenu-header">
            <Logo />
            <div className="headset-icon">
              <FiHeadphones />
              <span>24/7</span>
            </div>
          </div>

          {/* Contact Options */}
          <div className="contact-options-list">
            {/* Facebook Option */}
            <div
              className={`contact-option ${
                expandedContact === "Facebook" ? "expanded" : ""
              }`}
              onClick={() => handleContactClick("Facebook")}
            >
              <div className="contact-info">
                <span className="contact-icon">
                  <FaFacebookF />
                </span>
                <span>Facebook</span>
              </div>
              <span className="expand-icon">
                {expandedContact === "Facebook" ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`qr-code-area ${
                expandedContact === "Facebook" ? "expanded" : ""
              }`}
            >
              <img
                src={qrCode}
                alt="Facebook QR Code"
                className="qr-code-image"
              />
            </div>

            {/* Whatsapp Option */}
            <div
              className={`contact-option ${
                expandedContact === "Whatsapp" ? "expanded" : ""
              }`}
              onClick={() => handleContactClick("Whatsapp")}
            >
              <div className="contact-info">
                <span className="contact-icon">
                  <FaWhatsapp />
                </span>
                <span>Whatsapp</span>
              </div>
              <span className="expand-icon">
                {expandedContact === "Whatsapp" ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`qr-code-area ${
                expandedContact === "Whatsapp" ? "expanded" : ""
              }`}
            >
              <img
                src={qrCode}
                alt="Whatsapp QR Code"
                className="qr-code-image"
              />
            </div>

            {/* Telegram Option */}
            <div
              className={`contact-option ${
                expandedContact === "Telegram" ? "expanded" : ""
              }`}
              onClick={() => handleContactClick("Telegram")}
            >
              <div className="contact-info">
                <span className="contact-icon">
                  <FaTelegram />
                </span>
                <span>Telegram</span>
              </div>
              <span className="expand-icon">
                {expandedContact === "Telegram" ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`qr-code-area ${
                expandedContact === "Telegram" ? "expanded" : ""
              }`}
            >
              <img
                src={qrCode}
                alt="Telegram QR Code"
                className="qr-code-image"
              />
            </div>

            {/* Email Option */}
            <div
              className={`contact-option ${
                expandedContact === "Email" ? "expanded" : ""
              }`}
              onClick={() => handleContactClick("Email")}
            >
              <div className="contact-info">
                <span className="contact-icon">
                  <MdEmail />
                </span>
                <span>Email</span>
              </div>
              <span className="expand-icon">
                {expandedContact === "Email" ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`qr-code-area ${
                expandedContact === "Email" ? "expanded" : ""
              }`}
            >
              <img src={qrCode} alt="Email QR Code" className="qr-code-image" />
            </div>
          </div>
        </div>
      )}

      {/* Support Us Button */}

      {/* Floating Contact Submenu */}
    </>
  );
};

export default FloatingContact;
