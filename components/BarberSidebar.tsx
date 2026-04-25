"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getProfile } from "../lib/api"; 

export default function BarberSidebar() {
  // 🔴 NEW: State to hold the barber's name
  const [barberName, setBarberName] = useState("Loading...");

  // 🔴 NEW: Fetch the actual profile data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getProfile();
        setBarberName(userData.name);
      } catch (err) {
        console.error("Could not fetch profile:", err);
        setBarberName("Barber Profile"); // Fallback just in case
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // 1. Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    
    // 2. Nuke the cookies aggressively
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // 3. Force a hard browser reload to the login page
    window.location.href = "/login";
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
          {/* Default avatar until you add an image upload feature */}
          <span className="w-10 h-10 rounded-full border border-[#434656]/15 flex items-center justify-center bg-[#1a1c1e] text-[#8d90a2]">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </span>
          <div className="flex flex-col">
            {/* 🔴 DYNAMIC NAME INJECTION */}
            <span className="text-xs font-bold text-[#e2e2e5] font-body">{barberName}</span>
            <span className="text-[10px] text-[#8d90a2] uppercase tracking-wider font-label">Master Barber</span>
          </div>
        </div>
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