/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaUser, FaTelegramPlane, FaFacebook } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import "./Topbar.scss";
import { CurrencyModal } from "../Modal/CurrencyModal";

export const TopBar: React.FC = () => {
  const [data, setCurrency] = useState({
    currency: "USD",
    language: "en",
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurrencySelect = (
    value: {
      currency: string;
      language: string;
    },
    fullData: any
  ) => {
    console.log(fullData);
    setCurrency(value);
  };

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="top-navbar">
      <div className="top-navbar__left">
        <div className="top-navbar__left__item">
          <FaUser />
          <span>+1 123 456 7890</span>
        </div>
        <div className="top-navbar__left__item">
          <div
            className="currency-selector currency-language-text"
            onClick={() => setIsModalOpen(true)}
          >
            <span>{data.currency}</span> | <span>{data.language}</span>
          </div>
        </div>
        <div className="top-navbar__left__item">
          <span>{timeZone}</span>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="top-navbar__right">
        <div className="top-navbar__right__item">
          <BiSupport />
          <span>24/7 Support</span>
        </div>
        <div className="top-navbar__right__item">
          <FaTelegramPlane />
          <span>Telegram</span>
        </div>
        <div className="top-navbar__right__item">
          <FaFacebook />
          <span>Facebook</span>
        </div>
        <div className="top-navbar__right__item">
          <MdEmail />
          <span>Email</span>
        </div>
      </div>

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleCurrencySelect}
        value={data}
      />
    </div>
  );
};
