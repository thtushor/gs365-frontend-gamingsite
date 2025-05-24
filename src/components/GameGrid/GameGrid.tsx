import React, { useState, useEffect } from "react";
import "./GameGrid.scss";
import { Logo } from "../Logo/Logo";

interface GameItem {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  category: string;
}

// Existing image URLs for reuse
const gameImages = [
  "https://img.b112j.com/upload/game/EVO/BDT/crazytime@CrazyTime0000001.png?v=1746102378802",
  "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-001_SEXY_1.png?v=1746048010403",
  "https://img.b112j.com/upload/game/AWCV2_SEXYBCRT/BDT/MX-LIVE-016.png?v=1746048172274",
  "https://img.b112j.com/upload/game/AWCV2_JILI/BDT/JILI-TABLE-017.png?v=1745811155061",
];

// Providers list
const providers = [
  "EVOLUTION",
  "SEXY",
  "PRAGMATIC PLAY",
  "EZUGI",
  "HABANERO",
  "MICROGAMING",
  "PLAYTECH",
  "BETSOFT",
];

// Game categories
const gameCategories = [
  "popular",
  "roulette",
  "baccarat",
  "wheel",
  "card",
  "slot",
  "blackjack",
  "poker",
];

// Function to generate a large set of games
const generateGames = () => {
  const games: GameItem[] = [
    // Keep the original 12 games
    {
      id: "crazy-time",
      title: "CRAZY TIME",
      provider: "EVOLUTION",
      imageUrl: gameImages[0],
      category: "popular",
    },
    {
      id: "bac-bo",
      title: "BAC BO",
      provider: "EVOLUTION",
      imageUrl: gameImages[0],
      category: "popular",
    },
    {
      id: "super-sic-bo",
      title: "SUPER SIC BO",
      provider: "EVOLUTION",
      imageUrl: gameImages[0],
      category: "popular",
    },
    {
      id: "auto-roulette",
      title: "AUTO ROULETTE",
      provider: "EVOLUTION",
      imageUrl: gameImages[0],
      category: "roulette",
    },
    {
      id: "baccarat-classic",
      title: "BACCARAT CLASSIC",
      provider: "SEXY",
      imageUrl: gameImages[1],
      category: "baccarat",
    },
    {
      id: "funky-time",
      title: "FUNKY TIME",
      provider: "EVOLUTION",
      imageUrl: gameImages[2],
      category: "popular",
    },
    {
      id: "lightning-roulette",
      title: "LIGHTNING ROULETTE",
      provider: "EVOLUTION",
      imageUrl: gameImages[2],
      category: "roulette",
    },
    {
      id: "dragon-tiger",
      title: "DRAGON TIGER",
      provider: "EVOLUTION",
      imageUrl: gameImages[2],
      category: "popular",
    },
    {
      id: "mega-wheel",
      title: "MEGA WHEEL",
      provider: "PRAGMATIC PLAY",
      imageUrl: gameImages[2],
      category: "wheel",
    },
    {
      id: "commission-baccarat",
      title: "COMMISSION BACCARAT",
      provider: "EVOLUTION",
      imageUrl: gameImages[3],
      category: "baccarat",
    },
    {
      id: "crazy-time-a",
      title: "CRAZY TIME A",
      provider: "EVOLUTION",
      imageUrl: gameImages[3],
      category: "wheel",
    },
    {
      id: "top-card",
      title: "TOP CARD",
      provider: "EVOLUTION",
      imageUrl: gameImages[3],
      category: "card",
    },
  ];

  // Generate additional games to reach 60+ games
  const gameTitles = [
    "SPEED BACCARAT",
    "POWER BLACKJACK",
    "MEGA BALL",
    "MONOPOLY LIVE",
    "DREAM CATCHER",
    "FOOTBALL STUDIO",
    "INFINITE BLACKJACK",
    "LIGHTNING DICE",
    "AMERICAN ROULETTE",
    "FRENCH ROULETTE",
    "SPEED ROULETTE",
    "VIP ROULETTE",
    "CASINO HOLDEM",
    "THREE CARD POKER",
    "CARIBBEAN STUD",
    "ULTIMATE TEXAS HOLDEM",
    "BACCARAT SQUEEZE",
    "NO COMMISSION BACCARAT",
    "SPEED BACCARAT A",
    "SPEED BACCARAT B",
    "GRAND BACCARAT",
    "SALON PRIVE BACCARAT",
    "FORTUNE SIX",
    "SIZZLING HOT DELUXE",
    "GONZO'S QUEST",
    "STARBURST",
    "SWEET BONANZA",
    "WOLF GOLD",
    "BOOK OF DEAD",
    "REACTOONZ",
    "JAMMIN JARS",
    "FRUIT PARTY",
    "GATES OF OLYMPUS",
    "BIG BASS BONANZA",
    "BUFFALO KING",
    "RELEASE THE KRAKEN",
    "THE DOG HOUSE",
    "MUSTANG GOLD",
    "GREAT RHINO",
    "EXTRA CHILLI",
    "WILD WEST GOLD",
    "JOHN HUNTER",
    "FIRE JOKER",
    "RISE OF OLYMPUS",
    "LUCKY NEKO",
    "WILD WEST DUELS",
    "GOLDEN WEALTH",
    "DRAGON LEGEND",
  ];

  for (let i = 0; i < 48; i++) {
    const randomImageIndex = Math.floor(Math.random() * gameImages.length);
    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];
    const randomCategory =
      gameCategories[Math.floor(Math.random() * gameCategories.length)];

    games.push({
      id: `game-${i + 13}`,
      title: gameTitles[i],
      provider: randomProvider,
      imageUrl: gameImages[randomImageIndex],
      category: randomCategory,
    });
  }

  return games;
};

const demoGames: GameItem[] = generateGames();

const categories = [
  { id: "all", name: "All Games" },
  { id: "popular", name: "Popular" },
  { id: "roulette", name: "Roulette" },
  { id: "baccarat", name: "Baccarat" },
  { id: "wheel", name: "Game Shows" },
  { id: "card", name: "Card Games" },
  { id: "slot", name: "Slots" },
  { id: "blackjack", name: "Blackjack" },
  { id: "poker", name: "Poker" },
];

const GameGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredGames, setFilteredGames] = useState<GameItem[]>(demoGames);
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const [visibleGames, setVisibleGames] = useState<GameItem[]>([]);
  const [gamesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // Reset to first page when category changes

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

  useEffect(() => {
    // Update visible games based on current page
    const lastIndex = currentPage * gamesPerPage;
    setVisibleGames(filteredGames.slice(0, lastIndex));
  }, [filteredGames, currentPage, gamesPerPage]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleGameClick = (gameId: string) => {
    console.log(`Game clicked: ${gameId}`);
    // Here you could implement logic to launch the game
  };

  const handleLoadMore = () => {
    // Load more games at once (doubling the current number)
    const nextPageToShow = currentPage + 2;
    setCurrentPage(nextPageToShow);
  };

  const progressPercentage = Math.min(
    (visibleGames.length / filteredGames.length) * 100,
    100
  );

  if (isLoading) {
    return (
      <div className="game-grid-container loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      <h2 className="game-grid-title">Popular Games ({demoGames.length})</h2>

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
        {visibleGames.map((game, index) => (
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
              <div className="logo-watermark">
                <Logo />
              </div>
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

      {visibleGames.length < filteredGames.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            আরও লোড করুন
          </button>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {filteredGames.length}টি গেমের মধ্যে {visibleGames.length}টি দেখানো
            হয়েছে
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
