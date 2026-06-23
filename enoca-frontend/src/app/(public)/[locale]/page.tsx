import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import nextDynamic from 'next/dynamic';
import PublicLayout from "@/components/PublicLayout";
import HomePageContactForm from "@/components/HomePageContactForm";
import { getTranslations, getLocale } from "next-intl/server";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import PageTransition from "@/components/PageTransition";
import SpotlightCard from "@/components/SpotlightCard";
import * as motion from "framer-motion/client";
import GlobeVisual from "@/components/GlobeVisual";
import ProjectConfigurator from "@/components/ProjectConfigurator";
import ROICalculator from "@/components/ROICalculator";
import NetworkBackground from "@/components/NetworkBackground";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";

export const dynamic = 'force-dynamic';

// getCategories() fonksiyonu kaldırıldı, db.json'dan okunacak.

import { readDB } from '@/lib/db';
import { HomepageFeature } from "@/lib/admin-api";

const realReferences = [
  { name: "Akbank", image: "/references/akbank.png", url: "https://www.akbank.com" },
  { name: "Turkcell", image: "/references/turkcell.png", url: "https://www.turkcell.com.tr" },
  { name: "Trendyol", image: "/references/trendyol.png", url: "https://www.trendyol.com" },
  { name: "Türk Hava Yolları", image: "/references/thy.svg", url: "https://www.turkishairlines.com" },
  { name: "Garanti BBVA", image: "/references/garanti.svg", url: "https://www.garantibbva.com.tr" },
  { name: "Koç Holding", image: "/references/koc.png", url: "https://www.koc.com.tr" }
];

