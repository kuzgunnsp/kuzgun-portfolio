"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  // 3D Tilt / Mouse Takip Durum Yönetimi
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Terminal Durum Yönetimi
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isMatrix, setIsMatrix] = useState(false);
  const [isAutotyping, setIsAutotyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sayfa yüklendiğinde boot animasyonu
  useEffect(() => {
    // Açılış boot satırları sırayla yazılır
    const t1 = setTimeout(() => {
      setHistory(["Initializing Kuzgun OS v1.0.0..."]);
    }, 150);

    const t2 = setTimeout(() => {
      setHistory((prev) => [...prev, "Connecting to secure databases... Bağlantı kuruldu."]);
    }, 550);

    const t3 = setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        "KUZGUN terminaline hoş geldiniz.",
        "Komutları görmek için 'help' yazın veya aşağıdaki butonları kullanın."
      ]);
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Terminal scroll ayarı
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix efekti canvas animasyonu
  useEffect(() => {
    if (!isMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // yeşil kod rengi
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMatrix]);

  // Komut yorumlayıcı (Command Parser)
  const handleCommand = (commandStr: string) => {
    const cmd = commandStr.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    const newHistory = [...history, `kuzgun@dev:~$ ${cmd}`];

    if (lowerCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (lowerCmd === "help") {
      newHistory.push(
        "Kullanılabilir komutlar:",
        "  about     - Geliştirici profilini görüntüle",
        "  projects  - Portfolyo projelerini listele",
        "  skills    - Teknik yetenekleri incele",
        "  contact   - İletişim kanallarını göster",
        "  matrix    - Matrix dijital yağmurunu aç/kapat",
        "  clear     - Ekranı temizle"
      );
    } else if (lowerCmd === "about") {
      newHistory.push(
        "Kuzgun (Mustafa Duman) - Yazılım Geliştirici",
        "Mobil uygulama, web platformları ve interaktif sistemler üzerine odaklanmış,",
        "fütüristik tasarımları yüksek performanslı kodla birleştiren yaratıcı geliştirici.",
        "Sistem Hakkımda bölümüne yönlendiriliyor..."
      );
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else if (lowerCmd === "projects") {
      newHistory.push(
        "Tamamlanan Projeler Yükleniyor...",
        "  - Lystra: Modern WooCommerce WordPress Teması",
        "  - Namaz Vakitleri: Premium Tasarımlı Mobil Uygulama",
        "  - Kuzgun Portfolio v1.0: Next.js ve TailwindCSS v4 Portfolyo",
        "Sistem Projeler bölümüne yönlendiriliyor..."
      );
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else if (lowerCmd === "skills") {
      newHistory.push(
        "Teknik Stack Yükleniyor...",
        "  - Core: React, Next.js, TypeScript, Node.js",
        "  - Mobile: React Native, Flutter, Swift, CoreData",
        "  - Game/3D: Unity, C#, WebGL, Three.js, Canvas2D",
        "Sistem Yetenekler bölümüne yönlendiriliyor..."
      );
      setTimeout(() => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else if (lowerCmd === "contact") {
      newHistory.push(
        "İletişim Kanalları Bağlanıyor...",
        "  - E-posta: hello@kuzgun.dev",
        "  - LinkedIn: linkedin.com/in/mustafadumannn/",
        "  - Bionluk: bionluk.com/mustafadumannn",
        "Sistem İletişim bölümüne yönlendiriliyor..."
      );
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else if (lowerCmd === "matrix") {
      setIsMatrix(!isMatrix);
      newHistory.push(
        !isMatrix 
          ? "Matrix Dijital Yağmuru aktif edildi. Çıkmak için tekrar 'matrix' yazın."
          : "Matrix Dijital Yağmuru kapatıldı."
      );
    } else {
      newHistory.push(`Komut bulunamadı: '${cmd}'. Seçenekler için 'help' yazın.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  // Otomatik Yazma Efekti (Autotyping Effect)
  const triggerAutotype = (commandText: string) => {
    if (isAutotyping) return;

    if (isMatrix) {
      setIsMatrix(false); // Matrix aktifse kapat
    }

    setIsAutotyping(true);
    setInput("");
    
    let index = 0;
    const interval = setInterval(() => {
      setInput((prev) => prev + commandText[index]);
      index++;
      if (index >= commandText.length) {
        clearInterval(interval);
        setTimeout(() => {
          handleCommand(commandText);
          setIsAutotyping(false);
        }, 150);
      }
    }, 60);
  };

  const focusTerminal = () => {
    if (!isAutotyping) {
      inputRef.current?.focus();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: -y * 16, // max 16 derece tilt
      y: x * 16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* 1. Altyapı: Geometrik Izgara (Grid) Arka Planı ve Sönümleme Maskesi */}
      <div className="absolute inset-0 z-0 bg-grid-pattern bg-grid-mask opacity-40 pointer-events-none"></div>

      {/* 2. Altyapı: Yumuşak Ortam Işıkları (Ambient Radial Gradients) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow-reverse"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* SOL SÜTUN: Zengin Tipografi ve İçerik */}
        <div className="w-full lg:w-[55%] flex flex-col items-start gap-8 order-2 lg:order-1">
          {/* Monospace Etiket */}
          <div className="animate-fade-in flex items-center gap-2">
            <span className="h-[1px] w-8 bg-zinc-800"></span>
            <span className="text-[10px] md:text-xs font-mono tracking-widest text-zinc-500 uppercase">
              [ 01 // YAZILIM & TASARIM ]
            </span>
          </div>

          {/* Unvan ve Büyük Gradyan Başlık */}
          <div className="flex flex-col gap-4 w-full">
            <p className="animate-slide-up text-xs md:text-sm font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Mobile & Web Developer // UI Designer
            </p>
            <h1 className="animate-slide-up text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] [animation-delay:200ms] text-white">
              Temiz Kod. <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                Rafine Tasarım.
              </span>
            </h1>
          </div>

          {/* Kısa Tanıtım / Vizyon Cümlesi */}
          <p className="animate-slide-up text-sm md:text-base lg:text-lg text-zinc-400 max-w-xl leading-relaxed [animation-delay:400ms]">
            Kuzgun markası altında, karmaşık yazılım problemlerini sade, yüksek performanslı ve estetik dijital ürünlere dönüştürüyorum. Flutter, SwiftUI, Unity ve Next.js teknolojileriyle sınırları zorlayan deneyimler inşa ediyorum.
          </p>

          {/* Yönlendirme Butonları */}
          <div className="animate-slide-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto [animation-delay:600ms] mt-4">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-zinc-100 text-zinc-950 text-xs md:text-sm font-bold tracking-wider text-center uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98] font-mono shadow-lg shadow-black/25"
            >
              Projeleri İncele
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass-panel text-zinc-300 text-xs md:text-sm font-bold tracking-wider text-center uppercase transition-all duration-300 hover:bg-zinc-900/60 hover:text-white hover:border-zinc-700/80 font-mono"
            >
              İletişime Geç
            </a>
          </div>
        </div>

        {/* SAĞ SÜTUN: İnteraktif 3D Terminal Kutusu */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full lg:w-[45%] flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0"
          style={{ perspective: "1000px" }}
        >
          {/* 3D Dönüşüm Kapsayıcısı */}
          <div
            className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[16/11] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md transition-transform duration-200 ease-out shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden select-none cursor-pointer"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transformStyle: "preserve-3d",
            }}
            onClick={focusTerminal}
          >
            {/* Terminal Üst Barı */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950/90 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-zinc-500 tracking-wider select-none">
                kuzgun@dev: ~ (bash)
              </span>
              <div className="w-12" />
            </div>

            {/* Terminal Gövdesi */}
            <div className="relative flex-1 p-4 overflow-hidden font-mono text-xs sm:text-sm leading-relaxed text-zinc-300">
              {/* Matrix Canvas */}
              {isMatrix && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{ mixBlendMode: "screen" }}
                />
              )}

              {/* Terminal İçeriği */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto max-h-[160px] sm:max-h-[220px] pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                  {history.map((line, idx) => (
                    <div
                      key={idx}
                      className={`whitespace-pre-wrap ${
                        line.startsWith("kuzgun@dev:")
                          ? "text-zinc-100 font-semibold"
                          : line.startsWith("  -")
                          ? "text-amber-500/90"
                          : line.startsWith("  about") || line.startsWith("  projects")
                          ? "text-emerald-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Giriş Satırı */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-900/50 relative z-20">
                  <span className="text-zinc-100 font-semibold shrink-0 select-none">kuzgun@dev:~$</span>
                  <div className="flex-1 flex items-center relative">
                    <span className="text-emerald-400 font-semibold">{input}</span>
                    {/* Yanıp Sönen İmleç */}
                    <span className="w-2 h-4 sm:h-5 bg-emerald-400 ml-1 animate-[pulse_1s_infinite] shrink-0" />
                    
                    {/* Gizli Input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => !isAutotyping && setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isAutotyping) {
                          handleCommand(input);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-default focus:outline-none"
                      disabled={isAutotyping}
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Erişim Barı */}
            <div className="px-4 py-3 bg-zinc-950/95 border-t border-zinc-900 flex flex-wrap items-center gap-2 relative z-30 select-none">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider shrink-0 mr-1 select-none">
                HIZLI ERİŞİM:
              </span>
              {["help", "about", "projects", "skills", "contact", "matrix"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerAutotype(cmd);
                  }}
                  disabled={isAutotyping}
                  className="px-2.5 py-1 text-[10px] sm:text-xs font-mono rounded bg-zinc-900/50 border border-zinc-800/80 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Dikey Aşağı Kaydırma Göstergesi */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase rotate-90 my-4">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-zinc-800"></div>
      </div>
    </section>
  );
}
