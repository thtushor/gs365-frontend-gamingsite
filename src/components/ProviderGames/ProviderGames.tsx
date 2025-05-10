import React, { useState } from "react";
import { cn } from "../../lib/utils";
import "./ProviderGames.scss";
import { Heart, Play } from "lucide-react";

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  provider: string;
  isFavorite?: boolean;
}

interface ProviderGamesProps {
  games: Game[];
}

export const ProviderGames: React.FC<ProviderGamesProps> = ({ games }) => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  // Get unique providers from games
  const providers = Array.from(new Set(games.map((game) => game.provider)));

  const toggleProvider = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  const toggleFavorite = (gameId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const filteredGames = games.filter(
    (game) =>
      selectedProviders.length === 0 ||
      selectedProviders.includes(game.provider)
  );

  return (
    <div className="provider-games">
      <div className="providers-filter">
        <div className="providers-scroll">
          <button
            className={cn(
              "provider-chip",
              selectedProviders.length === 0 && "active"
            )}
            onClick={() => setSelectedProviders([])}
          >
            All
          </button>
          {providers.map((provider) => (
            <button
              key={provider}
              className={cn(
                "provider-chip",
                selectedProviders.includes(provider) && "active"
              )}
              onClick={() => toggleProvider(provider)}
            >
              {provider}
            </button>
          ))}
        </div>
      </div>

      <div className="games-grid">
        {filteredGames.map((game, index) => (
          <div
            className="game-card"
            key={game.id}
            onMouseEnter={() => setHoveredGame(index)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <div className="game-image">
              <img src={game.imageUrl} alt={game.title} />
              {hoveredGame === index && (
                <div className="game-overlay">
                  <button
                    className="favorite-btn"
                    onClick={(e) => toggleFavorite(game.id, e)}
                  >
                    <Heart
                      className={cn(
                        "heart-icon",
                        favorites.includes(game.id) && "active"
                      )}
                      size={24}
                    />
                  </button>
                  <button className="play-btn">
                    <Play size={14} />
                    <span>Play Now</span>
                  </button>
                </div>
              )}
            </div>
            <div className="game-info">
              <h3 className="game-title">{game.title}</h3>
              <span className="game-provider">{game.provider}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
