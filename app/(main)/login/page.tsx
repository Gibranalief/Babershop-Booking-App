"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api"; // Adjust this path if necessary

export default function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Send login request to the NestJS backend
      const data = await login(email, password);
      
      // 2. Save the role so the Navbar knows where to link the profile button
      if (typeof window !== "undefined") {
        localStorage.setItem("role", data.user.role);
        window.dispatchEvent(new Event("storage")); // Instantly updates the Navbar
      }
      
      // 3. The Traffic Director: Route based on Account Type
      if (data.user?.role === "BARBER") {
        router.push("/dashboard"); 
      } else {
        router.push("/user"); 
      }
      
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="material-symbols-outlined text-9xl">login</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-2">Welcome Back.</h1>
          <p className="text-outline text-sm mb-8">Sign in to manage your bookings and schedule.</p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg focus:border-primary/50 focus:ring-0 transition-all text-sm" 
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg focus:border-primary/50 focus:ring-0 transition-all text-sm" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary-container text-on-primary-container rounded-lg font-headline font-black uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-xs text-on-surface-variant mt-8">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}