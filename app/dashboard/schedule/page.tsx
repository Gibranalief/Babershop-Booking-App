export default function Schedule() {
  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto pb-32">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-tertiary font-label uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">Operations</span>
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">Availability.</h2>
          </div>
        </header>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-4 flex flex-col gap-6">
            <section className="bg-surface-container-low p-8 rounded-xl shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-headline font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pending_actions</span>
                Time Frame
              </h3>
              <div className="space-y-8 relative z-10">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3 font-label">Start Shift</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-4 rounded-md focus:border-primary/50 focus:ring-0 transition-all font-body text-lg" type="time" defaultValue="09:00" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3 font-label">End Shift</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-4 py-4 rounded-md focus:border-primary/50 focus:ring-0 transition-all font-body text-lg" type="time" defaultValue="18:00" />
                </div>
              </div>
            </section>
          </div>
          <div className="xl:col-span-8">
            <section className="bg-surface-container-low p-8 rounded-xl min-h-[500px]">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-headline font-bold mb-1">Generated Matrix</h3>
                  <p className="text-sm text-on-surface-variant font-body">Toggle slots to enable or disable them from public booking.</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-primary-fixed transition-colors font-label">
                  Reset All
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <button className="group flex flex-col items-center justify-center p-6 rounded-lg bg-primary text-on-primary transition-all active:scale-95 shadow-xl shadow-primary/10">
                  <span className="text-xs font-black tracking-widest opacity-60 mb-1 font-label">MORNING</span>
                  <span className="text-lg font-bold font-headline">09:00</span>
                  <div className="mt-3 w-1.5 h-1.5 rounded-full bg-on-primary"></div>
                </button>
                <button className="group flex flex-col items-center justify-center p-6 rounded-lg bg-surface-container-high text-on-surface transition-all hover:bg-surface-container-highest border border-outline-variant/10">
                  <span className="text-xs font-black tracking-widest text-on-surface-variant mb-1 font-label">MORNING</span>
                  <span className="text-lg font-bold font-headline">10:00</span>
                  <div className="mt-3 w-1.5 h-1.5 rounded-full bg-outline-variant/40"></div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
