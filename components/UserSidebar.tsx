"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function BarberSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
    // 2. Clear cookies by setting their expiration date to the past
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

    // 3. Redirect back to login page
    router.push("/login");
    
    // 4. Force a refresh so the UI updates
    router.refresh(); 
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-[#121416] flex-col py-10 px-6 z-40 border-r border-[#434656]/10">
      <div className="mb-12">
        <div className="text-xl font-black text-[#e2e2e5] font-headline uppercase tracking-[0.1em] mb-1">
          THE ATELIER
        </div>
        <div className="text-[10px] text-[#e9c349] uppercase tracking-[0.2em] font-bold font-label">
          Premium Barbering
        </div>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        <Link href="/dashboard" className="flex items-center gap-4 text-[#e2e2e5]/50 px-4 py-3 hover:bg-[#1a1c1e] hover:text-[#e2e2e5] rounded-lg transition-all duration-300 ease-in-out font-label uppercase tracking-[0.1em] text-xs group">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Overview</span>
        </Link>
        <Link href="/dashboard/schedule" className="flex items-center gap-4 text-[#e2e2e5]/50 px-4 py-3 hover:bg-[#1a1c1e] hover:text-[#e2e2e5] rounded-lg transition-all duration-300 ease-in-out font-label uppercase tracking-[0.1em] text-xs group">
          <span className="material-symbols-outlined">calendar_today</span>
          <span>Schedule</span>
        </Link>
        <Link href="/dashboard/services" className="flex items-center gap-4 text-[#e2e2e5]/50 px-4 py-3 hover:bg-[#1a1c1e] hover:text-[#e2e2e5] rounded-lg transition-all duration-300 ease-in-out font-label uppercase tracking-[0.1em] text-xs group">
          <span className="material-symbols-outlined">content_cut</span>
          <span>Services</span>
        </Link>
        <Link href="/dashboard/bookings" className="flex items-center gap-4 text-[#e2e2e5]/50 px-4 py-3 hover:bg-[#1a1c1e] hover:text-[#e2e2e5] rounded-lg transition-all duration-300 ease-in-out font-label uppercase tracking-[0.1em] text-xs group">
          <span className="material-symbols-outlined">event_note</span>
          <span>Bookings</span>
        </Link>
      </nav>
      <div className="mt-auto pt-8">
        <button className="w-full bg-[#2962ff] text-[#f7f5ff] py-4 rounded-xl font-bold text-sm tracking-tight mb-6 flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95">
          <span className="material-symbols-outlined text-sm">add</span>
          New Appointment
        </button>
        <div className="flex items-center gap-3 mb-6 border-t border-[#434656]/10 pt-6">
          <img
            alt="Barber Profile"
            className="w-10 h-10 rounded-full border border-[#434656]/15 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCImgBAeMcTLsHvgmFqKKaj-N1l9_9JozQ7onrjlSCoYimSgOdfjNAqcezBgAaxa-KkMxeXnYATp0xhRHHL8uaQYn1Dhu43mY08RrS1Z65JXeyXfepJb4REbqxK7GJ7fU3d5ov9edshQWGeOmI6FhzDoH4YpF9KOLqLsKtweKeI1MI9FTxhFBZ2qD0JTW40Rf7s3JLSVFmdbdHSB2rgpcdnLSjWV-IIDuPnYyLEg1baFw62jMuaax7l6nn2Dp4UOODne8TLrGzsU2g"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#e2e2e5] font-body">Alex River</span>
            <span className="text-[10px] text-[#8d90a2] uppercase tracking-wider font-label">Master Barber</span>
          </div>
        </div>
        
        {/* 🔴 REPLACED LINK WITH WORKING BUTTON 🔴 */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 text-[#e2e2e5]/50 px-4 py-3 hover:text-[#ffb4ab] transition-colors font-label uppercase tracking-[0.1em] text-xs group bg-transparent border-none cursor-pointer text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
        
      </div>
    </aside>
  );
}