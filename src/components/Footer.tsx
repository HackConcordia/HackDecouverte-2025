"use client"

import { useTranslation } from "@/i18n/TranslationContext";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="py-6 text-center bg-[#412721] text-white">
            <p>
                © {new Date().getFullYear()}{" - "}{new Date().getFullYear() + 1}{" "}
                <a
                    href="https://www.hackconcordia.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    {t("organization")}
                </a>
                . {t("footer.rights")}
            </p>
        </footer>
    );
}
