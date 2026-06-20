import { MetadataRoute } from 'next';
import { readDB } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3001'; // Canlıda process.env.NEXT_PUBLIC_BASE_URL olacak
  const db = await readDB();

  const locales = ['tr', 'en'];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Sabit Sayfalar
  const staticPages = ['', '/iletisim', '/haberler', '/kariyer'];

  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }

    // Dinamik DB Sayfaları
    if (db && db.pages) {
      for (const dbPage of db.pages) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/${dbPage.slug}`,
          lastModified: new Date(dbPage.updatedAt || new Date()),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  return sitemapEntries;
}
