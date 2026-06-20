import { Link } from "@/i18n/routing";
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, FileText, Newspaper, Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { readDB } from "@/lib/db";
import PublicLayout from "@/components/PublicLayout";
import { ContentPage, NewsItem, JobPosting } from "@/lib/admin-api";

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || "";
    const lowerQuery = query.toLowerCase();
    
    // We don't have next-intl translations for SearchPage yet, so we use generic ones or fallback to Turkish
    const t = await getTranslations('Page').catch(() => null);

    const db = await readDB();
    
    // Search in Pages
    const pages: ContentPage[] = db?.pages?.filter((p: ContentPage) => 
        p.status === "published" && 
        (p.menuTitle.toLowerCase().includes(lowerQuery) || p.content.toLowerCase().includes(lowerQuery))
    ) || [];

    // Search in News
    const news: NewsItem[] = db?.news?.filter((n: NewsItem) => 
        n.status === "published" && 
        (n.title.toLowerCase().includes(lowerQuery) || n.summary.toLowerCase().includes(lowerQuery))
    ) || [];

    // Search in Jobs
    const jobs: JobPosting[] = db?.jobs?.filter((j: JobPosting) => 
        j.status === "active" && 
        (j.title.toLowerCase().includes(lowerQuery) || j.description.toLowerCase().includes(lowerQuery))
    ) || [];

    const totalResults = pages.length + news.length + jobs.length;

    return (
        <PublicLayout>
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-12 md:pb-32">
                
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="pl-2 group">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            {t?.('backToHome') || 'Anasayfaya Dön'}
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col items-start">
                    
                    <div className="relative mb-8">
                        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight text-foreground">
                            Arama Sonuçları
                        </h1>
                        <p className="text-muted-foreground mt-3 text-lg">
                            <span className="font-bold text-accent">&quot;{query}&quot;</span> için {totalResults} sonuç bulundu.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-transparent rounded-full mt-4"></div>
                    </div>

                    <div className="w-full flex flex-col gap-6">
                        
                        {/* Sayfalar */}
                        {pages.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                    Sayfalar ({pages.length})
                                </h2>
                                <div className="grid gap-4">
                                    {pages.map(p => (
                                        <Link key={p.id} href={p.slug} className="block group">
                                            <div className="bg-card hover:bg-accent/5 border border-border rounded-xl p-5 transition-all duration-300">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">{p.menuTitle}</h3>
                                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                            {p.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Haberler */}
                        {news.length > 0 && (
                            <div className="space-y-4 mt-4">
                                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2">
                                    <Newspaper className="w-5 h-5 text-green-500" />
                                    Haberler ({news.length})
                                </h2>
                                <div className="grid gap-4">
                                    {news.map(n => (
                                        <Link key={n.id} href="/haberler" className="block group">
                                            <div className="bg-card hover:bg-accent/5 border border-border rounded-xl p-5 transition-all duration-300">
                                                <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">{n.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{n.summary}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Kariyer */}
                        {jobs.length > 0 && (
                            <div className="space-y-4 mt-4">
                                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2">
                                    <Briefcase className="w-5 h-5 text-purple-500" />
                                    Kariyer İlanları ({jobs.length})
                                </h2>
                                <div className="grid gap-4">
                                    {jobs.map(j => (
                                        <Link key={j.id} href="/kariyer" className="block group">
                                            <div className="bg-card hover:bg-accent/5 border border-border rounded-xl p-5 transition-all duration-300">
                                                <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">{j.title}</h3>
                                                <div className="flex gap-3 mt-2 text-xs font-semibold text-muted-foreground">
                                                    <span className="bg-muted px-2 py-1 rounded">{j.department}</span>
                                                    <span className="bg-muted px-2 py-1 rounded">{j.location}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {totalResults === 0 && query !== "" && (
                            <div className="w-full bg-card rounded-2xl shadow-sm border border-border p-12 text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sonuç Bulunamadı</h3>
                                <p className="text-muted-foreground">Aradığınız kelimeye uygun içerik bulunamadı. Lütfen başka bir kelime ile tekrar deneyin.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
        </PublicLayout>
    );
}
