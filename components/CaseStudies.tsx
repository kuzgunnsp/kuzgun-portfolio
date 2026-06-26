"use client";

import React, { useState } from "react";

// Proje verileri ve vaka analizi içerikleri
const projectsData = [
  {
    id: "lystra",
    title: "Lystra Studio",
    category: "Premium WooCommerce Web Theme",
    role: "Lead Developer & UI/UX Designer",
    techs: ["WordPress", "PHP", "WooCommerce", "Vanilla JS", "Tailwind CSS", "OCDI"],
    overview: "Lystra Studio, modern e-ticaret sitelerinin yüksek performans ve estetik ihtiyaçlarını karşılamak üzere tasarlanmış, editoryal lüks (editorial luxury) konseptine sahip, yüksek dönüşüm odaklı ve ultra hızlı bir premium WooCommerce temasıdır. Vogue ve Kinfolk gibi lüks tasarım dergilerinin dingin, asimetrik ve prestijli estetiğini dijital mağazalara taşır.",
    problem: "Geleneksel WooCommerce temalarının Elementor, WPBakery gibi hantal sayfa yapıcılar, düzinelerce yavaş eklenti ve eski jQuery kütüphaneleriyle siteleri aşırı yavaşlatması (PageSpeed skorlarının düşmesi), güvenlik açıkları yaratması ve standart, tek düze 'kutu' tasarımlarla premium marka imajına zarar vermesi.",
    solution: "Hiçbir sayfa yapıcıya ihtiyaç duymayan çekirdek WooCommerce entegrasyonu. Tamamı ham Vanilla JS ile sıfırdan kodlanmış, jQuery bağımlılığı olmayan interaktif modüller (AJAX Yan Sepet, Arama ve Ücretsiz Kargo Çubuğu). Yayına çıkarken 99KB'a sıkıştırılmış Tailwind CSS mimarisi ve %100 güvenli, WordPress Theme Check standartlarına uygun, XSS/SQL enjeksiyon korumalı (sanitized & escaped) PHP altyapısı.",
    links: {
      appStore: null,
      playStore: null,
      web: "https://dev-lystra.pantheonsite.io/",
    },
    mockupType: "browser",
    accent: "text-emerald-400 font-semibold",
    bgAccent: "bg-emerald-500/10",
  },
  {
    id: "huzur-vakti",
    title: "Huzur Vakti Pro",
    category: "Cross-Platform Mobile App",
    role: "Lead Developer & UI/UX Designer",
    techs: ["Flutter", "Dart", "Riverpod", "SQLite", "Compass API", "WidgetKit"],
    overview: "Huzur Vakti Pro, Müslümanların günlük ibadetlerini en doğru şekilde takip etmeleri için tasarlanmış, altın ve koyu tema estetiğine sahip, reklamsız ve gizlilik odaklı premium bir mobil uygulamadır.",
    problem: "Mevcut ibadet uygulamalarının aşırı agresif reklamlar, karmaşık ve yaşlılar için zorlayıcı arayüzler, pili hızla tüketen verimsiz konum servisleri ile ibadet odağını ve huzurunu bozması.",
    solution: "Flutter ve Dart kullanılarak geliştirilen, pil dostu ve reklamsız bir altyapı. Diyanet İşleri Başkanlığı uyumlu hassas yerel vakit hesaplama motoru, animasyonlu pusula sensörü entegrasyonu, cüz cüz sesli okuma için gelişmiş ses oynatıcı motoru ve iOS/Android için akıllı kilit ekranı widget desteği.",
    links: {
      appStore: "https://apps.apple.com/us/app/huzur-vakti-ezan-kuran-k%C4%B1ble/id6755821374",
      playStore: "https://play.google.com/store/apps/details?id=com.kuzgun.ezanvakti",
      web: "https://huzurvaktipro.com",
    },
    mockupType: "phone",
    accent: "text-amber-400 font-semibold",
    bgAccent: "bg-amber-500/10",
  },
  {
    id: "merkezi-nokta",
    title: "Merkezi Nokta",
    category: "Cross-Platform News Application",
    role: "Lead Mobile Developer & UI/UX Designer",
    techs: ["Flutter", "Dart", "BLoC Pattern", "Hive DB", "Firebase FCM", "REST API"],
    overview: "Merkezi Nokta, güncel gelişmeleri, son dakika haberlerini ve spor haberlerini kullanıcılara anlık bildirimlerle ve yüksek performanslı bir arayüzle sunan modern bir mobil haber portalı uygulamasıdır.",
    problem: "Haber uygulamalarının aşırı reklam yükü, hantal veri çekme işlemleri, yavaş yüklenme süreleri ve çevrimdışı okuma desteği barındırmaması nedeniyle kullanıcıların güncel bilgiye hızla ulaşamaması.",
    solution: "Flutter ve Dart kullanılarak BLoC mimarisiyle geliştirilen hafif haber motoru. Hive yerel veritabanı ile tam çevrimdışı önbellekleme (caching) sistemi. Firebase Cloud Messaging entegrasyonuyla 1 saniyenin altında son dakika bildirim iletimi, asimetrik haber slider'ı ve dinamik kategori filtresi.",
    links: {
      appStore: null,
      playStore: null,
      web: null,
    },
    mockupType: "phone",
    accent: "text-blue-400 font-semibold",
    bgAccent: "bg-blue-500/10",
  },
  {
    id: "lingo",
    title: "LingoQuest",
    category: "Word Strategy Mobile Game",
    role: "Solo Game Developer & 3D Artist",
    techs: ["Unity", "C#", "Blender", "FMOD Sound System", "UniTask"],
    overview: "LingoQuest, oyuncuların harfleri birleştirerek kelimeler türettiği, kelime dağarcığıyla taktiksel bölgeleri fethettiği, zengin ses atmosferine ve derin oynanış mekaniklerine sahip tek oyunculu bir strateji-bulmaca oyunudur.",
    problem: "Klasik kelime oyunlarının birbirinin kopyası olan monoton bulmaca yapısı. Oyuncuların kelime bilgilerini kullanırken taktiksel kararlar verebilecekleri ve ilerleme kaydedebilecekleri bir hikaye tabanlı oyun döngüsünün eksikliği.",
    solution: "Unity motoru ile C# dilinde geliştirilmiştir. Nesne tabanlı oyun mimarisi ve optimize edilmiş oyun döngüsü için UniTask asenkron kütüphaneleri kullanılmıştır. Oyundaki minimalist 3D modeller Blender ile tasarlanmış ve FMOD ile dinamik, etkileşimli bir ses tasarımı entegre edilmiştir.",
    links: {
      appStore: null,
      playStore: "https://play.google.com",
      web: null,
    },
    mockupType: "game",
    accent: "text-amber-400 font-semibold",
    bgAccent: "bg-amber-500/10",
  },
];

