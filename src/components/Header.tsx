"use client";

import { useTranslation } from "@/i18n/TranslationContext";
import Link from "next/link";
import { Language } from "@/i18n/types";

export default function Header() {
    const { language, setLanguage, t } = useTranslation(); // Added `t` for translations
    return (
        <header className="fixed top-0 w-full bg-[#412721] shadow z-50 text-[#F9C22F]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    {t("title")}
                </Link>

                {/* Nav Links */}
                <div className="space-x-6 hidden md:flex">
                    <Link href="#about-us" className="hover:text-yellow-600">
                        {t("aboutUs.title")}
                    </Link>
                    <Link href="#sponsors" className="hover:text-yellow-600">
                        {t("sponsors.title")}
                    </Link>
                    <Link href="#volunteer" className="hover:text-yellow-600">
                        {t("volunteer.title")}
                    </Link>
                    <Link href="#faq" className="hover:text-yellow-600">
                        {t("faq.title")}
                    </Link>
                    <div>
                        {
                            language === Language.en ?
                                <button onClick={() => setLanguage(Language.fr)} style={{ cursor: "pointer" }}>
                                    FR
                                </button> :
                                <button onClick={() => setLanguage(Language.en)} style={{ cursor: "pointer" }}>
                                    EN
                                </button>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
}
