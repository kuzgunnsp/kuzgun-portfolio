"use client";

import React, { useState, useEffect, useRef } from "react";

const commands = [
  { name: "help", desc: "Kullanılabilir tüm komutları listeler" },
  { name: "about", desc: "Hakkımda bölümüne hızlı geçiş yapar" },
  { name: "projects", desc: "Projeler bölümüne hızlı geçiş yapar" },
  { name: "skills", desc: "Yetkinlikler bölümüne hızlı geçiş yapar" },
  { name: "workflow", desc: "Çalışma şeması bölümüne hızlı geçiş yapar" },
  { name: "contact", desc: "İletişim bölümüne hızlı geçiş yapar" },
  { name: "matrix", desc: "Arka plan Matrix yağmurunu açar/kapatır" },
  { name: "clear", desc: "Konsol geçmişini temizler" },
  { name: "exit", desc: "Komut paletini kapatır" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
        setInput("");
        setTerminalLogs(["Kuzgun CLI Paleti v1.0.0. Komut girin veya listeden seçin."]);
      }, 50);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(input.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(input.toLowerCase())
  );

  const executeCommand = (cmdName: string) => {
    const cleanCmd = cmdName.trim().toLowerCase();

    if (cleanCmd === "exit") {
      setIsOpen(false);
      return;
    }

    if (cleanCmd === "clear") {
      setTerminalLogs([]);
      setInput("");
      return;
    }

    if (cleanCmd === "matrix") {
      // Dispatch custom event for global matrix rain toggling
      window.dispatchEvent(new CustomEvent("toggle-global-matrix"));
      setTerminalLogs((prev) => [...prev, "> Matrix yağmuru tetiklendi."]);
      setInput("");
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (["about", "projects", "skills", "workflow", "contact"].includes(cleanCmd)) {
      const element = document.getElementById(cleanCmd);
      if (element) {
        setTerminalLogs((prev) => [...prev, `> #${cleanCmd} konumuna yönlendiriliyor...`]);
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }, 300);
      } else {
        setTerminalLogs((prev) => [...prev, `> Hata: #${cleanCmd} hedefi bulunamadı.`]);
      }
      setInput("");
      return;
    }

    if (cleanCmd === "help") {
      setTerminalLogs((prev) => [
        ...prev,
        "> Kullanılabilir Komutlar:",
        ...commands.map((c) => `  ${c.name.padEnd(10)} - ${c.desc}`),
      ]);
      setInput("");
      return;
    }

    // Default response
    setTerminalLogs((prev) => [
      ...prev,
      `> Hata: '${cleanCmd}' geçerli bir komut değil. 'help' yazarak yardım alabilirsiniz.`,
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (filteredCommands.length > 0 && selectedIndex < filteredCommands.length && input !== "") {
        executeCommand(filteredCommands[selectedIndex].name);
      } else if (input !== "") {
        executeCommand(input);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    }
  };

  if (!isOpen) {
    // Return a subtle floating shortcut hint in the bottom-left corner
    return (
      <div className="fixed bottom-6 left-6 z-40 hidden md:block select-none pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-900/60 text-[10px] font-mono text-zinc-500 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          <span>Komut Paleti:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 font-sans font-semibold">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 font-sans font-semibold">K</kbd>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
      <div
        ref={modalRef}
        className="w-full max-w-xl rounded-xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl overflow-hidden font-mono text-xs flex flex-col backdrop-blur-md"
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-zinc-900/40 border-b border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
            <span className="ml-2">KUZGUN // GLOBAL CLI</span>
          </div>
          <div>ESC to close</div>
        </div>

        {/* Console Log Output */}
        <div className="p-4 max-h-[160px] overflow-y-auto border-b border-zinc-900/50 flex flex-col gap-1 text-zinc-400 bg-black/20 scrollbar-thin">
          {terminalLogs.map((log, index) => (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {log}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 flex items-center gap-3 bg-zinc-950">
          <span className="text-emerald-400 shrink-0 select-none">kuzgun@cli:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="help, matrix, about, clear..."
            className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-600 font-mono text-xs"
          />
        </div>

        {/* Commands List / Suggestions */}
        <div className="border-t border-zinc-900 max-h-[220px] overflow-y-auto bg-zinc-950/60">
          {filteredCommands.length > 0 ? (
            <div className="py-2">
              {filteredCommands.map((cmd, idx) => (
                <button
                  key={cmd.name}
                  onClick={() => executeCommand(cmd.name)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors ${
                    idx === selectedIndex
                      ? "bg-emerald-950/20 text-emerald-300 border-l-2 border-emerald-500"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span className="font-bold">{cmd.name}</span>
                  <span className="text-[10px] text-zinc-600 font-sans">{cmd.desc}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-zinc-600 text-[10px]">
              Eşleşen komut bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
