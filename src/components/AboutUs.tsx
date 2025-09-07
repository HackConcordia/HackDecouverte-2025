"use client";

import { useTranslation } from "@/i18n/TranslationContext";
import PromoCard from "./PromoCard";
import SectionTitle from "./SectionTitle";
import TeamMemberSection from "./TeamMemberSection";

export default function AboutUs() {
    const {t} = useTranslation();
    const cards = [
        {
            title: t("aboutUs.hackathon.question"),
            description: t("aboutUs.hackathon.answer")
        },
        {
            title: t("aboutUs.hackDecouverte.question"),
            description: t("aboutUs.hackDecouverte.answer")
        },
        {
            title: t("aboutUs.hackConcordia.question"),
            description: t("aboutUs.hackConcordia.answer")
        },
    ];
    return (
        <section id="about-us" className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 lg:py-20">
            <SectionTitle>{t("aboutUs.title")}</SectionTitle>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* Left Column: Cards */}
                <div className="space-y-6">
                    {cards.map((card, index) => (
                        <PromoCard
                            key={index}
                            title={card.title}
                            body={card.description}
                            data-aos="fade-left"
                            data-aos-delay="300"
                        />
                    ))}
                </div>

                {/* Right Column: Team Members */}
                <div className="" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                    <TeamMemberSection />
                </div>
            </div>
        </section>
    );
}
