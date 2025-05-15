import { useState } from "react";
import sports from "../../assets/gameType/icon-sport.png";
import Casino from "../../assets/gameType/icon-casino.png";
import Slots from "../../assets/gameType/icon-slot.png";
import Table from "../../assets/gameType/icon-table.png";
import Crash from "../../assets/gameType/icon-crash.png";
import Lottery from "../../assets/gameType/icon-lottery.png";
import Fishing from "../../assets/gameType/icon-fish.png";
import Arcade from "../../assets/gameType/icon-arcade.png";
import CockFighting from "../../assets/gameType/icon-cockfighting.png";
import "./GameTypes.scss";

// Define game category types
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

// Define the game data structure
interface GameItem {
  key: string;
  name: string;
  vendorCode: string;
  gameType: number;
  extraData?: string;
  imageSrc: string;
  imageAlt: string;
}

// Games data by category
const gamesByCategory: Record<number, GameItem[]> = {
  // Sports games
  1: [
    {
      key: "exchange",
      name: "Exchange",
      vendorCode: "CRICKET",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-exchange",
    },
    {
      key: "sportsbook",
      name: "Sportsbook",
      vendorCode: "Saba",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sportbook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sportbook",
    },
    {
      key: "sbov2",
      name: "SBO",
      vendorCode: "SBOv2",
      gameType: 4,
      extraData: "football",
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-sbov2.png?v=1746501399063&source=mcdsrc",
      imageAlt: "provider-sbov2",
    },
    {
      key: "horsebook",
      name: "Horsebook",
      vendorCode: "AWCMHORSEBOOK",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-horsebook",
    },
    {
      key: "bti",
      name: "BTi",
      vendorCode: "SBTech",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sbtech",
    },
    {
      key: "cmd",
      name: "CMD",
      vendorCode: "CMD",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-cmd",
    },
    {
      key: "rwb",
      name: "RWB",
      vendorCode: "AWCMRWB",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmrwb",
    },
    {
      key: "insports",
      name: "iNsports",
      vendorCode: "NST",
      gameType: 32,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-nst",
    },
    {
      key: "pinnacle",
      name: "Pinnacle",
      vendorCode: "AWCMPINNACLE",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmpinnacle",
    },
  ],
  // Casino games (using the same sports games as placeholder - replace with actual casino games)
  2: [
    {
      key: "evolution",
      name: "Evolution",
      vendorCode: "EVOLUTION",
      gameType: 2,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/casino-icon/icon-evolution.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-evolution",
    },
    // Add more casino games
  ],
  // Add placeholder data for other game types (3-8)
  3: [
    {
      key: "exchange",
      name: "Exchange",
      vendorCode: "CRICKET",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-exchange",
    },
    {
      key: "sportsbook",
      name: "Sportsbook",
      vendorCode: "Saba",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sportbook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sportbook",
    },
    {
      key: "sbov2",
      name: "SBO",
      vendorCode: "SBOv2",
      gameType: 4,
      extraData: "football",
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-sbov2.png?v=1746501399063&source=mcdsrc",
      imageAlt: "provider-sbov2",
    },
    {
      key: "horsebook",
      name: "Horsebook",
      vendorCode: "AWCMHORSEBOOK",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-horsebook",
    },
    {
      key: "bti",
      name: "BTi",
      vendorCode: "SBTech",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sbtech",
    },
    {
      key: "cmd",
      name: "CMD",
      vendorCode: "CMD",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-cmd",
    },
    {
      key: "rwb",
      name: "RWB",
      vendorCode: "AWCMRWB",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmrwb",
    },
    {
      key: "insports",
      name: "iNsports",
      vendorCode: "NST",
      gameType: 32,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-nst",
    },
    {
      key: "pinnacle",
      name: "Pinnacle",
      vendorCode: "AWCMPINNACLE",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmpinnacle",
    },
  ],
  4: [],
  5: [
    {
      key: "exchange",
      name: "Exchange",
      vendorCode: "CRICKET",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-exchange",
    },
    {
      key: "sportsbook",
      name: "Sportsbook",
      vendorCode: "Saba",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sportbook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sportbook",
    },
    {
      key: "sbov2",
      name: "SBO",
      vendorCode: "SBOv2",
      gameType: 4,
      extraData: "football",
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-sbov2.png?v=1746501399063&source=mcdsrc",
      imageAlt: "provider-sbov2",
    },
    {
      key: "horsebook",
      name: "Horsebook",
      vendorCode: "AWCMHORSEBOOK",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-horsebook",
    },
    {
      key: "bti",
      name: "BTi",
      vendorCode: "SBTech",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sbtech",
    },
    {
      key: "cmd",
      name: "CMD",
      vendorCode: "CMD",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-cmd",
    },
    {
      key: "rwb",
      name: "RWB",
      vendorCode: "AWCMRWB",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmrwb",
    },
    {
      key: "insports",
      name: "iNsports",
      vendorCode: "NST",
      gameType: 32,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-nst",
    },
    {
      key: "pinnacle",
      name: "Pinnacle",
      vendorCode: "AWCMPINNACLE",
      gameType: 4,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-awcmpinnacle",
    },
  ],
  6: [],
  7: [],
  8: [
    {
      key: "sv388",
      name: "SV388",
      vendorCode: "SV388",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-sv388.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sv388",
    },
    {
      key: "s128",
      name: "S128",
      vendorCode: "S128",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-s128.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-s128",
    },
    {
      key: "wm-cockfight",
      name: "WM Cockfight",
      vendorCode: "WMCOCKFIGHT",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-wmcockfight.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-wmcockfight",
    },
    {
      key: "bti-cockfight",
      name: "BTi Cockfight",
      vendorCode: "BTICOCKFIGHT",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-bticockfight.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-bticockfight",
    },
  ],
  // Cock Fighting games
  9: [
    {
      key: "sv388",
      name: "SV388",
      vendorCode: "SV388",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-sv388.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-sv388",
    },
    {
      key: "s128",
      name: "S128",
      vendorCode: "S128",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-s128.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-s128",
    },
    {
      key: "wm-cockfight",
      name: "WM Cockfight",
      vendorCode: "WMCOCKFIGHT",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-wmcockfight.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-wmcockfight",
    },
    {
      key: "bti-cockfight",
      name: "BTi Cockfight",
      vendorCode: "BTICOCKFIGHT",
      gameType: 9,
      imageSrc:
        "https://img.m167cw.com/mcw/h5/assets/images/icon-set/cockfight-icon/icon-bticockfight.png?v=1746501399063&source=mcdsrc",
      imageAlt: "icon-bticockfight",
    },
  ],
};

