"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 10);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={mounted ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="will-change-[opacity]"
    >
      {children}
    </motion.div>
  );
}
