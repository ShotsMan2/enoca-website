"use client";

import { motion } from 'framer-motion';
import React from 'react';

type AnimatedArticleProps = React.ComponentPropsWithoutRef<'article'> & {
  children: React.ReactNode;
};

export default function AnimatedArticle({ children, className = '', ...rest }: AnimatedArticleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.article>
  );
}
