"use client";

import { useEffect, useState } from "react";
import { Link2, Check } from "lucide-react";

export default function NewsClientFeatures({ title }: { title: string }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setTimeout(() => setUrl(window.location.href), 0);

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress(Number(((currentScrollY / scrollHeight) * 100).toFixed(2)));
      }
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-white/10 z-[100]">
        <div 
          className="h-full bg-sky-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Buttons */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Bu Haberi Paylaş
        </div>
        <div className="flex items-center gap-2">
          {/* Twitter (X) Custom SVG */}
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.965h-1.853z" />
            </svg>
          </button>
          
          {/* LinkedIn Custom SVG */}
          <button 
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </button>

          <button 
            onClick={handleCopy}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/30 transition-colors"
            title="Bağlantıyı Kopyala"
          >
            {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
}
