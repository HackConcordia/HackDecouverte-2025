import "./styles/hackdecouverte.css";

import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TeamMemberSection from "./components/TeamMemberSection";
import Volunteer from "./components/Volunteer";
import { LanguageProvider } from "./lib/i18n";

export default function HackDecouverte2026() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Volunteer />
        <TeamMemberSection />
        <FAQ />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
