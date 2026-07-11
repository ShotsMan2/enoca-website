/* eslint-disable @next/next/no-img-element */
import { readDB } from "@/lib/db";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "@/i18n/routing";
import NewsClientFeatures from "@/components/NewsClientFeatures";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const db = await readDB();
  const newsItem = db?.news?.find((n: any) => n.id === parseInt(id, 10) && n.status === "published");
  const t = await getTranslations("NewsPage");
  
  if (!newsItem) return { title: t('notFoundTitle') };
  
  const title = locale === "en" && newsItem.titleEn ? newsItem.titleEn : newsItem.title;
  const summary = locale === "en" && newsItem.summaryEn ? newsItem.summaryEn : newsItem.summary;
  
  return {
    title: `${title} | Enoca ${t('title')}`,
    description: summary || t('metaDesc', { title: title }),
  };
}

export default async function HaberDetayPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const t = await getTranslations("NewsPage");
  
  const db = await readDB();
  const allNews = db?.news || [];
  const publishedNews = allNews.filter((n: any) => n.status === "published");
  
  const newsItem = publishedNews.find((n: any) => n.id === Number(id));

  if (!newsItem) {
    notFound();
  }

  // Find next news item
  const currentIndex = publishedNews.findIndex((n: any) => n.id === Number(id));
  const nextNews = currentIndex < publishedNews.length - 1 ? publishedNews[currentIndex + 1] : null;

  return (
    <PublicLayout>
      <div className="min-h-screen pt-32 pb-12 lg:pt-40 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/haberler" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-sky-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> {t("backToNews")}
          </Link>

          <article className="bg-slate-950/70 border border-white/10 backdrop-blur rounded-[2rem] p-6 lg:p-12 shadow-2xl">
            {newsItem.imageUrl && (
              <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 relative">
                <img 
                  src={newsItem.imageUrl} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 font-medium">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-sky-400" />
                {new Date(newsItem.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
              <span className="bg-white/5 border border-white/10 text-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {t("corporateNews")}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white mb-8 leading-tight">
              {locale === "en" && newsItem.titleEn ? newsItem.titleEn : newsItem.title}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-blue">
              <p className="text-xl text-slate-200 leading-relaxed font-medium">
                {locale === "en" && newsItem.summaryEn ? newsItem.summaryEn : newsItem.summary}
              </p>
              
              <div className="mt-8 text-slate-300 leading-relaxed space-y-6">
                <p>{t("dummyParagraph1")}</p>
                <p>{t("dummyParagraph2")}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">{t("shareThisNews")}</span>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Share & Scroll Features */}
            <NewsClientFeatures title={locale === "en" && newsItem.titleEn ? newsItem.titleEn : newsItem.title} />

          </article>

          {/* Sırada Okunacaklar Modülü */}
          {nextNews && (
            <div className="mt-24 pt-12 border-t border-white/10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <p className="text-sm font-bold text-sky-400 tracking-widest uppercase mb-4">{t("nextNews")}</p>
              <Link 
                href={`/haberler/${nextNews.id}`}
                className="group block p-8 sm:p-10 rounded-3xl bg-slate-950/70 border border-white/10 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-sky-400 transition-colors font-display leading-tight">
                      {locale === "en" && nextNews.titleEn ? nextNews.titleEn : nextNews.title}
                    </h3>
                    <p className="text-slate-300 line-clamp-2">{locale === "en" && nextNews.summaryEn ? nextNews.summaryEn : nextNews.summary}</p>
                  </div>
                  <div className="shrink-0 w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300 shadow-lg shadow-sky-500/20">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
