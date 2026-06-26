"use client";

import React, { useState, useRef } from "react";

export default function Hero() {
  // 3D Tilt / Mouse Takip Durum Yönetimi
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
              
              {/* Geometrik Çizgisel ve Çokgenli Kuzgun Origami Modeli */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-zinc-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* 3D Katman Derinliği Oluşturmak İçin Faset Çokgenleri (Polygons) */}
                
                {/* Baş & Gaga Faseti (Açık İndigo Işıklı) */}
                <polygon points="50,10 42,28 50,23 58,28" fill="currentColor" fillOpacity="0.12" className="text-indigo-400" />
                
                {/* Göğüs/Gövde Faseti */}
                <polygon points="50,23 40,45 50,78 60,45" fill="currentColor" fillOpacity="0.05" />
                
                {/* Sol Üst Kanat Faseti */}
                <polygon points="42,28 10,42 38,45" fill="currentColor" fillOpacity="0.07" />
                {/* Sol Alt Kanat Faseti */}
                <polygon points="10,42 32,70 38,45" fill="currentColor" fillOpacity="0.03" />
                
                {/* Sağ Üst Kanat Faseti */}
                <polygon points="58,28 90,42 62,45" fill="currentColor" fillOpacity="0.07" />
                {/* Sağ Alt Kanat Faseti */}
                <polygon points="90,42 68,70 62,45" fill="currentColor" fillOpacity="0.03" />
                
                {/* Kuyruk Faseti */}
                <polygon points="40,45 50,90 60,45" fill="currentColor" fillOpacity="0.06" />

                {/* Kafes Görünümü Veren Ekstrüzyon Geometrik Bağlantı Çizgileri */}
                {/* Çizgiler */}
                <line x1="50" y1="10" x2="50" y2="23" stroke="currentColor" strokeWidth="1" />
                <line x1="42" y1="28" x2="58" y2="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                <line x1="10" y1="42" x2="90" y2="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="40" y1="45" x2="60" y2="45" stroke="currentColor" strokeWidth="1" />
                
                {/* İkincil İnce Bağlantı Çizgileri (Göz / Beyin Ağı Estetiği) */}
                <line x1="50" y1="10" x2="38" y2="45" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                <line x1="50" y1="10" x2="62" y2="45" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                <line x1="42" y1="28" x2="50" y2="78" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                <line x1="58" y1="28" x2="50" y2="78" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                <line x1="10" y1="42" x2="50" y2="78" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                <line x1="90" y1="42" x2="50" y2="78" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />

                {/* Bağlantı Düğümleri (Küçük Yıldız Noktaları) */}
                <circle cx="50" cy="10" r="1.2" fill="#f59e0b" className="animate-ping" />
                <circle cx="50" cy="10" r="1.2" fill="#f59e0b" />
                <circle cx="50" cy="23" r="1" fill="currentColor" />
                <circle cx="42" cy="28" r="1" fill="currentColor" />
                <circle cx="58" cy="28" r="1" fill="currentColor" />
                <circle cx="10" cy="42" r="1" fill="currentColor" />
                <circle cx="90" cy="42" r="1" fill="currentColor" />
                <circle cx="38" cy="45" r="1" fill="currentColor" />
                <circle cx="62" cy="45" r="1" fill="currentColor" />
                <circle cx="50" cy="78" r="1.2" fill="#10b981" />
                <circle cx="50" cy="90" r="1" fill="currentColor" />
              </svg>

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
