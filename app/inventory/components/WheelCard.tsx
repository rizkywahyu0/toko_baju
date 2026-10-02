"use client";

import React from "react";
import { Plus, Check } from "lucide-react";
import { WheelItem } from "../data/wheels";
import WheelImage from "./WheelImage";

interface WheelCardProps {
  wheel: WheelItem;
  isSelected: boolean;
  isEquipped: boolean;
  onSelect: (wheel: WheelItem) => void;
  onEquip?: (wheel: WheelItem) => void;
}

export default function WheelCard({
  wheel,
  isSelected,
  isEquipped,
  onSelect,
  onEquip,
}: WheelCardProps) {
  return (
    <div
      onClick={() => onSelect(wheel)}
      className={`relative rounded-xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 group backdrop-blur-sm ${
        isSelected
          ? "bg-[#10141f] border-2 border-[#9cbbf8] shadow-[0_0_25px_rgba(156,187,248,0.22)] ring-1 ring-[#9cbbf8]/40 translate-y-[-2px]"
          : "bg-[#0d0f15]/80 hover:bg-[#12151e] border border-white/[0.08] hover:border-white/20"
      }`}
    >
      {/* Top action button / status indicator */}
      <div className="flex items-center justify-between z-10">
        {isEquipped ? (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
            <Check className="w-2.5 h-2.5" /> EQUIPPED
          </span>
        ) : (
          <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400">
            {wheel.size}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onEquip) onEquip(wheel);
          }}
          title="Quick Equip"
          className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-[#9cbbf8]/20 text-[#9cbbf8] hover:bg-[#9cbbf8] hover:text-black"
              : "bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Image / Visual Graphic */}
      <div className="my-3 sm:my-4 flex items-center justify-center py-2 relative">
        <WheelImage id={wheel.id} size="md" />
      </div>

      {/* Bottom Info Section */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#9cbbf8] transition-colors line-clamp-1">
          {wheel.name}
        </h3>

        <p className="text-xs sm:text-sm font-bold text-[#9cbbf8] font-mono mt-1 tracking-tight">
          {wheel.price}
        </p>

        {/* Specs Table Footer */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.07] font-mono text-[10px] sm:text-[11px]">
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[9px]">
              WEIGHT
            </span>
            <span className="text-neutral-200 font-semibold">{wheel.weight}</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider text-[9px]">
              MATERIAL
            </span>
            <span className="text-neutral-200 font-semibold">{wheel.material}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
