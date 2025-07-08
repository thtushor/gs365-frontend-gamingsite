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
import Layout from "./components/Layout/Layout";
import "./components/Layout/Layout.scss";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/Loader/LoadingScreen";
// import Register from "./pages/Register";
import VipPage from "./pages/VipPage";
import PromotionPage from "./pages/PromotionPage";
import PromotionDetails from "./pages/PromotionDetails";
import Register from "./pages/RegisterWithAPI";
import AffiliateRegister from "./pages/AffiliateRegister";
import DepositPage from "./pages/DepositPage";
import SingleDeposit from "./pages/SingleDeposit";
import ReferralInfo from "./pages/ReferralInfo";
import ReferralDetails from "./pages/ReferralDetails";
import CashRewardHistory from "./pages/CashRewardHistory";
import PersonalInformation from "./pages/PersonalInformation";
import LoginSecurity from "./pages/LoginSecurity";
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/demo-deposit" element={<Deposit />} />
          <Route path="/deposit/:depositId" element={<SingleDeposit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/affiliate-signup" element={<AffiliateRegister />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/promotions/:id" element={<PromotionDetails />} />

          {/* profile */}
          <Route
            path="/profile/personal-information"
            element={<PersonalInformation />}
          />
          <Route path="/profile/login-security" element={<LoginSecurity />} />
          <Route path="/profile/referral-info" element={<ReferralInfo />} />
          <Route
            path="/profile/referral-details"
            element={<ReferralDetails />}
          />
          <Route
            path="/profile/referral-details/cash-reward-history"
            element={<CashRewardHistory />}
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
