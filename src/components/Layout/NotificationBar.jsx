import React, { useState, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Placeholder from "../../assets/placeholder.svg";

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    {
      title: "Order Update",
      description: "Your order has been shipped",
      image: Placeholder,
      isClaimable: false,
      isLinkable: true,
      isStatic: false,
    },
    {
      title: "New Friend Request",
      description: "John Doe sent you a friend request",
      image: Placeholder,
      isClaimable: true,
      isLinkable: false,
      isStatic: false,
    },
    {
      title: "Payment Success",
      description: "Payment received successfully",
      image: Placeholder,
      isClaimable: false,
      isLinkable: false,
      isStatic: true,
    },
    {
      title: "Weekly Report",
      description: "Your weekly summary is ready",
      image: Placeholder,
      isClaimable: false,
      isLinkable: true,
      isStatic: false,
    },
  ];

  // Outside click check
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Overlay click catcher */}
      {isOpen && (
        <div className="fixed inset-0 z-[998]" onClick={handleClickOutside} />
      )}

      {/* Bell Icon */}
      <div
        className="relative text-yellow-500 cursor-pointer z-[999]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoNotificationsOutline size={27} />
        <div className="w-[11px] h-[11px] top-[1px] right-[2px] border-black border-2 bg-yellow-500 absolute rounded-full" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute text-left right-0 mt-[2px] w-80 max-w-[90vw] second-bg profile-shadow shadow-lg rounded-lg overflow-hidden z-[999]"
        >
          {/* Header */}
          <div className="p-4 pr-2 py-0 flex items-center justify-between border-b border-white/10 mt-3 pb-3 font-semibold text-white text-[14px]">
            Notifications
            <IoIosCloseCircleOutline
              size={25}
              className="text-yellow-500 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Notification List */}
          <ul className="h-[300px] overflow-y-auto">
            {notifications?.length > 0 ? (
              notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 border-b border-white/10 flex gap-2 relative text-sm hover:bg-yellow-500/10 cursor-pointer"
                >
                  {/* Image with fallback */}
                  <img
                    src={note?.image || Placeholder}
                    className="w-[35px] h-[35px] rounded-full border-2 border-yellow-500"
                    alt={note?.title || "Notification"}
                  />

                  {/* Content */}
                  <div>
                    <h1 className="text-[14px] text-white font-medium">
                      {note?.title || "Untitled"}
                    </h1>
                    <p className="text-[12px] text-gray-300 truncate max-w-44">
                      {note?.description || "No description available"}
                      <span className="block absolute bottom-3 text-[10px] right-[10px] text-yellow-300">
                        (29 days ago)
                      </span>
                      <div className="w-[8px] h-[8px] bg-yellow-300 rounded-full absolute top-3 right-4" />
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
