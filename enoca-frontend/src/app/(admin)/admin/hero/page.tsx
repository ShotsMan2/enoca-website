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

  const inputCls = "w-full h-10 px-3 border border-gray-200 dark:border-[#18191f] bg-white dark:bg-[#050505] text-gray-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#1c69d4] transition-all";
  const labelCls = "text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#606266]";

  return (
    <>
      <AdminHeader title="Hero Section Yönetimi" />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6 items-start">

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            
            <div className="bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-[#18191f] p-5 space-y-4 shadow-sm">
              <h2 className="text-[11px] font-mono tracking-widest text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-[#18191f] pb-2">Üst Bilgi & Başlık</h2>
              
              <div className="space-y-1">
                <label className={labelCls}>Badge (Rozet)</label>
                <input type="text" value={hero?.badge ?? ""} onChange={e => setHero(h => h ? { ...h, badge: e.target.value } : h)} className={inputCls} placeholder="Enoca | Modern kurumsal..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelCls}>Başlık 1. Satır</label>
                  <input type="text" value={hero?.titleLine1 ?? ""} onChange={e => setHero(h => h ? { ...h, titleLine1: e.target.value } : h)} className={inputCls} placeholder="Bağlantıları düzenlerken," />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Vurgulu Kelime</label>
                  <input type="text" value={hero?.titleHighlight ?? ""} onChange={e => setHero(h => h ? { ...h, titleHighlight: e.target.value } : h)} className={inputCls} placeholder="kurumsal hikayenizi" />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelCls}>Başlık 2. Satır</label>
                <input type="text" value={hero?.titleLine2 ?? ""} onChange={e => setHero(h => h ? { ...h, titleLine2: e.target.value } : h)} className={inputCls} placeholder="güçlendiriyoruz." />
              </div>

              <div className="space-y-1">
                <label className={labelCls}>Alt Açıklama (Subtitle)</label>
                <textarea rows={3} value={hero?.subtitle ?? ""} onChange={e => setHero(h => h ? { ...h, subtitle: e.target.value } : h)} className="w-full px-3 py-2 border border-gray-200 dark:border-[#18191f] bg-white dark:bg-[#050505] text-gray-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#1c69d4] transition-all resize-none" placeholder="Enoca'nın çözümlerini..." />
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-[#18191f] p-5 space-y-4 shadow-sm">
              <h2 className="text-[11px] font-mono tracking-widest text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-[#18191f] pb-2">Aksiyon Butonları</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelCls}>Birincil Buton (İletişim)</label>
                  <input type="text" value={hero?.ctaContact ?? ""} onChange={e => setHero(h => h ? { ...h, ctaContact: e.target.value } : h)} className={inputCls} placeholder="İletişime geç" />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>İkincil Buton (Kariyer)</label>
                  <input type="text" value={hero?.ctaCareer ?? ""} onChange={e => setHero(h => h ? { ...h, ctaCareer: e.target.value } : h)} className={inputCls} placeholder="Kariyer alanlarını keşfet" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-[#18191f] p-5 space-y-4 shadow-sm">
              <h2 className="text-[11px] font-mono tracking-widest text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-[#18191f] pb-2">Öne Çıkan Özellikler (Etiketler)</h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className={labelCls}>Özellik 1</label>
                  <input type="text" value={hero?.featuredHighlight1 ?? ""} onChange={e => setHero(h => h ? { ...h, featuredHighlight1: e.target.value } : h)} className={inputCls} />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Özellik 2</label>
                  <input type="text" value={hero?.featuredHighlight2 ?? ""} onChange={e => setHero(h => h ? { ...h, featuredHighlight2: e.target.value } : h)} className={inputCls} />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Özellik 3</label>
                  <input type="text" value={hero?.featuredHighlight3 ?? ""} onChange={e => setHero(h => h ? { ...h, featuredHighlight3: e.target.value } : h)} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-[#18191f] p-5 space-y-4 shadow-sm">
              <h2 className="text-[11px] font-mono tracking-widest text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-[#18191f] pb-2">Özet Kartı Sağ Taraf</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelCls}>Kart Üst Başlık</label>
                  <input type="text" value={hero?.summaryTitle ?? ""} onChange={e => setHero(h => h ? { ...h, summaryTitle: e.target.value } : h)} className={inputCls} placeholder="Özet görünüm" />
                </div>
                <div className="space-y-1">
                  <label className={labelCls}>Kart Ana Başlık</label>
                  <input type="text" value={hero?.summaryHeading ?? ""} onChange={e => setHero(h => h ? { ...h, summaryHeading: e.target.value } : h)} className={inputCls} placeholder="Kurumsal erişim merkezi" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelCls}>Durum Badge (Örn: Aktif)</label>
                <input type="text" value={hero?.status ?? ""} onChange={e => setHero(h => h ? { ...h, status: e.target.value } : h)} className={inputCls} placeholder="Aktif" />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-70">
                {saving ? <svg className="w-4 h-4 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : null}
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
              {saved && <span className="text-[11px] font-mono uppercase text-[#10b981]">✓ Kaydedildi!</span>}
            </div>
          </form>

          {/* Canlı Önizleme */}
          <div className="bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-[#18191f] p-5 sticky top-6 shadow-sm">
            <h2 className="text-[11px] font-mono tracking-widest text-gray-900 dark:text-white uppercase border-b border-gray-200 dark:border-[#18191f] pb-3 mb-6">Canlı Önizleme</h2>
            <div className="bg-slate-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
              
              <div className="relative z-10 w-full max-w-xl">
                <div className="space-y-8">
                  <div className="inline-flex w-fit items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-300">
                    {hero?.badge || "Enoca | Modern kurumsal dijital deneyim"}
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {hero?.titleLine1 || "Bağlantıları düzenlerken,"}<br />
                      <span className="text-sky-400">{hero?.titleHighlight || "kurumsal hikayenizi"}</span> {hero?.titleLine2 || "güçlendiriyoruz."}
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-slate-300">
                      {hero?.subtitle || "Enoca'nın çözümlerini, inovasyon alanlarını, kariyer fırsatlarını ve topluluk odaklı kaynaklarını tek bir premium görünümde bir araya getiriyoruz."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <span className="rounded-full bg-sky-500 px-6 py-2.5 text-center text-sm font-medium text-white">
                      {hero?.ctaContact || "İletişime geç"}
                    </span>
                    <span className="rounded-full border border-white/15 px-6 py-2.5 text-center text-sm font-medium text-slate-200">
                      {hero?.ctaCareer || "Kariyer alanlarını keşfet"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {[hero?.featuredHighlight1, hero?.featuredHighlight2, hero?.featuredHighlight3].filter(Boolean).map((item, i) => (
                      <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300">
                        {item}
                      </span>
                    ))}
                    {(!hero?.featuredHighlight1 && !hero?.featuredHighlight2 && !hero?.featuredHighlight3) && (
                      <>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300">Kurumsal vizyonu canlı tutan dijital deneyimler</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300">Ortak çalışma alanları ve erişilebilir kaynaklar</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sağ Taraf Özet Kart Önizlemesi */}
                <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{hero?.summaryTitle || "Özet görünüm"}</p>
                       <h2 className="mt-1 text-lg font-semibold text-white">{hero?.summaryHeading || "Kurumsal erişim merkezi"}</h2>
                     </div>
                     <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                       {hero?.status || "Aktif"}
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
