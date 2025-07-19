import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuCopy } from "react-icons/lu";
import formatDate from "../lib/utils/formatDate";
import { LuBadgeCheck } from "react-icons/lu";
import { CgCloseO } from "react-icons/cg";
import handleCopy from "../lib/utils/handleCopy";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";

const LoginSecurity = () => {
  const { logout: handleContextLogout } = useAuth();
  const [user, setUser] = useState(null);
  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();

  const pageList = [
    {
      id: 1,
      name: "Personal Info",
      link: "/profile/personal-information",
    },
    {
      id: 2,
      name: "Login & Security",
      link: "/profile/login-security",
    },
  ];

  //   const user = {
  //     username: "hkitltd",
  //     fullName: "Hasan Khan",
  //     dateOfBirth: "1995-03-21",
  //     phone: "+880123456789",
  //     email: "hasan@example.com",
  //   };

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
        handleContextLogout();
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }, []);

  return (
    <div className="common-container min-h-[65vh]">
      <h1 className="text-left text-[22px] font-semibold py-5 mt-10">
        My Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 items-start">
        {/* Sidebar */}
        <div className="col-span-full md:col-span-1 lg:col-span-2 overflow-hidden text-left border light-border rounded-md">
          {pageList?.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => navigate(p.link)}
              className={`${
                idx === pageList.length - 1 ? "" : "border-b"
              } py-3 px-5 text-[18px] hover:opacity-70 border-white border-opacity-15 cursor-pointer hover:bg-opacity-80 ${
                location.pathname === p.link ? "light-bg" : ""
              }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Personal Info */}
        <div className="col-span-full md:col-span-2 lg:col-span-4 text-left border light-border rounded-md">
          <h3 className="text-white text-[20px] p-4 font-bold">
            Login & Security
          </h3>

          <div className="">
            <div
              onClick={() =>
                navigate("/profile/login-security/change-password")
              }
              className="flex justify-between items-center hover:bg-[#1a1a1a] cursor-pointer p-4"
            >
              <p className="text-white text-[16px] font-medium">Password</p>
              <div className="text-right text-gray-300 flex items-center gap-2">
                Manage
                <span className="rotate-180 text-[20px] mr-[-6px] block">
                  <IoIosArrowBack />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSecurity;
