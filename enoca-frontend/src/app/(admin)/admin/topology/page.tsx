"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Server, Globe, Database, Network, Workflow, Zap, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const regions = [
  { id: "eu-central-1", name: "Frankfurt (EU)", status: "active", type: "primary", users: "45K" },
  { id: "us-east-1", name: "N. Virginia (US)", status: "active", type: "replica", users: "12K" },
  { id: "ap-southeast-1", name: "Singapore (APAC)", status: "syncing", type: "replica", users: "8K" },
];

export default function TopologyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <AdminHeader title="Multi-Region Network Topology" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Intro */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Network className="w-6 h-6 text-indigo-500" /> Global Altyapı Mimarisi</h2>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sıfır Kesinti (Zero-Downtime) vizyonu ile kurulan 3 kıtaya yayılmış aktif/aktif veri merkezi bağlantıları.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <Workflow className="w-4 h-4" /> BGP Routing: ON
            </span>
          </div>
        </div>

        {/* Visual Map */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Global Load Balancer */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl shadow-blue-500/20 mb-4 relative">
                <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full" />
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                  <Globe className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h3 className="text-white font-bold text-center">Global Anycast LB</h3>
              <p className="text-xs text-blue-400 font-mono mt-1">1.1.1.1 / Route53</p>
            </motion.div>

            {/* Connections */}
            <div className="hidden md:flex flex-1 relative h-20 items-center justify-center">
               <div className="w-full h-1 bg-gray-800 relative">
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-1.5 bg-blue-500 shadow-[0_0_10px_#3B82F6]" 
                  />
                  <motion.div 
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-1.5 bg-emerald-500 shadow-[0_0_10px_#10B981]" 
                  />
               </div>
            </div>

            {/* Regions */}
            <div className="flex flex-col gap-6 w-full md:w-auto">
              {regions.map((region, idx) => (
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  key={region.id} 
                  className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex items-center gap-4 w-full md:w-80"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${region.type === 'primary' ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-gray-700 border border-gray-600'}`}>
                    {region.type === 'primary' ? <Database className="w-6 h-6 text-emerald-400" /> : <Server className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-bold text-sm">{region.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${region.status === 'active' ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span>{region.type.toUpperCase()}</span>
                      <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> {region.users} req/s</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs font-mono flex items-center gap-4">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-500" /> Cross-Region Replication: ~12ms</span>
          </div>
        </div>

      </div>
    </div>
  );
}
