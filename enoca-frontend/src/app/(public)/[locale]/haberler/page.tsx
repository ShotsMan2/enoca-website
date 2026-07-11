/* eslint-disable @next/next/no-img-element */
import { readDB } from "@/lib/db";
import { Link } from "@/i18n/routing";
export const dynamic = 'force-dynamic';
import { CalendarDays } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { NewsItem } from "@/lib/admin-api";
import { getTranslations } from "next-intl/server";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("NewsPage");
  const db = await readDB();
  const news: NewsItem[] = (db?.news || []) as unknown as NewsItem[];
  const activeNews = news.filter((n) => n.status === "published");

  return (
    <PublicLayout>
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {activeNews.length === 0 ? (
            <div className="text-center py-20 bg-slate-950/70 border border-white/10 backdrop-blur rounded-3xl">
              <p className="text-slate-300 text-lg">{t("noNews")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeNews.map((item) => (
                <Link key={item.id} href={`/haberler/${item.id}`} className="group bg-slate-950/70 border border-white/10 hover:border-sky-400/40 backdrop-blur rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(2,132,199,0.1)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                  {/* Görsel */}
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-200 shadow-sm flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-sky-400" />
                      {new Date(item.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "tr-TR", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  
                  {/* İçerik */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
                      {item.summary}
                    </p>
                    
                    {/* Footer (Read More) */}
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <span className="inline-flex items-center text-sm font-bold text-sky-400 group-hover:text-sky-300 transition-colors">
                        {t("readNews")} 
                        <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
}
