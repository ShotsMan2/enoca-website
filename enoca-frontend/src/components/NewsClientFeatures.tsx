"use client";

import { useEffect, useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function NewsClientFeatures({ title }: { title: string }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);

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

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-border z-[100]">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Share Buttons */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Bu Haberi Paylaş
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={shareTwitter}
            className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors"
            title="Twitter'da Paylaş"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button 
            onClick={shareLinkedin}
            className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors"
            title="LinkedIn'de Paylaş"
          >
            <Linkedin className="w-5 h-5" />
          </button>
          <button 
            onClick={handleCopy}
            className="w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors relative"
            title="Bağlantıyı Kopyala"
          >
            {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
}
