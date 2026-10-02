"use client";

import React from "react";
import {
  Disc,
  Layers,
  Wind,
  Shield,
  Cpu,
  CircleDot,
  Upload,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { CATEGORIES } from "@/app/inventory/data/wheels";

interface WorkshopSidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onOpenImportModal: () => void;
  onCheckout: () => void;
  onResetModifications: () => void;
}

export default function WorkshopSidebar({
  activeCategory,
  onSelectCategory,
  onOpenImportModal,
  onCheckout,
  onResetModifications,
}: WorkshopSidebarProps) {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 ${
      isActive ? "text-[#9cbbf8]" : "text-neutral-400 group-hover:text-white"
    }`;
    switch (iconName) {
      case "Disc":
        return <Disc className={iconClass} />;
      case "Layers":
        return <Layers className={iconClass} />;
      case "Shield":
        return <Shield className={iconClass} />;
      case "Wind":
        return <Wind className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "CircleDot":
        return <CircleDot className={iconClass} />;
      default:
        return <Disc className={iconClass} />;
    }
  };

  return (
    <aside className="w-full lg:w-56 xl:w-64 max-h-[calc(100vh-7rem)] overflow-y-auto bg-[#0d0f14]/90 border border-white/[0.08] rounded-xl flex flex-col justify-between p-4 shrink-0 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="pb-3 mb-4 border-b border-white/[0.08]">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            VEHICLE CONFIG
          </div>
          <div className="text-xs font-mono font-bold text-[#9cbbf8] mt-0.5 tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>VIN: 4X9-SHFT-2024</span>
          </div>
        </div>

        {/* Categories List */}
        <nav className="space-y-1.5 font-mono text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all group ${
                  isActive
                    ? "bg-[#182032] border border-[#9cbbf8]/40 text-white font-bold shadow-[0_0_15px_rgba(156,187,248,0.15)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {getIcon(cat.iconName, isActive)}
                  <span className="tracking-wide text-xs">{cat.label}</span>
                </div>
                {cat.itemCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive
                        ? "bg-[#9cbbf8]/20 text-[#9cbbf8]"
                        : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-5 border-t border-white/[0.08] space-y-2.5 font-mono text-xs">
        {/* Import Custom 3D Model Button */}
        <button
          onClick={onOpenImportModal}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#182238] hover:bg-[#202f50] text-[#9cbbf8] hover:text-white rounded-lg border border-[#9cbbf8]/30 font-bold transition-all shadow-[0_0_12px_rgba(156,187,248,0.1)] group"
        >
          <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[11px] tracking-wide">IMPORT 3D CAR (.GLB/.FBX)</span>
        </button>

        {/* Reset Mods */}
        <button
          onClick={onResetModifications}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors text-[11px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Stock Setup</span>
        </button>

        {/* Checkout */}
        <button
          onClick={onCheckout}
          className="w-full mt-1 py-3 px-4 bg-[#161a22] hover:bg-[#202735] text-neutral-300 hover:text-white rounded-lg border border-white/10 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 group shadow-lg"
        >
          <span>CHECKOUT</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </aside>
  );
}
