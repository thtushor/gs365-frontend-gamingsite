import React, { useState } from "react";
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

const gametypes = [
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

const listOfGame = [
  <li
    key="exchange"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="CRICKET"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-exchange"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1746501399063&source=mcdsrc"
      />
      <p>Exchange</p>
    </a>
  </li>,
  <li
    key="sportsbook"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="Saba"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-sportbook"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sportbook.png?v=1746501399063&source=mcdsrc"
      />
      <p>Sportsbook</p>
    </a>
  </li>,
  <li
    key="sbov2"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="SBOv2"
    data-extra-data="football"
  >
    <a>
      <img
        loading="lazy"
        alt="provider-sbov2"
        src="https://img.m167cw.com/mcw/h5/assets/images/brand/white/provider-sbov2.png?v=1746501399063&source=mcdsrc"
      />
      <p>SBO</p>
    </a>
  </li>,
  <li
    key="horsebook"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="AWCMHORSEBOOK"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-horsebook"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1746501399063&source=mcdsrc"
      />
      <p>Horsebook</p>
    </a>
  </li>,
  <li
    key="bti"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="SBTech"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-sbtech"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1746501399063&source=mcdsrc"
      />
      <p>BTi</p>
    </a>
  </li>,
  <li
    key="cmd"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="CMD"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-cmd"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1746501399063&source=mcdsrc"
      />
      <p>CMD</p>
    </a>
  </li>,
  <li
    key="rwb"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="AWCMRWB"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-awcmrwb"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1746501399063&source=mcdsrc"
      />
      <p>RWB</p>
    </a>
  </li>,
  <li
    key="insports"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="32"
    data-vendor-code="NST"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-nst"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1746501399063&source=mcdsrc"
      />
      <p>iNsports</p>
    </a>
  </li>,
  <li
    key="pinnacle"
    className="ng-star-inserted"
    data-web-category-type="GAME"
    data-game-type="4"
    data-vendor-code="AWCMPINNACLE"
  >
    <a>
      <img
        loading="lazy"
        alt="icon-awcmpinnacle"
        src="https://img.m167cw.com/mcw/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1746501399063&source=mcdsrc"
      />
      <p>Pinnacle</p>
    </a>
  </li>,
];

const gameTypeContent: { [key: number]: JSX.Element[] } = {
  1: listOfGame,
  2: listOfGame,
  3: listOfGame,
  4: listOfGame,
  5: listOfGame,
  6: listOfGame,
  7: listOfGame,
  8: listOfGame,
  9: listOfGame,
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
  const getGridItems = (items: JSX.Element[]) => {
    const itemsPerRow = 4;
    const totalItems = items.length;
    const rows = Math.ceil(totalItems / itemsPerRow);
    const totalSlots = rows * itemsPerRow;
    const emptySlots = totalSlots - totalItems;

    console.log({ itemsPerRow, totalItems, rows, totalSlots, emptySlots });

    return [
      ...items,
      ...Array(emptySlots).fill(<li key={`empty-${Math.random()}`}></li>),
    ];
  };

  return (
    <div className="game-types-container">
      <div className="game-types-selector">
        {gametypes.map((item) => (
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
        <h2>{gametypes.find((g) => g.id === selected)?.name || ""}</h2>
      </div>

      <ul className={`game-types-list ${animate ? "slide-in" : ""}`}>
        {getGridItems(gameTypeContent[selected!] || [])}
      </ul>
    </div>
  );
};
