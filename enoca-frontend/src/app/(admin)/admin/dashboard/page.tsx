"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { adminApi, type Stats, type NewsItem, type ContactMessage, type ActivityLog } from "@/lib/admin-api";
import Link from "next/link";
import { Clock, TrendingUp, Users, Server, Cpu, HardDrive } from "lucide-react";
import { TrafficChart, InteractionChart } from "@/components/admin/DashboardCharts";
/* eslint-disable @next/next/no-img-element */

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getStats(),
      adminApi.getNews(),
      adminApi.getMessages(),
      adminApi.getLogs()
    ]).then(([s, n, m, l]) => {
      setStats(s);
      setRecentNews(n.slice(0, 4));
      setRecentMessages(m.slice(0, 5));
      setLogs(l.slice(0, 10)); // Son 10 log
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Toplam Proje"
            value={loading ? "—" : stats!.totalProjects}
            change="12%"
            positive
            color="blue"
            sparklineData={[10, 25, 15, 40, 35, 50, 70]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <StatsCard
            title="Aylık Tekrarlayan Gelir (MRR)"
            value={loading ? "—" : "$124K"}
            change="18%"
            positive
            color="orange"
            sparklineData={[50, 60, 55, 80, 95, 110, 124]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatsCard
            title="Müşteri Edinme Maliyeti (CAC)"
            value={loading ? "—" : "$450"}
            change="12%"
            positive={false}
            color="green"
            sparklineData={[400, 410, 390, 420, 435, 440, 450]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          />
          <StatsCard
            title="Haftalık Ziyaretçi"
            value={loading ? "—" : stats!.weeklyVisitors}
            change="18%"
            positive
            color="purple"
            sparklineData={[100, 150, 130, 200, 180, 250, 300]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
        </div>

        {/* Orta Bölüm: Grafikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Haftalık Ziyaretçi Analizi
            </h2>
            <TrafficChart />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" /> Etkileşim: Mesajlar vs Başvurular
            </h2>
            <InteractionChart />
          </div>
        </div>

        {/* Alt Bölüm: Son Haberler + Son Mesajlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* Son Haberler */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-bold text-gray-800 dark:text-white">Son Haberler</h2>
              <Link href="/admin/haberler" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Tümünü Gör →</Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </div>
                  </div>
                ))
              ) : recentNews.map(n => (
                <div key={n.id} className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={n.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.publishedAt}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${n.status === "published" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                    {n.status === "published" ? "Yayında" : "Taslak"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Son Mesajlar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-bold text-gray-800 dark:text-white">Son Mesajlar</h2>
              <Link href="/admin/iletisim" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Tümünü Gör →</Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 animate-pulse">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                ))
              ) : recentMessages.map(m => (
                <div key={m.id} className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!m.isRead ? "border-l-2 border-blue-500" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                      {m.name}
                      {!m.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </p>
                    <p className="text-xs text-gray-400">{new Date(m.receivedAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Microservices Mimari Haritası */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mt-6 overflow-hidden relative group">
          <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 text-sm">
            <Server className="w-4 h-4 text-indigo-500" />
            Mikroservis Sistem Sağlığı (Canlı)
          </h2>
          <div className="relative w-full h-[300px] bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: 600 }}>
              {/* Bağlantı Çizgileri */}
              <path d="M 30% 50% L 50% 30%" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200 dark:text-gray-800" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 30% 50% L 50% 70%" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200 dark:text-gray-800" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
              </path>
              <path d="M 50% 30% L 70% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200 dark:text-gray-800" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M 50% 70% L 70% 50%" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200 dark:text-gray-800" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.8s" repeatCount="indefinite" />
              </path>

              {/* Düğümler (Nodes) */}
              <circle cx="30%" cy="50%" r="24" className="fill-white dark:fill-gray-900 stroke-emerald-500 stroke-[3px]" />
              <text x="30%" y="50%" dy="40" textAnchor="middle" className="text-xs font-mono fill-gray-500 dark:fill-gray-400">API Gateway</text>

              <circle cx="50%" cy="30%" r="20" className="fill-white dark:fill-gray-900 stroke-blue-500 stroke-[3px]" />
              <text x="50%" y="30%" dy="-32" textAnchor="middle" className="text-xs font-mono fill-gray-500 dark:fill-gray-400">SAP ERP Core</text>

              <circle cx="50%" cy="70%" r="20" className="fill-white dark:fill-gray-900 stroke-amber-500 stroke-[3px]" />
              <text x="50%" y="70%" dy="40" textAnchor="middle" className="text-xs font-mono fill-gray-500 dark:fill-gray-400">HANA DB (Yükte)</text>

              <circle cx="70%" cy="50%" r="24" className="fill-white dark:fill-gray-900 stroke-emerald-500 stroke-[3px]" />
              <text x="70%" y="50%" dy="40" textAnchor="middle" className="text-xs font-mono fill-gray-500 dark:fill-gray-400">Hybris Storefront</text>
              
              {/* Ping Göstergeleri */}
              <circle cx="30%" cy="50%" r="4" className="fill-emerald-500"><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle>
              <circle cx="50%" cy="30%" r="4" className="fill-blue-500"><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></circle>
              <circle cx="50%" cy="70%" r="4" className="fill-amber-500"><animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"/></circle>
              <circle cx="70%" cy="50%" r="4" className="fill-emerald-500"><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></circle>
            </svg>
            <div className="absolute top-4 right-4 flex gap-3 text-[10px] font-mono tracking-widest uppercase">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"/> Sağlıklı</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"/> Yük Altında</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"/> Çevrimdışı</span>
            </div>
          </div>
        </div>

        {/* 4. Command Center (Sistem Sağlığı) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* CPU Usage */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Cpu className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">CPU Kullanımı</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">24</span>
              <span className="text-sm font-medium text-gray-500">%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-[24%]" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Normal Seviye</p>
          </div>

          {/* RAM Usage */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <HardDrive className="w-8 h-8 text-emerald-500 mb-3" />
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">RAM Kullanımı</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">4.2</span>
              <span className="text-sm font-medium text-gray-500">/ 16 GB</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[26%]" />
            </div>
            <p className="text-xs text-gray-400 mt-2">26% Dolu</p>
          </div>

          {/* Network I/O */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Server className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Ağ G/Ç (Network)</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">12.8</span>
              <span className="text-sm font-medium text-gray-500">MB/s</span>
            </div>
            <div className="w-full flex justify-between gap-4 mt-4 text-xs font-semibold">
              <span className="text-emerald-500 flex items-center gap-1">↓ 8.2 MB/s</span>
              <span className="text-blue-500 flex items-center gap-1">↑ 4.6 MB/s</span>
            </div>
          </div>
        </div>

        {/* 5. Bölüm: Aktivite Logları (Audit Trail) */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mt-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" /> Sistem Aktivite Logları
            </h2>
            <Link href="/admin/audit" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Tüm Denetim İzleri (Audit Logs) →</Link>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="animate-pulse flex gap-4">
                <div className="w-4 h-full bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ) : logs.length === 0 ? (
              <p className="text-sm text-gray-500">Henüz kaydedilmiş bir aktivite bulunmuyor.</p>
            ) : (
              <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-8">
                {logs.map((log) => (
                  <div key={log.id} className="relative pl-6">
                    {/* Timeline Node */}
                    <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-900" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{log.action}</h3>
                      <time className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString("tr-TR")}
                      </time>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {log.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </>
  );
}
