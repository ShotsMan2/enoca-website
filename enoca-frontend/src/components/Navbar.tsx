"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Mail, Phone, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Arama sorgusunu rotaya aktarıyoruz
            router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Enoca.com'un orijinal menü yapısı
    const menuItems = [
        {
            title: "ÇÖZÜMLER",
            url: "/cozumler",
            children: [
                { title: "SAP CX HYBRİS ÇÖZÜMLERİ", url: "/cozumler/hybris-cozumleri" },
                { title: "SAP ÇÖZÜMLERİ", url: "/cozumler/sap-cozumleri" },
                { title: "SİSTEM İZLEME ÇÖZÜMLERİ", url: "/cozumler/sistem-izleme-cozumleri" },
            ]
        },
        {
            title: "DANIŞMANLIK",
            url: "/danismanlik",
            children: [
                { title: "SAP CX HYBRIS DANIŞMANLIĞI", url: "/danismanlik/hybris-danismanligi" },
                { title: "SAP TEKNİK DANIŞMANLIĞI", url: "/danismanlik/sap-teknik-danismanlik" },
                { title: "SAP FONKSİYONEL DANIŞMANLIĞI", url: "/danismanlik/sap-fonksiyonel-danismanlik" },
                { title: "GELİŞTİRME DANIŞMANLIĞI", url: "/danismanlik/gelistirme-danismanligi" },
                { title: "KALİTE YÖNETİMİ", url: "/danismanlik/kalite-yonetimi" },
                { title: "DIŞ KAYNAK HİZMETLERİ", url: "/danismanlik/diskaynak-hizmetleri" },
            ]
        },
        {
            title: "PROJELER",
            url: "/projeler",
            children: [
                { title: "METODOLOJİ", url: "/projeler/metodoloji" },
                { title: "REFERANSLAR", url: "/projeler/referanslar" },
            ]
        },
        {
            title: "TEKNOLOJİ",
            url: "/teknoloji",
            children: [
                { title: "MİMARİ", url: "/teknoloji/mimari" },
                { title: "İNOVASYON", url: "/teknoloji/inovasyon" },
                { title: "ARAŞTIRMA-GELİŞTİRME", url: "/teknoloji/arastirma-gelistirme" },
            ]
        },
        { 
            title: "HABERLER", 
            url: "/haberler",
            children: [
                { title: "enoca™'DAN SON HABERLER", url: "/haberler/enocadan-son-haberler" },
            ]
        },
        {
            title: "KURUMSAL",
            url: "/kurumsal",
            children: [
                { title: "HAKKIMIZDA", url: "/kurumsal/hakkimizda" },
                { title: "KARİYER", url: "/kurumsal/kariyer" },
                { title: "YASAL BİLGİLER", url: "/kurumsal/yasal-bilgiler" },
                { title: "BİLGİ GÜVENLİĞİ POLİTİKASI", url: "/bilgi-guvenligi-politikasi" },
                { title: "KVKK", url: "/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi" },
            ]
        },
        { title: "İLETİŞİM", url: "/iletisim" },
    ];

    return (
        <header className="w-full flex flex-col z-50 sticky top-0">
            {/* Üst Bilgi Çubuğu (Top Bar) */}
            <div className="bg-[#222222] text-[#aaaaaa] text-xs py-2 hidden lg:block relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-6 font-medium tracking-wider">
                        <a href="mailto:contact@enoca.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            <span>contact@enoca.com</span>
                        </a>
                        <a href="tel:+908502217354" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            <span>+90 850 221 73 54</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-6 font-medium tracking-wider">
                        <Link href="/gizlilik" className="hover:text-white transition-colors uppercase">GİZLİLİK</Link>
                        <Link href="/kullanim-kosullari" className="hover:text-white transition-colors uppercase">KULLANIM KOŞULLARI</Link>
                        <div className="flex items-center gap-4 ml-4 border-l border-white/20 pl-4">
                            <a href="https://linkedin.com/company/enoca" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="https://twitter.com/enoca_" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                            </a>
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

                                    {/* Açılır Menü */}
                                    {item.children && (
                                        <div className="absolute left-0 top-full pt-2 w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 translate-y-2 z-50">
                                            <div className="bg-card rounded-xl border border-border/50 shadow-xl p-2 relative overflow-hidden backdrop-blur-xl bg-white/95">
                                                <div className="flex flex-col gap-1">
                                                    {item.children.map((child, cIdx) => (
                                                        <Link
                                                            key={cIdx}
                                                            href={child.url}
                                                            className="group/link flex items-center px-4 py-3 text-[13px] font-semibold text-foreground/70 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors duration-200"
                                                        >
                                                            <span className="flex-1 uppercase tracking-wide">{child.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Türkçe (Dil Seçimi) ve Arama İkonu */}
                            <div className="flex items-center gap-2 pl-4 ml-2 border-l border-border/50 h-8 relative">
                                <button className="flex items-center gap-1 px-2 py-2 text-[13px] font-bold text-foreground/80 hover:text-accent transition-all duration-200 uppercase tracking-wide group">
                                    TÜRKÇE <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                
                                <div className="relative flex items-center justify-center">
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
                                                placeholder="Ara..." 
                                                className="w-56 h-10 px-4 rounded-lg border border-border bg-transparent focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm transition-all"
                                                autoFocus={isSearchOpen}
                                            />
                                            <button type="submit" className="h-10 px-4 bg-accent text-white rounded-lg text-[13px] font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
                                                Ara
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
}