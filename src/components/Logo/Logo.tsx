import React from "react";
import "./Logo.scss";
import logo from "../../assets/brand-logo.png";

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className }) => {
  return (
    <div className={`h-[40px] ${className || ""}`} onClick={onClick}>
      {/* <span className="logo-text">
        G<span className="highlight">Bet</span>
      </span> */}
      <img src={logo} className="h-full" />
    </div>
  );
};
