import Navbar from "../../components/Navbar";
import MobileNav from "../../components/MobileNav";
import Footer from "../../components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20"> 
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}