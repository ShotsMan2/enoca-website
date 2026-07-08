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
    const t = useTranslations('Navbar');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // We simplify the menu to match the new technical aesthetic
    // while keeping core routing intact
    const menuItems = [
        { title: t('services'), url: "/cozumler" },
        { title: t('consulting'), url: "/danismanlik" },
        { title: t('projects'), url: "/projeler" },
        { title: t('technology'), url: "/teknoloji" },
        { title: t('corporate'), url: "/kurumsal" },
        { title: t('contact'), url: "/iletisim" },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-[1000] bg-[#050505]/80 backdrop-blur-xl border-b border-[var(--border)] flex items-center transition-all duration-400 ${scrolled ? 'h-[70px]' : 'h-[90px]'}`}>
            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
                
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-4 text-white font-[var(--font-display)] font-black text-xl tracking-[0.15em] no-underline">
                    <div className="w-6 h-6 border-2 border-[var(--accent)] relative">
                        <div className="absolute top-[2px] left-[2px] w-[6px] h-[6px] bg-[var(--accent)]"></div>
                    </div>
                    ENOCA
                </Link>

                {/* DESKTOP NAV */}
                <ul className="hidden lg:flex gap-8 list-none">
                    {menuItems.map((item, idx) => (
                        <li key={idx}>
                            <Link href={item.url} className="text-[var(--muted)] font-[var(--font-mono)] text-[12px] uppercase tracking-[0.08em] py-2 relative transition-colors duration-200 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[var(--accent)] after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* ACTIONS */}
                <div className="hidden lg:flex items-center gap-4">
                    <button 
                        onClick={() => router.replace(pathname, {locale: locale === 'tr' ? 'en' : 'tr'})}
                        className="font-[var(--font-mono)] text-[12px] text-[var(--muted)] hover:text-white uppercase tracking-widest border border-transparent hover:border-[var(--border)] px-3 py-1 transition-all"
                    >
                        {locale === 'tr' ? 'EN' : 'TR'}
                    </button>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                        className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-white transition-all cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    <Link href="/iletisim" className="btn btn-primary">
                        INIT PROJECT
                    </Link>
                </div>

                {/* MOBILE TOGGLE */}
                <button 
                    className="lg:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
                </button>
            </div>

            {/* MOBILE MENU */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#050505] border-b border-[var(--border)] p-4 flex flex-col gap-4 lg:hidden">
                    {menuItems.map((item, idx) => (
                        <Link 
                            key={idx} 
                            href={item.url} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-[var(--font-mono)] text-[12px] uppercase text-white tracking-widest p-2 border-b border-[var(--border)]"
                        >
                            {item.title}
                        </Link>
                    ))}
                    <div className="flex justify-between items-center pt-4">
                        <button 
                            onClick={() => { router.replace(pathname, {locale: locale === 'tr' ? 'en' : 'tr'}); setIsMobileMenuOpen(false); }}
                            className="font-[var(--font-mono)] text-[12px] text-white uppercase tracking-widest border border-[var(--border)] px-4 py-2"
                        >
                            {locale === 'tr' ? 'SWITCH TO ENGLISH' : 'TÜRKÇE GEÇ'}
                        </button>
                        <button 
                            onClick={() => { window.dispatchEvent(new CustomEvent('open-command-palette')); setIsMobileMenuOpen(false); }}
                            className="font-[var(--font-mono)] text-[12px] text-white uppercase tracking-widest border border-[var(--border)] px-4 py-2"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}