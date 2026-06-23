"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";

export default function Marquee({ children, speed = 30, showControls = false }: { children: ReactNode, speed?: number, showControls?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef(false);

  useEffect(() => {
    let animationId: number;

    const loop = () => {
      if (isPlaying && !isHovered && !isManualScrolling.current && containerRef.current) {
        // Speed calculation: speed prop is ~duration. Smaller speed = faster.
        // We'll use a constant pixel increment.
        containerRef.current.scrollLeft += 1.5; 
        
        // Loop logic
        const halfWidth = containerRef.current.scrollWidth / 2;
        if (containerRef.current.scrollLeft >= halfWidth) {
          containerRef.current.scrollLeft -= halfWidth;
        } else if (containerRef.current.scrollLeft <= 0) {
          // If scrolled all the way left manually
          containerRef.current.scrollLeft += halfWidth;
        }
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, isHovered]);

  const handleManualScroll = (offset: number) => {
    if (!containerRef.current) return;
    
    isManualScrolling.current = true;
    containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    
    // Resume auto-scroll after smooth scroll animation completes (~500ms)
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 500);
  };

  return (
    <div className="relative flex flex-col w-full group py-8">
      {/* Sol ve sağ kenarlarda beyazdan transparan'a degrade (maskeleme hissi) */}
      <div className="relative flex overflow-hidden w-full">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex min-w-full overflow-x-hidden no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex shrink-0 items-center justify-around gap-16 px-8">
            {children}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-16 px-8" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>

      {showControls && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between mt-8 relative z-20">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-card border border-border text-foreground hover:bg-accent hover:text-white transition-colors cursor-pointer rounded-sm"
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={() => handleManualScroll(-300)}
              className="w-12 h-12 flex items-center justify-center bg-card border border-border text-foreground hover:bg-accent hover:text-white transition-colors cursor-pointer rounded-sm"
              aria-label="Sola Kaydır"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleManualScroll(300)}
              className="w-12 h-12 flex items-center justify-center bg-card border border-border text-foreground hover:bg-accent hover:text-white transition-colors cursor-pointer rounded-sm"
              aria-label="Sağa Kaydır"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
