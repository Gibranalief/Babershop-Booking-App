"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loadUser, role } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadUser(); // Auto load full user info from backend
  }, [loadUser]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== "/" && pathname.startsWith(path));
    return isActive
      ? "text-[#2962ff] font-bold border-b-2 border-[#2962ff] pb-1 font-label text-sm uppercase tracking-widest"
      : "text-[#e2e2e5] font-medium hover:text-[#b6c4ff] transition-colors duration-300 border-b-2 border-transparent pb-1 font-label text-sm uppercase tracking-widest";
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121416]/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 max-w-full">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#e2e2e5] hover:opacity-80 transition-opacity">
          The Midnight Atelier
        </Link>
        <nav className="hidden md:flex items-center gap-6 mt-1">
          <Link href="/barbers" className={getLinkClass("/barbers")}>
            Barbers
          </Link>
          <Link href="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link href="/gallery" className={getLinkClass("/gallery")}>
            Gallery
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {mounted ? (
          user ? (
            <div className="flex items-center gap-4">
              <button className="p-2 transition-transform scale-95 active:scale-90">
                <span className="material-symbols-outlined text-[#e2e2e5]">notifications</span>
              </button>
              
              <div className="relative group">
                <Link href={role === "barber" ? "/dashboard" : "/user"} className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/15 flex items-center justify-center bg-surface-container cursor-pointer">
                  {role === "barber" ? (
                     <span className="material-symbols-outlined text-outline">shield_person</span>
                  ) : (
                     <span className="material-symbols-outlined text-outline">person</span>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-high border border-outline-variant/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                  <div className="p-4 border-b border-outline-variant/10">
                    <p className="text-sm font-bold font-headline">{user.name}</p>
                    <p className="text-xs text-outline font-label uppercase tracking-widest">{role}</p>
                  </div>
                  <div className="p-2">
                    <Link href={role === "barber" ? "/dashboard" : "/user"} className="flex flex-row items-center gap-2 w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-highest rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">dashboard</span>
                      Portal
                    </Link>
                    <button onClick={handleLogout} className="flex flex-row items-center gap-2 w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">logout</span>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg font-headline font-bold text-sm tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20">
              Log In
            </Link>
          )
        ) : (
          <div className="w-10 h-10 rounded-full border border-outline-variant/15 animate-pulse bg-surface-container-high" />
        )}
      </div>
    </header>
  );
}
