import React, { useState } from "react";
import "./SupportUs.scss";
import { Logo } from "../Logo/Logo";
import SupportPanel from "./SupportPanel";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

const BUTTON_SIZE = 64;

const SupportUs: React.FC = () => {
  const [position, setPosition] = useState({
    x: window.innerWidth - BUTTON_SIZE - 30,
    y: window.innerHeight - BUTTON_SIZE - 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    setPosition({ x: data.x, y: data.y });
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        <Draggable
          handle=".support-us-floating-button"
          bounds="parent"
          position={position}
          onStart={handleDragStart}
          onStop={handleDragStop}
          defaultPosition={{ x: position.x, y: position.y }}
        >
          <div style={{ position: "absolute", pointerEvents: "auto" }}>
            <button
              className="support-us-floating-button"
              style={{
                width: BUTTON_SIZE,
                height: BUTTON_SIZE,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
              }}
              onClick={handleClick}
              aria-label="Support Us"
            >
              <div className="icon-container">
                <Logo />
              </div>
            </button>
          </div>
        </Draggable>
      </div>
    </>
  );
};

export default SupportUs;
