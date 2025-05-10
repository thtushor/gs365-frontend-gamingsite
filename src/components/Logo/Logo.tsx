import React from "react";
import "./Logo.scss";
import logo from '../../assets/brand-logo.png'

export const Logo: React.FC = () => {
  return (
    <div className="h-[40px]">
      {/* <span className="logo-text">
        G<span className="highlight">Bet</span>
      </span> */} 

      <img src={logo} className="h-full"/>
    </div>
  );
};
