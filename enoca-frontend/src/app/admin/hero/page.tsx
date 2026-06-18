"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { adminApi, type HeroSettings } from "@/lib/admin-api";

export default function HeroPage() {
  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { adminApi.getHeroSettings().then(setHero); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;
    setSaving(true);
    await adminApi.updateHeroSettings(hero);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <>
      <AdminHeader title="Hero Section Yönetimi" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h2 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Başlık Ayarları</h2>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ana Başlık</label>
                <input type="text" value={hero?.mainTitle ?? ""} onChange={e => setHero(h => h ? { ...h, mainTitle: e.target.value } : h)} className={inputCls} placeholder="WE DO SAP CX" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Vurgulanan Kelime (Mavi)</label>
                <input type="text" value={hero?.highlightedWord ?? ""} onChange={e => setHero(h => h ? { ...h, highlightedWord: e.target.value } : h)} className={inputCls} placeholder="HYBRIS" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Alt Başlık</label>
                <input type="text" value={hero?.subtitle ?? ""} onChange={e => setHero(h => h ? { ...h, subtitle: e.target.value } : h)} className={inputCls} placeholder="Experienced In SAP CX Hybris Delivery" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Açıklama</label>
                <textarea rows={3} value={hero?.description ?? ""} onChange={e => setHero(h => h ? { ...h, description: e.target.value } : h)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h2 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Buton Ayarları</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buton 1 Metni</label>
                  <input type="text" value={hero?.button1Text ?? ""} onChange={e => setHero(h => h ? { ...h, button1Text: e.target.value } : h)} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buton 1 URL</label>
                  <input type="text" value={hero?.button1Url ?? ""} onChange={e => setHero(h => h ? { ...h, button1Url: e.target.value } : h)} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buton 2 Metni</label>
                  <input type="text" value={hero?.button2Text ?? ""} onChange={e => setHero(h => h ? { ...h, button2Text: e.target.value } : h)} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buton 2 URL</label>
                  <input type="text" value={hero?.button2Url ?? ""} onChange={e => setHero(h => h ? { ...h, button2Url: e.target.value } : h)} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2">
                {saving ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : null}
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
              {saved && <span className="text-sm font-semibold text-green-600 dark:text-green-400">✓ Kaydedildi!</span>}
            </div>
          </form>

          {/* Canlı Önizleme */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-6">Canlı Önizleme</h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-mono font-medium text-blue-600">ENOCA™ TEKNOLOJİ</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight leading-tight">
                  {hero?.mainTitle || "WE DO SAP CX"} <br />
                  <span className="text-blue-600">{hero?.highlightedWord || "HYBRIS"}</span>
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{hero?.subtitle || "Experienced In SAP CX Hybris Delivery"}</p>
              <div className="flex gap-3 flex-wrap pt-2">
                <span className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg">{hero?.button1Text || "Buton 1"}</span>
                <span className="px-4 py-2 text-xs font-bold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg">{hero?.button2Text || "Buton 2"}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
