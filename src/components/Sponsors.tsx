import SectionTitle from "@/components/SectionTitle";
import PromoCard from "@/components/PromoCard";
import CTAButton from "@/components/CTAButton";
import { useTranslations } from 'next-intl';

export default function Sponsors() {
  const t = useTranslations('BeASponsorSection');
  return (
    <section id="sponsors" className="pt-10 lg:pt-20 text-center max-w-7xl mx-auto px-4 flex justify-center items-center flex-col">
      <SectionTitle>{t("title")}</SectionTitle>

      <div className="mt-10 lg:mt-35 lg:mb-45">
        <PromoCard
        title={t("subtitle")}
        body={t("description")}
        cta={<div className="px-4">
          <CTAButton href="#">{t("becomeASponsor")}</CTAButton>
        </div>}
      />
      </div>
    </section>
  );
}
