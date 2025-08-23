import React, { useEffect, useState } from "react";
import { BiGift, BiHome, BiShareAlt } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPopup from "../Auth/LoginPopup";
import { useAuth } from "../../contexts/auth-context";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { showToaster } from "../../lib/utils/toast";
import profilePic from "../../assets/member-avatar.png";
import MobileProfile from "./MobileProfile";
import formatDate from "../../lib/utils/formatDate";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLockPerson } from "react-icons/md";
import { TbFileDollar, TbUserShare } from "react-icons/tb";
import { TargetIcon } from "lucide-react";
import { FaGamepad } from "react-icons/fa";

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

const MobileNav = () => {
  const [showAlert, setShowAlert] = useState(false);

  const sidebarLinks = [
    { id: 1, name: "Home", link: "/", image: <BiHome /> },
    { id: 2, name: "Promotion", link: "/promotions", image: <BiGift /> },
    {
      id: 3,
      name: "Invite",
      link: "/profile/referral-details",
      image: <BiShareAlt />,
    },
    { id: 6, name: "Deposit", link: "/deposit", image: <IoIosAddCircle /> },
    { id: 7, name: "Profile", link: "/profile", image: <FaRegCircleUser /> },
  ];

  const { logout: handleContextLogout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = (affiliate = false) => {
    if (affiliate) {
      navigate("/affiliate-signup");
    } else {
      navigate("/register");
    }
  };

  const handleOpenProfileOption = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    // Clear localStorage data
    handleContextLogout();

    // Show success message
    showToaster("Logged out successfully", "success");
  };

  const handleCopyName = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000); // 1 second
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleUserProfileClick = (url) => {
    navigate(url);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    if (isProfileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileOpen]);

  const LinkItem = ({ s }) => (
    <Link key={s?.id} to={s?.link} className="flex items-center flex-col">
      <p
        className={`${
          location?.pathname === s?.link ? "text-yellow-300" : "text-green-300"
        } ${s?.id === 7 ? "text-[18px] mb-[3px]" : "text-[20px]"}`}
      >
        {s?.image}
      </p>
      <p
        className={`text-[10px] mt-[-2px] ${
          location?.pathname === s?.link ? "text-yellow-300" : "text-green-300"
        } font-normal`}
      >
        {s?.name}
      </p>
    </Link>
  );

  const ButtonItem = ({ s, fn }) => (
    <div key={s?.id} onClick={fn} className="flex items-center flex-col">
      <p
        className={`${
          location?.pathname === s?.link ? "text-yellow-300" : "text-green-300"
        } ${s?.id === 7 ? "text-[17px] mb-[2px]" : "text-[20px]"}`}
      >
        {s?.image}
      </p>
      <p
        className={`text-[10px] mt-[-2px] ${
          location?.pathname === s?.link ? "text-yellow-300" : "text-green-300"
        } font-normal`}
      >
        {s?.name}
      </p>
    </div>
  );

  return (
    <>
      {/* Bottom Navigation */}
      <div className="md:hidden flex fixed bottom-3 w-full z-[999999]">
        <div className="w-[90%] bg-[#00623b] mx-auto rounded-full footer-menu-mobile">
          <div className="w-full flex items-center justify-between gap-2 pt-[4px] pb-[2px] px-4">
            {sidebarLinks?.map((s) => {
              if (s?.id === 7 && !user) {
                return null;
              } else if (
                (s?.name === "Invite" || s?.name === "Deposit") &&
                !user
              ) {
                return <ButtonItem key={s.id} fn={handleLoginClick} s={s} />;
              } else if (s?.name === "Profile" && user) {
                return (
                  <ButtonItem key={s.id} fn={handleOpenProfileOption} s={s} />
                );
              } else {
                return <LinkItem key={s.id} s={s} />;
              }
            })}
          </div>
        </div>
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onSignUpClick={handleRegisterClick}
        />
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "150%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 bg-[#111] pt-[50px] overflow-y-auto min-h-[100vh] z-[99999] flex justify-center items-end"
          >
            <motion.div
              className=" w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex fixed top-0 items-center justify-between w-full px-4 py-2 z-[10] bg-[#111] border-b border-[#ffffff17]">
                <p className="text-[18px] font-semibold">Profile</p>
                <div
                  className="text-white cursor-pointer text-[24px]"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <IoMdClose />
                </div>
              </div>

              {/* Inner Content — Replace with your own */}
              {user && (
                <div className="">
                  <MobileProfile
                    user={user}
                    profileNavOption={profileNavOption}
                    handleUserProfileClick={handleUserProfileClick}
                    handleLogout={handleLogout}
                    handleCopyName={handleCopyName}
                    profilePic={profilePic}
                    formatDate={formatDate}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {showAlert && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 light-bg w-full max-w-[70%] left-[15%] -translate-x-[15%] transform text-white/80 text-[14px] font-medium py-2 px-4 rounded-full shadow-lg z-[99999]"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
