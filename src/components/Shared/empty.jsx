import React from 'react';

export const NotFound = ({
  message = "No games found for this provider."
}) => {
  return (
    <div className="header-auth !mb-[10px]  max-w-[1200px] mx-auto">
      <p className="signup-btn-green w-full max-w-[1200px] mx-auto !py-3 pointer-events-none select-none !text-[14px] !font-semibold !shadow-none hover:!shadow-none">{message}
        </p>
        </div>
  );
};
 export const ThemeGreen = ({ children }) => {
  return (
    <div className="header-auth !mb-[10px] max-w-[1200px] mx-auto">
      <div className="signup-btn-green w-full !py-[10px] px-4 pointer-events-none select-none !text-[14px] !font-semibold !shadow-none hover:!shadow-none">
        {children}
      </div>
    </div>
  );
};

export const ThemeRed = ({ children }) => {
  return (
    <div className="header-auth !mb-[10px]  max-w-[1200px] mx-auto">
      <p className="custom-error-btn w-full py-[5px] sm:!py-[10px] px-[5px] sm:!px-4 pointer-events-none select-none !text-[14px] !font-medium !shadow-none hover:!shadow-none">
        {children}
      </p>
    </div>
  );
};

export const ThemeDefault = ({ children }) => {
  return (
    <div className="header-auth mb-5 container">
      <p className="signup-btn-red w-full !py-[10px] px-4 pointer-events-none select-none !text-[14px] !font-semibold !shadow-none hover:!shadow-none">
        {children}
      </p>
    </div>
  );
};

