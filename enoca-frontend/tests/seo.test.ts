import { describe, it, expect } from 'vitest';
import { generateMetadata } from '../src/app/(public)/[locale]/[...slug]/page';

describe('SEO Metadata Generation', () => {
  it('should generate correct metadata for a given slug', async () => {
    const params = Promise.resolve({ slug: ['yazilim-gelistirme'], locale: 'tr' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('YAZILIM GELISTIRME Linkleri - Enoca Kategori Yönetimi');
    expect(metadata.description).toContain('YAZILIM GELISTIRME kategorisine ait');
    expect(metadata.openGraph?.title).toBe('YAZILIM GELISTIRME Linkleri - Enoca Kategori Yönetimi');
  });

  it('should generate default metadata when no slug is provided', async () => {
    const params = Promise.resolve({ slug: [], locale: 'tr' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe('Sayfa Linkleri - Enoca Kategori Yönetimi');
  });
});
