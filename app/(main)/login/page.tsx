"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      const { role } = await login(email, password);
      if (role === "barber") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="material-symbols-outlined text-9xl">person</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-2">Welcome Back.</h1>
          <p className="text-outline text-sm mb-6">Sign in to manage your appointments.</p>
          
          {error && (
            <div className="bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <p>{error}</p>
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
            <div className="flex items-center justify-between mt-4 mb-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox rounded bg-surface-container-lowest border-outline-variant/30 text-primary focus:ring-primary focus:ring-offset-surface" />
                <span className="text-xs text-on-surface-variant font-medium">Remember me</span>
              </label>
              <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot Password?</Link>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary-container text-on-primary-container rounded-lg font-headline font-black uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p className="text-center text-xs text-on-surface-variant mt-8">
            Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
