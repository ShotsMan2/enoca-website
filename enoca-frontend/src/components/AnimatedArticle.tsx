"use client";

import { motion } from 'framer-motion';
import React from 'react';

type AnimatedArticleProps = {
  children: React.ReactNode;
  className?: string;
  transition?: Record<string, unknown>;
};

export default function AnimatedArticle({ children, className = '', transition }: AnimatedArticleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition ?? { duration: 0.35 }}
      className={className}
    >
      {children}
    </motion.article>
  );
}
