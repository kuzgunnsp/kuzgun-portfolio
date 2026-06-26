"use client";

import React, { useState, useEffect } from "react";

export default function DebugWidget() {
  const [scrollPos, setScrollPos] = useState(0);
  const [activeSection, setActiveSection] = useState("HERO");
  const [currentTime, setCurrentTime] = useState("");
  const [mockRam, setMockRam] = useState(24.1);
  const [isMinimized, setIsMinimized] = useState(false);

  // Time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll and active section listener
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPos(position);

      // Section detection
      const sections = ["projects", "skills", "workflow", "about", "contact"];
      let current = "HERO";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top is above 40% of viewport height
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.toUpperCase();
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock RAM fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMockRam((prev) => {
        const change = (Math.random() - 0.5) * 0.4;
        const newRam = prev + change;
        return parseFloat(Math.max(22.0, Math.min(26.0, newRam)).toFixed(1));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 cursor-pointer select-none group"
      >
        <div className="px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-900/80 text-[9px] font-mono text-zinc-500 flex items-center gap-2 shadow-lg hover:border-emerald-900/60 transition-all duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="group-hover:text-zinc-300 transition-colors">SYS: ACTIVE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none max-w-[200px]">
      <div className="rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-900/80 shadow-2xl p-4 font-mono text-[9px] text-zinc-500 flex flex-col gap-2.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2 text-[8px] text-zinc-600 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
            <span>KUZGUN_OS_MONITOR</span>
          </div>
          <button 
            onClick={() => setIsMinimized(true)}
            className="px-1 py-0.5 rounded hover:bg-zinc-900 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            [ - ]
          </button>
        </div>

        {/* System parameters */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">PAGE:</span>
            <span className="text-emerald-400 font-bold tracking-wider">{activeSection}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">SCRL:</span>
            <span className="text-zinc-300">{scrollPos}px</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">RAM:</span>
            <span className="text-zinc-300">{mockRam} MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">CONN:</span>
            <span className="text-emerald-500/70 font-semibold">SECURE (SSL)</span>
          </div>
        </div>

        {/* Footer info / system time */}
        <div className="border-t border-zinc-900/60 pt-2 flex items-center justify-between text-[8px] text-zinc-600">
          <span>UTC/LOC</span>
          <span className="text-zinc-400">{currentTime}</span>
        </div>
      </div>
    </div>
  );
}
