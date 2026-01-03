// SmallProviderCard.jsx
import React from 'react';

const SmallProviderCard = ({ provider,isDynamic=false, type, navigate, onClick, className = '', version }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (navigate) {
      navigate(`/provider/${provider?.id}?type=${type}&providerName=${provider?.name}`);
    }
  };
const getSignupButtonClass = (version) => {
  const classes = {
    1: "signup-btn",
    2: "signup-btn-dynamic",
    3: "signup-btn-green",
  };
  return classes[version] || "signup-btn";
};

  return (
    <div className={`pr-2 md:pr-3 header-auth !py-[4px] !shadow-none hover:!shadow-none ${className}`}>
      <div
        onClick={handleClick}
        className={`group flex items-center justify-center cursor-pointer gap-1  rounded-md ${getSignupButtonClass(version)} ${isDynamic ?"!px-[6px] !py-1" : "!px-[4px] !py-[15px] sm:!px-[6px] sm:!py-[18px]"} !shadow-none hover:!shadow-none `}
      >
        {/* Image Wrapper */}
        <div className="w-[25px] h-[25px] sm:w-[27px] sm:h-[27px] min-w-fit rounded-full bg-black overflow-hidden flex items-center justify-center p-[1px]">
          <img
            loading="lazy"
            src={provider?.logo}
            alt={provider?.name}
            className="w-full h-full object-cover rounded-full transition-transform duration-300 ease-out group-hover:scale-125"
          />
        </div>

        {/* Text */}
        <p className="text-black md:leading-3 text-[13px] md:text-[14px] font-semibold truncate max-w-fit whitespace-nowrap overflow-hidden">
          {provider?.name}
        </p>
      </div>
    </div>
  );
};

export default SmallProviderCard;