import React from "react";
import GameGrid from "../components/GameGrid";
import Header from "../components/Layout/Header";

const GameDemo: React.FC = () => {
  return (
    <div className="game-demo-page">
      <Header />
      <div className="page-content">
        <GameGrid />
      </div>
    </div>
  );
};

export default GameDemo;
