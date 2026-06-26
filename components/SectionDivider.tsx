"use client";

import React from "react";

interface SectionDividerProps {
  label: string;
  status?: string;
  buildCode?: string;
}

export default function SectionDivider({
  label,
  status = "ACTIVE",
  buildCode = "SYS.OK",
}: SectionDividerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 flex items-center gap-4 select-none pointer-events-none">
      <div className="text-[9px] sm:text-xs font-mono text-emerald-400/60 shrink-0 tracking-wider bg-emerald-950/10 px-2 py-0.5 rounded border border-emerald-900/30">
        [{label}]
      </div>
      <div className="flex-1 h-[1px] border-t border-dashed border-zinc-800/80"></div>
      <div className="hidden sm:flex items-center gap-3 text-[9px] font-mono text-zinc-600 shrink-0">
        <span>STATUS: <span className="text-emerald-500/50">{status}</span></span>
        <span>|</span>
        <span>SYS: <span className="text-zinc-500">{buildCode}</span></span>
      </div>
    </div>
  );
}
