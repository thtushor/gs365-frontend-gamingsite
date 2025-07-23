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
import PasswordChangePage from "./pages/PasswordChangePage";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout/Layout";
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* --------------------- */}
          {/* Public Pages--------------------- */}
          {/* --------------------- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/demo-deposit" element={<Deposit />} />
          <Route path="/affiliate-signup" element={<AffiliateRegister />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/promotions/:id" element={<PromotionDetails />} />

          {/* --------------------- */}
          {/* Private Pages--------------------- */}
          {/* --------------------- */}
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <PrivateRoute>
                <DepositPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit/:depositId"
            element={
              <PrivateRoute>
                <SingleDeposit />
              </PrivateRoute>
            }
          />
          {/* pages under user profile */}
          <Route
            path="/profile/personal-information"
            element={
              <PrivateRoute>
                <PersonalInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/login-security"
            element={
              <PrivateRoute>
                <LoginSecurity />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/login-security/change-password"
            element={
              <PrivateRoute>
                <PasswordChangePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/referral-info"
            element={
              <PrivateRoute>
                <ReferralInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/referral-details"
            element={
              <PrivateRoute>
                <ReferralDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/referral-details/cash-reward-history"
            element={
              <PrivateRoute>
                <CashRewardHistory />
              </PrivateRoute>
            }
          />

          {/* --------------------- */}
          {/* Extra Pages--------------------- */}
          {/* --------------------- */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
