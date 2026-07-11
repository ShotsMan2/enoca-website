"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* Refined background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10" />

      {/* Elegant rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute w-[450px] h-[450px] rounded-full border border-accent/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-accent/20 opacity-50"
      />

      {/* Main Glass Card */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-72 bg-card/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/5 p-8 ml-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg shadow-accent/20">
            <div className="w-4 h-4 bg-white/90 rounded-full" />
          </div>
          <div>
            <div className="h-3.5 w-24 bg-foreground/80 rounded-full mb-2" />
            <div className="h-2 w-14 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-2 w-full bg-muted rounded-full" />
          <div className="h-2 w-5/6 bg-muted rounded-full" />
          <div className="h-2 w-4/6 bg-muted rounded-full" />
        </div>
      </motion.div>

      {/* Secondary Floating Card */}
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-16 left-8 z-20 w-56 bg-card/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 dark:border-white/5 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-2.5 w-20 bg-muted-foreground/60 rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-glow-sm" />
        </div>
        <div className="h-10 w-28 rounded-xl bg-gradient-to-r from-accent to-accent-secondary mb-3 opacity-90" />
        <div className="h-1.5 w-full bg-muted rounded-full" />
      </motion.div>

      {/* Minimalist Grid Pattern */}
      <div className="absolute top-12 right-12 grid grid-cols-3 gap-3 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-foreground/40" />
        ))}
      </div>
    </div>
  );
}
