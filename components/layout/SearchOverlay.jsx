"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { SEARCH_PAGES } from "@/components/layout/nav-config";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const closeSearch = useCallback(() => {
    setQuery("");
    setProducts([]);
    onClose();
  }, [onClose]);

  // Handle Search Logic
  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim().length < 2) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        
        // Ensure data.products exists and filter locally
        const filtered = (data.products || []).filter((p) => 
          p.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        setProducts(filtered);
      } catch (err) {
        console.error("Search failed:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300); // Debounce to make it feel fast
    return () => clearTimeout(timer);
  }, [query]);

  const matchedPages = useMemo(() => {
    if (!query.trim()) return SEARCH_PAGES.slice(0, 4);
    return SEARCH_PAGES.filter((page) => 
      page.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[70] bg-[#1a2216]/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[10%] z-[75] w-[90vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-3xl border border-white/50 bg-white/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-[#e7efd2] px-6 py-5">
              <Search className="h-6 w-6 text-[#3e5c32]" />
              <input
                autoFocus
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-[#a3b398] text-[#3e5c32]"
              />
              <button onClick={closeSearch} className="text-[#506746] hover:text-[#3e5c32]"><X size={20} /></button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Product Results */}
                <div>
                  <h3 className="mb-3 px-2 text-[10px] font-bold uppercase tracking-normal text-[#506746]/50">Products</h3>
                  {loading ? (
                    <div className="px-2 text-sm text-[#506746]">Searching...</div>
                  ) : products.length > 0 ? (
                    <div className="space-y-2">
                      {products.map((product) => (
                        <Link key={product._id} href={`/product/${product.slug}`} onClick={closeSearch} className="group flex items-center gap-4 rounded-2xl p-2 hover:bg-[#f8f7ef] transition-colors">
                          <div className="relative h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                            <Image src={product.images?.[0] || ""} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#35512d]">{product.name}</p>
                            <p className="text-xs text-[#68825d]">Rs. {product.discountPrice}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    query.length >= 2 && <p className="px-2 text-sm text-[#68825d]">No products found.</p>
                  )}
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="mb-3 px-2 text-[10px] font-bold uppercase tracking-normal text-[#506746]/50">Quick Links</h3>
                  <div className="space-y-1">
                    {matchedPages.map((page) => (
                      <Link key={page.href} href={page.href} onClick={closeSearch} className="block rounded-xl px-3 py-2 hover:bg-[#f8f7ef] transition-colors">
                        <p className="text-sm font-medium text-[#35512d]">{page.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}