"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Data Kategori
const CATEGORIES = [
  {
    id: "kaos",
    name: "Oversized & T-Shirt",
    count: "24+ Model",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    tag: "Terlaris",
  },
  {
    id: "kemeja",
    name: "Kemeja Casual & Linen",
    count: "18+ Model",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    tag: "Favorit",
  },
  {
    id: "outerwear",
    name: "Hoodie & Jacket",
    count: "15+ Model",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    tag: "Populer",
  },
  {
    id: "celana",
    name: "Chino & Cargo Pants",
    count: "20+ Model",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    tag: "Tren Baru",
  },
];

// Data Produk Unggulan
const PRODUCTS = [
  {
    id: 1,
    name: "Heavyweight Oversized T-Shirt (24s)",
    category: "kaos",
    price: 129000,
    originalPrice: 179000,
    rating: 4.9,
    sold: 1420,
    badge: "BEST SELLER",
    badgeColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80",
    colors: ["#1e293b", "#f8fafc", "#78716c", "#14532d"],
  },
  {
    id: 2,
    name: "Premium Linen Relaxed Short Shirt",
    category: "kemeja",
    price: 199000,
    originalPrice: 259000,
    rating: 4.8,
    sold: 890,
    badge: "NEW ARRIVAL",
    badgeColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80",
    colors: ["#fef3c7", "#dbeafe", "#f3f4f6"],
  },
  {
    id: 3,
    name: "Urban Fleece Pullover Hoodie",
    category: "outerwear",
    price: 249000,
    originalPrice: 329000,
    rating: 5.0,
    sold: 630,
    badge: "DISKON 25%",
    badgeColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
    colors: ["#0f172a", "#475569", "#7f1d1d"],
  },
  {
    id: 4,
    name: "Smart Slim-Fit Chino Ankle Pants",
    category: "celana",
    price: 219000,
    originalPrice: 289000,
    rating: 4.9,
    sold: 1100,
    badge: "HOT ITEM",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80",
    colors: ["#1e293b", "#a8a29e", "#3f3f46"],
  },
  {
    id: 5,
    name: "Signature Boxy Fit Graphic Tee",
    category: "kaos",
    price: 139000,
    originalPrice: 189000,
    rating: 4.7,
    sold: 520,
    badge: "LIMITED",
    badgeColor: "bg-indigo-600",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
    colors: ["#09090b", "#fafafa"],
  },
  {
    id: 6,
    name: "Korean Minimalist Corduroy Jacket",
    category: "outerwear",
    price: 279000,
    originalPrice: 359000,
    rating: 4.9,
    sold: 410,
    badge: "TRENDING",
    badgeColor: "bg-rose-600",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80",
    colors: ["#78350f", "#334155"],
  },
];

