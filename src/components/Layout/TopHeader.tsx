import React, { useState, useEffect } from "react";
import "./TopHeader.scss";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  // FaComments,
  FaTelegram,
} from "react-icons/fa";
import { CurrencyModal } from "../Modal/CurrencyModal";

const TopHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currencyLang, setCurrencyLang] = useState({
    currency: "BDT",
    language: "bn",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format the time (GMT+6)
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`(GMT+6) ${hours}:${minutes}:${seconds}`);

      // Format the date for the title attribute
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      setCurrentDate(`${year}/${month}/${day}`);
    };

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-header">
      <div className="top-header-inner">
        <span className="top-header-time" title={currentDate}>
          {currentTime}
        </span>

        <div className="language-wrap">
          <div
            className="language cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <img src="https://img.b112j.com/images/web/flag/BD.png" alt="bn" />
            <p>
              <span>৳&nbsp;BDT</span>&nbsp;বাংলা
            </p>
          </div>
        </div>

        <div className="header-online-service">
          <ul className="online-service-inner">
            <li>
              <a href="#" className="service-link whatsapp-link">
                <FaWhatsapp className="service-icon" />
                <span>Whatsapp</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:support.bd@gamingstar365.com"
                target="_blank"
                className="service-link email-link"
              >
                <FaEnvelope className="service-icon" />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a href="#" className="service-link facebook-link">
                <FaFacebookF className="service-icon" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "/guest/forumLogin",
                    "_blank",
                    "width=750,height=750,toolbar=no,scrollbars=no,menubar=no,status=no,resizable=yes,location=no"
                  );
                }}
                className="service-link forum-link"
              >
                <FaTelegram className="service-icon" />
                <span>Telegram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <CurrencyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onChange={setCurrencyLang}
        value={currencyLang}
      />
    </div>
  );
};

export default TopHeader;
