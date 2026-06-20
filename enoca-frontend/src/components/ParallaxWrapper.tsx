"use client";

import { useEffect, useState, useRef } from "react";

export default function ParallaxWrapper({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div 
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className="will-change-transform"
    >
      {children}
    </div>
  );
}
