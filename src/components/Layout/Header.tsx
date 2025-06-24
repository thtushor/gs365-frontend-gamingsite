import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { Logo } from "../Logo/Logo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopHeader from "./TopHeader";
import MainNav from "./MainNav";
import LoginPopup from "../Auth/LoginPopup";
import { showToaster } from "../../lib/utils/toast";
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
  const [user, setUser] = useState<{ username: string; id: string } | null>(
    null
  );
  const navigate = useNavigate();

  // Check for user data in localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");

    if (userData && accessToken) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }, []);

  // Listen for storage changes (when user logs in/out in other components)
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      const accessToken = localStorage.getItem("access_token");

      if (userData && accessToken) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom events
    window.addEventListener("userLogin", handleStorageChange);
    window.addEventListener("userLogout", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleStorageChange);
      window.removeEventListener("userLogout", handleStorageChange);
    };
  }, []);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    // Clear localStorage data
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Update component state
    setUser(null);

    // Show success message
    showToaster("Logged out successfully", "success");
  };

  const handleUserProfileClick = () => {
    // Navigate to user profile or dashboard
    navigate("/profile");
  };

  return (
    <>
      <TopHeader />

      <header className="custom-header">
        <div className="header-inner">
          <div className="header-left">
            <div onClick={() => navigate("/")}>
              <Logo />
            </div>
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
            {user ? (
              // User is logged in - show user info and logout
              <div className="user-section">
                <button
                  className="user-profile-btn"
                  onClick={handleUserProfileClick}
                  title="View Profile"
                >
                  <span className="user-avatar">👤</span>
                  <span className="username">{user.username}</span>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  লগআউট
                </button>
              </div>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <button className="login-btn" onClick={handleLoginClick}>
                  লগইন
                </button>
                <button className="signup-btn" onClick={handleRegisterClick}>
                  সাইন আপ
                </button>
              </>
            )}
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
