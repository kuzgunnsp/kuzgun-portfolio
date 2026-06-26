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
                  {/* Takımyıldız çizgileri için yarı saydam parıltılı gradyan */}
                  <linearGradient id="footer-constellation-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Yıldız düğümleri için radial parlama gradyanı */}
                  <radialGradient id="footer-star-glow-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#ecfeff" />
                    <stop offset="60%" stopColor="#0891b2" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Kanat Çırpma CSS Animasyonları */}
                <style>{`
                  @keyframes footerPlexusFlapLeft {
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
                  @keyframes footerPlexusFlapRight {
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
                  .footer-wing-near-plexus {
                    transform-origin: 90px 115px;
                    animation: footerPlexusFlapLeft 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                    transform-style: preserve-3d;
                  }
                  .footer-wing-far-plexus {
                    transform-origin: 98px 112px;
                    animation: footerPlexusFlapRight 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
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
                    stroke="url(#footer-constellation-line-grad)"
                    strokeWidth="1.4"
                  />

                  {/* Kuyruk Plexus Çizgileri */}
                  <path
                    d="M125,140 L140,150 L160,145 M125,140 L145,160 L170,155 M100,145 L145,160 L155,168 M100,145 L135,175 M160,145 L170,155 L155,168 L135,175 M140,150 L145,160 M140,150 L170,155 M145,160 L135,175"
                    stroke="url(#footer-constellation-line-grad)"
                    strokeWidth="1.2"
                  />

                  {/* Gövde Yıldız Düğümleri */}
                  <circle cx="30" cy="115" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" /> {/* Gaga Ucu */}
                  <circle cx="50" cy="105" r="3" fill="#ffffff" />
                  <circle cx="48" cy="115" r="3" fill="#ffffff" />
                  <circle cx="60" cy="95" r="3.5" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" /> {/* Taç */}
                  
                  {/* KUZGUN GÖZÜ */}
                  <circle cx="56" cy="103" r="6" fill="url(#footer-star-glow-grad)" />
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
                <g className="footer-wing-far-plexus">
                  <path
                    d="M98,112 L92,90 L86,65 L82,40 M86,65 L72,60 L82,40 M86,65 L70,50 L72,60 M86,65 L76,78 L62,62 L70,50 M92,90 L76,78 M92,90 L80,95 L76,78 M76,78 L58,75 L62,62 M80,95 L58,88 L76,78 M58,75 L58,88 M98,112 L80,95 M98,112 L64,100 L80,95 M58,88 L64,100"
                    stroke="url(#footer-constellation-line-grad)"
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
                <g className="footer-wing-near-plexus">
                  <path
                    d="M90,115 L110,85 L135,60 L155,30 M135,60 L150,55 L155,30 M135,60 L165,42 L150,55 M135,60 L142,70 L168,55 L165,42 M110,85 L128,85 L142,70 M128,85 L164,68 L142,70 M168,55 L164,68 M110,85 L115,98 L128,85 M115,98 L155,80 L128,85 M164,68 L155,80 M90,115 L115,98 M90,115 L128,102 L115,98 M155,80 L128,102 M128,102 L142,92 L155,80"
                    stroke="url(#footer-constellation-line-grad)"
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
