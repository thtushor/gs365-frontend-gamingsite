import React, { useState, useRef, useEffect } from "react";
import "./DraggableContainer.scss";
import { GripVertical } from "lucide-react";

interface DraggableContainerProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  children,
  initialPosition = { x: 30, y: 100 },
  className = "",
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef(initialPosition);

  // Update position when initialPosition prop changes
  useEffect(() => {
    initialPositionRef.current = initialPosition;
    setPosition(initialPosition);
  }, [initialPosition]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isDragging) {
        const maxX =
          window.innerWidth - (containerRef.current?.offsetWidth || 0);
        const maxY =
          window.innerHeight - (containerRef.current?.offsetHeight || 0);

        // Keep the element within bounds
        const newX = Math.min(position.x, maxX);
        const newY = Math.min(position.y, maxY);

        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDragging, position]);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging) {
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;

      // Get window dimensions
      const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 0);
      const maxY =
        window.innerHeight - (containerRef.current?.offsetHeight || 0);

      // Constrain position within window bounds
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const screenMidpoint = window.innerWidth / 2;
      const currentX = position.x;

      let newX;
      const offset = 40; // 40px offset
      if (currentX + containerWidth / 2 < screenMidpoint) {
        // Closer to the left side
        newX = offset;
      } else {
        // Closer to the right side
        newX = window.innerWidth - containerWidth - offset;
      }

      setPosition((prev) => ({ ...prev, x: newX }));
    }
  };

  // Mouse event handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`draggable-container ${className} ${
        isDragging ? "dragging" : ""
      }`}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: isDragging ? 1001 : 1000,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {isDragging && (
        <div className="drag-handle">
          <GripVertical size={20} />
        </div>
      )}
      {children}
    </div>
  );
};

export default DraggableContainer;
