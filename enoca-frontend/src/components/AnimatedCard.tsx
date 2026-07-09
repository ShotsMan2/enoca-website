"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AnimatedCard({ children, className = '', ...rest }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
