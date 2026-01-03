import React, { useState } from "react";
import "./GameCard.scss";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { API_LIST, BASE_URL } from "../../lib/api/apiClient";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Logo from "../../assets/brand-logo.png";
import BaseModal from "../Promotion/BaseModal";
import ToastError from "../../lib/ToastError";
import LoginPopup from "../Auth/LoginPopup";
import { useNavigate } from "react-router-dom";
import GameSkeleton from "../Shared/GameSkeleton";

interface GameCardProps { 
  id: number;
  isNothing?: boolean;
  name: string;
  status: string;
  logo: string;
  gameLogo: string;
  gameUrl: string;
  sportLogo: string;
  ggrPercent: string;
  categoryInfo: string;
  version: string;
  providerInfo: {
    id: number;
    name: string;
    logo: string;
    status: string;
    country: string;
  };
  onPlayClick: (gameId: number) => void;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  name,
  status,
  gameLogo,
  sportLogo,
  logo,
  onPlayClick,
  className = "",
  isNothing=false,
  version="parent"
}) => {
  const { user, favorites, setFavorites } = useAuth();
  const queryClient = useQueryClient();

  const isFavorite = favorites.some((fav) => fav.gameId === id);

  const addApiUrl = `${BASE_URL}${API_LIST.ADD_FAVORITE}`;
  const removeApiUrl = `${BASE_URL}${API_LIST.REMOVE_FAVORITE}`;
  const navigate = useNavigate();

  // ✅ Add Favorite Mutation
  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(addApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ userId: user?.id, gameId: id }),
      });
      return res.json();
    },
    onMutate: async () => {
      if (!user?.id) {
        toast.error("Please login first!");
        throw new Error("Not logged in");
      }

      const newFav = {
        id: Date.now(),
        gameId: id,
        gameName: String(name) || "",
        gameLogo: gameLogo || sportLogo || logo || "",
        gameUrl: "",
        gameApiKey: "",
        gameLicenseKey: "",
        userId: user.id,
        username: user.username,
        userFullname: user.fullname,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      setFavorites((prev) => [...prev, newFav]);
      return { newFav };
    },
    onError: (_error, _variables, context) => {
      if (context?.newFav) {
        setFavorites((prev) =>
          prev.filter((fav) => fav.gameId !== context.newFav.gameId)
        );
      }
      toast.error("Failed to add favorite");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // ✅ Remove Favorite Mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(removeApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ userId: user?.id, gameId: id }),
      });
      return res.json();
    },
    onMutate: async () => {
      const prevFavs = favorites;
      setFavorites((prev) => prev.filter((fav) => fav.gameId !== id));
      return { prevFavs };
    },
    onError: (_error, _variables, context) => {
      if (context?.prevFavs) {
        setFavorites(context.prevFavs);
      }
      toast.error("Failed to remove favorite");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleFavoriteFunction = () => {
    if (!user?.id) return toast.error("Please login first!");
    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const handleCheckAuthentication = (id: number) => {
    if (!user) {
      setSuccessModalOpen(true);
    } else {
      setSuccessModalOpen(false);
      onPlayClick(id);
    }
  };
  const handleRegisterClick = (affiliate: boolean = false) => {
    if (affiliate) {
      navigate("/affiliate-signup");
    } else {
      navigate("/register");
    }
  };

  if(isNothing){
return (
  <div
        className={`${className} cursor-pointer relative min-h-[140px] md:w-[140px] md:h-[185px]`}
      > <GameSkeleton variant={version} />
      </div> 
)
  }
  return (
    <>
      <div
        className={`game-card ${className} cursor-pointer relative min-h-[140px] md:w-[140px] md:h-[185px]`}
      > 
       <>
            <img
          src={Logo}
          className="absolute top-1 left-1 w-[22px] h-[22px] border border-yellow-300 bg-[#121212] rounded-full"
          alt=""
        />
        <img
          src={gameLogo ? gameLogo : sportLogo ? sportLogo : logo ? logo : ""}
          alt=""
          className="w-full h-full object-cover min-h-[140px] max-h-[140px] md:w-[140px] md:min-h-[185px]"
        />
            </>

        <div className="absolute game-card-image top-0 left-0 flex items-center justify-center">
          <div className="game-card-overlay">
            <button
              className="play-now-btn !text-[12px] md:!text-[14px] !py-1 !px-2 md:!py-[8px] md:!px-[10px]"
              onClick={() => handleCheckAuthentication(Number(id))}
              disabled={status !== "active"}
            >
              {status === "active" ? "PLAY NOW" : "UNAVAILABLE"}
            </button>
          </div>
        </div>

        {/* Favorite button */}
        {user && (
          <>
            {addFavoriteMutation.isPending ||
            removeFavoriteMutation.isPending ? (
              <div
                className={`w-[22px] h-[22px] absolute right-1 top-1 flex items-center justify-center rounded-full border-2 ${
                  isFavorite
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-yellow-300 border-orange-300 text-gray-600"
                } ${
                  addFavoriteMutation.isPending ||
                  removeFavoriteMutation.isPending
                    ? "cursor-progress opacity-70"
                    : "cursor-pointer"
                }`}
              >
                {isFavorite ? <RiHeart3Fill /> : <RiHeart3Line />}
              </div>
            ) : (
              <div
                onClick={handleFavoriteFunction}
                className={`w-[22px] h-[22px] absolute right-1 top-1 flex items-center justify-center rounded-full border-2 ${
                  isFavorite
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-yellow-300 border-orange-300 text-gray-600"
                } ${
                  addFavoriteMutation.isPending ||
                  removeFavoriteMutation.isPending
                    ? "cursor-progress opacity-70"
                    : "cursor-pointer"
                }`}
              >
                {isFavorite ? <RiHeart3Fill /> : <RiHeart3Line />}
              </div>
            )}
          </>
        )}
      </div>
      <BaseModal
        open={successModalOpen}
        showClose={false}
        onClose={() => setSuccessModalOpen(false)}
      >
        <ToastError
          title="Login required!"
          description="You must be logged in to play games. Please sign in or create an account to continue.asdfsdf"
          onClose={setSuccessModalOpen}
          location={"/"}
          isRedirect={false}
          extraFn={() => setIsLoginPopupOpen(true)}
          loginSignupBtn={true}
        />
      </BaseModal>
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onSignUpClick={handleRegisterClick}
      />
    </>
  );
};

export default GameCard;
