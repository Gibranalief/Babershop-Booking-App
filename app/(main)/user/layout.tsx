import UserSidebar from "@/components/UserSidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-2">
          Dashboard
        </h1>
        <p className="text-on-surface-variant font-label tracking-widest uppercase text-sm">
          Welcome back, Marcus
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {children}
        </div>
        <div className="lg:col-span-4">
          <UserSidebar />
        </div>
      </div>
    </main>
  );
}
