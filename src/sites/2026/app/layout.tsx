import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, parseLanguage } from "../lib/language";

export const metadata: Metadata = {
  title: "HackDécouverte 2026 · HackConcordia",
  description: "A bilingual, beginner-friendly hackathon for pre-university students across Québec.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = parseLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
  return (
    <html lang={language}>
      <body>{children}</body>
    </html>
  );
}