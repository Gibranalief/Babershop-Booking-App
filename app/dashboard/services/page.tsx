export default function Services() {
  return (
    <div className="p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">Service Menu.</h2>
            <p className="text-on-surface-variant font-medium text-lg">Curate the Atelier&apos;s precision offerings.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary-container hover:bg-primary-container/90 text-on-primary-container px-6 py-4 rounded-md font-bold tracking-tight transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Service</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden bg-surface-container-high rounded-xl p-8 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:bg-[#2c2f32]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-tertiary/10 text-tertiary text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full border border-tertiary/20">Signature</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>
              <h3 className="text-3xl font-headline font-bold leading-none mb-4 text-on-surface">The Atelier Cut</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6 opacity-70">A precision-tailored haircut including a luxury shampoo service and scalp massage.</p>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed-dim text-sm">schedule</span>
                <span className="text-on-surface font-bold text-sm tracking-tight">45 min</span>
              </div>
              <div className="text-2xl font-black text-on-surface font-headline">Rp150k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
