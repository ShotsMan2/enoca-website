import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { getLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-calistoga', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

export default async function PublicRootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className="overflow-x-clip">
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${calistoga.variable} ${jetbrainsMono.variable} antialiased overflow-x-clip`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
