import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("vinoir_wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("vinoir_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    setLoading(true);
    setError(null);
    try {
      const id = product.id || product._id;
      setWishlist((prev) => {
        if (prev.find((p) => (p.id || p._id) === id)) return prev;
        return [...prev, { ...product, id }];
      });
    } catch (err) {
      setError(err?.message || "Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setLoading(true);
    setError(null);
    try {
      setWishlist((prev) => prev.filter((p) => (p.id || p._id) !== id));
    } catch (err) {
      setError(err?.message || "Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleWishlist = useCallback((product) => {
    setLoading(true);
    setError(null);
    try {
      const id = product.id || product._id;
      setWishlist((prev) => {
        const exists = prev.find((p) => (p.id || p._id) === id);
        if (exists) return prev.filter((p) => (p.id || p._id) !== id);
        return [...prev, { ...product, id }];
      });
    } catch (err) {
      setError(err?.message || "Failed to toggle wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ wishlist, loading, error, addToWishlist, removeFromWishlist, toggleWishlist, setWishlist }),
    [wishlist, loading, error, addToWishlist, removeFromWishlist, toggleWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (ctx === undefined) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}