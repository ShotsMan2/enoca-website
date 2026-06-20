import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/HeroVisual";
import PublicLayout from "@/components/PublicLayout";
import HomePageContactForm from "@/components/HomePageContactForm";
import { getTranslations } from "next-intl/server";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import PageTransition from "@/components/PageTransition";
import SpotlightCard from "@/components/SpotlightCard";
import NetworkBackground from "@/components/NetworkBackground";
import ProjectConfigurator from "@/components/ProjectConfigurator";
import * as motion from "framer-motion/client";
export const dynamic = 'force-dynamic';

// getCategories() fonksiyonu kaldırıldı, db.json'dan okunacak.

import { readDB } from '@/lib/db';
import { HomepageFeature } from "@/lib/admin-api";

export default async function Home() {
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
  const tContact = await getTranslations('Contact');

  return (
    <PublicLayout>
      <PageTransition>
      {/* 1. KAHRAMAN BÖLÜMÜ (HERO) */}
      <section className="relative overflow-hidden pt-4 pb-20 lg:pt-6 lg:pb-28">
        <NetworkBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
                  {tHero('badge')}
                </span>
              </div>

              <h1 className="text-[3.5rem] leading-[1.05] sm:text-[4rem] lg:text-[5rem] font-black tracking-tighter text-foreground mb-4 font-display">
                {heroSettings.mainTitle} <br className="hidden sm:block" />
                <span className="text-accent relative inline-block">
                  {heroSettings.highlightedWord}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground/60 max-w-lg leading-relaxed font-medium">
                {heroSettings.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 text-sm font-bold tracking-widest bg-accent hover:bg-accent/90 text-white rounded-xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1">
                  <Link href={heroSettings.button1Url || "/cozumler"}>{heroSettings.button1Text}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-sm font-bold tracking-widest border-2 border-border/50 hover:bg-accent/5 hover:border-accent hover:text-accent rounded-xl transition-all duration-300">
                  <Link href={heroSettings.button2Url || "/iletisim"}>{heroSettings.button2Text}</Link>
                </Button>
              </div>
            </motion.div>

            <div className="relative hidden md:block z-0">
              <ParallaxWrapper speed={0.15}>
                <HeroVisual />
              </ParallaxWrapper>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ÇÖZÜMLER & YETKİNLİKLER (Inverted Contrast) */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {features.map((feature: HomepageFeature, idx: number) => (
              <motion.div 
                key={feature.id || idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <span className="text-xl font-bold font-mono">{feature.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER (Yeni Kurumsal Alan) */}
      <section className="py-16 bg-background relative z-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <CountUp end={15} suffix="+" title="Yıllık Tecrübe" />
            <CountUp end={250} suffix="+" title="Başarılı Proje" />
            <CountUp end={100} suffix="+" title="Uzman Ekip" />
            <CountUp end={50} suffix="+" title="İş Ortağı" />
          </div>
        </div>
      </section>

      {/* 3. REFERANSLAR (Kayan Şerit - Marquee) */}
      <section className="py-20 border-b border-border bg-background overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
             <h3 className="text-sm font-mono tracking-[0.2em] text-muted-foreground uppercase">{tRefs('title')}</h3>
         </div>
         <Marquee speed={40}>
            {references.map((ref: string, idx: number) => (
                <div key={idx} className="flex items-center justify-center px-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold font-display text-foreground whitespace-nowrap">
                        {ref}
                    </span>
                </div>
            ))}
         </Marquee>
      </section>

      {/* 4. DİNAMİK KATEGORİLER (Backend'den Gelen Alan) */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display text-foreground">
              {tServices('title')} <span className="gradient-text">{tServices('titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
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
                <SpotlightCard className="group p-8 h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-bold">→</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 uppercase relative z-10">{cat.name}</h3>
                  <div className="flex flex-col gap-3 mb-6 relative z-10">
                    {cat.links?.map((link: { id: string | number; url: string; title: string }) => (
                      <Link 
                        key={link.id} 
                        href={link.url}
                        className="text-muted-foreground hover:text-accent font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent/50 transition-colors" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </SpotlightCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed border-border rounded-2xl bg-muted/30">
              <p className="text-muted-foreground">{tServices('noData')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. PROJE KONFİGÜRATÖRÜ (B2B Aracı) */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display text-background">
              Projenizi <span className="text-accent">Şekillendirin</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              İhtiyaçlarınıza en uygun teknoloji yığınını ve çözüm mimarisini interaktif aracımızla saniyeler içinde oluşturun.
            </p>
          </div>
          <ProjectConfigurator />
        </div>
      </section>

      {/* 6. İLETİŞİM / CTA BÖLÜMÜ */}
      <section className="py-24 relative bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-accent-lg relative overflow-hidden">
             
            <div className="text-center mb-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-display text-foreground mb-4"
                >
                  {tContact('title')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground"
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