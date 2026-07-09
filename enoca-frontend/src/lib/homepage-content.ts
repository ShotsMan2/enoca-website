export type HomepageCategoryItem = {
  id: number;
  name: string;
  slug: string;
  order: number;
  links: Array<{
    id: number;
    title: string;
    url: string;
  }>;
};

type HomepageCategoryPayload = {
  id?: number;
  name?: string;
  slug?: string;
  order?: number;
  links?: Array<{
    id?: number;
    title?: string;
    url?: string;
  }>;
};

export const fallbackHomepageCategories: HomepageCategoryItem[] = [
  {
    id: 1,
    name: 'Yazılım Çözümleri',
    slug: 'yazilim-cozumleri',
    order: 1,
    links: [
      { id: 11, title: 'SAP CX Mimarlığı', url: '/cozumler/sap-cx' },
      { id: 12, title: 'E-ticaret Platformları', url: '/cozumler/e-ticaret' },
    ],
  },
  {
    id: 2,
    name: 'Ar-Ge ve İnovasyon',
    slug: 'ar-ge-ve-inovasyon',
    order: 2,
    links: [
      { id: 21, title: 'Ürün Tasarımı', url: '/inovasyon/urun-tasarimi' },
      { id: 22, title: 'Akıllı Otomasyon', url: '/inovasyon/otomasyon' },
    ],
  },
  {
    id: 3,
    name: 'Kariyer',
    slug: 'kariyer',
    order: 3,
    links: [
      { id: 31, title: 'Açık Pozisyonlar', url: '/kariyer' },
      { id: 32, title: 'Staj Programı', url: '/kariyer/staj' },
    ],
  },
  {
    id: 4,
    name: 'Sosyal Sorumluluk',
    slug: 'sosyal-sorumluluk',
    order: 4,
    links: [
      { id: 41, title: 'Etki Programları', url: '/sosyal-sorumluluk' },
      { id: 42, title: 'Topluluk Destekleri', url: '/sosyal-sorumluluk/topluluk' },
    ],
  },
];

export function buildHomepageContent(categories: HomepageCategoryItem[]): HomepageCategoryItem[] {
  if (categories.length === 0) {
    return fallbackHomepageCategories;
  }

  return categories.slice(0, 4).map((category) => ({
    ...category,
    links: category.links.slice(0, 2),
  }));
}

function normalizeCategory(category: HomepageCategoryPayload): HomepageCategoryItem {
  return {
    id: category.id ?? 0,
    name: category.name ?? 'Kurumsal Kategori',
    slug: category.slug ?? 'kurumsal-kategori',
    order: category.order ?? 0,
    links: (category.links ?? []).map((link) => ({
      id: link.id ?? 0,
      title: link.title ?? 'Bağlantı',
      url: link.url ?? '#',
    })),
  };
}

export async function getHomepageCategories(): Promise<HomepageCategoryItem[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000/categories';

  try {
    const response = await fetch(backendUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = (await response.json()) as HomepageCategoryPayload[];
    const categories = Array.isArray(payload) ? payload.map(normalizeCategory) : [];

    return buildHomepageContent(categories);
  } catch {
    return fallbackHomepageCategories;
  }
}