export const GameTypes = () => {
  const [selected, setSelected] = useState<number | null>(1);
  const [animate, setAnimate] = useState(false);

  const handleSelect = (id: number) => {
    if (selected !== id) {
      setAnimate(false);
      setTimeout(() => {
        setSelected(id);
        setAnimate(true);
      }, 10);
    }
  };

  // Function to ensure 4 items per row
  const getGridItems = (items: GameItem[]) => {
    const itemsPerRow = 4;
    const totalItems = items.length;
    const rows = Math.ceil(totalItems / itemsPerRow);
    const totalSlots = rows * itemsPerRow;
    const emptySlots = totalSlots - totalItems;

    // Generate game items
    const gameItems = items.map((game) => (
      <li
        key={game.key}
        className="ng-star-inserted"
        data-web-category-type="GAME"
        data-game-type={game.gameType}
        data-vendor-code={game.vendorCode}
        {...(game.extraData ? { "data-extra-data": game.extraData } : {})}
      >
        <a>
          <img loading="lazy" alt={game.imageAlt} src={game.imageSrc} />
          <p>{game.name}</p>
        </a>
      </li>
    ));

    // Add empty slots if needed
    const emptyItems = Array(emptySlots)
      .fill(null)
      .map((_, index) => <li key={`empty-${index}`}></li>);

    return [...gameItems, ...emptyItems];
  };

  return (
    <div className="game-types-container">
      <div className="game-types-selector">
        {gameCategories.map((item) => (
          <div
            key={item?.id}
            className={`gametype-box ${selected === item?.id ? "active" : ""}`}
            onClick={() => handleSelect(item.id)}
          >
            <img src={item?.image} alt={item?.name} className="game-icon" />
            <span className="game-name">{item?.name}</span>
          </div>
        ))}
      </div>

      <div className="content-title">
        <h2>{gameCategories.find((g) => g.id === selected)?.name || ""}</h2>
      </div>

      <ul className={`game-types-list ${animate ? "slide-in" : ""}`}>
        {getGridItems(gamesByCategory[selected!] || [])}
      </ul>
    </div>
  );
};
