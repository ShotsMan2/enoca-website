"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { useToast } from "./ToastProvider";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  toEmail: string;
  defaultSubject?: string;
}

export default function EmailModal({ isOpen, onClose, toEmail, defaultSubject = "" }: EmailModalProps) {
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSending(true);
    try {
      await adminApi.sendEmail(toEmail, subject, message);
      toast("E-posta başarıyla gönderildi.", "success");
      onClose();
      setSubject(defaultSubject);
      setMessage("");
    } catch (err: any) {
      toast(err.message || "E-posta gönderilirken bir hata oluştu.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-800 dark:text-white">E-posta Gönder</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSend} className="p-6 space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Alıcı</label>
            <input 
              type="text" 
              readOnly 
              value={toEmail} 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Konu</label>
            <input 
              type="text" 
              required 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="E-posta konusu..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Mesaj</label>
            <textarea 
              required 
              rows={6}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              İptal
            </button>
            <button type="submit" disabled={sending} className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70">
              <Send className="w-4 h-4" />
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
