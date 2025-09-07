"use client";

import { useTranslation } from "@/i18n/TranslationContext";
import Link from "next/link";
import { Language } from "@/i18n/types";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
    const { language, setLanguage, t } = useTranslation(); // Added `t` for translations
    const [activeSection, setActiveSection] = useState<string>("");
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about-us", "sponsors", "volunteer", "faq"];
            let current = "";
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 80 && rect.bottom > 80) {
                        current = id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className="fixed top-0 w-full bg-[#412721] shadow z-50 text-[#F9C22F]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Image src="/images/HackDecouverte.png" alt="Logo" width={30} height={30} className="rounded-sm" />
                    <Link href="/" className="text-2xl font-bold">
                        {t("title")}
                    </Link>
                </div>

                {/* Nav Links */}
                <div className="space-x-6 hidden md:flex">
                    <Link href="#about-us" 
                    className={`hover:text-yellow-600 ${activeSection === "about-us" ? "text-yellow-400 font-bold" : ""}`}>
                        {t("aboutUs.title")}
                    </Link>
                    <Link href="#sponsors" 
                    className={`hover:text-yellow-600 ${activeSection === "sponsors" ? "text-yellow-400 font-bold" : ""}`}>
                        {t("sponsors.title")}
                    </Link>
                    <Link href="#volunteer" 
                    className={`hover:text-yellow-600 ${activeSection === "volunteer" ? "text-yellow-400 font-bold" : ""}`}>
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
