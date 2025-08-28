import CTAButton from "./CTAButton";
import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";

export default function Volunteer() {
  return (
    <section id="volunteer" className="pt-10 lg:pt-20 text-center max-w-7xl mx-auto px-4 flex justify-center items-center flex-col">
      <SectionTitle>Volunteer</SectionTitle>
      <div className="mt-10 lg:mt-35 lg:mb-35">
        <PromoCard
          title="JOIN THE TEAM BEHIND SCENES"
          body="Help make our very first edition unforgettable. We're looking for
            volunteers to support logistics, welcome hackers, and keep the good
            vibes flowing."
          cta={
            <div className="px-4">
              <CTAButton href="#">VOLUNTEER NOW!</CTAButton>
              <CTAButton href="#">BECOME A MENTOR!</CTAButton>
            </div>
          }
        />
      </div>
    </section>
  );
}
