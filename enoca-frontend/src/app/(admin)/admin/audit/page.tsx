"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { ShieldAlert, Search, Filter, ShieldCheck, UserCog, Database, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  status: "success" | "warning" | "danger";
  details: string;
};

const mockLogs: AuditLog[] = [
  { id: "AUD-991", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), user: "admin@enoca.com", action: "UPDATE_CONFIG", resource: "system.firewall", ip: "192.168.1.45", status: "success", details: "WAF rules updated." },
  { id: "AUD-990", timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(), user: "system", action: "SCALE_UP", resource: "k8s-cluster-eu1", ip: "internal", status: "success", details: "Auto-scaled to 8 nodes." },
  { id: "AUD-989", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), user: "j.doe@enoca.com", action: "FAILED_LOGIN", resource: "auth.service", ip: "45.22.11.90", status: "danger", details: "Invalid password attempt." },
  { id: "AUD-988", timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), user: "admin@enoca.com", action: "DELETE_USER", resource: "users.db", ip: "192.168.1.45", status: "warning", details: "Deleted legacy user account." },
  { id: "AUD-987", timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), user: "admin@enoca.com", action: "EXPORT_DATA", resource: "analytics.db", ip: "192.168.1.45", status: "success", details: "Exported Q3 report." },
  { id: "AUD-986", timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), user: "system", action: "DB_BACKUP", resource: "main.db", ip: "internal", status: "success", details: "Daily automated backup." },
];

export default function AuditLogsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = mockLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-gray-950">
      <AdminHeader title="Denetim İzleri (Audit Logs)" />
      
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Top Info */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-md">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">ISO 27001 Uyumlu Kayıtlar</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sistemdeki tüm eylemler değiştirilemez biçimde (immutable) loglanmaktadır.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase">Son 24 Saat</p>
              <p className="text-xl font-black text-gray-900 dark:text-white mt-1">1,248 <span className="text-sm font-medium text-gray-400">İşlem</span></p>
            </div>
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 text-center">
              <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Kritik Olay</p>
              <p className="text-xl font-black text-red-700 dark:text-red-300 mt-1">1</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Aksiyon, Kullanıcı veya Kaynak Ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filtrele
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID / Zaman</th>
                  <th className="px-6 py-4">Kullanıcı</th>
                  <th className="px-6 py-4">Aksiyon</th>
                  <th className="px-6 py-4">Kaynak</th>
                  <th className="px-6 py-4">IP Adresi</th>
                  <th className="px-6 py-4">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((log, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={log.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-mono text-gray-900 dark:text-white font-bold">{log.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString("tr-TR")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {log.user === "system" ? <Database className="w-4 h-4 text-blue-500" /> : <UserCog className="w-4 h-4 text-gray-400" />}
                        <span className="font-medium text-gray-700 dark:text-gray-300">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded font-mono text-xs font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{log.resource}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.ip}</td>
                    <td className="px-6 py-4">
                      {log.status === "success" && <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold"><ShieldCheck className="w-4 h-4" /> Başarılı</span>}
                      {log.status === "warning" && <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 font-bold"><AlertTriangle className="w-4 h-4" /> Uyarı</span>}
                      {log.status === "danger" && <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold"><ShieldAlert className="w-4 h-4" /> İhlal</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Kayıt bulunamadı.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
