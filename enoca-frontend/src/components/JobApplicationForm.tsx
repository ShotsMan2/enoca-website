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
    if (!cvFile) {
      alert("Lütfen bir CV yükleyiniz. / Please upload a CV.");
      return;
    }
    setStatus("loading");
    try {
      let cvBase64: string | undefined = undefined;
      if (cvFile) {
        cvBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(cvFile);
        });
      }

      await adminApi.createApplication({
        jobId: jobId,
        jobTitle: jobTitle,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolioUrl: formData.portfolioUrl || undefined,
        cvFileName: cvFile ? cvFile.name : undefined,
        cvFileBase64: cvBase64
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-500/10 text-emerald-300 p-6 rounded-xl text-center border border-emerald-500/20">
        <h3 className="font-bold text-lg mb-2">{t('applicationReceived')}</h3>
        <p>{t('applicationReceivedText')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-1">{t('name')}</label>
        <input 
          type="text" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/40 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">{t('email')} *</label>
          <input 
            required 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/40 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">{t('phone')} *</label>
          <input 
            required 
            type="tel" 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/40 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-1">{t('portfolioUrl')} *</label>
        <input 
          required
          type="url" 
          value={formData.portfolioUrl} 
          onChange={e => setFormData({...formData, portfolioUrl: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950/40 focus:ring-2 focus:ring-sky-500 outline-none transition-all text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">CV (PDF) *</label>
        
        {!cvFile ? (
          <div className="relative border-2 border-dashed border-white/10 hover:border-sky-400/40 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer group">
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
            <UploadCloud className="w-8 h-8 text-sky-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-sky-400">Yüklemek için tıklayın</span> veya sürükleyin
            </p>
            <p className="text-xs text-slate-500 mt-1">Sadece PDF (Max 5MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-sky-400/10 border border-sky-400/20 rounded-xl">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-slate-900 p-2 rounded-lg shadow-sm shrink-0">
                <FileIcon className="w-5 h-5 text-sky-400" />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">{cvFile.name}</p>
                <p className="text-xs text-slate-400">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setCvFile(null)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <Button disabled={status === "loading"} type="submit" className="w-full h-12 bg-sky-500 hover:bg-sky-400 text-white font-bold tracking-widest uppercase rounded-full mt-4">
        {status === "loading" ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
