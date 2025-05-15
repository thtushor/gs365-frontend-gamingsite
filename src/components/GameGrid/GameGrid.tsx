import React, { useState, useEffect } from "react";
import "./GameGrid.scss";

interface GameItem {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  category: string;
}

const demoGames: GameItem[] = [
  {
    id: "crazy-time",
    title: "CRAZY TIME",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/EVO/BDT/crazytime@CrazyTime0000001.png?v=1746102378802",
    category: "popular",
  },
  {
    id: "bac-bo",
    title: "BAC BO",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/EVO/BDT/crazytime@CrazyTime0000001.png?v=1746102378802",
    category: "popular",
  },
  {
    id: "super-sic-bo",
    title: "SUPER SIC BO",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/EVO/BDT/crazytime@CrazyTime0000001.png?v=1746102378802",
    category: "popular",
  },
  {
    id: "auto-roulette",
    title: "AUTO ROULETTE",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/EVO/BDT/crazytime@CrazyTime0000001.png?v=1746102378802",
    category: "roulette",
  },
  {
    id: "baccarat-classic",
    title: "BACCARAT CLASSIC",
    provider: "SEXY",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-001_SEXY_1.png?v=1746048010403",
    category: "baccarat",
  },
  {
    id: "funky-time",
    title: "FUNKY TIME",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-016.png?v=1746048172274",
    category: "popular",
  },
  {
    id: "lightning-roulette",
    title: "LIGHTNING ROULETTE",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-016.png?v=1746048172274",
    category: "roulette",
  },
  {
    id: "dragon-tiger",
    title: "DRAGON TIGER",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-016.png?v=1746048172274",
    category: "popular",
  },
  {
    id: "mega-wheel",
    title: "MEGA WHEEL",
    provider: "PRAGMATIC PLAY",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-016.png?v=1746048172274",
    category: "wheel",
  },
  {
    id: "commission-baccarat",
    title: "COMMISSION BACCARAT",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_JILI/BDT/JILI-TABLE-017.png?v=1745811155061",
    category: "baccarat",
  },
  {
    id: "crazy-time-a",
    title: "CRAZY TIME A",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_JILI/BDT/JILI-TABLE-017.png?v=1745811155061",
    category: "wheel",
  },
  {
    id: "top-card",
    title: "TOP CARD",
    provider: "EVOLUTION",
    imageUrl:
      "https://img.b112j.com/upload/game/AWCV2_JILI/BDT/JILI-TABLE-017.png?v=1745811155061",
    category: "card",
  },
];

const categories = [
  { id: "all", name: "All Games" },
  { id: "popular", name: "Popular" },
  { id: "roulette", name: "Roulette" },
  { id: "baccarat", name: "Baccarat" },
  { id: "wheel", name: "Game Shows" },
  { id: "card", name: "Card Games" },
];

const GameGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredGames, setFilteredGames] = useState<GameItem[]>(demoGames);
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateCards(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAnimateCards(false);

    // Filter games based on selected category
    const timer = setTimeout(() => {
      if (activeCategory === "all") {
        setFilteredGames(demoGames);
      } else {
        setFilteredGames(
          demoGames.filter((game) => game.category === activeCategory)
        );
      }
      setAnimateCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleGameClick = (gameId: string) => {
    console.log(`Game clicked: ${gameId}`);
    // Here you could implement logic to launch the game
  };

  if (isLoading) {
    return (
      <div className="game-grid-container loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      <h2 className="game-grid-title">Popular Games</h2>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={`game-grid ${animateCards ? "animate-in" : ""}`}>
        {filteredGames.map((game, index) => (
          <div
            key={game.id}
            className="game-card"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => handleGameClick(game.id)}
          >
            <div
              className="game-card-image"
              style={{ backgroundImage: `url(${game.imageUrl})` }}
            >
              <div className="game-card-overlay">
                <button className="play-now-btn">PLAY NOW</button>
              </div>
              <div className="game-provider-tag">{game.provider}</div>
            </div>
            <div className="game-card-content">
              <h3 className="game-title">{game.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="no-games-message">No games found in this category.</div>
      )}
    </div>
  );
};

export default GameGrid;
