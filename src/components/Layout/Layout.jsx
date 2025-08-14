import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Footer } from "../Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import BaseModal from "../Promotion/BaseModal";
import PopupContent from "../PopupContent";
import MobileNav from "./MobileNav";

const Layout = ({ children }) => {
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

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />

      <MobileNav />
      <BaseModal open={modalOpen} showClose={false}>
        <PopupContent data={popupDataToShow} onClose={handleCloseModal} />
      </BaseModal>
    </div>
  );
};

export default Layout;
