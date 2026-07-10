import Link from 'next/link';
import AnimatedCard from '@/components/AnimatedCard';
import HomepageCategoryGrid from '@/components/HomepageCategoryGrid';
import PublicLayout from '@/components/PublicLayout';
import { getHomepageCategories } from '@/lib/homepage-content';
import { buildHomepageCopy, translateCategories } from '@/lib/homepage-translations';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Home() {
  const locale = await getLocale();
  const rawCategories = await getHomepageCategories();
  const t = await getTranslations('HomePage');
  const tCategories = await getTranslations('Categories');

  const copy = buildHomepageCopy((key, values) => t(key, values));
  const categories = translateCategories(rawCategories, (key) => tCategories(key));

  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300">
              {copy.badge}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {copy.titleLine1}<br />
                <span className="text-sky-400">{copy.titleHighlight}</span> {copy.titleLine2}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {copy.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/iletisim`} className="rounded-full bg-sky-500 px-6 py-3 text-center font-medium text-white transition hover:bg-sky-400">
                {copy.ctaContact}
              </Link>
              <Link href={`/${locale}/kariyer`} className="rounded-full border border-white/15 px-6 py-3 text-center font-medium text-slate-200 transition hover:border-sky-400/40 hover:text-white">
                {copy.ctaCareer}
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {copy.featuredHighlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <AnimatedCard className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_35px_120px_rgba(2,132,199,0.2)] backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{copy.summaryTitle}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{copy.summaryHeading}</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                {copy.status}
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {categories.map((category) => (
                <div key={category.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <span className="text-sm text-slate-400">{copy.linkCount(category.links.length)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.links.map((link) => (
                      <span key={link.id} className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm text-sky-300">
                        {link.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      <HomepageCategoryGrid categories={categories} />
    </PublicLayout>
  );
}