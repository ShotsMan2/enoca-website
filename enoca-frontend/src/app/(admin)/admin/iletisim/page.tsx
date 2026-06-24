"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { adminApi, type ContactMessage } from "@/lib/admin-api";
import { useToast } from "@/components/admin/ToastProvider";
import { ArrowUpDown, Download, FileText } from "lucide-react";
import EmailModal from "@/components/admin/EmailModal";

export default function IletisimPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [emailModal, setEmailModal] = useState<{ open: boolean; to: string; subject: string }>({ open: false, to: "", subject: "" });
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  
  const [sortField, setSortField] = useState<"name" | "receivedAt">("receivedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { toast } = useToast();

  useEffect(() => {
    adminApi.getMessages().then(m => { setMessages(m); setLoading(false); });
  }, []);

  const filtered = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.email.toLowerCase().includes(search.toLowerCase()) || 
                          m.message.toLowerCase().includes(search.toLowerCase());
    if (filter === "unread") return !m.isRead && matchesSearch;
    if (filter === "read") return m.isRead && matchesSearch;
    return matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === "receivedAt") {
      const dateA = new Date(a.receivedAt).getTime();
      const dateB = new Date(b.receivedAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
  });

  const toggleSort = (field: "name" | "receivedAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleSelect = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.isRead) {
      await adminApi.markAsRead(msg.id);
      setMessages(ms => ms.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    await adminApi.deleteMessage(deleteModal.id);
    setMessages(ms => ms.filter(m => m.id !== deleteModal.id));
    if (selected?.id === deleteModal.id) setSelected(null);
    setDeleting(false);
    setDeleteModal({ open: false, id: null });
    toast("Mesaj silindi.", "success");
  };

  return (
    <>
      <AdminHeader title="Gelen Kutusu" />
      <main className="flex-1 overflow-hidden p-6 flex flex-col">
        


        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 flex-1 min-h-0">

          {/* Sol: Mesaj Listesi */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            {/* Filtreler */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  Mesajlar
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                  )}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => toggleSort("name")} className="text-gray-400 hover:text-blue-600"><ArrowUpDown className="w-4 h-4" /></button>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Mesajlarda ara..." 
                className="w-full mb-3 px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 border-none outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-1">
                {(["all", "unread", "read"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    {f === "all" ? "Tümü" : f === "unread" ? "Okunmamış" : "Okunmuş"}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-4 animate-pulse space-y-2">
                    <div className="flex justify-between"><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" /><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" /></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                ))
              ) : sorted.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-gray-400">Mesaj yok</div>
              ) : sorted.map(msg => (
                <button key={msg.id} onClick={() => handleSelect(msg)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selected?.id === msg.id ? "bg-blue-50 dark:bg-blue-900/20" : ""} ${!msg.isRead ? "border-l-2 border-blue-500" : ""}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${!msg.isRead ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-none ${!msg.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{msg.name}</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEmailModal({ open: true, to: msg.email, subject: `Yanıt: İletişim Mesajınız` }); }} className={`text-xs mt-0.5 hover:underline ${!msg.isRead ? "text-blue-500" : "text-gray-400"}`}>{msg.email}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!msg.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                      <p className="text-xs text-gray-400">{new Date(msg.receivedAt).toLocaleDateString("tr-TR")}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate ml-10">{msg.message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: Mesaj Detayı */}
          {selected ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{selected.name}</p>
                    <p className="text-xs text-gray-400">{selected.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEmailModal({ open: true, to: selected.email, subject: `Yanıt: İletişim Mesajınız` })} className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-900/50 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Yanıtla
                  </button>
                  <button onClick={() => setDeleteModal({ open: true, id: selected.id })} className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-900/50">Sil</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center gap-4 mb-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(selected.receivedAt).toLocaleString("tr-TR")}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${selected.isRead ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"}`}>
                    {selected.isRead ? "Okundu" : "Okunmadı"}
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <p className="text-sm font-medium">Mesaj seçin</p>
              </div>
            </div>
          )}

        </div>
      </main>

      <ConfirmModal
        isOpen={deleteModal.open}
        message="Bu mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        isLoading={deleting}
      />

      <EmailModal 
        isOpen={emailModal.open} 
        onClose={() => setEmailModal({ open: false, to: "", subject: "" })} 
        toEmail={emailModal.to} 
        defaultSubject={emailModal.subject} 
      />
    </>
  );
}
