"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
          <div className="relative flex items-center justify-center w-8 h-8">
            {mounted ? (
              <svg
                viewBox="0 0 200 200"
                className="h-9 w-9 text-zinc-100 transition-all duration-300 group-hover:text-white"
                fill="none"
                style={{ transformStyle: "preserve-3d" }}
              >
                <defs>
                  {/* Takımyıldız çizgileri için yarı saydam parıltılı gradyan */}
                  <linearGradient id="nav-constellation-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Yıldız düğümleri için radial parlama gradyanı */}
                  <radialGradient id="nav-star-glow-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#ecfeff" />
                    <stop offset="60%" stopColor="#0891b2" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Kanat Çırpma CSS Animasyonları */}
                <style>{`
                  @keyframes navPlexusFlapLeft {
                    0%, 100% {
                      transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg);
                    }
                    35% {
                      transform: rotateZ(30deg) rotateY(18deg) rotateX(-8deg);
                    }
                    50% {
                      transform: rotateZ(34deg) rotateY(8deg) rotateX(-4deg);
                    }
                    75% {
                      transform: rotateZ(8deg) rotateY(-20deg) rotateX(5deg);
                    }
                  }
                  @keyframes navPlexusFlapRight {
                    0%, 100% {
                      transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg);
                    }
                    35% {
                      transform: rotateZ(-30deg) rotateY(-18deg) rotateX(-8deg);
                    }
                    50% {
                      transform: rotateZ(-34deg) rotateY(-8deg) rotateX(-4deg);
                    }
                    75% {
                      transform: rotateZ(-8deg) rotateY(20deg) rotateX(5deg);
                    }
                  }
                  .nav-wing-near-plexus {
                    transform-origin: 90px 115px;
                    animation: navPlexusFlapLeft 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                  .nav-wing-far-plexus {
                    transform-origin: 98px 112px;
                    animation: navPlexusFlapRight 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    animation-delay: 0.08s;
                    transform-style: preserve-3d;
                    opacity: 0.7;
                  }
                `}</style>

                {/* ================= GÖVDE VE KUYRUK GRUBU (STATİK TAKIMYILDIZ) ================= */}
                <g style={{ transformStyle: "preserve-3d" }}>
                  {/* Gövde Plexus Çizgileri */}
                  <path
                    d="M30,115 L50,105 L48,115 Z M50,105 L56,103 L60,95 Z M50,105 L48,115 L60,115 M48,115 L56,103 L60,115 M56,103 L60,95 L72,100 L56,103 M72,100 L60,115 L70,130 L90,115 L72,100 M72,100 L90,115 L105,118 L72,100 M70,130 L85,145 L100,145 L90,115 M70,130 L90,115 L100,145 L70,130 M90,115 L105,118 L100,145 M105,118 L125,140 L100,145 Z M100,145 L102,155 L90,115 M102,155 L95,168 L88,178 M95,168 L102,178 M95,168 L95,182"
                    stroke="url(#nav-constellation-line-grad)"
                    strokeWidth="1.4"
                  />

                  {/* Kuyruk Plexus Çizgileri */}
                  <path
                    d="M125,140 L140,150 L160,145 M125,140 L145,160 L170,155 M100,145 L145,160 L155,168 M100,145 L135,175 M160,145 L170,155 L155,168 L135,175 M140,150 L145,160 M140,150 L170,155 M145,160 L135,175"
                    stroke="url(#nav-constellation-line-grad)"
                    strokeWidth="1.2"
                  />

                  {/* Gövde Yıldız Düğümleri */}
                  <circle cx="30" cy="115" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" /> {/* Gaga Ucu */}
                  <circle cx="50" cy="105" r="3" fill="#ffffff" />
                  <circle cx="48" cy="115" r="3" fill="#ffffff" />
                  <circle cx="60" cy="95" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" /> {/* Taç */}
                  
                  {/* KUZGUN GÖZÜ */}
                  <circle cx="56" cy="103" r="6" fill="url(#nav-star-glow-grad)" />
                  <circle cx="56" cy="103" r="2.8" fill="#ffffff" />

                  <circle cx="72" cy="100" r="3" fill="#ffffff" />
                  <circle cx="60" cy="115" r="3" fill="#ffffff" />
                  <circle cx="70" cy="130" r="3" fill="#ffffff" />
                  <circle cx="85" cy="145" r="3" fill="#ffffff" />
                  <circle cx="90" cy="115" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" /> {/* Omuz Yakın */}
                  <circle cx="98" cy="112" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] opacity-75" /> {/* Omuz Uzak */}
                  <circle cx="105" cy="118" r="3" fill="#ffffff" />
                  <circle cx="100" cy="145" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" />
                  <circle cx="125" cy="140" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                  <circle cx="102" cy="155" r="3" fill="#ffffff" />
                  <circle cx="95" cy="168" r="3" fill="#ffffff" />
                  <circle cx="88" cy="178" r="2.5" fill="#ffffff" />
                  <circle cx="102" cy="178" r="2.5" fill="#ffffff" />
                  <circle cx="95" cy="182" r="2.5" fill="#ffffff" />

                  {/* Kuyruk Düğümleri */}
                  <circle cx="140" cy="150" r="3" fill="#ffffff" />
                  <circle cx="145" cy="160" r="3" fill="#ffffff" />
                  <circle cx="160" cy="145" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                  <circle cx="170" cy="155" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                  <circle cx="155" cy="168" r="3" fill="#ffffff" />
                  <circle cx="135" cy="175" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" />
                </g>

                {/* ================= UZAK KANAT GRUBU ================= */}
                <g className="nav-wing-far-plexus">
                  <path
                    d="M98,112 L92,90 L86,65 L82,40 M86,65 L72,60 L82,40 M86,65 L70,50 L72,60 M86,65 L76,78 L62,62 L70,50 M92,90 L76,78 M92,90 L80,95 L76,78 M76,78 L58,75 L62,62 M80,95 L58,88 L76,78 M58,75 L58,88 M98,112 L80,95 M98,112 L64,100 L80,95 M58,88 L64,100"
                    stroke="url(#nav-constellation-line-grad)"
                    strokeWidth="1.2"
                  />
                  <circle cx="92" cy="90" r="3" fill="#ffffff" />
                  <circle cx="86" cy="65" r="3" fill="#ffffff" />
                  <circle cx="82" cy="40" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                  <circle cx="70" cy="50" r="3" fill="#ffffff" />
                  <circle cx="62" cy="62" r="3" fill="#ffffff" />
                  <circle cx="58" cy="75" r="3" fill="#ffffff" />
                  <circle cx="58" cy="88" r="3" fill="#ffffff" />
                  <circle cx="64" cy="100" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                  <circle cx="80" cy="95" r="3" fill="#ffffff" />
                  <circle cx="76" cy="78" r="3" fill="#ffffff" />
                  <circle cx="72" cy="60" r="3" fill="#ffffff" />
                </g>

                {/* ================= YAKIN KANAT GRUBU ================= */}
                <g className="nav-wing-near-plexus">
                  <path
                    d="M90,115 L110,85 L135,60 L155,30 M135,60 L150,55 L155,30 M135,60 L165,42 L150,55 M135,60 L142,70 L168,55 L165,42 M110,85 L128,85 L142,70 M128,85 L164,68 L142,70 M168,55 L164,68 M110,85 L115,98 L128,85 M115,98 L155,80 L128,85 M164,68 L155,80 M90,115 L115,98 M90,115 L128,102 L115,98 M155,80 L128,102 M128,102 L142,92 L155,80"
                    stroke="url(#nav-constellation-line-grad)"
                    strokeWidth="1.4"
                  />
                  <circle cx="110" cy="85" r="3" fill="#ffffff" />
                  <circle cx="135" cy="60" r="3" fill="#ffffff" />
                  <circle cx="155" cy="30" r="4" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                  <circle cx="165" cy="42" r="3" fill="#ffffff" />
                  <circle cx="168" cy="55" r="3" fill="#ffffff" />
                  <circle cx="164" cy="68" r="3" fill="#ffffff" />
                  <circle cx="155" cy="80" r="3" fill="#ffffff" />
                  <circle cx="142" cy="92" r="3" fill="#ffffff" />
                  <circle cx="128" cy="102" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                  <circle cx="115" cy="98" r="3" fill="#ffffff" />
                  <circle cx="128" cy="85" r="3" fill="#ffffff" />
                  <circle cx="142" cy="70" r="3" fill="#ffffff" />
                  <circle cx="150" cy="55" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                </g>
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
