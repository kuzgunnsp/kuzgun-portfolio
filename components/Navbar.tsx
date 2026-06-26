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
                  {/* Gövde ve kafa için yanardöner koyu mor/indigo gradyan */}
                  <linearGradient id="nav-raven-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#080711" />
                    <stop offset="30%" stopColor="#121026" />
                    <stop offset="70%" stopColor="#1c1a3a" />
                    <stop offset="100%" stopColor="#040308" />
                  </linearGradient>

                  {/* Sol kanat için dışa doğru yayılan metalik gradyan */}
                  <linearGradient id="nav-raven-wing-left-grad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#0f0e22" />
                    <stop offset="50%" stopColor="#25224e" />
                    <stop offset="85%" stopColor="#111024" />
                    <stop offset="100%" stopColor="#06050b" />
                  </linearGradient>

                  {/* Sağ kanat için dışa doğru yayılan metalik gradyan */}
                  <linearGradient id="nav-raven-wing-right-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#0f0e22" />
                    <stop offset="50%" stopColor="#25224e" />
                    <stop offset="85%" stopColor="#111024" />
                    <stop offset="100%" stopColor="#06050b" />
                  </linearGradient>

                  {/* Tüy parıltıları için yarı saydam ışık gradyanı */}
                  <linearGradient id="nav-feather-highlight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Amber göz ışıması için radial gradyan */}
                  <radialGradient id="nav-eye-glow-radial" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                    <stop offset="40%" stopColor="#d97706" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Kanat Çırpma CSS Animasyonları */}
                <style>{`
                  @keyframes navOrganicFlapLeft {
                    0%, 100% {
                      transform: rotateZ(18deg) rotateY(-12deg) rotateX(2deg);
                    }
                    35% {
                      transform: rotateZ(-20deg) rotateY(25deg) rotateX(-8deg);
                    }
                    50% {
                      transform: rotateZ(-22deg) rotateY(12deg) rotateX(-2deg);
                    }
                    75% {
                      transform: rotateZ(8deg) rotateY(-28deg) rotateX(8deg);
                    }
                  }
                  @keyframes navOrganicFlapRight {
                    0%, 100% {
                      transform: rotateZ(-18deg) rotateY(12deg) rotateX(2deg);
                    }
                    35% {
                      transform: rotateZ(20deg) rotateY(-25deg) rotateX(-8deg);
                    }
                    50% {
                      transform: rotateZ(22deg) rotateY(-12deg) rotateX(-2deg);
                    }
                    75% {
                      transform: rotateZ(-8deg) rotateY(28deg) rotateX(8deg);
                    }
                  }
                  .nav-wing-left-organic {
                    transform-origin: 88px 62px;
                    animation: navOrganicFlapLeft 2.0s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                  .nav-wing-right-organic {
                    transform-origin: 112px 62px;
                    animation: navOrganicFlapRight 2.0s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                `}</style>

                {/* ================= GÖVDE, BAŞ VE KUYRUK GRUBU (STATİK) ================= */}
                <g style={{ transformStyle: "preserve-3d" }}>
                  {/* Kama Kuyruk */}
                  <g opacity="0.85">
                    <path d="M90,118 C80,135 83,155 93,178 C96,170 99,145 90,118 Z" fill="url(#nav-raven-body-grad)" stroke="#312e81" strokeWidth="0.5" strokeOpacity="0.3" />
                    <path d="M110,118 C120,135 117,155 107,178 C104,170 101,145 110,118 Z" fill="url(#nav-raven-body-grad)" stroke="#312e81" strokeWidth="0.5" strokeOpacity="0.3" />
                    <path d="M92,118 C88,135 90,165 100,185 C110,165 112,135 108,118 Z" fill="url(#nav-raven-body-grad)" stroke="#4f46e5" strokeWidth="0.6" strokeOpacity="0.4" />
                  </g>

                  {/* Ana Gövde Silüeti */}
                  <path
                    d="M100,10 L95,24 C92,24 91,33 93,38 C95,43 91,52 88,62 C85,72 84,102 90,118 C90,118 78,142 100,185 C122,142 110,118 110,118 C116,102 115,72 112,62 C109,52 105,43 107,38 C109,33 108,24 105,24 L100,10 Z"
                    fill="url(#nav-raven-body-grad)"
                    stroke="#1e1b4b"
                    strokeWidth="0.8"
                  />

                  {/* Sakalsı Boğaz Tüyleri */}
                  <path
                    d="M94,38 C96,43 96,49 100,54 C104,49 104,43 106,38 C102,40 98,40 94,38 Z"
                    fill="url(#nav-feather-highlight-grad)"
                    stroke="#4f46e5"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />

                  {/* CANLI KUZGUN GÖZLERİ */}
                  <circle cx="96" cy="28" r="2.5" fill="url(#nav-eye-glow-radial)" />
                  <circle cx="96" cy="28" r="1.0" fill="#fbbf24" />
                  <circle cx="104" cy="28" r="2.5" fill="url(#nav-eye-glow-radial)" />
                  <circle cx="104" cy="28" r="1.0" fill="#fbbf24" />
                </g>

                {/* ================= SOL KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                <g className="nav-wing-left-organic">
                  <path d="M88,62 C75,50 55,30 30,20 C25,24 28,28 32,32 C50,45 70,58 88,68 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#1e1b4b" strokeWidth="0.5" />
                  <path d="M30,20 C18,21 10,23 4,26 C3,28 5,30 12,31 C20,31 28,28 32,25 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M31,23 C19,26 11,32 6,38 C5,40 7,42 15,41 C24,39 31,33 34,29 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M33,26 C21,32 14,41 9,50 C8,52 11,53 18,50 C27,46 33,39 36,34 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M35,30 C24,39 18,50 14,62 C13,64 16,65 23,60 C31,54 36,46 38,39 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M38,35 C28,46 23,59 20,72 C19,74 22,75 29,69 C36,62 40,52 41,44 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />

                  {/* İkincil Tüyler */}
                  <path d="M41,40 C32,53 28,68 27,81 C26,83 29,84 36,76 C43,68 46,56 46,47 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M46,45 C38,58 35,74 35,87 C35,89 38,90 44,81 C50,71 52,58 51,51 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M52,50 C46,63 43,78 44,91 C44,93 47,93 53,83 C58,73 59,60 57,55 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M59,54 C54,66 52,79 54,92 C54,94 57,94 62,84 C66,74 66,63 64,58 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M66,57 C62,68 61,79 63,91 C63,93 66,93 70,83 C73,73 73,64 71,61 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M74,60 C71,69 70,78 72,88 C72,90 75,90 78,80 C81,71 81,65 79,62 Z" fill="url(#nav-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                </g>

                {/* ================= SAĞ KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                <g className="nav-wing-right-organic">
                  <path d="M112,62 C125,50 145,30 170,20 C175,24 172,28 168,32 C150,45 130,58 112,68 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#1e1b4b" strokeWidth="0.5" />
                  <path d="M170,20 C182,21 190,23 196,26 C197,28 195,30 188,31 C180,31 172,28 168,25 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M169,23 C181,26 189,32 194,38 C195,40 193,42 185,41 C176,39 169,33 166,29 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M167,26 C179,32 186,41 191,50 C192,52 189,53 182,50 C173,46 167,39 164,34 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M165,30 C176,39 182,50 186,62 C187,64 184,65 177,60 C169,54 164,46 162,39 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M162,35 C172,46 177,59 180,72 C181,74 178,75 171,69 C164,62 160,52 159,44 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />

                  {/* İkincil Tüyler */}
                  <path d="M159,40 C168,53 172,68 173,81 C174,83 171,84 164,76 C157,68 154,56 154,47 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M154,45 C162,58 165,74 165,87 C165,89 162,90 156,81 C150,71 148,58 149,51 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M148,50 C154,63 157,78 156,91 C156,93 153,93 147,83 C142,73 141,60 143,55 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M141,54 C146,66 148,79 146,92 C146,94 143,94 138,84 C134,74 134,63 136,58 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M134,57 C138,68 139,79 137,91 C137,93 134,93 130,83 C127,73 127,64 129,61 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M126,60 C129,69 130,78 128,88 C128,90 125,90 122,80 C119,71 119,65 121,62 Z" fill="url(#nav-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
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
