import React, { useState, useRef, useEffect } from "react";
import { RefreshCcw } from "lucide-react";

const PullToRefresh: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const pulling = useRef(false);
  const threshold = 80; // how far to pull before triggering refresh
  const maxPull = threshold * 1.5; // maximum visual pull distance

  // Start pull only when at top
  const handleStart = (y: number) => {
    if (window.scrollY === 0 && !refreshing) {
      pulling.current = true;
      startY.current = y;
    }
  };

  // Handle move
  const handleMove = (y: number) => {
    if (!pulling.current || startY.current === null || refreshing) return;
    const distance = y - startY.current;

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, maxPull));
    }
  };

  // Handle release
  const handleEnd = () => {
    if (pullDistance >= threshold && window.scrollY === 0) {
      triggerRefresh();
    } else {
      reset();
    }
  };

  // Refresh logic
  const triggerRefresh = async () => {
    setRefreshing(true);
    setPullDistance(threshold);

    // Simulate async operation (e.g., fetch new data)
    await new Promise((res) => setTimeout(res, 1000));

    window.location.reload(); // full page refresh
  };

  // Reset UI
  const reset = () => {
    pulling.current = false;
    startY.current = null;
    setPullDistance(0);
    setRefreshing(false);
  };

  // Setup event listeners
  useEffect(() => {
    const touchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const touchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const touchEnd = () => handleEnd();

    const mouseDown = (e: MouseEvent) => handleStart(e.clientY);
    const mouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const mouseUp = () => handleEnd();

    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd);

    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);

      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [pullDistance]);

  // Auto reset after refresh animation
  useEffect(() => {
    if (refreshing) {
      const timer = setTimeout(() => reset(), 1200);
      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  return (
    <div
      style={{
        transform: `translateY(${pullDistance}px)`,
        transition:
          !pulling.current || refreshing
            ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
            zIndex: "9999999999 !important",
      }}
    >
      {/* Pull-to-refresh overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: pullDistance > 0 ? "60px" : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          zIndex: "9999999999 !important",
          transition: "height 0.25s ease",
          boxShadow: pullDistance > 0 ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
          fontWeight: 500,
          fontSize: "15px",
          pointerEvents: "none", // don't block clicks
        }}
      >
        {pullDistance > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 1,
              color: "#333",
              background: "#f9f9f9",
              padding: "6px 12px",
              borderRadius: "20px",
              transform: `translateY(${pullDistance < threshold ? 0 : 5}px)`,
              transition: "transform 0.2s ease, opacity 0.2s ease",
              zIndex: "9999999999 !important",
            }}
          >
            <RefreshCcw
              size={22}
              style={{
                transform: `rotate(${refreshing ? 360 : (pullDistance / threshold) * 180}deg)`,
                transition: refreshing
                  ? "transform 0.5s linear"
                  : "transform 0.2s ease",
                animation: refreshing ? "spin 1s linear infinite" : undefined,
              }}
            />
            <span>
              {refreshing
                ? "Refreshing..."
                : pullDistance >= threshold
                  ? "Release to refresh"
                  : "Pull to refresh"}
            </span>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={pullDistance > 0 ? `h-[60px] duration-300 transition-all` : "duration-300 h-0 transition-all"}>{children}</div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PullToRefresh;
