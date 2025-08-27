import CTAButton from "./CTAButton";
import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";

export default function Volunteer() {
  return (
    <section id="volunteer" className="py-20 bg-gray-50 text-center">
      <SectionTitle>Volunteer</SectionTitle>
      <PromoCard
        title="JOIN THE TEAM BEHIND SCENES"
        body="Help make our very first edition unforgettable. We're looking for
            volunteers to support logistics, welcome hackers, and keep the good
            vibes flowing."
        cta={
          <>
            <CTAButton href="#">VOLUNTEER NOW!</CTAButton>
            <CTAButton href="#">BECOME A MENTOR!</CTAButton>
          </>
        }
      />
    </section>
  );
}
