"use client";

import { useState } from "react";

// 1. 🔥 TEMPAT MELETAKKAN GAMBAR KAMU 🔥
// Ganti bagian 'src' dengan path gambar kamu di folder public/images/ atau link internet
const galleryData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Haircuts",
    title: "Classic Pompadour",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Barber Work",
    title: "Beard Trim & Razor",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Aesthetic",
    title: "The Atelier Vibe",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Aesthetic",
    title: "Modern Fade",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Barber Work",
    title: "Precision Styling",
  },
  {
    id: 6,
    src: "https://i.imgur.com/CtsJHKu.jpeg?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Haircuts",
    title: "Jin Kazama",
  },
  {
    id: 7,
    src: "https://i.imgur.com/WQM8lab.jpeg?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Haircuts",
    title: "Textured Two Block",
  },
  {
    id: 8,
    src: "https://i.imgur.com/AH2x4c0.jpeg?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Haircuts",
    title: "Willie Salim Cut",
  },
  {
    id: 9,
    src: "https://i.imgur.com/ZNdi0zB.jpeg?q=80&w=800&auto=format&fit=crop", // Ganti gambar ini
    category: "Barber Work",
    title: "Transition Service",
  },
];

// Daftar kategori submenu
const categories = ["All Works", "Haircuts", "Barber Work", "Aesthetic"];

export default function GalleryPage() {
  // State untuk melacak kategori menu apa yang sedang aktif/diklik
  const [activeTab, setActiveTab] = useState("All Works");

  // Logic untuk menyaring gambar berdasarkan tab yang diklik
  const filteredGallery =
    activeTab === "All Works"
      ? galleryData
      : galleryData.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Our Masterpieces
          </h1>
          <p className="text-gray-400">
            Explore the finest grooming and styling by The Atelier
            professionals.
          </p>
        </div>

        {/* 🔥 Submenu Kategori (Clickable) 🔥 */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border 
        ${
          activeTab === category
            ? "bg-amber-600 text-white border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]"
            : "bg-transparent text-zinc-400 border-zinc-800 hover:border-amber-600 hover:text-amber-500"
        }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 🔥 Grid Tempat Gambar Ditampilkan 🔥 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5] cursor-pointer"
            >
              {/* Gambar Portfolio */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />

              {/* Overlay Aesthetic saat di hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Jika kategori kosong (Opsional jika datanya belum kamu isi) */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No images available for this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
