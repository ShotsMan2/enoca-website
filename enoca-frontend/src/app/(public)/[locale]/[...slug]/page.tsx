import { Link } from "@/i18n/routing";
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { readDB } from "@/lib/db";
import { ContentPage } from "@/lib/admin-api";
import PublicLayout from "@/components/PublicLayout";
import PageTransition from "@/components/PageTransition";
import BackButton from "@/components/BackButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[], locale: string }> }) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const pageTitle = slugArray.length > 0 
        ? slugArray[slugArray.length - 1].replace(/-/g, ' ').toUpperCase()
        : 'Sayfa';
    
    return {
        title: `${pageTitle} | Enoca`,
        description: `Enoca ${pageTitle} çözümleri ve hizmetleri hakkında detaylı bilgi.`,
    };
}

export default async function CatchAllPage({
    params
}: {
    params: Promise<{ slug: string[], locale: string }>
}) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const locale = resolvedParams.locale || 'tr';
    const t = await getTranslations('Page');

    const translateDB = (text: string) => {
        if (locale !== 'en' || !text) return text;
        const dict: Record<string, string> = {
            "Hybris Danışmanlığı": "Hybris Consulting",
            "SAP Teknik Danışmanlık": "SAP Technical Consulting",
            "SAP Fonksiyonel Danışmanlık": "SAP Functional Consulting",
            "Geliştirme Danışmanlığı": "Development Consulting",
            "Danışmanlık": "Consulting",
            "Kalite Yönetimi": "Quality Management",
            "Dışkaynak Hizmetleri": "Outsourcing",
            "Dış Kaynak Hizmetleri": "Outsourcing",
            "Çözümleri": "Solutions",
            "Çözümler": "Solutions",
            "Projeler": "Projects",
            "Teknoloji": "Technology",
            "Kurumsal": "Corporate",
            "Haberler": "News",
            "Metodoloji": "Methodology",
            "Referanslar": "References",
            "Hakkımızda": "About Us",
            "Kariyer": "Careers",
            "Yasal Bilgiler": "Legal Information",
            "Bilgi Güvenliği Politikası": "Information Security Policy",
            "Kişisel Verilerin Korunması ve İşlenmesi Politikası": "KVKK Policy",
            "KVKK": "KVKK Policy",
            "İletişim": "Contact Us",
            "Mimari": "Architecture",
            "İnovasyon": "Innovation",
            "Araştırma & Geliştirme": "R&D",
            "Araştırma Geliştirme": "R&D",
            "Modülerlik": "Modularity",
            "Tasarım Tabanlı": "Design Based",
            "Modelleme ve Simülasyon": "Modeling and Simulation",
            "SAP Uygulama Yönetimi": "SAP Application Management",
            "SAP Bulut": "SAP Cloud",
            "SAP CX Hybris Mobil E-Ticaret": "SAP CX Hybris Mobile E-Commerce",
            "SAP CX Hybris MDM": "SAP CX Hybris MDM",
            "SAP CX Hybris B2C E-Ticaret": "SAP CX Hybris B2C E-Commerce",
            "SAP CX Hybris B2B E-Ticaret": "SAP CX Hybris B2B E-Commerce",
            "İncele": "View Details",
            "Bu sayfanın içeriğini admin panelinden güncelleyebilirsiniz.": "You can update the content of this page from the admin panel.",
            "Sayfa": "Page",
            
            // Slug & Unaccented Versions
            "arastirma gelistirme": "R&D",
            "bilgi guvenligi politikasi": "Information Security Policy",
            "kisisel verilerin korunmasi ve islenmesi politikasi": "KVKK Policy",
            "iletisim": "Contact Us",
            "mimari": "Architecture",
            "inovasyon": "Innovation",
            "modulerlik": "Modularity",
            "tasarim tabanli": "Design Based",
            "modelleme ve simulasyon": "Modeling and Simulation",
            "hybris danismanligi": "Hybris Consulting",
            "sap teknik danismanlik": "SAP Technical Consulting",
            "sap fonksiyonel danismanlik": "SAP Functional Consulting",
            "gelistirme danismanligi": "Development Consulting",
            "danismanlik": "Consulting",
            "kalite yonetimi": "Quality Management",
            "diskaynak hizmetleri": "Outsourcing",
            "cozumler": "Solutions",
            "projeler": "Projects",
            "teknoloji": "Technology",
            "kurumsal": "Corporate",
            "haberler": "News",
            "metodoloji": "Methodology",
            "referanslar": "References",
            "hakkimizda": "About Us",
            "kariyer": "Careers",
            "yasal bilgiler": "Legal Information",
            "sap uygulama yonetimi": "SAP Application Management",
            "sap bulut": "SAP Cloud",
            "sap cx hybris mobil e ticaret": "SAP CX Hybris Mobile E-Commerce",
            "sap cx hybris b2c e ticaret": "SAP CX Hybris B2C E-Commerce",
            "sap cx hybris b2b e ticaret": "SAP CX Hybris B2B E-Commerce",
            "enoca dan son haberler": "Latest News from Enoca",
            "gizlilik": "Privacy",
            "Gizlilik": "Privacy",
            "Kullanım Koşulları": "Terms of Use",
            "kullanim kosullari": "Terms of Use"
        };
        
        let translated = text;
        const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
        for (const key of keys) {
             translated = translated.replace(new RegExp(key, 'gi'), dict[key]);
        }
        return translated;
    };

    const formatSlugToTitle = (text: string) => {
        if (!text) return text;
        const dict: Record<string, string> = {
            "arastirma gelistirme": "Araştırma & Geliştirme",
            "bilgi guvenligi politikasi": "Bilgi Güvenliği Politikası",
            "kisisel verilerin korunmasi ve islenmesi politikasi": "Kişisel Verilerin Korunması ve İşlenmesi Politikası",
            "iletisim": "İletişim",
            "mimari": "Mimari",
            "inovasyon": "İnovasyon",
            "modulerlik": "Modülerlik",
            "tasarim tabanli": "Tasarım Tabanlı",
            "modelleme ve simulasyon": "Modelleme ve Simülasyon",
            "hybris danismanligi": "Hybris Danışmanlığı",
            "sap teknik danismanlik": "SAP Teknik Danışmanlık",
            "sap fonksiyonel danismanlik": "SAP Fonksiyonel Danışmanlık",
            "gelistirme danismanligi": "Geliştirme Danışmanlığı",
            "danismanlik": "Danışmanlık",
            "kalite yonetimi": "Kalite Yönetimi",
            "diskaynak hizmetleri": "Dış Kaynak Hizmetleri",
            "cozumler": "Çözümler",
            "projeler": "Projeler",
            "teknoloji": "Teknoloji",
            "kurumsal": "Kurumsal",
            "haberler": "Haberler",
            "metodoloji": "Metodoloji",
            "referanslar": "Referanslar",
            "hakkimizda": "Hakkımızda",
            "kariyer": "Kariyer",
            "yasal bilgiler": "Yasal Bilgiler",
            "sap uygulama yonetimi": "SAP Uygulama Yönetimi",
            "sap bulut": "SAP Bulut",
            "sap cx hybris mobil e ticaret": "SAP CX Hybris Mobil E-Ticaret",
            "sap cx hybris b2c e ticaret": "SAP CX Hybris B2C E-Ticaret",
            "sap cx hybris b2b e ticaret": "SAP CX Hybris B2B E-Ticaret",
            "enoca dan son haberler": "Enoca'dan Son Haberler",
            "gizlilik": "Gizlilik",
            "kullanim kosullari": "Kullanım Koşulları",
            "hybris cozumleri": "Hybris Çözümleri",
            "sap cozumleri": "SAP Çözümleri"
        };
        const lower = text.toLowerCase();
        return dict[lower] || text;
    };

    const db = await readDB();
    const currentSlug = "/" + slugArray.join("/");
    const dynamicPage = db?.pages?.find((p: ContentPage) => p.slug === currentSlug && p.status === "published");
    let subPages = db?.pages?.filter((p: ContentPage) => p.slug.startsWith(currentSlug + "/") && p.status === "published") || [];

    if (currentSlug === "/kurumsal") {
        const extraPages = db?.pages?.filter((p: ContentPage) => 
            p.slug === "/bilgi-guvenligi-politikasi" || 
            p.slug === "/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi"
        ) || [];
        
        subPages = [...subPages, ...extraPages];
        
        subPages.push({
            id: 999,
            menuTitle: "Kariyer",
            slug: "/kariyer",
            category: "Kurumsal",
            content: "Enoca ekibine katılmak ve kariyer fırsatlarını incelemek için kariyer sayfamızı ziyaret edin.",
            status: "published"
        } as ContentPage);
    }

    const pageTitleRaw = dynamicPage?.menuTitle || formatSlugToTitle(slugArray.length > 0 ? slugArray[slugArray.length - 1].replace(/-/g, ' ') : 'Sayfa');
    const pageTitle = translateDB(pageTitleRaw);

    const topCategoryRaw = dynamicPage?.category || formatSlugToTitle(slugArray.length > 1 ? slugArray[0].replace(/-/g, ' ') : 'ENOCA™');
    const topCategory = translateDB(topCategoryRaw);

    return (
        <PublicLayout>
        <PageTransition>
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Dekoratif Arka Plan Işıltısı */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-12 md:pb-32">
                
                {/* Geri Dönüş Linki */}
                <div className="mb-2">
                    <BackButton />
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
                                    {index === slugArray.length - 2 ? pageTitle : translateDB(segment.replace(/-/g, ' '))}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Başlık */}
                    <div className="relative mb-12">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-tight bg-gradient-to-r from-[#0055FF] via-[#0077FF] to-[#00AAFF] bg-clip-text text-transparent drop-shadow-sm pb-1 pr-2">
                            {pageTitle}
                        </h1>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-transparent rounded-full mt-4"></div>
                    </div>

                    {/* İçerik Kartı */}
                    <div className="w-full bg-card rounded-2xl shadow-md border border-border p-8 md:p-12 relative overflow-hidden">
                        {/* Subtle inner glow */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-[50px] -z-10" />
                        
                        {dynamicPage ? (
                            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: translateDB(dynamicPage.content) }} />
                        ) : subPages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {subPages.map((sub: ContentPage) => (
                                    <Link key={sub.id} href={sub.slug} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{translateDB(sub.menuTitle)}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{translateDB(sub.content).replace(/<[^>]*>?/gm, '').substring(0, 120)}...</p>
                                        <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                                            {translateDB("İncele")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
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
        </PageTransition>
    </PublicLayout>
    );
}
