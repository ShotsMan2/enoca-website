"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname.startsWith('/en') ? 'en' : 'tr';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#050816_55%,_#060b1a_100%)] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      
      {/* Dekoratif Arka Plan Öğeleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        <h1 className="text-9xl font-black text-white tracking-tighter pr-4">
          404
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            {lang === 'en' ? "Page Not Found" : "Sayfa Bulunamadı"}
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto leading-relaxed">
            {lang === 'en' 
              ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              : "Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href={`/${lang}`}
            className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {lang === 'en' ? "Back to Home" : "Anasayfaya Dön"}
          </Link>
          <Link
            href={`/${lang}/iletisim`}
            className="w-full sm:w-auto px-8 py-4 border border-white/15 hover:border-sky-400/40 text-slate-200 hover:text-white font-bold rounded-full transition-all flex items-center justify-center gap-2"
          >
            {lang === 'en' ? "Contact Us" : "İletişime Geç"}
          </Link>
        </div>
      </div>
    </div>
  );
}
