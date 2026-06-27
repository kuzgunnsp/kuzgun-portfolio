"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function CustomCursor() {
  // Required i18n context hook call
  const { language } = useLanguage();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the current screen uses touch/coarse pointer
    const checkMobile = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(coarsePointer);
    };

    checkMobile();
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === "function") {
        const hoverElement = target.closest(
          "button, a, input, select, [class*='cursor-pointer']"
        );
        setIsHovering(!!hoverElement);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;

    const updatePosition = () => {
      // Linear interpolation (lerp) for smooth lag-behind spring effect
      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.25;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.25;

      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Disable the default cursor on screens supporting fine pointer control */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body, a, button, input, select, [class*='cursor-pointer'] {
            cursor: none !important;
          }
        }
      `}} />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pointer-events-none z-[9999] transition-transform duration-200 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
        }}
      />

      {/* Outer Glowing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[var(--color-accent)] pointer-events-none z-[9998] transition-[width,height,background-color,opacity] duration-300 ease-out"
        style={{
          width: isHovering ? "44px" : "24px",
          height: isHovering ? "44px" : "24px",
          backgroundColor: isHovering ? "rgba(var(--color-accent-rgb), 0.15)" : "transparent",
          opacity: isVisible ? (isHovering ? 0.95 : 0.6) : 0,
        }}
      />
    </>
  );
}
