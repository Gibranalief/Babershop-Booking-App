export default function AboutPage() {
  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12">
      {/* Hero */}
      <section className="mb-32">
        <div className="relative h-[60vh] w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-surface z-10"></div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp9lfHLHSFssGRB3EcHJdzxqCrOeh418pO51doKuy83GKszOa0GSRK6cry4BHFHyqb7XXoYxi2OtkQgVjf6iuCtVk_aQaPlL89SLR8eyd0MG6YMU7t6ZLVbSrouQNKRmkRUMubbVUGD-H1T6Wb386U0AdFsIZ8IqIzYhzQfek56t2h3flUFjUFqLrDAYOkB2ul9hCAtWWe0zpSNyaWw7kHJY5ojDjKGDJBHPXGHn2JifKt2QomrBdc_6Tobn0WX8I4CbBYwmK3ZNo" 
            alt="The Atelier Shop" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-none max-w-2xl">
              Redefining the <br/><span className="text-primary">Gentleman&apos;s</span> Ritual.
            </h1>
            <p className="text-on-surface-variant font-label tracking-widest uppercase text-sm max-w-xs text-right">
              Established 2018. <br/> Located in the heart of the metropolis.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40 items-center">
        <div>
          <span className="text-tertiary font-label text-sm uppercase tracking-[0.3em] mb-4 block font-bold">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-black font-headline mb-8 leading-tight">More than a haircut. <br/> A statement of intent.</h2>
          <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-light">
            <p>
              The Midnight Atelier was born out of a desire to resurrect the classic gentleman&apos;s barbershop experience, infused with meticulous modern precision. It is a sanctuary away from the chaos of the city.
            </p>
            <p>
              Every chair in our atelier represents a commitment to the craft. We don&apos;t just cut hair; we curate confidence. Our master barbers are trained internationally, bringing techniques from London, Tokyo, and New York straight to your local neighborhood.
            </p>
          </div>
        </div>
        <div className="bg-surface-container p-12 rounded-[2rem] border border-outline-variant/10 text-center flex flex-col items-center justify-center aspect-square shadow-xl">
          <span className="material-symbols-outlined text-7xl text-primary/50 mb-6 font-light">cut</span>
          <h3 className="font-headline text-3xl font-bold mb-4">Precision First.</h3>
          <p className="text-on-surface-variant">We take our time because excellence cannot be rushed. Average service duration is 45 minutes, allowing for detailed consultation and perfect execution.</p>
        </div>
      </section>

      {/* What Makes Us Premium */}
      <section className="mb-40">
        <h2 className="text-4xl md:text-6xl font-black font-headline text-center mb-16 tracking-tight">The Atelier Standard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">star</span>
            </div>
            <h4 className="text-2xl font-bold font-headline mb-4">Master Craftsmen</h4>
            <p className="text-on-surface-variant leading-relaxed">Our team consists exclusively of senior stylists with a minimum of 5 years of top-tier barbershop experience.</p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary text-3xl">local_cafe</span>
            </div>
            <h4 className="text-2xl font-bold font-headline mb-4">Curated Ambience</h4>
            <p className="text-on-surface-variant leading-relaxed">Enjoy complimentary premium espresso, aged whiskeys, and curated lo-fi acoustics during your service.</p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
            <div className="w-16 h-16 bg-primary-container/20 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-fixed-dim text-3xl">workspace_premium</span>
            </div>
            <h4 className="text-2xl font-bold font-headline mb-4">Luxury Products</h4>
            <p className="text-on-surface-variant leading-relaxed">We exclusively use artisan-crafted, organic grooming products designed to protect your hair and skin health.</p>
          </div>
        </div>
      </section>

      {/* Team Intro Teaser */}
      <section className="bg-surface-container-high rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">Meet the Masters Behind the Chairs.</h2>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            Our barbers are artists, therapists, and confidants. Discover their individual styles and book your session with the master that resonates with your vision.
          </p>
          <a href="/barbers" className="inline-flex items-center gap-2 bg-on-surface text-surface px-8 py-4 rounded-lg font-bold font-headline uppercase tracking-widest hover:bg-primary-fixed transition-colors">
            <span>View All Barbers</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-end">
          <div className="flex gap-4">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKWILyYkYh1PyaENREL4XrZMY1NuSgOt4u26gmWPro-nUu4DZ09RJwkNCCGJ6f7_gWB9YufFi9mxhT_UhaSG9coBvCO7Qh3LdnoQN67b9--RA0pzu0jV2uGxMA0b4qTm_KfL8I8WTjiyDqtGKkMyAT-rY84eRbOtWipmpZl6kVYhynvrB0XUk7e5Cn5NnrIO9RoDA60_HDRs3g_eT5gklyQinICgnpw9VVYfdHN1Siqz2x5MxbGWF0xMr6yq2VqrzYwEbXhid2P20" alt="Barber" className="w-32 h-48 md:w-48 md:h-64 object-cover rounded-2xl shadow-xl rotate-[-6deg] translate-y-6" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYqlECzNFQJB7p-2PbJOoonDLlY5o5FAF5mBfsBR2bevbTstSJ0nlkfbq5tm9A_caCMdds-hbOuZuoy-s6pKe7gfAsFkMWKzWypOw_CnSYZJNQ8mhJjOgDZHTAP1AJSXlo1k-mFGimQaHB6_SSGkD5Y-imt4Wgy46Ruy7qsvwKP8bK1D6-BAHAJF_LBZhsQus3ccN04f_AZxXzLjCeOcd4nu3Aod0Tz-ToQahP9GCY6UWXowM_uU1TIvQQ2kpjKtpbmU65W8LJF9A" alt="Barber" className="w-32 h-48 md:w-48 md:h-64 object-cover rounded-2xl shadow-xl rotate-[4deg] z-10" />
          </div>
        </div>
      </section>

    </main>
  );
}
