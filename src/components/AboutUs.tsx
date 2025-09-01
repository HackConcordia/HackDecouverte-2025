import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";
import TeamMemberSection from "./TeamMemberSection";
import { useTranslations } from 'next-intl';

export default function AboutUs() {
    const t = useTranslations("AboutUsSection");

    const cards = [
        {
            title: t("innovation"),
            description: t("description1")
        },
        {
            title: t("collaboration"),
            description: t("description2")
        },
        {
            title: t("learning"),
            description: t("description3")
        },
    ];

    return (
        <section id="about-us" className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 lg:py-20">
            <SectionTitle>{t("title")}</SectionTitle>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* Left Column: Cards */}
                <div className="space-y-6">
                    {cards.map((card, index) => (
                        <PromoCard
                            key={index}
                            title={card.title}
                            body={card.description}
                        />
                    ))}
                </div>

                {/* Right Column: Team Members */}
                <div className="">
                    <TeamMemberSection />
                </div>
            </div>
        </section>
    );
}
