"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* Arka plan dekoratif daire */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />

      {/* Yavaşça dönen devasa kesik çizgili halka */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-accent/20"
      />

      {/* Süzülen Ana Kart (Asimetrik odak noktası) */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-64 bg-card rounded-2xl shadow-xl border border-border p-6 ml-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <div>
            <div className="h-3 w-20 bg-muted rounded-full mb-2" />
            <div className="h-2 w-12 bg-muted/60 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full" />
          <div className="h-2 w-5/6 bg-muted rounded-full" />
          <div className="h-2 w-4/6 bg-muted rounded-full" />
        </div>
      </motion.div>

      {/* Süzülen İkincil Kart (Farklı hızda) */}
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 left-10 z-20 w-48 bg-card rounded-xl shadow-accent-lg border-2 border-accent/10 p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="h-2 w-16 bg-muted rounded-full" />
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-accent to-accent-secondary mb-2" />
        <div className="h-1.5 w-full bg-muted rounded-full" />
      </motion.div>

      {/* Süsleme Noktaları (Dot Grid) */}
      <div className="absolute top-10 right-10 grid grid-cols-3 gap-2 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-foreground" />
        ))}
      </div>
    </div>
  );
}
