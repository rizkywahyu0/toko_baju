"use client";

import React from "react";

interface WheelImageProps {
  id: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  spinning?: boolean;
}

export default function WheelImage({
  id,
  size = "md",
  className = "",
  spinning = false,
}: WheelImageProps) {
  const sizeMap = {
    sm: "w-24 h-24",
    md: "w-36 h-36 sm:w-44 sm:h-44",
    lg: "w-52 h-52 sm:w-64 sm:h-64",
    xl: "w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96",
  };

  const spinStyle = spinning ? "animate-[spin_10s_linear_infinite]" : "";

  const renderGraphic = () => {
    // ================= TYRES (MATCHING SCREENSHOT) =================
    if (id === "toyo-proxes-r888r") {
      return (
        <g>
          {/* Thick Outer Tire Sidewall */}
          <circle cx="100" cy="100" r="95" fill="#14151a" stroke="#252833" strokeWidth="4" />
          <circle cx="100" cy="100" r="86" fill="#1b1d24" stroke="#0e1014" strokeWidth="2" />
          
          {/* Sidewall Directional Tread V-Grooves */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M 94 10 L 100 16 L 106 10"
              fill="none"
              stroke="#2c303d"
              strokeWidth="2"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}

          {/* Sidewall Lettering */}
          <path id="toyo-path" d="M 40 100 A 60 60 0 0 1 160 100" fill="none" />
          <text fill="#e2e8f0" fontSize="5.5" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            <textPath href="#toyo-path" startOffset="18%">PROXES R888R</textPath>
          </text>
          
          <path id="toyo-bottom-path" d="M 160 100 A 60 60 0 0 1 40 100" fill="none" />
          <text fill="#94a3b8" fontSize="5" fontWeight="bold" fontFamily="monospace" letterSpacing="3">
            <textPath href="#toyo-bottom-path" startOffset="30%">TOYO TIRES</textPath>
          </text>

          {/* Inner Dark Multi-Spoke Rim */}
          <circle cx="100" cy="100" r="62" fill="#161820" stroke="#383d4c" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#0f1116" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
            <polygon
              key={i}
              points="97,52 103,52 101.5,84 98.5,84"
              fill="#4b5563"
              stroke="#1f2937"
              strokeWidth="0.5"
              transform={`rotate(${ang} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="#1f2430" stroke="#475569" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#0f172a" />
        </g>
      );
    }

    if (id === "pirelli-pzero-trofeors") {
      return (
        <g>
          {/* Pirelli Tire */}
          <circle cx="100" cy="100" r="95" fill="#121317" stroke="#22252e" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="#191a22" stroke="#0a0b0e" strokeWidth="2" />

          {/* Sidewall Text */}
          <path id="pirelli-top" d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
          <text fill="#ffffff" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">
            <textPath href="#pirelli-top" startOffset="15%">P ZERO TROFEO RS</textPath>
          </text>
          
          <path id="pirelli-bot" d="M 164 100 A 64 64 0 0 1 36 100" fill="none" />
          <text fill="#eab308" fontSize="6" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">
            <textPath href="#pirelli-bot" startOffset="32%">PIRELLI</textPath>
          </text>

          {/* Inner Black Multi-Mesh Rim */}
          <circle cx="100" cy="100" r="62" fill="#14161f" stroke="#475569" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#0d0e12" />
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon
              key={i}
              points="98,52 102,52 101,84 99,84"
              fill="#334155"
              stroke="#1e293b"
              strokeWidth="0.5"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#0a0f1d" stroke="#eab308" strokeWidth="0.8" />
        </g>
      );
    }

    if (id === "michelin-pilot-cup2r") {
      return (
        <g>
          {/* Michelin Tire with Chequered Flag Accent */}
          <circle cx="100" cy="100" r="95" fill="#131418" stroke="#252936" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="#1c1e26" stroke="#0f1117" strokeWidth="2" />

          {/* Chequered flag border detail */}
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={i}
              x="98"
              y="12"
              width="4"
              height="3"
              fill={i % 2 === 0 ? "#ffffff" : "#1e3a8a"}
              opacity="0.8"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}

          {/* Michelin text */}
          <path id="michelin-top" d="M 34 100 A 66 66 0 0 1 166 100" fill="none" />
          <text fill="#ffffff" fontSize="5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">
            <textPath href="#michelin-top" startOffset="10%">MICHELIN CUP 2 R</textPath>
          </text>
          
          <path id="michelin-bot" d="M 166 100 A 66 66 0 0 1 34 100" fill="none" />
          <text fill="#facc15" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
            <textPath href="#michelin-bot" startOffset="30%">MICHELIN</textPath>
          </text>

          {/* Bronze-Gold Ultra Slim Spoke Wheel */}
          <circle cx="100" cy="100" r="62" fill="#181714" stroke="#a88450" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#12100d" />
          {Array.from({ length: 10 }).map((_, i) => (
            <polygon
              key={i}
              points="98,52 102,52 101,84 99,84"
              fill="#c5a065"
              stroke="#594420"
              strokeWidth="0.5"
              transform={`rotate(${i * 36} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="#523e1e" stroke="#c5a065" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#1c150a" />
        </g>
      );
    }

    if (id === "gt-radial-champiro-sx2") {
      return (
        <g>
          {/* GT Radial Tire */}
          <circle cx="100" cy="100" r="95" fill="#141518" stroke="#282a33" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="#1d1f27" stroke="#101115" strokeWidth="2" />

          <path id="champiro-top" d="M 34 100 A 66 66 0 0 1 166 100" fill="none" />
          <text fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="monospace" letterSpacing="1.5">
            <textPath href="#champiro-top" startOffset="14%">CHAMPIRO SX2</textPath>
          </text>
          
          <path id="champiro-bot" d="M 166 100 A 66 66 0 0 1 34 100" fill="none" />
          <text fill="#cbd5e1" fontSize="5" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
            <textPath href="#champiro-bot" startOffset="26%">GT RADIAL</textPath>
          </text>

          {/* Silver 6-Spoke Wheel */}
          <circle cx="100" cy="100" r="62" fill="#1c1f26" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#111317" />
          {[0, 60, 120, 180, 240, 300].map((ang, i) => (
            <polygon
              key={i}
              points="96,52 104,52 102.5,84 97.5,84"
              fill="#cbd5e1"
              stroke="#475569"
              strokeWidth="0.6"
              transform={`rotate(${ang} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="19" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#0f172a" />
        </g>
      );
    }

    if (id === "bridgestone-potenza-re71rs") {
      return (
        <g>
          {/* Bridgestone Potenza Tire */}
          <circle cx="100" cy="100" r="95" fill="#131417" stroke="#252730" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="#1a1c22" stroke="#0e0f14" strokeWidth="2" />

          <path id="potenza-top" d="M 34 100 A 66 66 0 0 1 166 100" fill="none" />
          <text fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1.5">
            <textPath href="#potenza-top" startOffset="18%">POTENZA</textPath>
          </text>
          
          <path id="potenza-bot" d="M 166 100 A 66 66 0 0 1 34 100" fill="none" />
          <text fill="#ef4444" fontSize="5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
            <textPath href="#potenza-bot" startOffset="24%">BRIDGESTONE</textPath>
          </text>

          {/* Silver 7-Spoke Wheel */}
          <circle cx="100" cy="100" r="62" fill="#181a20" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#0f1115" />
          {Array.from({ length: 7 }).map((_, i) => (
            <polygon
              key={i}
              points="96.5,52 103.5,52 102,84 98,84"
              fill="#e2e8f0"
              stroke="#64748b"
              strokeWidth="0.6"
              transform={`rotate(${(i * 360) / 7} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="#334155" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#0f172a" stroke="#ef4444" strokeWidth="0.8" />
        </g>
      );
    }

    if (id === "yokohama-advan-a052") {
      return (
        <g>
          {/* Yokohama Advan Tire */}
          <circle cx="100" cy="100" r="95" fill="#121417" stroke="#22252c" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="#181b21" stroke="#0a0c0f" strokeWidth="2" />

          <path id="advan-top" d="M 34 100 A 66 66 0 0 1 166 100" fill="none" />
          <text fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
            <textPath href="#advan-top" startOffset="28%">ADVAN</textPath>
          </text>
          
          <path id="advan-bot" d="M 166 100 A 66 66 0 0 1 34 100" fill="none" />
          <text fill="#ef4444" fontSize="5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">
            <textPath href="#advan-bot" startOffset="26%">YOKOHAMA</textPath>
          </text>

          {/* Silver Thin Multi-Spoke Wheel */}
          <circle cx="100" cy="100" r="62" fill="#16181f" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="100" cy="100" r="54" fill="#0c0e12" />
          {Array.from({ length: 10 }).map((_, i) => (
            <polygon
              key={i}
              points="97.5,52 102.5,52 101.5,84 98.5,84"
              fill="#cbd5e1"
              stroke="#475569"
              strokeWidth="0.5"
              transform={`rotate(${i * 36} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="100" cy="100" r="10" fill="#0a0d14" stroke="#ef4444" strokeWidth="0.8" />
        </g>
      );
    }

    // ================= 3. HOOD GRAPHICS =================
    if (id.includes("hood") || id.includes("bonnet")) {
      return (
        <g>
          {/* Carbon Fiber Hood Silhouette */}
          <path
            d="M 35 160 L 45 40 Q 100 28 155 40 L 165 160 Q 100 170 35 160 Z"
            fill="#1e222a"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Carbon Weave pattern lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1={50 + i * 14}
              x2="150"
              y2={50 + i * 14}
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          ))}
          {/* Dual Heat Extraction Louvers */}
          <polygon points="65,65 85,65 82,110 68,110" fill="#0b0d11" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="115,65 135,65 132,110 118,110" fill="#0b0d11" stroke="#38bdf8" strokeWidth="1" />
          {/* AeroCatch Quick Latches */}
          <ellipse cx="60" cy="142" rx="4" ry="7" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="140" cy="142" rx="4" ry="7" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
        </g>
      );
    }

    // ================= 4. SPOILER / WING GRAPHICS =================
    if (id.includes("wing") || id.includes("spoiler") || id.includes("ducktail") || id.includes("type-7")) {
      return (
        <g>
          {/* Carbon Fiber Airfoil Profile */}
          <path
            d="M 20 70 Q 100 50 180 70 L 175 90 Q 100 75 25 90 Z"
            fill="#1e2430"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          {/* Endplates */}
          <polygon points="18,52 30,58 26,115 14,105" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="182,52 170,58 174,115 186,105" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Swan Neck Billet Aluminum Stanchions */}
          <path d="M 68 85 Q 60 120 75 155 L 82 155 Q 70 120 76 85 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
          <path d="M 132 85 Q 140 120 125 155 L 118 155 Q 130 120 124 85 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
          {/* Trunk Mounting Base */}
          <rect x="68" y="150" width="20" height="8" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <rect x="112" y="150" width="20" height="8" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
        </g>
      );
    }

    // ================= 5. BODYKIT GRAPHICS =================
    if (id.includes("widebody") || id.includes("bodykit") || id.includes("silhouette") || id.includes("kit") || id.includes("aero")) {
      return (
        <g>
          {/* Front Bumper & Widebody Overfenders Silhouette */}
          <path
            d="M 25 145 L 35 75 Q 100 60 165 75 L 175 145 L 155 155 Q 100 148 45 155 Z"
            fill="#1e222a"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {/* Extended Carbon Front Splitter */}
          <path d="M 18 152 Q 100 142 182 152 L 186 160 Q 100 150 14 160 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Twin Carbon Aero Canards */}
          <polygon points="20,95 40,92 38,100 18,102" fill="#0284c7" />
          <polygon points="180,95 160,92 162,100 182,102" fill="#0284c7" />
          {/* Main Air Intake Grille */}
          <rect x="60" y="95" width="80" height="42" rx="4" fill="#090b0e" stroke="#334155" strokeWidth="1" />
          <line x1="60" y1="116" x2="140" y2="116" stroke="#475569" strokeWidth="1" />
        </g>
      );
    }

    // ================= 6. BRAKE SYSTEM GRAPHICS =================
    if (id.includes("brembo") || id.includes("ap-racing") || id.includes("endless") || id.includes("alcon") || id.includes("project-mu") || id.includes("brake")) {
      const caliperColor =
        id.includes("brembo-carbon-ceramic")
          ? "#eab308"
          : id.includes("brembo-gtr")
          ? "#d4af37"
          : id.includes("endless")
          ? "#2563eb"
          : id.includes("project-mu")
          ? "#10b981"
          : id.includes("alcon")
          ? "#a855f7"
          : "#64748b";

      return (
        <g>
          {/* Slotted Brake Rotor Disc */}
          <circle cx="100" cy="100" r="88" fill="#2d323b" stroke="#64748b" strokeWidth="2" />
          <circle cx="100" cy="100" r="82" fill="#3d4450" stroke="#1e222a" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" fill="#181b22" stroke="#475569" strokeWidth="2" />

          {/* Rotor Curved Heat Slots */}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M 100 56 Q 108 68 102 80"
              fill="none"
              stroke="#1e2229"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}

          {/* Center Hub & 5 Lug Bolts */}
          <circle cx="100" cy="100" r="28" fill="#101318" stroke="#64748b" strokeWidth="1" />
          {[0, 72, 144, 216, 288].map((ang, i) => (
            <circle
              key={i}
              cx={100 + 19 * Math.sin((ang * Math.PI) / 180)}
              cy={100 - 19 * Math.cos((ang * Math.PI) / 180)}
              r="3.2"
              fill="#94a3b8"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
          ))}

          {/* Monobloc 6-Piston Caliper (Clamping on Rotor) */}
          <path
            d="M 135 45 C 168 70 168 130 135 155 L 120 148 C 148 125 148 75 120 52 Z"
            fill={caliperColor}
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          {/* 3 Pistons Visual Indicators */}
          <circle cx="142" cy="75" r="4.5" fill="#0f172a" opacity="0.6" />
          <circle cx="148" cy="100" r="4.5" fill="#0f172a" opacity="0.6" />
          <circle cx="142" cy="125" r="4.5" fill="#0f172a" opacity="0.6" />
        </g>
      );
    }

    // ================= DEFAULT / VELG (ENKEI, TE37, BBS, HRE, ZE40, CE28) =================
    switch (id) {
      case "enkei-rpf1":
        return (
          <g>
            <defs>
              <linearGradient id="rpf1-silver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="25%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="75%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="rpf1-lip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <radialGradient id="rpf1-hub-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e2430" />
                <stop offset="60%" stopColor="#0f1217" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <radialGradient id="rpf1-spoke-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0b0d12" />
                <stop offset="70%" stopColor="#12151d" />
                <stop offset="100%" stopColor="#1c202a" />
              </radialGradient>
              {/* Curved paths for stepped lip lettering */}
              <path id="enkei-lip-top" d="M 120 18 A 84 84 0 0 1 182 80" fill="none" />
              <path id="enkei-lip-bot" d="M 80 182 A 84 84 0 0 1 18 120" fill="none" />
            </defs>

            {/* Dark Background behind wheel cutouts (Brake Disc Area) */}
            <circle cx="100" cy="100" r="94" fill="url(#rpf1-spoke-shadow)" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="#2c3240" strokeWidth="1" />

            {/* Outer Rim Flange */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="url(#rpf1-lip-grad)" strokeWidth="3" />
            <circle cx="100" cy="100" r="93.5" fill="none" stroke="#64748b" strokeWidth="0.8" />

            {/* 1st Step Down (Drop Lip Ring) */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="url(#rpf1-silver)" strokeWidth="8.5" />
            <circle cx="100" cy="100" r="89.5" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="80.5" fill="none" stroke="#64748b" strokeWidth="1" />

            {/* 2nd Step Down (Inner Lip Shelf where spokes root) */}
            <circle cx="100" cy="100" r="76" fill="none" stroke="url(#rpf1-silver)" strokeWidth="3.5" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="#475569" strokeWidth="0.8" />

            {/* Black ENKEI Decals on Stepped Lip (2 o'clock and 8 o'clock) */}
            <text fill="#0f172a" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
              <textPath href="#enkei-lip-top" startOffset="18%">⧜ ENKEI</textPath>
            </text>
            <text fill="#0f172a" fontSize="5.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
              <textPath href="#enkei-lip-bot" startOffset="18%">⧜ ENKEI</textPath>
            </text>

            {/* Small Embossed Markings: MAT & VIA */}
            <text x="148" y="146" fill="#64748b" fontSize="3.8" fontWeight="bold" fontFamily="monospace">MAT</text>
            <text x="46" y="58" fill="#64748b" fontSize="3.8" fontWeight="bold" fontFamily="monospace">VIA</text>

            {/* Valve Stem at 6 o'clock */}
            <circle cx="100" cy="188" r="2.4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.8" />
            <circle cx="100" cy="188" r="1.2" fill="#475569" />

            {/* ================= 6 TWIN-SPOKE PAIRS (12 SPOKES) ================= */}
            {[0, 60, 120, 180, 240, 300].map((ang, idx) => (
              <g key={idx} transform={`rotate(${ang} 100 100)`}>
                {/* Left Spoke of Twin Pair */}
                <path
                  d="M 94.5 24.5 L 96.8 68 C 96.8 71, 98 72, 98.6 73 L 96.2 73.5 C 94.8 72, 93.5 69, 93 24.5 Z"
                  fill="url(#rpf1-silver)"
                  stroke="#64748b"
                  strokeWidth="0.4"
                />
                {/* Spoke Left Highlight Bevel */}
                <path d="M 94 25 L 96 68" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" fill="none" />

                {/* Right Spoke of Twin Pair */}
                <path
                  d="M 105.5 24.5 L 103.2 68 C 103.2 71, 102 72, 101.4 73 L 103.8 73.5 C 105.2 72, 106.5 69, 107 24.5 Z"
                  fill="url(#rpf1-silver)"
                  stroke="#64748b"
                  strokeWidth="0.4"
                />
                {/* Spoke Right Highlight Bevel */}
                <path d="M 106 25 L 104 68" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" fill="none" />

                {/* Outer Connection Bridge between Pair at Lip */}
                <path
                  d="M 93 25 Q 100 23.5 107 25 L 105.5 29 Q 100 27.8 94.5 29 Z"
                  fill="url(#rpf1-silver)"
                  stroke="#64748b"
                  strokeWidth="0.4"
                />

                {/* Inner Narrow Pocket Slit Shadow */}
                <line x1="100" y1="28" x2="100" y2="70" stroke="#1e2430" strokeWidth="0.8" opacity="0.7" />
              </g>
            ))}

            {/* ================= RECESSED CENTER HUB & LUG BOWL ================= */}
            {/* Outer Hub Ring */}
            <circle cx="100" cy="100" r="30" fill="url(#rpf1-silver)" stroke="#64748b" strokeWidth="1" />
            <circle cx="100" cy="100" r="28" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.6" />

            {/* Dropped Hub Bowl Surface */}
            <circle cx="100" cy="100" r="26.5" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />

            {/* 5 Chamfered Lug Nut Recesses (5x114.3 layout) */}
            {[0, 72, 144, 216, 288].map((angle, idx) => {
              const lx = 100 + 19.5 * Math.sin((angle * Math.PI) / 180);
              const ly = 100 - 19.5 * Math.cos((angle * Math.PI) / 180);
              return (
                <g key={idx}>
                  {/* Outer Chamfer Ring */}
                  <circle cx={lx} cy={ly} r="4.2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.6" />
                  {/* Deep Counterbore Pocket */}
                  <circle cx={lx} cy={ly} r="3.2" fill="#0f172a" />
                  {/* Chrome/Titanium Hex Lug Nut */}
                  <circle cx={lx} cy={ly} r="2.1" fill="#94a3b8" stroke="#111827" strokeWidth="0.5" />
                  <circle cx={lx} cy={ly} r="1.0" fill="#090d16" />
                </g>
              );
            })}

            {/* ================= CENTER CAP WITH ENKEI RACING BADGE ================= */}
            {/* Center Cap Chrome Bezel */}
            <circle cx="100" cy="100" r="13" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="12" fill="url(#rpf1-hub-grad)" stroke="#111827" strokeWidth="0.6" />

            {/* 5 Miniature Perimeter Allen Bolts on Center Cap */}
            {[36, 108, 180, 252, 324].map((ang, bIdx) => (
              <circle
                key={bIdx}
                cx={100 + 10.2 * Math.sin((ang * Math.PI) / 180)}
                cy={100 - 10.2 * Math.cos((ang * Math.PI) / 180)}
                r="0.75"
                fill="#f8fafc"
                stroke="#0f172a"
                strokeWidth="0.3"
              />
            ))}

            {/* "Racing" Cursive Script */}
            <text
              x="100"
              y="97"
              fill="#ffffff"
              fontSize="3.4"
              fontWeight="bold"
              fontStyle="italic"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Racing
            </text>

            {/* Center Divider Line */}
            <line x1="93" y1="99" x2="107" y2="99" stroke="#e2e8f0" strokeWidth="0.4" />

            {/* "⧜ ENKEI" Center Text */}
            <text
              x="100"
              y="103.5"
              fill="#ffffff"
              fontSize="2.1"
              fontWeight="900"
              fontFamily="monospace"
              textAnchor="middle"
            >
              ⧜ ENKEI
            </text>
          </g>
        );

      case "volk-te37":
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#151518" stroke="#2d2922" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#c5a065" stroke="#3f321a" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="80" fill="#181716" />
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <polygon
                key={idx}
                points="93,24 107,24 105,74 95,74"
                fill="#9a763f"
                stroke="#473418"
                strokeWidth="0.8"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="27" fill="#543e1d" stroke="#523e1e" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="16" fill="#19150f" stroke="#876534" strokeWidth="1" />
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <circle
                key={idx}
                cx={100 + 20 * Math.sin((angle * Math.PI) / 180)}
                cy={100 - 20 * Math.cos((angle * Math.PI) / 180)}
                r="3.2"
                fill="#2b2317"
                stroke="#d3b074"
                strokeWidth="0.8"
              />
            ))}
          </g>
        );

      case "bbs-lm-r":
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#131418" stroke="#333" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
            <circle cx="100" cy="100" r="81" fill="#1a1c22" stroke="#d1d5db" strokeWidth="1" />
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 100 100)`}>
                <path d="M 100 70 L 92 48 L 88 28 L 92 28 L 96 46 Z" fill="#e5e7eb" stroke="#374151" strokeWidth="0.4" />
                <path d="M 100 70 L 108 48 L 112 28 L 108 28 L 104 46 Z" fill="#e5e7eb" stroke="#374151" strokeWidth="0.4" />
              </g>
            ))}
            <circle cx="100" cy="100" r="26" fill="#1b1e26" stroke="#9ca3af" strokeWidth="1" />
            <circle cx="100" cy="100" r="14" fill="#991b1b" stroke="#eab308" strokeWidth="1" />
            <text x="100" y="103" fill="#facc15" fontSize="5" fontWeight="900" textAnchor="middle">BBS</text>
          </g>
        );

      case "hre-s104":
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#0f1117" stroke="#2e3440" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="82" fill="#11141c" />
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 100 100)`}>
                <polygon points="98,24 93,42 97,72 100,72 96,43 100,24" fill="#64748b" stroke="#1e293b" strokeWidth="0.5" />
                <polygon points="102,24 107,42 103,72 100,72 104,43 100,24" fill="#64748b" stroke="#1e293b" strokeWidth="0.5" />
              </g>
            ))}
            <circle cx="100" cy="100" r="26" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <circle cx="100" cy="100" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          </g>
        );

      case "volk-ze40":
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#161514" stroke="#332a1f" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#7a5d30" stroke="#4d3b20" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="82" fill="#181613" />
            {Array.from({ length: 10 }).map((_, i) => (
              <polygon
                key={i}
                points="96,24 104,24 102,74 98,74"
                fill="#b39158"
                stroke="#3b2b14"
                strokeWidth="0.6"
                transform={`rotate(${i * 36} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="25" fill="#2d2215" stroke="#7a5d30" strokeWidth="1.5" />
          </g>
        );

      case "volk-ce28":
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#101318" stroke="#1f2937" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#475569" stroke="#374151" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="82" fill="#131720" />
            {Array.from({ length: 10 }).map((_, i) => (
              <polygon
                key={i}
                points="97,24 103,24 101.5,75 98.5,75"
                fill="#334155"
                stroke="#111827"
                strokeWidth="0.5"
                transform={`rotate(${i * 36} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="24" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          </g>
        );

      default:
        return (
          <g>
            <circle cx="100" cy="100" r="95" fill="#12141a" stroke="#252936" strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="#475569" stroke="#64748b" strokeWidth="2" />
            <circle cx="100" cy="100" r="82" fill="#151821" />
            {Array.from({ length: 8 }).map((_, i) => (
              <polygon
                key={i}
                points="96,24 104,24 101,75 99,75"
                fill="#94a3b8"
                stroke="#334155"
                strokeWidth="0.6"
                transform={`rotate(${i * 45} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="25" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/[0.05] via-transparent to-black/40 pointer-events-none" />
      <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] ${spinStyle}`}>
        {renderGraphic()}
      </svg>
    </div>
  );
}
