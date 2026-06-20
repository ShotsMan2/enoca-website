/* eslint-disable @next/next/no-img-element */
import { readDB } from "@/lib/db";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { NewsItem } from "@/lib/admin-api";
import { Link } from "@/i18n/routing";
import NewsClientFeatures from "@/components/NewsClientFeatures";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id } = await params;
  const db = await readDB();
  const newsItem = db?.news?.find((n: NewsItem) => n.id === parseInt(id, 10) && n.status === "published");
  
  if (!newsItem) return { title: 'Haber Bulunamadı | Enoca' };
  
  return {
    title: `${newsItem.title} | Enoca Haberler`,
    description: newsItem.summary || `${newsItem.title} hakkında detaylar.`,
  };
}

export default async function HaberDetayPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id } = await params;
  
  const db = await readDB();
  const allNews = db?.news || [];
  const publishedNews = allNews.filter((n: NewsItem) => n.status === "published");
  
  const newsItem = publishedNews.find((n: NewsItem) => n.id === Number(id));

  if (!newsItem) {
    notFound();
  }

  // Find next news item
  const currentIndex = publishedNews.findIndex((n: NewsItem) => n.id === Number(id));
  const nextNews = currentIndex < publishedNews.length - 1 ? publishedNews[currentIndex + 1] : null;

  return (
    <PublicLayout>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/haberler" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Haberlere Dön
          </Link>

          <article className="bg-white dark:bg-gray-900 rounded-3xl p-6 lg:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
            {newsItem.imageUrl && (
              <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 relative">
                <img 
                  src={newsItem.imageUrl} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {new Date(newsItem.publishedAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
              <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
              <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Kurumsal Haber
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-gray-900 dark:text-white mb-8 leading-tight">
              {newsItem.title}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-blue">
              {/* Not: NewsItem modelinde detaylı HTML 'content' alanı olmadığı için şimdilik 'summary' kullanılıyor. 
                  Tam entegrasyonda 'content' alanı kullanılmalıdır. */}
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {newsItem.summary}
              </p>
              
              {/* Okunabilirliği artıran temsili makale gövdesi uzatması (gerçek veride content alanından gelmeli) */}
              <div className="mt-8 text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
                <p>Enoca™ olarak sektördeki yenilikçi adımlarımızı sürdürmeye devam ediyoruz. Gelişen teknoloji trendlerini yakından takip ederek, iş ortaklarımıza ve müşterilerimize sunduğumuz çözümlerin kalitesini her geçen gün artırmak temel önceliğimizdir.</p>
                <p>Mevcut başarılarımızın üzerine koyarak ilerlediğimiz bu yolda, dijital dönüşüm süreçlerine öncülük eden projelerimizle sektördeki konumumuzu güçlendiriyoruz. Bu vizyon doğrultusunda hayata geçirdiğimiz uygulamalar ve vizyoner yaklaşımlarımız, global arenadaki rekabet gücümüzü artırıyor.</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Bu haberi paylaş:</span>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Share & Scroll Features */}
            <NewsClientFeatures title={newsItem.title} />

          </article>

          {/* Sırada Okunacaklar Modülü */}
          {nextNews && (
            <div className="mt-24 pt-12 border-t border-border/50 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <p className="text-sm font-bold text-accent tracking-widest uppercase mb-4">Sıradaki Haber</p>
              <Link 
                href={`/haberler/${nextNews.id}`}
                className="group block p-8 sm:p-10 rounded-3xl bg-card border border-border hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors font-display leading-tight">
                      {nextNews.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{nextNews.summary}</p>
                  </div>
                  <div className="shrink-0 w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300 shadow-lg shadow-accent/20">
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
