import './globals.css';
import { TranslationProvider } from '../i18n/TranslationContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Example i18n',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
