import React from "react";
import { BsBank } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { TbReceiptBitcoin } from "react-icons/tb";
import { PiWalletBold } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";

const DepositPage = () => {
  const navigate = useNavigate();

  return (
    <div className="!max-w-[650px] mx-auto px-4 py-8">
      <h1 className="text-[22px] flex items-center font-bold ">
        <button
          onClick={() => navigate(-1)}
          className=" font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
        >
          <IoIosArrowBack />
        </button>
        Deposit
      </h1>

      <div className="flex flex-col gap-2 mt-8">
        <Link
          to={"/deposit/local-bank"}
          className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 rounded-md text-white text-[18px] font-semibold flex items-center w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <BsBank size={20} />
            Local Bank
          </span>
          <span className="flex items-center gap-3 text-[24px]">
            <small className="text-yellow-400 text-[14px] font-medium">
              Up to 100%
            </small>
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          to={"/deposit/e-wallet"}
          className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 text-white rounded-md text-[18px] font-semibold flex items-center w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <PiWalletBold size={22} />
            E-Wallet
          </span>
          <span className="flex items-center gap-3 text-[24px]">
            <small className="text-yellow-400 text-[14px] font-medium">
              Up to 100%
            </small>
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          to={"/deposit/crypto"}
          className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 text-white rounded-md text-[18px] font-semibold flex items-center w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <TbReceiptBitcoin size={24} />
            Crypto
          </span>
          <span className="flex items-center gap-3 text-[24px]">
            <small className="text-yellow-400 text-[14px] font-medium">
              Up to 100%
            </small>
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          to={"/deposit/international-pay"}
          className="second-bg border border-[#1a1a1a] hover:border-yellow-400 hover:text-yellow-400 cursor-pointer transition px-5 py-4 pr-3 text-white rounded-md text-[18px] font-semibold flex items-center w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <AiOutlineGlobal size={24} />
            International Pay
          </span>
          <span className="flex items-center gap-3 text-[24px]">
            <small className="text-yellow-400 text-[14px] font-medium">
              Up to 100%
            </small>
            <IoIosArrowForward />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DepositPage;
