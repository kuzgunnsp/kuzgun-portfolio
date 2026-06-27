"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface Preset {
  name: string;
  nameEn: string;
  accent: string;
  glow: string;
  strength: number;
}

export default function Playground() {
  const { t } = useLanguage();

  // Predefined presets
  const presets: Preset[] = [
    {
      name: "Cyberpunk Alert",
      nameEn: "Cyberpunk Alert",
      accent: "#ff007f", // Hot Pink
      glow: "#00f0ff",   // Neon Cyan
      strength: 1.2,
    },
    {
      name: "Zümrüt Matris",
      nameEn: "Emerald Matrix",
      accent: "#00ff66", // Classic Matrix Green
      glow: "#00ff66",
      strength: 0.9,
    },
    {
      name: "Vaporwave Rüyası",
      nameEn: "Vaporwave Dream",
      accent: "#9d4edd", // Deep Purple
      glow: "#3a86c8",   // Neon Blue Glow
      strength: 1.0,
    },
    {
      name: "Varsayılana Sıfırla",
      nameEn: "Reset Theme",
      accent: "#10b981", // Default Emerald
      glow: "#10b981",
      strength: 0.5,
    },
  ];

  // Interactive States
  const [accentColor, setAccentColor] = useState<string>("#10b981");
  const [glowColor, setGlowColor] = useState<string>("#10b981");
  const [glowStrength, setGlowStrength] = useState<number>(0.5);
  const [copied, setCopied] = useState<boolean>(false);

  // Apply CSS Variables to Document Style dynamically
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", accentColor);
    document.documentElement.style.setProperty("--color-accent-glow", glowColor);
    document.documentElement.style.setProperty("--glow-strength", glowStrength.toString());
  }, [accentColor, glowColor, glowStrength]);

  const handleApplyPreset = (preset: Preset) => {
    setAccentColor(preset.accent);
    setGlowColor(preset.glow);
    setGlowStrength(preset.strength);
  };

  const handleCopyCSS = () => {
    const cssText = `:root {
  --color-accent: ${accentColor};
  --color-accent-glow: ${glowColor};
  --glow-strength: ${glowStrength};
  --glow-shadow: 0 0 calc(${glowStrength} * 20px) ${glowColor};
}`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="relative py-24 bg-zinc-950 overflow-hidden">
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask opacity-30 pointer-events-none" />
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-10 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div 
            className="inline-block px-3 py-1 text-xs font-mono border rounded mb-4 transition-all duration-300"
            style={{ 
              color: accentColor, 
              borderColor: `${accentColor}33`,
              boxShadow: `0 0 calc(${glowStrength} * 10px) ${glowColor}22` 
            }}
          >
            {t("[ 07 // PLAYGROUND / KOD ALANI ]", "[ 07 // PLAYGROUND / CODE FIELD ]")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t("Kişiselleştirilmiş Arayüz Deneyimi", "Personalized Interface Experience")}
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base">
            {t(
              "Sitenin görsel parametreleriyle oynayın. Accent renklerini ve parlama gücünü gerçek zamanlı olarak değiştirin.",
              "Interact with the site's visual parameters. Change accent colors and glow intensity in real-time."
            )}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 glass-panel p-6 rounded-2xl border border-zinc-900 bg-zinc-950/45">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accentColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {t("Kontrol Paneli", "Control Panel")}
              </h3>

              {/* Preset Buttons */}
              <div className="space-y-3 mb-8">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  {t("Tematik Hazır Ayarlar", "Thematic Presets")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplyPreset(preset)}
                      className="px-3 py-2 text-xs font-medium rounded-lg text-left transition-all duration-300 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white flex flex-col justify-between h-16 relative overflow-hidden group focus:outline-none"
                    >
                      <span>{t(preset.name, preset.nameEn)}</span>
                      <div className="flex gap-1.5 items-center mt-2">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/45" style={{ backgroundColor: preset.accent }} />
                        <span className="w-2.5 h-2.5 rounded-full border border-black/45" style={{ backgroundColor: preset.glow }} />
                        <span className="text-[10px] text-zinc-500 ml-auto font-mono">x{preset.strength}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Color Pickers */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {t("Vurgu Rengi (Accent Color)", "Accent Color")}
                    </label>
                    <span className="text-xs font-mono text-zinc-500 uppercase">{accentColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                      <input 
                        type="color" 
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="absolute inset-0 w-full h-full cursor-pointer scale-150 p-0 border-0 bg-transparent"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {t("Parlama Rengi (Glow Color)", "Glow Color")}
                    </label>
                    <span className="text-xs font-mono text-zinc-500 uppercase">{glowColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                      <input 
                        type="color" 
                        value={glowColor}
                        onChange={(e) => setGlowColor(e.target.value)}
                        className="absolute inset-0 w-full h-full cursor-pointer scale-150 p-0 border-0 bg-transparent"
                      />
                    </div>
                    <input 
                      type="text" 
                      value={glowColor}
                      onChange={(e) => setGlowColor(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>

                {/* Glow Strength Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {t("Parlama Yoğunluğu", "Glow Intensity")}
                    </label>
                    <span className="text-xs font-mono" style={{ color: accentColor }}>{glowStrength.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={glowStrength}
                    onChange={(e) => setGlowStrength(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    style={{ accentColor: accentColor }}
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                    <span>MIN (0.0)</span>
                    <span>MID (1.0)</span>
                    <span>MAX (2.0)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Accent Detail */}
            <div className="pt-6 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500 font-mono">
              <span>SYS.STATUS</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
                <span style={{ color: accentColor }}>ONLINE</span>
              </span>
            </div>
          </div>

          {/* Editor & Live Preview Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Real-time Mock Code Editor */}
            <div className="glass-panel rounded-2xl border border-zinc-900 overflow-hidden flex flex-col bg-zinc-950/60 flex-1">
              {/* Header */}
              <div className="bg-zinc-900/40 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-zinc-500 ml-2">styles.css</span>
                </div>
                <button
                  onClick={handleCopyCSS}
                  className="px-3 py-1 rounded text-xs font-mono transition-all duration-300 focus:outline-none cursor-pointer"
                  style={{
                    color: copied ? "#ffffff" : accentColor,
                    backgroundColor: copied ? `${accentColor}33` : "transparent",
                    border: `1px solid ${accentColor}22`
                  }}
                >
                  {copied ? t("Kopyalandı!", "Copied!") : t("Kodu Kopyala", "Copy Code")}
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono text-xs md:text-sm overflow-auto text-zinc-300 leading-relaxed flex-1 min-h-[180px]">
                <div>
                  <span className="text-zinc-500">:root</span> <span className="text-zinc-400">{"{"}</span>
                </div>
                <div className="pl-6 py-0.5">
                  <span className="text-purple-400">--color-accent</span>
                  <span className="text-zinc-400">:</span>{" "}
                  <span style={{ color: accentColor }}>{accentColor}</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div className="pl-6 py-0.5">
                  <span className="text-purple-400">--color-accent-glow</span>
                  <span className="text-zinc-400">:</span>{" "}
                  <span style={{ color: glowColor }}>{glowColor}</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div className="pl-6 py-0.5">
                  <span className="text-purple-400">--glow-strength</span>
                  <span className="text-zinc-400">:</span>{" "}
                  <span className="text-amber-400">{glowStrength.toFixed(2)}</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div className="pl-6 py-0.5">
                  <span className="text-purple-400">--glow-shadow</span>
                  <span className="text-zinc-400">:</span>{" "}
                  <span className="text-emerald-400">0</span> <span className="text-emerald-400">0</span>{" "}
                  <span className="text-blue-400">calc</span>
                  <span className="text-zinc-400">(</span>
                  <span className="text-amber-400">{glowStrength.toFixed(2)}</span>{" "}
                  <span className="text-zinc-400">*</span> <span className="text-amber-400">20px</span>
                  <span className="text-zinc-400">)</span>{" "}
                  <span style={{ color: glowColor }}>{glowColor}</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div>
                  <span className="text-zinc-400">{"}"}</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview Card */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                {t("Canlı Önizleme", "Live Preview")}
              </h4>
              
              <div 
                className="p-8 rounded-xl border transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-6"
                style={{
                  borderColor: `${accentColor}33`,
                  backgroundColor: "rgba(9, 9, 11, 0.6)",
                  boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 calc(${glowStrength} * 20px) ${glowColor}15`
                }}
              >
                <div className="space-y-2 text-center md:text-left">
                  <div className="text-sm font-mono text-zinc-500 uppercase">SYS_CARD_07</div>
                  <h5 className="text-xl font-bold text-white tracking-tight">KUZGUN OS PORTAL</h5>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    {t(
                      "Yaptığınız değişiklikler anında bütün sayfaya ve bu önizleme kartına yansır.",
                      "Your changes immediately reflect across the entire page and this preview card."
                    )}
                  </p>
                </div>

                <button 
                  className="px-6 py-3 rounded-lg font-mono text-xs tracking-wider font-semibold transition-all duration-300 relative group overflow-hidden focus:outline-none cursor-pointer"
                  style={{
                    backgroundColor: `${accentColor}18`,
                    border: `1px solid ${accentColor}55`,
                    color: accentColor,
                    boxShadow: `0 0 calc(${glowStrength} * 15px) ${glowColor}33`
                  }}
                >
                  <span className="relative z-10">{t("SİSTEMİ BAŞLAT", "INITIALIZE SYSTEM")}</span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: accentColor }}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
