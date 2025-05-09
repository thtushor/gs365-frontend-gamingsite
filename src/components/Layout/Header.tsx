import React from "react";
import "./Header.scss";

const Header: React.FC = () => (
  <header className="gs365-header">
    <div className="header-topbar">
      <span className="header-time">(GMT+6) 01:06:52</span>
      <span className="header-currency">৳ BDT বাংলা</span>
      <div className="header-socials">
        <a href="#">Whatsapp</a>
        <a href="#">Email</a>
        <a href="#">Facebook</a>
        <a href="#">Forum</a>
      </div>
      <div className="header-auth">
        <button className="login-btn">লগ ইন</button>
        <button className="signup-btn">সাইন আপ</button>
      </div>
    </div>
    <div className="header-mainbar">
      <div className="gs365-logo">GS365</div>
      {/* Add club icons or other elements here if needed */}
    </div>
  </header>
);

export default Header;
