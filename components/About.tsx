"use client";

import React from "react";

// Çalışma Prensipleri / İlkeler verisi
const principles = [
  {
    number: "01",
    title: "Ayrıntıda Mükemmellik",
    description: "Tasarımdaki 1 piksellik hizalamadan, koddaki bellek sızıntısına kadar her ayrıntı önemlidir. Ayrıntılara gösterilen özen, ürünün nihai kalitesini belirler.",
  },
  {
    number: "02",
    title: "Önce Performans",
    description: "Bir uygulamanın veya web sitesinin yüklenme hızı ve akıcılığı, kullanıcı deneyiminin temelidir. Aşırı süslemeler yerine her zaman yüksek hızı ve temiz kod tabanını tercih ederim.",
  },
  {
    number: "03",
    title: "Kullanıcı Odaklılık",
    description: "En gelişmiş yazılım mimarisi bile eğer kullanıcıya kolaylık sağlamıyorsa başarısızdır. Ürünlerimi her zaman son kullanıcının gözünden bakar, sezgisel arayüzler geliştiririm.",
  },
  {
    number: "04",
    title: "Sürdürülebilir Mimari",
    description: "Gelecekte kolayca genişletilebilen, test edilebilir ve iyi belgelenmiş kodlar yazarım. Spagetti kodlardan kaçınır, temiz mimari (Clean Architecture) kurallarını uygularım.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-zinc-950 border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 05 // HAKKIMDA & FELSEFE ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Tasarım Odaklı <span className="text-zinc-500">Mühendislik</span>
          </h2>
        </div>

        {/* Asimetrik Editorial Kolon Düzeni */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Sol Kolon: Biyografi ve Marka Hikayesi */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 text-zinc-400 text-sm md:text-base leading-relaxed">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Kuzgun Markasının Arkasında Kim Var?
            </h3>
            <p>
              Merhaba, ben dijital ürünler tasarlayan ve kodlayan bir yazılım geliştiricisiyim. Geliştirme süreçlerinde hem estetik arayüz tasarımına (UI/UX) hem de arkada çalışan kodun matematiksel zarafetine ve hızına aynı derecede odaklanırım.
            </p>
            <p>
              Projelerimi topladığım kişisel markam olan <strong className="text-zinc-200">Kuzgun</strong>, doğadaki en zeki ve en çevik canlılardan biri olan karganın problem çözme yeteneğini temsil eder. Karmaşık yazılım problemlerini, gereksiz katmanlardan arındırarak en sade, en optimize ve en şık çözümlerle çözmeyi ilke edindim.
            </p>
            <p>
              Flutter ile mobil dünyada cross-platform akıcılık sağlarken, SwiftUI ile Apple ekosisteminin yerel gücünü kullanıyor, Unity ile oyun mekaniklerini şekillendiriyor ve Next.js ile yüksek performanslı web sistemleri kuruyorum. Tasarımdan koda giden yolda köprü görevi görüyorum.
            </p>
          </div>

          {/* Sağ Kolon: Temel Çalışma Prensipleri */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {principles.map((principle) => (
              <div key={principle.number} className="flex flex-col gap-3 group">
                {/* Numara ve Ayraç Çizgisi */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {principle.number} {"//"}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-zinc-800 transition-colors"></div>
                </div>
                {/* İlke Başlığı */}
                <h4 className="text-base font-bold text-white tracking-tight">
                  {principle.title}
                </h4>
                {/* İlke Açıklaması */}
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
