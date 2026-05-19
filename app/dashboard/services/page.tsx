"use client";

import { useState, useEffect } from "react";
import { createService, getServices, getProfile, Service } from "../../../lib/api";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(45); // Default 45 mins
  const [price, setPrice] = useState(150000); // Default Rp150.000

  // Fetch existing services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = await getProfile();
        // Assuming your backend has a route to get a barber's ID, or gets it via token
        // If your getServices requires a barberId, you might need to adjust this call
        // For now, let's assume getServices can fetch the logged-in barber's services
        const data = await getServices(user.id); 
        setServices(data || []);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newService = await createService({ name, duration: Number(duration), price: Number(price) });
      setServices([...services, newService]); // Add to UI instantly
      setIsAdding(false); // Close form
      setName(""); // Reset form
    } catch (error: any) {
      alert(error.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">Service Menu.</h2>
            <p className="text-on-surface-variant font-medium text-lg">Curate the Atelier&apos;s precision offerings.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-container/90 text-on-primary-container px-6 py-4 rounded-md font-bold tracking-tight transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
            <span>{isAdding ? 'Cancel' : 'Add New Service'}</span>
          </button>
        </div>

        {/* 🔴 NEW: Add Service Form */}
        {isAdding && (
          <form onSubmit={handleCreateService} className="bg-surface-container-low p-8 rounded-xl mb-10 shadow-lg border border-outline-variant/20">
            <h3 className="text-2xl font-bold mb-6 font-headline">New Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Service Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg text-sm" placeholder="e.g. Buzz Cut" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Duration (Minutes)</label>
                <input type="number" required min="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Price (Rp)</label>
                <input type="number" required min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg text-sm" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-sm disabled:opacity-50">
              {loading ? "Saving..." : "Save Service"}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loop through real services from database */}
          {services.map((service) => (
            <div key={service.id} className="group relative overflow-hidden bg-surface-container-high rounded-xl p-8 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:bg-[#2c2f32]">
              <div className="relative z-10">
                <h3 className="text-3xl font-headline font-bold leading-none mb-4 text-on-surface">{service.name}</h3>
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-sm">schedule</span>
                  <span className="text-on-surface font-bold text-sm tracking-tight">{service.duration} min</span>
                </div>
                <div className="text-2xl font-black text-on-surface font-headline">Rp{service.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
          ))}

          {services.length === 0 && !loading && (
            <div className="col-span-full text-center py-20 text-on-surface-variant">
              No services found. Click "Add New Service" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}