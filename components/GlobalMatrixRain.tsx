"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GlobalMatrixRain() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Listen to global toggle event
  useEffect(() => {
    const handleToggle = () => {
      setIsActive((prev) => !prev);
    };
    window.addEventListener("toggle-global-matrix", handleToggle);
    return () => window.removeEventListener("toggle-global-matrix", handleToggle);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // Random starting offsets so they don't fall in a straight line initially
    }

    let animationId: number;

    const draw = () => {
      // Clear with high transparency for a trailing effect
      ctx.fillStyle = "rgba(9, 9, 11, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald green rain
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        // Draw the character
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Reset drop to top if it reaches bottom
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      // Clear canvas on disable
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] transition-opacity duration-1000"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
