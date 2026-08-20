import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <span className="text-4xl mb-4 block">📞</span>
        <h1 className="text-2xl font-black text-neutral-900 mb-2">Hubungi Layanan Pelanggan</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Butuh bantuan ukuran, konfirmasi resi, atau informasi reseller? Hubungi CS kami di WhatsApp: <strong>+62 812-3456-7890</strong>
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-neutral-900 text-white text-sm font-bold hover:bg-rose-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
