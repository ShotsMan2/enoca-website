"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Server, Cloud, Shield, ChevronRight, Activity, Database, Smartphone } from "lucide-react";
import { Link } from "@/i18n/routing";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { useTranslations } from "next-intl";

export default function ProjectConfigurator() {
  const t = useTranslations('Configurator');
  const { step, selections, nextStep, setCompanySize, setPrimaryGoal, toggleTech, reset } = useConfiguratorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Ensure hydration matching for zustand persist
  if (!mounted) {
    return <div className="min-h-[400px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const calculateRecommendation = () => {
    const recs = [];
    if (selections.primaryGoal === "ecommerce") recs.push("SAP CX Hybris B2B/B2C");
    if (selections.primaryGoal === "migration") recs.push("SAP Cloud Platform");
    if (selections.primaryGoal === "monitoring") recs.push("vFabric Hyperic & Nagios");
    
    if (selections.companySize === "enterprise") recs.push("SAP HANA (In-Memory Database)");
    if (selections.preferredTech.includes("mobile")) recs.push("SAP Mobility Solutions");
    
    return recs.length > 0 ? recs : ["SAP Kurumsal Mimari Danışmanlığı"];
  };

  return (
    <div className="bg-card border border-accent/20 clip-chamfer shadow-glow-lg overflow-hidden max-w-4xl mx-auto my-12 relative z-20">
      {/* Progress Bar */}
      <div className="flex w-full h-1 bg-background">
        <motion.div 
          className="h-full bg-accent shadow-glow-sm"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-sm font-mono tracking-widest text-accent font-bold uppercase mb-2">{t('titleBadge')}</h2>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono">{t('title')}</h3>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h4 className="text-lg font-bold text-foreground mb-4">{t('sizeLabel')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "startup", title: t('sizeStartup'), desc: t('sizeStartupDesc') },
                    { id: "mid", title: t('sizeMid'), desc: t('sizeMidDesc') },
                    { id: "enterprise", title: t('sizeEnterprise'), desc: t('sizeEnterpriseDesc') },
                    { id: "global", title: t('sizeGlobal'), desc: t('sizeGlobalDesc') }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setCompanySize(opt.id);
                        nextStep();
                      }}
                      className={`p-6 clip-chamfer border-2 text-left transition-all ${selections.companySize === opt.id ? 'border-accent bg-accent/10 shadow-glow-sm' : 'border-border bg-background hover:border-accent/50'}`}
                    >
                      <h4 className={`text-lg font-bold mb-1 font-mono uppercase ${selections.companySize === opt.id ? 'text-accent' : 'text-foreground'}`}>{opt.title}</h4>
                      <p className="text-xs font-mono text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h4 className="text-lg font-bold text-foreground mb-4">{t('goalLabel')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "ecommerce", title: t('goalEcommerce'), icon: <Activity className="w-5 h-5" /> },
                    { id: "migration", title: t('goalMigration'), icon: <Server className="w-5 h-5" /> },
                    { id: "monitoring", title: t('goalMonitoring'), icon: <Activity className="w-5 h-5" /> },
                    { id: "support", title: t('goalSupport'), icon: <Shield className="w-5 h-5" /> }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setPrimaryGoal(opt.id);
                        nextStep();
                      }}
                      className="p-6 clip-chamfer border-2 text-left border-border bg-background hover:border-accent/50 transition-all flex flex-col items-start hover:shadow-glow-sm group"
                    >
                      <div className="text-muted-foreground group-hover:text-accent transition-colors mb-2">{opt.icon}</div>
                      <h4 className="text-sm font-bold text-foreground leading-tight uppercase font-mono">{opt.title}</h4>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h4 className="text-lg font-bold text-foreground mb-4">{t('techLabel')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "web", title: t('techWeb'), icon: <Cloud className="w-5 h-5" /> },
                    { id: "mobile", title: t('techMobile'), icon: <Smartphone className="w-5 h-5" /> },
                    { id: "api", title: t('techAPI'), icon: <Database className="w-5 h-5" /> },
                    { id: "analytics", title: t('techAnalytics'), icon: <Activity className="w-5 h-5" /> }
                  ].map((opt) => {
                    const isSelected = selections.preferredTech.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          toggleTech(opt.id);
                        }}
                        className={`p-4 clip-chamfer border-2 flex items-center gap-3 transition-all ${isSelected ? 'border-accent bg-accent/10 shadow-glow-sm' : 'border-border bg-background'}`}
                      >
                        <div className={`${isSelected ? 'text-accent' : 'text-muted-foreground'}`}>{opt.icon}</div>
                        <span className={`text-sm font-bold font-mono uppercase ${isSelected ? 'text-accent' : 'text-foreground'}`}>{opt.title}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg text-center">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h4 className="text-xl font-black text-foreground uppercase tracking-wide mb-4">{t('resultTitle')}</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {calculateRecommendation().map((rec, idx) => (
                      <span key={idx} className="bg-background text-accent px-4 py-2 rounded font-mono text-sm border border-accent/30 shadow-glow-sm">
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button 
                    onClick={reset}
                    className="px-6 py-3 border border-border text-foreground rounded hover:bg-muted font-bold tracking-wide transition-colors"
                  >
                    {t('resetBtn')}
                  </button>
                  <Link href="/iletisim" className="px-6 py-3 bg-accent text-accent-foreground font-bold rounded hover:bg-accent/90 tracking-wide shadow-glow-sm transition-all flex items-center justify-center gap-2 group">
                    {t('contactBtn')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="mt-10 flex justify-end">
            <button 
              onClick={nextStep}
              className="px-8 py-3 bg-accent text-accent-foreground font-bold rounded hover:bg-accent/90 tracking-wide shadow-glow-sm transition-all flex items-center gap-2 group"
            >
              {t('nextBtn')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
