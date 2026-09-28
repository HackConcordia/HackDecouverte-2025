import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "HackDécouverte 2026 · HackConcordia",
  description: "A bilingual, beginner-friendly hackathon for pre-university students across Québec.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}