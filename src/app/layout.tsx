import './globals.css';
import { TranslationProvider } from '../i18n/TranslationContext';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'HackDécouverte 2025 | HackConcordia',
  description:
    'HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec, presented by HackConcordia at Concordia University, Montréal.',
  keywords: [
    'HackDécouverte',
    'HackConcordia',
    'ConUHacks',
    'hackathon',
    'Montréal',
    'Québec',
    'University',
    'students',
    'CEGEP',
    'coding event',
    'bilingual hackathon',
  ],
  authors: [{ name: 'HackConcordia Team', url: 'https://www.instagram.com/hackconcordia' }],
  creator: 'HackConcordia',
  publisher: 'HackConcordia',
  openGraph: {
    title: 'HackDécouverte 2025 | HackConcordia',
    description:
      'HackDécouverte is a bilingual, beginner-friendly hackathon for pre-university students across Québec. Hosted by HackConcordia at Concordia University.',
    url: 'https://www.hackdecouverte.io',
    siteName: 'HackDécouverte',
    images: [
      {
        url: '/images/HCD_logo.png',
        width: 1200,
        height: 630,
        alt: 'HackDécouverte Hackathon Banner',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackDécouverte 2025 | HackConcordia',
    description:
      'A beginner-friendly, bilingual hackathon for Québec pre-university students, presented by HackConcordia.',
    images: ['/images/HCD_logo.png'],
    creator: '@HackConcordia',
  },
  other: {
    instagram: 'https://www.instagram.com/hackconcordia',
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "HackDécouverte 2025",
      startDate: "2025-07-12T09:00:00-04:00",
      endDate: "2025-07-13T21:00:00-04:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Concordia University",
        address: "Montréal, QC, Canada"
      },
      organizer: {
        "@type": "Organization",
        name: "HackConcordia",
        url: "https://www.hackconcordia.io"
      }
    }),
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://www.hackdecouverte.io',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = "fr"; // default is French

  return (
    <html lang={lang}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MBP0H14WEP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MBP0H14WEP');
          `}
        </Script>
      </head>
      <body>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
