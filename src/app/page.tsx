import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Sponsors from "@/components/Sponsors";
import Volunteer from "@/components/Volunteer";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main className="pt-16"> {/* offset for fixed header */}
        <Hero />
        <AboutUs />
        <Sponsors />
        <Volunteer />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
