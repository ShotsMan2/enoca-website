"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { SiteSettings, ContentPage } from '@/lib/admin-api';

export default function Navbar({ settings, pages = [] }: { settings?: SiteSettings, pages?: ContentPage[] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const tNav = useTranslations('Navbar');
    const tFooter = useTranslations('Footer');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    type MenuItem = {
        title: string;
        url: string;
        children?: MenuItem[];
        subChildren?: { title: string; url: string }[];
    };

    const menuItems: MenuItem[] = [
        {
            title: tFooter('solutions'),
            url: "/cozumler",
            children: [
                { 
                    title: tFooter('hybrisSolutions'), 
                    url: "/cozumler/hybris-cozumleri",
                    subChildren: [
                        { title: tFooter('b2cEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret" },
                        { title: tFooter('b2bEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret" },
                        { title: tFooter('mobileEcommerce'), url: "/cozumler/hybris-cozumleri/hybris-mobil-ticaret" },
                        { title: tFooter('mdm'), url: "/cozumler/hybris-cozumleri/hybris-mdm" },
                    ]
                },
                { 
                    title: tFooter('sapSolutions'), 
                    url: "/cozumler/sap-cozumleri",
                    subChildren: [
                        { title: tFooter('sapMobility'), url: "/cozumler/sap-cozumleri/sap-mobility" },
                        { title: tFooter('sapHana'), url: "/cozumler/sap-cozumleri/sap-hana" },
                        { title: tFooter('sapAppManagement'), url: "/cozumler/sap-cozumleri/sap-uygulama-yonetimi" },
                        { title: tFooter('sapCloud'), url: "/cozumler/sap-cozumleri/sap-bulut" },
                    ]
                },
                { 
                    title: tFooter('monitoringSolutions'), 
                    url: "/cozumler/sistem-izleme-cozumleri",
                    subChildren: [
                        { title: tFooter('vfabric'), url: "/cozumler/sistem-izleme-cozumleri/vfabric-hyperic" },
                        { title: tFooter('nagios'), url: "/cozumler/sistem-izleme-cozumleri/nagios" },
                    ]
                },
            ]
        },
        {
            title: tFooter('consulting'),
            url: "/danismanlik",
            children: [
                { title: tFooter('hybrisConsulting'), url: "/danismanlik/hybris-danismanligi" },
                { title: tFooter('sapTechnical'), url: "/danismanlik/sap-teknik-danismanlik" },
                { title: tFooter('sapFunctional'), url: "/danismanlik/sap-fonksiyonel-danismanlik" },
                { title: tFooter('developmentConsulting'), url: "/danismanlik/gelistirme-danismanligi" },
                { title: tFooter('qualityManagement'), url: "/danismanlik/kalite-yonetimi" },
                { title: tFooter('outsourcing'), url: "/danismanlik/diskaynak-hizmetleri" },
            ]
        },
        {
            title: tFooter('projects'),
            url: "/projeler",
            children: [
                { title: tFooter('methodology'), url: "/projeler/metodoloji" },
                { title: tFooter('references'), url: "/projeler/referanslar" },
            ]
        },
        {
            title: tFooter('technology'),
            url: "/teknoloji",
            children: [
                { 
                    title: tFooter('architecture'), 
                    url: "/teknoloji/mimari",
                    subChildren: [
                        { title: tFooter('modularity'), url: "/teknoloji/mimari/modulerlik" },
                        { title: tFooter('designBased'), url: "/teknoloji/mimari/tasarim-tabanli" },
                    ]
                },
                { title: tFooter('innovation'), url: "/teknoloji/inovasyon" },
                { 
                    title: tFooter('rd'), 
                    url: "/teknoloji/arastirma-gelistirme",
                    subChildren: [
                        { title: tFooter('modelingSimulation'), url: "/teknoloji/arastirma-gelistirme/modelleme-ve-simulasyon" },
                    ]
                },
            ]
        },
        { 
            title: tFooter('news'), 
            url: "/haberler"
        },
        {
            title: tFooter('corporate'),
            url: "/kurumsal",
            children: [
                { title: tFooter('aboutUs'), url: "/kurumsal/hakkimizda" },
                { title: tFooter('career'), url: "/kariyer" },
                { title: tFooter('legalInfo'), url: "/kurumsal/yasal-bilgiler" },
                { title: tFooter('infosecPolicy'), url: "/bilgi-guvenligi-politikasi" },
                { title: tFooter('kvkk'), url: "/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi" },
                { title: tFooter('contactUs'), url: "/iletisim" },
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
        <header className={`fixed top-0 left-0 w-full z-[1000] bg-[#050505]/80 backdrop-blur-xl border-b border-[var(--border)] flex items-center transition-all duration-400 ${scrolled ? 'h-[70px]' : 'h-[90px]'}`}>
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center h-full">
                
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-4 text-white font-[var(--font-display)] font-black text-xl tracking-[0.15em] no-underline">
                    <img src="/logo.png" alt="Enoca" className="h-10 w-auto object-contain hover:opacity-90 transition-opacity" />
                </Link>

                {/* DESKTOP NAV */}
                <ul className="hidden lg:flex gap-8 list-none h-full items-center">
                    {menuItems.map((item, idx) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const hasSubChildren = hasChildren && item.children!.some(c => c.subChildren && c.subChildren.length > 0);

                        return (
                            <li key={idx} className="relative group h-full flex items-center">
                                <Link 
                                    href={item.url} 
                                    className="text-[var(--muted)] font-[var(--font-mono)] text-[12px] uppercase tracking-[0.08em] h-full flex items-center relative transition-colors duration-200 hover:text-white after:content-[''] after:absolute after:bottom-[20px] after:left-0 after:w-full after:h-[1px] after:bg-[var(--accent)] after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform"
                                >
                                    {item.title}
                                </Link>

                                {hasChildren && (
                                    <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 pt-0 hidden group-hover:block z-[1000]">
                                        {hasSubChildren ? (
                                            /* MEGA MENU LAYOUT */
                                            <div className="bg-slate-950/95 border border-white/10 p-8 shadow-2xl backdrop-blur-xl rounded-none w-max max-w-[800px] flex gap-12">
                                                {item.children!.map((child, cIdx) => (
                                                    <div key={cIdx} className="flex flex-col min-w-[160px]">
                                                        <Link href={child.url} className={`text-[14px] uppercase tracking-widest hover:text-white transition-colors block mb-3 text-[var(--accent)] font-[var(--font-mono)]`}>
                                                            {child.title}
                                                        </Link>
                                                        {child.subChildren && child.subChildren.length > 0 && (
                                                            <ul className="flex flex-col gap-2 border-l border-[var(--border)] pl-4 ml-1">
                                                                {child.subChildren.map((sub, sIdx) => (
                                                                    <li key={sIdx}>
                                                                        <Link href={sub.url} className="text-[var(--meta)] text-[13px] hover:text-[var(--accent)] transition-colors block leading-relaxed">
                                                                            {sub.title}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            /* STANDARD DROPDOWN LAYOUT */
                                            <ul className="min-w-[240px] bg-slate-950/95 border border-white/10 p-2 flex flex-col gap-1 shadow-2xl backdrop-blur-xl rounded-none">
                                                {item.children!.map((child, cIdx) => (
                                                    <li key={cIdx} className="w-full">
                                                        <Link 
                                                            href={child.url}
                                                            className="block w-full px-4 py-2.5 text-[var(--muted)] font-[var(--font-mono)] text-[13px] uppercase tracking-wider hover:text-white hover:bg-white/5 transition-colors duration-150 rounded-none text-left"
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* ACTIONS */}
                <div className="hidden lg:flex items-center gap-4">
                    <button 
                        onClick={() => router.replace(pathname, {locale: locale === 'tr' ? 'en' : 'tr'})}
                        className="font-[var(--font-mono)] text-[12px] text-[var(--muted)] hover:text-white uppercase tracking-widest border border-transparent hover:border-[var(--border)] px-3 py-1 transition-all cursor-pointer"
                    >
                        {locale === 'tr' ? 'EN' : 'TR'}
                    </button>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                        className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-white transition-all cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>

                {/* MOBILE TOGGLE */}
                <button 
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
                </button>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="absolute top-[calc(100%-1px)] left-0 w-full max-h-[calc(100vh-70px)] overflow-y-auto bg-[#050505] border-b border-[var(--border)] p-4 flex flex-col gap-2 lg:hidden">
                    {menuItems.map((item, idx) => {
                        const hasChildren = item.children && item.children.length > 0;
                        
                        if (!hasChildren) {
                            return (
                                <Link 
                                    key={idx}
                                    href={item.url} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-[var(--font-mono)] text-[12px] uppercase text-white tracking-widest p-4 border-b border-[var(--border)] block"
                                >
                                    {item.title}
                                </Link>
                            );
                        }

                        return (
                            <details key={idx} className="group border-b border-[var(--border)]">
                                <summary className="font-[var(--font-mono)] text-[12px] uppercase text-white tracking-widest p-4 cursor-pointer list-none flex justify-between items-center hover:text-[var(--accent)] transition-colors">
                                    {item.title}
                                    <span className="transition-transform group-open:rotate-180 text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-4 pl-6 pb-4 pt-2">
                                    {item.children!.map((child, cIdx) => (
                                        <div key={cIdx} className="flex flex-col">
                                            <Link 
                                                href={child.url} 
                                                onClick={() => setIsMobileMenuOpen(false)} 
                                                className={`font-[var(--font-mono)] text-[13px] uppercase tracking-wider block text-[var(--accent)] ${child.subChildren ? 'mb-3' : 'hover:text-white'}`}
                                            >
                                                {child.title}
                                            </Link>
                                            {child.subChildren && child.subChildren.length > 0 && (
                                                <div className="flex flex-col gap-3 pl-3 border-l border-[var(--border)] ml-1">
                                                    {child.subChildren.map((sub, sIdx) => (
                                                        <Link 
                                                            key={sIdx} 
                                                            href={sub.url} 
                                                            onClick={() => setIsMobileMenuOpen(false)} 
                                                            className="text-[var(--meta)] text-[12px] uppercase hover:text-white transition-colors"
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                    <div className="flex justify-between items-center pt-6 pb-4 px-2">
                        <button 
                            onClick={() => { router.replace(pathname, {locale: locale === 'tr' ? 'en' : 'tr'}); setIsMobileMenuOpen(false); }}
                            className="font-[var(--font-mono)] text-[12px] text-white uppercase tracking-widest border border-[var(--border)] px-4 py-2 hover:bg-white/5 transition-colors"
                        >
                            {locale === 'tr' ? 'SWITCH TO ENGLISH' : 'TÜRKÇE GEÇ'}
                        </button>
                        <button 
                            onClick={() => { window.dispatchEvent(new CustomEvent('open-command-palette')); setIsMobileMenuOpen(false); }}
                            className="font-[var(--font-mono)] text-[12px] text-[var(--accent)] hover:text-[var(--accent-hover)] uppercase tracking-widest border border-[var(--border)] px-4 py-2 flex items-center gap-2 hover:bg-white/5 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            {tNav('searchBtn')}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}