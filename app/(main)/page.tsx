export default function Home() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[870px] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/80 to-surface z-10"></div>
          <img
            className="w-full h-full object-cover grayscale brightness-50"
            data-alt="moody atmosphere of a high-end vintage barbershop with leather chairs and warm dim lighting reflecting off mirror surfaces"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp9lfHLHSFssGRB3EcHJdzxqCrOeh418pO51doKuy83GKszOa0GSRK6cry4BHFHyqb7XXoYxi2OtkQgVjf6iuCtVk_aQaPlL89SLR8eyd0MG6YMU7t6ZLVbSrouQNKRmkRUMubbVUGD-H1T6Wb386U0AdFsIZ8IqIzYhzQfek56t2h3flUFjUFqLrDAYOkB2ul9hCAtWWe0zpSNyaWw7kHJY5ojDjKGDJBHPXGHn2JifKt2QomrBdc_6Tobn0WX8I4CbBYwmK3ZNo"
            alt="Hero Background"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <h1 className="font-headline font-extrabold text-6xl md:text-8xl tracking-tighter text-on-surface mb-6 uppercase">
            FIND YOUR <br />
            <span className="text-primary">BARBER</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Book your haircut in seconds at the most exclusive ateliers in the city.
          </p>
          {/* Search Container */}
          <div className="bg-surface-container-low p-2 rounded-xl flex items-center gap-2 max-w-xl mx-auto border border-outline-variant/15 shadow-2xl">
            <span className="material-symbols-outlined ml-4 text-outline">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-on-surface w-full py-4 px-2 placeholder:text-outline"
              placeholder="Search by name or style..."
              type="text"
            />
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-2 whitespace-nowrap">
              Find Nearby
            </button>
          </div>
        </div>
      </section>

      {/* Featured Barbers Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label text-tertiary text-sm uppercase tracking-[0.2em] font-bold block mb-4">Elite Artists</span>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">FEATURED BARBERS</h2>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300">
              View All
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          {/* Bento-ish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Barber Card 1 */}
            <div className="group relative bg-surface-container-high rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/5] relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-alt="professional barber with traditional tattoos cutting hair in a focused manner with vintage tools visible"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIQUEiJKoplxyHqFSpkOw7q8xKYAqP7uTrVDc8ICeNlKXlhIr4PoZ3_dE_nuhYUYB82z4DpHTG2UVe-VtJmIQUWwc7zlCoUDuwXELOvtogbYc00ncRAdacUH4ibVgYh0T-7XXvhT5Ehf4BusTxlin_YBAheJqBI2RpEdD5DiEcz8mEJdkynx1cFvVywMePqa98iJpafyhnaHrhIVoo2sTVvnluMuPfCqoMM_O6n85XIHHZ1sqdl365vkvU1Ba7fsxI5cw8Ufv08cg"
                  alt="Barber"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-tertiary/90 text-on-tertiary px-3 py-1 rounded-full text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  4.8
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">The Master Barber</h3>
                <p className="text-on-surface-variant text-sm mb-6 uppercase tracking-widest font-label">Precision Fades • Beard Sculpting</p>
                <button className="w-full bg-surface-container-highest text-on-surface font-bold py-4 rounded-lg border border-outline-variant/15 transition-colors hover:bg-primary-container hover:text-on-primary-container hover:border-transparent">
                  View Portfolio
                </button>
              </div>
            </div>
            {/* Barber Card 2 */}
            <div className="group relative bg-surface-container-high rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/5] relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-alt="close up of a barber styling hair with extreme precision using scissors in a luxury barbershop setup"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYqlECzNFQJB7p-2PbJOoonDLlY5o5FAF5mBfsBR2bevbTstSJ0nlkfbq5tm9A_caCMdds-hbOuZuoy-s6pKe7gfAsFkMWKzWypOw_CnSYZJNQ8mhJjOgDZHTAP1AJSXlo1k-mFGimQaHB6_SSGkD5Y-imt4Wgy46Ruy7qsvwKP8bK1D6-BAHAJF_LBZhsQus3ccN04f_AZxXzLjCeOcd4nu3Aod0Tz-ToQahP9GCY6UWXowM_uU1TIvQQ2kpjKtpbmU65W8LJF9A"
                  alt="Barber"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-tertiary/90 text-on-tertiary px-3 py-1 rounded-full text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  4.7
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">Classic Cuts</h3>
                <p className="text-on-surface-variant text-sm mb-6 uppercase tracking-widest font-label">Traditional • Scissor Work</p>
                <button className="w-full bg-surface-container-highest text-on-surface font-bold py-4 rounded-lg border border-outline-variant/15 transition-colors hover:bg-primary-container hover:text-on-primary-container hover:border-transparent">
                  View Portfolio
                </button>
              </div>
            </div>
            {/* Barber Card 3 */}
            <div className="group relative bg-surface-container-high rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/5] relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-alt="professional modern barber at work using a straight razor for a clean shave finish on a customer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvWT-6r6u2cmgDoEmigJdPlDuK-MymtinPSOl45K85WXVDSgc6SI5uMWQhqT3R_IUe2lTcyFvtSU8wIplwKmDA_cfogj9b5CksoCoefqUTy7-4SiSWj41GTlo_j37Rnm_WCjbxk9Weewo_gjcMOFe6DuxDMw3WSa40rYiMjZg1AGb6AQ1E9xmtw8KRfDsp-PUNWndG7RFVK39qDn5pPsvktz21T31zkRl7BhB23736AqQj7uGjiZgdPnoBQNktPaf4YPWt7qSC5LU"
                  alt="Barber"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-tertiary/90 text-on-tertiary px-3 py-1 rounded-full text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  4.9
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">Elite Grooming</h3>
                <p className="text-on-surface-variant text-sm mb-6 uppercase tracking-widest font-label">Luxury Shaves • Hot Towel</p>
                <button className="w-full bg-surface-container-highest text-on-surface font-bold py-4 rounded-lg border border-outline-variant/15 transition-colors hover:bg-primary-container hover:text-on-primary-container hover:border-transparent">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-surface-container-low px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <img
              className="relative z-10 w-full rounded-tr-[5rem] rounded-bl-[5rem] border border-outline-variant/15"
              data-alt="dramatic black and white image of a customer sitting in a vintage barber chair looking at their reflection in a large mirror"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB85mmeoxwInhIxgivKAYOsyAMoeqUASUJQe48ksynsCx3FRi1Rs1lXOfgjgG1i3J1qq7lm63uhJBB9XgiUxMV9a8gOKbYyY7Qbm2mpo-PB7naVqlgGJbd97I8o_4ea6wZALLn8dxYkcELHeLfS2a3-JXFq-WusupyRrMTQBG3GZotRlTGOzFTE4nAa2DltzTLPTZkeaGu21zwrel12GKb1DOxaEnIFVweTl4cnAdq6eVvX2U9gtiNLxw4nABRbNErhUGIhZf0c4d0"
              alt="Services"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-headline text-5xl font-extrabold text-on-surface mb-8 tracking-tighter leading-tight">
              TAILORED <br />PRECISION
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <span className="font-headline text-3xl font-black text-outline/30 group-hover:text-primary transition-colors">01</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">The Signature Cut</h4>
                  <p className="text-on-surface-variant">Complete transformation including consultation, precision cutting, and professional styling.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <span className="font-headline text-3xl font-black text-outline/30 group-hover:text-primary transition-colors">02</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">Beard Detailing</h4>
                  <p className="text-on-surface-variant">Sculpting, shaping, and edging with luxury oils for the ultimate finish.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <span className="font-headline text-3xl font-black text-outline/30 group-hover:text-primary transition-colors">03</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">Hot Towel Shave</h4>
                  <p className="text-on-surface-variant">Traditional straight razor shave with premium grooming products and aromatherapy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
