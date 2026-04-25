"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("CUSTOMER");

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role") || "CUSTOMER";
      setIsLoggedIn(!!token);
      setRole(savedRole);
    };

    checkLoginStatus();

    // Listens for the storage event triggered during Login/Register
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // 🔴 Dynamically set the link based on role
  const profileLink = role === "BARBER" ? "/dashboard" : "/user";

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 text-on-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-headline font-black text-2xl tracking-tighter">
          THE ATELIER.
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase items-center">
          <Link href="/barbers" className="hover:text-primary transition-colors">Barbers</Link>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          
          {/* Dynamic Profile Icon */}
          {isLoggedIn ? (
            <Link 
              href={profileLink} 
              className="w-10 h-10 flex items-center justify-center bg-primary-container text-on-primary-container rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm"
              title="My Profile"
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-primary text-on-primary rounded-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}