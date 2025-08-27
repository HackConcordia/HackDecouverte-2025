import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
