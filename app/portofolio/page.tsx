"use client";
import Image from "next/image";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

const images: GalleryItem[] = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

export default function PortofolioSaya() {
    const galleryRef = useRef<ImageGalleryRef>(null);
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold">Portofolio Saya</h1>
                <p className="text-gray-400 mt-1">Selamat Datang. Ini adalah portofolio saya</p>
            </div>
            <ImageGallery
                ref={galleryRef}
                items={images}
                onSlide={(index) => console.log("Slid to", index)}
            />
            <div className="border rounded p-4 space-y-3">
                <h2 className="text-xl font-semibold">Koleksi Gambar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded p-2 text-center space-y-2">
                        <Image width={400} height={400} src="/a91.jpg" alt="Toyota Supra A91" className="rounded" />
                        <p className="text-xs font-medium">Supra A91</p>
                    </div>
                    <div className="border rounded p-2 text-center space-y-2">
                        <Image width={400} height={400} src="/amgbs.jpg" alt="AMG Black Series" className="rounded" />
                        <p className="text-xs font-medium">AMG Black Series</p>
                    </div>
                    <div className="border rounded p-2 text-center space-y-2">
                        <Image width={400} height={400} src="/g81.jpg" alt="BMW M3 G81" className="rounded" />
                        <p className="text-xs font-medium">BMW M3 G81</p>
                    </div>
                    <div className="border rounded p-2 text-center space-y-2">
                        <Image width={400} height={400} src="/gt3rs.jpg" alt="Porsche GT3 RS" className="rounded" />
                        <p className="text-xs font-medium">Porsche GT3 RS</p>
                    </div>
                </div>
            </div>
            <div className="border rounded p-4 space-y-2">
                <h2 className="text-xl font-semibold">Kontak</h2>
                <ul className="text-sm space-y-1 text-gray-300">
                    <li>Whatsapp: 08123456789</li>
                    <li>Email: test123@gmail.com</li>
                </ul>
            </div>
        </div>
    );
}