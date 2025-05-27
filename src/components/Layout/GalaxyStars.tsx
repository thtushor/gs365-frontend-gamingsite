import React, { useRef, useEffect } from "react";

const STAR_COUNT = 120;
const STAR_COLOR = "rgba(255,255,255,0.85)";
const STAR_MIN_RADIUS = 0.5;
const STAR_MAX_RADIUS = 1.8;
const STAR_SPEED = 0.15;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Star {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  twinkle: number;
}

const GalaxyStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: randomBetween(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
      dx: randomBetween(-STAR_SPEED, STAR_SPEED),
      dy: randomBetween(-STAR_SPEED, STAR_SPEED),
      twinkle: Math.random() * Math.PI * 2,
    }));

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      for (const star of stars.current) {
        // Twinkle effect
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinkle + Date.now() * 0.002);
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r * twinkle, 0, Math.PI * 2);
        ctx!.fillStyle = STAR_COLOR;
        ctx!.shadowColor = STAR_COLOR;
        ctx!.shadowBlur = 8 * twinkle;
        ctx!.fill();
        // Move star
        star.x += star.dx;
        star.y += star.dy;
        // Wrap around screen
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="galaxy-stars-overlay" />;
};

export default GalaxyStars;
