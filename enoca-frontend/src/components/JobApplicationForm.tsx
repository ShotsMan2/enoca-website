"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function JobApplicationForm({ jobId, jobTitle }: { jobId: number, jobTitle: string }) {
  const t = useTranslations("Careers");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", portfolioUrl: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // In a real app, you would POST this to an API
      // await fetch('/api/apply', { method: 'POST', body: JSON.stringify({ jobId, jobTitle, ...formData }) })
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-6 rounded-xl text-center border border-green-200 dark:border-green-800">
        <h3 className="font-bold text-lg mb-2">Başvurunuz Alındı!</h3>
        <p>İlginiz için teşekkür ederiz. İnsan kaynakları ekibimiz başvurunuzu değerlendirip size dönüş yapacaktır.</p>
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
      
      <Button disabled={status === "loading"} type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest uppercase rounded-xl mt-4">
        {status === "loading" ? "Gönderiliyor..." : t('submit')}
      </Button>
    </form>
  );
}
