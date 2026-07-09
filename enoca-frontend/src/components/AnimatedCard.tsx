"use client";

import { motion } from 'framer-motion';
import React from 'react';

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
