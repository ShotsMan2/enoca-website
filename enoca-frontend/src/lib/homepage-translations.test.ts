import { describe, expect, it } from 'vitest';
import { buildHomepageCopy } from './homepage-translations';

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
