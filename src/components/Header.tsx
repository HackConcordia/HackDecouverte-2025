"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-[#412721] shadow z-50 text-[#F9C22F]">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    HackDécouverte
                </Link>

                {/* Nav Links */}
                <div className="space-x-6 hidden md:flex">
                    <Link href="#about-us" className="hover:text-yellow-600">About Us</Link>
                    <Link href="#sponsors" className="hover:text-yellow-600">Sponsors</Link>
                    <Link href="#volunteer" className="hover:text-yellow-600">Volunteer</Link>
                    <Link href="#faq" className="hover:text-yellow-600">FAQ</Link>
                </div>
            </nav>
        </header>
    );
}
