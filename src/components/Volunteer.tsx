import CTAButton from "./CTAButton";
import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";
import { useTranslations } from "next-intl";

export default function Volunteer() {
  const t = useTranslations('volunteerSection');
  return (
    <section id="volunteer" className="pt-10 lg:pt-20 text-center max-w-7xl mx-auto px-4 flex justify-center items-center flex-col">
      <SectionTitle>{t("title")}</SectionTitle>
      <div className="mt-10 lg:mt-35 lg:mb-35">
        <PromoCard
          title={t("subtitle")}
          body={t("description")}
          cta={
            <div className="px-4">
              <CTAButton href="#">{t("becomeAVolunteer")}</CTAButton>
              <CTAButton href="#">{t("becomeAMentor")}</CTAButton>
            </div>
          }
        />
      </div>
    </section>
  );
}
