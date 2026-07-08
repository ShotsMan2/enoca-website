import { Outfit, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { getLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import '../globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-ibm-plex-mono', display: 'swap' });

export default async function PublicRootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className="dark overflow-x-clip">
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning className={`${outfit.variable} ${ibmPlexMono.variable} antialiased overflow-x-clip bg-[var(--bg)] text-[var(--fg)]`}>
        {/* Background Layers */}
        <div className="bg-grid"></div>
        <div className="bg-radial-gradient"></div>
        <div className="custom-noise"></div>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
