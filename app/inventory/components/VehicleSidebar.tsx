"use client";

import React from "react";
import {
  Disc,
  Layers,
  Wind,
  Shield,
  Cpu,
  CircleDot,
  HelpCircle,
  Activity,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "../data/wheels";

interface VehicleSidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onCheckout: () => void;
  onOpenDiagnostics: () => void;
  onOpenSupport: () => void;
}

export default function VehicleSidebar({
  activeCategory,
  onSelectCategory,
  onCheckout,
  onOpenDiagnostics,
  onOpenSupport,
}: VehicleSidebarProps) {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 ${isActive ? "text-[#9cbbf8]" : "text-neutral-400 group-hover:text-white"}`;
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
        <div className="pb-4 mb-4 border-b border-white/[0.08]">
          <h2 className="text-sm xl:text-base font-black tracking-wider text-white font-mono uppercase">
            VEHICLE
            <br />
            CONFIG
          </h2>
        </div>

        {/* Categories List */}
        <nav className="space-y-1.5 font-mono text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all group ${isActive
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
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isActive
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
      <div className="pt-6 border-t border-white/[0.08] space-y-3 font-mono text-xs">
        <button
          onClick={onOpenSupport}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-neutral-400" />
          <span>Support</span>
        </button>

        <button
          onClick={onOpenDiagnostics}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
        >
          <Activity className="w-4 h-4 text-neutral-400" />
          <span>Diagnostics</span>
        </button>

        <button
          onClick={onCheckout}
          className="w-full mt-2 py-3 px-4 bg-[#161a22] hover:bg-[#202735] text-neutral-300 hover:text-white rounded-lg border border-white/10 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 group shadow-lg"
        >
          <span>CHECKOUT</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </aside>
  );
}
