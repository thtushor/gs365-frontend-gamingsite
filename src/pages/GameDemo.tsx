import React from "react";
import GameGrid from "../components/GameGrid";
import Header from "../components/Layout/Header";
import "./GameDemo.scss"; 
import Sponsors from "../components/Sponsors";

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
