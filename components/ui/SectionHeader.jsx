"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ 
  label, 
  title, 
  description, 
  align = "left",
  showArrow = false 
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-4 max-w-2xl ${alignClasses[align]}`}
    >
      {label && (
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-8 bg-accent" />
          <span className="text-xs text-accent/70 uppercase tracking-normal font-light">
            {label}
          </span>
          {showArrow && (
            <div className="h-[1px] w-8 bg-accent" />
          )}
        </div>
      )}
      
      {title && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
          {title}
        </h2>
      )}
      
      {description && (
        <p className="text-foreground/60 font-light text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
