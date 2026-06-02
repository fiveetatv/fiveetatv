"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MagicCard({ children, className = "", ...props }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl bg-white/30 border border-border/50 backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-highlight/0 hover:from-accent/5 hover:to-highlight/5 transition-all duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
