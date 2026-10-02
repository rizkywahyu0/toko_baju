"use client";

import React from "react";

interface HeroHeadlineProps {
  isConfiguring: boolean;
  setIsConfiguring: (val: boolean) => void;
  onGalleryNext: () => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  spoilerAngle: number;
  setSpoilerAngle: (angle: number) => void;
  setAeroLoad: (load: number) => void;
}

export default function HeroHeadline({
  isConfiguring,
  setIsConfiguring,
  onGalleryNext,
  selectedColor,
  setSelectedColor,
  spoilerAngle,
  setSpoilerAngle,
  setAeroLoad,
}: HeroHeadlineProps) {
  const colorOptions = [
    { name: "Stealth Obsidian", color: "#111217", label: "Obsidian" },
    { name: "Cyberpunk Cyan", color: "#06b6d4", label: "Cyan" },
    { name: "Apex Carbon", color: "#1f242d", label: "Carbon" },
    { name: "Titanium Silver", color: "#94a3b8", label: "Titanium" },
  ];

  return (
    <div className="flex flex-col justify-center max-w-xl">
      {/* Main Typographic Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.04] uppercase">
        <span className="block text-white">PRECISION</span>
        <span className="block text-[#9cbbf8] drop-shadow-[0_0_25px_rgba(156,187,248,0.25)]">
          ENGINEERING
        </span>
        <span className="block text-white">REDEFINED</span>
      </h1>

      {/* System Status Callout / Monospace Terminal */}
      <div className="mt-5 sm:mt-7 flex items-start gap-3 border-l-2 border-neutral-600 pl-4 py-0.5">
        <p className="font-mono text-[11px] sm:text-xs xl:text-[13px] text-neutral-400 leading-relaxed uppercase tracking-wider">
          SYS_DIAG_OK: INITIALIZING CONFIGURATOR MODULE <br />
          v1.0. AERODYNAMICS CALIBRATION REQUIRED.
        </p>
      </div>

      {/* CTA Buttons Row */}
      <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5">
        {/* Start Configurator */}
        <button
          onClick={() => setIsConfiguring(!isConfiguring)}
          className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded bg-[#9cbbf8] hover:bg-[#b5ceff] text-[#08090c] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(156,187,248,0.35)] cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span>{isConfiguring ? "CLOSE CONFIGURATOR" : "START CONFIGURATOR"}</span>
        </button>

        {/* Gallery Button */}
        <button
          onClick={onGalleryNext}
          className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded bg-transparent hover:bg-white/[0.06] text-white border border-white/20 hover:border-white/40 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span>GALLERY</span>
        </button>
      </div>

      {/* Interactive Live Adjusters (Configurator Panel) */}
      {isConfiguring && (
        <div className="mt-6 p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-3.5 transition-all">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">CHASSIS FINISH:</span>
            <span className="text-[#9cbbf8] font-bold">{selectedColor}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {colorOptions.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`py-1.5 px-2 rounded text-[11px] font-mono border transition-all cursor-pointer text-center ${selectedColor === c.name
                  ? "border-[#9cbbf8] text-white bg-white/10 shadow-[0_0_10px_rgba(156,187,248,0.2)]"
                  : "border-white/10 text-neutral-400 hover:text-white"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-400">AERO WING ATTACK ANGLE:</span>
              <span className="text-white font-bold">{spoilerAngle}°</span>
            </div>
            <input
              type="range"
              min="4"
              max="28"
              value={spoilerAngle}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSpoilerAngle(val);
                setAeroLoad(Math.round(110 + val * 3.2));
              }}
              className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#9cbbf8]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