// Testimoni Pembeli
const TESTIMONIALS = [
  {
    id: 1,
    name: "Dimas Pratama",
    city: "Jakarta Selatan",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Bahan katun oversized-nya beneran premium, adem banget dipakai seharian dan jahitannya sangat rapi. Pas banget di badan!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Clarissa Dewi",
    city: "Surabaya",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Kemeja linen-nya elegan parah! Warna persis seperti di foto, pengiriman super cepat cuma 2 hari udah sampai. Bakal langganan!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Rizky Firmansyah",
    city: "Bandung",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "Hoodie-nya tebal tapi gak gerah, furing dalamnya halus. Fit-nya bener-bener streetwear aesthetic kekinian.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter produk berdasarkan tab
  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`"${productName}" berhasil ditambahkan ke keranjang!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Format Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-neutral-700 animate-bounce">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-neutral-950 text-neutral-300 text-xs sm:text-sm py-2.5 px-4 text-center tracking-wide border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500 text-white">
            PROMO SPECIAL
          </span>
          <span>
            Diskon hingga <strong className="text-white font-semibold">30%</strong> & Gratis Ongkir Seluruh Indonesia! Kode: <span className="underline decoration-rose-400 font-mono text-white font-bold">FASHIONNEW</span>
          </span>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                VERVE<span className="text-rose-600">STUDIO</span>
              </span>
              <span className="block text-[10px] tracking-widest text-neutral-400 font-semibold uppercase -mt-1">
                Modern Apparel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600">
            <Link href="/" className="text-neutral-950 hover:text-rose-600 transition-colors">
              Beranda
            </Link>
            <Link href="/product" className="hover:text-rose-600 transition-colors">
              Koleksi Baju
            </Link>
            <Link href="/bahan" className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
              <span>Bahan & Kualitas</span>
              <span className="text-[10px] bg-neutral-100 border border-neutral-300 text-neutral-700 px-1.5 py-0.5 rounded font-bold">
                100% Katun
              </span>
            </Link>
            <Link href="/about" className="hover:text-rose-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" className="hover:text-rose-600 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              aria-label="Cari Produk"
              className="p-2.5 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button */}
            <Link
              href="/product"
              className="relative p-2.5 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Keranjang Belanja"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA Nav Button */}
            <Link
              href="/product"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-rose-600 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-rose-600/20"
            >
              Beli Sekarang
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 rounded-lg"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 bg-white px-6 py-5 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-900 hover:text-rose-600 py-1"
            >
              Beranda
            </Link>
            <Link
              href="/product"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-600 hover:text-rose-600 py-1"
            >
              Koleksi Baju
            </Link>
            <Link
              href="/bahan"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-600 hover:text-rose-600 py-1"
            >
              Bahan & Kualitas
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-600 hover:text-rose-600 py-1"
            >
              Tentang Kami
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-600 hover:text-rose-600 py-1"
            >
              Kontak
            </Link>
            <div className="pt-2">
              <Link
                href="/product"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-neutral-900 text-white font-semibold text-sm"
              >
                Mulai Belanja
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-100 via-neutral-50 to-white pt-10 pb-20 lg:pt-16 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-ping"></span>
                <span>Koleksi Musim Baru 2026 Kini Hadir</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.12]">
                Tampil Percaya Diri dengan Pakaian{" "}
                <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                  Modern & Nyaman
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Koleksi fashion premium dirancang khusus untuk kenyamanan harian Anda. Menggunakan bahan Katun Organik 24s/30s & Linen alami yang lembut, adem, dan awet dicuci.
              </p>

              {/* Action Buttons & Guarantee */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/product"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-base transition-all duration-300 shadow-xl hover:shadow-neutral-900/30 hover:-translate-y-0.5"
                >
                  <span>Eksplor Koleksi</span>
                  <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <Link
                  href="/bahan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-semibold text-base transition-all duration-200"
                >
                  <span>Cek Kualitas Bahan</span>
                </Link>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-neutral-900">50K+</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">Baju Terjual</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-neutral-900">4.9/5</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">Rating Ulasan</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-neutral-900">100%</p>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">Garansi Pas</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-5 relative">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200 to-amber-100 rounded-3xl filter blur-2xl opacity-70 -z-10"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                  alt="Model Fashion Baju"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Card 1: Sale Badge */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-lg border border-neutral-200/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm">
                    %
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">Spesial Hari Ini</p>
                    <p className="text-xs font-bold text-neutral-900">Diskon 30% All Item</p>
                  </div>
                </div>

                {/* Floating Card 2: Rating Proof */}
                <div className="absolute bottom-5 right-5 left-5 bg-neutral-950/85 backdrop-blur-md p-4 rounded-2xl text-white border border-neutral-800 shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      ★ 4.9 dari 12.000+ Ulasan
                    </span>
                    <span className="text-[11px] text-neutral-400">Garansi 7 Hari</span>
                  </div>
                  <p className="text-xs text-neutral-200 font-normal">
                    "Bahan beneran adem, gak luntur, dan jahitan rapi banget!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION / KENAPA KAMI */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-neutral-900 text-base">Bahan Premium 100%</h2>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Katun Combed organik & linen lembut yang breathable dan tidak bikin gerah.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-neutral-900 text-base">Gratis Ongkir</h2>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Bebas biaya kirim ke seluruh kota di Indonesia tanpa minimal belanja.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-neutral-900 text-base">Garansi Tukar Ukuran</h2>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Kebesaran atau kekecilan? Kami bantu retur ukuran dalam tempo 7 hari.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-neutral-900 text-base">Bisa Bayar COD / QRIS</h2>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Transaksi aman dan mudah bisa bayar di tempat saat paket sampai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KATEGORI PILIHAN */}
      <section className="py-20 bg-neutral-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                PILIHAN KATEGORI
              </span>
              <h2 className="text-3xl font-black text-neutral-950 mt-1">
                Katalog Gaya Sesuai Aktivitasmu
              </h2>
            </div>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-rose-600 transition-colors"
            >
              <span>Lihat Semua Kategori</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href="/product"
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-neutral-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs text-neutral-300 font-medium">{cat.count}</p>
                  <h3 className="text-xl font-bold tracking-tight mt-0.5 group-hover:text-rose-400 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUK TERLARIS / BEST SELLER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
              PRODUK TERPOPULER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-1">
              Rekomendasi Baju Terlaris Minggu Ini
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-3">
              Dipilih dari ribuan ulasan pelanggan puas. Temukan model terbaik yang pas untuk karaktermu.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
              {[
                { id: "all", label: "Semua Koleksi" },
                { id: "kaos", label: "Kaos Oversized" },
                { id: "kemeja", label: "Kemeja Linen" },
                { id: "outerwear", label: "Outerwear & Hoodie" },
                { id: "celana", label: "Celana Chino" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${selectedCategory === tab.id
                    ? "bg-neutral-950 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md ${product.badgeColor}`}
                  >
                    {product.badge}
                  </span>

                  {/* Quick Add Overlay Button */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-white/95 hover:bg-white text-neutral-900 font-bold py-3 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      + Tambah ke Keranjang
                    </button>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Sold */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <span>★</span>
                        <span className="text-neutral-900 font-semibold">{product.rating}</span>
                      </div>
                      <span>{product.sold} terjual</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-neutral-900 text-base leading-snug group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Color Options */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {product.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-neutral-300"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                      <span className="text-[11px] text-neutral-400 font-medium ml-1">Pilihan warna</span>
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-neutral-950">
                        {formatRupiah(product.price)}
                      </p>
                      <p className="text-xs text-neutral-400 line-through">
                        {formatRupiah(product.originalPrice)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="p-3 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-900 rounded-xl transition-colors duration-200"
                      title="Beli"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/product"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-sm transition-colors"
            >
              <span>Lihat 120+ Produk Lainnya</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PROMO CALLOUT / BANNER DISKON */}
      <section className="py-16 bg-neutral-950 text-white relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-rose-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-850 border border-neutral-800 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider">
                FLASH SALE WEEKEND
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Hemat Hingga <span className="text-rose-500">50%</span> Untuk Pembelian Bundling
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Beli 2 Kaos Oversized + 1 Celana Chino, dapatkan gratis 1 Tote Bag eksklusif + Gratis Ongkir ke seluruh wilayah Indonesia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl px-6 py-4 text-center w-full sm:w-auto">
                <p className="text-[11px] text-neutral-400 font-semibold uppercase">Kode Kupon:</p>
                <p className="text-xl font-black font-mono text-rose-400 tracking-wider">BUNDLING50</p>
              </div>

              <Link
                href="/product"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-base shadow-xl hover:shadow-rose-600/30 transition-all duration-200"
              >
                Klaim Promo Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONI PELANGGAN */}
      <section className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
              TESTIMONI REAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 mt-1">
              Kata Mereka Tentang VERVE STUDIO
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Kepuasan dan kenyamanan pakaian Anda adalah komitmen utama kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex text-amber-400 text-sm mb-4">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-neutral-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">{t.name}</h4>
                    <p className="text-[11px] text-neutral-500">
                      {t.city} • <span className="text-emerald-600 font-semibold">{t.role}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SUBSCRIPTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100 border border-neutral-200">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
              Dapatkan Voucher Diskon 15% untuk Pembelian Pertamamu
            </h2>
            <p className="text-neutral-600 text-sm mt-2 max-w-xl mx-auto">
              Daftarkan emailmu untuk menerima info rilis koleksi baju terbaru, tips fashion mingguan, dan diskon rahasia member.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Terima kasih! Kode voucher 15% telah dikirim ke email Anda.");
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6"
            >
              <input
                type="email"
                required
                placeholder="Masukkan alamat email kamu..."
                className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-colors shadow-md shrink-0"
              >
                Daftar Member
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-neutral-950 text-neutral-400 text-sm pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-neutral-900 flex items-center justify-center font-black text-lg">
                  V
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  VERVE<span className="text-rose-500">STUDIO</span>
                </span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Brand fashion lokal Indonesia dengan standar kualitas bahan butik. Mengutamakan kenyamanan, estetika simpel, dan daya tahan pakaian tinggi.
              </p>
              <div className="text-xs text-neutral-400 space-y-1">
                <p>📍 Jakarta & Bandung, Indonesia</p>
                <p>💬 WhatsApp Support: +62 812-3456-7890</p>
                <p>✉️ Email: hello@vervestudio.id</p>
              </div>
            </div>

            {/* Column 2: Navigasi */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Halaman</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="/product" className="hover:text-white transition-colors">Katalog Baju</Link></li>
                <li><Link href="/bahan" className="hover:text-white transition-colors">Informasi Bahan</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Tentang Brand</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Column 3: Kategori */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Kategori</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/product" className="hover:text-white transition-colors">Kaos Oversized</Link></li>
                <li><Link href="/product" className="hover:text-white transition-colors">Kemeja Casual & Linen</Link></li>
                <li><Link href="/product" className="hover:text-white transition-colors">Hoodie & Sweater</Link></li>
                <li><Link href="/product" className="hover:text-white transition-colors">Celana Chino & Cargo</Link></li>
                <li><Link href="/product" className="hover:text-white transition-colors">Aksesoris & Topi</Link></li>
              </ul>
            </div>

            {/* Column 4: Bantuan & Jaminan */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Bantuan & Syarat</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Panduan Ukuran (Size Chart)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Retur 7 Hari</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cek Status Resi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ & Tanya Jawab</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright & Payment Badges */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} VERVE STUDIO. Seluruh hak cipta dilindungi.</p>
            <div className="flex items-center gap-3 font-medium text-neutral-400">
              <span>BCA</span>
              <span>•</span>
              <span>Mandiri</span>
              <span>•</span>
              <span>QRIS</span>
              <span>•</span>
              <span>GoPay / OVO</span>
              <span>•</span>
              <span>COD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}