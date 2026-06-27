"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";

// Yetenek verileri ve kategorileri
const skillCategories = [
  {
    title: "Mobil Mimariler",
    titleEn: "Mobile Architectures",
    description: "Çapraz platform ve yerel (native) mobil uygulama geliştirme, yüksek performanslı mimariler ve entegrasyonlar.",
    descriptionEn: "Cross-platform and native mobile app development, high-performance architectures and integrations.",
    glowColor: "rgba(99, 102, 241, 0.15)", // Indigo
    icon: (
      <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
    skills: ["Flutter", "Dart", "Swift", "SwiftUI", "Jetpack Compose", "Riverpod", "HealthKit", "CoreData", "REST API Entegrasyonu"],
    skillsEn: ["Flutter", "Dart", "Swift", "SwiftUI", "Jetpack Compose", "Riverpod", "HealthKit", "CoreData", "REST API Integration"],
  },
  {
    title: "Web Teknolojileri",
    titleEn: "Web Technologies",
    description: "Modern, hızlı ve SEO odaklı tam yığın (full-stack) web uygulamaları, statik site mimarileri ve interaktif arayüzler.",
    descriptionEn: "Modern, fast and SEO-focused full-stack web applications, static site architectures and interactive interfaces.",
    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
    icon: (
      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
        <path d="M2 12h20" />
      </svg>
    ),
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS v4", "Vercel", "HTML5 & CSS3", "Node.js", "Headless CMS"],
    skillsEn: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS v4", "Vercel", "HTML5 & CSS3", "Node.js", "Headless CMS"],
  },
  {
    title: "Oyun Geliştirme",
    titleEn: "Game Development",
    description: "2D/3D oyun mekanikleri, oyun döngüsü optimizasyonları, dinamik ses entegrasyonları ve 3D model tasarımları.",
    descriptionEn: "2D/3D game mechanics, game loop optimizations, dynamic audio integrations and 3D model designs.",
    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["Unity Engine", "C#", "Blender (3D Modelleme)", "FMOD Audio", "UniTask", "Oyun Döngüsü Optimizasyonu", "UI/UX Mekanikleri"],
    skillsEn: ["Unity Engine", "C#", "Blender (3D Modeling)", "FMOD Audio", "UniTask", "Game Loop Optimization", "UI/UX Mechanics"],
  },
  {
    title: "Tasarım & İş Akışları",
    titleEn: "Design & Workflows",
    description: "Kullanıcı deneyimi analizi, görsel kimlik tasarımı, modüler bileşen sistemleri ve profesyonel yazılım süreçleri.",
    descriptionEn: "User experience analysis, visual identity design, modular component systems and professional software processes.",
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
    icon: (
      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["UI/UX Tasarım", "Figma", "Git & GitHub", "Clean Architecture", "MVVM & BLoC", "Scrum / Agile", "Tipografi & Grid Düzenleri"],
    skillsEn: ["UI/UX Design", "Figma", "Git & GitHub", "Clean Architecture", "MVVM & BLoC", "Scrum / Agile", "Typography & Grid Layouts"],
  },
];

// Tekil Yetenek Kartı Bileşeni - Mouse Spotlight & Glow Efekti
function SkillCard({ category }: { category: typeof skillCategories[0] }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const localizedTitle = t(category.title, category.titleEn);
  const localizedSkills = t(category.skills, category.skillsEn);

  useEffect(() => {
    if (!isHovered) return;

    const lines = [
      `> Initializing terminal check...`,
      `> Connecting library: ${localizedTitle.toLowerCase().replace(" ", "_")}...`,
      ...localizedSkills.slice(0, 3).map((s: string) => `> Verified: ${s}... [OK]`),
      `> ALL SYSTEMS GO - 100% READY`,
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setLogs((prev) => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isHovered, category, localizedTitle, localizedSkills]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setLogs([]);
      }}
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
            {t(category.title, category.titleEn)}
          </h3>
        </div>

        {/* Açıklama */}
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
          {t(category.description, category.descriptionEn)}
        </p>

        {/* Yetenek Etiketleri VEYA Terminal Konsolu */}
        <div className="relative h-28 mt-2 overflow-hidden">
          {/* Standart Yetenek Etiketleri */}
          <div
            className={`flex flex-wrap gap-2 transition-all duration-300 ${
              isHovered ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            }`}
          >
            {localizedSkills.map((skill: string) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full bg-zinc-900/25 border border-zinc-900/80 hover:border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-white transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Siber Derleme Terminali */}
          <div
            className={`absolute inset-0 bg-black/40 rounded-xl border border-zinc-900 p-4 font-mono text-[9px] text-emerald-400/80 flex flex-col gap-1 overflow-y-auto scrollbar-none transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            {logs.map((log, i) => (
              <div key={i} className="leading-tight select-none">
                {log}
              </div>
            ))}
            {/* Blinking prompt line */}
            {logs.length < 6 && (
              <div className="flex items-center gap-1">
                <span className="text-zinc-600">&gt;</span>
                <span className="w-1 h-2.5 bg-emerald-400/80 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-32 bg-zinc-950 border-t border-zinc-900/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              {t("[ 03 // YETKİNLİKLER ]", "[ 03 // COMPETENCIES ]")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("Teknik", "Technical")} <span className="text-zinc-500">{t("Cephanelik & Araçlar", "Arsenal & Tools")}</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed mt-2">
            {t(
              "Mobil, web ve oyun ekosisteminde fikirleri yüksek performanslı dijital ürünlere dönüştürmek için kullandığım temel uzmanlıklarım:",
              "My core competencies for transforming ideas into high-performance digital products in mobile, web and game ecosystems:"
            )}
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
