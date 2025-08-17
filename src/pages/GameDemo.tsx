import React from "react";
import Header from "../components/Layout/Header";
import "./GameDemo.scss";
import Sponsors from "../components/Sponsors";
import GameGrid from "../components/GameGrid";

const GameDemo: React.FC = () => {
  return (
    <div className="game-demo-page">
      <Header />
      <div className="page-content">
        <GameGrid />
        <Sponsors />
      </div>
    </div>
  );
};

export default GameDemo;