export default function CaseStudies() {
  // Her proje için aktif olan sekmeyi tutan state (overview | problem | solution)
  const [activeTabs, setActiveTabs] = useState<Record<string, "overview" | "problem" | "solution">>({
    lystra: "overview",
    "huzur-vakti": "overview",
    "merkezi-nokta": "overview",
    lingo: "overview",
  });

  const handleTabChange = (projectId: string, tab: "overview" | "problem" | "solution") => {
    setActiveTabs((prev) => ({
      ...prev,
      [projectId]: tab,
    }));
  };

  return (
    <section id="projects" className="py-32 bg-zinc-950 border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 02 // SEÇİLMİŞ İŞLER ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Vaka Analizleri <span className="text-zinc-500">& Projeler</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed mt-2">
            Sadece kod yazmıyor, ürünün amacına, kullanıcı deneyimine ve teknik mimarisine odaklanıyorum. İşte detaylı vaka analizleri:
          </p>
        </div>

        {/* Projeler Listesi */}
        <div className="flex flex-col gap-32">
          {projectsData.map((project, index) => {
            const activeTab = activeTabs[project.id] || "overview";
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* 1. Kısım: Hikaye ve Detaylar (Genel Bakış, Problem, Çözüm) */}
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                  {/* Proje Kategorisi ve Rol */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 uppercase">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className="text-zinc-400">{project.role}</span>
                  </div>

                  {/* Proje İsmi */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>

                  {/* Teknoloji Etiketleri */}
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-zinc-900/50 border border-zinc-800 text-[10px] md:text-xs font-mono text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* İnteraktif Sekme Menüsü */}
                  <div className="flex border-b border-zinc-900 w-full mt-4">
                    {(["overview", "problem", "solution"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(project.id, tab)}
                        className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all focus:outline-none ${
                          activeTab === tab
                            ? "border-zinc-100 text-zinc-100 font-medium"
                            : "border-transparent text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {tab === "overview" && "Genel Bakış"}
                        {tab === "problem" && "Çözülen Problem"}
                        {tab === "solution" && "Teknik Çözüm"}
                      </button>
                    ))}
                  </div>

                  {/* Dinamik Sekme İçeriği */}
                  <div className="min-h-[140px] w-full text-zinc-400 text-sm md:text-base leading-relaxed py-2">
                    {activeTab === "overview" && <p>{project.overview}</p>}
                    {activeTab === "problem" && <p>{project.problem}</p>}
                    {activeTab === "solution" && <p>{project.solution}</p>}
                  </div>

                  {/* Yönlendirme Linkleri (App Store, Play Store, Web) */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 w-full">
                    {project.links.appStore && (
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 text-xs font-medium text-zinc-200 hover:text-white transition-all font-mono"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 text-xs font-medium text-zinc-200 hover:text-white transition-all font-mono"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-all font-mono"
                      >
                        Canlı Demoyu Gör
                        <svg
                          className="w-3.5 h-3.5 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
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

                {/* 2. Kısım: Görsel Arayüz (Cihaz Mockup'ı veya Gerçek Görsel) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className={`relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-zinc-900/50 shadow-2xl group transition-all duration-500 ${
                    project.id === "lystra" ? "p-0 bg-zinc-950 aspect-square" : "p-8 bg-zinc-900/30 aspect-[4/5]"
                  }`}>
                    {/* Arka Plan Muted Geometrik Izgara veya Daire (Sadece SVG Mockup'lar için) */}
                    {project.id !== "lystra" && (
                      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
                        <div className="w-[300px] h-[300px] rounded-full border border-zinc-700 border-dashed animate-spin-[20s] duration-1000"></div>
                      </div>
                    )}

                    {/* Görsel veya Projeye Özgü SVG Çizimleri */}
                    <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${
                      project.id === "lystra" ? "" : "group-hover:scale-105"
                    }`}>
                      
                      {/* LYSTRA STUDIO GERÇEK GÖRSEL ENTEGRASYONU */}
                      {project.id === "lystra" && (
                        <div className="w-full h-full relative">
                          <img
                            src="/lystra.jpg"
                            alt="Lystra Studio Modern WooCommerce Theme"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                          {/* İnce iç sınır çizgisi */}
                          <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>
                        </div>
                      )}

                      {/* HUZUR VAKTİ PRO MOCKUP (Minimalist Phone Frame, Golden & Dark theme) */}
                      {project.mockupType === "phone" && project.id === "huzur-vakti" && (
                        <div className="w-[200px] h-[380px] bg-[#0c0c0d] rounded-[36px] border-[4px] border-zinc-800 shadow-2xl relative p-3 flex flex-col justify-between overflow-hidden">
                          {/* Hoparlör & Kamera Çentiği */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-b-xl flex items-center justify-center z-10">
                            <div className="w-8 h-1 bg-zinc-900 rounded-full"></div>
                          </div>
                          {/* Uygulama İçeriği */}
                          <div className="flex-1 flex flex-col justify-between pt-6 pb-2 px-1">
                            <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500">
                              <span>09:41</span>
                              <span className="text-amber-500 font-bold">HUZUR VAKTİ</span>
                            </div>
                            
                            {/* Ana İbadet / Ramazan Widget Kartı */}
                            <div className="my-auto flex flex-col gap-3.5">
                              {/* Altın Hilal ve Yıldız Sembolü */}
                              <div className="flex justify-center text-amber-500 text-[10px] animate-pulse">
                                🌙
                              </div>
                              
                              {/* Kalan Süre Kartı */}
                              <div className="bg-zinc-900/60 border border-amber-500/10 rounded-xl p-2.5 flex flex-col items-center gap-1">
                                <span className="text-[6px] font-mono text-amber-500/80 uppercase tracking-widest">İftara Kalan Süre</span>
                                <span className="text-sm font-bold font-mono text-amber-500 tracking-wider">04:18:22</span>
                                <div className="w-full h-[2px] bg-zinc-800 rounded-full mt-1 overflow-hidden">
                                  <div className="h-full w-[70%] bg-amber-500"></div>
                                </div>
                              </div>
                              
                              {/* Namaz Vakitleri Mini Liste */}
                              <div className="flex flex-col gap-1 text-[7px] font-mono">
                                <div className="flex justify-between px-1.5 py-0.5 text-zinc-500">
                                  <span>İmsak</span>
                                  <span>03:42</span>
                                </div>
                                <div className="flex justify-between px-1.5 py-0.5 text-zinc-500">
                                  <span>Öğle</span>
                                  <span>13:12</span>
                                </div>
                                {/* Aktif Vakit (Akşam) */}
                                <div className="flex justify-between px-1.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 font-bold">
                                  <span>Akşam (İftar)</span>
                                  <span>20:38</span>
                                </div>
                                <div className="flex justify-between px-1.5 py-0.5 text-zinc-500">
                                  <span>Yatsı</span>
                                  <span>22:15</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Alt Gezinti Barı */}
                            <div className="flex justify-around items-center border-t border-zinc-900 pt-2 text-[6px] font-mono text-zinc-600">
                              <span className="text-amber-500">Vakitler</span>
                              <span>Pusula</span>
                              <span>Kuran</span>
                              <span>Dualar</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* MERKEZİ NOKTA MOCKUP (Telefon Çerçevesi İçinde Gerçek Ekran Görüntüsü) */}
                      {project.mockupType === "phone" && project.id === "merkezi-nokta" && (
                        <div className="w-[200px] h-[380px] bg-zinc-950 rounded-[36px] border-[4px] border-zinc-800 shadow-2xl relative p-1 flex flex-col overflow-hidden">
                          {/* Hoparlör & Kamera Çentiği */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-b-xl flex items-center justify-center z-30">
                            <div className="w-8 h-1 bg-zinc-900 rounded-full"></div>
                          </div>
                          {/* Telefon Ekran Alanı (İçerisinde Yüklenen Görsel) */}
                          <div className="w-full h-full rounded-[32px] overflow-hidden bg-zinc-950 relative z-10">
                            <img
                              src="/merkezi-nokta.png"
                              alt="Merkezi Nokta App UI"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            {/* Ekran yansıması detayı */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                          </div>
                        </div>
                      )}

                      {/* LINGOQUEST MOCKUP (Game Screen & Minimalist Hex Grid / Letter Blocks) */}
                      {project.mockupType === "game" && (
                        <div className="w-[200px] h-[380px] bg-zinc-950 rounded-[36px] border-[4px] border-zinc-800 shadow-2xl relative p-3 flex flex-col justify-between overflow-hidden">
                          {/* Oyun Arayüzü Çerçevesi */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-b-xl z-20"></div>
                          
                          <div className="flex-1 flex flex-col justify-between pt-6 pb-2 px-2 z-10">
                            {/* Üst Skor/Bölüm Barı */}
                            <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500">
                              <span>Skor: 1,240</span>
                              <span className="text-amber-400 font-bold">BÖLÜM 12</span>
                            </div>

                            {/* Kelime Tahtası / Hex Grid Tasarımı */}
                            <div className="my-auto flex flex-col items-center gap-6">
                              {/* Bulmaca Grid (Çizgisel) */}
                              <div className="grid grid-cols-3 gap-1.5 justify-center">
                                <div className="w-9 h-9 border border-zinc-800 rounded flex items-center justify-center text-xs font-bold text-zinc-500">K</div>
                                <div className="w-9 h-9 border border-amber-500/40 bg-amber-500/5 rounded flex items-center justify-center text-xs font-bold text-amber-400">U</div>
                                <div className="w-9 h-9 border border-amber-500/40 bg-amber-500/5 rounded flex items-center justify-center text-xs font-bold text-amber-400">Z</div>
                                <div className="w-9 h-9 border border-amber-500/40 bg-amber-500/5 rounded flex items-center justify-center text-xs font-bold text-amber-400">G</div>
                                <div className="w-9 h-9 border border-amber-500/40 bg-amber-500/5 rounded flex items-center justify-center text-xs font-bold text-amber-400">U</div>
                                <div className="w-9 h-9 border border-zinc-800 rounded flex items-center justify-center text-xs font-bold text-zinc-500">N</div>
                              </div>

                              {/* Bağlantı Çizgisi Simülasyonu */}
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Seçilen Kelime</span>
                                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">UZGUN</span>
                              </div>
                            </div>

                            {/* Güçlendirme Butonları */}
                            <div className="grid grid-cols-3 gap-1 text-[7px] font-mono text-center text-zinc-400">
                              <div className="py-1 border border-zinc-900 rounded bg-zinc-900/20">İpucu</div>
                              <div className="py-1 border border-zinc-900 rounded bg-zinc-900/20">Karıştır</div>
                              <div className="py-1 border border-zinc-900 rounded bg-zinc-900/20">Pas</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
