"use client";

import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Leaf, TrendingUp, Users, ShieldCheck, Download, ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";
import { useTranslations } from "next-intl";

const financialData = [
  { year: "2020", revenue: 45, profit: 12 },
  { year: "2021", revenue: 62, profit: 18 },
  { year: "2022", revenue: 85, profit: 26 },
  { year: "2023", revenue: 120, profit: 38 },
  { year: "2024", revenue: 165, profit: 54 },
  { year: "2025", revenue: 230, profit: 78 }
];

export default function YatirimciClient() {
  const t = useTranslations('InvestorRelations');
  const [mounted, setMounted] = useState(false);

  const esgData = [
    { metric: t('esgMetric1'), val: 85 },
    { metric: t('esgMetric2'), val: 42 },
    { metric: t('esgMetric3'), val: 100 },
    { metric: t('esgMetric4'), val: 75 }
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-background min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[150px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
              <TrendingUp className="w-4 h-4" /> {t('tag')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6 leading-tight">
              {t('title1')}<span className="text-accent">{t('title2')}</span>{t('title3')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatCard icon={<TrendingUp className="w-6 h-6 text-blue-500" />} title={t('stat1Title')} value="%45+" desc={t('stat1Desc')} />
            <StatCard icon={<Leaf className="w-6 h-6 text-green-500" />} title={t('stat2Title')} value="Net Zero" desc={t('stat2Desc')} />
            <StatCard icon={<Users className="w-6 h-6 text-purple-500" />} title={t('stat3Title')} value="450+" desc={t('stat3Desc')} />
            <StatCard icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />} title={t('stat4Title')} value="A+" desc={t('stat4Desc')} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{t('financeTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('financeDesc')}</p>
                </div>
                <button className="p-2 bg-muted rounded-xl hover:bg-accent hover:text-white transition-colors text-muted-foreground">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="year" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0.75rem', color: 'var(--foreground)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name={t('chartRev')} />
                    <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProf)" name={t('chartProf')} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{t('esgTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-8">{t('esgDesc')}</p>
                
                <div className="space-y-6">
                  {esgData.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-foreground">{item.metric}</span>
                        <span className="text-accent">%{item.val}</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-accent to-blue-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <button onClick={() => window.print()} className="flex items-center gap-2 text-accent font-bold hover:underline">
                  {t('esgDownload')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-foreground">{t('reportsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: t('report1'), type: "PDF", size: "2.4 MB" },
                { title: t('report2'), type: "PPTX", size: "15.1 MB" },
                { title: t('report3'), type: "PDF", size: "1.2 MB" },
              ].map((doc, idx) => (
                <div onClick={() => window.print()} key={idx} className="p-6 border border-border rounded-2xl bg-muted/30 hover:bg-muted transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-background border border-border text-muted-foreground text-xs font-bold rounded-lg">{doc.type}</span>
                    <Download className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.size}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}

function StatCard({ icon, title, value, desc }: { icon: React.ReactNode; title: string; value: string; desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-sm font-bold text-muted-foreground mb-1">{title}</h4>
      <p className="text-3xl font-black text-foreground mb-2">{value}</p>
      <p className="text-xs font-medium text-accent">{desc}</p>
    </motion.div>
  );
}
