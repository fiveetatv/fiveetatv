"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, FileText, X, File, User, ShoppingCart } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { SEARCH_PAGES } from "@/components/layout/nav-config";

const PDFS = [
  { name: "Terms and Conditions", path: "/terms/Terms and Conditions.pdf" },
  { name: "Privacy Policy", path: "/terms/Privacypolicy.pdf" },
  { name: "Refund Policy", path: "/terms/Refund policy.pdf" },
  { name: "Shipping and Cancellation", path: "/terms/shipping and cancellation.pdf" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState({ products: [], pdfs: [] });

  useEffect(() => {
    setSearchQuery(query);
    performSearch(query);
  }, [query]);

  const performSearch = async (q) => {
    if (!q) {
      setResults({ products: [], pdfs: [], pages: [] });
      return;
    }

    try {
      // Search products
      const productsRes = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const products = await productsRes.json();

      // Filter PDFs
      const filteredPdfs = PDFS.filter(pdf =>
        pdf.name.toLowerCase().includes(q.toLowerCase())
      );

      // Filter pages
      const filteredPages = SEARCH_PAGES.filter(page =>
        page.title.toLowerCase().includes(q.toLowerCase()) ||
        page.description.toLowerCase().includes(q.toLowerCase())
      );

      setResults({ products, pdfs: filteredPdfs, pages: filteredPages });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <PageTransition>
      <div className="bg-background text-foreground w-full min-h-screen pt-24 md:pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Search Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-12 space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">Search</h1>
            <form onSubmit={handleSubmit} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products and documents..."
                className="w-full pl-12 pr-12 py-4 rounded-full border border-border bg-white/50 focus:border-accent outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); performSearch(""); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </form>
          </motion.div>

          {/* Results */}
          <div className="space-y-12">
            {/* Products */}
            {results.products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-light mb-6 tracking-[0.01em]">Products ({results.products.length})</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.products.map((product, i) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="group"
                    >
                      <Link href={`/product/${product.slug}`} className="block">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4">
                          <Image
                            src={product.images?.[0] || '/placeholder.png'}
                            alt={product.name}
                            fill
                            quality={75}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                        <h3 className="text-lg font-light">{product.name}</h3>
                        <p className="text-sm text-foreground/60 font-light">₹{product.discountPrice}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pages */}
            {results.pages && results.pages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-xl font-light mb-6 tracking-[0.01em]">Pages ({results.pages.length})</h2>
                <div className="space-y-4">
                  {results.pages.map((page, i) => (
                    <motion.a
                      key={page.href}
                      href={page.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white/30 hover:bg-white/50 hover:border-accent transition-all duration-300 group"
                    >
                      <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                        <File size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{page.title}</p>
                        <p className="text-xs text-foreground/50">{page.description}</p>
                      </div>
                      <span className="text-accent text-sm font-light tracking-[0.05em] group-hover:translate-x-1 transition-transform duration-300">
                        View
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PDFs */}
            {results.pdfs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-light mb-6 tracking-[0.01em]">Documents ({results.pdfs.length})</h2>
                <div className="space-y-4">
                  {results.pdfs.map((pdf, i) => (
                    <motion.a
                      key={pdf.path}
                      href={pdf.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white/30 hover:bg-white/50 hover:border-accent transition-all duration-300 group"
                    >
                      <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{pdf.name}</p>
                        <p className="text-xs text-foreground/50">PDF Document</p>
                      </div>
                      <span className="text-accent text-sm font-light tracking-[0.05em] group-hover:translate-x-1 transition-transform duration-300">
                        View
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Results */}
            {results.products.length === 0 && results.pdfs.length === 0 && (!results.pages || results.pages.length === 0) && query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-foreground/60 text-lg font-light">No results found for "{query}"</p>
                <p className="text-foreground/40 text-sm mt-2">Try searching for products, pages, or documents</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
