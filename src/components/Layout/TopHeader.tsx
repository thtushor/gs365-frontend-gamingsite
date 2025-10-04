import React, { useState, useEffect } from "react";
import "./TopHeader.scss";
import { FaStar } from "react-icons/fa";
import { Logo } from "../Logo/Logo";
import { BiCloudDownload } from "react-icons/bi";
import { CurrencyModal } from "../Modal/CurrencyModal";
import { useNavigate } from "react-router-dom";

const TopHeader: React.FC = () => {
  const navigate = useNavigate();
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

  const handleDownloadApp = () => {
    navigate("/download");
    console.log("Downloaded!");
  };

  return (
    <div className="top-header">
      <div className="top-header-inner">
        <div className="items-center gap-4 md:flex hidden">
          <span className="top-header-time" title={currentDate}>
            {currentTime}
          </span>

          <div className="language-wrap">
            <div
              className="language cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <img
                src="https://img.b112j.com/images/web/flag/BD.png"
                alt="bn"
              />
              <p>
                <span>৳&nbsp;BDT</span>&nbsp;বাংলা
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center md:hidden"
          onClick={() => navigate("/")}
        >
          <Logo />
          <div className="flex items-start flex-col">
            <p className="text-[10px] font-semibold text-yellow-300">
              GS365 APP
            </p>
            <div className="flex text-yellow-300 gap-[3px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>

        <div className="header-auth md:hidden">
          <button
            className="signup-btn download-btn flex gap-[2px]"
            onClick={() => handleDownloadApp()}
          >
            Download <BiCloudDownload size={18} />
          </button>
        </div>

        {/* <div className="header-online-service">
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
        </div> */}
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
