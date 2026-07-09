import { describe, expect, it } from 'vitest';
import { buildHomepageContent, fallbackHomepageCategories } from './homepage-content';

describe('buildHomepageContent', () => {
  it('returns fallback content when no categories are provided', () => {
    const result = buildHomepageContent([]);

    expect(result).toHaveLength(fallbackHomepageCategories.length);
    expect(result[0]?.name).toBe('Yazılım Çözümleri');
  });

  it('keeps the first four categories as featured content', () => {
    const result = buildHomepageContent([
      { id: 1, name: 'A', slug: 'a', order: 1, links: [] },
      { id: 2, name: 'B', slug: 'b', order: 2, links: [] },
      { id: 3, name: 'C', slug: 'c', order: 3, links: [] },
      { id: 4, name: 'D', slug: 'd', order: 4, links: [] },
      { id: 5, name: 'E', slug: 'e', order: 5, links: [] },
    ]);

    expect(result).toHaveLength(4);
    expect(result.map((item) => item.name)).toEqual(['A', 'B', 'C', 'D']);
  });
});
