"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Visualizer", href: "/" },
  { label: "Workshop", href: "/workshop" },
  { label: "Inventory", href: "/inventory" },
  { label: "Stats", href: "/stats" },
  { label: "Portofolio", href: "/portofolio" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-30 border-b border-white/[0.08] bg-[#08090c]/90 backdrop-blur-md shrink-0">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 xl:px-12 h-16 xl:h-20 flex items-center justify-between">
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 lg:gap-12">
          {/* Logo & Version */}
          <Link
            href="/"
            className="text-base sm:text-lg xl:text-xl font-black tracking-wider text-white hover:text-[#9cbbf8] transition-colors flex items-center gap-2"
          >
            <span className="tracking-[0.14em]">SHIFT_TECH MOD</span>
            <span className="text-[10px] xl:text-xs bg-white/10 text-white/90 px-1.5 py-0.5 rounded font-mono font-normal">
              V1.0
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-sm xl:text-base font-semibold tracking-wide">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/" && pathname === "/visualizer");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-white border-b-2 border-[#9cbbf8] font-bold"
                      : "text-neutral-400 hover:text-[#00e5ff]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
