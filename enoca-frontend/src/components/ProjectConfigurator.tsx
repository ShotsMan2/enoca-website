"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Server, Cloud, Shield, ChevronRight, Activity, Database, Smartphone } from "lucide-react";

import { useConfiguratorStore } from "@/store/configuratorStore";


export default function ProjectConfigurator() {
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
          <h2 className="text-sm font-mono tracking-widest text-accent font-bold uppercase mb-2">Proje Konfigüratörü</h2>
          <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase font-mono">İhtiyaçlarınızı Belirleyin</h3>
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
                <p className="text-muted-foreground font-mono">Şirket büyüklüğünüz nedir?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "startup", title: "Girişim / KOBİ", desc: "1-50 Çalışan" },
                    { id: "mid", title: "Orta Ölçekli", desc: "51-500 Çalışan" },
                    { id: "enterprise", title: "Enterprise", desc: "500+ Çalışan" },
                    { id: "global", title: "Global / Çok Uluslu", desc: "Birden fazla ülkede operasyon" }
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
                <p className="text-muted-foreground font-mono">Ana hedefiniz nedir?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "ecommerce", title: "E-Ticaret Dönüşümü", icon: <Database className="w-6 h-6 mb-3" /> },
                    { id: "migration", title: "Bulut Mimari & Göç", icon: <Cloud className="w-6 h-6 mb-3" /> },
                    { id: "monitoring", title: "Sistem İzleme & Güvenlik", icon: <Shield className="w-6 h-6 mb-3" /> }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setPrimaryGoal(opt.id);
                        nextStep();
                      }}
                      className="p-6 clip-chamfer border-2 text-left border-border bg-background hover:border-accent/50 transition-all flex flex-col items-start hover:shadow-glow-sm group"
                    >
                      <div className="text-muted-foreground group-hover:text-accent transition-colors">{opt.icon}</div>
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
                <p className="text-muted-foreground font-mono">Odaklanmak istediğiniz teknolojiler (Çoklu Seçim):</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "mobile", title: "Mobil Uygulamalar", icon: <Smartphone className="w-5 h-5" /> },
                    { id: "analytics", title: "Veri Analitiği (HANA)", icon: <Activity className="w-5 h-5" /> },
                    { id: "api", title: "API Gateway", icon: <Server className="w-5 h-5" /> }
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
                <div className="flex justify-end mt-8">
                  <button onClick={nextStep} className="px-6 py-3 bg-accent hover:bg-white text-accent-foreground font-black uppercase tracking-wider clip-chamfer flex items-center gap-2 transition-colors shadow-glow-sm">
                    Sonuçları Gör <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 border border-accent flex items-center justify-center mx-auto mb-6 clip-diagonal shadow-glow-md">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-black text-foreground uppercase tracking-widest font-mono mb-2">Önerilen Çözüm Mimariniz</h3>
                <p className="text-muted-foreground font-mono mb-8">Verdiğiniz bilgilere dayanarak sizin için en uygun teknoloji yığınını oluşturduk:</p>
                
                <div className="bg-background clip-chamfer p-6 text-left space-y-3 mb-8 border border-border shadow-inner">
                  {calculateRecommendation().map((rec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent shadow-glow-sm rounded-none" />
                      <span className="font-bold text-foreground font-mono uppercase">{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3.5 bg-accent text-accent-foreground font-black uppercase tracking-widest clip-chamfer hover:bg-white transition-colors shadow-glow-md">
                    Detaylı Rapor İste
                  </button>
                  <button onClick={reset} className="px-8 py-3.5 bg-transparent border border-accent/40 text-accent font-bold uppercase tracking-widest clip-chamfer hover:bg-accent/10 transition-colors">
                    Yeniden Başla
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
