import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./FloatingContact.scss";
// Import social icons
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import qrCode from "../../assets/qrcode.jpg";
// Import expand/collapse icon
import { FaPlus, FaMinus } from "react-icons/fa";
// Import headset icon
import { FiHeadphones } from "react-icons/fi";
import { Logo } from "../Logo/Logo"; // Import the Logo component
import SupportUs from "../SupportUs/SupportUs"; // Adjust the path as needed

const FloatingContact: React.FC = () => {
  // State for contact submenu visibility and expanded contact option
  const [showFloatingContactSubMenu, setShowFloatingContactSubMenu] =
    useState(false); // Renamed for clarity
  const floatingContactSubMenuRef = useRef<HTMLDivElement>(null); // Renamed ref
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  // State for dragging: null, 'contact', or 'support'
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Refs for the buttons
  const floatingContactButtonRef = useRef<HTMLButtonElement>(null); // Ref for the contact button

  // State for button positions (using useEffect to set initial position after render)
  const [contactButtonPos, setContactButtonPos] = useState({ x: 0, y: 0 });

  // Set initial positions after the component mounts and buttons are rendered
  useEffect(() => {
    // Use requestAnimationFrame to ensure button sizes are calculated after render
    requestAnimationFrame(() => {
      if (floatingContactButtonRef.current) {
        const contactBtnWidth = floatingContactButtonRef.current.offsetWidth;
        const initialRightOffset = 30; // Initial distance from the right edge
        const initialBottomOffset = 30; // Initial distance from the bottom edge

        const initialContactX =
          window.innerWidth - contactBtnWidth - initialRightOffset;
        const initialContactY =
          window.innerHeight -
          (floatingContactButtonRef.current.offsetHeight || 0) -
          initialBottomOffset;

        setContactButtonPos({ x: initialContactX, y: initialContactY });
      }
    });
  }, []); // Empty dependency array means this runs once on mount

  // Handle click outside for the floating contact submenu
  useEffect(() => {
    const handleClickOutsideFloating = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside the contact submenu and the contact button
      if (
        showFloatingContactSubMenu &&
        floatingContactSubMenuRef.current &&
        !floatingContactSubMenuRef.current.contains(target) &&
        floatingContactButtonRef.current &&
        !floatingContactButtonRef.current.contains(target)
      ) {
        console.log("Clicked outside floating contact submenu");
        setShowFloatingContactSubMenu(false);
        setExpandedContact(null);
      }
      // Add checks for other potential submenus here if needed
    };

    document.addEventListener("mousedown", handleClickOutsideFloating);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideFloating);
  }, [showFloatingContactSubMenu]);

  // Handle dragging (Mouse and Touch)
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const currentButtonRef = floatingContactButtonRef;
      const currentButtonPos = contactButtonPos;
      const setCurrentButtonPos = setContactButtonPos;

      const newX = currentButtonPos.x + clientX - startPos.x;
      const newY = currentButtonPos.y + clientY - startPos.y;

      // Prevent dragging outside the viewport
      const maxX =
        window.innerWidth - (currentButtonRef.current?.offsetWidth || 0);
      const maxY =
        window.innerHeight - (currentButtonRef.current?.offsetHeight || 0);
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      setCurrentButtonPos({ x: boundedX, y: boundedY });
      setStartPos({ x: clientX, y: clientY }); // Update start position for next move
    };

    const handleMouseMove = (event: MouseEvent) => {
      handleMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      handleMove(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault(); // Prevent scrolling while dragging
    };

    const handleEnd = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, startPos, contactButtonPos]); // Added all position states as dependencies

  const handleContactButtonClick = useCallback(() => {
    // Only toggle submenu if not dragging
    if (!isDragging) {
      console.log(
        "Floating contact button clicked! Toggling submenu visibility."
      );
      setShowFloatingContactSubMenu((prev) => !prev);
      setExpandedContact(null);
    }
  }, [isDragging]);

  const handleContactClick = useCallback((contact: string) => {
    setExpandedContact((prev) => (prev === contact ? null : contact));
  }, []);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        ref={floatingContactButtonRef} // Use renamed ref
        className="floating-contact-button"
        onClick={handleContactButtonClick} // Use renamed handler
        aria-label="Open contact options"
        style={{
          position: "fixed", // Ensure fixed positioning for dragging
          left: contactButtonPos.x,
          top: contactButtonPos.y,
          // Remove bottom and right styles as they are now controlled by top/left
          // bottom: 'auto',
          // right: 'auto',
        }}
      >
        {/* Icon and text */}
        <div className="icon-container">
          📞{/* Phone icon placeholder */}
          <span className="twenty-four">24</span>
        </div>
      </button>

      {/* Floating Contact Submenu */}
      {/* Render the submenu based on showFloatingContactSubMenu state */}
      {showFloatingContactSubMenu && (
        <div
          ref={floatingContactSubMenuRef} // Use renamed ref
          className={`floating-contact-submenu ${
            showFloatingContactSubMenu ? "visible" : ""
          }`}
          style={{
            pointerEvents: showFloatingContactSubMenu ? "auto" : "none",
            position: "fixed",
            // left: contactButtonPos.x - 260, // Position relative to contact button
            // top: contactButtonPos.y - 300, // Position relative to contact button
          }}
        >
          {/* Logo Area */}
          <div className="submenu-header">
            {/* Use Logo component for gamestar logo */}
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
                src={qrCode}
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
              <img src={qrCode} alt="Email QR Code" className="qr-code-image" />
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
                src={qrCode}
                alt="Facebook QR Code"
                className="qr-code-image"
              />
            </div>
          </div>
        </div>
      )}
      <SupportUs />
    </>
  );
};

export default memo(FloatingContact);
