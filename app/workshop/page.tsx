"use client";

import React, { useState } from "react";
import Link from "next/link";
import { message, Modal } from "antd";
import {
  BookmarkCheck,
  Settings,
  Bell,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  Activity,
} from "lucide-react";
import {
  ALL_INVENTORY_ITEMS,
  CATEGORY_CONFIG,
  InventoryItem,
} from "@/app/inventory/data/wheels";
import WorkshopSidebar from "./components/WorkshopSidebar";
import PartCatalogSidebar from "./components/PartCatalogSidebar";
import ShowroomTelemetryFooter from "./components/ShowroomTelemetryFooter";
import Showroom3DCanvas from "./components/Showroom3DCanvas";
import ModelImportModal from "./components/ModelImportModal";

export default function ShowroomWorkshopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("velg");

  // Equipped Parts Map
  const [equippedParts, setEquippedParts] = useState<{
    velg: InventoryItem;
    tyres: InventoryItem;
    hood: InventoryItem;
    spoiler: InventoryItem;
    bodykit: InventoryItem;
    brake: InventoryItem;
  }>({
    velg: ALL_INVENTORY_ITEMS.find((i) => i.id === "volk-te37") || ALL_INVENTORY_ITEMS[1],
    tyres: ALL_INVENTORY_ITEMS.find((i) => i.id === "toyo-proxes-r888r") || ALL_INVENTORY_ITEMS[8],
    hood: ALL_INVENTORY_ITEMS.find((i) => i.id === "varis-carbon-bonnet") || ALL_INVENTORY_ITEMS[14],
    spoiler: ALL_INVENTORY_ITEMS.find((i) => i.id === "voltex-type-7") || ALL_INVENTORY_ITEMS[20],
    bodykit: ALL_INVENTORY_ITEMS.find((i) => i.id === "pandem-v2-widebody") || ALL_INVENTORY_ITEMS[26],
    brake: ALL_INVENTORY_ITEMS.find((i) => i.id === "brembo-gtr-billet") || ALL_INVENTORY_ITEMS[32],
  });

  // Selected 3D Car Model Preset
  const [selectedCarModelId, setSelectedCarModelId] = useState<
    "porsche-gt3rs" | "bmw-m3-g81" | "toyota-supra-a91"
  >("porsche-gt3rs");

  // Custom User Uploaded Model
  const [customModelFile, setCustomModelFile] = useState<{
    file: File;
    type: "glb" | "gltf" | "fbx";
    scale: number;
  } | null>(null);

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Calculate dynamic modification budget
  const totalModCost =
    equippedParts.velg.priceNumber +
    equippedParts.tyres.priceNumber +
    equippedParts.hood.priceNumber +
    equippedParts.spoiler.priceNumber +
    equippedParts.bodykit.priceNumber +
    equippedParts.brake.priceNumber;

  const handleEquipItem = (item: InventoryItem) => {
    setEquippedParts((prev) => ({
      ...prev,
      [item.type]: item,
    }));
    message.success({
      content: `${item.name} terpasang ke mobil 3D!`,
      style: { marginTop: "5vh" },
    });
  };

  const handleResetToStock = () => {
    setCustomModelFile(null);
    setEquippedParts({
      velg: ALL_INVENTORY_ITEMS[0],
      tyres: ALL_INVENTORY_ITEMS[8],
      hood: ALL_INVENTORY_ITEMS[14],
      spoiler: ALL_INVENTORY_ITEMS[20],
      bodykit: ALL_INVENTORY_ITEMS[26],
      brake: ALL_INVENTORY_ITEMS[32],
    });
    message.info("Konfigurasi mobil di-reset ke pengaturan standar pabrik.");
  };

  const handleSaveBuild = () => {
    setIsSaved(true);
    message.success({
      content: "3D Car Setup & Telemetry Profile successfully saved to cloud!",
      style: { marginTop: "5vh" },
    });
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-neutral-200 font-sans relative selection:bg-[#9cbbf8] selection:text-black flex flex-col justify-between">
      {/* Background Tech Blueprint Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Lighting Accents */}
      <div className="fixed top-20 left-1/4 w-[28rem] h-[28rem] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-1/4 w-[32rem] h-[32rem] bg-indigo-950/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* SUB-HEADER / BUDGET BAR (Matching Screenshot Header) */}
      <div className="relative z-20 border-b border-white/[0.06] bg-[#0c0e14]/90 px-4 sm:px-8 py-2 backdrop-blur-sm">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4 font-mono text-xs">
          {/* Left Sub-title */}
          <div className="hidden sm:flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">3D TUNING STUDIO // REALTIME STAGE</span>
          </div>

          {/* Center/Right: Modification Budget & Save Build Button */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 uppercase block">
                MODIFICATION BUDGET
              </span>
              <span className="text-[#9cbbf8] font-bold text-sm">
                Rp {totalModCost.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleSaveBuild}
              className="px-4 py-1.5 bg-[#9cbbf8] hover:bg-[#b4ceff] text-[#08090c] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_12px_rgba(156,187,248,0.25)] hover:shadow-[0_0_18px_rgba(156,187,248,0.45)] flex items-center gap-1.5 active:scale-95"
            >
              <BookmarkCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SAVE BUILD</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN 3D SHOWROOM LAYOUT */}
      <main className="relative z-10 max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 xl:gap-6 items-start flex-1">
          {/* 1. LEFT STICKY SIDEBAR: VEHICLE CONFIG */}
          <div className="sticky top-20 lg:top-24 shrink-0 self-start z-20 w-full lg:w-auto">
            <WorkshopSidebar
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              onOpenImportModal={() => setIsImportModalOpen(true)}
              onCheckout={() => setIsCheckoutModalOpen(true)}
              onResetModifications={handleResetToStock}
            />
          </div>

          {/* 2. CENTER SECTION: 3D VIEWPORT SHOWROOM */}
          <section className="flex-1 flex flex-col min-w-0 w-full">
            <Showroom3DCanvas
              equippedVelg={equippedParts.velg}
              equippedTyre={equippedParts.tyres}
              equippedSpoiler={equippedParts.spoiler}
              equippedHood={equippedParts.hood}
              equippedBodykit={equippedParts.bodykit}
              equippedBrake={equippedParts.brake}
              customModelFile={customModelFile}
              selectedCarModelId={selectedCarModelId}
              onSelectCarModel={(id) => {
                setSelectedCarModelId(id);
                setCustomModelFile(null);
                message.info(`Memuat model 3D ${id.toUpperCase()} ke showroom.`);
              }}
            />
          </section>

          {/* 3. RIGHT STICKY SIDEBAR: PART CATALOG */}
          <div className="sticky top-20 lg:top-24 shrink-0 self-start z-20 w-full lg:w-auto">
            <PartCatalogSidebar
              activeCategory={activeCategory}
              equippedItem={
                equippedParts[activeCategory as keyof typeof equippedParts] || equippedParts.velg
              }
              onEquipItem={handleEquipItem}
            />
          </div>
        </div>

        {/* 4. BOTTOM TELEMETRY FOOTER BAR */}
        <ShowroomTelemetryFooter
          equippedVelg={equippedParts.velg}
          equippedTyre={equippedParts.tyres}
          onOpenTyreCatalog={() => setActiveCategory("tyres")}
        />
      </main>

      {/* Custom 3D Model Import Modal (.glb, .gltf, .fbx) */}
      <ModelImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onLoadCustomModel={(file, type, scale) => {
          setCustomModelFile({ file, type, scale });
        }}
      />

      {/* Checkout Modal */}
      <Modal
        open={isCheckoutModalOpen}
        onCancel={() => setIsCheckoutModalOpen(false)}
        footer={null}
        centered
      >
        <div className="p-4 sm:p-6 bg-[#0c0e14] text-neutral-200 rounded-xl font-mono border border-white/10 -m-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#9cbbf8]" />
            <div>
              <h3 className="text-base font-black text-white uppercase">
                COMPLETE 3D VEHICLE BUILD CHECKOUT
              </h3>
              <p className="text-[11px] text-neutral-400">Total Accessories & Workshop Fitting</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs mb-6 max-h-60 overflow-y-auto pr-1">
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Velg</span>
              <span className="text-white font-bold">{equippedParts.velg.name} ({equippedParts.velg.price})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Tyres</span>
              <span className="text-white font-bold">{equippedParts.tyres.name} ({equippedParts.tyres.price})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Hood</span>
              <span className="text-white font-bold">{equippedParts.hood.name} ({equippedParts.hood.price})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Spoiler</span>
              <span className="text-white font-bold">{equippedParts.spoiler.name} ({equippedParts.spoiler.price})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Bodykit</span>
              <span className="text-white font-bold">{equippedParts.bodykit.name} ({equippedParts.bodykit.price})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-neutral-400">Brake System</span>
              <span className="text-white font-bold">{equippedParts.brake.name} ({equippedParts.brake.price})</span>
            </div>
            <div className="flex justify-between py-2 text-neutral-300 font-bold text-sm pt-2">
              <span>Total Modification Cost</span>
              <span className="text-[#9cbbf8]">Rp {totalModCost.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutModalOpen(false);
              message.success({
                content: "All accessories ordered & sent to telemetry installation bay!",
                style: { marginTop: "5vh" },
              });
            }}
            className="w-full py-3 bg-[#9cbbf8] hover:bg-[#b4ceff] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(156,187,248,0.3)]"
          >
            ORDER FULL BUILD TO WORKSHOP
          </button>
        </div>
      </Modal>

      {/* System Footer Status */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#08090c]/80 py-2.5 px-6 text-center shrink-0">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D SHOWROOM RENDERER: ACTIVE (WEBGL 2.0)</span>
          </div>
          <div className="hidden sm:block">
            <span>SHIFT_TECH PRECISION VEHICLE MODIFICATOR // GLB & FBX COMPLIANT</span>
          </div>
          <div>
            <span>FPS: 60 • THREE.JS SHADER ENGINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
