"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/product/ProductSkeleton";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function CollectionContent({ products, category }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-background text-foreground w-full pt-24 md:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight capitalize">
            {category}
          </h1>
          <p className="text-base text-foreground/60 font-light max-w-md">
            Meticulously crafted formulations for balanced living.
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : products && products.length > 0 ? (
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-16 border border-foreground/10 rounded-2xl bg-muted/50 flex flex-col items-center justify-center text-center space-y-6"
          >
            <p className="text-base font-light text-foreground/60">
              Products for this collection are coming soon.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
            >
              Explore All <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
