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
import { CircleDollarSignIcon, TargetIcon } from "lucide-react";
import { HiMenuAlt1 } from "react-icons/hi";
import MobileSideBar from "./MobileSideBar";
import { UserBalance } from "./UserBalance";
import { FaGamepad } from "react-icons/fa";
import { CurrencyModal } from "../Modal/CurrencyModal";

// import SeoSection from "./SeoSection";
const Header: React.FC = () => {
  const { logout: handleContextLogout, user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
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
      name: "Turnover",
      icon: <TargetIcon className="w-4 h-4" />,
      url: "/profile/turnover",
    },
    {
      name: "Test Gaming",
      icon: <FaGamepad />,
      url: "/test-game",
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <TopHeader />

      <header className="custom-header py-[10px]">
        <div className="header-inner">
          <div className="header-left">
            <div
              onClick={() => navigate("/")}
              className="hidden cursor-pointer sm:flex items-center"
            >
              <Logo />
              <h1 className="text-[23px] font-semibold text-yellow-300">
                GS360
              </h1>
            </div>

            {/* open menu after click this */}
            <div
              onClick={handleOpenSidebar}
              className="text-yellow-300 cursor-pointer sm:hidden flex gap-[2px] items-center"
            >
              <HiMenuAlt1 size={25} />
            </div>

            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[999999]"
                onClick={handleCloseSidebar}
              />
            )}

            {/* Sidebar content */}
            <div
              className={`fixed top-0 overflow-y-auto left-0 h-full w-56 bg-[#111] text-white z-[99999999] transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              {/* <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={handleCloseSidebar}>✖</button>
              </div> */}
              <nav className="p-4">
                <MobileSideBar />
              </nav>
            </div>
          </div>
          <div className="header-center">{/* Empty center section */}</div>
          <div className="header-right">
            {user ? (
              <>
                {/* User balance buttons */}
                <UserBalance />
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
                className="signup-btn max-h-[27px] sm:max-h-full"
                onClick={() => handleRegisterClick(true)}
              >
                Affiliate{" "}
                <span className="sm:flex hidden ml-[5px]">Signup</span>
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
                <button
                  className="signup-btn-green max-h-[27px] sm:max-h-full"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button
                  className="signup-btn max-h-[27px] sm:max-h-full"
                  onClick={() => handleRegisterClick()}
                >
                  Signup
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
