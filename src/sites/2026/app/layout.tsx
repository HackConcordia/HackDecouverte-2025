import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { LANGUAGE_COOKIE, parseLanguage } from "../lib/language";

const TITLE = "HackDécouverte 2026 · HackConcordia";
const DESCRIPTION = "A bilingual, beginner-friendly hackathon for pre-university students across Québec.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hackdecouverte.io"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "HackDécouverte",
    "HackConcordia",
    "ConUHacks",
    "hackathon",
    "Montréal",
    "Québec",
    "University",
    "students",
    "CEGEP",
    "coding event",
    "bilingual hackathon",
  ],
  authors: [{ name: "HackConcordia Team", url: "https://www.instagram.com/hackconcordia" }],
  creator: "HackConcordia",
  publisher: "HackConcordia",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.hackdecouverte.io",
    siteName: "HackDécouverte",
    images: [{ url: "/images/HCD_logo.png", width: 746, height: 746, alt: "HackDécouverte logo" }],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/HCD_logo.png"],
    creator: "@HackConcordia",
  },
  alternates: {
    canonical: "https://www.hackdecouverte.io",
  },
};

const EVENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "HackDécouverte 2026",
  description: DESCRIPTION,
  image: "https://www.hackdecouverte.io/images/HCD_logo.png",
  startDate: "2026-11-14T08:00:00-05:00",
  endDate: "2026-11-14T19:00:00-05:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "John Molson School of Business (MB Building), Concordia University",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1450 Guy St",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "H3H 0A1",
      addressCountry: "CA",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "HackConcordia",
    url: "https://www.hackconcordia.io",
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "CAD",
    availability: "https://schema.org/InStock",
    url: "https://www.hackdecouverte.io",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = parseLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
  return (
    <html lang={language} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_JSON_LD) }}
        />
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MBP0H14WEP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MBP0H14WEP');
          `}
        </Script>
      </body>
    </html>
  );
}
