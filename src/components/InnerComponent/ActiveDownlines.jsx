import React from "react";

const ActiveDownlines = () => {
  return (
    <div className="second-bg">
      <h1 className="text-[18px] text-left mb-2">Active downlines</h1>

      <div className="light-bg p-5 pt-3 rounded-md">
        <h1 className="text-[40px] text-yellow-400 font-semibold">0</h1>
        <p className="text-white text-opacity-40 mt-1">
          Cumulative deposit requirement
        </p>
      </div>
      <div className="light-bg p-5 pt-3 rounded-md mt-2">
        <h1 className="text-[40px] text-yellow-400 font-semibold">0</h1>
        <p className="text-white text-opacity-40 mt-1">
          Cumulative turnover requirement
        </p>
      </div>
      <p className="text-white text-opacity-40 mt-4">
        Daily, weekly, monthly referral requirements
      </p>
    </div>
  );
};

export default ActiveDownlines;
