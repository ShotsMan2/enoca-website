/* eslint-disable @next/next/no-img-element */
import { readDB } from "@/lib/db";
import { Link } from "@/i18n/routing";
export const dynamic = 'force-dynamic';
import { CalendarDays } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { NewsItem } from "@/lib/admin-api";

export default async function NewsPage() {
  const db = await readDB();
  const news: NewsItem[] = db?.news || [];
  const activeNews = news.filter((n) => n.status === "published");

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white tracking-tight mb-4">
              Haberler
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
              Şirketimizden en son güncellemeler, etkinlikler ve duyurular.
            </p>
          </div>

          {activeNews.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Şu anda yayınlanmış bir haber bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeNews.map((item) => (
                <Link key={item.id} href={`/haberler/${item.id}`} className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                  {/* Görsel */}
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-sm flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      {new Date(item.publishedAt).toLocaleDateString("tr-TR", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  
                  {/* İçerik */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {item.summary}
                    </p>
                    
                    {/* Footer (Read More) */}
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        Haberi Oku 
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
