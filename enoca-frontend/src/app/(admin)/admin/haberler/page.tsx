"use client";

import { useEffect, useState } from "react";
/* eslint-disable @next/next/no-img-element */
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { adminApi, type NewsItem } from "@/lib/admin-api";
import { useToast } from "@/components/admin/ToastProvider";
import { ArrowUpDown } from "lucide-react";

const PAGE_SIZE = 5;

const emptyForm: Omit<NewsItem, "id"> = {
  title: "", summary: "", imageUrl: "", publishedAt: new Date().toISOString().slice(0, 10), status: "draft",
};

export default function HaberlerPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<Omit<NewsItem, "id">>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Sorting state
  const [sortField, setSortField] = useState<"title" | "publishedAt">("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { toast } = useToast();

  useEffect(() => {
    adminApi.getNews().then(n => { setNews(n); setLoading(false); });
  }, []);

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.summary.toLowerCase().includes(search.toLowerCase())
  );

  // Apply Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortField === "publishedAt") {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === "asc" 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    }
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field: "title" | "publishedAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    await adminApi.deleteNews(deleteModal.id);
    setNews(n => n.filter(x => x.id !== deleteModal.id));
    setDeleting(false);
    setDeleteModal({ open: false, id: null });
    toast("Haber başarıyla silindi.", "success");
  };

  const openEdit = (item: NewsItem) => {
    setEditItem(item);
    setFormData({ title: item.title, summary: item.summary, imageUrl: item.imageUrl, publishedAt: item.publishedAt, status: item.status });
    setShowForm(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editItem) {
      const updated = await adminApi.updateNews({ ...formData, id: editItem.id });
      setNews(n => n.map(x => x.id === updated.id ? updated : x));
      toast("Haber güncellendi.", "success");
    } else {
      const created = await adminApi.createNews(formData);
      setNews(n => [created, ...n]);
      toast("Yeni haber eklendi.", "success");
    }
    setSaving(false);
    setShowForm(false);
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <>
      <AdminHeader title="Haberler" />
      <main className="flex-1 overflow-y-auto p-6 space-y-5">

        {/* Üst Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Haber ara..." className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-gray-800 dark:text-white transition-all" />
          </div>
          <button onClick={openAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Yeni Haber Ekle
          </button>
        </div>

        {/* Tablo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3">
                  <button onClick={() => toggleSort("title")} className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-blue-600 transition-colors">
                    Haber <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 hidden md:table-cell">
                  <button onClick={() => toggleSort("publishedAt")} className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-blue-600 transition-colors">
                    Tarih <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Durum</th>
                <th className="text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" /><div className="space-y-2"><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48" /><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32" /></div></div></td>
                    <td className="px-4 py-4 hidden md:table-cell"><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
                    <td className="px-4 py-4"><div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" /></td>
                    <td className="px-6 py-4" />
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 dark:text-gray-600">Sonuç bulunamadı.</td></tr>
              ) : paginated.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">{item.summary}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-sm text-gray-500 dark:text-gray-400">{item.publishedAt}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.status === "published" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                      {item.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-900/50">Düzenle</button>
                      <button onClick={() => setDeleteModal({ open: true, id: item.id })} className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-900/50">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500">{filtered.length} sonuçtan {((page-1)*PAGE_SIZE)+1}-{Math.min(page*PAGE_SIZE, filtered.length)} gösteriliyor</p>
              <div className="flex gap-1">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i+1)} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${page === i+1 ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{i+1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Form Modalı */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white">{editItem ? "Haberi Düzenle" : "Yeni Haber Ekle"}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5"><label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Başlık *</label><input required value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} className={inputCls} /></div>
              <div className="space-y-1.5"><label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Özet</label><textarea rows={2} value={formData.summary} onChange={e => setFormData(f => ({ ...f, summary: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" /></div>
              <div className="space-y-1.5"><label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Görsel URL</label><input type="url" value={formData.imageUrl} onChange={e => setFormData(f => ({ ...f, imageUrl: e.target.value }))} className={inputCls} placeholder="https://..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Yayın Tarihi</label><input type="date" value={formData.publishedAt} onChange={e => setFormData(f => ({ ...f, publishedAt: e.target.value }))} className={inputCls} /></div>
                <div className="space-y-1.5"><label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Durum</label>
                  <select value={formData.status} onChange={e => setFormData(f => ({ ...f, status: e.target.value as "published" | "draft" }))} className={inputCls}>
                    <option value="draft">Taslak</option>
                    <option value="published">Yayınla</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Vazgeç</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white transition-colors disabled:opacity-70">
                  {saving ? "Kaydediliyor..." : editItem ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.open}
        message="Bu haberi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        isLoading={deleting}
      />
    </>
  );
}
