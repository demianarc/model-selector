import React from 'react';
import { motion } from 'framer-motion';

interface NeonGradientCardProps {
  children: React.ReactNode;
  className?: string;
}

export function NeonGradientCard({ children, className = '' }: NeonGradientCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl bg-slate-900 p-8 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-xl"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}