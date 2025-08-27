import SectionTitle from "@/components/SectionTitle";
import PromoCard from "@/components/PromoCard";
import CTAButton from "@/components/CTAButton";

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-20 bg-white text-center">
      <SectionTitle>BE A SPONSOR</SectionTitle>

      <PromoCard
        title="SUPPORT THE NEXT GENERATION OF BUILDERS"
        body="We're launching our first edition — and we want to do it with the support of industry leaders. Be part of a high-impact event empowering young talent."
        cta={<CTAButton href="#">BECOME A SPONSOR!</CTAButton>}
      />
    </section>
  );
}
