import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbUserShare } from "react-icons/tb";
import { TbFileDollar } from "react-icons/tb";

import { MdOutlineLockPerson } from "react-icons/md";

import "./Header.scss";
import { Logo } from "../Logo/Logo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopHeader from "./TopHeader";
import MainNav from "./MainNav";
import LoginPopup from "../Auth/LoginPopup";
import { showToaster } from "../../lib/utils/toast";
import profilePic from "../../assets/member-avatar.png";
import { LuCopy } from "react-icons/lu";
import { toast } from "react-toastify";
import formatDate from "../../lib/utils/formatDate";
import { IoIosArrowBack } from "react-icons/io";
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
  const [user, setUser] = useState<{
    username: string;
    id: string;
    fullname: string;
    created_at: string;
  } | null>(null);
  console.log(user);
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

  const handleRegisterClick = (affiliate: boolean = false) => {
    if (affiliate) {
      navigate("/affiliate-signup");
    } else {
      navigate("/register");
    }
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
            <button
              className="signup-btn "
              onClick={() => handleRegisterClick(true)}
            >
              Affiliate Signup
            </button>
            {user ? (
              // User is logged in - show user info and logout
              <div className="user-section relative group">
                {/* <button
                  className="user-profile-btn"
                  onClick={handleUserProfileClick}
                  title="View Profile"
                >
                  <span className="user-avatar">👤</span>
                  <span className="username">{user.username}</span>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  লগআউট
                </button> */}

                <div
                  className="user-profile-btn signup-btn !light-bg !px-2 !pr-3"
                  title="View Profile"
                >
                  <span className="user-avatar">👤</span>
                  <span className="username">Profile</span>
                </div>

                <div className="profile-dropdown shadow-2xl absolute right-0 mt-0 pt-2 w-[330px] md:w-[400px] hidden group-hover:block z-[9999999]">
                  <div className="second-bg text-left  rounded-lg profile-shadow">
                    <div className="border-b px-4 py-3 light-border">
                      <div className=" flex gap-2 items-start">
                        <img
                          src={profilePic}
                          className="w-[40px] h-[40px] mt-1"
                        />
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full mb-2">
                            <div className="pr-2">
                              <span className="opacity-60 text-[14px]">
                                Full legal name
                              </span>
                              <p
                                onClick={() =>
                                  handleCopyName(user.fullname || "Player")
                                }
                                className="font-medium cursor-pointer text-[16px] flex items-center gap-2 mt-[-2px]"
                              >
                                <span className="block truncate max-w-[100px] md:max-w-[200px]">
                                  {user.fullname || "Player"}
                                </span>
                                <LuCopy />
                              </p>
                            </div>
                            <div className="h-[40px] mt-[5px] w-[1px] bg-[#2b2b2b]"></div>
                            <div className=" pl-2">
                              <span className="opacity-60 text-[14px]">
                                Username
                              </span>
                              <p
                                onClick={() =>
                                  handleCopyName(user.username || "Player")
                                }
                                className="font-medium cursor-pointer text-[16px] flex items-center gap-2 mt-[-2px]"
                              >
                                <span className=" truncate max-w-[90px] md:max-w-[200px]">
                                  {user.username || "Player"}
                                </span>
                                <LuCopy />
                              </p>
                            </div>
                          </div>
                          <span className="opacity-50 text-[14px]">
                            Sign up date : {formatDate(user?.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      {profileNavOption?.map((p, idx) => (
                        <div
                          onClick={() => handleUserProfileClick(p.url)}
                          key={idx}
                          className="font-medium p-4 cursor-pointer text-base  flex justify-between opacity-70 hover:opacity-100 hover:text-yellow-400 hover:border-transparent outline-none items-center w-full"
                        >
                          <p className="flex items-center gap-[6px]">
                            <span className="text-[20px]">{p.icon}</span>
                            {p?.name}
                          </p>
                          <span className="rotate-180 text-[25px] mr-[-6px] block">
                            <IoIosArrowBack />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 pt-1">
                      <button
                        className="w-full px-4 py-3 border light-border text-center hover:border-yellow-400 hover:text-yellow-400"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <button className="login-btn" onClick={handleLoginClick}>
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
