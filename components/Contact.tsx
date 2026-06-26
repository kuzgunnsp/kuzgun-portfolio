"use client";

import React, { useState, useRef } from "react";

// Platform verileri
const platforms = [
  {
    name: "LinkedIn",
    tagline: "Profesyonel Ağ & Bağlantılar",
    url: "https://www.linkedin.com/in/mustafadumannn/",
    glowColor: "rgba(59, 130, 246, 0.12)", // Blue
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Bionluk",
    tagline: "Yerel Freelance İş Birlikleri",
    url: "https://bionluk.com/mustafadumannn",
    glowColor: "rgba(16, 185, 129, 0.12)", // Emerald
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Upwork",
    tagline: "Global Projeler & Kurumsal Kontratlar",
    url: "https://www.upwork.com/freelancers/~019c51a2034bf5a868",
    glowColor: "rgba(245, 158, 11, 0.12)", // Amber
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Fiverr",
    tagline: "Uluslararası Hizmetler & Bireysel İşler",
    url: "https://www.fiverr.com/users/mustafadumann",
    glowColor: "rgba(168, 85, 247, 0.12)", // Purple
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Tekil Sosyal Platform Kartı Bileşeni - Spotlight Efektli
function PlatformCard({ platform }: { platform: typeof platforms[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
      className="relative p-[1px] rounded-2xl overflow-hidden bg-zinc-900/30 border border-zinc-900/40 flex flex-col justify-between transition-all duration-300 group hover:scale-[1.01]"
    >
      {/* Moving Border Glow */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* Ambient Glow behind card */}
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${platform.glowColor}, transparent 70%)`,
        }}
      />

      {/* Card Body */}
      <div className="relative z-10 w-full h-full rounded-[15px] bg-zinc-950/95 p-6 flex flex-col justify-between gap-6 backdrop-blur-md">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-zinc-900/45 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-zinc-900/80 transition-all duration-300">
            {platform.icon}
          </div>
          <div className="text-zinc-600 group-hover:text-zinc-300 transition-colors">
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-sm md:text-base font-bold text-white tracking-tight">
            {platform.name}
          </h4>
          <p className="text-[10px] md:text-[11px] text-zinc-500 leading-normal">
            {platform.tagline}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "hello@kuzgun.dev";
  
  const emailCardRef = useRef<HTMLDivElement>(null);
  const [emailMousePos, setEmailMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleEmailMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!emailCardRef.current) return;
    const rect = emailCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEmailMousePos({ x, y });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-zinc-900/30 relative overflow-hidden">
      {/* Arka Plan Ambient Radial Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 06 // İLETİŞİM ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bir Sonraki Fikri <br />
            <span className="text-zinc-500">Birlikte İnşa Edelim.</span>
          </h2>
        </div>

        {/* İletişim Izgarası */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-24">
          {/* Sol Kısım: E-posta Kopyalama Kartı */}
          <div className="w-full lg:w-5/12 p-[1px] rounded-2xl bg-zinc-900/30 border border-zinc-900/40 overflow-hidden">
            <div className="w-full h-full rounded-[15px] bg-zinc-950/95 p-8 md:p-10 flex flex-col justify-between gap-8 backdrop-blur-md">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Doğrudan İletişim Hattı
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Aklınızda bir proje mi var? Mobil uygulama, web platformu veya Unity tabanlı bir oyun fikri... Benimle doğrudan e-posta yoluyla iletişime geçebilir, fikirlerinizi paylaşabilirsiniz. En geç 24 saat içinde dönüş yaparım.
                </p>
              </div>

              {/* E-posta Kartı (Kopyalanabilir, Spotlight'lı ve Glassmorphic) */}
              <div
                ref={emailCardRef}
                onMouseMove={handleEmailMouseMove}
                onClick={handleCopyEmail}
                style={{
                  "--mouse-x": `${emailMousePos.x}px`,
                  "--mouse-y": `${emailMousePos.y}px`,
                } as React.CSSProperties}
                className="relative p-[1px] rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all duration-300 group hover:scale-[1.01]"
              >
                {/* Border Spotlight */}
                <div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.12), transparent 80%)`,
                  }}
                />

                {/* E-posta Kart Gövdesi */}
                <div className="relative z-10 rounded-[11px] bg-zinc-950/90 p-5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                      E-POSTA ADRESİ (KOPYALAMAK İÇİN TIKLAYIN)
                    </span>
                    <span className="text-xs md:text-sm font-bold font-mono text-zinc-100 group-hover:text-white transition-colors">
                      {emailAddress}
                    </span>
                  </div>
                  <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Kopyalandı Bildirimi */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-zinc-900 text-zinc-100 text-[10px] font-mono rounded-lg border border-zinc-800 shadow-2xl transition-all duration-300 flex items-center gap-2 ${
                    copied
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <span className="text-emerald-400">✓</span>
                  E-posta adresi kopyalandı.
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Platform Yönlendirme Kartları */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </div>
        </div>

        {/* Alt Footer Barı */}
        <div className="border-t border-zinc-900/60 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-3">
            {mounted ? (
              <svg
                viewBox="0 0 200 200"
                className="h-6 w-6 text-zinc-700 transition-all duration-300 hover:text-zinc-400"
                fill="none"
                style={{ transformStyle: "preserve-3d" }}
              >
                <defs>
                  {/* Gövde ve kafa için yanardöner koyu mor/indigo gradyan */}
                  <linearGradient id="footer-raven-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#080711" />
                    <stop offset="30%" stopColor="#121026" />
                    <stop offset="70%" stopColor="#1c1a3a" />
                    <stop offset="100%" stopColor="#040308" />
                  </linearGradient>

                  {/* Sol kanat için dışa doğru yayılan metalik gradyan */}
                  <linearGradient id="footer-raven-wing-left-grad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#0f0e22" />
                    <stop offset="50%" stopColor="#25224e" />
                    <stop offset="85%" stopColor="#111024" />
                    <stop offset="100%" stopColor="#06050b" />
                  </linearGradient>

                  {/* Sağ kanat için dışa doğru yayılan metalik gradyan */}
                  <linearGradient id="footer-raven-wing-right-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#0f0e22" />
                    <stop offset="50%" stopColor="#25224e" />
                    <stop offset="85%" stopColor="#111024" />
                    <stop offset="100%" stopColor="#06050b" />
                  </linearGradient>

                  {/* Tüy parıltıları için yarı saydam ışık gradyanı */}
                  <linearGradient id="footer-feather-highlight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Amber göz ışıması için radial gradyan */}
                  <radialGradient id="footer-eye-glow-radial" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                    <stop offset="40%" stopColor="#d97706" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Kanat Çırpma CSS Animasyonları */}
                <style>{`
                  @keyframes footerOrganicFlapLeft {
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
                  @keyframes footerOrganicFlapRight {
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
                  .footer-wing-left-organic {
                    transform-origin: 88px 62px;
                    animation: footerOrganicFlapLeft 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                  .footer-wing-right-organic {
                    transform-origin: 112px 62px;
                    animation: footerOrganicFlapRight 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                `}</style>

                {/* ================= GÖVDE, BAŞ VE KUYRUK GRUBU (STATİK) ================= */}
                <g style={{ transformStyle: "preserve-3d" }}>
                  {/* Kama Kuyruk */}
                  <g opacity="0.85">
                    <path d="M90,118 C80,135 83,155 93,178 C96,170 99,145 90,118 Z" fill="url(#footer-raven-body-grad)" stroke="#312e81" strokeWidth="0.5" strokeOpacity="0.3" />
                    <path d="M110,118 C120,135 117,155 107,178 C104,170 101,145 110,118 Z" fill="url(#footer-raven-body-grad)" stroke="#312e81" strokeWidth="0.5" strokeOpacity="0.3" />
                    <path d="M92,118 C88,135 90,165 100,185 C110,165 112,135 108,118 Z" fill="url(#footer-raven-body-grad)" stroke="#4f46e5" strokeWidth="0.6" strokeOpacity="0.4" />
                  </g>

                  {/* Ana Gövde Silüeti */}
                  <path
                    d="M100,10 L95,24 C92,24 91,33 93,38 C95,43 91,52 88,62 C85,72 84,102 90,118 C90,118 78,142 100,185 C122,142 110,118 110,118 C116,102 115,72 112,62 C109,52 105,43 107,38 C109,33 108,24 105,24 L100,10 Z"
                    fill="url(#footer-raven-body-grad)"
                    stroke="#1e1b4b"
                    strokeWidth="0.8"
                  />

                  {/* Sakalsı Boğaz Tüyleri */}
                  <path
                    d="M94,38 C96,43 96,49 100,54 C104,49 104,43 106,38 C102,40 98,40 94,38 Z"
                    fill="url(#footer-feather-highlight-grad)"
                    stroke="#4f46e5"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />

                  {/* CANLI KUZGUN GÖZLERİ */}
                  <circle cx="96" cy="28" r="2.5" fill="url(#footer-eye-glow-radial)" />
                  <circle cx="96" cy="28" r="1.0" fill="#fbbf24" />
                  <circle cx="104" cy="28" r="2.5" fill="url(#footer-eye-glow-radial)" />
                  <circle cx="104" cy="28" r="1.0" fill="#fbbf24" />
                </g>

                {/* ================= SOL KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                <g className="footer-wing-left-organic">
                  <path d="M88,62 C75,50 55,30 30,20 C25,24 28,28 32,32 C50,45 70,58 88,68 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#1e1b4b" strokeWidth="0.5" />
                  <path d="M30,20 C18,21 10,23 4,26 C3,28 5,30 12,31 C20,31 28,28 32,25 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M31,23 C19,26 11,32 6,38 C5,40 7,42 15,41 C24,39 31,33 34,29 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M33,26 C21,32 14,41 9,50 C8,52 11,53 18,50 C27,46 33,39 36,34 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M35,30 C24,39 18,50 14,62 C13,64 16,65 23,60 C31,54 36,46 38,39 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M38,35 C28,46 23,59 20,72 C19,74 22,75 29,69 C36,62 40,52 41,44 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />

                  {/* İkincil Tüyler */}
                  <path d="M41,40 C32,53 28,68 27,81 C26,83 29,84 36,76 C43,68 46,56 46,47 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M46,45 C38,58 35,74 35,87 C35,89 38,90 44,81 C50,71 52,58 51,51 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M52,50 C46,63 43,78 44,91 C44,93 47,93 53,83 C58,73 59,60 57,55 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M59,54 C54,66 52,79 54,92 C54,94 57,94 62,84 C66,74 66,63 64,58 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M66,57 C62,68 61,79 63,91 C63,93 66,93 70,83 C73,73 73,64 71,61 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M74,60 C71,69 70,78 72,88 C72,90 75,90 78,80 C81,71 81,65 79,62 Z" fill="url(#footer-raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.3" />
                </g>

                {/* ================= SAĞ KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                <g className="footer-wing-right-organic">
                  <path d="M112,62 C125,50 145,30 170,20 C175,24 172,28 168,32 C150,45 130,58 112,68 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#1e1b4b" strokeWidth="0.5" />
                  <path d="M170,20 C182,21 190,23 196,26 C197,28 195,30 188,31 C180,31 172,28 168,25 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M169,23 C181,26 189,32 194,38 C195,40 193,42 185,41 C176,39 169,33 166,29 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M167,26 C179,32 186,41 191,50 C192,52 189,53 182,50 C173,46 167,39 164,34 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M165,30 C176,39 182,50 186,62 C187,64 184,65 177,60 C169,54 164,46 162,39 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M162,35 C172,46 177,59 180,72 C181,74 178,75 171,69 C164,62 160,52 159,44 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />

                  {/* İkincil Tüyler */}
                  <path d="M159,40 C168,53 172,68 173,81 C174,83 171,84 164,76 C157,68 154,56 154,47 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M154,45 C162,58 165,74 165,87 C165,89 162,90 156,81 C150,71 148,58 149,51 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M148,50 C154,63 157,78 156,91 C156,93 153,93 147,83 C142,73 141,60 143,55 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M141,54 C146,66 148,79 146,92 C146,94 143,94 138,84 C134,74 134,63 136,58 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M134,57 C138,68 139,79 137,91 C137,93 134,93 130,83 C127,73 127,64 129,61 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                  <path d="M126,60 C129,69 130,78 128,88 C128,90 125,90 122,80 C119,71 119,65 121,62 Z" fill="url(#footer-raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.3" />
                </g>
              </svg>
            ) : (
              <div className="w-6 h-6" />
            )}
            <span>© {new Date().getFullYear()} KUZGUN. Tüm hakları saklıdır.</span>
          </div>
          <span className="text-center sm:text-right">
            Next.js & TailwindCSS v4 ile tasarlanıp kodlandı.
          </span>
        </div>
      </div>
    </section>
  );
}
