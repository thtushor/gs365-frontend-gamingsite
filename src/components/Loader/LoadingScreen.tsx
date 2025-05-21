import React from "react";
import LogoLoader from "./LogoLoader";
import "./LoadingScreen.scss";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <LogoLoader size={150} speed={1.5} />
    </div>
  );
};

export default LoadingScreen;
