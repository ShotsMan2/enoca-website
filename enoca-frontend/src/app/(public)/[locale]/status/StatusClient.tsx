"use client";

import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { CheckCircle2 } from "lucide-react";
import * as motion from "framer-motion/client";

const services = [
  { name: "Global API Gateway", status: "operational", uptime: "99.99%" },
  { name: "B2B E-Commerce Core", status: "operational", uptime: "100%" },
  { name: "SAP Integration Layer", status: "operational", uptime: "99.98%" },
  { name: "Content Delivery Network (CDN)", status: "operational", uptime: "100%" },
  { name: "Identity & Access Management", status: "operational", uptime: "99.99%" },
  { name: "Analytics Engine", status: "degraded", uptime: "99.90%" }
];

export default function StatusClient() {
  const [mounted, setMounted] = useState(false);
  const [uptimeDays, setUptimeDays] = useState<number[]>([]);

  useEffect(() => {
    const days = Array.from({ length: 90 }, () => {
      const rand = Math.random();
      if (rand > 0.98) return 0;
      if (rand > 0.95) return 1;
      return 2;
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUptimeDays(days);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-black text-foreground mb-4 flex items-center gap-4">
              Sistem Durumu <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-green-200 dark:border-green-800">Tüm Sistemler Aktif</span>
            </h1>
            <p className="text-muted-foreground text-lg">Enoca bulut servislerinin canlı durum ve kesinti raporları.</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 mb-12 shadow-xl shadow-green-500/20 text-white flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black">Sistem Sağlıklı</h2>
                <p className="text-green-100 font-medium">Son güncellenme: {new Date().toLocaleTimeString('tr-TR')}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-100 uppercase tracking-widest text-xs font-bold mb-1">Gecikme (Latency)</p>
              <p className="text-3xl font-black flex items-center justify-center md:justify-end gap-2">
                12<span className="text-lg font-medium text-green-200">ms</span>
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">90 Günlük Geçmiş</h3>
              <span className="text-sm font-medium text-muted-foreground">%99.98 Kesintisiz</span>
            </div>
            <div className="flex gap-1 h-12 w-full">
              {uptimeDays.map((status, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-sm transition-opacity hover:opacity-70 cursor-pointer ${
                    status === 2 ? "bg-green-500" : status === 1 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  title={`Gün ${90-i} - ${status === 2 ? 'Sorunsuz' : status === 1 ? 'Kısmi Kesinti' : 'Tam Kesinti'}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs font-bold text-muted-foreground uppercase">
              <span>90 Gün Önce</span>
              <span>Bugün</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-6">Servis Detayları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {services.map((service, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${service.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                  <span className="font-semibold text-foreground">{service.name}</span>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold capitalize ${service.status === 'operational' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    {service.status === 'operational' ? 'Aktif' : 'Gecikmeli'}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{service.uptime}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-6">Geçmiş Olaylar</h3>
          <div className="space-y-6">
            <div className="relative pl-8 border-l-2 border-border pb-8">
              <div className="absolute w-4 h-4 bg-background border-2 border-green-500 rounded-full -left-[9px] top-1" />
              <p className="text-sm font-bold text-muted-foreground mb-1">Dün</p>
              <h4 className="font-bold text-foreground text-lg mb-2">Planlı Bakım Tamamlandı</h4>
              <p className="text-muted-foreground">Veritabanı optimizasyonu başarıyla tamamlandı. Herhangi bir kesinti yaşanmadı.</p>
            </div>
            <div className="relative pl-8 border-l-2 border-border">
              <div className="absolute w-4 h-4 bg-background border-2 border-yellow-500 rounded-full -left-[9px] top-1" />
              <p className="text-sm font-bold text-muted-foreground mb-1">14 Gün Önce</p>
              <h4 className="font-bold text-foreground text-lg mb-2">API Gecikme Sorunu (Çözüldü)</h4>
              <p className="text-muted-foreground">EU-Central-1 bölgesinde yaşanan ağ dalgalanması nedeniyle oluşan kısmi gecikme 12 dakika içinde çözümlendi.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
