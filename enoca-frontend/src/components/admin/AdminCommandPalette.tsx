"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Settings, FileText, Briefcase, Mail, Star, X } from "lucide-react";

type Action = {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  category: string;
};

const actions: Action[] = [
  { id: "dashboard", title: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/admin/dashboard", category: "Genel" },
  { id: "news", title: "Haberler & Blog", icon: <FileText className="w-5 h-5" />, href: "/admin/haberler", category: "İçerik" },
  { id: "career", title: "Kariyer", icon: <Briefcase className="w-5 h-5" />, href: "/admin/kariyer", category: "İçerik" },
  { id: "home-content", title: "Anasayfa İçerik", icon: <Star className="w-5 h-5" />, href: "/admin/anasayfa-icerik", category: "İçerik" },
  { id: "messages", title: "Gelen Mesajlar", icon: <Mail className="w-5 h-5" />, href: "/admin/iletisim", category: "İletişim" },
  { id: "settings", title: "Site Ayarları", icon: <Settings className="w-5 h-5" />, href: "/admin/ayarlar", category: "Sistem" },
];

export default function AdminCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const onSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 sm:pt-32 px-4 backdrop-blur-sm bg-background/50 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setOpen(false)} />
      
      <div className="relative bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Arama Inputu */}
        <div className="flex items-center px-4 py-4 border-b border-border gap-3">
          <Search className="w-6 h-6 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xl text-foreground placeholder:text-muted-foreground outline-none border-none"
            placeholder="Ne yapmak istersiniz? (Haber ara, ayarlar...)"
          />
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sonuç Listesi */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-14 text-center text-muted-foreground text-sm">
              Sonuç bulunamadı.
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onSelect(action.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-white group transition-colors text-left"
                >
                  <div className="text-muted-foreground group-hover:text-white/80 transition-colors">
                    {action.icon}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold text-foreground group-hover:text-white transition-colors">{action.title}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors">{action.category}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground group-hover:text-white/50">
                    Jump
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Hareket etmek için <kbd className="font-mono bg-muted border border-border rounded px-1 text-[10px]">↑</kbd> <kbd className="font-mono bg-muted border border-border rounded px-1 text-[10px]">↓</kbd></span>
          <span>Seçmek için <kbd className="font-mono bg-muted border border-border rounded px-1 text-[10px]">Enter</kbd></span>
        </div>
      </div>
    </div>
  );
}
