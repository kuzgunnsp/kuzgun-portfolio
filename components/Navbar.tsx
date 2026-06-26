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
              <path d="M50 15 L25 45 L50 35 L75 45 Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M25 45 L50 85 L50 35 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M75 45 L50 85 L50 35 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M25 45 L12 60 L32 50 Z" />
              <path d="M75 45 L88 60 L68 50 Z" />
              <circle cx="50" cy="32" r="1.5" fill="currentColor" />
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
