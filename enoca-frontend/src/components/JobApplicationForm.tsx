"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { adminApi } from "@/lib/admin-api";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

export default function JobApplicationForm({ jobId, jobTitle }: { jobId: number, jobTitle: string }) {
  const t = useTranslations("Careers");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", portfolioUrl: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await adminApi.createApplication({
        jobId: jobId,
        jobTitle: jobTitle,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolioUrl: formData.portfolioUrl || undefined,
        cvFileName: cvFile ? cvFile.name : undefined
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-6 rounded-xl text-center border border-green-200 dark:border-green-800">
        <h3 className="font-bold text-lg mb-2">{t('applicationReceived')}</h3>
        <p>{t('applicationReceivedText')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t('name')} *</label>
        <input 
          required 
          type="text" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t('email')} *</label>
          <input 
            required 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t('phone')} *</label>
          <input 
            required 
            type="tel" 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{t('portfolioUrl')}</label>
        <input 
          type="url" 
          value={formData.portfolioUrl} 
          onChange={e => setFormData({...formData, portfolioUrl: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">CV (PDF)</label>
        
        {!cvFile ? (
          <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
            <input 
              type="file" 
              accept=".pdf"
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  setCvFile(e.target.files[0]);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Yüklemek için tıklayın</span> veya sürükleyin
            </p>
            <p className="text-xs text-gray-400 mt-1">Sadece PDF (Max 5MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm shrink-0">
                <FileIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{cvFile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setCvFile(null)}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <Button disabled={status === "loading"} type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest uppercase rounded-xl mt-4">
        {status === "loading" ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
