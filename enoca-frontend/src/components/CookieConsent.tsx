"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Component yüklendiğinde çerez tercihini kontrol et
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 pointer-events-none flex justify-center">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-5 md:p-6 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto transform transition-all translate-y-0 opacity-100">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Çerez Politikamız</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sitemizde size en iyi deneyimi sunabilmek için çerez (cookie) kullanıyoruz. 
            Çerezler, sitemizin trafiğini analiz etmek ve hizmetlerimizi geliştirmek amacıyla kullanılır. 
            &quot;Kabul Et&quot; butonuna tıklayarak çerez kullanımına izin vermiş olursunuz.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={declineCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-semibold text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Reddet
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
