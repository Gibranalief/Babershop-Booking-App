export default function Footer() {
  return (
    <footer className="bg-[#0b0c0d] border-t border-[#434656]/15 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-20">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-[#e2e2e5] font-black text-xl">The Midnight Atelier</span>
        <p className="text-[#434656] text-sm font-body">
          © 2024 The Midnight Atelier. All Rights Reserved.
        </p>
      </div>
      <nav className="flex gap-8">
        <a className="text-[#434656] hover:text-[#e2e2e5] transition-opacity duration-200 text-sm font-body" href="#">Privacy Policy</a>
        <a className="text-[#434656] hover:text-[#e2e2e5] transition-opacity duration-200 text-sm font-body" href="#">Terms of Service</a>
        <a className="text-[#434656] hover:text-[#e2e2e5] transition-opacity duration-200 text-sm font-body" href="#">Contact</a>
      </nav>
      <div className="flex gap-4">
        <span className="material-symbols-outlined text-[#434656] cursor-pointer hover:text-primary transition-colors">brand_awareness</span>
        <span className="material-symbols-outlined text-[#434656] cursor-pointer hover:text-primary transition-colors">share</span>
      </div>
    </footer>
  );
}
