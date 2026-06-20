import type { Metadata } from 'next';
import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import CookieConsent from '@/components/CookieConsent';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-calistoga', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: {
    default: 'Enoca | Modern Dijital Çözümler',
    template: '%s | Enoca'
  },
  description: 'Geleceğin teknolojileriyle işletmenizin dijital dönüşümüne öncülük ediyoruz. SAP CX, E-Ticaret ve özel yazılım çözümleri.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://enoca.com',
    title: 'Enoca | Modern Dijital Çözümler',
    description: 'Geleceğin teknolojileriyle işletmenizin dijital dönüşümüne öncülük ediyoruz.',
    siteName: 'Enoca',
    images: [
      {
        url: '/og-image.jpg', // Public klasörüne eklenebilir
        width: 1200,
        height: 630,
        alt: 'Enoca Kurumsal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enoca | Modern Dijital Çözümler',
    description: 'Geleceğin teknolojileriyle işletmenizin dijital dönüşümüne öncülük ediyoruz.',
    images: ['/og-image.jpg'],
  },
  keywords: ['Yazılım', 'SAP CX', 'E-Ticaret', 'Danışmanlık', 'Dijital Dönüşüm', 'Enoca'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "tr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${calistoga.variable} ${jetbrainsMono.variable} antialiased`}>
        {/* Dark mode init — Script ile inject edilir, React render pipeline'ına girmez */}
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var t = localStorage.getItem('admin-theme');
            if (t === 'dark') document.documentElement.classList.add('dark');
          } catch(e) {}
        `}</Script>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}