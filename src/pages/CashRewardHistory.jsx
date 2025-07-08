import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const fakeData = [
  { turnover: "Referral Bonus - Level 1", amount: 120, status: "Claimed" },
  { turnover: "Signup Reward", amount: 80, status: "Claimed" },
  { turnover: "Referral Bonus - Level 2", amount: 90, status: "Unclaimed" },
  { turnover: "Monthly Cashback", amount: 150, status: "Claimed" },
  { turnover: "Special Event Bonus", amount: 200, status: "Unclaimed" },
];

const CashRewardHistory = () => {
  const navigate = useNavigate();

  const totalAmount = fakeData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="referral-container max-w-6xl mx-auto py-5 px-5">
      <h1 className="text-[22px] flex items-center font-bold">
        <button
          onClick={() => navigate("/profile/referral-details")}
          className="font-bold px-4 text-[25px] mr-2 hover:text-yellow-400"
        >
          <IoIosArrowBack />
        </button>
        Cash reward history
      </h1>

      <div className="my-4">
        <div className="flex gap-2 w-full md:flex-row flex-col">
          <div className="second-bg p-4 text-left rounded-md w-full">
            <p className="opacity-60 mb-1">Total Claimed</p>
            <h1 className="text-[20px] font-semibold text-yellow-400">
              {fakeData
                .filter((item) => item.status === "Claimed")
                .reduce((sum, item) => sum + item.amount, 0)}
            </h1>
          </div>
          <div className="second-bg p-4 text-left rounded-md w-full">
            <p className="opacity-60 mb-1">Unclaimed</p>
            <h1 className="text-[20px] font-semibold text-yellow-400">
              {fakeData
                .filter((item) => item.status === "Unclaimed")
                .reduce((sum, item) => sum + item.amount, 0)}
            </h1>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm text-white">
          <thead className="light-bg">
            <tr>
              <th className="text-left px-4 py-2">Turnover</th>
              <th className="text-center px-4 py-2">Amount</th>
              <th className="text-right px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {fakeData.map((row, idx) => (
              <tr key={idx} className="border-b second-bg">
                <td className="px-4 py-2 text-left">{row.turnover}</td>
                <td className="px-4 py-2 text-center text-yellow-300">
                  ${row.amount}
                </td>
                <td className="px-4 py-2 text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status === "Claimed"
                        ? "bg-green-500 text-white font-medium"
                        : "bg-yellow-500 text-black font-medium"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="light-bg font-bold">
              <td className="px-4 py-2 text-left text-yellow-400">Total</td>
              <td className="px-4 py-2 text-center text-yellow-400">
                ${totalAmount}
              </td>
              <td className="px-4 py-2 text-right text-yellow-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashRewardHistory;
