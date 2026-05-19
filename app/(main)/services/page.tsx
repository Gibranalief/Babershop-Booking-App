import Link from "next/link";

const services = [
  {
    id: 1,
    category: "Signature",
    title: "The Atelier Cut",
    description: "A precision-tailored haircut including a luxury shampoo service, detailed consultation, and professional styling finish.",
    duration: "45 min",
    price: "Rp150k",
  },
  {
    id: 2,
    category: "Grooming",
    title: "Beard Sculpting",
    description: "Precision framing, hot towel application, and deep conditioning with our signature oil blend.",
    duration: "30 min",
    price: "Rp80k",
  },
  {
    id: 3,
    category: "Experience",
    title: "Hot Towel Shave",
    description: "Traditional straight razor shave infused with eucalyptus oils and a revitalizing hot towel wrap.",
    duration: "40 min",
    price: "Rp120k",
  },
  {
    id: 4,
    category: "Package",
    title: "The Midnight Special",
    description: "The ultimate package. The Atelier Cut paired with the Hot Towel Shave and a facial massage.",
    duration: "90 min",
    price: "Rp250k",
  },
  {
    id: 5,
    category: "Coloring",
    title: "Camouflage Blend",
    description: "Subtle grey blending using premium European dyes to ensure a natural, sharp look.",
    duration: "45 min",
    price: "Rp200k",
  },
  {
    id: 6,
    category: "Care",
    title: "Scalp Treatment",
    description: "Deep cleansing and exfoliation for scalp health to stimulate blood flow and hair strength.",
    duration: "20 min",
    price: "Rp100k",
  }
];

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12">
      <header className="mb-20 text-center">
        <p className="text-primary font-label text-sm uppercase tracking-[0.3em] mb-4">Precision &amp; Care</p>
        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none mb-6">
          Service Menu.
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant font-body text-lg">
          Curated treatments blending traditional barbering rituals with modern aesthetic precision. Every service includes a premium beverage of your choice.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="group relative overflow-hidden bg-surface-container-high rounded-xl p-8 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:bg-[#2c2f32]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <span className="bg-tertiary/10 text-tertiary text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full border border-tertiary/20">
                  {service.category}
                </span>
              </div>
              <h3 className="text-3xl font-headline font-bold leading-none mb-4 text-on-surface">
                {service.title}
              </h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6 opacity-70">
                {service.description}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed-dim text-sm">schedule</span>
                <span className="text-on-surface font-bold text-sm tracking-tight">{service.duration}</span>
              </div>
              <div className="text-2xl font-black text-on-surface font-headline">{service.price}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <Link href="/barbers" className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-8 py-5 rounded-lg font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all">
          <span>Choose a Barber</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </main>
  );
}
