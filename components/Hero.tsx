"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  // 3D Tilt / Mouse Takip Durum Yönetimi
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Farenin kartın merkezine olan uzaklığını hesapla (-0.5 ile 0.5 arasında)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // X ekseninde yukarı/aşağı eğilme, Y ekseninde sol/sağ dönme açıları (Maksimum 25 derece)
    setRotate({
      x: -y * 30,
      y: x * 30,
    });
  };

  const handleMouseLeave = () => {
    // Fare alandan çıktığında pürüzsüzce eski konumuna sıfırla
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* 1. Altyapı: Geometrik Izgara (Grid) Arka Planı ve Sönümleme Maskesi */}
      <div className="absolute inset-0 z-0 bg-grid-pattern bg-grid-mask opacity-40 pointer-events-none"></div>

      {/* 2. Altyapı: Yumuşak Ortam Işıkları (Ambient Radial Gradients) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow-reverse"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* SOL SÜTUN: Zengin Tipografi ve İçerik */}
        <div className="w-full lg:w-[55%] flex flex-col items-start gap-8 order-2 lg:order-1">
          {/* Monospace Etiket */}
          <div className="animate-fade-in flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-[10px] md:text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 01 // YAZILIM & TASARIM ]
            </span>
          </div>

          {/* Unvan ve Büyük Gradyan Başlık */}
          <div className="flex flex-col gap-4 w-full">
            <p className="animate-slide-up text-xs md:text-sm font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Mobile & Web Developer // UI Designer
            </p>
            <h1 className="animate-slide-up text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] [animation-delay:200ms] text-white">
              Temiz Kod. <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                Rafine Tasarım.
              </span>
            </h1>
          </div>

          {/* Kısa Tanıtım / Vizyon Cümlesi */}
          <p className="animate-slide-up text-sm md:text-base lg:text-lg text-zinc-400 max-w-xl leading-relaxed [animation-delay:400ms]">
            Kuzgun markası altında, karmaşık yazılım problemlerini sade, yüksek performanslı ve estetik dijital ürünlere dönüştürüyorum. Flutter, SwiftUI, Unity ve Next.js teknolojileriyle sınırları zorlayan deneyimler inşa ediyorum.
          </p>

          {/* Yönlendirme Butonları */}
          <div className="animate-slide-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto [animation-delay:600ms] mt-4">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 text-xs md:text-sm font-bold tracking-wider text-center uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98] font-mono shadow-lg shadow-black/25"
            >
              Projeleri İncele
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass-panel text-zinc-300 text-xs md:text-sm font-bold tracking-wider text-center uppercase transition-all duration-300 hover:bg-zinc-900/60 hover:text-white hover:border-zinc-700/80 font-mono"
            >
              İletişime Geç
            </a>
          </div>
        </div>

        {/* SAĞ SÜTUN: İnteraktif 3D Çizgisel SVG Kuzgun Origami Modeli */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full lg:w-[45%] flex items-center justify-center order-1 lg:order-2 cursor-grab active:cursor-grabbing py-8 lg:py-0"
          style={{ perspective: "1000px" }}
        >
          {/* 3D Dönüşüm Kapsayıcısı */}
          <div
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Havada Asılı Kalma (Bobbing) Animasyonlu Gövde */}
            <div className="w-full h-full animate-[bounce_6s_ease-in-out_infinite] flex items-center justify-center">
              
              {mounted ? (
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-zinc-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
                  fill="none"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <defs>
                    {/* Takımyıldız çizgileri için yarı saydam parıltılı gradyan */}
                    <linearGradient id="constellation-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                    </linearGradient>

                    {/* Yıldız düğümleri için radial parlama gradyanı */}
                    <radialGradient id="star-glow-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#ecfeff" />
                      <stop offset="60%" stopColor="#0891b2" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                    </radialGradient>

                    {/* Yıldız parıltısı için SVG filtresi */}
                    <filter id="star-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 3D Kanat Çırpma CSS Animasyonları */}
                  <style>{`
                    @keyframes plexusFlapLeft {
                      0%, 100% {
                        /* Kanat yukarıda ve hafif arkada */
                        transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg);
                      }
                      35% {
                        /* Güçlü aşağı vuruş: aşağı iner ve öne bükülür */
                        transform: rotateZ(30deg) rotateY(18deg) rotateX(-8deg);
                      }
                      50% {
                        /* En alt nokta: hafifçe düzleşir */
                        transform: rotateZ(34deg) rotateY(8deg) rotateX(-4deg);
                      }
                      75% {
                        /* Yukarı vuruş: kanat geriye bükülür ve yukarı kalkar */
                        transform: rotateZ(8deg) rotateY(-20deg) rotateX(5deg);
                      }
                    }
                    @keyframes plexusFlapRight {
                      0%, 100% {
                        /* Kanat yukarıda */
                        transform: rotateZ(0deg) rotateY(0deg) rotateX(0deg);
                      }
                      35% {
                        /* Güçlü aşağı vuruş: aşağı iner ve öne bükülür */
                        transform: rotateZ(-30deg) rotateY(-18deg) rotateX(-8deg);
                      }
                      50% {
                        /* En alt nokta */
                        transform: rotateZ(-34deg) rotateY(-8deg) rotateX(-4deg);
                      }
                      75% {
                        /* Yukarı vuruş: geriye bükülüp kalkar */
                        transform: rotateZ(-8deg) rotateY(20deg) rotateX(5deg);
                      }
                    }
                    .wing-near-plexus {
                      transform-origin: 90px 115px;
                      animation: plexusFlapLeft 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                      transform-style: preserve-3d;
                    }
                    .wing-far-plexus {
                      transform-origin: 98px 112px;
                      animation: plexusFlapRight 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                      animation-delay: 0.08s; /* Organik aerodinamik gecikme (lag) */
                      transform-style: preserve-3d;
                      opacity: 0.75; /* Derinlik için arka kanat hafif saydam */
                    }
                  `}</style>

                  {/* ================= GÖVDE VE KUYRUK GRUBU (STATİK TAKIMYILDIZ) ================= */}
                  <g style={{ transformStyle: "preserve-3d" }}>
                    {/* Gövde Plexus Çizgileri */}
                    <path
                      d="M30,115 L50,105 L48,115 Z M50,105 L56,103 L60,95 Z M50,105 L48,115 L60,115 M48,115 L56,103 L60,115 M56,103 L60,95 L72,100 L56,103 M72,100 L60,115 L70,130 L90,115 L72,100 M72,100 L90,115 L105,118 L72,100 M70,130 L85,145 L100,145 L90,115 M70,130 L90,115 L100,145 L70,130 M90,115 L105,118 L100,145 M105,118 L125,140 L100,145 Z M100,145 L102,155 L90,115 M102,155 L95,168 L88,178 M95,168 L102,178 M95,168 L95,182"
                      stroke="url(#constellation-line-grad)"
                      strokeWidth="0.8"
                    />

                    {/* Kuyruk Plexus Çizgileri */}
                    <path
                      d="M125,140 L140,150 L160,145 M125,140 L145,160 L170,155 M100,145 L145,160 L155,168 M100,145 L135,175 M160,145 L170,155 L155,168 L135,175 M140,150 L145,160 M140,150 L170,155 M145,160 L135,175"
                      stroke="url(#constellation-line-grad)"
                      strokeWidth="0.7"
                    />

                    {/* Gövde Yıldız Düğümleri (Glowing Star Nodes) */}
                    <circle cx="30" cy="115" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" /> {/* Gaga Ucu */}
                    <circle cx="50" cy="105" r="2" fill="#ffffff" />
                    <circle cx="48" cy="115" r="2" fill="#ffffff" />
                    <circle cx="60" cy="95" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" /> {/* Taç */}
                    
                    {/* KUZGUN GÖZÜ (Büyük ve Parlayan Özel Düğüm) */}
                    <circle cx="56" cy="103" r="4.5" fill="url(#star-glow-grad)" />
                    <circle cx="56" cy="103" r="1.8" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="56" cy="103" r="1.8" fill="#ffffff" />

                    <circle cx="72" cy="100" r="2" fill="#ffffff" />
                    <circle cx="60" cy="115" r="2" fill="#ffffff" />
                    <circle cx="70" cy="130" r="2" fill="#ffffff" />
                    <circle cx="85" cy="145" r="2" fill="#ffffff" />
                    <circle cx="90" cy="115" r="2.5" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" /> {/* Omuz Yakın */}
                    <circle cx="98" cy="112" r="2.5" className="fill-white drop-shadow-[0_0_6px_#22d3ee] opacity-75" /> {/* Omuz Uzak */}
                    <circle cx="105" cy="118" r="2" fill="#ffffff" />
                    <circle cx="100" cy="145" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" />
                    <circle cx="125" cy="140" r="2.5" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    <circle cx="102" cy="155" r="2" fill="#ffffff" />
                    <circle cx="95" cy="168" r="2" fill="#ffffff" />
                    <circle cx="88" cy="178" r="1.8" fill="#ffffff" />
                    <circle cx="102" cy="178" r="1.8" fill="#ffffff" />
                    <circle cx="95" cy="182" r="1.8" fill="#ffffff" />

                    {/* Kuyruk Yıldız Düğümleri */}
                    <circle cx="140" cy="150" r="2" fill="#ffffff" />
                    <circle cx="145" cy="160" r="2" fill="#ffffff" />
                    <circle cx="160" cy="145" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                    <circle cx="170" cy="155" r="2.5" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" />
                    <circle cx="155" cy="168" r="2" fill="#ffffff" />
                    <circle cx="135" cy="175" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee] animate-pulse" />
                  </g>

                  {/* ================= UZAK KANAT GRUBU (3D FLAPPING PLEXUS - ARKA) ================= */}
                  <g className="wing-far-plexus">
                    {/* Uzak Kanat Çizgileri */}
                    <path
                      d="M98,112 L92,90 L86,65 L82,40 M86,65 L72,60 L82,40 M86,65 L70,50 L72,60 M86,65 L76,78 L62,62 L70,50 M92,90 L76,78 M92,90 L80,95 L76,78 M76,78 L58,75 L62,62 M80,95 L58,88 L76,78 M58,75 L58,88 M98,112 L80,95 M98,112 L64,100 L80,95 M58,88 L64,100"
                      stroke="url(#constellation-line-grad)"
                      strokeWidth="0.7"
                    />

                    {/* Uzak Kanat Düğümleri */}
                    <circle cx="92" cy="90" r="2" fill="#ffffff" />
                    <circle cx="86" cy="65" r="2" fill="#ffffff" />
                    <circle cx="82" cy="40" r="2.5" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" /> {/* Kanat Ucu */}
                    <circle cx="70" cy="50" r="2" fill="#ffffff" />
                    <circle cx="62" cy="62" r="2" fill="#ffffff" />
                    <circle cx="58" cy="75" r="2" fill="#ffffff" />
                    <circle cx="58" cy="88" r="2" fill="#ffffff" />
                    <circle cx="64" cy="100" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                    <circle cx="80" cy="95" r="2" fill="#ffffff" />
                    <circle cx="76" cy="78" r="2" fill="#ffffff" />
                    <circle cx="72" cy="60" r="2" fill="#ffffff" />
                  </g>

                  {/* ================= YAKIN KANAT GRUBU (3D FLAPPING PLEXUS - ÖN) ================= */}
                  <g className="wing-near-plexus">
                    {/* Yakın Kanat Çizgileri */}
                    <path
                      d="M90,115 L110,85 L135,60 L155,30 M135,60 L150,55 L155,30 M135,60 L165,42 L150,55 M135,60 L142,70 L168,55 L165,42 M110,85 L128,85 L142,70 M128,85 L164,68 L142,70 M168,55 L164,68 M110,85 L115,98 L128,85 M115,98 L155,80 L128,85 M164,68 L155,80 M90,115 L115,98 M90,115 L128,102 L115,98 M155,80 L128,102 M128,102 L142,92 L155,80"
                      stroke="url(#constellation-line-grad)"
                      strokeWidth="0.85"
                    />

                    {/* Yakın Kanat Düğümleri */}
                    <circle cx="110" cy="85" r="2" fill="#ffffff" />
                    <circle cx="135" cy="60" r="2" fill="#ffffff" />
                    <circle cx="155" cy="30" r="2.8" className="fill-white drop-shadow-[0_0_6px_#22d3ee] animate-pulse" /> {/* Kanat Ucu Ana */}
                    <circle cx="165" cy="42" r="2" fill="#ffffff" />
                    <circle cx="168" cy="55" r="2" fill="#ffffff" />
                    <circle cx="164" cy="68" r="2" fill="#ffffff" />
                    <circle cx="155" cy="80" r="2" fill="#ffffff" />
                    <circle cx="142" cy="92" r="2" fill="#ffffff" />
                    <circle cx="128" cy="102" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                    <circle cx="115" cy="98" r="2" fill="#ffffff" />
                    <circle cx="128" cy="85" r="2" fill="#ffffff" />
                    <circle cx="142" cy="70" r="2" fill="#ffffff" />
                    <circle cx="150" cy="55" r="2.2" className="fill-white drop-shadow-[0_0_4px_#22d3ee]" />
                  </g>
                </svg>
              ) : (
                <div className="w-full h-full" />
              )}

              {/* Kuzgunun Arkasındaki Parıldayan Küçük Yıldızlar (Faint Constellation Nodes) */}
              <div className="absolute top-10 left-10 w-1 h-1 bg-white/35 rounded-full animate-ping"></div>
              <div className="absolute bottom-12 right-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse [animation-delay:2s]"></div>
              <div className="absolute top-1/2 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Dikey Aşağı Kaydırma Göstergesi */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase rotate-90 my-4">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-zinc-800"></div>
      </div>
    </section>
  );
}
