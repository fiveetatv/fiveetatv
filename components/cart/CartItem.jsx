"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="grid grid-cols-[1fr_auto] k md:grid-cols-[auto_1fr_auto_auto] gap-6 md:gap-8 items-center py-8 border-b border-border group">
      
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
        <div className="md:hidden mt-4 flex items-center justify-between">
          <div className="flex items-center border border-border rounded-full h-10 w-24 justify-between px-2">
            <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} className="p-1 hover:text-accent transition-colors duration-500"><Minus size={14} /></button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} className="p-1 hover:text-accent transition-colors duration-500"><Plus size={14} /></button>
          </div>
          <button onClick={() => onRemove(item.productId)} className="text-foreground/40 hover:text-red-500 transition-colors duration-500 p-2">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Desktop Quantity */}
      <div className="hidden md:flex flex-col items-center justify-center gap-2">
        <div className="flex items-center border border-border rounded-full h-12 w-28 justify-between px-2 bg-white/30 backdrop-blur-sm">
          <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} className="p-1.5 hover:text-accent transition-colors duration-500"><Minus size={14} /></button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} className="p-1.5 hover:text-accent transition-colors duration-500"><Plus size={14} /></button>
        </div>
        <button 
          onClick={() => onRemove(item.productId)} 
          className="text-[10px] uppercase tracking-normal font-light text-foreground/40 hover:text-red-500 transition-colors duration-500 flex items-center gap-1"
        >
          Remove
        </button>
      </div>

      {/* Total */}
      <div className="hidden md:flex justify-end items-center w-24">
        <p className="text-lg font-medium text-foreground">₹{item.price * item.quantity}</p>
      </div>

    </div>
  );
}