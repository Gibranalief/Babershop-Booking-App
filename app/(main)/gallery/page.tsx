export default function GalleryPage() {
  const images = [
    {
      id: 1,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYqlECzNFQJB7p-2PbJOoonDLlY5o5FAF5mBfsBR2bevbTstSJ0nlkfbq5tm9A_caCMdds-hbOuZuoy-s6pKe7gfAsFkMWKzWypOw_CnSYZJNQ8mhJjOgDZHTAP1AJSXlo1k-mFGimQaHB6_SSGkD5Y-imt4Wgy46Ruy7qsvwKP8bK1D6-BAHAJF_LBZhsQus3ccN04f_AZxXzLjCeOcd4nu3Aod0Tz-ToQahP9GCY6UWXowM_uU1TIvQQ2kpjKtpbmU65W8LJF9A",
      alt: "Close up of scissors cutting hair",
      category: "Barber Work",
      tall: true
    },
    {
      id: 2,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp9lfHLHSFssGRB3EcHJdzxqCrOeh418pO51doKuy83GKszOa0GSRK6cry4BHFHyqb7XXoYxi2OtkQgVjf6iuCtVk_aQaPlL89SLR8eyd0MG6YMU7t6ZLVbSrouQNKRmkRUMubbVUGD-H1T6Wb386U0AdFsIZ8IqIzYhzQfek56t2h3flUFjUFqLrDAYOkB2ul9hCAtWWe0zpSNyaWw7kHJY5ojDjKGDJBHPXGHn2JifKt2QomrBdc_6Tobn0WX8I4CbBYwmK3ZNo",
      alt: "Atelier Vibe",
      category: "Aesthetic",
      tall: false
    },
    {
      id: 3,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKIxvNJLGg8F-EPq8pvN72BjJlKgDHH1_92roYJSO5MwxxsRfwxzgQUGeW2p7vWxpDY2BGwWnJwpnBg8xKJIdNN20OFwlComnVDsMclKLi08MyHkoR4Sv7_YCAtJ4qYI-tdsvKgM5RZEWZazvl6BFNTm11JZAj1pYgDpDfExxzENFN4XcgexAkeeUedN1yfxRJcPsAey9Rw0V_LDqGyIvXl3FDmtLd3X4aaYBrDpaBvSu0vFmV2HT_7l3PHj4gWAUSXO8ariUzjMg",
      alt: "Styling finish",
      category: "Haircuts",
      tall: true
    },
    {
      id: 4,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB85mmeoxwInhIxgivKAYOsyAMoeqUASUJQe48ksynsCx3FRi1Rs1lXOfgjgG1i3J1qq7lm63uhJBB9XgiUxMV9a8gOKbYyY7Qbm2mpo-PB7naVqlgGJbd97I8o_4ea6wZALLn8dxYkcELHeLfS2a3-JXFq-WusupyRrMTQBG3GZotRlTGOzFTE4nAa2DltzTLPTZkeaGu21zwrel12GKb1DOxaEnIFVweTl4cnAdq6eVvX2U9gtiNLxw4nABRbNErhUGIhZf0c4d0",
      alt: "Customer in mirror",
      category: "Aesthetic",
      tall: true
    },
    {
      id: 5,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2vaiZlVmK7ODBI6SxDA_jQyH4cp_tZvapBikrbMRkVx-d3Vl5yIdXyo4s8KuC_WDQt8kK6gPNynw04aH7nLGz4j6kBjaTNSCcslaiD35d4UxqneYX7F0LuDWr4FMSjAbrYJwD93_IlHYhfwIOtVymVk9Y0rgOpJmb8nVFZ11OIV-O8IB96dWK2BnAHyQkLQjbjkmsKWlIwY79MmuYRCdqwDJwhEJnf2kugz23CceZLM5pFyqMpv9zFrqSfKjvmISo65QaFzJiz3M",
      alt: "Styled hair",
      category: "Haircuts",
      tall: false
    },
    {
      id: 6,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvWT-6r6u2cmgDoEmigJdPlDuK-MymtinPSOl45K85WXVDSgc6SI5uMWQhqT3R_IUe2lTcyFvtSU8wIplwKmDA_cfogj9b5CksoCoefqUTy7-4SiSWj41GTlo_j37Rnm_WCjbxk9Weewo_gjcMOFe6DuxDMw3WSa40rYiMjZg1AGb6AQ1E9xmtw8KRfDsp-PUNWndG7RFVK39qDn5pPsvktz21T31zkRl7BhB23736AqQj7uGjiZgdPnoBQNktPaf4YPWt7qSC5LU",
      alt: "Beard work shaving",
      category: "Barber Work",
      tall: true
    }
  ];

  return (
    <main className="pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12">
      <header className="mb-16">
        <p className="text-primary font-label text-sm uppercase tracking-[0.3em] mb-4 text-center">Visual Archive</p>
        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none mb-6 text-center">
          The Gallery.
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <span className="px-6 py-2 bg-surface-container-high rounded-full text-sm font-bold uppercase tracking-widest border border-outline-variant/20 hover:text-primary transition-colors cursor-pointer">All Works</span>
          <span className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors cursor-pointer">Haircuts</span>
          <span className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors cursor-pointer">Barber Work</span>
          <span className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors cursor-pointer">Aesthetic</span>
        </div>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img) => (
          <div key={img.id} className="relative group overflow-hidden bg-surface-container-low rounded-xl break-inside-avoid">
            <div className="absolute inset-0 bg-gradient-to-t from-[#121416]/90 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={img.src}
              alt={img.alt}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${img.tall ? 'h-[400px] md:h-[500px]' : 'h-[300px]'}`}
            />
            <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-primary font-label uppercase tracking-widest text-xs font-bold block mb-1">
                {img.category}
              </span>
              <p className="font-headline font-bold text-lg text-on-surface">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
