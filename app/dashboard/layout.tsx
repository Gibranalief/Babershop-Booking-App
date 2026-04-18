import BarberSidebar from "@/components/BarberSidebar";
import Link from "next/link";
import React from "react";

export default function BarberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#121416] min-h-screen text-[#e2e2e5] font-body selection:bg-primary/30 antialiased">
      <BarberSidebar />

      {/* Main Content Area */}
      <main className="lg:ml-64 flex-1">
        {children}
      </main>

      {/* BottomNavBar Shell (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 w-full h-16 bg-[#121416]/90 backdrop-blur-xl z-50 flex items-center justify-around px-6 border-t border-[#434656]/10">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#e2e2e5]/60">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-label">Home</span>
        </Link>
        <Link href="/dashboard/schedule" className="flex flex-col items-center gap-1 text-[#e2e2e5]/60">
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-label">Dates</span>
        </Link>
        <Link href="/dashboard/services" className="flex flex-col items-center gap-1 text-[#e2e2e5]/60">
          <span className="material-symbols-outlined">content_cut</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-label">Services</span>
        </Link>
        <Link href="/dashboard/bookings" className="flex flex-col items-center gap-1 text-[#e2e2e5]/60">
          <span className="material-symbols-outlined">event_note</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-label">Bookings</span>
        </Link>
      </nav>
    </div>
  );
}
