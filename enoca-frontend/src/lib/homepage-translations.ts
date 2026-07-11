import type { HomepageCategoryItem } from './homepage-content';

type Translator = (key: string, values?: Record<string, string | number | Date>) => string;

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function translateCategories(
  categories: HomepageCategoryItem[],
  tCategories: (key: string) => string
): HomepageCategoryItem[] {
  return categories.map((category) => {
    const categoryKey = category.slug;
    const translatedName = tCategories(categoryKey);
    const name = (translatedName && translatedName !== categoryKey && !translatedName.endsWith(categoryKey))
      ? translatedName
      : category.name;

    const links = category.links.map((link) => {
      const linkKey = slugify(link.title);
      const translatedTitle = tCategories(linkKey);
      const title = (translatedTitle && translatedTitle !== linkKey && !translatedTitle.endsWith(linkKey))
        ? translatedTitle
        : link.title;
      return { ...link, title };
    });

    return {
      ...category,
      name,
      links,
    };
  });
}

export function buildHomepageCopy(t: Translator) {
  return {
    badge: t('badge'),
    titleLine1: t('titleLine1'),
    titleHighlight: t('titleHighlight'),
    titleLine2: t('titleLine2'),
    subtitle: t('subtitle'),
    ctaContact: t('ctaContact'),
    ctaCareer: t('ctaCareer'),
    featuredHighlights: [
      t('featuredHighlight1'),
      t('featuredHighlight2'),
      t('featuredHighlight3'),
    ],
    summaryTitle: t('summaryTitle'),
    summaryHeading: t('summaryHeading'),
    status: t('status'),
    sectionLabel: t('sectionLabel'),
    sectionHeading: t('sectionHeading'),
    sectionSubtitle: t('sectionSubtitle'),
    linkCount: (count: number) => t('linkCount', { count }),
  };
}
