"use client";

import React from "react";

// Yetenek verileri ve kategorileri
const skillCategories = [
  {
    title: "Mobil Mimariler",
    description: "Çapraz platform ve yerel (native) mobil uygulama geliştirme, performans optimizasyonları ve donanım entegrasyonları.",
    icon: (
      <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
    skills: ["Flutter", "Dart", "Swift", "SwiftUI", "Jetpack Compose", "Riverpod", "HealthKit", "CoreData", "REST API Entegrasyonu"],
  },
  {
    title: "Web Teknolojileri",
    description: "Modern, hızlı ve SEO dostu tam yığın (full-stack) web uygulamaları, statik site üreticileri ve interaktif arayüzler.",
    icon: (
      <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
        <path d="M2 12h20" />
      </svg>
    ),
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS v4", "Vercel", "HTML5 & CSS3", "Node.js", "Headless CMS"],
  },
  {
    title: "Oyun Geliştirme",
    description: "2D/3D oyun mekanikleri, oyun döngüsü optimizasyonları, ses entegrasyonları ve düşük poligonlu model tasarımları.",
    icon: (
      <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["Unity Engine", "C#", "Blender (3D Modelleme)", "FMOD Audio", "UniTask", "Oyun Döngüsü Optimizasyonu", "UI/UX Mekanikleri"],
  },
  {
    title: "Tasarım & İş Akışları",
    description: "Kullanıcı deneyimi analizi, görsel kimlik tasarımı, modüler arayüz bileşenleri ve profesyonel yazılım metodolojileri.",
    icon: (
      <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    skills: ["UI/UX Tasarım", "Figma", "Git & GitHub", "Clean Architecture", "MVVM & BLoC", "Scrum / Agile", "Tipografi & Grid Düzenleri"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-zinc-950 border-t border-zinc-900/50">
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
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed mt-2">
            Mobil, web ve oyun ekosisteminde fikirleri çalışan ürünlere dönüştürmek için kullandığım temel uzmanlık alanlarım:
          </p>
        </div>

        {/* Yetenek Kategorileri Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900/50 border border-zinc-900 overflow-hidden rounded-xl">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-8 md:p-12 bg-zinc-950 flex flex-col gap-6 hover:bg-zinc-900/10 transition-colors duration-300"
            >
              {/* Kategori Başlığı ve İkon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-900/55 border border-zinc-800 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Kategori Açıklaması */}
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                {category.description}
              </p>

              {/* Küçük Yetenek Etiketleri */}
              <div className="flex flex-wrap gap-2 mt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 text-[10px] md:text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
