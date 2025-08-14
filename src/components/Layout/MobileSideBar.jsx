import React from "react";
import sports from "../../assets/gameType/icon-sport.png";
import Casino from "../../assets/gameType/icon-casino.png";
import Slots from "../../assets/gameType/icon-slot.png";
import Table from "../../assets/gameType/icon-table.png";
import Crash from "../../assets/gameType/icon-crash.png";
import Lottery from "../../assets/gameType/icon-lottery.png";
import Fishing from "../../assets/gameType/icon-fish.png";
import Arcade from "../../assets/gameType/icon-arcade.png";
import CockFighting from "../../assets/gameType/icon-cockfighting.png";
import { TbTargetArrow, TbUserShare } from "react-icons/tb";
import { IoIosAddCircle, IoMdGift } from "react-icons/io";
import { RiPoliceBadgeLine, RiVipDiamondLine } from "react-icons/ri";

const MobileSideBar = () => {
  const gameCategories = [
    { id: 1, name: "Sports", image: sports },
    { id: 2, name: "Casino", image: Casino },
    { id: 3, name: "Slot", image: Slots },
    { id: 4, name: "Table", image: Table },
    { id: 5, name: "Crash", image: Crash },
    { id: 6, name: "Lottery", image: Lottery },
    { id: 7, name: "Fishing", image: Fishing },
    { id: 8, name: "Arcade", image: Arcade },
    { id: 9, name: "Cock Fighting", image: CockFighting },
  ];

  const sidebarLinks = [
    { id: 1, name: "Invite Friends", link: "", image: <TbUserShare /> },
    { id: 2, name: "Promotion", link: "", image: <IoMdGift /> },
    { id: 3, name: "Reward Center", link: "", image: <RiPoliceBadgeLine /> },
    { id: 4, name: "VIP", link: "", image: <RiVipDiamondLine /> },
    { id: 6, name: "Deposit", link: "", image: <IoIosAddCircle /> },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-1">
        {gameCategories?.map((g) => (
          <div
            key={g?.id}
            className="bg-[#1a1a2ef2] flex flex-col rounded-md pt-3 p-2 items-center justify-center"
          >
            <img src={g?.image} alt={g?.name} className="w-[25px]" />
            <p className="text-[10px] font-normal">{g?.name}</p>
          </div>
        ))}
        {sidebarLinks?.map((g) => (
          <div
            key={g?.id}
            className="bg-[#1a1a2ef2] flex flex-col rounded-md pt-3 p-2 items-center justify-center"
          >
            <div className="bg-yellow-300 text-black w-[25px] text-[18px] flex items-center justify-center h-[25px] rounded-full">
              {g?.image}
            </div>
            <p className="text-[10px] font-normal">{g?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSideBar;
