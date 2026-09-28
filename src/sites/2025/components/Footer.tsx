"use client"

import { useTranslation } from "@/i18n/TranslationContext";
import { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

type SocialLink = {
    href: string;
    icon: IconType;
};

const socialLinks: SocialLink[] = [
    // { href: 'https://www.facebook.com/HackConcordia/', icon: FaFacebookF },
    { href: 'https://www.instagram.com/p/DOEzF9QkZgT/', icon: FaInstagram },
    // { href: 'https://www.linkedin.com/company/hackconcordia', icon: FaLinkedinIn },
    // { href: 'https://x.com/HackConcordia', icon: FaX },
    { href: 'mailto:team.hackconcordia@ecaconcordia.ca', icon: FaRegEnvelope },
];

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-[#412721] text-white">
            <div className="max-w-7xl mx-auto py-6 flex justify-between items-center text-xs lg:text-base px-4">
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
            {/* Social Icons */}
            <div className="flex space-x-2 md:space-x-4 items-center">
                    {socialLinks.map(({ href, icon: Icon }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-400"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
