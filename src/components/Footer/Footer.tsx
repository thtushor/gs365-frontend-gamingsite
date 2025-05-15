import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaStar,
  FaGamepad,
  FaTrophy,
  FaHeadset,
} from "react-icons/fa";
import "./Footer.scss";

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
                  {title}
                </div>
                <div
                  className="collapse-beta-head__arrow"
                  style={{
                    maskImage:
                      "url(https://img.b112j.com/bj/h5/assets/v3/images/icon-set/utility-type/arrow-up.svg)",
                    WebkitMaskImage:
                      "url(https://img.b112j.com/bj/h5/assets/v3/images/icon-set/utility-type/arrow-up.svg)",
                  }}
                ></div>
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

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-collapses">
          <ul className="footer-collapses__ul">
            <CollapseItem title="গেমিং" icon={<FaGamepad />}>
              <ul className="footer-links">
                <li>
                  <a href="#">ক্যাসিনো গেমস</a>
                </li>
                <li>
                  <a href="#">স্লট গেমস</a>
                </li>
                <li>
                  <a href="#">লাইভ ক্যাসিনো</a>
                </li>
                <li>
                  <a href="#">স্পোর্টস বেটিং</a>
                </li>
                <li>
                  <a href="#">লটারি</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="সম্পর্কে GameStar365" icon={<FaStar />}>
              <ul className="footer-links">
                <li>
                  <a href="#">আমাদের সম্পর্কে</a>
                </li>
                <li>
                  <a href="#">প্রাইভেসি পলিসি</a>
                </li>
                <li>
                  <a href="#">টার্মস এন্ড কন্ডিশন</a>
                </li>
                <li>
                  <a href="#">রেসপন্সিবল গেমিং</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="ফিচারসমূহ" icon={<FaTrophy />}>
              <ul className="footer-links">
                <li>
                  <a href="#">মোবাইল অ্যাপ</a>
                </li>
                <li>
                  <a href="#">লাইভ বেটিং</a>
                </li>
                <li>
                  <a href="#">প্রমোশন</a>
                </li>
                <li>
                  <a href="#">রেফারেল প্রোগ্রাম</a>
                </li>
                <li>
                  <a href="#">ক্যাশআউট</a>
                </li>
              </ul>
            </CollapseItem>

            <CollapseItem title="হেল্প" icon={<FaHeadset />}>
              <ul className="footer-links">
                <li>
                  <a href="#">সাপোর্ট সেন্টার</a>
                </li>
                <li>
                  <a href="#">পেমেন্ট মেথডস</a>
                </li>
                <li>
                  <a href="#">ডিপোজিট টিপস</a>
                </li>
                <li>
                  <a href="#">সাধারণ প্রশ্ন</a>
                </li>
                <li>
                  <a href="#">যোগাযোগ করুন</a>
                </li>
              </ul>
            </CollapseItem>
          </ul>
        </div>

        <div className="footer-bottom">
          <div className="payment-methods">
            <img src="/payments/visa.png" alt="Visa" />
            <img src="/payments/mastercard.png" alt="Mastercard" />
            <img src="/payments/americanexpress.png" alt="americanexpress" />
            {/* Add more payment methods */}
          </div>
          <div className="footer-text">
            <p>
              <span className="highlight">GameStar365</span> is operated by
              Glory Gaming N.V., registered and established under the laws of
              Curacao.
            </p>
            <p>
              License No: <span className="highlight">8048/JAZ2019-015</span>
            </p>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">
              <FaFacebookF />
            </a>
            <a href="#" className="social-link">
              <FaTwitter />
            </a>
            <a href="#" className="social-link">
              <FaInstagram />
            </a>
            <a href="#" className="social-link">
              <FaTelegram />
            </a>
            <a href="#" className="social-link">
              <FaYoutube />
            </a>
          </div>
          <div className="copyright">
            <p>
              &copy; 2025 <span>GameStar365</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
