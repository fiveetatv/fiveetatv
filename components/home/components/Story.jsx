"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FloatingLeaf from '@/components/ui/FloatingLeaf';

export default function Story() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Leaves */}
      <FloatingLeaf 
        type="single" 
        className="w-16 h-16 md:w-20 md:h-20 top-10 right-[5%] opacity-30 rotate-[15deg]" 
        delay={0.2} 
        parallaxSpeed={40} 
      />
      <FloatingLeaf 
        type="double" 
        className="w-24 h-24 md:w-32 md:h-32 bottom-0 left-[2%] opacity-15 rotate-[-45deg]" 
        delay={0.5} 
        parallaxSpeed={-30} 
        blur
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Left */}
          <motion.div {...fadeUp} className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl font-light text-[#4B3B32] leading-tight">
              Our Story
            </h2>
            
            <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed font-light">
              <p>
                At Fiveetatv, our mission is simple: to make better health
                accessible to everyone. Inspired by the age-old wisdom of
                Ayurveda, we've combined nature's finest ingredients with
                modern science to create supplements you can trust.
              </p>
              
              <p>
                Every product is crafted with care, ensuring the highest
                standards of quality. For us, it's not just about supplements—
                it's about building a connection based on honesty, care, and
                your well-being.
              </p>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group"
          >
            <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square">
              <Image 
                src="/posters/story.png" 
                alt="Our Story - Trusted by many" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                quality={80}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}