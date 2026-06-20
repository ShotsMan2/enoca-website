"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export default function CountUp({ end, suffix = "", duration = 2, title }: { end: number, suffix?: string, duration?: number, title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      springValue.set(end);
    }
  }, [isInView, end, springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl border border-border shadow-sm">
      <div className="flex items-baseline gap-1 text-4xl md:text-5xl font-black font-display text-accent mb-2">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-widest text-center">{title}</p>
    </div>
  );
}
