"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { adminApi, type ContentPage } from "@/lib/admin-api";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const categories = ["Tümü", "Çözümler", "Danışmanlık", "Projeler", "Teknoloji", "Kurumsal", "Haberler"];

export default function IcerikPage() {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [selected, setSelected] = useState<ContentPage | null>(null);
  const [filterCat, setFilterCat] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    adminApi.getContentPages().then(p => { setPages(p); setLoading(false); });
  }, []);

  const filtered = filterCat === "Tümü" ? pages : pages.filter(p => p.category === filterCat);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const updated = await adminApi.updateContentPage(selected);
    setPages(ps => ps.map(p => p.id === updated.id ? updated : p));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    await adminApi.deleteContentPage(deleteModal.id);
    setPages(ps => ps.filter(p => p.id !== deleteModal.id));
    if (selected?.id === deleteModal.id) setSelected(null);
    setDeleting(false);
    setDeleteModal({ open: false, id: null });
  };

  const handleAdd = async () => {
    const newPage: Omit<ContentPage, "id"> = {
      menuTitle: "Yeni Sayfa", slug: "/yeni-sayfa", category: "Çözümler",
      content: "<p>İçeriği buraya yazın...</p>", status: "draft", updatedAt: new Date().toISOString().slice(0, 10),
    };
    const created = await adminApi.createContentPage(newPage);
    setPages(ps => [...ps, created]);
    setSelected(created);
  };


  const inputCls = "w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <>
      <AdminHeader title="İçerik / CMS" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full">

          {/* Sol: Sayfa Listesi */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm">Sayfalar</h2>
                <button onClick={handleAdd} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Yeni
                </button>
              </div>
              {/* Kategori Filtresi */}
              <div className="flex gap-1 flex-wrap">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilterCat(cat)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${filterCat === cat ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <div key={i} className="p-4 animate-pulse"><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" /><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" /></div>)
              ) : filtered.map(page => (
                <button key={page.id} onClick={() => setSelected(page)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selected?.id === page.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500" : ""}`}>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{page.menuTitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{page.category}</span>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${page.status === "published" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500"}`}>
                      {page.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: Editör */}
          {selected ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-gray-800 dark:text-white">{selected.menuTitle}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setDeleteModal({ open: true, id: selected.id })} className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-900/50">Sil</button>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-70 flex items-center gap-1.5">
                    {saving && <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                    {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Menü Başlığı</label>
                    <input className={inputCls} value={selected.menuTitle} onChange={e => setSelected(s => s ? { ...s, menuTitle: e.target.value } : s)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">URL (Slug)</label>
                    <input className={inputCls} value={selected.slug} onChange={e => setSelected(s => s ? { ...s, slug: e.target.value } : s)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Kategori</label>
                    <select className={inputCls} value={selected.category} onChange={e => setSelected(s => s ? { ...s, category: e.target.value } : s)}>
                      {categories.filter(c => c !== "Tümü").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Durum</label>
                    <select className={inputCls} value={selected.status} onChange={e => setSelected(s => s ? { ...s, status: e.target.value as "published" | "draft" } : s)}>
                      <option value="published">Yayında</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </div>
                </div>
                {/* Rich Text Editör */}
                <div className="space-y-1.5 pb-12">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">İçerik</label>
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                    <ReactQuill 
                      theme="snow" 
                      value={selected.content} 
                      onChange={(val: string) => setSelected(s => s ? { ...s, content: val } : s)} 
                      className="h-[300px] text-gray-800 dark:text-white"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-sm font-medium">Düzenlemek için bir sayfa seçin</p>
              </div>
            </div>
          )}

        </div>
      </main>

      <ConfirmModal
        isOpen={deleteModal.open}
        message="Bu sayfayı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        isLoading={deleting}
      />
    </>
  );
}
