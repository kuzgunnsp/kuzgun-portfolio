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
                    {/* Gövde ve kafa için yanardöner koyu mor/indigo gradyan */}
                    <linearGradient id="raven-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#080711" />
                      <stop offset="30%" stopColor="#121026" />
                      <stop offset="70%" stopColor="#1c1a3a" />
                      <stop offset="100%" stopColor="#040308" />
                    </linearGradient>

                    {/* Sol kanat için dışa doğru yayılan metalik gradyan */}
                    <linearGradient id="raven-wing-left-grad" x1="100%" y1="50%" x2="0%" y2="50%">
                      <stop offset="0%" stopColor="#0f0e22" />
                      <stop offset="50%" stopColor="#25224e" />
                      <stop offset="85%" stopColor="#111024" />
                      <stop offset="100%" stopColor="#06050b" />
                    </linearGradient>

                    {/* Sağ kanat için dışa doğru yayılan metalik gradyan */}
                    <linearGradient id="raven-wing-right-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#0f0e22" />
                      <stop offset="50%" stopColor="#25224e" />
                      <stop offset="85%" stopColor="#111024" />
                      <stop offset="100%" stopColor="#06050b" />
                    </linearGradient>

                    {/* Tüy parıltıları için yarı saydam ışık gradyanı */}
                    <linearGradient id="feather-highlight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#312e81" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Amber göz ışıması için radial gradyan */}
                    <radialGradient id="eye-glow-radial" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop offset="40%" stopColor="#d97706" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                    </radialGradient>

                    {/* Amber göz filtresi */}
                    <filter id="eye-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 3D Kanat Çırpma CSS Animasyonları */}
                  <style>{`
                    @keyframes organicFlapLeft {
                      0%, 100% {
                        transform: rotateZ(18deg) rotateY(-12deg) rotateX(2deg);
                      }
                      35% {
                        /* Güçlü aşağı vuruş: kanat aşağı iner ve öne doğru bükülür */
                        transform: rotateZ(-20deg) rotateY(25deg) rotateX(-8deg);
                      }
                      50% {
                        /* En alt nokta: hafifçe düzleşir */
                        transform: rotateZ(-22deg) rotateY(12deg) rotateX(-2deg);
                      }
                      75% {
                        /* Yukarı vuruş: kanat geriye doğru bükülür ve yukarı kalkar */
                        transform: rotateZ(8deg) rotateY(-28deg) rotateX(8deg);
                      }
                    }
                    @keyframes organicFlapRight {
                      0%, 100% {
                        transform: rotateZ(-18deg) rotateY(12deg) rotateX(2deg);
                      }
                      35% {
                        /* Güçlü aşağı vuruş: kanat aşağı iner ve öne doğru bükülür */
                        transform: rotateZ(20deg) rotateY(-25deg) rotateX(-8deg);
                      }
                      50% {
                        /* En alt nokta: hafifçe düzleşir */
                        transform: rotateZ(22deg) rotateY(-12deg) rotateX(-2deg);
                      }
                      75% {
                        /* Yukarı vuruş: kanat geriye doğru bükülür ve yukarı kalkar */
                        transform: rotateZ(-8deg) rotateY(28deg) rotateX(8deg);
                      }
                    }
                    .wing-left-organic {
                      transform-origin: 88px 62px;
                      animation: organicFlapLeft 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                      transform-style: preserve-3d;
                    }
                    .wing-right-organic {
                      transform-origin: 112px 62px;
                      animation: organicFlapRight 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
                      transform-style: preserve-3d;
                    }
                  `}</style>

                  {/* ================= GÖVDE, BAŞ VE KUYRUK GRUBU (STATİK) ================= */}
                  <g style={{ transformStyle: "preserve-3d" }}>
                    {/* Temel Kuyruk Fasetleri (Kama Kuyruk - Layered Tail) */}
                    <g opacity="0.85">
                      {/* Sol Kuyruk Teleği */}
                      <path
                        d="M90,118 C80,135 83,155 93,178 C96,170 99,145 90,118 Z"
                        fill="url(#raven-body-grad)"
                        stroke="#312e81"
                        strokeWidth="0.5"
                        strokeOpacity="0.4"
                      />
                      {/* Sağ Kuyruk Teleği */}
                      <path
                        d="M110,118 C120,135 117,155 107,178 C104,170 101,145 110,118 Z"
                        fill="url(#raven-body-grad)"
                        stroke="#312e81"
                        strokeWidth="0.5"
                        strokeOpacity="0.4"
                      />
                      {/* Orta Kama Kuyruk */}
                      <path
                        d="M92,118 C88,135 90,165 100,185 C110,165 112,135 108,118 Z"
                        fill="url(#raven-body-grad)"
                        stroke="#4f46e5"
                        strokeWidth="0.6"
                        strokeOpacity="0.5"
                      />
                      {/* Kuyruk İçi Tüy Detay Çizgileri */}
                      <line x1="100" y1="120" x2="100" y2="182" stroke="#4f46e5" strokeWidth="0.6" strokeOpacity="0.3" />
                      <line x1="95" y1="130" x2="98" y2="165" stroke="#312e81" strokeWidth="0.4" strokeOpacity="0.3" />
                      <line x1="105" y1="130" x2="102" y2="165" stroke="#312e81" strokeWidth="0.4" strokeOpacity="0.3" />
                    </g>

                    {/* Ana Gövde Silüeti (Body, Neck, Head and Beak integrated) */}
                    <path
                      d="M100,10 L95,24 C92,24 91,33 93,38 C95,43 91,52 88,62 C85,72 84,102 90,118 C90,118 78,142 100,185 C122,142 110,118 110,118 C116,102 115,72 112,62 C109,52 105,43 107,38 C109,33 108,24 105,24 L100,10 Z"
                      fill="url(#raven-body-grad)"
                      stroke="#1e1b4b"
                      strokeWidth="0.8"
                    />

                    {/* Güçlü Kuzgun Gagası ve Baş Üstü Işığı */}
                    <path
                      d="M100,10 L95,24 C98,25 102,25 105,24 Z"
                      fill="url(#feather-highlight-grad)"
                      stroke="#4f46e5"
                      strokeWidth="0.4"
                      strokeOpacity="0.6"
                    />

                    {/* Boğazdaki Sakalsı Tüyler (Throat Feathers / "Beard") */}
                    <path
                      d="M94,38 C96,43 96,49 100,54 C104,49 104,43 106,38 C102,40 98,40 94,38 Z"
                      fill="url(#feather-highlight-grad)"
                      stroke="#4f46e5"
                      strokeWidth="0.5"
                      strokeOpacity="0.5"
                    />

                    {/* Göğüs Tüy Katmanları (Pürüzsüz Işık Çizgileri) */}
                    <path d="M90,70 C95,76 105,76 110,70" stroke="url(#feather-highlight-grad)" strokeWidth="0.8" fill="none" />
                    <path d="M88,85 C94,92 106,92 112,85" stroke="url(#feather-highlight-grad)" strokeWidth="0.8" fill="none" />
                    <path d="M91,100 C95,106 105,106 109,100" stroke="url(#feather-highlight-grad)" strokeWidth="0.6" fill="none" />

                    {/* CANLI KUZGUN GÖZLERİ (Amber/Altın Parlayan Gözler) */}
                    {/* Sol Göz ve Haresi */}
                    <circle cx="96" cy="28" r="3" fill="url(#eye-glow-radial)" filter="url(#eye-glow-filter)" />
                    <circle cx="96" cy="28" r="1.2" fill="#fbbf24" />
                    <circle cx="95.5" cy="27.5" r="0.4" fill="#ffffff" /> {/* Göz parıltısı */}

                    {/* Sağ Göz ve Haresi */}
                    <circle cx="104" cy="28" r="3" fill="url(#eye-glow-radial)" filter="url(#eye-glow-filter)" />
                    <circle cx="104" cy="28" r="1.2" fill="#fbbf24" />
                    <circle cx="103.5" cy="27.5" r="0.4" fill="#ffffff" /> {/* Göz parıltısı */}
                  </g>

                  {/* ================= SOL KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                  <g className="wing-left-organic">
                    {/* Kanat Altı Gölgesi / Gövde Bağlantısı */}
                    <path
                      d="M88,62 C75,50 55,30 30,20 C25,24 28,28 32,32 C50,45 70,58 88,68 Z"
                      fill="url(#raven-wing-left-grad)"
                      stroke="#1e1b4b"
                      strokeWidth="0.6"
                    />

                    {/* Birincil Uçuş Tüyleri (Primaries - Wingtips) */}
                    <path d="M30,20 C18,21 10,23 4,26 C3,28 5,30 12,31 C20,31 28,28 32,25 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M31,23 C19,26 11,32 6,38 C5,40 7,42 15,41 C24,39 31,33 34,29 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M33,26 C21,32 14,41 9,50 C8,52 11,53 18,50 C27,46 33,39 36,34 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M35,30 C24,39 18,50 14,62 C13,64 16,65 23,60 C31,54 36,46 38,39 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M38,35 C28,46 23,59 20,72 C19,74 22,75 29,69 C36,62 40,52 41,44 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />

                    {/* İkincil Tüyler (Secondaries - Inner wing) */}
                    <path d="M41,40 C32,53 28,68 27,81 C26,83 29,84 36,76 C43,68 46,56 46,47 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M46,45 C38,58 35,74 35,87 C35,89 38,90 44,81 C50,71 52,58 51,51 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M52,50 C46,63 43,78 44,91 C44,93 47,93 53,83 C58,73 59,60 57,55 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M59,54 C54,66 52,79 54,92 C54,94 57,94 62,84 C66,74 66,63 64,58 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M66,57 C62,68 61,79 63,91 C63,93 66,93 70,83 C73,73 73,64 71,61 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M74,60 C71,69 70,78 72,88 C72,90 75,90 78,80 C81,71 81,65 79,62 Z" fill="url(#raven-wing-left-grad)" stroke="#312e81" strokeWidth="0.4" />

                    {/* Omuz Bölgesindeki Küçük Örtü Tüyleri (Covert Highlights) */}
                    <path
                      d="M80,62 C68,54 53,40 38,32 C42,40 58,54 80,64 Z"
                      fill="url(#feather-highlight-grad)"
                      stroke="#4f46e5"
                      strokeWidth="0.3"
                      strokeOpacity="0.4"
                    />
                  </g>

                  {/* ================= SAĞ KANAT GRUBU (3D ORGANİK KANAT ÇIRPAN) ================= */}
                  <g className="wing-right-organic">
                    {/* Kanat Altı Gölgesi / Gövde Bağlantısı */}
                    <path
                      d="M112,62 C125,50 145,30 170,20 C175,24 172,28 168,32 C150,45 130,58 112,68 Z"
                      fill="url(#raven-wing-right-grad)"
                      stroke="#1e1b4b"
                      strokeWidth="0.6"
                    />

                    {/* Birincil Uçuş Tüyleri (Primaries - Wingtips) */}
                    <path d="M170,20 C182,21 190,23 196,26 C197,28 195,30 188,31 C180,31 172,28 168,25 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M169,23 C181,26 189,32 194,38 C195,40 193,42 185,41 C176,39 169,33 166,29 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M167,26 C179,32 186,41 191,50 C192,52 189,53 182,50 C173,46 167,39 164,34 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M165,30 C176,39 182,50 186,62 C187,64 184,65 177,60 C169,54 164,46 162,39 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M162,35 C172,46 177,59 180,72 C181,74 178,75 171,69 C164,62 160,52 159,44 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />

                    {/* İkincil Tüyler (Secondaries - Inner wing) */}
                    <path d="M159,40 C168,53 172,68 173,81 C174,83 171,84 164,76 C157,68 154,56 154,47 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M154,45 C162,58 165,74 165,87 C165,89 162,90 156,81 C150,71 148,58 149,51 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M148,50 C154,63 157,78 156,91 C156,93 153,93 147,83 C142,73 141,60 143,55 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M141,54 C146,66 148,79 146,92 C146,94 143,94 138,84 C134,74 134,63 136,58 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M134,57 C138,68 139,79 137,91 C137,93 134,93 130,83 C127,73 127,64 129,61 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />
                    <path d="M126,60 C129,69 130,78 128,88 C128,90 125,90 122,80 C119,71 119,65 121,62 Z" fill="url(#raven-wing-right-grad)" stroke="#312e81" strokeWidth="0.4" />

                    {/* Omuz Bölgesindeki Küçük Örtü Tüyleri (Covert Highlights) */}
                    <path
                      d="M120,62 C132,54 147,40 162,32 C158,40 142,54 120,64 Z"
                      fill="url(#feather-highlight-grad)"
                      stroke="#4f46e5"
                      strokeWidth="0.3"
                      strokeOpacity="0.4"
                    />
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
