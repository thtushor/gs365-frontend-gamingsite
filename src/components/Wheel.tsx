import { PrizeWheel } from "@mertercelik/react-prize-wheel";
import type { Sector, PrizeWheelRef } from "@mertercelik/react-prize-wheel";
import "@mertercelik/react-prize-wheel/style.css";

export function Wheel({
  wheelRef,
  outerSpin,
  stopTicking,
  playWin,
  handleWinner,
  sectors,
}: {
  wheelRef: React.RefObject<PrizeWheelRef>;
  outerSpin?: string;
  stopTicking?: () => void;
  playWin?: () => void;
  handleWinner: (sector: Sector) => void;
  sectors: Sector[];
}) {
  // Define your 8 slots + desired relative weights
  // Example: "10" has high weight → ~52% chance if total ≈124

  const handleSpinEnd = (sector: Sector) => {
    stopTicking?.();
    playWin?.(); // 👈 ADD THIS (pass from parent if needed)
    handleWinner(sector);
  };

  return (
    <div className="width-[330px] m-auto  py-4">
      <div className="header-auth">
        <div className="wheel-stack-parent ">
          {/* ANIMATED BORDER (YOUR EXISTING BORDER) */}
          <div className="animated-border-parent rounded-full overflow-hidden">
            {/* BULB LAYER */}
            <div className="vegas-bulb-layer" />

            {/* WHEEL */}
            <div className="animated-border-inner-container  p-5  rounded-full z-10 relative flex items-center justify-center header-auth">
              <PrizeWheel
                ref={wheelRef}
                sectors={sectors}
                onSpinEnd={handleSpinEnd}
                duration={5}
                minSpins={5}
                maxSpins={8}
                frameColor="#ffd700"
                middleColor="#111"
                textColor="#fff"
                textFontSize={40}
                wheelColors={["#ff4d4d", "#ffa500"]}
              />

              {/* Arrow ALWAYS on top */}
              <img src={outerSpin} className="absolute z-[50]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
