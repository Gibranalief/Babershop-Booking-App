"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBooking, ApiError } from "@/lib/api";

interface PendingBooking {
  barberId: string;
  barberName: string;
  barberImage?: string;
  barberSpecialty?: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  scheduleId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function BookingConfirmation() {
  const router = useRouter();
  const [booking, setBooking] = useState<PendingBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pendingBooking");
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  const handleConfirm = async () => {
    if (!booking) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await createBooking({
        barberId: booking.barberId,
        serviceId: booking.serviceId,
        scheduleId: booking.scheduleId,
      });

      // Clear pending booking
      sessionStorage.removeItem("pendingBooking");
      setSuccess(true);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to create booking. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatPrice = (price: number) => {
    return price >= 1000 ? `Rp${(price / 1000).toFixed(0)}k` : `Rp${price}`;
  };

  // ─── Success State ────────────────────────────────────────
  if (success) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
          </div>
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-4">Booking Confirmed!</h1>
          <p className="text-on-surface-variant font-body mb-2">Your appointment has been booked successfully.</p>
          <p className="text-outline text-sm mb-10">
            {booking?.barberName} • {booking?.serviceName} • {booking?.startTime}
          </p>
          <Link
            href="/user"
            className="w-full inline-block text-center bg-primary-container text-on-primary-container py-4 rounded-md font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 font-body"
          >
            View My Bookings
          </Link>
        </div>
      </main>
    );
  }

  // ─── No Booking Data ──────────────────────────────────────
  if (!booking) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">event_busy</span>
          <h2 className="text-2xl font-black font-headline mb-2">No booking in progress</h2>
          <p className="text-outline text-sm mb-8">Select a barber and service first.</p>
          <Link href="/barbers" className="px-8 py-3 bg-primary-container text-on-primary-container rounded-lg font-headline font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all">
            Browse Barbers
          </Link>
        </div>
      </main>
    );
  }

  // ─── Confirmation View ────────────────────────────────────
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4 font-headline">Confirm Appointment</h1>
          <p className="text-on-surface-variant font-body text-lg max-w-xl">
            Review your booking details at The Atelier. Our masters are ready to craft your signature look.
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-lg mb-8 text-sm flex items-start gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-9xl">content_cut</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-10">
                  <div>
                    <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.2em] mb-2 block font-bold">Selected Artisan</span>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden grayscale bg-surface-container">
                        <img
                          alt={booking.barberName}
                          src={booking.barberImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAKbe6bH1EzBnkU4TnnsrgvVoFf_fdaGQ01zi3MCnUr56fsNjSOxbv9DG8plHSqgveUTpTQBOUZ0fNsJXXFbuBDAtA-IWeG6yZXyILj_gMX9HX0XW7dy7FqcfZhMX9iT20VzxW61oTQSwu4IaePgdDiRv1hsfJFH6NKtiIUdLzdI8lMJuizwdVtRInT5JsPH3t9NJQU-fywKN8rZq4TAvYAGhC-gXfPWn4_7g542plGjHu-ZQCucAlyqPZFyKKZzN82PQzADjHBMw0"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight font-headline">{booking.barberName}</h3>
                        <p className="text-on-surface-variant text-sm font-body">{booking.barberSpecialty || "Master Stylist"}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.2em] mb-2 block font-bold">Service</span>
                    <p className="text-xl font-bold font-headline">{booking.serviceName}</p>
                    <p className="text-outline text-sm">{booking.serviceDuration} minutes</p>
                  </div>
                </div>
                <div className="space-y-10">
                  <div>
                    <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.2em] mb-2 block font-bold">Date &amp; Arrival</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">calendar_today</span>
                        <p className="text-xl font-bold font-body">{formatDate(booking.date)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        <p className="text-xl font-bold font-body">{booking.startTime} — {booking.endTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-high rounded-xl p-8 border border-outline-variant/5">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-8 text-on-surface font-headline">Final Total</h4>
              <div className="space-y-4 mb-8 font-body">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">{booking.serviceName}</span>
                  <span className="font-bold">{formatPrice(booking.servicePrice)}</span>
                </div>
                <div className="h-px bg-outline-variant/15 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-black text-primary">{formatPrice(booking.servicePrice)}</span>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full bg-primary-container text-on-primary-container py-4 rounded-md font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    <span>Confirming...</span>
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
