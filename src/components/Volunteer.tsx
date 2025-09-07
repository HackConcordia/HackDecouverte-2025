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
              <CTAButton href="#">{t("volunteer.promo.cta.volunteer")}</CTAButton>
              <CTAButton href="#">{t("volunteer.promo.cta.mentor")}</CTAButton>
            </div>
          }
        />
      </div>
    </section>
  );
}
