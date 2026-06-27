"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";

// Proje verileri ve vaka analizi içerikleri
const projectsData = [
  {
    id: "lystra",
    title: "Lystra Studio",
    category: "Premium WooCommerce Web Theme",
    role: "Lead Developer & UI/UX Designer",
    techs: ["WordPress", "PHP", "WooCommerce", "Vanilla JS", "Tailwind CSS", "OCDI"],
    overview: "Lystra Studio, modern e-ticaret sitelerinin yüksek performans ve estetik ihtiyaçlarını karşılamak üzere tasarlanmış, editoryal lüks (editorial luxury) konseptine sahip, yüksek dönüşüm odaklı ve ultra hızlı bir premium WooCommerce temasıdır. Vogue ve Kinfolk gibi lüks tasarım dergilerinin dingin, asimetrik ve prestijli estetiğini dijital mağazalara taşır.",
    overviewEn: "Lystra Studio is a premium WooCommerce theme designed with an editorial luxury concept to meet the high performance and aesthetic needs of modern e-commerce sites. It brings the serene, asymmetric and prestigious aesthetics of luxury design magazines like Vogue and Kinfolk to digital stores.",
    problem: "Geleneksel WooCommerce temalarının Elementor, WPBakery gibi hantal sayfa yapıcılar, düzinelerce yavaş eklenti ve eski jQuery kütüphaneleriyle siteleri aşırı yavaşlatması (PageSpeed skorlarının düşmesi), güvenlik açıkları yaratması ve standart, tek düze 'kutu' tasarımlarla premium marka imajına zarar vermesi.",
    problemEn: "Traditional WooCommerce themes slowing down sites with bloated page builders like Elementor and WPBakery, dozens of slow plugins and legacy jQuery libraries (causing PageSpeed scores to drop), creating security vulnerabilities, and damaging premium brand image with standard, uniform 'box' designs.",
    solution: "Hiçbir sayfa yapıcıya ihtiyaç duymayan çekirdek WooCommerce entegrasyonu. Tamamı ham Vanilla JS ile sıfırdan kodlanmış, jQuery bağımlılığı olmayan interaktif modüller (AJAX Yan Sepet, Arama ve Ücretsiz Kargo Çubuğu). Yayına çıkarken 99KB'a sıkıştırılmış Tailwind CSS mimarisi ve %100 güvenli, WordPress Theme Check standartlarına uygun, XSS/SQL enjeksiyon korumalı (sanitized & escaped) PHP altyapısı.",
    solutionEn: "Core WooCommerce integration requiring no page builder. All interactive modules coded from scratch with raw Vanilla JS without jQuery dependency (AJAX Side Cart, Search and Free Shipping Bar). Tailwind CSS architecture compressed to 99KB at launch, and 100% secure PHP infrastructure compliant with WordPress Theme Check standards, with XSS/SQL injection protection (sanitized & escaped).",
    links: {
      appStore: null,
      playStore: null,
      web: "https://dev-lystra.pantheonsite.io/",
    },
    mockupType: "browser",
    accent: "text-emerald-400 font-semibold",
    bgAccent: "bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "huzur-vakti",
    title: "Huzur Vakti Pro",
    category: "Cross-Platform Mobile App",
    role: "Lead Developer & UI/UX Designer",
    techs: ["Flutter", "Dart", "Riverpod", "SQLite", "Compass API", "WidgetKit"],
    overview: "Huzur Vakti Pro, Müslümanların günlük ibadetlerini en doğru şekilde takip etmeleri için tasarlanmış, altın ve koyu tema estetiğine sahip, reklamsız ve gizlilik odaklı premium bir mobil uygulamadır.",
    overviewEn: "Huzur Vakti Pro is a premium, ad-free and privacy-focused mobile app designed with gold and dark theme aesthetics for Muslims to track their daily prayers most accurately.",
    problem: "Mevcut ibadet uygulamalarının aşırı agresif reklamlar, karmaşık ve yaşlılar için zorlayıcı arayüzler, pili hızla tüketen verimsiz konum servisleri ile ibadet odağını ve huzurunu bozması.",
    problemEn: "Existing prayer apps disrupting worship focus and peace with overly aggressive ads, complex interfaces difficult for elderly users, and inefficient location services that rapidly drain battery.",
    solution: "Flutter ve Dart kullanılarak geliştirilen, pil dostu ve reklamsız bir altyapı. Diyanet İşleri Başkanlığı uyumlu hassas yerel vakit hesaplama motoru, animasyonlu pusula sensörü entegrasyonu, cüz cüz sesli okuma için gelişmiş ses oynatıcı motoru ve iOS/Android için akıllı kilit ekranı widget desteği.",
    solutionEn: "Battery-friendly and ad-free infrastructure developed using Flutter and Dart. Precise local prayer time calculation engine compatible with Turkey's Directorate of Religious Affairs, animated compass sensor integration, advanced audio player engine for chapter-by-chapter Quran recitation, and smart lock screen widget support for iOS/Android.",
    links: {
      appStore: "https://apps.apple.com/us/app/huzur-vakti-ezan-kuran-k%C4%B1ble/id6755821374",
      playStore: "https://play.google.com/store/apps/details?id=com.kuzgun.ezanvakti",
      web: "https://huzurvaktipro.com",
    },
    mockupType: "phone",
    accent: "text-amber-400 font-semibold",
    bgAccent: "bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: "merkezi-nokta",
    title: "Merkezi Nokta",
    category: "Cross-Platform News Application",
    role: "Lead Mobile Developer & UI/UX Designer",
    techs: ["Flutter", "Dart", "BLoC Pattern", "Hive DB", "Firebase FCM", "REST API"],
    overview: "Merkezi Nokta, güncel gelişmeleri, son dakika haberlerini ve spor haberlerini kullanıcılara anlık bildirimlerle ve yüksek performanslı bir arayüzle sunan modern bir mobil haber portalı uygulamasıdır.",
    overviewEn: "Merkezi Nokta is a modern mobile news portal app that delivers breaking news, current developments and sports news to users with instant notifications and a high-performance interface.",
    problem: "Haber uygulamalarının aşırı reklam yükü, hantal veri çekme işlemleri, yavaş yüklenme süreleri ve çevrimdışı okuma desteği barındırmaması nedeniyle kullanıcıların güncel bilgiye hızla ulaşamaması.",
    problemEn: "Users unable to quickly access current information due to excessive ad loads, slow data fetching, sluggish loading times, and lack of offline reading support in news apps.",
    solution: "Flutter ve Dart kullanılarak BLoC mimarisiyle geliştirilen hafif haber motoru. Hive yerel veritabanı ile tam çevrimdışı önbellekleme (caching) sistemi. Firebase Cloud Messaging entegrasyonuyla 1 saniyenin altında son dakika bildirim iletimi, asimetrik haber slider'ı ve dinamik kategori filtresi.",
    solutionEn: "Lightweight news engine developed with Flutter and Dart using BLoC architecture. Full offline caching system with Hive local database. Breaking news notification delivery under 1 second with Firebase Cloud Messaging integration, asymmetric news slider and dynamic category filter.",
    links: {
      appStore: null,
      playStore: null,
      web: null,
    },
    mockupType: "phone",
    accent: "text-blue-400 font-semibold",
    bgAccent: "bg-blue-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "lingo",
    title: "LingoQuest",
    category: "Word Strategy Mobile Game",
    role: "Solo Game Developer & 3D Artist",
    techs: ["Unity", "C#", "Blender", "FMOD Sound System", "UniTask"],
    overview: "LingoQuest, oyuncuların harfleri birleştirerek kelimeler türettiği, kelime dağarcığıyla taktiksel bölgeleri fethettiği, zengin ses atmosferine ve derin oynanış mekaniklerine sahip tek oyunculu bir strateji-bulmaca oyunudur.",
    overviewEn: "LingoQuest is a single-player strategy-puzzle game where players create words by combining letters, conquer tactical territories with their vocabulary, featuring rich sound atmosphere and deep gameplay mechanics.",
    problem: "Klasik kelime oyunlarının birbirinin kopyası olan monoton bulmaca yapısı. Oyuncuların kelime bilgilerini kullanırken taktiksel kararlar verebilecekleri ve ilerleme kaydedebilecekleri bir hikaye tabanlı oyun döngüsünün eksikliği.",
    problemEn: "Monotonous puzzle structure of classic word games being copies of each other. Lack of a story-based game loop where players can make tactical decisions and track progress while using their word knowledge.",
    solution: "Unity motoru ile C# dilinde geliştirilmiştir. Nesne tabanlı oyun mimarisi ve optimize edilmiş oyun döngüsü için UniTask asenkron kütüphaneleri kullanılmıştır. Oyundaki minimalist 3D modeller Blender ile tasarlanmış ve FMOD ile dinamik, etkileşimli bir ses tasarımı entegre edilmiştir.",
    solutionEn: "Developed with Unity engine in C#. Object-oriented game architecture and UniTask asynchronous libraries for optimized game loop. Minimalist 3D models designed in Blender and dynamic, interactive sound design integrated with FMOD.",
    links: {
      appStore: null,
      playStore: "https://play.google.com",
      web: null,
    },
    mockupType: "game",
    accent: "text-amber-400 font-semibold",
    bgAccent: "bg-amber-500/10",
    glowColor: "rgba(217, 119, 6, 0.15)",
  },
];

