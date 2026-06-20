"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { adminApi, type ActivityLog } from "@/lib/admin-api";
import { Search, Filter, Calendar, Activity, Download } from "lucide-react";

export default function LogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    adminApi.getLogs().then(data => {
      setLogs(data);
      setFilteredLogs(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = logs;
    if (search) {
      result = result.filter(l => l.action.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase()));
    }
    if (typeFilter !== "all") {
      result = result.filter(l => l.action.includes(typeFilter)); // Basit filtreleme
    }
    if (dateFilter) {
      result = result.filter(l => l.timestamp.startsWith(dateFilter));
    }
    setFilteredLogs(result);
  }, [search, typeFilter, dateFilter, logs]);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Tarih,Aksiyon,Detay\n" 
      + filteredLogs.map(e => `${e.id},${new Date(e.timestamp).toISOString()},"${e.action}","${e.details}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sistem_loglari_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueActionKeywords = ["Oturum", "İçerik", "Mesaj", "Ayarlar", "Yedek", "Haber", "Kariyer"];

  return (
    <>
      <AdminHeader title="Sistem Logları (Audit Trail)" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Üst Alan: Başlık ve Dışa Aktar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" /> Detaylı Log Kayıtları
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Sistem üzerindeki tüm değişiklikleri ve girişleri geriye dönük izleyin.
              </p>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> CSV İndir
            </button>
          </div>

          {/* Filtreler */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Loglarda ara (Aksiyon veya detay)..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 dark:text-white" 
              />
            </div>
            <div className="relative w-full md:w-48">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select 
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 dark:text-white appearance-none cursor-pointer"
              >
                <option value="all">Tüm Tipler</option>
                {uniqueActionKeywords.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="relative w-full md:w-48">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="date" 
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]" 
              />
            </div>
          </div>

          {/* Log Tablosu */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="p-12 flex justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-sm font-medium">Bu kriterlere uygun log bulunamadı.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold w-48">Tarih / Saat</th>
                      <th className="px-6 py-4 font-semibold w-64">Aksiyon Tipi</th>
                      <th className="px-6 py-4 font-semibold">Detaylar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString("tr-TR")}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="text-center text-xs text-gray-400 mt-4">
            Toplam {filteredLogs.length} log gösteriliyor. Eski kayıtlar periyodik olarak temizlenir.
          </div>

        </div>
      </main>
    </>
  );
}
