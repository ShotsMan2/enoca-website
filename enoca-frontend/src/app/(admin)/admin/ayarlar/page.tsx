"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { adminApi, type SiteSettings } from "@/lib/admin-api";
import { useToast } from "@/components/admin/ToastProvider";
import { Download, Upload } from "lucide-react";

export default function AyarlarPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    adminApi.getSiteSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    await adminApi.updateSiteSettings(settings);
    setSaving(false);
    toast("Site ayarları başarıyla kaydedildi.");
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/backup");
      if (!res.ok) throw new Error("Yedek alınamadı");
      const data = await res.text();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enoca-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      toast("Sistem yedeği başarıyla indirildi.", "success");
      await adminApi.logAction("Sistem Yedeği Alındı", "Tüm sistem veritabanı dışa aktarıldı.");
    } catch {
      toast("Yedek alınırken bir hata oluştu.", "error");
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      toast("Sistem yedeği geri yükleniyor (Simülasyon)...", "success");
      await adminApi.logAction("Sistem Yedeği Yüklendi", `${file.name} isimli dosyadan sistem geri yükleme tetiklendi.`);
      // Gerçek senaryoda API'ye POST atılarak db güncellenir.
    };
    input.click();
  };

  const field = (label: string, key: keyof SiteSettings, type = "text", placeholder = "") => (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        value={settings?.[key] ?? ""}
        onChange={e => setSettings(s => s ? { ...s, [key]: e.target.value } : s)}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );

  return (
    <>
      <AdminHeader title="Site Ayarları" />
      <main className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSave} className="max-w-2xl space-y-6">

          {/* İletişim Bilgileri */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("E-posta Adresi", "email", "email", "contact@enoca.com")}
              {field("Telefon Numarası", "phone", "tel", "+90 850 221 73 54")}
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </span>
              Sosyal Medya Bağlantıları
            </h2>
            <div className="space-y-4">
              {field("LinkedIn URL", "linkedinUrl", "url", "https://linkedin.com/company/enoca")}
              {field("Twitter URL", "twitterUrl", "url", "https://twitter.com/enoca_")}
            </div>
          </div>

          {/* Yasal Sayfalar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </span>
              Yasal Bağlantılar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("Gizlilik Politikası URL", "privacyUrl")}
              {field("Kullanım Koşulları URL", "termsUrl")}
            </div>
          </div>

          {/* Kaydet */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {saving ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              )}
              {saving ? "Kaydediliyor..." : "Ayarları Kaydet"}
            </button>
          </div>

        </form>

        <div className="mt-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Disaster Recovery (Sistem Yedekleme)</h2>
          <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6">Tüm sistem veritabanını indirebilir veya daha önce aldığınız bir yedeği sisteme geri yükleyebilirsiniz. İçe aktarma işlemi mevcut tüm verilerinizi geçersiz kılar!</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExport}
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 text-red-600 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Sistemi Yedekle (Export)
            </button>
            <button
              onClick={handleImport}
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              <Upload className="w-4 h-4" /> Yedekten Dön (Import)
            </button>
          </div>
        </div>

      </main>
    </>
  );
}
