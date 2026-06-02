"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GlowButton({ children, className = "", ...props }) {
  return (
    <motion.button
      className={`relative px-10 py-4 rounded-full text-xs font-light tracking-tight uppercase overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
