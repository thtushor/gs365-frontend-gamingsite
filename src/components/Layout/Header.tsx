import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbUserShare } from "react-icons/tb";
import { TbFileDollar } from "react-icons/tb";

import { MdOutlineLockPerson } from "react-icons/md";

import "./Header.scss";
import { Logo } from "../Logo/Logo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopHeader from "./TopHeader";
import MainNav from "./MainNav";
import LoginPopup from "../Auth/LoginPopup";
import { showToaster } from "../../lib/utils/toast";
import profilePic from "../../assets/member-avatar.png";
import { toast } from "react-toastify";
import formatDate from "../../lib/utils/formatDate";
import { useAuth } from "../../contexts/auth-context";
import UserProfileDropdown from "./UserProfileDropdown";
import { CircleDollarSignIcon } from "lucide-react";
import { CurrencyModal } from "../Modal/CurrencyModal";

// import SeoSection from "./SeoSection";

// const sponsorImages = [
//   "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/biratnagar-kings.png",
//   "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/afc-bournemouth.png",
//   "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/bologna-fc-1909.png",
//   "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/quetta-gladiators.png",
// ];

// const sliderSettings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   arrows: false,
// };

const Header: React.FC = () => {
  const { logout: handleContextLogout, user } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  console.log(user);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = (affiliate: boolean = false) => {
    if (affiliate) {
      navigate("/affiliate-signup");
    } else {
      navigate("/register");
    }
  };

  const handleLogout = async () => {
    // Clear localStorage data
    handleContextLogout();

    // Show success message
    showToaster("Logged out successfully", "success");
  };

  const handleUserProfileClick = (url: string) => {
    // Navigate to user profile or dashboard
    navigate(url);
  };

  const profileNavOption = [
    {
      name: "Personal Info",
      icon: <CgProfile />,
      url: "/profile/personal-information",
    },
    {
      name: "Login & Security",
      icon: <MdOutlineLockPerson />,
      url: "/profile/login-security",
    },
    {
      name: "Transaction Records",
      icon: <TbFileDollar />,
      url: "/profile/transaction-records",
    },
    {
      name: "My Referral",
      icon: <TbUserShare />,
      url: "/profile/referral-details",
    },
  ];

  const handleCopyName = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // currency modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currencyLang, setCurrencyLang] = useState({
    currency: "BDT",
    language: "bn",
  });

  return (
    <>
      <TopHeader />

      <header className="custom-header">
        <div className="header-inner">
          <div className="header-left">
            <div onClick={() => navigate("/")}>
              <Logo />
            </div>
            {/* <div className="sponsor-slider-wrapper">
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
            </div> */}
          </div>
          <div className="header-center">{/* Empty center section */}</div>
          <div className="header-right">
            {user ? (
              <>
                <button
                  className="signup-btn flex items-center gap-2"
                  onClick={() => navigate("/deposit")}
                >
                  <CircleDollarSignIcon className="w-4 h-4" />
                  Deposit
                </button>
                <button
                  className="signup-btn flex items-center gap-2"
                  onClick={() => navigate("/withdraw")}
                >
                  <CircleDollarSignIcon className="w-4 h-4" />
                  Withdraw
                </button>
              </>
            ) : (
              <button
                className="signup-btn "
                onClick={() => handleRegisterClick(true)}
              >
                Affiliate Signup
              </button>
            )}
            {user ? (
              // User is logged in - show user info and logout
              <UserProfileDropdown
                user={user}
                profileNavOption={profileNavOption}
                handleUserProfileClick={handleUserProfileClick}
                handleLogout={handleLogout}
                handleCopyName={handleCopyName}
                profilePic={profilePic}
                formatDate={formatDate}
              />
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <button className="signup-btn-green" onClick={handleLoginClick}>
                  লগইন
                </button>
                <button
                  className="signup-btn"
                  onClick={() => handleRegisterClick()}
                >
                  সাইন আপ
                </button>
              </>
            )}
            <div
              className="country-flag-container cursor-pointer border-2 border-yellow-300"
              onClick={() => setModalOpen(true)}
            >
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

      <CurrencyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onChange={setCurrencyLang}
        value={currencyLang}
      />
    </>
  );
};

export default Header;
