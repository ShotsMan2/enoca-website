"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Activity, Server, Database, Globe, Cpu, Wifi, Shield, ArrowUpRight, ArrowDownRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [serverLoad, setServerLoad] = useState<number[]>(Array(20).fill(30));
  const [activeUsers, setActiveUsers] = useState(124);
  const [logs, setLogs] = useState<string[]>([]);
  const [bandwidth, setBandwidth] = useState<{ time: string; upload: number; download: number }[]>(
    Array(20).fill({ time: "0", upload: 50, download: 100 })
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const interval = setInterval(() => {
      // Simulate changing server load
      setServerLoad(prev => {
        const newArr = [...prev.slice(1)];
        newArr.push(Math.floor(Math.random() * 40) + 20); // 20-60%
        return newArr;
      });

      // Simulate changing users
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        return Math.max(50, prev + change);
      });

      // Simulate bandwidth
      setBandwidth(prev => {
        const newArr = [...prev.slice(1)];
        const time = new Date().toLocaleTimeString("tr-TR", { minute: "2-digit", second: "2-digit" });
        newArr.push({
          time,
          upload: Math.floor(Math.random() * 50) + 10,
          download: Math.floor(Math.random() * 150) + 50
        });
        return newArr;
      });

      // Add a log rarely
      if (Math.random() > 0.7) {
        setLogs(prev => {
          const statuses = ["INFO", "WARN", "SEC"];
          const msgs = ["Worker process scaled up", "API Latency spike detected", "Auth token refreshed", "Cache hit ratio dropped below 80%", "New connection from EU-Central-1"];
          const newLog = `[${new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}] ${statuses[Math.floor(Math.random()*statuses.length)]}: ${msgs[Math.floor(Math.random()*msgs.length)]}`;
          return [...prev.slice(-14), newLog]; // Keep last 15 logs
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const loadData = serverLoad.map((val, i) => ({ name: i.toString(), load: val }));

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <AdminHeader title="NOC Analytics Merkezi" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Aktif Kullanıcılar" value={activeUsers.toString()} icon={<Globe className="w-5 h-5 text-blue-500" />} trend="+12%" up />
          <StatCard title="Sistem Yükü (CPU)" value={`${serverLoad[serverLoad.length-1]}%`} icon={<Cpu className="w-5 h-5 text-indigo-500" />} trend="Stabil" />
          <StatCard title="Veritabanı (IOPS)" value="4.2K" icon={<Database className="w-5 h-5 text-emerald-500" />} trend="+5%" up />
          <StatCard title="Ağ Trafiği" value="1.2 Gbps" icon={<Wifi className="w-5 h-5 text-purple-500" />} trend="-2%" />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500" /> Ağ Bant Genişliği (Live)</h3>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg uppercase tracking-wider animate-pulse">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Canlı
              </span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bandwidth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#FFF' }}
                  />
                  <Area type="monotone" dataKey="download" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorDownload)" name="İndirme (Mbps)" />
                  <Area type="monotone" dataKey="upload" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorUpload)" name="Yükleme (Mbps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><Terminal className="w-5 h-5 text-gray-500" /> Sistem Logları</h3>
            <div className="flex-1 bg-gray-950 rounded-xl p-4 font-mono text-xs overflow-y-auto border border-gray-800 relative">
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none" />
              <div className="space-y-2 relative z-0">
                {logs.length === 0 ? (
                  <p className="text-gray-600">Sistem başlatılıyor...</p>
                ) : (
                  logs.map((log, i) => {
                    let color = "text-gray-400";
                    if (log.includes("INFO")) color = "text-blue-400";
                    if (log.includes("WARN")) color = "text-yellow-400";
                    if (log.includes("SEC")) color = "text-red-400";
                    
                    return (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={color}
                      >
                        {log}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><Server className="w-5 h-5 text-emerald-500" /> Sunucu Yükü (Kümeler)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" hide />
                  <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.75rem', color: '#FFF' }} />
                  <Line type="step" dataKey="load" stroke="#10B981" strokeWidth={3} dot={false} animationDuration={300} name="CPU %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />
            <div className="relative z-10 flex items-center justify-between mb-8">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Shield className="w-5 h-5 text-rose-500" /> Güvenlik Duvarı Durumu</h3>
               <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold rounded-lg uppercase">Aktif Koruma</span>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
               <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bloklanan Tehdit</p>
                 <p className="text-3xl font-black text-gray-900 dark:text-white">1,204</p>
               </div>
               <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">WAF Filtresi</p>
                 <p className="text-3xl font-black text-gray-900 dark:text-white">99.9%</p>
               </div>
               <div className="col-span-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-bold text-blue-900 dark:text-blue-300">DDOS Kalkanı</p>
                   <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Son 24 saatte saldırı tespit edilmedi.</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                   <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, up }: { title: string; value: string; icon: React.ReactNode; trend: string; up?: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          trend === 'Stabil' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
          up ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
          {trend !== 'Stabil' && (up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />)}
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
        <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
