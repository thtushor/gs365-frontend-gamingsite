import "./App.css";
import "swiper/swiper-bundle.css";
// import "swiper/css/effect-fade";

import "./components/GameSlider/GameSlider.scss";
import "./components/GameSlider/SliderHeader.scss";
// import { GameSlider } from "./components/GameSlider/GameSlider";
// import { Navbar } from "./components/Navbar/Navbar";
// import { Hero } from "./components/Hero/Hero";
// import { FAQ } from "./components/FAQ/FAQ";
// import { Footer } from "./components/Footer/Footer";
// import { TopBar } from "./components/Navbar/Topbar";
// import { NoticeBoard } from "./components/Notice/NoticeBoard";
// import { NoticeBoardCard } from "./components/Notice/NoticeBoardCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Deposit } from "./pages/Deposit";
import HomePage from "./pages/HomePage";
// import { TopBar } from "./components/Navbar/Topbar";
// import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="navbar-container">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deposit" element={<Deposit />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
