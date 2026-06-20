"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle logic is usually handled by parent, but here we just ensure if it's already open, it stays open or handled
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4 backdrop-blur-xl bg-background/80 animate-in fade-in duration-200">
      {/* Arka plan overlay tıklandığında kapat */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <form onSubmit={handleSubmit} className="relative flex items-center px-4">
          <Search className="w-6 h-6 text-muted-foreground ml-2" />
          <input
            type="text"
            className="w-full h-16 px-4 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
            placeholder="Aramak istediğiniz terimi yazın..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </form>
        
        {query.trim().length > 0 && (
          <div className="border-t border-border p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">&quot;{query}&quot;</span> için arama sonuçlarına gitmek için <kbd className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">Enter</kbd> tuşuna basın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
