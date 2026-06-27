"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: t("Projeler", "Projects"), href: "#projects" },
    { name: t("Yetenekler", "Skills"), href: "#skills" },
    { name: t("Hakkımda", "About"), href: "#about" },
    { name: t("İletişim", "Contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative flex items-center justify-center w-8 h-8">
            {mounted ? (
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-all duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                fill="none"
              >
                <style>{`
                  @keyframes navCursorBlink {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                  }
                  .nav-cursor {
                    animation: navCursorBlink 1.1s step-end infinite;
                  }
                `}</style>
                {/* Sol Kanca (<) */}
                <path
                  d="M32,30 L14,50 L32,70"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Yanıp Sönen İmleç (_) */}
                <path
                  d="M42,70 L58,70"
                  className="nav-cursor"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Sağ Kanca (>) */}
                <path
                  d="M68,30 L86,50 L68,70"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
          <span className="text-sm font-semibold tracking-widest text-zinc-200 uppercase font-mono transition-colors duration-300 group-hover:text-white">
            KUZGUN
          </span>
        </a>

        {/* Masaüstü Gezinti Linkleri */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-medium tracking-wider text-zinc-400 uppercase transition-colors duration-300 hover:text-zinc-100 focus:outline-none font-mono"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="hidden lg:block px-4 py-2 rounded-full border border-zinc-800 text-xs font-medium tracking-wider text-zinc-300 uppercase transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-100 font-mono"
          >
            {t("İletişime Geç", "Get in Touch")}
          </a>
          <button
            onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
            className="px-2.5 py-1 rounded border border-zinc-800 text-[10px] font-mono text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer uppercase select-none shrink-0"
            aria-label="Toggle language"
          >
            {language === "tr" ? "en" : "tr"}
          </button>
        </nav>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none"
          aria-label="Menüyü Aç/Kapat"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil Açılır Menü */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-900 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wider text-zinc-400 uppercase font-mono hover:text-zinc-100 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-5 py-3 rounded-full border border-zinc-800 text-xs font-medium tracking-wider text-zinc-300 uppercase font-mono hover:bg-zinc-100 hover:text-zinc-950 transition-all"
          >
            {t("İletişime Geç", "Get in Touch")}
          </a>
          <button
            onClick={() => {
              setLanguage(language === "tr" ? "en" : "tr");
              setMobileMenuOpen(false);
            }}
            className="w-full text-center px-5 py-2.5 rounded-full border border-zinc-900 bg-zinc-950 text-[10px] font-medium tracking-wider text-zinc-400 uppercase font-mono hover:text-emerald-400 transition-all cursor-pointer"
          >
            LANGUAGE: {language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
