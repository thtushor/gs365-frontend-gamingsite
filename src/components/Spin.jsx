import React, { useEffect, useState } from "react";
import TopBanner from "../assets/top-banner.png";
import SpinOuter from "../assets/spin.png";
import SpinInner from "../assets/spin-inner.png";
import SpinArrow from "../assets/spin-arrow.png";
import { Clock } from "lucide-react";

const COUNTDOWN_KEY = "spin_countdown_end_time"; // key in localStorage

const Spin = ({ data, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

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

  const SLOTS = [
    { name: "10", from: 337.5, to: 22.5 }, // slot centered at top
    { name: "100", from: 22.5, to: 67.5 },
    { name: "BetterLuck1", from: 67.5, to: 112.5 },
    { name: "10000", from: 112.5, to: 157.5 }, // ❌ never used
    { name: "500", from: 157.5, to: 202.5 },
    { name: "1000", from: 202.5, to: 247.5 },
    { name: "BetterLuck2", from: 247.5, to: 292.5 },
    { name: "10", from: 292.5, to: 337.5 },
  ];

  const PROBABILITY_POOL = [
    { name: "10", weight: 52 },
    { name: "100", weight: 5 },
    { name: "500", weight: 2 },
    { name: "1000", weight: 1 },
    { name: "BetterLuck1", weight: 20 },
    { name: "BetterLuck2", weight: 20 },
    // ❌ 10,000 NOT INCLUDED
  ];

  const pickByWeight = () => {
    const total = PROBABILITY_POOL.reduce((s, i) => s + i.weight, 0);
    let rand = Math.random() * total;

    for (const item of PROBABILITY_POOL) {
      if (rand < item.weight) return item.name;
      rand -= item.weight;
    }
  };

  const ANGLES = {
    10: [330, 360],
    "10_alt": [300, 330],
    100: [20, 60],
    BetterLuck1: [70, 110],
    500: [160, 200],
    1000: [210, 250],
    BetterLuck2: [260, 300],
  };

  const getAngleForResult = (result) => {
    const range = ANGLES[result] || ANGLES["10"];
    return Math.random() * (range[1] - range[0]) + range[0];
  };

  const getSpinResult = () => {
    const rand = Math.random() * 100;

    if (rand < 52) return SLOT_INDEX.TEN;
    if (rand < 57) return SLOT_INDEX.HUNDRED;
    if (rand < 59) return SLOT_INDEX.FIVE_HUNDRED;
    if (rand < 60) return SLOT_INDEX.THOUSAND;
    if (rand < 80) return SLOT_INDEX.BETTER_LUCK_1;
    return SLOT_INDEX.BETTER_LUCK_2;
  };
  const FORBIDDEN_10000 = {
    from: 110,
    to: 160,
  };

  const normalize = (angle) => ((angle % 360) + 360) % 360;

  const isInForbiddenZone = (angle) => {
    const a = normalize(angle);
    return a >= FORBIDDEN_10000.from && a <= FORBIDDEN_10000.to;
  };

  const createSpinPool = () => {
    const pool = [
      ...Array(52).fill("10"),
      ...Array(20).fill("BetterLuck1"),
      ...Array(20).fill("BetterLuck2"),
      ...Array(5).fill("100"),
      ...Array(2).fill("500"),
      ...Array(1).fill("1000"),
      // ❌ 10,000 NOT INCLUDED
    ];

    // Fisher–Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool;
  };

  const [spinPool, setSpinPool] = useState(() => createSpinPool());

  const getNextResult = () => {
    setSpinPool((prev) => {
      if (prev.length === 0) {
        return createSpinPool();
      }
      return prev;
    });

    return spinPool[0];
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const result = spinPool[0];
    const angle = getAngleForResult(result);

    setSpinPool((prev) => prev.slice(1));

    const spins = 7;
    const finalRotation = spins * 360 + (360 - angle);

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      console.log("RESULT:", result);
    }, 5000);
  };

  return (
    <div className="px-4 mt-[10px]">
      <img src={TopBanner} alt="gs365.com" className="w-full bg-contain" />

      <p className="font-semibold text-center mt-[6px]">
        The dream journey begins, lucky roulette
      </p>

      <div className="flex items-center justify-center mt-0">
        <div className="header-auth mt-1 flex items-center">
          <p className="flex items-center !min-h-[35px] !px-[6px] signup-btn gap-1 text-[14px] mr-2">
            <Clock size={20} /> Remaining
          </p>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[20px] !px-[6px]">
            {timeLeft.hours}h
          </div>
          <span className="text-primary font-bold text-[30px] mt-[-10px]">
            :
          </span>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[20px] !px-[6px]">
            {timeLeft.minutes}m
          </div>
          <span className="text-primary font-bold text-[30px] mt-[-10px]">
            :
          </span>

          <div className="signup-btn-green !h-[35px] flex items-center justify-center font-semibold !text-[20px] !px-[6px]">
            {timeLeft.seconds}s
          </div>
        </div>
      </div>

      <div
        onClick={handleSpin}
        className="relative flex items-center justify-center"
      >
        <img src={SpinOuter} alt="gs365.com" className="md:w-full" />
        <img
          src={SpinInner}
          className="w-[58%] mt-[8px] absolute"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 5s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        />

        <img
          src={SpinArrow}
          alt="gs365.com"
          className="bottom-[64px] left-1/2 transform -translate-x-1/2 absolute w-[40px]"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="header-auth">
          <div className="signup-btn-green" onClick={handleSpin}>
            TRY YOUR LUCK NOW!
          </div>

          <div className="custom-error-btn">WAIT FOR THE NEXT SPIN</div>
        </div>
      </div>
    </div>
  );
};

export default Spin;
