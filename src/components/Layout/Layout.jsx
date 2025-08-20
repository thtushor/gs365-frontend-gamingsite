import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Footer } from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import BaseModal from "../Promotion/BaseModal";
import PopupContent from "../PopupContent";
import MobileNav from "./MobileNav";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import PlayInstant from "../PlayInstant";

const Layout = ({ children }) => {
  const { setCountries } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [popupDataToShow, setPopupDataToShow] = useState(null);

  const getRequest = useGetRequest();

  const {
    data: popupData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popup"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ACTIVE_POPUP,
        errorMessage: "Failed to fetch active popups",
        isPublic: true,
      }),
  });
  const {
    data: countryData,
    isLoading: countryLoading,
    isError: countryErr,
  } = useQuery({
    queryKey: ["country", { status: "active" }],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_COUNTRIES,
        errorMessage: "Failed to fetch countries",
        isPublic: true,
        params: { status: "active" },
      }),
  });
  useEffect(() => {
    if (countryData?.data?.length > 0) {
      setCountries(countryData?.data);
    } else {
      setCountries([]);
    }
  }, [countryData]);

  useEffect(() => {
    if (popupData?.data?.message) {
      const today = new Date().toISOString().split("T")[0];
      const lastClosed = localStorage.getItem("popupLastClosingTime");

      if (lastClosed !== today && popupData.data.message) {
        setPopupDataToShow(popupData.data);
        setModalOpen(true);
      }
    }
  }, [popupData]);

  const handleCloseModal = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("popupLastClosingTime", today); // 👈 Only on close
    setModalOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />

      <MobileNav />
      <BaseModal open={modalOpen} showClose={false}>
        <PopupContent data={popupDataToShow} onClose={handleCloseModal} />
      </BaseModal>
      <PlayInstant />
    </div>
  );
};

export default Layout;
