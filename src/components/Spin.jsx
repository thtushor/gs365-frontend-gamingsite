import React, { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { Wheel } from "./Wheel";
import useSound from "use-sound";
import BaseModal from "./Promotion/BaseModal";
import ToastSuccess from "../lib/ToastSuccess";
import { useAuth } from "../contexts/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../lib/api/config";
import { useSettings } from "../lib/api/hooks";
import axiosInstance from "../lib/api/axios";

const COUNTDOWN_KEY = "spin_countdown_end_time"; // key in localStorage
const sectors = [
  { id: 1, label: "10", probability: 60 },
  { id: 2, label: "100", probability: 8 },
  { id: 3, label: "Better Luck", probability: 25 },
  { id: 4, label: "10000", probability: 0 },
  { id: 8, label: "10", probability: 60 },
  { id: 5, label: "500", probability: 4 },
  { id: 6, label: "1000", probability: 2 },
  { id: 7, label: "Better Luck", probability: 25 },
];
const defaultWinner = {
  successMessage: "",
  amount: 0,
  description: "",
};

export default function Spin({
  data,
  onClose,
  SpinLight,
  TopBanner,
  spinSfx,
  winSfx,
  settingsData,
}) {
  if (!settingsData) {
    return (
      <div className="bg-yellow-700 p-10 rounded-md">
        <h1 className="text-[20px]">
          Something wrong, try again after some time.
        </h1>
      </div>
    );
  }
  const spinOff = data?.isDailySpinCompleted && !data?.isSpinForcedByAdmin;
  const [isSpinOff, setIsSpinOff] = useState(spinOff);
  const [winningModal, setWinningModal] = useState(false);
  const [winner, setWinner] = useState(defaultWinner);

  const wheelRef = useRef(null);

  const rafRef = useRef(null);
  const lastTickTimeRef = useRef(0);
  const currentDelayRef = useRef(80);
  const stopTimeoutRef = useRef(null);

  const [playTick] = useSound(spinSfx, {
    volume: 0.5,
    interrupt: true,
  });

  const [playWin] = useSound(winSfx, {
    volume: 0.8,
    interrupt: true,
  });

  const startTicking = () => {
    stopTicking(); // 👈 IMPORTANT

    lastTickTimeRef.current = performance.now();
    currentDelayRef.current = 80;

    const loop = (now) => {
      if (now - lastTickTimeRef.current >= currentDelayRef.current) {
        playTick();
        lastTickTimeRef.current = now;

        currentDelayRef.current = Math.min(currentDelayRef.current + 15, 350);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  // 🛑 STOP RAF LOOP
  const stopTicking = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleSpin = () => {
    if (wheelRef.current) {
      startTicking();
      wheelRef.current.spin();

      // 🛑 Stop ticking slightly before spin ends
      stopTimeoutRef.current = setTimeout(() => {
        stopTicking();
      }, 4000); // 4.5s (500ms before stop)
    }
  };

  // after spin logic and api fetching
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const claimSpinMutation = useMutation({
    mutationFn: async (amount) => {
      const payload = {
        spinBonusAmount: Number(amount || 0),
        isDailySpinCompleted:
          user?.isSpinForcedByAdmin && !user?.isDailySpinCompleted
            ? false
            : true,
        isSpinForcedByAdmin: false,
        lastSpinDate: new Date().toString(),
        isForcedSpinComplete: user?.isSpinForcedByAdmin ? true : false,
        spinTurnOverMultiply: Number(
          settingsData?.data[0]?.spinTurnoverMultiply || 0,
        ),
        userId: user?.id,
      };
      const res = await axiosInstance.post(
        API_ENDPOINTS.PAYMENT.CLAIM_SPIN_BONUS,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spin_bonus", user.id],
      });
      onCloseCallback();
    },
  });

  const handleWinner = (selectedSector) => {
    console.log("Winner:", selectedSector);

    const isBetterLuck = selectedSector.label === "Better Luck";
    const amount = isBetterLuck ? 0 : Number(selectedSector.label);

    let successMessage = "";
    let description = "";

    if (isBetterLuck) {
      successMessage = "BETTER LUCK NEXT TIME!";
      description =
        "Don’t worry! Every spin is a new chance to win big. Wait for the next spin and try again to test your luck!";
    } else {
      successMessage = "CONGRATULATIONS, YOU WON!";
      description = `Amazing! You have successfully won ${amount} BDT. Enjoy your reward and keep spinning for bigger prizes!`;
    }
    setWinner({
      successMessage,
      amount,
      description,
    });

    setWinningModal(true);
    setIsSpinOff(true);
    claimSpinMutation.mutate(amount);
  };

  const handleCloseWinningModal = () => {
    setWinningModal(false);
    setWinner(defaultWinner);
  };

  const handleCollectMoney = () => {
    // Implement the logic to add money to user's account
    console.log(`Collecting ${winner.amount} coins for the user.`);
    handleCloseWinningModal();
  };

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  useEffect(() => {
    return () => {
      stopTicking();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const getTodayEndTime = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999); // End of today 23:59:59.999
      return end;
    };

    // Load saved end time or create new one for today
    let endTimeStr = localStorage.getItem(COUNTDOWN_KEY);
    let targetTime = endTimeStr ? new Date(endTimeStr) : null;

    const now = new Date();

    // If no saved time, invalid, or it's from a previous day → use today's end
    if (
      !targetTime ||
      isNaN(targetTime.getTime()) ||
      targetTime.getDate() !== now.getDate() ||
      targetTime.getMonth() !== now.getMonth() ||
      targetTime.getFullYear() !== now.getFullYear() ||
      targetTime <= now
    ) {
      targetTime = getTodayEndTime();
      localStorage.setItem(COUNTDOWN_KEY, targetTime.toISOString());
    }

    const updateTimer = () => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        // Day ended → clean up and start new day
        localStorage.removeItem(COUNTDOWN_KEY);
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });

        // Immediately set next day's end
        const nextEnd = getTodayEndTime();
        localStorage.setItem(COUNTDOWN_KEY, nextEnd.toISOString());
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer(); // Show correct value right away

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNoSpinClick = () => {
    console.log("no spin");
  };

  return (
    <div className="px-4 mt-[10px] select-none">
      <img
        src={TopBanner}
        alt="gs365.com"
        className="w-[60%] mx-auto bg-contain"
      />

      <p className="font-semibold text-center text-[18px] mt-[6px] uppercase">
        dream begins with lucky spin
      </p>

      <div className="flex items-center justify-center mt-0">
        <div className="header-auth mt-1 flex items-center">
          <p className="flex items-center !min-h-[35px] !px-[6px] signup-btn gap-1 text-[14px] mr-2">
            <Clock size={20} /> Remaining
          </p>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[16px] !px-[6px]">
            {timeLeft.hours}h
          </div>
          <span className="text-primary font-bold text-[30px] mt-[-10px]">
            :
          </span>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[16px] !px-[6px]">
            {timeLeft.minutes}m
          </div>
          <span className="text-primary font-bold text-[30px] mt-[-10px]">
            :
          </span>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[16px] !px-[6px]">
            {timeLeft.seconds}s
          </div>
        </div>
      </div>

      <div
        onClick={isSpinOff ? handleNoSpinClick : handleSpin}
        className="relative flex items-center justify-center"
      >
        <Wheel
          wheelRef={wheelRef}
          outerSpin={SpinLight}
          stopTicking={stopTicking}
          playWin={playWin}
          handleWinner={handleWinner}
          sectors={sectors}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="header-auth">
          {isSpinOff ? (
            <div className="custom-error-btn">WAIT FOR THE NEXT SPIN</div>
          ) : (
            <div className="signup-btn-green" onClick={handleSpin}>
              TRY YOUR LUCK NOW!
            </div>
          )}
        </div>
      </div>

      <BaseModal
        open={winningModal}
        showClose={false}
        onClose={handleCollectMoney}
      >
        <ToastSuccess
          title={winner.successMessage || "Congratulations!"}
          description={winner.description || "You have won a prize!"}
          icon={winner.amount || 0}
          onClose={handleCollectMoney}
          // location="/"
          extraFn={handleCollectMoney}
        />
      </BaseModal>
    </div>
  );
}
