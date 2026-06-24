"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { adminApi, type NewsletterSubscriber } from "@/lib/admin-api";
import { useToast } from "@/components/admin/ToastProvider";
import { Trash2, Download, Search } from "lucide-react";

export default function EBultenPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    adminApi.getNewsletterSubscribers().then(data => {
      setSubscribers(data);
      setLoading(false);
    });
  }, []);

  const filtered = subscribers.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    try {
      await adminApi.deleteNewsletterSubscriber(deleteModal.id);
      setSubscribers(prev => prev.filter(s => s.id !== deleteModal.id));
      toast("Abonelik başarıyla silindi.", "success");
    } catch {
      toast("Abonelik silinirken bir hata oluştu.", "error");
    } finally {
      setDeleting(false);
      setDeleteModal({ open: false, id: null });
    }
  };

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    
    const headers = ["ID", "E-posta", "Kayit Tarihi"];
    const rows = filtered.map(s => [
      s.id,
      s.email,
      new Date(s.subscribedAt).toLocaleString("tr-TR")
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + 
      [headers.join(";"), ...rows.map(e => e.join(";"))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `enoca_ebulten_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AdminHeader title="E-Bülten Yönetimi" />
      <main className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="E-posta ara..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Excel/CSV İndir
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">E-Posta</th>
                  <th className="px-6 py-4">Kayıt Tarihi</th>
                  <th className="px-6 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Yükleniyor...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Hiç abone bulunamadı.</td>
                  </tr>
                ) : (
                  filtered.map(subscriber => (
                    <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{subscriber.email}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {new Date(subscriber.subscribedAt).toLocaleString("tr-TR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setDeleteModal({ open: true, id: subscriber.id })}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 dark:text-gray-400 flex justify-between items-center">
            <span>Toplam {filtered.length} abone</span>
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={deleteModal.open}
        message="Bu aboneliği silmek istediğinize emin misiniz? Bu e-posta adresi artık bülten listesinde yer almayacak."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        isLoading={deleting}
      />
    </>
  );
}
