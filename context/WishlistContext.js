"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      }
    } catch (error) {
      console.warn("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlistItems]);

  function addToWishlist(product) {
    setWishlistItems((prev) => {
      const found = prev.find((item) => item.productId === product._id);
      if (found) {
        return prev;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.discountPrice,
          image: product.images?.[0],
          slug: product.slug,
        },
      ];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.productId === productId);
  }

  function clearWishlist() {
    setWishlistItems([]);
  }

  const total = useMemo(
    () => wishlistItems.reduce((sum, item) => sum + item.price, 0),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, total, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
