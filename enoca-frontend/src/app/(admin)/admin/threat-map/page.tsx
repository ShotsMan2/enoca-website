"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Shield, Globe, Activity, Crosshair, Target, CheckCircle2, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThreatLog = {
  id: string;
  sourceIp: string;
  country: string;
  target: string;
  type: string;
  status: "blocked" | "mitigated" | "analyzing";
  severity: "high" | "medium" | "low";
  time: string;
};

const COUNTRIES = ["CN", "RU", "US", "IR", "KP", "BR", "IN"];
const TYPES = ["DDoS HTTP Flood", "SQL Injection", "Cross-Site Scripting", "Botnet Ping", "Brute Force"];

export default function ThreatMapPage() {
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<ThreatLog[]>([]);
  const [attackIntensity, setAttackIntensity] = useState(12);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const interval = setInterval(() => {
      setAttackIntensity(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, Math.min(80, prev + change));
      });

      if (Math.random() > 0.4) {
        const newThreat: ThreatLog = {
          id: `THT-${Math.floor(Math.random() * 10000)}`,
          sourceIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.x.x`,
          country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
          target: ["api.enoca.com", "auth.enoca.com", "db.enoca.internal"][Math.floor(Math.random() * 3)],
          type: TYPES[Math.floor(Math.random() * TYPES.length)],
          status: Math.random() > 0.8 ? "mitigated" : "blocked",
          severity: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
          time: new Date().toLocaleTimeString("tr-TR")
        };

        setLogs(prev => [newThreat, ...prev].slice(0, 8)); // Keep last 8 logs
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-black text-gray-300">
      <AdminHeader title="Siber Tehdit İstihbaratı" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Top Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30">
                <Target className="w-6 h-6 text-red-500 animate-pulse" />
              </div>
              <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-500/20">DEFCON 4</span>
            </div>
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Tehdit Seviyesi</h3>
            <p className="text-3xl font-black text-white">{attackIntensity} <span className="text-sm font-medium text-gray-500">Atk/Sn</span></p>
          </div>

          <div className="bg-gray-900/50 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">WAF Filtreleme</h3>
            <p className="text-3xl font-black text-white">%99.98 <span className="text-sm font-medium text-gray-500">Engellendi</span></p>
          </div>

          <div className="bg-gray-900/50 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">DDoS Mitigasyonu</h3>
            <p className="text-3xl font-black text-white">Aktif <span className="text-sm font-medium text-gray-500">Kapasite: 50Tbps</span></p>
          </div>
        </div>

        {/* Cyber Map Visual (Simulated) */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 relative h-[400px] overflow-hidden flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center opacity-10 bg-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          <div className="relative z-20 text-center space-y-4">
            <Map className="w-16 h-16 text-gray-600 mx-auto opacity-50" />
            <p className="font-mono text-sm text-green-500/70 tracking-widest uppercase">Global Sensor Network: Online</p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>

          {/* Random Radar Sweep Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-500/10 rounded-full animate-spin-slow pointer-events-none">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-green-500/10 rounded-full" />
          </div>
        </div>

        {/* Live Attack Feed */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
            <h3 className="font-bold text-white flex items-center gap-2"><Crosshair className="w-5 h-5 text-red-500" /> Canlı Atak Logları</h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live Feed
            </div>
          </div>
          
          <div className="space-y-3 font-mono text-xs overflow-hidden">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 items-center bg-gray-950/50 border border-gray-800 p-3 rounded-lg hover:border-gray-700 transition-colors"
                >
                  <div className="col-span-2 text-gray-500">{log.time}</div>
                  <div className="col-span-1 text-center font-bold text-white bg-gray-800 rounded px-1">{log.country}</div>
                  <div className="col-span-2 text-red-400">{log.sourceIp}</div>
                  <div className="col-span-3 text-yellow-400">{log.type}</div>
                  <div className="col-span-2 text-blue-400">{log.target}</div>
                  <div className="col-span-2 flex justify-end">
                    {log.status === "blocked" ? (
                      <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded font-bold"><Shield className="w-3 h-3" /> BLOCKED</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-orange-500 bg-orange-500/10 px-2 py-1 rounded font-bold"><Activity className="w-3 h-3" /> MITIGATED</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && (
              <div className="text-center py-8 text-gray-600 font-sans flex flex-col items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500/50" />
                <p>Aktif bir tehdit algılanmadı.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
