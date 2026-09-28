"use client";

import { useTranslation } from "@/i18n/TranslationContext";
import CTAButton from "./CTAButton";
import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";

export default function Volunteer() {
  const { t } = useTranslation();
  return (
    <section id="volunteer" className="pt-10 lg:pt-20 text-center max-w-7xl mx-auto px-4 flex justify-center items-center flex-col">
      <SectionTitle>{t("volunteer.title")}</SectionTitle>
      <div className="mt-10 lg:mt-35 lg:mb-35" 
      data-aos="fade-up"
      data-aos-duration="1000" 
      data-aos-delay="200"
      >
        <PromoCard
          title={t("volunteer.promo.heading")}
          body={t("volunteer.promo.body")}
          cta={
            <div className="px-4">
              <CTAButton href="https://docs.google.com/forms/d/e/1FAIpQLSddF5imJ2oFk5LkjZizlPsAVpp8IGPYfPL4C0RNuhOrHiLU2Q/viewform">{t("volunteer.promo.cta.volunteer")}</CTAButton>
              <CTAButton href="https://docs.google.com/forms/d/e/1FAIpQLSctrOa8aSSZ3dd4Kl0N8TlvQObLR0kYwozWSWNF_7NQEIoNkQ/viewform">{t("volunteer.promo.cta.mentor")}</CTAButton>
            </div>
          }
        />
      </div>
    </section>
  );
}
