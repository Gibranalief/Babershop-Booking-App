"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getBarbers, type Barber } from "@/lib/api";

export default function BarbersList() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBarbers() {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch (err: any) {
        setError(err.message || "Failed to load barbers");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBarbers();
  }, []);

  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12">
      <header className="mb-16">
        <p className="text-primary font-label text-sm uppercase tracking-[0.3em] mb-4">The Masters</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
            Artisans of the<br />Atelier.
          </h1>
          <div className="bg-surface-container-low p-2 rounded-2xl flex items-center border border-outline-variant/15 w-full md:w-96 shadow-lg shadow-black/20">
            <span className="material-symbols-outlined text-outline pl-4">search</span>
            <input type="text" placeholder="Search by name or style..." className="w-full bg-transparent border-none text-on-surface focus:ring-0 placeholder:text-outline font-body text-sm px-4 py-3" />
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          <p className="text-outline text-sm font-label uppercase tracking-widest">Loading barbers...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span className="material-symbols-outlined text-4xl text-error">error</span>
          <p className="text-error text-sm font-medium">{error}</p>
          <button
            onClick={() => { setError(null); setIsLoading(true); getBarbers().then(setBarbers).catch((e) => setError(e.message)).finally(() => setIsLoading(false)); }}
            className="mt-2 px-6 py-2 bg-surface-container-low border border-outline-variant/15 rounded-lg text-sm font-label uppercase tracking-widest hover:bg-surface-container transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && barbers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <span className="material-symbols-outlined text-4xl text-outline">content_cut</span>
          <p className="text-outline text-sm font-label uppercase tracking-widest">No barbers available yet</p>
        </div>
      )}

      {/* Barber Grid */}
      {!isLoading && !error && barbers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {barbers.map((barber) => (
            <Link key={barber.id} href={`/barbers/${barber.id}`} className="group flex flex-col relative w-full translate-y-0 lg:translate-y-0">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden asymmetric-radius bg-surface-container shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121416] via-transparent to-transparent z-10 opacity-60"></div>
                <img
                  src={barber.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBKIxvNJLGg8F-EPq8pvN72BjJlKgDHH1_92roYJSO5MwxxsRfwxzgQUGeW2p7vWxpDY2BGwWnJwpnBg8xKJIdNN20OFwlComnVDsMclKLi08MyHkoR4Sv7_YCAtJ4qYI-tdsvKgM5RZEWZazvl6BFNTm11JZAj1pYgDpDfExxzENFN4XcgexAkeeUedN1yfxRJcPsAey9Rw0V_LDqGyIvXl3FDmtLd3X4aaYBrDpaBvSu0vFmV2HT_7l3PHj4gWAUSXO8ariUzjMg"}
                  alt={barber.user.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                {barber.specialty && (
                  <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                    {barber.specialty.split(',').map((tag, i) => (
                      <span key={i} className="bg-surface-container-highest/80 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold font-label border border-outline-variant/20">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black font-headline mb-1 group-hover:text-primary transition-colors">{barber.user.name}</h3>
                  <p className="text-outline text-sm font-label uppercase tracking-widest">{barber.specialty || "Barber"}</p>
                </div>
                <div className="flex items-center gap-1 bg-tertiary/10 px-2 py-1 rounded border border-tertiary/20">
                  <span className="material-symbols-outlined text-tertiary text-sm">star</span>
                  <span className="text-tertiary font-bold text-sm">{barber._count?.bookings || 0}</span>
                </div>
              </div>
              {barber.bio && (
                <p className="mt-4 text-on-surface-variant text-sm line-clamp-2 leading-relaxed">
                  {barber.bio}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
