import React from "react";
import "./GameCard.scss";
import { Logo } from "../Logo/Logo";

interface GameCardProps {
  id: number;
  name: string;
  status: string;
  isFavorite: boolean;
  gameLogo: string;
  gameUrl: string;
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
  name,
  status,
  isFavorite,
  gameLogo,
  ggrPercent,
  categoryInfo,
  providerInfo,
  onPlayClick,
  className = "",
}) => {
  // Parse category and provider info from JSON strings
  const getCategoryInfo = () => {
    try {
      const parsed = JSON.parse(categoryInfo);
      return parsed.category || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const getProviderName = () => {
    try {
      return providerInfo?.name || "Unknown Provider";
    } catch {
      return providerInfo?.name || "Unknown Provider";
    }
  };

  const handlePlayClick = () => {
    // e.stopPropagation();
    console.log("click me");
    onPlayClick(id);
  };

  return (
    <div
      className={`game-card ${className} cursor-pointer`}
      onClick={handlePlayClick}
    >
      <div
        className="game-card-image"
        style={{ backgroundImage: `url(${gameLogo})` }}
      >
        <div className="game-card-overlay">
          <button
            className="play-now-btn"
            onClick={handlePlayClick}
            disabled={status !== "active"}
          >
            {status === "active" ? "PLAY NOW" : "UNAVAILABLE"}
          </button>
        </div>

        <div className="game-provider-tag">{getProviderName()}</div>

        {isFavorite && (
          <div className="favorite-badge">
            <span>❤️</span>
          </div>
        )}

        <div className="logo-watermark">
          <Logo />
        </div>

        {status !== "active" && (
          <div className="status-overlay">
            <span className="status-text">{status}</span>
          </div>
        )}
      </div>

      <div className="game-card-content">
        <h3 className="game-title">{name}</h3>
        <div className="game-details">
          <span className="category">{getCategoryInfo()}</span>
          <span className="ggr-percent">GGR: {ggrPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
