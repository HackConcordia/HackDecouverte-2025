import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Sponsors from "@/components/Sponsors";
import Volunteer from "@/components/Volunteer";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="relative" style={{
      backgroundImage: "url('/images/bg 4.jpg')",
      backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"
    }}>
      <Header />
      <main className="pt-16 bg-[#ffec9780]"> {/* offset for fixed header */}
        <Hero />
        <AboutUs />
        <Sponsors />
        <Volunteer />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
