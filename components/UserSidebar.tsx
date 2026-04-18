"use client";

import { useAuthStore } from "@/store/authStore";

export default function UserSidebar() {
  const { user } = useAuthStore();
  const userName = user?.name || "Customer";
  
  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="bg-surface-container-low rounded-2xl p-8 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 ring-4 ring-primary/10 bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-outline">person</span>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">{userName}</h3>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest mb-6">Atelier Client</p>
          
          <button className="mt-4 w-full py-3 bg-surface-container-highest text-on-surface font-bold font-label text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </button>
        </div>
      </div>
{/* Loyalty Program placeholder if needed in the future */}
    </div>
  );
}
