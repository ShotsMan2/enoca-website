"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Sadece anasayfada ve session boyunca 1 kez göster
    const hasSeenSplash = sessionStorage.getItem("has-seen-splash");
    
    // Eğer anasayfada ise ve henüz splash screen'i görmediyse (ve admin değilse)
    if (!hasSeenSplash && (pathname === "/" || pathname === "/en" || pathname === "/tr") && !pathname.includes("/admin")) {
      setTimeout(() => setShow(true), 0);
      
      // 2.2 saniye sonra fade-out başlat
      setTimeout(() => {
        setIsLeaving(true);
      }, 2200);

      // 3 saniye sonra DOM'dan kaldır
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("has-seen-splash", "true");
      }, 3000);
    } else {
      // Eğer anasayfada değilse veya daha önce gördüyse, bir daha gösterme
      sessionStorage.setItem("has-seen-splash", "true");
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isLeaving ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow Arkası */}
        <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
        
        {/* Logo Text Animation */}
        <div className="relative z-10 overflow-hidden mb-6">
          <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter translate-y-[100%] animate-[slideUp_0.8s_ease-out_forwards]">
            enoca<span className="text-accent">.</span>
          </h1>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_0.8s_forwards]">
          <div className="h-full bg-accent rounded-full animate-[loadingBar_1.5s_ease-in-out_0.8s_forwards]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
