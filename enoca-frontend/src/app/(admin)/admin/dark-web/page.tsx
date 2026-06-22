"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Ghost, ShieldAlert, CheckCircle2, AlertTriangle, Eye, Search, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";

type LeakAlert = {
  id: string;
  source: string;
  type: string;
  severity: "high" | "critical" | "low";
  date: string;
  status: "investigating" | "resolved";
};

const mockAlerts: LeakAlert[] = [
  { id: "DW-901", source: "RaidForums Archive", type: "Employee Credential Leak", severity: "high", date: "2024-11-12", status: "resolved" },
  { id: "DW-902", source: "Telegram Group (APT-29)", type: "Brand Mention", severity: "low", date: "2024-12-05", status: "resolved" },
  { id: "DW-903", source: "BreachForums", type: "Fake Phishing Domain", severity: "critical", date: new Date().toISOString().split('T')[0], status: "investigating" }
];

export default function DarkWebMonitorPage() {
  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scannedNodes, setScannedNodes] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const interval = setInterval(() => {
      setScannedNodes(prev => {
        if (prev > 15000) {
          setScanning(false);
          clearInterval(interval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 500) + 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#050505] text-gray-300">
      <AdminHeader title="Dark Web & Marka Koruması" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Scanner Status */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10 mb-6 md:mb-0">
            <div className="relative w-20 h-20 flex items-center justify-center bg-gray-900 rounded-2xl border border-gray-800">
              <Ghost className={`w-10 h-10 ${scanning ? 'text-purple-500 animate-pulse' : 'text-gray-500'}`} />
              {scanning && (
                <div className="absolute inset-0 border-2 border-purple-500/50 rounded-2xl animate-ping" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Deep Scan Motoru</h2>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                {scanning ? (
                  <><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> Aktif Tarama Yapılıyor</>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-emerald-500" /> Tarama Tamamlandı</>
                )}
              </p>
            </div>
          </div>

          <div className="text-center md:text-right relative z-10">
             <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Taranan Onion Node&apos;ları</p>
             <p className="text-4xl font-black text-white font-mono">{scannedNodes.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-black text-white">2.4M</span>
            </div>
            <h3 className="text-sm font-bold text-gray-400">Taranan Sızıntı Verisi</h3>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertOctagon className="w-5 h-5 text-rose-500" />
              </div>
              <span className="text-2xl font-black text-rose-500">1</span>
            </div>
            <h3 className="text-sm font-bold text-gray-400">Aktif Risk Bildirimi</h3>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-2xl font-black text-emerald-500">%100</span>
            </div>
            <h3 className="text-sm font-bold text-gray-400">Marka Koruma Skoru</h3>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
           <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2"><Eye className="w-5 h-5 text-purple-500" /> Son Tespitler</h3>
           
           <div className="space-y-4">
             {mockAlerts.map((alert, idx) => (
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.2 }}
                 key={alert.id}
                 className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-colors"
               >
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                     alert.severity === 'critical' ? 'bg-rose-500/20 border border-rose-500/30' :
                     alert.severity === 'high' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-gray-800 border border-gray-700'
                   }`}>
                     {alert.severity === 'critical' && <AlertOctagon className="w-6 h-6 text-rose-500" />}
                     {alert.severity === 'high' && <AlertTriangle className="w-6 h-6 text-orange-500" />}
                     {alert.severity === 'low' && <Search className="w-6 h-6 text-gray-500" />}
                   </div>
                   <div>
                     <h4 className="text-white font-bold">{alert.type}</h4>
                     <p className="text-sm text-gray-500 font-mono mt-1">Kaynak: {alert.source}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                   <span className="text-xs text-gray-500 font-mono">{alert.date}</span>
                   {alert.status === 'investigating' ? (
                     <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                       <Eye className="w-3 h-3" /> İnceleniyor
                     </span>
                   ) : (
                     <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                       <CheckCircle2 className="w-3 h-3" /> Çözüldü
                     </span>
                   )}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
