import React from "react";
import "./GameCard.scss";

interface GameCardProps {
  id: number;
  name: string;
  status: string;
  logo: string;
  isFavorite: boolean;
  gameLogo: string;
  gameUrl: string;
  sportLogo: string;
  ggrPercent: string;
  categoryInfo: string;
  providerInfo: {
    id: number;
    name: string;
    logo: string;
    status: string;
    country: string;
  };
  onPlayClick: (gameId: number) => void;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  // name,
  status,
  // isFavorite,
  gameLogo,
  sportLogo,
  logo,
  // ggrPercent,
  // categoryInfo,
  // providerInfo,
  onPlayClick,
  className = "",
}) => {
  // Parse category and provider info from JSON strings
  // const getCategoryInfo = () => {
  //   try {
  //     const parsed = JSON.parse(categoryInfo);
  //     return parsed.category || "Unknown";
  //   } catch {
  //     return "Unknown";
  //   }
  // };

  // const getProviderName = () => {
  //   try {
  //     return providerInfo?.name || "Unknown Provider";
  //   } catch {
  //     return providerInfo?.name || "Unknown Provider";
  //   }
  // };

  const handlePlayClick = () => {
    // e.stopPropagation();
    console.log("click me");
    onPlayClick(id);
  };

  console.log(gameLogo, sportLogo);
  return (
    <div
      className={`game-card ${className} cursor-pointer  w-[120px] h-[160px] md:w-[140px] md:h-[185px]`}
      onClick={handlePlayClick}
    >
      <img
        src={gameLogo ? gameLogo : sportLogo ? sportLogo : logo}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute game-card-image top-0 left-0 flex items-center justify-center">
        <div className="game-card-overlay">
          <button
            className="play-now-btn"
            onClick={handlePlayClick}
            disabled={status !== "active"}
          >
            {status === "active" ? "PLAY NOW" : "UNAVAILABLE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
