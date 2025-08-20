import React from "react";
import { Link } from "react-router-dom";

const BalanceModal = ({
  bdtBalance,
  onClose,
  dollarBalance,
  dollarIcon,
  takaIcon,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="border border-yellow-300 text-white rounded-md px-2 py-2 font-medium text-[14px] flex items-center gap-1">
          <img src={dollarIcon} alt="Dollar Icon" className="w-[22px]" />
          <p>{dollarBalance} USD</p>
        </div>
        <div className="border border-yellow-300 text-white rounded-md px-2 py-2 font-medium text-[14px] flex items-center gap-1">
          <img src={takaIcon} alt="Taka Icon" className="w-[22px]" />
          <p>{bdtBalance} BDT</p>
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        <Link
          onClick={onClose}
          to={"/deposit"}
          className="text-[#121212] !font-semibold rounded-md text-[14px] w-full px-5 py-[8px] hover:text-[#121212] bg-yellow-300 hover:bg-yellow-400"
        >
          Deposit
        </Link>
        <Link
          onClick={onClose}
          to={"/withdraw"}
          className="text-[#121212] !font-semibold rounded-md text-[14px] w-full px-5 py-[8px] hover:text-[#121212] bg-yellow-300 hover:bg-yellow-400"
        >
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default BalanceModal;
