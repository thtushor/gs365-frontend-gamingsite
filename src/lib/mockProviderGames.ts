export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  provider: string;
  isFavorite?: boolean;
}

// List of game providers
const providers = [
  "Pragmatic Play",
  "Evolution Gaming",
  "NetEnt",
  "Microgaming",
  "Playtech",
  "Betsoft",
  "Yggdrasil",
  "Quickspin",
  "Red Tiger",
  "Big Time Gaming",
];

// List of game titles
const gameTitles = [
  "Golden Fortune",
  "Mystic Quest",
  "Dragon's Treasure",
  "Lucky Stars",
  "Royal Flush",
  "Mega Moolah",
  "Starburst",
  "Book of Dead",
  "Gonzo's Quest",
  "Immortal Romance",
  "Thunderstruck II",
  "Age of Gods",
  "Vikings Go Wild",
  "Reactoonz",
  "Sweet Bonanza",
  "Wolf Gold",
  "Great Rhino",
  "Fruit Party",
  "Money Train",
  "Jammin' Jars",
  "Pirates Plenty",
  "Wild West Gold",
  "Gates of Olympus",
  "Big Bass Bonanza",
  "Sugar Rush",
  "Mighty Kraken",
  "Temple Tumble",
  "Wild Frames",
  "Crystal Queen",
  "Diamond Blitz",
  "Lucky Lady's Clover",
  "Mystery Joker",
  "Fruit Zen",
  "Lucky Leprechaun",
  "Wild Wild West",
  "Golden Dragon",
  "Mystic Fortune",
  "Treasure Island",
  "Lucky 7",
  "Diamond Mine",
  "Golden Tiger",
  "Mystic Moon",
  "Treasure Hunt",
  "Lucky Star",
  "Diamond Quest",
  "Golden Phoenix",
  "Mystic Dragon",
  "Treasure Chest",
  "Lucky Charm",
  "Diamond Valley",
];

// List of reliable game-themed images
const gameImages = [
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Casino chips
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Slot machine
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Playing cards
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Dice
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Roulette
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Poker table
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Casino lights
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Gold coins
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Treasure chest
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Dragon
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Viking
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Egyptian
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Space
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Candy
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Wolf
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Rhino
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Fruits
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Train
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Jars
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Pirates
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Wild West
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Olympus
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Fishing
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Sugar
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Kraken
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Temple
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Frames
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Crystal
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Diamond
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Clover
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", // Joker
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Zen
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Leprechaun
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // West
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Dragon
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Fortune
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Island
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Lucky 7
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Mine
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Tiger
  "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?auto=format&fit=crop&w=800&q=80", // Moon
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Hunt
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Star
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Quest
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Phoenix
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Dragon
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Chest
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=800&q=80", // Charm
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", // Valley
];

// Generate random games
export const providerGames: Game[] = gameTitles.map((title, index) => ({
  id: `game-,{index + 1}`,
  title,
  imageUrl: gameImages[index % gameImages.length],
  provider: providers[Math.floor(Math.random() * providers.length)],
  isFavorite: false,
}));
