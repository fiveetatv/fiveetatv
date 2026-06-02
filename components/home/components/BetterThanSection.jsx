"use client";

import React from 'react';
import { Leaf, Award, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingLeaf from '@/components/ui/FloatingLeaf';

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure & Safe Ingredients"
  },
  {
    icon: Award,
    title: "Ayurvedic Process",
    description: "Ancient Wisdom, Modern Care"
  },
  {
    icon: ShieldCheck,
    title: "Boosts Immunity",
    description: "Stronger You, Every Day"
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
    description: "At Your Doorstep"
  }
];

export default function BetterThanSection() {
  return (
      <div className="relative w-full bg-[#EBF1E4] py-7 md:py-8 overflow-hidden">
      <FloatingLeaf 
        type="single" 
        className="w-12 h-12 top-2 right-[20%] opacity-40 rotate-[45deg]" 
        delay={0.1} 
        parallaxSpeed={30} 
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-3 md:gap-4"
            >
              <div className="flex-shrink-0">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-[#748E3E]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                  {feature.title}
                </span>
                <span className="text-[10px] md:text-xs text-slate-600 mt-0.5">
                  {feature.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
