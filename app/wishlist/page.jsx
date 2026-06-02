"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import PageTransition from "@/components/ui/PageTransition";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { ArrowRight, Heart } from "lucide-react";
import FloatingLeaf from "@/components/ui/FloatingLeaf";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, total } = useWishlist();

  return (
    <PageTransition>
      <div className="min-h-[80vh] bg-background w-full pt-24 md:pt-32 pb-20 relative overflow-hidden">
        {/* Decorative Leaves */}
        <FloatingLeaf 
          type="branch" 
          className="w-24 h-24 md:w-36 md:h-36 top-10 left-10 opacity-20 -rotate-[15deg]" 
          delay={0.1} 
        />
        <FloatingLeaf 
          type="single" 
          className="w-16 h-16 md:w-24 md:h-24 bottom-20 right-10 opacity-15 rotate-[45deg]" 
          delay={0.4} 
        />
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16 space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">
              Your Wishlist
            </h1>
          </motion.div>

          {wishlistItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-16 border border-foreground/10 rounded-2xl bg-muted/50 flex flex-col items-center justify-center text-center space-y-6"
            >
              <Heart size={48} className="text-foreground/20" />
              <p className="text-base font-light text-foreground/60 max-w-md">Your wishlist is empty.</p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
              >
                Explore Collection <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] gap-16 lg:gap-24">
              <div className="space-y-8">
                <div className="hidden md:grid grid-cols-[auto_1fr_auto] gap-8 pb-6 border-b border-foreground/10 text-xs uppercase tracking-normal text-foreground/50 font-medium">
                  <span className="w-32">Product</span>
                  <span>Details</span>
                  <span className="w-32 text-center">Actions</span>
                </div>
                <div className="space-y-6">
                  {wishlistItems.map((item, i) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <WishlistItem item={item} onRemove={removeFromWishlist} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.aside 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-fit rounded-2xl border border-foreground/10 bg-white/50 p-8 lg:sticky lg:top-32 space-y-6 backdrop-blur-md"
              >
                <h2 className="text-xl font-display italic text-accent">Wishlist Summary</h2>
                
                <div className="space-y-4 text-foreground/80 font-light">
                  <div className="flex justify-between items-center">
                    <span>Total Items</span> 
                    <span>{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-foreground/10 text-xl text-foreground font-medium">
                    <span>Total Value</span> 
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link 
                  href="/cart" 
                  className="w-full h-11 rounded-full bg-accent text-background flex items-center justify-center gap-3 hover:bg-accent/90 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
                >
                  View Cart <ArrowRight size={14} strokeWidth={1.5} />
                </Link>

                <div className="space-y-4 pt-6 border-t border-foreground/10">
                  <p className="text-sm text-foreground/60 text-center">
                    Move items to cart to complete your purchase
                  </p>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
