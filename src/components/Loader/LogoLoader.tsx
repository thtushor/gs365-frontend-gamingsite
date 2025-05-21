import React from "react";
import "./LogoLoader.scss";
import logo from "../../assets/brand-logo.png";

interface LogoLoaderProps {
  size?: number;
  speed?: number;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ size = 120, speed = 2 }) => {
  return (
    <div className="logo-loader" style={{ width: size, height: size }}>
      <div className="coin-wrapper" style={{ animationDuration: `${speed}s` }}>
        <div className="coin-front">
          <img
            src={logo}
            className="w-full h-full rounded-full"
            alt="Loading..."
          />
        </div>
        <div className="coin-back">
          <img
            src={logo}
            className="w-full h-full rounded-full"
            alt="Loading..."
          />
        </div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LogoLoader;
