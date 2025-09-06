import React, { useState } from "react";
import { FaStar, FaGamepad, FaTrophy, FaHeadset } from "react-icons/fa";
import "./Footer.scss";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

// Import your actual logo path - update this to your actual logo location
// import { Logo } from "../Logo/Logo";

interface CollapseItemProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const CollapseItem: React.FC<CollapseItemProps> = ({
  title,
  icon,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="footer-collapses__li">
      <div
        className={`footer-collapses-item ${
          isOpen
            ? "footer-collapses-item--open"
            : "footer-collapses-item--collapsed"
        }`}
      >
        <div className="collapse-beta">
          <div className="collapse-beta__head">
            <div
              className={`collapse-beta-head ${
                isOpen ? "" : "collapse-beta-head--collapsed"
              }`}
            >
              <div
                className="collapse-beta-head__inner"
                onClick={toggleCollapse}
              >
                <div
                  className={`footer-collapses-item__head footer-collapses-item-head ${
                    isOpen ? "" : "footer-collapses-item-head--collapsed"
                  }`}
                >
                  {icon && <span className="footer-icon">{icon}</span>}
                  <p className="text-[14px] font-medium md:font-semibold md:text-[16px]">
                    {title}
                  </p>
                </div>
                <div className="text-yellow-300 font-extrabold rotate-180 pl-3 text-[16px] md:text-[20px] md:mt-[-14px]">
                  <IoIosArrowUp />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`collapse-beta__body ${
              isOpen ? "collapse-beta__body--visible" : ""
            }`}
          >
            <div className="footer-collapses-item__body">{children}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

interface SocialImage {
  original: string;
  thumbnail: string;
}
interface SocialItem {
  id: number;
  status: string;
  images: SocialImage;
  title: string;
  link: string;
  createdAt: string;
}
// Props for Footer component
interface FooterProps {
  socialData?: SocialItem[]; // optional array
}
export const Footer: React.FC<FooterProps> = ({ socialData }) => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-collapses">
          <ul className="footer-collapses__ul">
            <CollapseItem title="Gaming" icon={<FaGamepad />}>
              <ul className="footer-links">
                <li>
                  <a href="#">Casino Games</a>
                </li>
                <li>
                  <a href="#">Slot Games</a>
                </li>
                <li>
                  <a href="#">Live Casino</a>
                </li>
                <li>
                  <a href="#">Sports Betting</a>
                </li>
                <li>
                  <a href="#">Lottery</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="About Game Star 365" icon={<FaStar />}>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Responsible Gaming</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="Features" icon={<FaTrophy />}>
              <ul className="footer-links">
                <li>
                  <a href="#">Mobile App</a>
                </li>
                <li>
                  <a href="#">Live Betting</a>
                </li>
                <li>
                  <a href="#">Promotions</a>
                </li>
                <li>
                  <a href="#">Referral Program</a>
                </li>
                <li>
                  <a href="#">Cashout</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="Help" icon={<FaHeadset />}>
              <ul className="footer-links">
                <li>
                  <a href="#">Support Center</a>
                </li>
                <li>
                  <a href="#">Payment Methods</a>
                </li>
                <li>
                  <a href="#">Deposit Tips</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </CollapseItem>
          </ul>
        </div>

        <div className="footer-bottom">
          <div className="payment-methods">
            <img src="/payments/visa.png" alt="Visa" />
            <img src="/payments/mastercard.png" alt="Mastercard" />
            <img src="/payments/americanexpress.png" alt="American Express" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Skrill_logo.svg/640px-Skrill_logo.svg.png"
              alt="Skrill"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Neteller.svg/2560px-Neteller.svg.png"
              alt="Neteller"
            />
            <img
              src="https://icon2.cleanpng.com/20180804/uqu/8763d2bc06870bbba5ad66bff9273690.webp"
              alt="PayPal"
            />
            <img src="https://pngimg.com/d/bitcoin_PNG35.png" alt="Bitcoin" />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW5ayzOGf4LF-EBxrjFixKlHRoLKQunLF7cQ&s"
              alt="Ethereum"
            />
            <img
              src="https://download.logo.wine/logo/JCB_(company)/JCB_(company)-Logo.wine.png"
              alt="JCB"
            />
            <img
              src="https://e7.pngegg.com/pngimages/925/4/png-clipart-logo-unionpay-credit-card-atm-card-bank-card-credit-card-text-payment.png"
              alt="UnionPay"
            />
            {/* Add more as needed */}
          </div>
          <div className="footer-text">
            <p>
              <span className="highlight">Game Star 365</span> is operated by
              Glory Gaming N.V., registered and established under the laws of
              Curacao.
            </p>
            <p>
              License No: <span className="highlight">8048/JAZ2019-015</span>
            </p>
          </div>

          {socialData && socialData.length > 0 && (
            <div className="social-links">
              {socialData.map((s: SocialItem) => (
                <Link
                  key={s.id}
                  to={s?.link || ""}
                  target="_blank"
                  className="social-link"
                >
                  <img
                    src={s.images?.original || ""}
                    className="object-cover"
                    alt="social icon"
                  />
                </Link>
              ))}
            </div>
          )}
          <div className="copyright">
            <p>
              &copy; 2025 <span>Game Star 365</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
