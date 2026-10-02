"use client";

import React from "react";

interface TabContentProps {
  activeTab: "Workshop" | "Inventory" | "Stats";
  onBackToVisualizer: () => void;
}

export default function TabContent({ activeTab, onBackToVisualizer }: TabContentProps) {
  if (activeTab === "Workshop") {
    return (
      <div className="w-full max-w-5xl mx-auto py-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wider">
              WORKSHOP // MODULAR TUNING BAY
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              SELECT COMPONENT MODULE FOR REAL-TIME CALIBRATION & BENCHMARKING
            </p>
          </div>
          <button
            onClick={onBackToVisualizer}
            className="px-4 py-2 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded border border-white/10 transition-colors"
          >
            ← BACK TO VISUALIZER
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AERODYNAMICS & SPLITTERS",
              status: "CALIBRATED",
              desc: "Twin-channel carbon front splitter with active aero balance.",
              stat: "DOWNFORCE: +320kg @ 240km/h",
              tag: "STAGE 3",
            },
            {
              title: "POWERTRAIN & ECU MAPPING",
              status: "OPTIMIZED",
              desc: "Twin-turbo V8 hybrid motor with custom launch torque curves.",
              stat: "OUTPUT: 980 HP / 1,050 Nm",
              tag: "STAGE 4",
            },
            {
              title: "CHASSIS & SUSPENSION",
              status: "TRACK READY",
              desc: "Magnetic ride damper system with real-time camber telemetry.",
              stat: "RIDE HEIGHT: 95mm",
              tag: "PRO CIRCUIT",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#9cbbf8]/40 transition-all group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9cbbf8]/20 text-[#9cbbf8] font-bold">
                  {item.tag}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  ● {item.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono group-hover:text-[#9cbbf8] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.desc}</p>
              <div className="mt-4 pt-3 border-t border-white/10 font-mono text-xs text-neutral-300 font-semibold">
                {item.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "Inventory") {
    return (
      <div className="w-full max-w-5xl mx-auto py-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wider">
              INVENTORY // CARBON & COMPONENT VAULT
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              STORED HARDWARE PARTS READY FOR QUICK-SWAP INSTALLATION
            </p>
          </div>
          <button
            onClick={onBackToVisualizer}
            className="px-4 py-2 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded border border-white/10 transition-colors"
          >
            ← BACK TO VISUALIZER
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Forged Magnesium Rims (20\")", weight: "7.8 kg", status: "Installed" },
            { name: "Carbon Ceramic Brake Disc (410mm)", weight: "5.2 kg", status: "In Vault" },
            { name: "Active Swan-Neck Rear Wing", weight: "3.9 kg", status: "Installed" },
            { name: "Titanium Inconel Exhaust System", weight: "11.4 kg", status: "In Vault" },
          ].map((part, idx) => (
            <div key={idx} className="p-4 rounded bg-white/[0.03] border border-white/10 hover:border-white/20">
              <div className="text-[10px] font-mono text-neutral-400 mb-1">PART_ID #0{idx + 104}</div>
              <h4 className="text-xs font-bold text-white font-mono">{part.name}</h4>
              <div className="mt-3 flex justify-between items-center text-[11px] font-mono">
                <span className="text-neutral-400">{part.weight}</span>
                <span className={part.status === "Installed" ? "text-[#9cbbf8]" : "text-neutral-500"}>
                  {part.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "Stats") {
    return (
      <div className="w-full max-w-5xl mx-auto py-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wider">
              STATS // TELEMETRY & DYNO BENCHMARK
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              LIVE SENSOR METRICS & VIRTUAL AERODYNAMIC LOAD PERFORMANCE
            </p>
          </div>
          <button
            onClick={onBackToVisualizer}
            className="px-4 py-2 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded border border-white/10 transition-colors"
          >
            ← BACK TO VISUALIZER
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "0 - 100 KM/H", val: "2.42s", sub: "-0.18s vs Stock" },
            { label: "TOP SPEED", val: "368 KM/H", sub: "Aero Limited" },
            { label: "MAX LATERAL G", val: "1.65 G", sub: "Active Damper" },
            { label: "DRY WEIGHT", val: "1,290 KG", sub: "Carbon MonoCell" },
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded bg-white/[0.03] border border-white/10 text-center">
              <p className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-black text-[#9cbbf8] font-mono my-2">{stat.val}</p>
              <p className="text-[11px] font-mono text-emerald-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
