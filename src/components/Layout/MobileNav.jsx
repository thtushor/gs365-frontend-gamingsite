import React, { useState } from "react";
import { BiGift, BiHome, BiShareAlt } from "react-icons/bi";
import { IoIosAddCircle, IoMdGift } from "react-icons/io";
import { RiPoliceBadgeLine, RiVipDiamondLine } from "react-icons/ri";
import { TbUserShare } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginPopup from "../Auth/LoginPopup";
import { useAuth } from "../../contexts/auth-context";

const MobileNav = () => {
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
  ];

  const { logout: handleContextLogout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
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

  const LinkItem = ({ s }) => {
    return (
      <Link key={s?.id} to={s?.link} className="flex items-center flex-col">
        <p
          className={`${
            location?.pathname === s?.link
              ? "text-yellow-300"
              : "text-green-300"
          } text-[20px]`}
        >
          {s?.image}
        </p>
        <p
          className={`text-[10px]  mt-[-2px] ${
            location?.pathname === s?.link
              ? "text-yellow-300"
              : "text-green-300"
          } font-normal`}
        >
          {s?.name}
        </p>
      </Link>
    );
  };
  const ButtonItem = ({ s, fn }) => {
    return (
      <div key={s?.id} onClick={fn} className="flex items-center flex-col">
        <p
          className={`${
            location?.pathname === s?.link
              ? "text-yellow-300"
              : "text-green-300"
          } text-[20px] `}
        >
          {s?.image}
        </p>
        <p
          className={`text-[10px] mt-[-2px] ${
            location?.pathname === s?.link
              ? "text-yellow-300"
              : "text-green-300"
          } font-normal`}
        >
          {s?.name}
        </p>
      </div>
    );
  };
  return (
    <div className="md:hidden flex fixed bottom-2 w-full z-[99999]">
      <div className="w-[90%] bg-[#00623b] mx-auto rounded-full footer-menu-mobile">
        <div className="w-full flex items-center justify-between gap-2 py-1 px-4">
          {sidebarLinks?.map((s) =>
            (s?.name === "Invite" || s?.name === "Deposit") && !user ? (
              <ButtonItem fn={handleLoginClick} s={s} />
            ) : (
              <LinkItem s={s} />
            )
          )}
        </div>
      </div>
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onSignUpClick={handleRegisterClick}
      />
    </div>
  );
};

export default MobileNav;
