import { describe, expect, it } from 'vitest';
import { buildHomepageCopy, slugify, translateCategories } from './homepage-translations';

describe('slugify', () => {
  it('correctly converts Turkish characters and punctuation to a URL-friendly slug', () => {
    expect(slugify('SAP CX Mimarlığı')).toBe('sap-cx-mimarligi');
    expect(slugify('E-ticaret Platformları')).toBe('e-ticaret-platformlari');
    expect(slugify('Ar-Ge ve İnovasyon')).toBe('ar-ge-ve-inovasyon');
    expect(slugify('Ürün Tasarımı')).toBe('urun-tasarimi');
    expect(slugify('Akıllı Otomasyon')).toBe('akilli-otomasyon');
    expect(slugify('  Hello World!  ')).toBe('hello-world');
  });
});

describe('translateCategories', () => {
  it('translates category names and link titles using a dictionary-like translator', () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Yazılım Çözümleri',
        slug: 'yazilim-cozumleri',
        order: 1,
        links: [
          { id: 11, title: 'SAP CX Mimarlığı', url: '/sap-cx' },
          { id: 12, title: 'E-ticaret Platformları', url: '/e-ticaret' },
        ],
      },
    ];

    const mockTranslator = (key: string) => {
      const dict: Record<string, string> = {
        'yazilim-cozumleri': 'Software Solutions',
        'sap-cx-mimarligi': 'SAP CX Architecture',
        'e-ticaret-platformlari': 'E-commerce Platforms',
      };
      return dict[key] ?? key;
    };

    const translated = translateCategories(mockCategories, mockTranslator);

    expect(translated[0].name).toBe('Software Solutions');
    expect(translated[0].links[0].title).toBe('SAP CX Architecture');
    expect(translated[0].links[1].title).toBe('E-commerce Platforms');
  });

  it('falls back to database original values when translation is missing', () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Original Category',
        slug: 'original-category',
        order: 1,
        links: [
          { id: 11, title: 'Original Link', url: '/link' },
        ],
      },
    ];

    const mockTranslator = (key: string) => {
      return `Categories.${key}`;
    };

    const translated = translateCategories(mockCategories, mockTranslator);

    expect(translated[0].name).toBe('Original Category');
    expect(translated[0].links[0].title).toBe('Original Link');
  });
});

describe('buildHomepageCopy', () => {
  it('returns translated strings and link counts for the home page', () => {
    const translator = (key: string, values?: Record<string, string | number | Date>) => {
      const map: Record<string, string> = {
        badge: 'Enoca | Modern digital experience',
        titleLine1: 'Organizing connections,',
        titleHighlight: 'we strengthen your story',
        titleLine2: 'with confidence.',
        subtitle: 'We bring your solutions together in one premium experience.',
        ctaContact: 'Contact us',
        ctaCareer: 'Explore career areas',
        summaryTitle: 'Overview',
        summaryHeading: 'Corporate access center',
        status: 'Active',
        featuredHighlight1: 'Digital experiences that keep corporate vision alive',
        featuredHighlight2: 'Collaborative spaces and accessible resources',
        featuredHighlight3: 'Pre-configured links for quick access',
        sectionLabel: 'Corporate content',
        sectionHeading: 'Areas that shape Enoca\'s vision and services',
        sectionSubtitle: 'Each category presents expertise and resources in one flow.',
        linkCount: values?.count === 1 ? '1 link' : `${values?.count} links`,
      };

      return map[key] ?? key;
    };

    const copy = buildHomepageCopy(translator as typeof translator);

    expect(copy.badge).toBe('Enoca | Modern digital experience');
    expect(copy.titleLine1).toBe('Organizing connections,');
    expect(copy.featuredHighlights).toHaveLength(3);
    expect(copy.linkCount(1)).toBe('1 link');
    expect(copy.linkCount(3)).toBe('3 links');
  });
});
