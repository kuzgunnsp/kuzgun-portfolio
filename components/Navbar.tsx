"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Projeler", href: "#projects" },
    { name: "Yetenekler", href: "#skills" },
    { name: "Hakkımda", href: "#about" },
    { name: "İletişim", href: "#contact" },
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
        {/* Logo ve Marka */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="h-8 w-8 text-zinc-100 transition-transform duration-500 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Geometrik Kuzgun Logosu */}
              {/* Baş & Gaga */}
              <polygon points="50,15 44,24 50,32 56,24" fill="currentColor" fillOpacity="0.12" />
              {/* Sol Kanat */}
              <polygon points="40,28 22,12 8,55 32,48" fill="currentColor" fillOpacity="0.05" />
              {/* Sağ Kanat */}
              <polygon points="60,28 78,12 92,55 68,48" fill="currentColor" fillOpacity="0.05" />
              {/* Gövde */}
              <polygon points="50,32 32,48 50,68 68,48" fill="currentColor" fillOpacity="0.08" />
              {/* Kuyruk */}
              <polygon points="50,68 38,74 50,92 62,74" fill="currentColor" fillOpacity="0.1" />

              {/* Kontur Çizgileri */}
              <path d="M50 15 L44 24 L50 32 L56 24 Z" />
              <path d="M40 28 L22 12 L8 55 L32 48 Z" />
              <path d="M60 28 L78 12 L92 55 L68 48 Z" />
              <path d="M50 68 L38 74 L50 92 L62 74 Z" />
              <path d="M50 32 L50 68" />
            </svg>
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
            İletişime Geç
          </a>
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
            İletişime Geç
          </a>
        </div>
      </div>
    </header>
  );
}
