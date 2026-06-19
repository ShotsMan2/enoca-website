import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { getTranslations } from "next-intl/server";
import { readDB } from "@/lib/db";

export default async function CatchAllPage({
    params
}: {
    params: Promise<{ slug: string[], locale: string }>
}) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const t = await getTranslations('Page');

    // Son kırılımı sayfa başlığı yapıyoruz
    const pageTitle = slugArray.length > 0 
        ? slugArray[slugArray.length - 1].replace(/-/g, ' ') 
        : 'Sayfa';

    // Üst kategoriyi belirliyoruz (varsa)
    const topCategory = slugArray.length > 1 
        ? slugArray[0].replace(/-/g, ' ') 
        : 'ENOCA™';

    const db = await readDB();
    const currentSlug = "/" + slugArray.join("/");
    const dynamicPage = db?.pages?.find((p: any) => p.slug === currentSlug && p.status === "published");

    return (
        <PublicLayout>
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Dekoratif Arka Plan Işıltısı */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-12 md:pb-32">
                
                {/* Geri Dönüş Linki */}
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="pl-2 group">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            {t('backToHome')}
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col items-start">
                    
                    {/* Modern Breadcrumb (Sayfa Hiyerarşisi) */}
                    <div className="flex items-center flex-wrap gap-2 mb-8">
                         <div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
                                {topCategory}
                            </span>
                        </div>
                        
                        {slugArray.slice(1).map((segment, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {segment.replace(/-/g, ' ')}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Başlık */}
                    <div className="relative mb-12">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-tight bg-gradient-to-r from-[#0055FF] via-[#0077FF] to-[#00AAFF] bg-clip-text text-transparent drop-shadow-sm pb-1">
                            {pageTitle}
                        </h1>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-transparent rounded-full mt-4"></div>
                    </div>

                    {/* İçerik Kartı */}
                    <div className="w-full bg-card rounded-2xl shadow-md border border-border p-8 md:p-12 relative overflow-hidden">
                        {/* Subtle inner glow */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-[50px] -z-10" />
                        
                        {dynamicPage ? (
                            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: dynamicPage.content }} />
                        ) : (
                            <>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    {t('catchAllDesc', { pageTitle })}
                                </p>
                                
                                <div className="mt-10 pt-8 border-t border-border/50">
                                    <h3 className="text-xl font-bold text-foreground mb-6">{t('techTitle')}</h3>
                                    <ul className="space-y-4 text-muted-foreground">
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                                            <p>{t('techPoint1')}</p>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                                            <p>{t('techPoint2')}</p>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                                            <p>{t('techPoint3')}</p>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
    );
}
