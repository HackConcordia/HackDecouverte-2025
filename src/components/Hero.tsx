"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/TranslationContext";
import Countdown from "./Countdown";
import DateDisplay from "./DateDisplay";

export default function Hero() {
    const { t } = useTranslation();
    const config = {
        title: 'HackDecouverte',
        eventStartDate: '2025-11-15T08:00:00',
        eventEndDate: '2025-11-15T19:00:00',
    };

    return (
        <section className="relative mt-10 sm:mt-0 lg:min-h-screen flex flex-col items-center md:justify-center text-center max-w-7xl mx-auto px-4">

            {/* Title */}
            <h1 className="relative text-4xl sm:text-6xl md:text-8xl font-extrabold pt-4 lg:pt-6 pb-4
                            mb-6 tracking-tight drop-shadow-lg w-full
                            border-t-4 border-b-4 border-[#D00000] text-[#491000]
                            font-['Archivo Black']">
                {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="relative text-sm md:text-xl max-w-4xl mb-2 font-bold">
                {t("hero.subheading")}
            </p>

            <a
                href="https://register.hackdecouverte.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-5 text-center bg-[#491000] text-white font-bold rounded-sm shadow hover:bg-[#320b00] transition text-xs lg:text-base mt-2"
            >
                {t("hero.register")}
            </a>

            {/* Countdown */}
            <Countdown targetDate={config.eventStartDate} />
            <DateDisplay
                startDate={config.eventStartDate}
                endDate={config.eventEndDate}
            />

            {/* HackConcordia credit */}
            <p className="mt-6 lg:mt-4 text-sm sm:text-base text-gray-800">
                {t("hero.organizer")}{" "}
                <a
                    href="https://www.hackconcordia.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#491000] underline"
                >
                    HackConcordia
                </a>
            </p>

            {/* Spacer to push bottom */}
            <div className="mb-20" />
            <Image
                src="/images/globe.png"
                alt="HackConcordia Logo"
                width={450}
                height={350}
                className="absolute hidden lg:block bottom-0 right-0 mb-4"
            />
            <Image
                src="/images/globe.png"
                alt="HackConcordia Logo"
                width={120}
                height={100}
                className="absolute lg:hidden block bottom-0 right-0"
            />
            <Image
                src="/images/star.png"
                alt="HackConcordia Logo"
                width={130}
                height={90}
                className="absolute hidden lg:block bottom-20 left-0 lg:bottom-70 md:left-10 lg:left-45 mb-4"
            />
            <Image
                src="/images/star.png"
                alt="HackConcordia Logo"
                width={70}
                height={60}
                className="absolute block lg:hidden bottom-5 left-5 lg:bottom-70 md:left-10 lg:left-45 mb-4"
            />
            <Image
                src="/images/stars.png"
                alt="HackConcordia Logo"
                width={60}
                height={60}
                className="absolute hidden md:block bottom-40 lg:left-100 mb-4"
            />
            <Image
                src="/images/stars.png"
                alt="HackConcordia Logo"
                width={60}
                height={60}
                className="absolute hidden md:block bottom-80 lg:right-90 mb-4"
            />
        </section>
    );
}
