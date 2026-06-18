import type { Metadata } from 'next';
import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-calistoga', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Enoca | Minimalist Modern Yazılım',
  description: 'Next.js ve NestJS kullanılarak modern bir arayüz ile geliştirildi.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('admin-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}` }} />
      </head>
      <body className={`${inter.variable} ${calistoga.variable} ${jetbrainsMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}