"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/product/ProductSkeleton";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function CollectionContent({ products }) {
  return (
    <div className="min-h-screen bg-background text-foreground w-full pt-24 md:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            Our Collection
          </h1>
          <p className="text-base text-foreground/60 font-light max-w-md">
            Meticulously crafted formulations for balanced living.
          </p>
        </motion.div>

        {products && products.length > 0 ? (
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
          <ProductGridSkeleton count={6} />
        )}
      </div>
    </div>
  );
}