"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Search, X, Briefcase, FileText, Send, Newspaper, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    
    const handleCustomOpen = () => setOpen(true);
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const results = [
    { title: "Çözümlerimiz", icon: <LayoutGrid className="w-4 h-4" />, href: "/cozumler" },
    { title: "Haberler & Blog", icon: <Newspaper className="w-4 h-4" />, href: "/haberler" },
    { title: "Kariyer & İş İlanları", icon: <Briefcase className="w-4 h-4" />, href: "/kariyer" },
    { title: "İletişim", icon: <Send className="w-4 h-4" />, href: "/iletisim" },
    { title: "Hakkımızda", icon: <FileText className="w-4 h-4" />, href: "/hakkimizda" },
  ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Arkaplan Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-card w-full max-w-2xl rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-border overflow-hidden ring-1 ring-white/10"
          >
        
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
          <input 
            autoFocus
            type="text" 
            placeholder="Ne arıyorsunuz? (Çözümler, Kariyer...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-lg"
          />
          <button 
            onClick={() => setOpen(false)}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sonuçlar */}
        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground text-sm">Sonuç bulunamadı.</p>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-foreground font-medium flex-1">{item.title}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Git →</span>
              </button>
            ))
          )}
        </div>

        {/* Footer (İpucu) */}
        <div className="px-4 py-3 border-t border-border bg-muted/20 flex justify-between items-center text-xs text-muted-foreground font-medium">
          <span>Hızlı Menü</span>
          <div className="flex items-center gap-2">
            <span>Kapatmak için</span>
            <kbd className="px-2 py-1 bg-muted rounded border border-border font-mono text-[10px]">ESC</kbd>
          </div>
        </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
