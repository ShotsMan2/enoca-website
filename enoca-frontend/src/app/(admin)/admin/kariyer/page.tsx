"use client";

import { useState, useEffect } from "react";
import { adminApi, JobPosting, JobApplication } from "@/lib/admin-api";
import { Plus, Search, MapPin, Briefcase, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsData, appsData] = await Promise.all([
        adminApi.getJobs(),
        adminApi.getApplications()
      ]);
      setJobs(jobsData);
      setApplications(appsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (id: number, status: JobApplication["status"]) => {
    try {
      await adminApi.updateApplicationStatus(id, status);
      await fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Kariyer Yönetimi</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Açık pozisyonları ve iş başvurularını yönetin.</p>
          </div>
          
          <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "jobs" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
            >
              İlanlar ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "applications" ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
            >
              Başvurular ({applications.length})
            </button>
          </div>
        </div>

        {/* Tab Content: Jobs */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="İlan ara..." className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Plus className="w-4 h-4" /> Yeni İlan Ekle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${job.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {job.status === "active" ? "Aktif" : "Kapalı"}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{job.title}</h3>
                  <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.department} - {job.type}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500">
                    <span>İlan Tarihi: {new Date(job.postedAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Applications */}
        {activeTab === "applications" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Aday</th>
                    <th className="px-6 py-4 font-semibold">Pozisyon</th>
                    <th className="px-6 py-4 font-semibold">İletişim</th>
                    <th className="px-6 py-4 font-semibold">Tarih</th>
                    <th className="px-6 py-4 font-semibold">Durum</th>
                    <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{app.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{app.jobTitle}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{app.email}</span>
                          <span>{app.phone}</span>
                          {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Portfolyo Linki</a>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(app.appliedAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={app.status} 
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer ${
                            app.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          <option value="new">Yeni</option>
                          <option value="reviewed">İncelendi</option>
                          <option value="accepted">Kabul Edildi</option>
                          <option value="rejected">Reddedildi</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="secondary" size="sm" className="text-xs">Detay</Button>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Henüz başvuru bulunmamaktadır.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
