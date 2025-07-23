import React from "react";
import UserProfileButton from "./UserProfileButton";
import { LuCopy } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

interface UserProfile {
  fullname?: string;
  username?: string;
  created_at?: string;
  // Add more fields as needed
}

interface UserProfileDropdownProps {
  user: UserProfile;
  profileNavOption: Array<{ name: string; icon: React.ReactNode; url: string }>;
  handleUserProfileClick: (url: string) => void;
  handleLogout: () => void;
  handleCopyName: (text: string) => void;
  profilePic: string;
  formatDate: (date: string) => string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  profileNavOption,
  handleUserProfileClick,
  handleLogout,
  handleCopyName,
  profilePic,
  formatDate,
}) => {
  return (
    <div className="user-section relative group">
      <UserProfileButton
        className="user-profile-btn signup-btn !light-bg !px-2 !pr-3"
        title="View Profile"
      >
        <span className="user-avatar">👤</span>
        <span className="username">Profile</span>
      </UserProfileButton>
      <div className="profile-dropdown shadow-2xl absolute right-0 mt-0 pt-2 w-[330px] md:w-[400px] hidden group-hover:block z-[9999999]">
        <div className="second-bg text-left  rounded-lg profile-shadow">
          <div className="border-b px-4 py-3 light-border">
            <div className=" flex gap-2 items-start">
              <img src={profilePic} className="w-[40px] h-[40px] mt-1" />
              <div className="w-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="pr-2">
                    <span className="opacity-60 text-[14px]">
                      Full legal name
                    </span>
                    <p
                      onClick={() => handleCopyName(user.fullname || "Player")}
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
                    <span className="opacity-60 text-[14px]">Username</span>
                    <p
                      onClick={() => handleCopyName(user.username || "Player")}
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
                  Sign up date : {formatDate(user?.created_at || "")}
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
  );
};

export default UserProfileDropdown;
