"use client";

import React, { useState } from "react";

// Platform verileri
const platforms = [
  {
    name: "LinkedIn",
    tagline: "Profesyonel Ağ & Bağlantılar",
    url: "https://www.linkedin.com/in/mustafadumannn/",
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Bionluk",
    tagline: "Yerel Freelance İş Birlikleri",
    url: "https://bionluk.com/mustafadumannn",
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Upwork",
    tagline: "Global Projeler & Kurumsal Kontratlar",
    url: "https://www.upwork.com/freelancers/~019c51a2034bf5a868",
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Fiverr",
    tagline: "Uluslararası Hizmetler & Bireysel İşler",
    url: "https://www.fiverr.com/users/mustafadumann",
    icon: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "hello@kuzgun.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-zinc-900/50 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col items-start gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 05 // İLETİŞİM ]
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bir Sonraki Fikri <br />
            <span className="text-zinc-500">Birlikte İnşa Edelim.</span>
          </h2>
        </div>

        {/* İletişim Alanı Izgarası (Asimetrik Bölme) */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch mb-24">
          {/* Sol Kısım: E-posta Kopyalama Kartı ve Mesaj */}
          <div className="w-full lg:w-5/12 bg-zinc-900/20 border border-zinc-900 rounded-xl p-8 md:p-10 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Doğrudan İletişim Hattı
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                Aklınızda bir proje mi var? Mobil uygulama, web platformu veya Unity tabanlı bir oyun fikri... Benimle doğrudan e-posta yoluyla iletişime geçebilir, fikirlerinizi paylaşabilirsiniz. En geç 24 saat içinde dönüş yaparım.
              </p>
            </div>

            {/* E-posta Kartı (Kopyalanabilir) */}
            <div
              onClick={handleCopyEmail}
              className="relative border border-zinc-800 hover:border-zinc-700 bg-zinc-950 rounded-lg p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.01]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                  E-POSTA ADRESİ (KOPYALAMAK İÇİN TIKLAYIN)
                </span>
                <span className="text-sm md:text-base font-bold font-mono text-zinc-100 group-hover:text-white">
                  {emailAddress}
                </span>
              </div>
              <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>

              {/* Toast Bildirimi */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-zinc-900 text-zinc-100 text-[10px] font-mono rounded-lg border border-zinc-800 shadow-2xl transition-all duration-300 flex items-center gap-2 ${
                  copied
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <span className="text-emerald-400">✓</span>
                E-posta adresi kopyalandı.
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Platform Yönlendirme Kartları */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10 rounded-xl flex flex-col justify-between gap-6 transition-all duration-300 group hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {platform.icon}
                  </div>
                  <div className="text-zinc-600 group-hover:text-zinc-300 transition-colors">
                    <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {platform.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    {platform.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Alt Barı */}
        <div className="border-t border-zinc-900 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 100 100"
              className="h-6 w-6 text-zinc-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {/* Geometrik Kuzgun Mini Logosu */}
              <path d="M50 15 L25 45 L50 35 L75 45 Z" fill="currentColor" fillOpacity="0.05" />
              <path d="M25 45 L50 85 L50 35 Z" />
              <path d="M75 45 L50 85 L50 35 Z" />
            </svg>
            <span>© {new Date().getFullYear()} KUZGUN. Tüm hakları saklıdır.</span>
          </div>
          <span className="text-center sm:text-right">
            Next.js & TailwindCSS v4 ile tasarlanıp kodlandı.
          </span>
        </div>
      </div>
    </section>
  );
}
