"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { adminApi, SiteSettings, ContentPage } from '@/lib/admin-api';

export default function Footer({ settings, pages = [] }: { settings?: SiteSettings, pages?: ContentPage[] }) {
    const t = useTranslations('Footer');
    const locale = useLocale();
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            await adminApi.subscribeNewsletter(email);
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 5000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    type MenuItem = {
        title: string;
        url: string;
        children?: MenuItem[];
        subChildren?: { title: string; url: string }[];
    };
    const menuItems: MenuItem[] = [
        {
            title: t('solutions'),
            url: "/cozumler",
            children: [
                { 
                    title: t('hybrisSolutions'), 
                    url: "/cozumler/hybris-cozumleri",
                    subChildren: [
                        { title: t('b2cEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret" },
                        { title: t('b2bEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret" },
                        { title: t('mobileEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-mobil-ticaret" },
                        { title: t('mdm'), url: "/cozumler/hybris-cozumleri/hybris-mdm" },
                    ]
                },
                { 
                    title: t('sapSolutions'), 
                    url: "/cozumler/sap-cozumleri",
                    subChildren: [
                        { title: t('sapMobility'), url: "/cozumler/sap-cozumleri/sap-mobility" },
                        { title: t('sapHana'), url: "/cozumler/sap-cozumleri/sap-hana" },
                        { title: t('sapAppManagement'), url: "/cozumler/sap-cozumleri/sap-uygulama-yonetimi" },
                        { title: t('sapCloud'), url: "/cozumler/sap-cozumleri/sap-bulut" },
                    ]
                },
                { 
                    title: t('monitoringSolutions'), 
                    url: "/cozumler/sistem-izleme-cozumleri",
                    subChildren: [
                        { title: t('vfabric'), url: "/cozumler/sistem-izleme-cozumleri/vfabric-hyperic" },
                        { title: t('nagios'), url: "/cozumler/sistem-izleme-cozumleri/nagios" },
                    ]
                },
            ]
        },
        {
            title: t('consulting'),
            url: "/danismanlik",
            children: [
                { title: t('hybrisConsulting'), url: "/danismanlik/hybris-danismanligi" },
                { title: t('sapTechnical'), url: "/danismanlik/sap-teknik-danismanlik" },
                { title: t('sapFunctional'), url: "/danismanlik/sap-fonksiyonel-danismanlik" },
                { title: t('developmentConsulting'), url: "/danismanlik/gelistirme-danismanligi" },
                { title: t('qualityManagement'), url: "/danismanlik/kalite-yonetimi" },
                { title: t('outsourcing'), url: "/danismanlik/diskaynak-hizmetleri" },
            ]
        },
        {
            title: t('projects'),
            url: "/projeler",
            children: [
                { title: t('methodology'), url: "/projeler/metodoloji" },
                { title: t('references'), url: "/projeler/referanslar" },
            ]
        },
        {
            title: t('technology'),
            url: "/teknoloji",
            children: [
                { 
                    title: t('architecture'), 
                    url: "/teknoloji/mimari",
                    subChildren: [
                        { title: t('modularity'), url: "/teknoloji/mimari/modulerlik" },
                        { title: t('designBased'), url: "/teknoloji/mimari/tasarim-tabanli" },
                    ]
                },
                { title: t('innovation'), url: "/teknoloji/inovasyon" },
                { 
                    title: t('rd'), 
                    url: "/teknoloji/arastirma-gelistirme",
                    subChildren: [
                        { title: t('modelingSimulation'), url: "/teknoloji/arastirma-gelistirme/modelleme-ve-simulasyon" },
                    ]
                },
            ]
        },
        { 
            title: t('news'), 
            url: "/haberler",
            children: [
                { title: t('latestNews'), url: "/haberler/enocadan-son-haberler" }
            ]
        },
        {
            title: t('corporate'),
            url: "/kurumsal",
            children: [
                { title: t('aboutUs'), url: "/kurumsal/hakkimizda" },
                { title: t('career'), url: "/kariyer" },
                { title: t('legalInfo'), url: "/kurumsal/yasal-bilgiler" },
                { title: t('infosecPolicy'), url: "/bilgi-guvenligi-politikasi" },
                { title: t('kvkk'), url: "/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi" },
                { title: t('contactUs'), url: "/iletisim" },
            ]
        }
    ];

    const activePages = pages.filter(p => p.status === "published");
    activePages.forEach(page => {
        let exists = false;
        for (const item of menuItems) {
            if (item.url === page.slug) exists = true;
            if (item.children) {
                for (const child of item.children) {
                    if (child.url === page.slug) exists = true;
                    if (child.subChildren) {
                        for (const sub of child.subChildren) {
                            if (sub.url === page.slug) exists = true;
                        }
                    }
                }
            }
        }
        
        if (!exists) {
            const categoryUrlMap: Record<string, string> = {
                "Çözümler": "/cozumler",
                "Danışmanlık": "/danismanlik",
                "Projeler": "/projeler",
                "Teknoloji": "/teknoloji",
                "Kurumsal": "/kurumsal",
                "Haberler": "/haberler"
            };
            const mappedUrl = categoryUrlMap[page.category];
            const categoryItem = menuItems.find(item => 
                (mappedUrl && item.url === mappedUrl) || 
                item.title.toUpperCase() === page.category.toUpperCase()
            );

            if (categoryItem) {
                if (!categoryItem.children) categoryItem.children = [];
                categoryItem.children.push({ title: locale === 'en' && page.menuTitleEn ? page.menuTitleEn : page.menuTitle, url: page.slug });
            }
        }
    });

    return (
        <footer className="bg-[#050505] border-t border-[var(--border)] pt-20 pb-10 relative overflow-hidden font-[var(--font-sans)] text-white">
            <div className="bg-grid absolute inset-0 opacity-[0.2] pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                
                {/* Footer Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                    {menuItems.map((col, idx) => (
                        <div key={idx} className="space-y-4">
                            <h4 className="text-white font-[var(--font-mono)] text-[11px] uppercase tracking-widest mb-6">
                                <Link href={col.url} className="hover:text-[var(--accent)] transition-colors">{col.title}</Link>
                            </h4>
                            <div className="space-y-3">
                                {col.children?.map((child, cIdx) => (
                                    <div key={cIdx} className={cIdx > 0 && child.subChildren ? "pt-2 space-y-2" : "space-y-2"}>
                                        <Link href={child.url} className={`block text-[13px] text-[var(--muted)] hover:text-white transition-colors ${!child.subChildren && "leading-relaxed"}`}>
                                            {child.title}
                                        </Link>
                                        {child.subChildren && child.subChildren.length > 0 && (
                                            <div className="space-y-1.5 pl-3 border-l border-[var(--border)] mt-1">
                                                {child.subChildren.map((sub, sIdx) => (
                                                    <Link key={sIdx} href={sub.url} className="block text-xs text-[var(--meta)] hover:text-[var(--accent)] transition-colors">
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Alt Telif ve Kısayollar */}
                <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    <div className="flex items-center gap-6 text-[10px] md:text-xs font-[var(--font-mono)] uppercase tracking-wider text-[var(--muted)]">
                        {/* Sosyal İkonlar */}
                        {settings?.linkedinUrl && (
                            <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-all" aria-label="LinkedIn">
                                LINKEDIN
                            </a>
                        )}
                        {settings?.twitterUrl && (
                            <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-all" aria-label="X (Twitter)">
                                TWITTER
                            </a>
                        )}
                        <Link href={settings?.privacyUrl || "/gizlilik"} className="hover:text-white transition-colors">{t('privacy')}</Link>
                        <Link href={settings?.termsUrl || "/kullanim-kosullari"} className="hover:text-white transition-colors">{t('terms')}</Link>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 w-full lg:w-auto">
                        <div className="flex flex-col w-full max-w-sm gap-2 bg-[#0a0a0c] p-6 border border-[var(--border)] relative overflow-hidden group">
                            <h4 className="text-[var(--accent)] font-[var(--font-mono)] text-[10px] uppercase tracking-widest mb-1">{t('newsletterTitle')}</h4>
                            <p className="text-[13px] text-[var(--muted)] font-light">{t('newsletterDesc')}</p>
                            {subscribed ? (
                                <div className="mt-2 h-10 px-3 flex items-center bg-[rgba(28,105,212,0.1)] border border-[var(--accent)] text-[var(--success)] text-xs font-[var(--font-mono)]">
                                    [OK] {t('newsletterSuccess')}
                                </div>
                            ) : (
                                <form className="flex mt-2 relative z-10" onSubmit={handleSubscribe}>
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('newsletterEmail')} className="flex-1 h-10 px-4 text-[13px] bg-black border border-[var(--border)] outline-none focus:border-[var(--accent)] text-white placeholder-[var(--meta)] transition-all" disabled={loading} />
                                    <button type="submit" disabled={loading} className="h-10 px-5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] border border-[var(--accent)] text-white font-[var(--font-mono)] text-[10px] uppercase tracking-widest transition-colors ml-2 disabled:opacity-70">{loading ? "..." : t('newsletterSubmit')}</button>
                                </form>
                            )}
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-1 mt-6 lg:mt-0">
                            <div className="text-xl font-[var(--font-display)] font-black tracking-[0.15em] text-white flex items-center gap-2">
                                <div className="w-3 h-3 border border-[var(--accent)] relative">
                                    <div className="absolute top-[1px] left-[1px] w-[3px] h-[3px] bg-[var(--accent)]"></div>
                                </div>
                                ENOCA
                            </div>
                            <div className="text-[10px] font-[var(--font-mono)] tracking-wider text-[var(--meta)] uppercase mt-2">
                                {t('copyright')}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
