"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Server, Cloud, Shield, ChevronRight, Activity, Database, Smartphone } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function ProjectConfigurator() {
  const [step, setStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    companySize: "",
    primaryGoal: "",
    preferredTech: [] as string[]
  });

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handleReset = () => {
    setStep(1);
    setSelections({ companySize: "", primaryGoal: "", preferredTech: [] });
  };

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
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden max-w-4xl mx-auto my-12 relative z-20">
      {/* Progress Bar */}
      <div className="flex w-full h-1 bg-gray-100 dark:bg-gray-800">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-sm font-mono tracking-widest text-blue-600 font-bold uppercase mb-2">Proje Konfigüratörü</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">İhtiyaçlarınızı Belirleyin</h3>
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
                <p className="text-gray-600 dark:text-gray-400 font-medium">Şirket büyüklüğünüz nedir?</p>
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
                        setSelections({ ...selections, companySize: opt.id });
                        handleNext();
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${selections.companySize === opt.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'}`}
                    >
                      <h4 className={`text-lg font-bold mb-1 ${selections.companySize === opt.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{opt.title}</h4>
                      <p className="text-sm text-gray-500">{opt.desc}</p>
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
                <p className="text-gray-600 dark:text-gray-400 font-medium">Ana hedefiniz nedir?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "ecommerce", title: "E-Ticaret Dönüşümü", icon: <Database className="w-6 h-6 mb-3" /> },
                    { id: "migration", title: "Bulut Mimari & Göç", icon: <Cloud className="w-6 h-6 mb-3" /> },
                    { id: "monitoring", title: "Sistem İzleme & Güvenlik", icon: <Shield className="w-6 h-6 mb-3" /> }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelections({ ...selections, primaryGoal: opt.id });
                        handleNext();
                      }}
                      className="p-6 rounded-2xl border-2 text-left border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all flex flex-col items-start hover:shadow-lg dark:hover:bg-gray-800/50"
                    >
                      <div className="text-blue-600 dark:text-blue-400">{opt.icon}</div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{opt.title}</h4>
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
                <p className="text-gray-600 dark:text-gray-400 font-medium">Odaklanmak istediğiniz teknolojiler (Çoklu Seçim):</p>
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
                          const tech = isSelected 
                            ? selections.preferredTech.filter(t => t !== opt.id)
                            : [...selections.preferredTech, opt.id];
                          setSelections({ ...selections, preferredTech: tech });
                        }}
                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${isSelected ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800'}`}
                      >
                        <div className={`${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>{opt.icon}</div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{opt.title}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-8">
                  <button onClick={handleNext} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
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
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Önerilen Çözüm Mimariniz</h3>
                <p className="text-gray-500 mb-8">Verdiğiniz bilgilere dayanarak sizin için en uygun teknoloji yığınını oluşturduk:</p>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 text-left space-y-3 mb-8 border border-gray-100 dark:border-gray-800">
                  {calculateRecommendation().map((rec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-xl">
                    Detaylı Rapor İste
                  </button>
                  <button onClick={handleReset} className="px-8 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
