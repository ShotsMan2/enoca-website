"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Search, X, Globe, Menu, Sun, Moon } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { SiteSettings, ContentPage } from '@/lib/admin-api';

export default function Navbar({ settings, pages = [] }: { settings?: SiteSettings, pages?: ContentPage[] }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDark, setIsDark] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Arama sorgusunu rotaya aktarıyoruz
            router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("admin-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("admin-theme", "light");
        }
    };

    // Enoca.com'un orijinal menü yapısı
    type MenuItem = {
        title: string;
        url: string;
        children?: MenuItem[];
        subChildren?: { title: string; url: string }[];
    };
    const menuItems: MenuItem[] = [
        {
            title: t('services'),
            url: "/cozumler",
            children: [
                { 
                    title: t('hybrisSolutions'), 
                    url: "/cozumler/hybris-cozumleri",
                    subChildren: [
                        { title: "SAP CX Hybris B2C E-Ticaret", url: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret" },
                        { title: "SAP CX Hybris B2B E-Ticaret", url: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret" },
                        { title: "SAP CX Hybris Mobil E-Ticaret", url: "/cozumler/hybris-cozumleri/hybris-mobil-ticaret" },
                        { title: "SAP CX Hybris MDM", url: "/cozumler/hybris-cozumleri/hybris-mdm" },
                    ]
                },
                { 
                    title: t('sapSolutions'), 
                    url: "/cozumler/sap-cozumleri",
                    subChildren: [
                        { title: "SAP Mobility", url: "/cozumler/sap-cozumleri/sap-mobility" },
                        { title: "SAP HANA", url: "/cozumler/sap-cozumleri/sap-hana" },
                        { title: t('sapAppMgmt'), url: "/cozumler/sap-cozumleri/sap-uygulama-yonetimi" },
                        { title: t('sapCloud'), url: "/cozumler/sap-cozumleri/sap-bulut" },
                    ]
                },
                { 
                    title: t('monitoringSolutions'), 
                    url: "/cozumler/sistem-izleme-cozumleri",
                    subChildren: [
                        { title: "vFabric Hyperic", url: "/cozumler/sistem-izleme-cozumleri/vfabric-hyperic" },
                        { title: "Nagios", url: "/cozumler/sistem-izleme-cozumleri/nagios" },
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
                { title: t('devConsulting'), url: "/danismanlik/gelistirme-danismanligi" },
                { title: t('qualityMgmt'), url: "/danismanlik/kalite-yonetimi" },
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
                { title: t('latestNews'), url: "/haberler/enocadan-son-haberler" },
            ]
        },
        {
            title: t('corporate'),
            url: "/kurumsal",
            children: [
                { title: t('aboutUs'), url: "/kurumsal/hakkimizda" },
                { title: t('careers'), url: "/kariyer" },
                { title: t('legalInfo'), url: "/kurumsal/yasal-bilgiler" },
                { title: t('infosecPolicy'), url: "/bilgi-guvenligi-politikasi" },
                { title: t('kvkk'), url: "/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi" },
            ]
        },
        { title: t('contact'), url: "/iletisim" },
        { title: t('admin'), url: "/admin" },
    ];

    // DB'den gelen aktif sayfaları (eğer statik menüde yoksa) ilgili kategoriye ekliyoruz
    const activePages = pages.filter(p => p.status === "published");
    activePages.forEach(page => {
        // Zaten bir alt menüde var mı kontrol edelim
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
        
        // Yoksa ilgili kategoriye ekleyelim
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
                categoryItem.children.push({ title: page.menuTitle, url: page.slug });
            } else {
                // Eğer kategori de bulunamazsa ana menüye ekleyelim (Admin hariç)
                const adminIndex = menuItems.findIndex(i => i.url === "/admin");
                menuItems.splice(adminIndex !== -1 ? adminIndex : menuItems.length, 0, { title: page.menuTitle, url: page.slug });
            }
        }
    });

    return (
        <header className="w-full flex flex-col z-50 sticky top-0">
            {/* Üst Bilgi Çubuğu (Top Bar) */}
            <div className="bg-[#222222] text-[#aaaaaa] text-xs py-2 hidden lg:block relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-6 font-medium tracking-wider">
                            <a href={`mailto:${settings?.email || 'contact@enoca.com'}`} className="hover:text-white transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{settings?.email || 'contact@enoca.com'}</a>
                            <a href={`tel:${settings?.phone || '+90 850 221 73 54'}`} className="hover:text-white transition-colors flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{settings?.phone || '+90 850 221 73 54'}</a>
                    </div>
                    <div className="flex items-center gap-6 font-medium tracking-wider">
                        <Link href="/gizlilik" className="hover:text-white transition-colors uppercase">{t('privacy')}</Link>
                        <Link href="/kullanim-kosullari" className="hover:text-white transition-colors uppercase">{t('terms')}</Link>
                        <div className="flex items-center gap-4 ml-4 border-l border-white/20 pl-4">
                            {settings?.linkedinUrl && (
                                <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                            )}
                            {settings?.twitterUrl && (
                                <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ana Menü Çubuğu */}
            <nav className="w-full backdrop-blur-xl bg-white/95 border-b border-border/40 shadow-sm transition-all relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-[88px] items-center">
                        
                        {/* Logo Alanı */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="group flex items-center gap-2">
                                <div className="flex items-center text-[2rem] font-display font-black tracking-tighter text-accent group-hover:opacity-80 transition-opacity">
                                    <span className="w-3.5 h-3.5 bg-accent mr-1.5 rounded-sm"></span>
                                    enoca<sup className="text-sm font-sans ml-0.5">&trade;</sup>
                                </div>
                            </Link>
                        </div>

                        {/* Menü Linkleri */}
                        <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
                            {menuItems.map((item, idx) => (
                                <div key={idx} className="group relative">
                                    <Link href={item.url} className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-bold text-foreground/80 hover:text-accent transition-all duration-200 uppercase tracking-wide">
                                        {item.title}
                                        {item.children && (
                                            <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                        )}
                                    </Link>

                                    {/* Açılır Menü (1. Seviye) */}
                                    {item.children && (
                                        <div className="absolute left-0 top-full pt-2 w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 translate-y-2 z-50">
                                            <div className="bg-card rounded-xl border border-border/50 shadow-xl p-2 relative backdrop-blur-xl bg-white/95">
                                                <div className="flex flex-col gap-1">
                                                    {item.children.map((child: MenuItem, cIdx: number) => (
                                                        <div key={cIdx} className="group/sub relative">
                                                            <Link
                                                                href={child.url}
                                                                className="flex items-center px-4 py-3 text-[13px] font-semibold text-foreground/70 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors duration-200"
                                                            >
                                                                <span className="flex-1 uppercase tracking-wide">{child.title}</span>
                                                                {/* Eğer alt menünün de alt menüsü varsa minik ok çıkartıyoruz */}
                                                                {child.subChildren && (
                                                                    <ChevronDown className="w-3.5 h-3.5 opacity-50 -rotate-90" />
                                                                )}
                                                            </Link>
                                                            
                                                            {/* Yana Açılan İç İçe Menü (2. Seviye) */}
                                                            {child.subChildren && (
                                                                <div className="absolute left-full top-0 pl-1 w-[280px] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform origin-top-left group-hover/sub:translate-x-0 -translate-x-2 z-[60]">
                                                                    <div className="bg-card rounded-xl border border-border/50 shadow-xl p-2 relative backdrop-blur-xl bg-white/95">
                                                                        <div className="flex flex-col gap-1">
                                                                            {child.subChildren.map((sub: { title: string; url: string }, sIdx: number) => (
                                                                                <Link
                                                                                    key={sIdx}
                                                                                    href={sub.url}
                                                                                    className="flex items-center px-4 py-3 text-[13px] font-semibold text-foreground/70 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors duration-200"
                                                                                >
                                                                                    <span className="flex-1 uppercase tracking-wide">{sub.title}</span>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Türkçe (Dil Seçimi) ve Arama İkonu */}
                            <div className="flex items-center gap-2 pl-4 ml-2 border-l border-border/50 h-8 relative group/lang">
                                <button className="flex items-center gap-1.5 px-2 py-2 text-[13px] font-bold text-foreground/80 hover:text-accent transition-all duration-200 uppercase tracking-wide">
                                    <Globe className="w-3.5 h-3.5 opacity-70" />
                                    {locale === 'tr' ? 'TÜRKÇE' : 'ENGLISH'} 
                                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover/lang:rotate-180 transition-transform duration-300" />
                                </button>

                                {/* Dil Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 z-50">
                                    <div className="bg-white rounded-xl shadow-xl border border-border/50 overflow-hidden flex flex-col min-w-[120px]">
                                        <button onClick={() => router.replace(pathname, {locale: 'tr'})} className={`px-4 py-2.5 text-xs font-bold uppercase text-left hover:bg-gray-50 transition-colors ${locale === 'tr' ? 'text-accent' : 'text-gray-600'}`}>TÜRKÇE</button>
                                        <div className="w-full h-px bg-gray-100" />
                                        <button onClick={() => router.replace(pathname, {locale: 'en'})} className={`px-4 py-2.5 text-xs font-bold uppercase text-left hover:bg-gray-50 transition-colors ${locale === 'en' ? 'text-accent' : 'text-gray-600'}`}>ENGLISH</button>
                                    </div>
                                </div>
                                
                                {/* Theme Toggle */}
                                <button 
                                    onClick={toggleTheme}
                                    className="ml-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent/10 text-foreground/80 hover:text-accent transition-colors"
                                    title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
                                >
                                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                                
                                <div className="relative flex items-center justify-center ml-1">
                                    <button 
                                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent/10 text-foreground/80 hover:text-accent transition-colors"
                                    >
                                        {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                                    </button>
                                    
                                    {/* Arama Input Alanı (Açılır/Kapanır) */}
                                    <div className={`absolute top-full right-0 mt-4 p-2 bg-white rounded-xl shadow-xl border border-border/50 transition-all duration-300 origin-top-right ${isSearchOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={t('searchPlaceholder')} 
                                                className="w-56 h-10 px-4 rounded-lg border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm transition-all"
                                                autoFocus={isSearchOpen}
                                            />
                                            <button type="submit" className="h-10 px-4 bg-accent text-white rounded-lg text-[13px] font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
                                                {t('searchBtn')}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex lg:hidden items-center gap-2">
                            <button 
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/10 text-foreground/80 hover:text-accent transition-colors"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button 
                                onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMobileMenuOpen(false); }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/10 text-foreground/80 hover:text-accent transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsSearchOpen(false); }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-accent/10 text-foreground/80 hover:text-accent transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Dropdown */}
                {isSearchOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-xl">
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder')} 
                                className="flex-1 h-12 px-4 rounded-lg border border-border bg-gray-50 focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm transition-all"
                                autoFocus
                            />
                            <button type="submit" className="h-12 px-6 bg-accent text-white rounded-lg text-[13px] font-bold uppercase tracking-wider">
                                {t('searchBtn')}
                            </button>
                        </form>
                    </div>
                )}

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-xl max-h-[calc(100vh-88px)] overflow-y-auto">
                        <div className="flex flex-col p-4 gap-2">
                            {/* Language Switcher Mobile */}
                            <div className="flex justify-center gap-4 py-4 border-b border-gray-100 mb-2">
                                <button onClick={() => { router.replace(pathname, {locale: 'tr'}); setIsMobileMenuOpen(false); }} className={`text-sm font-bold uppercase ${locale === 'tr' ? 'text-accent' : 'text-gray-500'}`}>TR</button>
                                <span className="text-gray-300">|</span>
                                <button onClick={() => { router.replace(pathname, {locale: 'en'}); setIsMobileMenuOpen(false); }} className={`text-sm font-bold uppercase ${locale === 'en' ? 'text-accent' : 'text-gray-500'}`}>EN</button>
                            </div>
                            
                            {menuItems.map((item, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <Link 
                                        href={item.url} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="py-3 px-4 text-sm font-bold text-gray-800 hover:text-accent hover:bg-gray-50 rounded-lg"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.children && (
                                        <div className="flex flex-col pl-6 border-l-2 border-gray-100 ml-4 mb-2 mt-1 gap-1">
                                            {item.children.map((child: MenuItem, cIdx: number) => (
                                                <Link 
                                                    key={cIdx} 
                                                    href={child.url}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="py-2 text-[13px] font-semibold text-gray-600 hover:text-accent"
                                                >
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}