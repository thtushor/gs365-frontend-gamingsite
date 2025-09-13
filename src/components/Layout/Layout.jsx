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
import { toast } from "react-toastify";
import KycModal from "../KycModal";
import { FiArrowUpCircle } from "react-icons/fi";
import { IoIosArrowDropup } from "react-icons/io";
import { useAutoLogout } from "../../lib/api/hooks";
import ToastSuccess from "../../lib/toastPopups/toastSuccess";

const Layout = ({ children }) => {
  useAutoLogout();
  const { setCountries, user, countries, setSocial, setFavorites } = useAuth();
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
    data: socialData,
    isLoading: socialLoading,
    isError: socialErr,
  } = useQuery({
    queryKey: ["social"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ACTIVE_SOCIAL,
        errorMessage: "Failed to fetch active socials",
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
  }, [countryData?.data?.length]);
  useEffect(() => {
    if (socialData?.data?.length > 0) {
      setSocial(socialData?.data);
    } else {
      setSocial([]);
    }
  }, [socialData?.data?.length]);

  console.log("hello", popupData);
  useEffect(() => {
    if (popupData?.data?.message) {
      const today = new Date().toISOString().split("T")[0];
      const lastClosed = localStorage.getItem("popupLastClosingTime");

      if (lastClosed !== today && popupData.data.message) {
        setPopupDataToShow(popupData.data);
        setModalOpen(true);
      }
    }
  }, [popupData?.data]);

  const handleCloseModal = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("popupLastClosingTime", today); // 👈 Only on close
    setModalOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [kycModal, setKycModal] = useState(false);

  useEffect(() => {
    if (user?.kyc_status === "required") {
      const alreadyShown = localStorage.getItem("kycModalShown");

      if (!alreadyShown) {
        const timer = setTimeout(() => {
          setKycModal(true);
          localStorage.setItem("kycModalShown", "true");
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [user?.kyc_status]);

  const {
    data: favData,
    isLoading: favLoading,
    isError: favError,
  } = useQuery({
    queryKey: ["favorite", user?.id], // 👈 include userId
    enabled: !!user?.id, // 👈 only run if user exists
    queryFn: async () => {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${BASE_URL}${API_LIST.GET_FAVORITE}?userId=${user?.id}`, // 👈 send userId in params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch favorites");

      return res.json();
    },
  });

  useEffect(() => {
    if (favData?.length > 0) {
      setFavorites(favData);
    } else {
      setFavorites([]);
    }
  }, [favData?.length]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer socialData={socialData?.data || []} />

      <MobileNav />
      <BaseModal open={modalOpen} showClose={false}>
        <PopupContent data={popupDataToShow} onClose={handleCloseModal} />
        {/* <ToastSuccess /> */}
      </BaseModal>
      <PlayInstant />

      <BaseModal
        open={kycModal}
        showClose={true}
        onClose={() => setKycModal(false)}
      >
        <KycModal data={user} onClose={() => setKycModal(false)} />
      </BaseModal>

      <div
        onClick={scrollToTop}
        className="bg-yellow-300 cursor-pointer text-black fixed bottom-[80px] left-5 flex items-center justify-center rounded-full text-[30px] md:text-[40px]"
      >
        <IoIosArrowDropup />
      </div>
    </div>
  );
};

export default Layout;
