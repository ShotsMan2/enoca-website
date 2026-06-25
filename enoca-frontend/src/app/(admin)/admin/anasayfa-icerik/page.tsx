"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { adminApi, type HomepageSettings, type HomepageFeature } from "@/lib/admin-api";
import { useToast } from "@/components/admin/ToastProvider";

export default function AnasayfaIcerikPage() {
  const [data, setData] = useState<HomepageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"features" | "references" | "categories">("features");
  
  const { toast } = useToast();

  useEffect(() => {
    adminApi.getHomepageSettings().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    await adminApi.updateHomepageSettings(data);
    setSaving(false);
    toast("Anasayfa içerikleri başarıyla güncellendi.");
  };

  const updateFeature = (id: number, field: keyof HomepageFeature, value: string) => {
    if (!data) return;
    setData({
      ...data,
      features: (data.features || []).map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const updateReferences = (value: string) => {
    if (!data) return;
    setData({
      ...data,
      references: value.split(",").map(v => v.trim()).filter(v => v !== "")
    });
  };

  const addCategory = () => {
    if (!data) return;
    setData({
      ...data,
      categories: [
        ...(data.categories || []),
        { id: Date.now().toString(), name: "Yeni Kategori", links: [] }
      ]
    });
  };

  const updateCategoryName = (id: string | number, name: string) => {
    if (!data) return;
    setData({
      ...data,
      categories: (data.categories || []).map(c => c.id === id ? { ...c, name } : c)
    });
  };

  const removeCategory = (id: string | number) => {
    if (!data) return;
    setData({
      ...data,
      categories: (data.categories || []).filter(c => c.id !== id)
    });
  };

  const addCategoryLink = (categoryId: string | number) => {
    if (!data) return;
    setData({
      ...data,
      categories: (data.categories || []).map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            links: [...(c.links || []), { id: Date.now().toString(), title: "Yeni Link", url: "/" }]
          };
        }
        return c;
      })
    });
  };

  const updateCategoryLink = (categoryId: string | number, linkId: string | number, field: "title" | "url", value: string) => {
    if (!data) return;
    setData({
      ...data,
      categories: (data.categories || []).map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            links: (c.links || []).map(l => l.id === linkId ? { ...l, [field]: value } : l)
          };
        }
        return c;
      })
    });
  };

  const removeCategoryLink = (categoryId: string | number, linkId: string | number) => {
    if (!data) return;
    setData({
      ...data,
      categories: (data.categories || []).map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            links: (c.links || []).filter(l => l.id !== linkId)
          };
        }
        return c;
      })
    });
  };

  const inputCls = "w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  if (loading || !data) {
    return (
      <>
        <AdminHeader title="Anasayfa İçerikleri" />
        <main className="flex-1 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Anasayfa İçerikleri" />
      <main className="flex-1 overflow-y-auto p-6">
        
        {/* Tabs & Save Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1 overflow-x-auto w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab("features")}
              className={`px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-colors ${activeTab === "features" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              Özellikler (Features)
            </button>
            <button 
              onClick={() => setActiveTab("references")}
              className={`px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-colors ${activeTab === "references" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              Referanslar
            </button>
            <button 
              onClick={() => setActiveTab("categories")}
              className={`px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-colors ${activeTab === "categories" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              Hizmet Kategorileri
            </button>
          </div>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-70 flex items-center gap-2 whitespace-nowrap shrink-0">
            {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
            {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          
          {activeTab === "features" && (
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Anasayfa Özellik Kartları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.features || []).map((feature, idx) => (
                  <div key={feature.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono font-bold flex items-center justify-center">
                        {feature.number}
                      </div>
                      <h4 className="font-bold text-gray-800 dark:text-white">Kart #{idx + 1}</h4>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Başlık</label>
                      <input 
                        type="text" 
                        value={feature.title} 
                        onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                        className={inputCls} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Açıklama Metni</label>
                      <textarea 
                        value={feature.text} 
                        onChange={(e) => updateFeature(feature.id, "text", e.target.value)}
                        className={`${inputCls} h-24 py-2 resize-none`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "references" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Referans Şirketler</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Anasayfadaki &quot;Değer Kattığımız Şirketler&quot; alanında görünen isimlerdir. Lütfen aralarına virgül koyarak yazınız.
                </p>
                <textarea 
                  value={data.references.join(", ")} 
                  onChange={(e) => updateReferences(e.target.value)}
                  className={`${inputCls} h-48 py-3 leading-relaxed`}
                  placeholder="Adese, AGT, Avansas, ..."
                />
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Hizmet Kategorileri ve Linkler</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Anasayfanın alt kısmındaki &quot;Dijital Dönüşüm Hizmetlerimiz&quot; bölümü.</p>
                </div>
                <button 
                  onClick={addCategory}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="text-lg leading-none">+</span> Yeni Kategori Ekle
                </button>
              </div>

              <div className="space-y-6">
                {(data.categories || []).map((category, idx) => (
                  <div key={category.id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Kategori Adı</label>
                        <input 
                          type="text" 
                          value={category.name} 
                          onChange={(e) => updateCategoryName(category.id, e.target.value)}
                          className={inputCls} 
                        />
                      </div>
                      <div className="flex gap-2 sm:mt-5">
                        <button 
                          onClick={() => addCategoryLink(category.id)}
                          className="px-3 py-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          + Link Ekle
                        </button>
                        <button 
                          onClick={() => removeCategory(category.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 pl-4 sm:pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                      {(category.links || []).length === 0 ? (
                        <p className="text-sm text-gray-500 italic">Henüz link eklenmemiş.</p>
                      ) : (
                        (category.links || []).map((link) => (
                          <div key={link.id} className="flex flex-col sm:flex-row items-center gap-3">
                            <input 
                              type="text" 
                              value={link.title} 
                              onChange={(e) => updateCategoryLink(category.id, link.id, "title", e.target.value)}
                              placeholder="Link Başlığı"
                              className={`${inputCls} flex-1`} 
                            />
                            <input 
                              type="text" 
                              value={link.url} 
                              onChange={(e) => updateCategoryLink(category.id, link.id, "url", e.target.value)}
                              placeholder="URL (örn: /cozumler/...)"
                              className={`${inputCls} flex-[2] font-mono text-xs`} 
                            />
                            <button 
                              onClick={() => removeCategoryLink(category.id, link.id)}
                              className="w-10 h-10 shrink-0 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Sil"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
