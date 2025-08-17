import React from "react";

const GameCardComponent = ({ gameDetails }) => {
  const handlePlayGame = (game) => {
    const { gameUrl, apiKey, licenseKey, secretPin } = game;
    const generatedUrl = `${gameUrl}?apiKey=${apiKey}&licenseKey=${licenseKey}&secretPin=${secretPin}`;
    window.open(generatedUrl, "_blank");
  };
  return (
    <div
      onClick={() => handlePlayGame(gameDetails)}
      className="game-card w-[120px] h-[160px] md:w-[140px] md:h-[185px]"
    >
      <img src={gameDetails?.gameLogo || ""} alt="" className="w-full h-full" />
    </div>
  );
};

export default GameCardComponent;
