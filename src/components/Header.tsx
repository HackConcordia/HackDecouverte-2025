"use client";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Header");

    // Helper to switch locale
    const switchLocale = (locale: string) => {
        router.push(`/${locale}${pathname}`);
    };

    return (
        <header className="fixed top-0 w-full bg-[#412721] shadow z-50 text-[#F9C22F]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    HackDécouverte
                </Link>

                {/* Nav Links */}
                <div className="space-x-6 hidden md:flex">
                    <Link href="#about-us" className="hover:text-yellow-600">{t("about")}</Link>
                    <Link href="#sponsors" className="hover:text-yellow-600">Sponsors</Link>
                    <Link href="#volunteer" className="hover:text-yellow-600">{t("volunteer")}</Link>
                    <Link href="#faq" className="hover:text-yellow-600">FAQ</Link>
                    {/* Language Switch Buttons */}
                    <button
                        className="px-2 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700"
                        onClick={() => switchLocale("en")}
                    >
                        EN
                    </button>
                    <button
                        className="ml-0.5 px-2 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700"
                        onClick={() => switchLocale("fr")}
                    >
                        FR
                    </button>
                </div>
            </nav>
        </header>
    );
}
