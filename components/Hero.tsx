"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Arka Plandaki Dev Geometrik Kuzgun Deseni (Çok hafif çizgisel) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
        <svg
          viewBox="0 0 100 100"
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] text-zinc-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M50 5 L10 50 L50 35 L90 50 Z" />
          <path d="M10 50 L50 95 L50 35 Z" />
          <path d="M90 50 L50 95 L50 35 Z" />
          <path d="M10 50 L2 70 L22 60 Z" />
          <path d="M90 50 L98 70 L78 60 Z" />
          <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-start gap-8 py-20">
        {/* Monospace Etiket */}
        <div className="animate-fade-in flex items-center gap-2">
          <span className="h-[1px] w-8 bg-zinc-800"></span>
          <span className="text-[10px] md:text-xs font-mono tracking-widest text-zinc-500 uppercase">
            [ 01 // GİRİŞ ]
          </span>
        </div>

        {/* Unvan ve Büyük Başlık */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <p className="animate-slide-up text-xs md:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            Mobil & Web Geliştirici / Arayüz Tasarımcısı
          </p>
          <h1 className="animate-slide-up text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1] [animation-delay:200ms]">
            Temiz Kod. <br />
            <span className="text-zinc-500">Rafine Tasarım.</span>
          </h1>
        </div>

        {/* Kısa Tanıtım / Vizyon Cümlesi */}
        <p className="animate-slide-up text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed [animation-delay:400ms]">
          Kuzgun markası altında, karmaşık problemleri basit ve yüksek performanslı dijital ürünlere dönüştürüyorum. Flutter, SwiftUI, Unity ve Next.js teknolojileriyle sıfırdan uçtan uca deneyimler inşa ediyorum.
        </p>

        {/* Yönlendirme Butonları */}
        <div className="animate-slide-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto [animation-delay:600ms] mt-4">
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 text-xs md:text-sm font-semibold tracking-wider text-center uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98] font-mono"
          >
            Çalışmaları İncele
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-zinc-800 text-zinc-300 text-xs md:text-sm font-semibold tracking-wider text-center uppercase transition-all duration-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 font-mono"
          >
            İletişime Geç
          </a>
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
