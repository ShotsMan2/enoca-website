import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import SplashScreen from "@/components/SplashScreen";
import CookieConsent from '@/components/CookieConsent';
import NextTopLoader from 'nextjs-toploader';
import PublicAIAssistant from '@/components/PublicAIAssistant';
import ScrollToTop from '@/components/ScrollToTop';
import CommandPalette from '@/components/CommandPalette';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

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
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SplashScreen />
      <NextTopLoader color="#0055FF" initialPosition={0.08} crawlSpeed={200} height={3} crawl={true} showSpinner={false} easing="ease" speed={200} shadow="0 0 10px #0055FF,0 0 5px #0055FF" />
      {children}
      <CookieConsent />
      <PublicAIAssistant />
      <ScrollToTop />
      <CommandPalette />
      <CustomCursor />
      <ScrollProgress />
    </NextIntlClientProvider>
  );
}