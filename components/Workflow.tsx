"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "./LanguageContext";

// Süreç adımları verisi
const workflowSteps = [
  {
    step: "01",
    phase: "KEŞİF & STRATEJİ",
    phaseEn: "DISCOVERY & STRATEGY",
    title: "İhtiyaç ve Hedef Analizi",
    titleEn: "Needs and Goals Analysis",
    description: "Projenin iş hedeflerini, kullanıcı kitlesini ve teknik gereksinimlerini derinlemesine inceleyerek sağlam bir ürün ve mimari stratejisi oluşturuyorum.",
    descriptionEn: "I thoroughly examine the project's business goals, target audience and technical requirements to create a solid product and architectural strategy.",
    details: ["Gereksinim Belirleme", "Kullanıcı Araştırması", "Teknoloji Seçimi & Yol Haritası"],
    detailsEn: ["Requirements Gathering", "User Research", "Technology Selection & Roadmap"],
    glowColor: "rgba(245, 158, 11, 0.12)", // Amber
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    phase: "UI/UX TASARIM",
    phaseEn: "UI/UX DESIGN",
    title: "Rafine Arayüz Deneyimi",
    titleEn: "Refined Interface Experience",
    description: "Dingin, asimetrik ve modern tasarım prensipleri doğrultusunda, markanın premium algısını yansıtan yüksek kaliteli arayüz prototipleri ve tasarım sistemleri hazırlıyorum.",
    descriptionEn: "I prepare high-quality interface prototypes and design systems reflecting the brand's premium perception, following serene, asymmetric and modern design principles.",
    details: ["Figma ile Piksel Kusursuz Tasarım", "Kullanıcı Deneyimi (UX) Akışları", "Modüler Tasarım Sistemleri"],
    detailsEn: ["Pixel-Perfect Design with Figma", "User Experience (UX) Flows", "Modular Design Systems"],
    glowColor: "rgba(168, 85, 247, 0.12)", // Purple
    icon: (
      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l5.904-.813a2 2 0 001.12-.564l4.4-4.4a2 2 0 00-2.828-2.828l-4.4 4.4a2 2 0 00-.564 1.12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.605 13.785a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
      </svg>
    ),
  },
  {
    step: "03",
    phase: "MÜHENDİSLİK & KOD",
    phaseEn: "ENGINEERING & CODE",
    title: "Temiz ve Performanslı Yazılım",
    titleEn: "Clean and Performant Software",
    description: "Flutter, SwiftUI, Next.js veya Unity kullanarak, sürdürülebilir temiz kod (clean code) mimarisiyle, en yüksek performansa sahip, akıcı dijital ürünleri kodluyorum.",
    descriptionEn: "Using Flutter, SwiftUI, Next.js or Unity, I code the most performant, fluid digital products with sustainable clean code architecture.",
    details: ["Clean Architecture & MVVM", "Durum Yönetimi (Riverpod/BLoC)", "Yüksek Hız ve Bellek Optimizasyonu"],
    detailsEn: ["Clean Architecture & MVVM", "State Management (Riverpod/BLoC)", "High Speed & Memory Optimization"],
    glowColor: "rgba(16, 185, 129, 0.12)", // Emerald
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    step: "04",
    phase: "DOĞRULAMA & YAYIN",
    phaseEn: "VALIDATION & RELEASE",
    title: "Hatasız Dağıtım ve Takip",
    titleEn: "Flawless Deployment and Monitoring",
    description: "Kapsamlı test süreçleri, arayüz performans analizleri ve otomatik CI/CD hatları (Vercel, App Store, Play Store) kurarak ürünü sıfır hata ile son kullanıcıya ulaştırıyorum.",
    descriptionEn: "I set up comprehensive test processes, interface performance analyses and automated CI/CD pipelines (Vercel, App Store, Play Store) to deliver the product to end users with zero errors.",
    details: ["Otomatik Entegrasyon Testleri", "SEO ve PageSpeed Skoru (100/100)", "CI/CD & Otomatik Dağıtım Kurulumu"],
    detailsEn: ["Automated Integration Tests", "SEO & PageSpeed Score (100/100)", "CI/CD & Auto Deployment Setup"],
    glowColor: "rgba(59, 130, 246, 0.12)", // Blue
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Tekil Adım Kartı Bileşeni - Spotlight Efektli
function WorkflowStepCard({ step }: { step: typeof workflowSteps[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
      className="relative p-[1px] rounded-2xl overflow-hidden bg-zinc-900/30 border border-zinc-900/40 transition-all duration-300 group"
    >
      {/* 1. Katman: Fareyi takip eden ince gradyan border parlaması */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* 2. Katman: Hover durumunda arkada beliren yumuşak renkli ambient parlaması */}
      <div
        className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full blur-[70px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${step.glowColor}, transparent 70%)`,
        }}
      />

      {/* Kart Gövdesi */}
      <div className="relative z-10 w-full h-full rounded-[15px] bg-zinc-950/95 p-8 flex flex-col justify-between gap-6 backdrop-blur-md min-h-[340px]">
        
        {/* Üst Kısım: Sayısal Sıra ve İkon */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-extrabold font-mono text-zinc-800 tracking-tighter group-hover:text-zinc-600 transition-colors">
              {step.step}
            </span>
            <span className="h-[1px] w-4 bg-zinc-900"></span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
              {t("Aşama", "Phase")}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-zinc-900/45 border border-zinc-800/80 flex items-center justify-center transition-colors group-hover:bg-zinc-900/80">
            {step.icon}
          </div>
        </div>

        {/* Orta Kısım: Başlıklar ve Açıklama */}
        <div className="flex flex-col gap-3 my-auto">
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            {t(step.phase, step.phaseEn)}
          </span>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
            {t(step.title, step.titleEn)}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            {t(step.description, step.descriptionEn)}
          </p>
        </div>

        {/* Alt Kısım: Detay Listesi */}
        <div className="border-t border-zinc-900/60 pt-4 flex flex-col gap-1.5 text-[10px] font-mono text-zinc-500">
          {step.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-zinc-600 transition-colors"></span>
              <span>{t(detail, step.detailsEn[idx])}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function Workflow() {
  const { t } = useLanguage();

  return (
    <section id="workflow" className="py-32 bg-zinc-950 border-t border-zinc-900/30 relative overflow-hidden">
      {/* 3D Arka Plan Ambient Işık Halkası */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              {t("[ 04 // METODOLOJİ ]", "[ 04 // METHODOLOGY ]")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("Fikirden Koda", "From Idea to Code")} <span className="text-zinc-500">{t("Mühendislik Süreci", "Engineering Process")}</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed mt-2">
            {t(
              "Karmaşık problemleri çözmek ve hatasız dijital ürünler ortaya çıkarmak için uyguladığım disiplinli ve şeffaf çalışma adımları:",
              "Disciplined and transparent working steps I follow to solve complex problems and produce flawless digital products:"
            )}
          </p>
        </div>

        {/* 4 Aşamalı Süreç Zaman Çizelgesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Masaüstü için birbirine bağlayan ince kılavuz çizgi */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 -translate-y-1/2 hidden lg:block pointer-events-none z-0 opacity-40"></div>
          
          {workflowSteps.map((step) => (
            <WorkflowStepCard key={step.step} step={step} />
          ))}
        </div>

      </div>
    </section>
  );
}
