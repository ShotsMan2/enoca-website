"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Compass } from "lucide-react";
import "../../src/app/globals.css"; // Ensure styles are loaded

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <html lang="tr">
      <head>
        <title>Sayfa Bulunamadı | Enoca</title>
      </head>
      <body>
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center animate-bounce">
            <Compass className="w-12 h-12 text-accent" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-black font-display text-foreground tracking-tighter">
            4<span className="text-accent">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Kaybolmuş Görünüyorsunuz
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir. Endişelenmeyin, sizi tekrar doğru rotaya sokalım.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto h-14 px-8 rounded-xl bg-card border border-border text-foreground font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </button>
          
          <Link 
            href="/"
            className="w-full sm:w-auto h-14 px-8 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-all hover:shadow-accent-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Anasayfa
          </Link>

          <Link 
            href="/arama"
            className="w-full sm:w-auto h-14 px-8 rounded-xl border border-transparent bg-muted text-foreground font-bold hover:border-border transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Sitede Ara
          </Link>
        </div>

      </div>

      {/* Brand Footer */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <div className="text-xl font-display font-black tracking-tighter text-foreground/40">
          enoca<sup className="text-xs font-sans ml-0.5">&trade;</sup>
        </div>
      </div>
    </div>
      </body>
    </html>
  );
}
