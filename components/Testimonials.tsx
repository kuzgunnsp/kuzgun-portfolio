"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  gradient: string;
  quoteTr: string;
  quoteEn: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Caner Yılmaz",
    title: "Co-Founder & CTO",
    company: "Velo Mobility",
    initials: "CY",
    gradient: "from-purple-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30",
    quoteTr: "Kuzgun, mobil uygulamamızın sıfırdan canlıya geçiş sürecini olağanüstü bir titizlikle yönetti. Clean Architecture ve Flutter konusundaki uzmanlığı sayesinde son derece hızlı, sürdürülebilir ve hatasız bir ürün elde ettik.",
    quoteEn: "Kuzgun managed the transition of our mobile application from scratch to production with outstanding diligence. Thanks to his expertise in Clean Architecture and Flutter, we achieved an extremely fast, sustainable, and bug-free product.",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    title: "Product Director",
    company: "Aether Analytics",
    initials: "SJ",
    gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    quoteTr: "Next.js ile geliştirdiği analitik paneli sayesinde sayfa yüklenme hızımız dramatik şekilde arttı. Detaylara verdiği önem, temiz kod standartları ve sunduğu premium UX çözümleri projemizi bambaşka bir seviyeye taşıdı.",
    quoteEn: "Thanks to the analytics panel he developed using Next.js, our page load speed increased dramatically. His attention to detail, clean code standards, and the premium UX solutions he provided took our project to a whole new level.",
  },
  {
    id: "3",
    name: "Kerem Demir",
    title: "Creative Director",
    company: "Novus Game Studio",
    initials: "KD",
    gradient: "from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30",
    quoteTr: "Unity ile geliştirdiğimiz interaktif deneyimdeki fizik motoru optimizasyonu ve oyun mekaniği kodlaması kusursuzdu. Karmaşık algoritmaları sadeleştirme kabiliyeti ve problem çözme hızı ekibimize büyük zaman kazandırdı.",
    quoteEn: "The physics engine optimization and gameplay mechanic coding in the interactive experience we developed with Unity were flawless. His ability to simplify complex algorithms and his speed in problem-solving saved our team immense time.",
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 bg-zinc-950 border-t border-zinc-900/50 relative overflow-hidden">
      {/* Decorative Gradient Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Asymmetrical Editorial Header & Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Title, Description, and Navigation */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-zinc-800"></span>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                {t("[ 06 // REFERANSLAR ]", "[ 06 // TESTIMONIALS ]")}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("Birlikte", "Collaborative")} <br />
              <span className="text-zinc-500">{t("Üretenlerin Gözünden", "Perspectives")}</span>
            </h2>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
              {t(
                "İş ortaklarımla ve müşterilerimle kurduğum şeffaf iletişim, yüksek disiplin ve vizyoner yaklaşım sayesinde hayata geçen başarılı projelerin yansımaları.",
                "Reflections of successful projects brought to life through transparent communication, high discipline, and a visionary approach established with my partners."
              )}
            </p>

            {/* Desktop Navigation Controls */}
            <div className="hidden lg:flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center justify-center group"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center justify-center group"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-baseline gap-1.5 font-mono text-xs">
                <span className="text-white font-bold">{(activeIndex + 1).toString().padStart(2, "0")}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-500">{testimonials.length.toString().padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sliding Carousel Content */}
          <div className="lg:col-span-7 w-full relative">
            <div className="relative min-h-[380px] md:min-h-[320px] flex items-center justify-center">
              {testimonials.map((item, index) => {
                const isActive = index === activeIndex;
                const isNext = (index === (activeIndex + 1) % testimonials.length);
                const isPrev = (index === (activeIndex - 1 + testimonials.length) % testimonials.length);

                return (
                  <div
                    key={item.id}
                    className={`absolute w-full transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-x-0 scale-100 z-20 pointer-events-auto"
                        : isNext
                        ? "opacity-0 lg:opacity-40 translate-x-12 scale-95 z-10 pointer-events-none"
                        : isPrev
                        ? "opacity-0 lg:opacity-40 -translate-x-12 scale-95 z-10 pointer-events-none"
                        : "opacity-0 scale-90 z-0 pointer-events-none"
                    }`}
                  >
                    <div className="glass-panel p-8 md:p-10 rounded-2xl border border-zinc-800/40 relative overflow-hidden group">
                      {/* Quote Icon Background Accent */}
                      <span className="absolute right-6 top-6 text-zinc-900/50 font-serif text-8xl select-none pointer-events-none">
                        “
                      </span>

                      {/* Client Header Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} border flex items-center justify-center font-bold tracking-wider text-base shadow-inner`}>
                          {item.initials}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base md:text-lg tracking-tight">
                            {item.name}
                          </h3>
                          <p className="text-zinc-500 text-xs md:text-sm font-mono mt-0.5">
                            {item.title} <span className="text-zinc-700">//</span> <span className="text-zinc-400">{item.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Description Text */}
                      <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic relative z-10">
                        &ldquo;{t(item.quoteTr, item.quoteEn)}&rdquo;
                      </p>

                      {/* Small Bottom Accent Line */}
                      <div className="w-12 h-[1px] bg-gradient-to-r from-zinc-800 to-transparent mt-6 group-hover:w-20 transition-all duration-500"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile-Only Controls & Markers */}
            <div className="flex lg:hidden items-center justify-between mt-8">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Progress Index Dots */}
              <div className="flex gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-zinc-800"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop progress indicator dots */}
            <div className="hidden lg:flex justify-end gap-1.5 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-zinc-800"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