// Tekil Proje Kartı Bileşeni - 3D Tilt ve Mouse Takip Efekti İçeren Premium Yapı
function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [activeTab, setActiveTab] = useState<"overview" | "problem" | "solution">("overview");
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isHovered) return;

    let lines: string[] = [];
    if (project.id === "lystra") {
      lines = [
        "[COMPILING TAILWIND CSS...]",
        "> tailwindcss -i src/input.css -o dist/output.css --minify",
        "> size: 99KB [OK]",
        "> wp-theme-check: 0 errors",
        "BUILD SUCCESSFUL",
      ];
    } else if (project.id === "huzur-vakti") {
      lines = [
        "[LAUNCHING FLUTTER BUILD...]",
        "> flutter build apk --release --split-per-abi",
        "> built release/app-release.apk (18.4MB) [OK]",
        "> target: android-arm64",
        "BUILD SUCCESSFUL",
      ];
    } else if (project.id === "merkezi-nokta") {
      lines = [
        "[RUNNING BLoC SUITE...]",
        "> flutter test test/news_bloc_test.dart",
        "> verified Hive local caching [OK]",
        "> 14/14 unit tests passed",
        "TEST RUN SUCCESSFUL",
      ];
    } else if (project.id === "lingo") {
      lines = [
        "[COMPILING SHADERS & AUDIO...]",
        "> compiling WebGL assets",
        "> FMOD bank loaded [OK]",
        "> compiling 12 shaders [OK]",
        "UNITY BUILD SUCCESSFUL",
      ];
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length) {
        setLogs((prev) => [...prev, lines[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isHovered, project.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Fare koordinatlarını -0.5 ile 0.5 arasına normalize et
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Maksimum 5 derece eğilme açısı (Zarif ve lüks his için hafif tutuldu)
    const tiltX = -normY * 5;
    const tiltY = normX * 5;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
        setLogs([]);
      }}
      style={{
        ...tiltStyle,
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
      className="relative p-[1px] rounded-3xl overflow-hidden bg-zinc-900/35 border border-zinc-900/40 transition-all duration-300 group"
    >
      {/* 1. Katman: Fareyi takip eden interaktif gradyan border parlaması */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      {/* 2. Katman: Arka plandaki yumuşak renkli ambient parlaması */}
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: project.glowColor }}
      />

      {/* Kart İçeriği Kapsayıcısı */}
      <div className="relative z-10 w-full h-full rounded-[23px] bg-zinc-950/90 p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* SOL/SAĞ SÜTUN: Bilgiler ve Vaka Analizi */}
        <div className={`w-full lg:w-1/2 flex flex-col items-start gap-6 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
          {/* Kategori ve Rol Etiketi */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider">
            <span>{project.category}</span>
            <span className="text-zinc-800">•</span>
            <span className="text-zinc-400">{project.role}</span>
          </div>

          {/* Proje Başlığı */}
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
            {project.title}
          </h3>

          {/* Teknoloji Etiketleri */}
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-zinc-900/45 border border-zinc-900 text-[10px] font-mono text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* İnteraktif Sekmeler (Vercel Stilinde) */}
          <div className="flex border-b border-zinc-900 w-full mt-2 relative">
            {(["overview", "problem", "solution"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-[10px] md:text-xs font-mono uppercase tracking-widest border-b-2 transition-all focus:outline-none relative ${
                  activeTab === tab
                    ? "border-white text-white font-semibold"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "overview" && t("Genel Bakış", "Overview")}
                {tab === "problem" && t("Çözülen Problem", "Problem Solved")}
                {tab === "solution" && t("Teknik Çözüm", "Technical Solution")}
              </button>
            ))}
          </div>

          {/* Sekme İçerik Alanı */}
          <div className="min-h-[140px] w-full text-zinc-400 text-xs md:text-sm leading-relaxed py-2">
            {activeTab === "overview" && <p className="animate-fade-in">{t(project.overview, project.overviewEn)}</p>}
            {activeTab === "problem" && <p className="animate-fade-in">{t(project.problem, project.problemEn)}</p>}
            {activeTab === "solution" && <p className="animate-fade-in">{t(project.solution, project.solutionEn)}</p>}
          </div>

          {/* Aksiyon Linkleri */}
          <div className="flex flex-wrap items-center gap-3 mt-2 w-full">
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-[10px] md:text-xs font-mono text-zinc-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
                </svg>
                App Store
              </a>
            )}
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-[10px] md:text-xs font-mono text-zinc-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M5.23 2.06A1.85 1.85 0 0 0 5 2.3v19.4c.03.08.1.16.23.24l10.28-10.27L5.23 2.06M16.5 10.68L19.2 12l-2.7 1.32-.01-.01L16.5 10.68M6.65 3.32L15.39 12 6.65 20.68A1.12 1.12 0 0 1 6.5 20l.02-15.9c.02-.32.07-.61.13-.78m10-.12l2.3 2.3a1.44 1.44 0 0 1 0 2l-2.3 2.3-3.66-3.65 3.66-3.65" />
                </svg>
                Google Play
              </a>
            )}
            {project.links.web && (
              <a
                href={project.links.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-[10px] md:text-xs font-bold hover:bg-white transition-all font-mono shadow-md shadow-black/20"
              >
                {t("Canlı Demoyu Gör", "View Live Demo")}
                <svg
                  className="w-3 h-3 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* SAĞ/SOL SÜTUN: İnteraktif 3D Cihaz Mockup'ı */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center ${isEven ? "order-1" : "order-1 lg:order-2"}`}>
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center select-none">
            
            {/* Lystra: 3D Perspektifli Browser Mockup */}
            {project.id === "lystra" && (
              <div
                className="w-full max-w-[340px] aspect-[4/3] bg-zinc-950 rounded-xl border border-white/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.06)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(16,185,129,0.12)] group-hover:scale-[1.02]"
                style={{
                  transform: "perspective(1000px) rotateX(10deg) rotateY(-14deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Browser Pencere Üst Barı */}
                <div className="h-6 bg-zinc-900 border-b border-white/5 px-3 flex items-center gap-1.5 z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                  <div className="flex-1 max-w-[170px] mx-auto h-3.5 bg-zinc-950 rounded-md border border-white/5 flex items-center justify-center px-2">
                    <span className="text-[6px] font-mono text-zinc-600 tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      lystra.studio
                    </span>
                  </div>
                </div>
                {/* Görsel */}
                <div className="relative w-full h-[calc(100%-24px)] bg-zinc-950 overflow-hidden">
                  <img
                    src="/lystra.jpg"
                    alt="Lystra Studio Premium WooCommerce Theme"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/30 via-transparent to-white/5 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Huzur Vakti Pro: 3D Eğimli Gerçek Ekran Görüntülü Telefon Mockup */}
            {project.id === "huzur-vakti" && (
              <div
                className="w-[190px] h-[360px] bg-zinc-950 rounded-[34px] border-[4.5px] border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.06)] relative p-1.5 flex flex-col overflow-hidden transition-all duration-750 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.12)] group-hover:scale-[1.03]"
                style={{
                  transform: "perspective(1000px) rotateX(10deg) rotateY(14deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Hoparlör & Kamera Çentiği */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-zinc-800/90 rounded-b-xl flex items-center justify-center z-30">
                  <div className="w-6 h-0.5 bg-zinc-900 rounded-full"></div>
                </div>
                {/* Ekran */}
                <div className="w-full h-full rounded-[28px] overflow-hidden bg-zinc-950 relative z-10">
                  <img
                    src="/huzur-vakti.png"
                    alt="Huzur Vakti Pro Ekran Görüntüsü"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/40 via-transparent to-white/5 pointer-events-none"></div>
                </div>
              </div>
            )}

            {/* Merkezi Nokta: 3D Eğimli Gerçek Ekran Görüntülü Telefon Mockup */}
            {project.id === "merkezi-nokta" && (
              <div
                className="w-[190px] h-[360px] bg-zinc-950 rounded-[34px] border-[4.5px] border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.06)] relative p-1.5 flex flex-col overflow-hidden transition-all duration-750 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.12)] group-hover:scale-[1.03]"
                style={{
                  transform: "perspective(1000px) rotateX(10deg) rotateY(-14deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Çentik */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-zinc-800/90 rounded-b-xl flex items-center justify-center z-30">
                  <div className="w-6 h-0.5 bg-zinc-900 rounded-full"></div>
                </div>
                {/* Ekran */}
                <div className="w-full h-full rounded-[28px] overflow-hidden bg-zinc-950 relative z-10">
                  <img
                    src="/merkezi-nokta.png"
                    alt="Merkezi Nokta App Ekran Görüntüsü"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/40 via-transparent to-white/5 pointer-events-none"></div>
                </div>
              </div>
            )}

            {/* LingoQuest: 3D Eğimli Oyun Ekranı Mockup */}
            {project.id === "lingo" && (
              <div
                className="w-[190px] h-[360px] bg-zinc-950 rounded-[34px] border-[4.5px] border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(217,119,6,0.06)] relative p-3 flex flex-col justify-between overflow-hidden transition-all duration-750 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_50px_rgba(217,119,6,0.12)] group-hover:scale-[1.03]"
                style={{
                  transform: "perspective(1000px) rotateX(10deg) rotateY(14deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-zinc-800/90 rounded-b-xl z-20"></div>
                
                <div className="flex-1 flex flex-col justify-between pt-5 pb-1 px-1 z-10">
                  {/* Oyun Üst Paneli */}
                  <div className="flex justify-between items-center text-[6px] font-mono text-zinc-500">
                    <span>Skor: 1,240</span>
                    <span className="text-amber-500 font-bold">BÖLÜM 12</span>
                  </div>

                  {/* Kelime Grid Alanı */}
                  <div className="my-auto flex flex-col items-center gap-5">
                    <div className="grid grid-cols-3 gap-1.5 justify-center">
                      <div className="w-8 h-8 border border-zinc-800 rounded-md flex items-center justify-center text-[10px] font-bold text-zinc-600 bg-zinc-900/10">K</div>
                      <div className="w-8 h-8 border border-amber-500/30 bg-amber-500/5 rounded-md flex items-center justify-center text-[10px] font-bold text-amber-400">U</div>
                      <div className="w-8 h-8 border border-amber-500/30 bg-amber-500/5 rounded-md flex items-center justify-center text-[10px] font-bold text-amber-400">Z</div>
                      <div className="w-8 h-8 border border-amber-500/30 bg-amber-500/5 rounded-md flex items-center justify-center text-[10px] font-bold text-amber-400">G</div>
                      <div className="w-8 h-8 border border-amber-500/30 bg-amber-500/5 rounded-md flex items-center justify-center text-[10px] font-bold text-amber-400">U</div>
                      <div className="w-8 h-8 border border-zinc-800 rounded-md flex items-center justify-center text-[10px] font-bold text-zinc-600 bg-zinc-900/10">N</div>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[5px] font-mono text-zinc-500 uppercase tracking-widest">Seçilen Kelime</span>
                      <span className="text-[9px] font-bold font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">UZGUN</span>
                    </div>
                  </div>

                  {/* Oyun Kontrolleri */}
                  <div className="grid grid-cols-3 gap-1 text-[5px] font-mono text-center text-zinc-500">
                    <div className="py-1 border border-zinc-900 rounded bg-zinc-950">İpucu</div>
                    <div className="py-1 border border-zinc-900 rounded bg-zinc-950">Karıştır</div>
                    <div className="py-1 border border-zinc-900 rounded bg-zinc-950">Pas</div>
                  </div>
                </div>
              </div>
            )}

            {/* Siber Derleme Çıktısı Katmanı */}
            <div
              className={`absolute inset-x-4 bottom-4 z-25 bg-zinc-950/95 border border-zinc-900 rounded-xl p-3.5 font-mono text-[8px] text-emerald-400/85 flex flex-col gap-1 shadow-2xl transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-1.5 mb-1.5 text-[7px] text-zinc-500 font-bold">
                <span>BUILDER_SHELL // {project.id.toUpperCase()}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>
              {logs.map((log, i) => (
                <div key={i} className="leading-tight select-none">
                  {log}
                </div>
              ))}
              {logs.length < 5 && (
                <div className="flex items-center gap-0.5">
                  <span className="text-zinc-600">&gt;</span>
                  <span className="w-0.5 h-2 bg-emerald-400/80 animate-pulse" />
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-32 bg-zinc-950 border-t border-zinc-900/30 relative overflow-hidden">
      {/* İnce Geometrik Arka Plan Çizgileri */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              {t("[ 02 // SEÇİLMİŞ İŞLER ]", "[ 02 // SELECTED WORKS ]")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("Vaka Analizleri", "Case Studies")} <span className="text-zinc-500">{t("& Projeler", "& Projects")}</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-xl leading-relaxed mt-2">
            {t(
              "Sadece kod yazmıyor; ürünün amacına, kullanıcı deneyimine ve temiz teknik mimarisine odaklanıyorum. İşte detaylı vaka analizleri:",
              "I don't just write code; I focus on the product's purpose, user experience and clean technical architecture. Here are detailed case studies:"
            )}
          </p>
        </div>

        {/* Projeler Listesi */}
        <div className="flex flex-col gap-20">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
