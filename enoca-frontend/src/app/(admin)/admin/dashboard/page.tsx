"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { adminApi, type Stats, type NewsItem, type ContactMessage } from "@/lib/admin-api";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getStats(),
      adminApi.getNews(),
      adminApi.getMessages(),
    ]).then(([s, n, m]) => {
      setStats(s);
      setRecentNews(n.slice(0, 4));
      setRecentMessages(m.slice(0, 5));
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
            title="Bekleyen Mesaj"
            value={loading ? "—" : stats!.pendingMessages}
            change="3 yeni"
            positive={false}
            color="orange"
            sparklineData={[5, 2, 8, 4, 10, 3, 6]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          />
          <StatsCard
            title="Aktif Haber"
            value={loading ? "—" : stats!.activeNews}
            change="5%"
            positive
            color="green"
            sparklineData={[20, 22, 25, 24, 30, 28, 35]}
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
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

        {/* Alt Bölüm: Son Haberler + Son Mesajlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
      </main>
    </>
  );
}
