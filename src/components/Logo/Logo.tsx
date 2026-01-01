import React from "react";
import "./Logo.scss";
import bigLogo from "../../assets/big-logo.png";
import smallLogo from '../../assets/small-brand.png';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className }) => {
  return (
    <div className={`h-[40px] sm:w-[210px] ${className || ""}`} onClick={onClick}>
      {/* <span className="logo-text">
        G<span className="highlight">Bet</span>
      </span> */}
      <img src={smallLogo} className="h-full sm:hidden mr-1" />
      <img src={bigLogo} className="h-full hidden sm:block" />
    </div>
  );
};
