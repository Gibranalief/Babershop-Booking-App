import Link from "next/link";

export default function Register() {
  return (
    <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-surface-container-low p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="material-symbols-outlined text-9xl">person_add</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black font-headline tracking-tighter mb-2">Join Us.</h1>
          <p className="text-outline text-sm mb-8">Create an account to book your next session.</p>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Full Name</label>
              <input type="text" className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg focus:border-primary/50 focus:ring-0 transition-all text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
              <input type="email" className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg focus:border-primary/50 focus:ring-0 transition-all text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
              <input type="password" className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-3 rounded-lg focus:border-primary/50 focus:ring-0 transition-all text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-4 bg-primary-container text-on-primary-container rounded-lg font-headline font-black uppercase tracking-widest text-sm hover:brightness-110 active:scale-[0.98] transition-all">Sign Up</button>
          </form>
          <p className="text-center text-xs text-on-surface-variant mt-8">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
