import Link from 'next/link';
import AnimatedArticle from '@/components/AnimatedArticle';
import type { HomepageCategoryItem } from '@/lib/homepage-content';
import { getTranslations } from 'next-intl/server';

type HomepageCategoryGridProps = {
  categories: HomepageCategoryItem[];
};

export default async function HomepageCategoryGrid({ categories }: HomepageCategoryGridProps) {
  const t = await getTranslations('HomePage');

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-20 lg:px-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">{t('sectionLabel')}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {t('sectionHeading')}
        </h2>
        <p className="text-base text-slate-400 sm:text-lg">
          {t('sectionSubtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => (
          <AnimatedArticle
            key={category.id || category.slug || index}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
                {category.order}
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                {t('linkCount', { count: category.links.length })}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            <div className="mt-5 space-y-3">
              {category.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="flex items-center justify-between rounded-2xl border border-transparent bg-slate-950/50 px-4 py-3 text-sm text-slate-300 transition hover:border-sky-400/40 hover:bg-slate-900"
                >
                  <span>{link.title}</span>
                  <span className="text-sky-400 transition group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </AnimatedArticle>
        ))}
      </div>
    </section>
  );
}
