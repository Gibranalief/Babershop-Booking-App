"use client";

import { useState, useEffect } from "react";
import { getBarberBookings, updateBookingStatus, type Booking } from "@/lib/api";

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  PENDING: { bg: "bg-surface-container-highest", text: "text-tertiary", border: "border-tertiary/20" },
  CONFIRMED: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  COMPLETED: { bg: "bg-[#2e7d32]/10", text: "text-[#66bb6a]", border: "border-[#66bb6a]/20" },
  CANCELLED: { bg: "bg-error/10", text: "text-error", border: "border-error/20" },
};

const NEXT_STATUS: Record<string, string> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "COMPLETED",
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const data = await getBarberBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusUpdate(id: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") {
    setUpdatingId(id);
    try {
      const updated = await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  const formatPrice = (price: number) => {
    return price >= 1000 ? `Rp${(price / 1000).toFixed(0)}k` : `Rp${price}`;
  };

  const activeBookings = bookings.filter((b) => b.status !== "CANCELLED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block font-label">Management Portal</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface font-headline">Bookings.</h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-low px-6 py-3 rounded-xl flex items-center gap-3 border border-outline-variant/5">
              <span className="material-symbols-outlined text-tertiary">group</span>
              <span className="text-sm font-medium font-body">
                {isLoading ? "..." : `${activeBookings.length} Appointment${activeBookings.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            <p className="text-outline text-sm font-label uppercase tracking-widest">Loading bookings...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined text-4xl text-error">error</span>
            <p className="text-error text-sm font-medium">{error}</p>
            <button
              onClick={() => { setError(null); setIsLoading(true); fetchBookings(); }}
              className="mt-2 px-6 py-2 bg-surface-container-low border border-outline-variant/15 rounded-lg text-sm font-label uppercase tracking-widest hover:bg-surface-container transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined text-4xl text-outline">event_busy</span>
            <p className="text-outline text-sm font-label uppercase tracking-widest">No bookings yet</p>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {activeBookings.map((booking) => {
              const style = STATUS_STYLES[booking.status] || STATUS_STYLES.PENDING;
              const nextStatus = NEXT_STATUS[booking.status];

              return (
                <div
                  key={booking.id}
                  className="bg-surface-container-low hover:bg-surface-container-high transition-all rounded-xl overflow-hidden shadow-sm group border border-outline-variant/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 md:p-8 gap-6">
                    {/* Customer Info */}
                    <div className="col-span-1 md:col-span-4 flex items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl text-outline">person</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-container-low ${
                          booking.status === "CONFIRMED" ? "bg-primary" : booking.status === "COMPLETED" ? "bg-[#66bb6a]" : "bg-tertiary"
                        }`}></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight font-headline">{booking.user?.name || "Customer"}</h3>
                        <p className="text-sm text-tertiary font-bold tracking-widest uppercase text-[10px] mt-1 font-label">{booking.service?.name || "Service"}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                      <span className="text-lg font-bold font-headline">{booking.schedule?.startTime || "--:--"}</span>
                      <span className="text-xs text-outline font-label">{booking.service?.duration || 0} min session</span>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2">
                      <span className="text-lg font-bold text-on-surface font-headline">{formatPrice(booking.service?.price || 0)}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className={`${style.bg} ${style.text} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${style.border} font-label`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                      {nextStatus && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, nextStatus as any)}
                          disabled={updatingId === booking.id}
                          className="w-10 h-10 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center disabled:opacity-50"
                          title={`Mark as ${nextStatus.toLowerCase()}`}
                        >
                          {updatingId === booking.id ? (
                            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                          ) : (
                            <span className="material-symbols-outlined text-sm">check</span>
                          )}
                        </button>
                      )}
                      {booking.status !== "COMPLETED" && booking.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                          disabled={updatingId === booking.id}
                          className="w-10 h-10 rounded-xl bg-error/10 text-error hover:bg-error hover:text-on-error transition-all flex items-center justify-center disabled:opacity-50"
                          title="Cancel booking"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      )}
                      {booking.status === "COMPLETED" && (
                        <div className="w-10 h-10 rounded-xl bg-[#2e7d32]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm text-[#66bb6a]">done_all</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Cancelled bookings (collapsed) */}
            {cancelledBookings.length > 0 && (
              <details className="mt-8">
                <summary className="text-outline text-xs font-label uppercase tracking-widest cursor-pointer hover:text-on-surface-variant transition-colors mb-4">
                  {cancelledBookings.length} Cancelled Booking{cancelledBookings.length !== 1 ? "s" : ""}
                </summary>
                <div className="space-y-4 opacity-50">
                  {cancelledBookings.map((booking) => (
                    <div key={booking.id} className="bg-surface-container-low rounded-xl border border-outline-variant/5">
                      <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 md:p-8 gap-6">
                        <div className="col-span-1 md:col-span-4 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl text-outline">person</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold tracking-tight font-headline line-through">{booking.user?.name || "Customer"}</h3>
                            <p className="text-sm text-outline font-bold tracking-widest uppercase text-[10px] mt-1 font-label">{booking.service?.name}</p>
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <span className="text-lg font-bold font-headline text-outline">{booking.schedule?.startTime}</span>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <span className="text-lg font-bold text-outline font-headline">{formatPrice(booking.service?.price || 0)}</span>
                        </div>
                        <div className="col-span-1 md:col-span-4 text-center">
                          <span className="bg-error/10 text-error px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-error/20 font-label">Cancelled</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
