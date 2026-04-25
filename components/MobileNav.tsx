"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const [role, setRole] = useState("CUSTOMER");

  // Read the saved role when the app loads
  useEffect(() => {
    const checkRole = () => {
      const savedRole = localStorage.getItem("role") || "CUSTOMER";
      setRole(savedRole);
    };

    checkRole();
    window.addEventListener("storage", checkRole);
    return () => window.removeEventListener("storage", checkRole);
  }, []);

  // 🔴 DYNAMIC ROUTE: Barbers go to dashboard, Customers go to user profile
  const profileLink = role === "BARBER" ? "/dashboard" : "/user";

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return pathname === path;
  };

  const getLinkClass = (path: string) => {
    return `flex flex-col items-center justify-center px-4 py-2 transition-all cursor-pointer ${
      isActive(path)
        ? "bg-[#2962ff]/15 text-[#b6c4ff] rounded-xl active:scale-95 duration-200"
        : "text-[#434656] hover:text-[#e2e2e5]"
    }`;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#121416]/70 backdrop-blur-xl shadow-[0_-12px_24px_rgba(0,0,0,0.4)] rounded-t-2xl">
      <Link href="/" className={getLinkClass("/")}>
        <span
          className="material-symbols-outlined"
          style={isActive("/") ? { fontVariationSettings: '"FILL" 1' } : {}}
        >
          home
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
      </Link>
      
      <Link href="/barbers" className={getLinkClass("/barbers")}>
        <span
          className="material-symbols-outlined"
          style={isActive("/barbers") ? { fontVariationSettings: '"FILL" 1' } : {}}
        >
          search
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Explore</span>
      </Link>
      
      <Link href="/booking" className={getLinkClass("/booking")}>
        <span
          className="material-symbols-outlined"
          style={isActive("/booking") ? { fontVariationSettings: '"FILL" 1' } : {}}
        >
          event_available
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Bookings</span>
      </Link>
      
      {/* 🔴 DYNAMIC BUTTON */}
      <Link href={profileLink} className={getLinkClass(profileLink)}>
        <span
          className="material-symbols-outlined"
          style={isActive(profileLink) ? { fontVariationSettings: '"FILL" 1' } : {}}
        >
          person
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
      </Link>
    </nav>
  );
}