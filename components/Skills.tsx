"use client";

import React, { useState, useRef } from "react";

// Yetenek verileri ve kategorileri
const skillCategories = [
  {
    title: "Mobil Mimariler",
    description: "Çapraz platform ve yerel (native) mobil uygulama geliştirme, yüksek performanslı mimariler ve entegrasyonlar.",
    glowColor: "rgba(99, 102, 241, 0.15)", // Indigo
    icon: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
    skills: ["Flutter", "Dart", "Swift", "SwiftUI", "Jetpack Compose", "Riverpod", "HealthKit", "CoreData", "REST API Entegrasyonu"],
  },
  {
    title: "Web Teknolojileri",
    description: "Modern, hızlı ve SEO odaklı tam yığın (full-stack) web uygulamaları, statik site mimarileri ve interaktif arayüzler.",
    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
        <path d="M2 12h20" />
      </svg>
    ),
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS v4", "Vercel", "HTML5 & CSS3", "Node.js", "Headless CMS"],
  },
  {
    title: "Oyun Geliştirme",
    description: "2D/3D oyun mekanikleri, oyun döngüsü optimizasyonları, dinamik ses entegrasyonları ve 3D model tasarımları.",
    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["Unity Engine", "C#", "Blender (3D Modelleme)", "FMOD Audio", "UniTask", "Oyun Döngüsü Optimizasyonu", "UI/UX Mekanikleri"],
  },
  {
    title: "Tasarım & İş Akışları",
    description: "Kullanıcı deneyimi analizi, görsel kimlik tasarımı, modüler bileşen sistemleri ve profesyonel yazılım süreçleri.",
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
    icon: (
      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["UI/UX Tasarım", "Figma", "Git & GitHub", "Clean Architecture", "MVVM & BLoC", "Scrum / Agile", "Tipografi & Grid Düzenleri"],
  },
];

// Tekil Yetenek Kartı Bileşeni - Mouse Spotlight & Glow Efekti
function SkillCard({ category }: { category: typeof skillCategories[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* 2. Katman: Arka plandaki yumuşak renkli ambient parlaması */}
      <div
        className="absolute -right-16 -bottom-16 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${category.glowColor}, transparent 70%)`,
        }}
      />

      {/* Kart Gövdesi */}
      <div className="relative z-10 w-full h-full rounded-[15px] bg-zinc-950/95 p-8 md:p-10 flex flex-col gap-6 backdrop-blur-md">
        {/* Kategori Başlığı ve İkon */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-900/45 border border-zinc-800/80 flex items-center justify-center transition-colors group-hover:bg-zinc-900/80">
            {category.icon}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            {category.title}
          </h3>
        </div>

        {/* Açıklama */}
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
          {category.description}
        </p>

        {/* Yetenek Etiketleri */}
        <div className="flex flex-wrap gap-2 mt-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full bg-zinc-900/25 border border-zinc-900/80 hover:border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-white transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-zinc-950 border-t border-zinc-900/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 03 // YETKİNLİKLER ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Teknik <span className="text-zinc-500">Cephanelik & Araçlar</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed mt-2">
            Mobil, web ve oyun ekosisteminde fikirleri yüksek performanslı dijital ürünlere dönüştürmek için kullandığım temel uzmanlıklarım:
          </p>
        </div>

        {/* Yetenek Kategorileri Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
