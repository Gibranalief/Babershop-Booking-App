import Navbar from "../../components/Navbar";
import MobileNav from "../../components/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-20"> 
        {children}
      </div>
      <MobileNav />
    </>
  );
}