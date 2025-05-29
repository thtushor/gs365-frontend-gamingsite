import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./FloatingContact.scss"; // We will create this file next
// Import social icons
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// Import expand/collapse icon (using FaPlus and FaMinus as placeholders)
import { FaPlus, FaMinus } from "react-icons/fa";
// Import headset icon (using FiHeadphones as a placeholder)
import { FiHeadphones } from "react-icons/fi";
import { Logo } from "../Logo/Logo";
// import { Logo } from "../Logo/Logo"; // Remove Logo import

// Assume these imports are needed based on MainNav.tsx
// You might need to adjust these based on what icons/images you actually use
// import yourLogo from "../../assets/your-logo.png";
// import whatsappQR from "../../assets/whatsapp-qr.png";
// import emailQR from "../../assets/email-qr.png";
// import facebookQR from "../../assets/facebook-qr.png";

const FloatingContact: React.FC = () => {
  const [showFloatingSubMenu, setShowFloatingSubMenu] = useState(false);
  const floatingButtonRef = useRef<HTMLButtonElement>(null);
  const floatingSubMenuRef = useRef<HTMLDivElement>(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  // Handle click outside for the floating contact submenu
  useEffect(() => {
    const handleClickOutsideFloating = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showFloatingSubMenu &&
        floatingSubMenuRef.current &&
        !floatingSubMenuRef.current.contains(target) &&
        floatingButtonRef.current &&
        !floatingButtonRef.current.contains(target)
      ) {
        console.log("Clicked outside floating submenu");
        setShowFloatingSubMenu(false);
        setExpandedContact(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideFloating);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideFloating);
  }, [showFloatingSubMenu]);

  const handleFloatingButtonClick = useCallback(() => {
    console.log("Floating button clicked! Toggling submenu visibility.");
    setShowFloatingSubMenu((prev) => !prev);
    setExpandedContact(null);
  }, []);

  const handleContactClick = useCallback((contact: string) => {
    setExpandedContact((prev) => (prev === contact ? null : contact));
  }, []);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        ref={floatingButtonRef}
        className="floating-contact-button"
        onClick={handleFloatingButtonClick}
        aria-label="Open contact options"
      >
        {/* Icon and text will go here - Placeholder */}
        <div className="icon-container">
          {/* Placeholder for button icon - using a phone emoji for now */}📞
        </div>
      </button>

      {/* Floating Contact Submenu */}
      <div
        ref={floatingSubMenuRef}
        className={`floating-contact-submenu ${
          showFloatingSubMenu ? "visible" : ""
        }`}
        style={{ pointerEvents: showFloatingSubMenu ? "auto" : "none" }}
      >
        {/* Logo Area */}
        <div className="submenu-header">
          {/* Placeholder for Logo - Using img tag for better styling control */}
          {/* Replace src with actual logo path */}
          <Logo />
          {/* 24/7 Headset Icon */}
          <div className="headset-icon">
            <FiHeadphones />
            <span>24/7</span>
          </div>
        </div>

        {/* Contact Options */}
        <div className="contact-options-list">
          {/* Whatsapp Option */}
          <div
            className={`contact-option ${
              expandedContact === "Whatsapp" ? "expanded" : ""
            }`}
            onClick={() => handleContactClick("Whatsapp")}
          >
            <div className="contact-info">
              {/* Whatsapp Icon */}
              <span className="contact-icon">
                <FaWhatsapp />
              </span>
              <span>Whatsapp</span>
            </div>
            {/* Expand/Collapse Icon */}
            <span className="expand-icon">
              {expandedContact === "Whatsapp" ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {/* QR Code Area for Whatsapp */}
          <div
            className={`qr-code-area ${
              expandedContact === "Whatsapp" ? "expanded" : ""
            }`}
          >
            {/* Whatsapp QR Code */}
            {/* Replace with actual QR code import if needed, otherwise uses the default */}
            <img
              src="src/assets/qrcode.jpg"
              alt="Whatsapp QR Code"
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
              {/* Email Icon */}
              <span className="contact-icon">
                <MdEmail />
              </span>
              <span>Email</span>
            </div>
            {/* Expand/Collapse Icon */}
            <span className="expand-icon">
              {expandedContact === "Email" ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {/* QR Code Area for Email */}
          <div
            className={`qr-code-area ${
              expandedContact === "Email" ? "expanded" : ""
            }`}
          >
            {/* Email QR Code */}
            {/* Replace with actual QR code import if needed, otherwise uses the default */}
            <img
              src="src/assets/qrcode.jpg"
              alt="Email QR Code"
              className="qr-code-image"
            />
          </div>

          {/* Facebook Option */}
          <div
            className={`contact-option ${
              expandedContact === "Facebook" ? "expanded" : ""
            }`}
            onClick={() => handleContactClick("Facebook")}
          >
            <div className="contact-info">
              {/* Facebook Icon */}
              <span className="contact-icon">
                <FaFacebookF />
              </span>
              <span>Facebook</span>
            </div>
            {/* Expand/Collapse Icon */}
            <span className="expand-icon">
              {expandedContact === "Facebook" ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {/* QR Code Area for Facebook */}
          <div
            className={`qr-code-area ${
              expandedContact === "Facebook" ? "expanded" : ""
            }`}
          >
            {/* Facebook QR Code */}
            {/* Replace with actual QR code import if needed, otherwise uses the default */}
            <img
              src="src/assets/qrcode.jpg"
              alt="Facebook QR Code"
              className="qr-code-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(FloatingContact);
