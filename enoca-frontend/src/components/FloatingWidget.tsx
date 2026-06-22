"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('FloatingWidget');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-72 p-4 transform transition-all animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              {t('liveSupport')}
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white">{t('contactUs')}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('helpMessage')}
          </p>
          <a
            href="https://wa.me/908502217354"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full text-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-green-500/20 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t('whatsappBtn')}
          </a>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