export default async function Home() {
  const locale = await getLocale();
  const translateDB = (text: string) => {
    if (locale !== 'en') return text;
    const dict: Record<string, string> = {
      "SAP Çözümleri": "SAP Solutions",
      "Sistem İzleme": "System Monitoring",
      "SAP CX Hybris B2C E-Ticaret": "SAP CX Hybris B2C E-Commerce",
      "SAP CX Hybris B2B E-Ticaret": "SAP CX Hybris B2B E-Commerce",
      "Yeni Link": "New Link",
      "Global Standartlarda Kalite": "Global Standard Quality",
      "Projenizin her aşamasında uluslararası yazılım geliştirme standartlarını ve best-practice'leri uyguluyoruz.": "We apply international software development standards and best practices at every stage of your project.",
      "Ölçeklenebilir Mimari": "Scalable Architecture",
      "İşiniz büyüdükçe sizinle birlikte büyüyebilen, yüksek trafik ve yük altında sorunsuz çalışan sistemler tasarlıyoruz.": "We design systems that can grow with you as your business grows, working seamlessly under high traffic and load.",
      "Çevik Geliştirme (Agile)": "Agile Development",
      "Scrum ve Kanban metodolojileriyle şeffaf, hızlı ve geri bildirimlere anında yanıt verebilen bir süreç sunuyoruz.": "We offer a transparent, fast process that instantly responds to feedback with Scrum and Kanban methodologies.",
      "7/24 Kesintisiz Destek": "24/7 Uninterrupted Support",
      "Proje tesliminden sonra da yanınızdayız. Olası sorunlara karşı anında müdahale ediyor, sistemlerinizin ayakta kalmasını sağlıyoruz.": "We stand by you even after project delivery. We instantly intervene against possible problems and ensure your systems stay up.",
      "Yıllık Tecrübe": "Years of Experience",
      "Başarılı Proje": "Successful Projects",
      "Uzman Ekip": "Expert Team",
      "İş Ortağı": "Business Partners"
    };
    return dict[text] || text;
  };

  const db = await readDB();
  const heroSettings = db?.hero || {
    mainTitle: "WE DO SAP CX",
    highlightedWord: "HYBRIS",
    subtitle: "Experienced In SAP CX Hybris Delivery",
    button1Text: "SAP CX Hybris B2C E-Ticaret",
    button1Url: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret",
    button2Text: "SAP CX Hybris B2B E-Ticaret",
    button2Url: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret"
  };
  
  const homepage = db?.homepage || {
    features: [],
    references: [],
    categories: []
  };

  const categories = homepage.categories;
  const references = homepage.references;
  const features = homepage.features;

  const tHero = await getTranslations('Hero');
  const tRefs = await getTranslations('References');
  const tServices = await getTranslations('Services');
  const tMisc = await getTranslations('HomeMisc');
  const tContact = await getTranslations('Contact');

  return (
    <PublicLayout>
      <PageTransition>
      {/* 1. KAHRAMAN BÖLÜMÜ (HERO) */}
      <section className="relative overflow-hidden pt-[90px] pb-24 lg:pt-[120px] lg:pb-32 bg-background min-h-screen flex items-center justify-center -mt-[72px]">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />
        <NetworkBackground />
        
        {/* Full Background Rotating Elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 z-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full border border-accent/20 animate-spin-slow" />
          <div className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border border-dashed border-accent/30 animate-reverse-spin" />
          <div className="absolute w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-gradient-to-br from-accent/5 to-transparent rounded-full backdrop-blur-3xl" />
          <div className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw]">
            <GlobeVisual />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 relative z-10 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 rounded-none border border-accent/40 bg-accent/10 px-4 py-1.5 clip-diagonal shadow-glow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-glow-sm"></span>
              </span>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase">
                {tHero('badge')}
              </span>
            </div>

            <h1 className="text-[3.5rem] leading-[1.05] sm:text-[4.5rem] lg:text-[6rem] font-black tracking-tighter text-foreground mb-4 font-display drop-shadow-2xl max-w-4xl">
              {heroSettings.mainTitle}
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-mono">
              {heroSettings.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <Button asChild size="lg" className="h-14 px-8 text-sm font-black tracking-widest bg-accent hover:bg-white text-accent-foreground hover:text-black rounded-none clip-chamfer shadow-glow-md hover:shadow-glow-lg transition-all duration-300">
                <Link href={heroSettings.button1Url || "/cozumler"}>{translateDB(heroSettings.button1Text)}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-sm font-bold tracking-widest border border-accent/40 bg-transparent hover:bg-accent/10 text-accent rounded-none clip-chamfer transition-all duration-300">
                <Link href={heroSettings.button2Url || "/iletisim"}>{translateDB(heroSettings.button2Text)}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ÇÖZÜMLER & YETKİNLİKLER (Cyber Hexagons) */}
      <section className="py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {features.map((feature: HomepageFeature, idx: number) => (
              <motion.div 
                key={feature.id || idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-background border border-border clip-chamfer hover:border-accent/50 transition-colors duration-500"
              >
                <Link href="/cozumler" className="block p-8 h-full">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-500" />
                  
                  <div className="w-14 h-14 bg-accent/10 border border-accent/30 flex items-center justify-center text-accent clip-diagonal mb-6 shadow-glow-sm">
                    <span className="text-xl font-black font-mono">{feature.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{translateDB(feature.title)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-mono">
                    {translateDB(feature.text)}
                  </p>
                </Link>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER (Yeni Kurumsal Alan) */}
      <section className="py-16 bg-background relative z-20 border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x divide-border">
            <div className="text-center"><CountUp end={15} suffix="+" title={translateDB("Yıllık Tecrübe")} /></div>
            <div className="text-center"><CountUp end={250} suffix="+" title={translateDB("Başarılı Proje")} /></div>
            <div className="text-center"><CountUp end={100} suffix="+" title={translateDB("Uzman Ekip")} /></div>
            <div className="text-center"><CountUp end={50} suffix="+" title={translateDB("İş Ortağı")} /></div>
          </div>
        </div>
      </section>

      {/* 3. REFERANSLAR (Kayan Şerit - Marquee) */}
      <section className="py-20 border-b border-border bg-background overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
             <h3 className="text-sm font-mono tracking-[0.2em] text-muted-foreground uppercase">{tRefs('title')}</h3>
         </div>
         <Marquee speed={40}>
            {realReferences.map((ref, idx: number) => (
                <a key={idx} href={ref.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center px-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 gap-4 group cursor-pointer">
                    <div className="w-40 h-20 bg-white/5 rounded-xl border border-border flex items-center justify-center p-4 group-hover:border-accent/50 transition-colors">
                        <img src={ref.image} alt={ref.name} className="w-full h-full object-contain" />
                    </div>
                </a>
            ))}
         </Marquee>
      </section>

      {/* 4. DİNAMİK KATEGORİLER (Cyber Spotlight) */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-widest font-mono drop-shadow-glow">
              {tServices('title')} <span className="text-accent">{tServices('titleHighlight')}</span>
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto shadow-glow-sm" />
            <p className="text-lg text-muted-foreground font-mono mt-4">
              {tServices('subtitle')}
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat: { id: string | number; name: string; links?: { id: string | number; url: string; title: string }[] }, idx: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                <SpotlightCard className="group p-0 h-full bg-card border border-border clip-chamfer relative overflow-hidden flex flex-col hover:border-accent transition-colors duration-300 cursor-pointer">
                  <Link href={cat.links?.[0]?.url || '/cozumler'} className="absolute inset-0 z-0" aria-label={translateDB(cat.name)}></Link>
                  <div className="p-8 flex flex-col h-full pointer-events-none relative z-10">
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 border border-accent bg-accent/10 flex items-center justify-center clip-diagonal">
                        <span className="text-accent font-bold">↗</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-foreground mb-6 uppercase tracking-wider font-mono border-b border-border/50 pb-4">{translateDB(cat.name)}</h3>
                    <div className="flex flex-col gap-3 mb-6 pointer-events-auto relative z-20">
                      {cat.links?.map((link: { id: string | number; url: string; title: string }) => (
                        <Link 
                          key={link.id} 
                          href={link.url}
                          className="text-muted-foreground hover:text-accent font-mono text-sm transition-colors flex items-center gap-2 group/link"
                        >
                          <span className="font-mono text-accent/50 group-hover/link:text-accent">&gt;</span>
                          {translateDB(link.title)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed border-border rounded-none clip-chamfer bg-muted/30">
              <p className="text-muted-foreground font-mono">{tServices('noData')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. PROJE KONFİGÜRATÖRÜ (Cyber Configurator) */}
      <section className="py-24 bg-card relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-mono uppercase tracking-wider">
              {tMisc('configTitle')}<span className="text-accent drop-shadow-glow">{tMisc('configHighlight')}</span>
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto shadow-glow-sm" />
            <p className="text-lg text-muted-foreground font-mono mt-4">
              {tMisc('configDesc')}
            </p>
          </div>
          <div className="bg-background border border-border p-8 clip-chamfer relative shadow-glow-lg">
             <ProjectConfigurator />
          </div>
        </div>
      </section>

      {/* 5.5. B2B ROI HESAPLAYICI (Cyber ROI) */}
      <section className="py-24 bg-background relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-mono uppercase tracking-wider">
              {tMisc('roiTitle')}<span className="text-accent drop-shadow-glow">{tMisc('roiHighlight')}</span>
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto shadow-glow-sm" />
            <p className="text-lg text-muted-foreground font-mono mt-4">
              {tMisc('roiDesc')}
            </p>
          </div>
          <div className="bg-card border border-border p-8 clip-chamfer relative shadow-glow-lg">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* 6. İLETİŞİM / CTA BÖLÜMÜ (Cyber Terminal Form) */}
      <section className="py-24 relative bg-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-background border border-accent/40 clip-chamfer p-8 md:p-12 shadow-glow-lg relative overflow-hidden">
             
            <div className="absolute top-0 left-0 w-16 h-1 bg-accent shadow-glow-sm" />
            <div className="absolute bottom-0 right-0 w-16 h-1 bg-accent shadow-glow-sm" />

            <div className="text-center mb-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-widest font-mono"
                >
                  {tContact('title')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground font-mono text-sm"
                >
                  {tContact('subtitle')}
                </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <HomePageContactForm />
            </motion.div>

          </div>
        </div>
      </section>
      </PageTransition>
    </PublicLayout>
  );
}