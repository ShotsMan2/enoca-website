"use client";

import { ReactNode } from "react";

export default function Marquee({ children, speed = 30 }: { children: ReactNode, speed?: number }) {
  return (
    <div className="relative flex overflow-hidden w-full group py-8">
      {/* Sol ve sağ kenarlarda beyazdan transparan'a degrade (maskeleme hissi) */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <div 
        className="flex min-w-full shrink-0 items-center justify-around gap-16 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div 
        className="flex min-w-full shrink-0 items-center justify-around gap-16 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
