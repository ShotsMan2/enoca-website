"use client";

import { useState, useEffect } from "react";
import { adminApi, JobPosting, JobApplication } from "@/lib/admin-api";
import { Plus, Search, MapPin, Briefcase, Trash2, Edit, X, ExternalLink } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmModal from "@/components/admin/ConfirmModal";

const emptyJob: Omit<JobPosting, "id"> = {
  title: "", department: "", type: "full-time", location: "İstanbul",
  status: "active", postedAt: new Date().toISOString().slice(0, 10),
  description: "", requirements: [],
};

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchJobs, setSearchJobs] = useState("");

  // İlan modal state
  const [jobModal, setJobModal] = useState<{ open: boolean; item: JobPosting | null }>({ open: false, item: null });
  const [jobForm, setJobForm] = useState<Omit<JobPosting, "id">>(emptyJob);
  const [savingJob, setSavingJob] = useState(false);

  // Silme modal
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null; type: "job" | "app" }>({ open: false, id: null, type: "job" });
  const [deleting, setDeleting] = useState(false);

  // Başvuru detay modal
  const [appDetail, setAppDetail] = useState<JobApplication | null>(null);


  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [jobsData, appsData] = await Promise.all([adminApi.getJobs(), adminApi.getApplications()]);
        setJobs(jobsData);
        setApplications(appsData);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchInitialData();
  }, []);

  // --- İlan İşlemleri ---
  const openAddJob = () => { setJobForm(emptyJob); setJobModal({ open: true, item: null }); };
  const openEditJob = (job: JobPosting) => {
    setJobForm({ title: job.title, department: job.department, type: job.type, location: job.location, status: job.status, postedAt: job.postedAt, description: job.description, requirements: job.requirements });
    setJobModal({ open: true, item: job });
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingJob(true);
    try {
      if (jobModal.item) {
        const updated = await adminApi.updateJob({ ...jobForm, id: jobModal.item.id });
        setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
      } else {
        const created = await adminApi.createJob(jobForm);
        setJobs(prev => [created, ...prev]);
      }
      setJobModal({ open: false, item: null });
    } catch (e) { console.error(e); }
    finally { setSavingJob(false); }
  };

  const handleDeleteJob = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    await adminApi.deleteJob(deleteModal.id);
    setJobs(prev => prev.filter(j => j.id !== deleteModal.id));
    setDeleting(false);
    setDeleteModal({ open: false, id: null, type: "job" });
  };

  // --- Başvuru İşlemleri ---
  const handleUpdateAppStatus = async (id: number, status: JobApplication["status"]) => {
    try {
      await adminApi.updateApplicationStatus(id, status);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (e) { console.error(e); }
  };

  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchJobs.toLowerCase()) || j.department.toLowerCase().includes(searchJobs.toLowerCase()));

  const inputCls = "w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  if (loading) return (
    <>
      <AdminHeader title="Kariyer Yönetimi" />
      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    </>
  );

  return (
    <>
      <AdminHeader title="Kariyer Yönetimi" />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kariyer Yönetimi</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Açık pozisyonları ve iş başvurularını yönetin.</p>
            </div>
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button onClick={() => setActiveTab("jobs")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "jobs" ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900"}`}>
                İlanlar ({jobs.length})
              </button>
              <button onClick={() => setActiveTab("applications")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "applications" ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900"}`}>
                Başvurular ({applications.length})
              </button>
            </div>
          </div>

          {/* İlanlar Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3 justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={searchJobs} onChange={e => setSearchJobs(e.target.value)} placeholder="İlan ara..." className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm transition-all text-gray-800 dark:text-white" />
                </div>
                <button onClick={openAddJob} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
                  <Plus className="w-4 h-4" /> Yeni İlan Ekle
                </button>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-400">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">Henüz ilan bulunmuyor.</p>
                  <button onClick={openAddJob} className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">+ İlan Ekle</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${job.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                          {job.status === "active" ? "Aktif" : "Kapalı"}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => openEditJob(job)} className="text-gray-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" title="Düzenle"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteModal({ open: true, id: job.id, type: "job" })} className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Sil"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight">{job.title}</h3>
                      <div className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                        <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 flex-shrink-0" />{job.department} · {job.type}</span>
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0" />{job.location}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
                        <span>İlan: {new Date(job.postedAt).toLocaleDateString("tr-TR")}</span>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Başvurular Tab */}
          {activeTab === "applications" && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {applications.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <p className="text-sm font-medium">Henüz başvuru bulunmamaktadır.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Aday</th>
                        <th className="px-6 py-4 font-semibold">Pozisyon</th>
                        <th className="px-6 py-4 font-semibold hidden md:table-cell">İletişim</th>
                        <th className="px-6 py-4 font-semibold hidden lg:table-cell">Tarih</th>
                        <th className="px-6 py-4 font-semibold">Durum</th>
                        <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {applications.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                                {app.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">{app.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{app.jobTitle}</td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                              <a href={`mailto:${app.email}`} className="hover:text-blue-600 transition-colors">{app.email}</a>
                              <span>{app.phone}</span>
                              {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />Portfolyo</a>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">{new Date(app.appliedAt).toLocaleDateString("tr-TR")}</td>
                          <td className="px-6 py-4">
                            <select
                              value={app.status}
                              onChange={e => handleUpdateAppStatus(app.id, e.target.value as JobApplication["status"])}
                              className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer ${app.status === "new" ? "bg-yellow-100 text-yellow-700" : app.status === "reviewed" ? "bg-blue-100 text-blue-700" : app.status === "accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                            >
                              <option value="new">Yeni</option>
                              <option value="reviewed">İncelendi</option>
                              <option value="accepted">Kabul Edildi</option>
                              <option value="rejected">Reddedildi</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => setAppDetail(app)} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-900/50">
                              Detay
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* İlan Ekleme/Düzenleme Modalı */}
      {jobModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setJobModal({ open: false, item: null })} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h3 className="font-bold text-gray-800 dark:text-white">{jobModal.item ? "İlanı Düzenle" : "Yeni İlan Ekle"}</h3>
              <button onClick={() => setJobModal({ open: false, item: null })} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveJob} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Pozisyon Başlığı *</label>
                <input required value={jobForm.title} onChange={e => setJobForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Örn: Frontend Developer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Departman *</label>
                  <input required value={jobForm.department} onChange={e => setJobForm(f => ({ ...f, department: e.target.value }))} className={inputCls} placeholder="Örn: Engineering" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Çalışma Tipi</label>
                  <select value={jobForm.type} onChange={e => setJobForm(f => ({ ...f, type: e.target.value as "full-time" | "part-time" | "remote" | "hybrid" }))} className={inputCls}>
                    <option value="full-time">Tam Zamanlı</option>
                    <option value="part-time">Yarı Zamanlı</option>
                    <option value="remote">Uzaktan</option>
                    <option value="hybrid">Hibrit</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Konum</label>
                  <input value={jobForm.location} onChange={e => setJobForm(f => ({ ...f, location: e.target.value }))} className={inputCls} placeholder="İstanbul" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Durum</label>
                  <select value={jobForm.status} onChange={e => setJobForm(f => ({ ...f, status: e.target.value as "active" | "closed" }))} className={inputCls}>
                    <option value="active">Aktif</option>
                    <option value="closed">Kapalı</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Açıklama</label>
                <textarea rows={4} value={jobForm.description} onChange={e => setJobForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" placeholder="Pozisyon hakkında kısa açıklama..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Nitelikler (her satıra bir tane)</label>
                <textarea rows={4} value={jobForm.requirements?.join("\n") ?? ""} onChange={e => setJobForm(f => ({ ...f, requirements: e.target.value.split("\n").filter(r => r.trim()) }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" placeholder="React.js deneyimi&#10;TypeScript bilgisi&#10;Git kullanımı" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setJobModal({ open: false, item: null })} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Vazgeç</button>
                <button type="submit" disabled={savingJob} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white transition-colors disabled:opacity-70">
                  {savingJob ? "Kaydediliyor..." : jobModal.item ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Başvuru Detay Modalı */}
      {appDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setAppDetail(null)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white">Başvuru Detayı</h3>
              <button onClick={() => setAppDetail(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-lg font-bold text-blue-600">{appDetail.name.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{appDetail.name}</p>
                  <p className="text-sm text-gray-500">{appDetail.jobTitle}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><span className="text-gray-400 w-20 text-xs font-semibold uppercase">E-posta</span><a href={`mailto:${appDetail.email}`} className="text-blue-600 hover:underline">{appDetail.email}</a></div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><span className="text-gray-400 w-20 text-xs font-semibold uppercase">Telefon</span><a href={`tel:${appDetail.phone}`} className="hover:text-blue-600">{appDetail.phone}</a></div>
                {appDetail.portfolioUrl && <div className="flex items-center gap-2"><span className="text-gray-400 w-20 text-xs font-semibold uppercase">Portfolyo</span><a href={appDetail.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />Görüntüle</a></div>}
                <div className="flex items-center gap-2"><span className="text-gray-400 w-20 text-xs font-semibold uppercase">Tarih</span><span className="text-gray-600 dark:text-gray-300">{new Date(appDetail.appliedAt).toLocaleDateString("tr-TR")}</span></div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Durumu Güncelle</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["new", "reviewed", "accepted", "rejected"] as const).map(s => (
                    <button key={s} onClick={() => { handleUpdateAppStatus(appDetail.id, s); setAppDetail({ ...appDetail, status: s }); }}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors ${appDetail.status === s ? "ring-2 ring-blue-500" : ""} ${s === "new" ? "bg-yellow-100 text-yellow-700" : s === "reviewed" ? "bg-blue-100 text-blue-700" : s === "accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {s === "new" ? "Yeni" : s === "reviewed" ? "İncelendi" : s === "accepted" ? "Kabul Edildi" : "Reddedildi"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <a href={`mailto:${appDetail.email}`} className="flex-1 py-2.5 text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">E-posta Gönder</a>
                <button onClick={() => setAppDetail(null)} className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.open}
        message="Bu ilanı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        onConfirm={handleDeleteJob}
        onCancel={() => setDeleteModal({ open: false, id: null, type: "job" })}
        isLoading={deleting}
      />
    </>
  );
}
