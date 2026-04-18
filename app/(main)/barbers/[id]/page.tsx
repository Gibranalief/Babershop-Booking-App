"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBarberDetail, getServices, getSchedules, type Barber, type Service, type Schedule } from "@/lib/api";

export default function BarberDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [barber, setBarber] = useState<Barber | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Schedule | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch barber + services on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [barberData, servicesData] = await Promise.all([
          getBarberDetail(params.id),
          getServices(params.id),
        ]);
        setBarber(barberData);
        setServices(servicesData);
      } catch (err: any) {
        setError(err.message || "Failed to load barber details");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  // Fetch schedules when date changes
  useEffect(() => {
    async function fetchSlots() {
      setSlotsLoading(true);
      setSelectedSlot(null);
      try {
        const data = await getSchedules(params.id, selectedDate);
        setSchedules(data);
      } catch (err: any) {
        setSchedules([]);
      } finally {
        setSlotsLoading(false);
      }
    }
    if (params.id) fetchSlots();
  }, [params.id, selectedDate]);

  // Navigate to booking confirmation
  const handleBookNow = () => {
    if (!selectedService || !selectedSlot || !barber) return;

    const bookingData = {
      barberId: barber.id,
      barberName: barber.user.name,
      barberImage: barber.imageUrl,
      barberSpecialty: barber.specialty,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceDuration: selectedService.duration,
      servicePrice: selectedService.price,
      scheduleId: selectedSlot.id,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };

    // Store booking data for confirmation page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    }

    router.push("/booking");
  };

  // Generate upcoming dates for date picker
  const getUpcomingDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        value: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return dates;
  };

  const availableSlots = schedules.filter((s) => s.status === "AVAILABLE");

  if (isLoading) {
    return (
      <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
        <p className="text-outline text-sm font-label uppercase tracking-widest mt-4">Loading barber...</p>
      </main>
    );
  }

  if (error || !barber) {
    return (
      <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
        <span className="material-symbols-outlined text-4xl text-error">error</span>
        <p className="text-error text-sm font-medium mt-4">{error || "Barber not found"}</p>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
        <div className="lg:col-span-5 relative">
          <div className="asymmetric-radius overflow-hidden bg-surface-container-high aspect-[4/5] shadow-2xl">
            <img
              alt={barber.user.name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              src={barber.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBKIxvNJLGg8F-EPq8pvN72BjJlKgDHH1_92roYJSO5MwxxsRfwxzgQUGeW2p7vWxpDY2BGwWnJwpnBg8xKJIdNN20OFwlComnVDsMclKLi08MyHkoR4Sv7_YCAtJ4qYI-tdsvKgM5RZEWZazvl6BFNTm11JZAj1pYgDpDfExxzENFN4XcgexAkeeUedN1yfxRJcPsAey9Rw0V_LDqGyIvXl3FDmtLd3X4aaYBrDpaBvSu0vFmV2HT_7l3PHj4gWAUSXO8ariUzjMg"}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-tertiary">star</span>
              <span className="text-xl font-bold font-headline">{barber._count?.bookings || 0}</span>
            </div>
            <p className="text-xs text-outline font-label uppercase tracking-widest">{barber.specialty || "Barber"}</p>
          </div>
        </div>
        <div className="lg:col-span-7 pb-4">
          <p className="text-primary font-label text-sm uppercase tracking-[0.3em] mb-4">{barber.specialty || "Stylist"}</p>
          <h1 className="text-7xl md:text-8xl font-black font-headline tracking-tighter leading-none mb-8">{barber.user.name}</h1>
          {barber.bio && (
            <p className="text-on-surface-variant text-base leading-relaxed max-w-lg">{barber.bio}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services Panel */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black font-headline uppercase tracking-tight mb-8">Select Service</h2>
          
          {services.length === 0 && (
            <div className="p-8 bg-surface-container-low rounded-xl text-center">
              <span className="material-symbols-outlined text-3xl text-outline mb-2">content_cut</span>
              <p className="text-outline text-sm font-label uppercase tracking-widest">No services available</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`group text-left p-8 transition-all duration-300 rounded-xl flex justify-between items-center relative overflow-hidden ${
                  selectedService?.id === service.id
                    ? "bg-primary-container/20 ring-2 ring-primary"
                    : "bg-surface-container-low hover:bg-surface-container-high"
                }`}
              >
                <div className={`absolute left-0 top-0 w-1 h-full bg-primary transition-opacity ${selectedService?.id === service.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}></div>
                <div>
                  <h3 className="text-xl font-bold font-headline mb-1">{service.name} ({service.duration} min)</h3>
                  <p className="text-outline text-sm">Duration: {service.duration} minutes</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black font-headline text-on-surface">
                    Rp{service.price >= 1000 ? `${(service.price / 1000).toFixed(0)}k` : service.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Panel */}
        <div className="space-y-8">
          <div className="p-8 bg-surface-container-highest rounded-2xl shadow-xl">
            <h2 className="text-lg font-black font-headline uppercase tracking-tight mb-6">Schedule</h2>
            
            {/* Date Picker */}
            <div className="mb-6">
              <p className="text-xs text-outline font-label uppercase tracking-widest mb-4">Select Date</p>
              <div className="grid grid-cols-4 gap-2">
                {getUpcomingDates().slice(0, 4).map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className={`flex flex-col items-center py-3 px-2 rounded-xl transition-all text-xs font-label ${
                      selectedDate === d.value
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/15"
                    }`}
                  >
                    <span className="font-bold uppercase">{d.dayName}</span>
                    <span className="text-lg font-black font-headline">{d.dayNum}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-8">
              <p className="text-xs text-outline font-label uppercase tracking-widest mb-4">Available Slots</p>
              
              {slotsLoading && (
                <div className="flex items-center justify-center py-6">
                  <span className="material-symbols-outlined animate-spin text-xl text-primary">progress_activity</span>
                </div>
              )}

              {!slotsLoading && availableSlots.length === 0 && (
                <div className="py-6 text-center">
                  <p className="text-outline text-xs font-label uppercase tracking-widest">No slots available</p>
                </div>
              )}

              {!slotsLoading && availableSlots.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button 
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-full transition-all font-label text-xs font-bold ${
                        selectedSlot?.id === slot.id
                          ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/15 active:scale-95"
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              disabled={!selectedService || !selectedSlot}
              className="w-full py-5 bg-primary-container text-on-primary-container rounded-lg font-headline font-extrabold uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Book Now
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
