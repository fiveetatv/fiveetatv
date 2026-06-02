"use client";

import Image from "next/image";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WishlistItem({ item, onRemove, onMoveToCart }) {
  const { addToCart } = useCart();

  const handleMoveToCart = () => {
    addToCart({
      _id: item.productId,
      name: item.name,
      discountPrice: item.price,
      images: [item.image],
      slug: item.slug,
    });
    onRemove(item.productId);
  };

  return (
    <div className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-center py-8 border-b border-border group">
      
      {/* Image */}
      <Link href={`/product/${item.slug}`} className="relative h-32 w-32 md:h-24 md:w-24 overflow-hidden rounded-2xl bg-white/50 border border-border shadow-sm block flex-shrink-0">
        <Image 
          src={item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"} 
          alt={item.name} 
          fill 
          sizes="128px" 
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col justify-center space-y-2">
        <Link href={`/product/${item.slug}`} className="text-xl font-display text-foreground hover:text-accent transition-colors duration-500">
          {item.name}
        </Link>
        <p className="text-sm text-foreground/60 font-light tracking-normal uppercase">₹{item.price}</p>
        {item.originalPrice > item.price && (
          <p className="text-xs text-foreground/30 line-through font-light">₹{item.originalPrice}</p>
        )}
        <div className="md:hidden mt-4 flex items-center gap-3">
          <button 
            onClick={handleMoveToCart}
            className="flex items-center gap-2 h-10 px-4 rounded-full bg-accent text-background hover:bg-accent/90 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
          <button onClick={() => onRemove(item.productId)} className="text-foreground/40 hover:text-red-500 transition-colors duration-500 p-2">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex flex-col items-center justify-center gap-3">
        <button 
          onClick={handleMoveToCart}
          className="flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-background hover:bg-accent/90 transition-colors duration-300 font-light uppercase tracking-normal text-xs"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
        <button 
          onClick={() => onRemove(item.productId)} 
          className="text-[10px] uppercase tracking-normal font-light text-foreground/40 hover:text-red-500 transition-colors duration-500 flex items-center gap-1"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>

    </div>
  );
}
