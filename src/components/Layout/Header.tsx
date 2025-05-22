import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { Logo } from "../Logo/Logo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopHeader from "./TopHeader";
import MainNav from "./MainNav";
import LoginPopup from "../Auth/LoginPopup";
// import SeoSection from "./SeoSection";

const sponsorImages = [
  "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/biratnagar-kings.png",
  "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/afc-bournemouth.png",
  "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/bologna-fc-1909.png",
  "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/quetta-gladiators.png",
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

const Header: React.FC = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <TopHeader />

      <header className="custom-header">
        <div className="header-inner">
          <div className="header-left">
            <Logo />
            <div className="sponsor-slider-wrapper">
              <Slider {...sliderSettings}>
                {sponsorImages.map((img, idx) => (
                  <div key={idx} className="sponsor-slide-item">
                    <img
                      src={img}
                      alt={`sponsor-${idx}`}
                      className="sponsor-img"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="header-center">{/* Empty center section */}</div>
          <div className="header-right">
            <button className="login-btn" onClick={handleLoginClick}>
              লগইন
            </button>
            <button className="signup-btn" onClick={handleRegisterClick}>
              সাইন আপ
            </button>
            <div className="country-flag-container">
              <img
                src="https://img.b112j.com/bj/h5/assets/v3/images/icon-set/flag-type/BD.png"
                alt="Bangladesh Flag"
                className="country-flag"
              />
            </div>
          </div>
        </div>
      </header>
      <MainNav />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onSignUpClick={handleRegisterClick}
      />
    </>
  );
};

export default Header;
