import React, { useState } from "react";
import { FaStar, FaTrophy } from "react-icons/fa";
import "./Footer.scss";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import img1 from "../../assets/payment-method/1.svg";
import img2 from "../../assets/payment-method/2.svg";
import img3 from "../../assets/payment-method/3.svg";
import img4 from "../../assets/payment-method/4.svg";
import img5 from "../../assets/payment-method/5.svg";
import img6 from "../../assets/payment-method/6.svg";
import img7 from "../../assets/payment-method/7.svg";
import img8 from "../../assets/payment-method/8.svg";
import img9 from "../../assets/payment-method/9.svg";
import img10 from "../../assets/payment-method/10.svg";
import img11 from "../../assets/payment-method/11.svg";
import img12 from "../../assets/payment-method/12.svg";
import img13 from "../../assets/payment-method/13.svg";
import img14 from "../../assets/payment-method/14.svg";
import img14_2 from "../../assets/payment-method/14.5.svg";
import img15 from "../../assets/payment-method/15.svg";
import img16 from "../../assets/payment-method/16.svg";
import img17 from "../../assets/payment-method/17.svg";
import img18 from "../../assets/payment-method/18.svg";
import img19 from "../../assets/payment-method/19.svg";
import img20 from "../../assets/payment-method/20.svg";
import img21 from "../../assets/payment-method/21.svg";
import img22 from "../../assets/payment-method/22.svg";
import img23 from "../../assets/payment-method/23.svg";

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
  const paymentGateway = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img14_2,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
  ];
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-collapses">
          <ul className="footer-collapses__ul">
            {/* <CollapseItem title="Gaming" icon={<FaGamepad />}>
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
            </CollapseItem> */}

            <CollapseItem title="About Game Star 365" icon={<FaStar />}>
              <ul className="footer-links">
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-condition">Terms & Conditions</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="Pages" icon={<FaTrophy />}>
              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/promotion">Promotion</a>
                </li>
                <li>
                  <a href="/vip">VIP</a>
                </li>
                {/* <li>
                  <a href="#">Promotions</a>
                </li>
                <li>
                  <Link to="/referral-program" target="_blank">
                    Referral Program
                  </Link>
                </li>
                <li>
                  <a href="#">Cashout</a>
                </li> */}
              </ul>
            </CollapseItem>

            {/* <CollapseItem title="Help" icon={<FaHeadset />}>
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
            </CollapseItem> */}
          </ul>
        </div>

        <div className="footer-bottom">
          <div className="payment-methods">
            {paymentGateway?.map((p, index) => (
              <img src={p} key={index} alt="payment-gateway" />
            ))}
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
