"use client";

import { useTranslation } from "@/i18n/TranslationContext";
import Link from "next/link";

export default function Header() {
    const { language, setLanguage, t } = useTranslation(); // Added `t` for translations
    return (
        <header className="fixed top-0 w-full bg-[#412721] shadow z-50 text-[#F9C22F]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    {t("HackDécouverte")}
                </Link>

                {/* Nav Links */}
                <div className="space-x-6 hidden md:flex">
                    <Link href="#about-us" className="hover:text-yellow-600">
                        {t("About Us")}
                    </Link>
                    <Link href="#sponsors" className="hover:text-yellow-600">
                        {t("Sponsors")}
                    </Link>
                    <Link href="#volunteer" className="hover:text-yellow-600">
                        {t("Volunteer")}
                    </Link>
                    <Link href="#faq" className="hover:text-yellow-600">
                        {t("FAQ")}
                    </Link>
                    <div>
                        <button onClick={() => setLanguage('en')} disabled={language === 'en'}>
                            {t("English")}
                        </button>
                        <button onClick={() => setLanguage('fr')} disabled={language === 'fr'}>
                            {t("Français")}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
