"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { SiteSettings } from '@/lib/admin-api';

export default function Footer({ settings }: { settings?: SiteSettings }) {
    const t = useTranslations('Footer');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer className="bg-[#222222] text-[#aaaaaa] pt-16 pb-8 border-t-[6px] border-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Footer Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                    
                    {/* Sütun 1: ÇÖZÜMLER */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/cozumler">{t('solutions')}</Link></h4>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Link href="/cozumler/hybris-cozumleri" className="block text-[13px] font-bold hover:text-white transition-colors">{t('hybrisSolutions')}</Link>
                                <div className="space-y-1.5 pl-3 border-l border-white/10">
                                    <Link href="/cozumler/hybris-cozumleri/hybris-b2c-ticaret" className="block text-xs hover:text-white transition-colors">SAP CX Hybris B2C E-Ticaret</Link>
                                    <Link href="/cozumler/hybris-cozumleri/hybris-b2b-ticaret" className="block text-xs hover:text-white transition-colors">SAP CX Hybris B2B E-Ticaret</Link>
                                    <Link href="/cozumler/hybris-cozumleri/hybris-mobil-ticaret" className="block text-xs hover:text-white transition-colors">SAP CX Hybris Mobil E-Ticaret</Link>
                                    <Link href="/cozumler/hybris-cozumleri/hybris-mdm" className="block text-xs hover:text-white transition-colors">SAP CX Hybris MDM</Link>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Link href="/cozumler/sap-cozumleri" className="block text-[13px] font-bold hover:text-white transition-colors">{t('sapSolutions')}</Link>
                                <div className="space-y-1.5 pl-3 border-l border-white/10">
                                    <Link href="/cozumler/sap-cozumleri/sap-mobility" className="block text-xs hover:text-white transition-colors">SAP Mobility</Link>
                                    <Link href="/cozumler/sap-cozumleri/sap-hana" className="block text-xs hover:text-white transition-colors">SAP HANA</Link>
                                    <Link href="/cozumler/sap-cozumleri/sap-uygulama-yonetimi" className="block text-xs hover:text-white transition-colors">SAP Uygulama Yönetimi</Link>
                                    <Link href="/cozumler/sap-cozumleri/sap-bulut" className="block text-xs hover:text-white transition-colors">SAP Bulut</Link>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Link href="/cozumler/sistem-izleme-cozumleri" className="block text-[13px] font-bold hover:text-white transition-colors">{t('monitoringSolutions')}</Link>
                                <div className="space-y-1.5 pl-3 border-l border-white/10">
                                    <Link href="/cozumler/sistem-izleme-cozumleri/vfabric-hyperic" className="block text-xs hover:text-white transition-colors">vFabric Hyperic</Link>
                                    <Link href="/cozumler/sistem-izleme-cozumleri/nagios" className="block text-xs hover:text-white transition-colors">Nagios</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sütun 2: DANIŞMANLIK */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/danismanlik">{t('consulting')}</Link></h4>
                        <div className="space-y-2">
                            <Link href="/danismanlik/hybris-danismanligi" className="block text-[13px] font-bold hover:text-white transition-colors">{t('hybrisConsulting')}</Link>
                            <Link href="/danismanlik/sap-teknik-danismanlik" className="block text-[13px] font-bold hover:text-white transition-colors">{t('sapTechnical')}</Link>
                            <Link href="/danismanlik/sap-fonksiyonel-danismanlik" className="block text-[13px] font-bold hover:text-white transition-colors">{t('sapFunctional')}</Link>
                            <Link href="/danismanlik/gelistirme-danismanligi" className="block text-[13px] font-bold hover:text-white transition-colors">{t('developmentConsulting')}</Link>
                            <Link href="/danismanlik/kalite-yonetimi" className="block text-[13px] font-bold hover:text-white transition-colors">{t('qualityManagement')}</Link>
                            <Link href="/danismanlik/diskaynak-hizmetleri" className="block text-[13px] font-bold hover:text-white transition-colors">{t('outsourcing')}</Link>
                        </div>
                    </div>

                    {/* Sütun 3: PROJELER */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/projeler">{t('projects')}</Link></h4>
                        <div className="space-y-2">
                            <Link href="/projeler/metodoloji" className="block text-[13px] font-bold hover:text-white transition-colors">{t('methodology')}</Link>
                            <Link href="/projeler/referanslar" className="block text-[13px] font-bold hover:text-white transition-colors">{t('references')}</Link>
                        </div>
                    </div>

                    {/* Sütun 4: TEKNOLOJİ */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/teknoloji">{t('technology')}</Link></h4>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Link href="/teknoloji/mimari" className="block text-[13px] font-bold hover:text-white transition-colors">{t('architecture')}</Link>
                                <div className="space-y-1.5 pl-3 border-l border-white/10">
                                    <Link href="/teknoloji/mimari/modulerlik" className="block text-xs hover:text-white transition-colors">{t('modularity')}</Link>
                                    <Link href="/teknoloji/mimari/tasarim-tabanli" className="block text-xs hover:text-white transition-colors">{t('designBased')}</Link>
                                </div>
                            </div>
                            <div className="space-y-2 pt-2">
                                <Link href="/teknoloji/inovasyon" className="block text-[13px] font-bold hover:text-white transition-colors">{t('innovation')}</Link>
                            </div>
                            <div className="space-y-2 pt-2">
                                <Link href="/teknoloji/arastirma-gelistirme" className="block text-[13px] font-bold hover:text-white transition-colors">{t('rd')}</Link>
                                <div className="space-y-1.5 pl-3 border-l border-white/10">
                                    <Link href="/teknoloji/arastirma-gelistirme/modelleme-ve-simulasyon" className="block text-xs hover:text-white transition-colors">{t('modelingSimulation')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sütun 5: HABERLER */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/haberler">{t('news')}</Link></h4>
                        <div className="space-y-2">
                            <Link href="/haberler/enocadan-son-haberler" className="block text-[13px] font-bold hover:text-white transition-colors uppercase">{t('latestNews')}</Link>
                        </div>
                    </div>

                    {/* Sütun 6: KURUMSAL */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm"><Link href="/kurumsal">{t('corporate')}</Link></h4>
                        <div className="space-y-2">
                            <Link href="/kurumsal/hakkimizda" className="block text-[13px] font-bold hover:text-white transition-colors">{t('aboutUs')}</Link>
                            <Link href="/kariyer" className="block text-[13px] font-bold hover:text-white transition-colors">{t('career')}</Link>
                            <Link href="/kurumsal/yasal-bilgiler" className="block text-[13px] font-bold hover:text-white transition-colors">{t('legalInfo')}</Link>
                            <Link href="/bilgi-guvenligi-politikasi" className="block text-[13px] font-bold hover:text-white transition-colors">{t('infosecPolicy')}</Link>
                            <Link href="/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi" className="block text-[13px] font-bold hover:text-white transition-colors leading-relaxed">{t('kvkk')}</Link>
                            <Link href="/iletisim" className="block text-[13px] font-bold hover:text-white transition-colors">{t('contactUs')}</Link>
                        </div>
                    </div>

                </div>

                {/* Alt Telif ve Kısayollar */}
                <div className="border-t border-[#444444] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    <div className="flex items-center gap-6 text-[11px] md:text-xs font-bold tracking-wider">
                        {/* Sosyal İkonlar */}
                        {settings?.linkedinUrl && (
                            <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#333333] hover:bg-accent hover:text-white transition-all text-white" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        )}
                        {settings?.twitterUrl && (
                            <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#333333] hover:bg-accent hover:text-white transition-all text-white" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </a>
                        )}
                        <Link href={settings?.privacyUrl || "/gizlilik"} className="hover:text-white transition-colors uppercase">{t('privacy')}</Link>
                        <Link href={settings?.termsUrl || "/kullanim-kosullari"} className="hover:text-white transition-colors uppercase">{t('terms')}</Link>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 w-full lg:w-auto">
                        <div className="flex flex-col w-full max-w-sm gap-2 bg-white/5 p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-1">E-Bülten Kayıt</h4>
                            <p className="text-[11px] text-[#999999]">Sektörel gelişmelerden haberdar olmak için e-bültenimize kayıt olun.</p>
                            {subscribed ? (
                                <div className="mt-2 h-10 px-3 flex items-center bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-xl font-medium">
                                    Bülten aboneliğiniz alındı, teşekkürler!
                                </div>
                            ) : (
                                <form className="flex mt-2 relative z-10" onSubmit={handleSubscribe}>
                                    <input type="email" required placeholder="E-posta adresiniz" className="flex-1 h-10 px-4 text-xs bg-[#111111] border border-[#333333] rounded-l-xl outline-none focus:border-accent text-white placeholder-gray-600 transition-all focus:ring-2 focus:ring-accent/20" />
                                    <button type="submit" className="h-10 px-5 bg-accent text-white text-[11px] font-bold rounded-r-xl hover:bg-accent/90 transition-colors uppercase shadow-lg shadow-accent/20">Kayıt Ol</button>
                                </form>
                            )}
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end gap-1 mt-6 lg:mt-0">
                            <div className="text-3xl font-display font-black tracking-tighter text-white opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                enoca<sup className="text-xs font-sans ml-0.5">&trade;</sup>
                            </div>
                            <div className="text-[11px] font-medium tracking-wider text-[#777777]">
                                {t('copyright')}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
