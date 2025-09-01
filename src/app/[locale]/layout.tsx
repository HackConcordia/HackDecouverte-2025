
import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/translation/en.json";
import frMessages from "@/translation/fr.json";

const archivoBlack = Archivo_Black({
  weight: "400", // Archivo Black has only one weight
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "HackDécouverte 2025 | HackConcordia",
  description:
    "HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec, hosted by HackConcordia. Join us for workshops, coding, mentorship, and prizes at Concordia University.",
  keywords: [
    "HackDécouverte",
    "HackConcordia",
    "ConUHacks",
    "hackathon",
    "Montreal",
    "Concordia University",
    "Québec",
    "students",
    "coding competition",
    "beginner hackathon",
  ],
  authors: [{ name: "HackConcordia Team" }],
  creator: "HackConcordia",
  publisher: "HackConcordia",
  openGraph: {
    title: "HackDécouverte 2025 | HackConcordia",
    description:
      "A beginner-friendly hackathon for pre-university students across Québec. Hosted by HackConcordia at Concordia University.",
    url: "https://hackconcordia.io/hackdecouverte",
    siteName: "HackDécouverte",
    images: [
      {
        url: "/images/hackdecouverte-banner.png", // replace with your banner/logo
        width: 1200,
        height: 630,
        alt: "HackDécouverte Hackathon",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackDécouverte 2025 | HackConcordia",
    description:
      "HackDécouverte is a beginner-friendly hackathon hosted by HackConcordia for CEGEP students across Québec.",
    images: ["/images/hackdecouverte-banner.png"], // replace with your banner/logo
    creator: "@HackConcordia",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  const { locale } = await params;
  let messages;
  switch (locale) {
    case "fr":
      messages = frMessages;
      break;
    case "en":
    default:
      messages = enMessages;
      break;
  }
  return (
    <html lang={locale}>
      <body className={`${archivoBlack.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
