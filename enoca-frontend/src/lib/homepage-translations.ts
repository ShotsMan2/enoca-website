type Translator = (key: string, values?: Record<string, string | number | Date>) => string;

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
