import React, { useState, useRef, useCallback } from "react";
import "./FloatingContact.scss";
import { FiHeadphones } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { useAuth } from "../../contexts/auth-context";
import { Logo } from "../Logo/Logo";

interface SocialItem {
  id: number;
  status: string;
  images: {
    original: string;
    thumbnail: string;
  };
  title: string;
  link: string;
  createdAt: string;
}

const FloatingContact: React.FC = () => {
  const { social } = useAuth();
  const [activeSocial, setActiveSocial] = useState<string | null>(null);
  const [showFloatingContactSubMenu, setShowFloatingContactSubMenu] =
    useState(false);
  const floatingContactSubMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showFloatingContactSubMenu &&
        floatingContactSubMenuRef.current &&
        !floatingContactSubMenuRef.current.contains(target)
      ) {
        setShowFloatingContactSubMenu(false);
        setActiveSocial(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFloatingContactSubMenu]);

  const handleContactButtonClick = useCallback(() => {
    setShowFloatingContactSubMenu((prev) => !prev);
    setActiveSocial(null);
  }, []);

  const handleSocialClick = useCallback((title: string, link: string) => {
    setActiveSocial(title);
    window.open(link, "_blank");
  }, []);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        className="floating-contact-button w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-[18px] md:text-[20px] text-black p-0"
        onClick={handleContactButtonClick}
        aria-label="Open contact options"
      >
        <LuPhoneCall />
      </button>

      {showFloatingContactSubMenu && (
        <div
          ref={floatingContactSubMenuRef}
          className="floating-contact-submenu visible"
          style={{ pointerEvents: "auto", position: "fixed" }}
        >
          {/* Logo Area */}
          <div className="submenu-header">
            <Logo />
            <div className="headset-icon">
              <FiHeadphones />
              <span>24/7</span>
            </div>
          </div>

          {/* Dynamic Social Options */}
          <div className="contact-options-list">
            {social?.map((item: SocialItem) => (
              <div
                key={item.id}
                className={`contact-option !justify-start !gap-[10px] ${
                  activeSocial === item.title ? "active" : ""
                }`}
                onClick={() => handleSocialClick(item?.title, item?.link)}
              >
                <img
                  src={item?.images?.original || ""}
                  alt={item?.title || ""}
                  className="contact-icon-image w-[23px]"
                />
                <span>{item?.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;
