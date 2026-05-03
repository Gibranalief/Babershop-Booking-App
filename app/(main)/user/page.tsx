"use client";

import { useState, useEffect } from "react";
import { getMyBookings, type Booking } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  PENDING: { bg: "bg-surface-container-highest", text: "text-tertiary", border: "border-tertiary/20" },
  CONFIRMED: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  COMPLETED: { bg: "bg-[#2e7d32]/10", text: "text-[#66bb6a]", border: "border-[#66bb6a]/20" },
  CANCELLED: { bg: "bg-error/10", text: "text-error", border: "border-error/20" },
};

export default function UserPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push("/login");
    router.refresh(); 
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Failed to load your history");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const activeBookings = bookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED");
  const historyBookings = bookings.filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED");

  const formatPrice = (price: number | undefined) => {
    if (!price) return "Rp 0";
    return price >= 1000 ? `Rp${(price / 1000).toFixed(0)}k` : `Rp${price}`;
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-6 border-b border-outline-variant/10">
        <div>
          <h1 className="font-headline text-4xl font-black tracking-tight">Your Profile</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage your appointments and history</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-lg font-label uppercase tracking-widest text-xs hover:bg-error/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>

      {/* Active Appointments */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-headline text-2xl font-bold tracking-tight">Active Appointments</h2>
          <Link className="text-primary text-sm font-bold tracking-wide uppercase hover:underline" href="/barbers">
            Book New
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-surface-container rounded-xl p-6 h-[180px] animate-pulse">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-surface-container-high rounded-xl"></div>
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
                    <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 bg-surface-container-low rounded-xl">
            <span className="material-symbols-outlined text-4xl text-error">error</span>
            <p className="text-error text-sm font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && activeBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-5xl text-outline opacity-50">event_busy</span>
            <p className="text-outline text-sm font-label uppercase tracking-widest text-center">
              No active bookings yet.<br/>
              Your next style awaits.
            </p>
            <Link href="/barbers" className="mt-4 px-6 py-3 bg-primary-container text-on-primary-container rounded-lg font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all">
              Explore Barbers
            </Link>
          </div>
        )}

        {!isLoading && !error && activeBookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBookings.map((booking) => {
              const style = STATUS_STYLES[booking.status] || STATUS_STYLES.PENDING;
              return (
                <div key={booking.id} className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-highest transition-colors duration-300">
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${style.border}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                      {booking.barber?.imageUrl ? (
                        <img alt={booking.barber.user?.name} src={booking.barber.imageUrl} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-outline">content_cut</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">{booking.barber?.user?.name || "Artisan"}</h3>
                      <p className="text-on-surface-variant text-sm">{booking.service?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
                      <span className="font-medium text-sm">{formatDate(booking.schedule?.date || "")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                      <span className="font-medium text-sm">{booking.schedule?.startTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* History Section */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Recent History</h2>
        
        {isLoading && (
          <div className="bg-surface-container-low rounded-2xl p-6 h-32 animate-pulse">
             <div className="h-4 bg-surface-container-high rounded w-1/4 mb-4"></div>
             <div className="h-3 bg-surface-container-high rounded w-2/4"></div>
          </div>
        )}

        {!isLoading && !error && historyBookings.length === 0 && (
          <div className="bg-surface-container-low rounded-2xl p-8 text-center border border-outline-variant/10">
            <p className="text-outline text-sm font-label uppercase tracking-widest">No past visits recorded.</p>
          </div>
        )}

        {!isLoading && !error && historyBookings.length > 0 && (
          <div className="bg-surface-container-low rounded-2xl overflow-hidden">
            <div className="flex flex-col">
              {historyBookings.map((booking, index) => {
                const isLast = index === historyBookings.length - 1;
                const isCancelled = booking.status === "CANCELLED";
                
                return (
                  <div key={booking.id} className={`flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-surface-container transition-colors ${!isLast ? "border-b border-outline-variant/10" : ""}`}>
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline">history_edu</span>
                      </div>
                      <div>
                        <h4 className={`font-bold font-headline ${isCancelled ? "text-outline line-through" : "text-on-surface"}`}>
                          {booking.barber?.user?.name || "Artisan"}
                        </h4>
                        <p className="text-sm text-on-surface-variant">{booking.service?.name}</p>
                      </div>
                    </div>
                    <div className="md:text-right flex items-center justify-between md:block gap-4 mb-2 md:mb-0">
                      <p className="font-bold text-on-surface text-sm">{formatDate(booking.schedule?.date || "")}</p>
                      <p className={`text-[10px] font-bold tracking-widest uppercase mt-1 ${isCancelled ? "text-error" : "text-[#66bb6a]"}`}>
                        {booking.status}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0">
                      <span className={`font-bold font-headline ${isCancelled ? "text-outline" : "text-on-surface"}`}>
                        {formatPrice(booking.service?.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
