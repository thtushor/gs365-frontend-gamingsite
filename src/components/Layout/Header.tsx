import React from "react";
import "./Header.scss";
import { Logo } from "../Logo/Logo";

const sponsorImg =
  "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/biratnagar-kings.png";

const Header: React.FC = () => {
  return (
    <header className="custom-header">
      <div className="header-inner">
        <div className="header-left">
          <Logo />
          <img
            src={sponsorImg}
            alt="sponsor"
            className="sponsor-img static-sponsor"
          />
        </div>
        <div className="header-right">
          <button className="login-btn">লগইন</button>
          <button className="signup-btn">সাইন আপ</button>
          <div className="country-select">
            <img
              src="https://img.b112j.com/bj/h5/assets/v3/images/icon-set/flag-type/BD.png"
              alt="Bangladesh Flag"
              className="country-flag"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
