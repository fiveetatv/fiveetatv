"use client";

import React, { useState, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductSkeleton from '@/components/product/ProductSkeleton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import FloatingLeaf from '@/components/ui/FloatingLeaf';

function Products({ products = [] }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <section id="products" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      <FloatingLeaf 
        type="branch" 
        className="w-48 h-48 md:w-64 md:h-64 -top-10 -right-20 md:-top-16 md:-right-24 opacity-35 rotate-[135deg]" 
        delay={0.2} 
        parallaxSpeed={80}
        blur 
      />
      <FloatingLeaf 
        type="double" 
        className="w-24 h-24 md:w-32 md:h-32 top-[40%] -left-10 md:-left-12 opacity-55 rotate-[-45deg]" 
        delay={0.5} 
        parallaxSpeed={-40}
      />
      
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col"
        >
          <SectionHeader
            title="Shop Now"
            description="Balance Your Elements, Naturally."
          />
        </motion.div>

        <div className="grid gap-8 md:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : products.length > 0 ? (
            products.slice(0, 3).map((p, i) => (
              <motion.div 
                key={p._id || i} 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
              >
                <div className="relative">
                  <ProductCard product={p} />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-foreground/30 col-span-full text-center py-16 md:py-24 font-light italic text-sm sm:text-base">
              New arrivals coming soon.
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center pt-4"
        >
          <Link 
            href="/collection" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#658518] text-white rounded-lg font-medium text-sm hover:bg-[#546e14] transition-all shadow-lg shadow-green-900/10 active:scale-95 group"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Products;