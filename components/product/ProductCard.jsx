"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import { ShoppingBag, Heart, ArrowUpRight } from "lucide-react";

const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k=";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlist = useCallback((e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success("Removed");
    } else {
      addToWishlist(product);
      toast.success("Saved to favorites");
    }
  }, [product._id, isInWishlist, addToWishlist, removeFromWishlist]);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    toast.success("Added to Bag");
  }, [product, addToCart]);

  return (
    <div className="group flex flex-col w-full transition-all duration-500">
      {/* 1. Image Container - The Visual Hero */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k="
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </Link>

        {/* Permanent Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <span className="pointer-events-auto px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-normal font-bold text-black rounded-full shadow-sm">
            {product.category || "Organic"}
          </span>
          
          <button
            onClick={handleWishlist}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Heart 
              size={16} 
              className={isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-black/40"} 
            />
          </button>
        </div>

        {/* Permanent Quick Add - Minimalist Floating Pill */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
          <button
            onClick={handleAddToCart}
            className="w-full max-w-[160px] py-3 bg-black/90 backdrop-blur-md text-white rounded-full flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
          >
            <ShoppingBag size={14} strokeWidth={2.5} />
            <span className="text-[10px] uppercase tracking-normal font-bold">Quick Add</span>
          </button>
        </div>
      </div>

      {/* 2. Info Section - Editorial Spacing */}
      <div className="pt-5 pb-2 px-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-1">
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-lg font-serif text-[#1A1A1A] leading-tight group-hover:text-emerald-900 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-black">₹{product.discountPrice}</span>
              {product.price > product.discountPrice && (
                <span className="text-xs text-black/30 line-through font-light">₹{product.price}</span>
              )}
            </div>
          </div>

          {/* Luxury Navigation Hint */}
          <Link 
            href={`/product/${product.slug}`}
            className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black/20 transition-all"
          >
            <ArrowUpRight size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);