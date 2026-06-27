"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

// Çalışma Prensipleri / İlkeler verisi
const principles = [
  {
    number: "01",
    title: "Ayrıntıda Mükemmellik",
    titleEn: "Excellence in Detail",
    description: "Tasarımdaki 1 piksellik hizalamadan, koddaki bellek sızıntısına kadar her ayrıntı önemlidir. Ayrıntılara gösterilen özen, ürünün nihai kalitesini belirler.",
    descriptionEn: "Attention to detail, from 1-pixel alignment in design to memory leaks in code, matters. The care shown to details determines the final quality of the product.",
  },
  {
    number: "02",
    title: "Önce Performans",
    titleEn: "Performance First",
    description: "Bir uygulamanın veya web sitesinin yüklenme hızı ve akıcılığı, kullanıcı deneyiminin temelidir. Aşırı süslemeler yerine her zaman yüksek hızı ve temiz kod tabanını tercih ederim.",
    descriptionEn: "Loading speed and fluidity of an app or website is the foundation of user experience. I always prefer high speed and clean codebase over excessive decorations.",
  },
  {
    number: "03",
    title: "Kullanıcı Odaklılık",
    titleEn: "User-Centric",
    description: "En gelişmiş yazılım mimarisi bile eğer kullanıcıya kolaylık sağlamıyorsa başarısızdır. Ürünlerimi her zaman son kullanıcının gözünden bakar, sezgisel arayüzler geliştiririm.",
    descriptionEn: "Even the most advanced software architecture is a failure if it doesn't provide convenience to the user. I always look from the end user's perspective and develop intuitive interfaces.",
  },
  {
    number: "04",
    title: "Sürdürülebilir Mimari",
    titleEn: "Sustainable Architecture",
    description: "Gelecekte kolayca genişletilebilen, test edilebilir ve iyi belgelenmiş kodlar yazarım. Spagetti kodlardan kaçınır, temiz mimari (Clean Architecture) kurallarını uygularım.",
    descriptionEn: "I write code that can be easily extended, tested and well-documented in the future. I avoid spaghetti code and apply Clean Architecture principles.",
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-zinc-950 border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-24">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              {t("[ 05 // HAKKIMDA & FELSEFE ]", "[ 05 // ABOUT & PHILOSOPHY ]")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t("Tasarım Odaklı", "Design-Driven")} <span className="text-zinc-500">{t("Mühendislik", "Engineering")}</span>
          </h2>
        </div>

        {/* Asimetrik Editorial Kolon Düzeni */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Sol Kolon: Biyografi ve Marka Hikayesi */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 text-zinc-400 text-sm md:text-base leading-relaxed">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {t("Kuzgun Markasının Arkasında Kim Var?", "Who's Behind the Kuzgun Brand?")}
            </h3>
            <p>
              {t(
                "Merhaba, ben dijital ürünler tasarlayan ve kodlayan bir yazılım geliştiricisiyim. Geliştirme süreçlerinde hem estetik arayüz tasarımına (UI/UX) hem de arkada çalışan kodun matematiksel zarafetine ve hızına aynı derecede odaklanırım.",
                "Hello, I'm a software developer who designs and codes digital products. In my development process, I focus equally on aesthetic interface design (UI/UX) and the mathematical elegance and speed of the code running behind it."
              )}
            </p>
            <p>
              {t(
                <>Projelerimi topladığım kişisel markam olan <strong className="text-zinc-200">Kuzgun</strong>, doğadaki en zeki ve en çevik canlılardan biri olan karganın problem çözme yeteneğini temsil eder. Karmaşık yazılım problemlerini, gereksiz katmanlardan arındırarak en sade, en optimize ve en şık çözümlerle çözmeyi ilke edindim.</>,
                <>My personal brand <strong className="text-zinc-200">Kuzgun</strong> (meaning &apos;Raven&apos; in Turkish), represents the problem-solving ability of one of nature&apos;s most intelligent and agile creatures. I&apos;ve made it my principle to solve complex software problems with the simplest, most optimized and most elegant solutions, stripping away unnecessary layers.</>
              )}
            </p>
            <p>
              {t(
                "Flutter ile mobil dünyada cross-platform akıcılık sağlarken, SwiftUI ile Apple ekosisteminin yerel gücünü kullanıyor, Unity ile oyun mekaniklerini şekillendiriyor ve Next.js ile yüksek performanslı web sistemleri kuruyorum. Tasarımdan koda giden yolda köprü görevi görüyorum.",
                "While providing cross-platform fluidity in the mobile world with Flutter, I harness the native power of the Apple ecosystem with SwiftUI, shape game mechanics with Unity, and build high-performance web systems with Next.js. I serve as a bridge on the path from design to code."
              )}
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
                  {t(principle.title, principle.titleEn)}
                </h4>
                {/* İlke Açıklaması */}
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {t(principle.description, principle.descriptionEn)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
