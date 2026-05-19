"use client";

import { useState, useEffect } from "react";
import { getBarberBookings, type Booking } from "@/lib/api";

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBarberBookings();
        setBookings(data);
      } catch {
        // Silently fail on overview
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter((b) => {
    const bookingDate = b.schedule?.date?.split("T")[0];
    return bookingDate === todayStr && b.status !== "CANCELLED";
  });

  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.service?.price || 0), 0);

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `Rp. ${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `Rp. ${(price / 1000).toFixed(0)}k`;
    return `Rp. ${price}`;
  };

  const upcomingBookings = bookings
    .filter((b) => b.status === "PENDING" || b.status === "CONFIRMED")
    .slice(0, 5);

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#e9c349] font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block font-label">Management Portal</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#e2e2e5] font-headline">Overview.</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1c1e] p-6 rounded-xl border border-[#434656]/5 relative overflow-hidden group hover:border-[#2962ff]/50 transition-colors">
            <span className="material-symbols-outlined absolute right-6 top-6 text-[#434656] text-4xl group-hover:text-[#2962ff] transition-colors">attach_money</span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a2] mb-4 font-label">Revenue (Completed)</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black font-headline tracking-tighter">
                {isLoading ? "..." : formatPrice(totalRevenue)}
              </span>
            </div>
          </div>
          <div className="bg-[#1a1c1e] p-6 rounded-xl border border-[#434656]/5 relative overflow-hidden group hover:border-[#e9c349]/50 transition-colors">
            <span className="material-symbols-outlined absolute right-6 top-6 text-[#434656] text-4xl group-hover:text-[#e9c349] transition-colors">group</span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a2] mb-4 font-label">Clients Today</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black font-headline tracking-tighter">
                {isLoading ? "..." : todayBookings.length}
              </span>
              <span className="text-xs text-[#8d90a2]">Booked</span>
            </div>
          </div>
          <div className="bg-[#1a1c1e] p-6 rounded-xl border border-[#434656]/5 relative overflow-hidden group hover:border-[#ff6d00]/50 transition-colors">
            <span className="material-symbols-outlined absolute right-6 top-6 text-[#434656] text-4xl group-hover:text-[#ff6d00] transition-colors">pending_actions</span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a2] mb-4 font-label">Pending</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black font-headline tracking-tighter">
                {isLoading ? "..." : pendingCount}
              </span>
              <span className="text-xs text-[#8d90a2]">To confirm</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {!isLoading && upcomingBookings.length > 0 && (
          <div>
            <h2 className="text-2xl font-black font-headline uppercase tracking-tight mb-6">Upcoming</h2>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="bg-[#1a1c1e] rounded-xl p-5 flex items-center justify-between border border-[#434656]/5 hover:border-[#434656]/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline">person</span>
                    </div>
                    <div>
                      <p className="font-bold font-headline">{booking.user?.name || "Customer"}</p>
                      <p className="text-xs text-[#8d90a2] font-label">{booking.service?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-headline">{booking.schedule?.startTime}</p>
                    <p className="text-xs text-[#8d90a2] font-label">{booking.schedule?.date?.split("T")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && upcomingBookings.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-[#434656] mb-4">event_available</span>
            <p className="text-[#8d90a2] text-sm font-label uppercase tracking-widest">No upcoming appointments</p>
          </div>
        )}
      </div>
    </div>
  );
}
