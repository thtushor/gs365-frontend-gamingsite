import React, { useRef, useState, useEffect } from "react";

import "./SupportUs.scss";
import { Logo } from "../Logo/Logo";
import SupportPanel from "./SupportPanel";
// import SupportPanel from "./SupportPanel";

const BUTTON_SIZE = 64;

const SupportUs: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPos, setButtonPos] = useState({
    x: window.innerWidth - BUTTON_SIZE - 30,
    y: window.innerHeight - BUTTON_SIZE - 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Ensure button stays in viewport on resize
    const handleResize = () => {
      setButtonPos((pos) => ({
        x: Math.min(pos.x, window.innerWidth - BUTTON_SIZE),
        y: Math.min(pos.y, window.innerHeight - BUTTON_SIZE),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setButtonPos({
      x: Math.min(
        Math.max(0, e.clientX - dragOffset.x),
        window.innerWidth - BUTTON_SIZE
      ),
      y: Math.min(
        Math.max(0, e.clientY - dragOffset.y),
        window.innerHeight - BUTTON_SIZE
      ),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
    }
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    setButtonPos({
      x: Math.min(
        Math.max(0, e.touches[0].clientX - dragOffset.x),
        window.innerWidth - BUTTON_SIZE
      ),
      y: Math.min(
        Math.max(0, e.touches[0].clientY - dragOffset.y),
        window.innerHeight - BUTTON_SIZE
      ),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <SupportPanel open={open} onClose={handleClose} />}
      <button
        ref={buttonRef}
        className="support-us-floating-button"
        style={{
          position: "fixed",
          left: buttonPos.x,
          top: buttonPos.y,
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          zIndex: 1000,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        aria-label="Support Us"
      >
        <div className="icon-container">
          <Logo />
        </div>
      </button>
    </>
  );
};

export default SupportUs;
