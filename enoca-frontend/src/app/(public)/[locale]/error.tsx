"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const lang = pathname.startsWith('/en') ? 'en' : 'tr';

  useEffect(() => {
    // Kurumsal sistemlerde hatalar Sentry, LogRocket gibi yerlere gönderilebilir
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#050816_55%,_#060b1a_100%)] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-xl w-full text-center space-y-8 relative z-10 bg-slate-950/70 border border-white/10 p-8 rounded-3xl backdrop-blur shadow-[0_35px_120px_rgba(2,132,199,0.15)]">
        <div className="w-20 h-20 bg-red-950/30 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {lang === 'en' ? "An Unexpected Error Occurred" : "Beklenmeyen Bir Hata Oluştu"}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {lang === 'en' 
              ? "We apologize for the inconvenience. Our technical team has been notified. You can try reloading the page."
              : "Bu durumdan dolayı özür dileriz. Teknik ekibimiz bilgilendirildi. Sayfayı yenilemeyi veya anasayfaya dönmeyi deneyebilirsiniz."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {lang === 'en' ? "Try Again" : "Tekrar Dene"}
          </button>
          <Link
            href={`/${lang}`}
            className="w-full sm:w-auto px-6 py-3 border border-white/15 hover:border-sky-400/40 text-slate-200 hover:text-white font-bold rounded-full transition-all flex items-center justify-center gap-2"
          >
            {lang === 'en' ? "Back to Home" : "Anasayfa"}
          </Link>
        </div>
      </div>
    </div>
  );
}
