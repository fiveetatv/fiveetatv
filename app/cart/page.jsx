"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import PageTransition from "@/components/ui/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import CartItem from "@/components/cart/CartItem";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import FloatingLeaf from "@/components/ui/FloatingLeaf";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const shipping = cartItems.length ? (total > 1500 ? 0 : 99) : 0;
  const grandTotal = total + shipping;

  return (
    <PageTransition>
      <div className="min-h-[80vh] bg-background w-full pt-24 md:pt-32 pb-20 relative overflow-hidden">
        {/* Decorative Leaves */}
        <FloatingLeaf 
          type="single" 
          className="w-16 h-16 md:w-24 md:h-24 top-20 right-10 opacity-20 rotate-[30deg]" 
          delay={0.1} 
        />
        <FloatingLeaf 
          type="double" 
          className="w-20 h-20 md:w-32 md:h-32 bottom-40 -left-10 opacity-15 rotate-[-15deg]" 
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
              Your Cart
            </h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-16 border border-foreground/10 rounded-2xl bg-muted/50 flex flex-col items-center justify-center text-center space-y-6"
            >
              <p className="text-base font-light text-foreground/60 max-w-md">Your cart is empty.</p>
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
                <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-8 pb-6 border-b border-foreground/10 text-xs uppercase tracking-normal text-foreground/50 font-medium">
                  <span className="w-32">Product</span>
                  <span>Details</span>
                  <span className="w-32 text-center">Quantity</span>
                  <span className="w-24 text-right">Total</span>
                </div>
                <div className="space-y-6">
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <CartItem item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
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
                <h2 className="text-xl font-display italic text-accent">Order Summary</h2>
                
                <div className="space-y-4 text-foreground/80 font-light">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span> 
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span> 
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent/80 pt-2">Add ₹{1500 - total} more for free shipping</p>
                  )}
                  
                  <div className="flex justify-between items-center pt-6 border-t border-foreground/10 text-xl text-foreground font-medium">
                    <span>Total</span> 
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full h-11 rounded-full bg-accent text-background flex items-center justify-center gap-3 hover:bg-accent/90 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
                >
                  Checkout <ArrowRight size={14} strokeWidth={1.5} />
                </Link>

                <div className="space-y-4 pt-6 border-t border-foreground/10">
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <ShieldCheck size={18} className="text-accent" />
                    <span>Secure encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <Truck size={18} className="text-accent" />
                    <span>Free shipping over ₹1500</span>
                  </div>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}