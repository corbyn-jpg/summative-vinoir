import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Fetch wishlist from backend when authenticated
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    const token = localStorage.getItem('vinoir_token');
    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWishlist(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        // Token might be invalid, clear wishlist
        setWishlist([]);
      } else {
        console.error('Failed to fetch wishlist:', response.status);
        setWishlist([]);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load wishlist when auth state changes
  useEffect(() => {
    if (!authLoading) {
      fetchWishlist();
    }
  }, [authLoading, isAuthenticated, fetchWishlist]);

  const addToWishlist = useCallback(async (product) => {
    if (!isAuthenticated) {
      setError("Please log in to add items to your wishlist");
      return;
    }

    const token = localStorage.getItem('vinoir_token');
    if (!token) {
      setError("Authentication required");
      return;
    }

    const productId = product._id || product.id;
    if (!productId) {
      setError("Invalid product");
      return;
    }

    console.log('[WishlistContext] Adding to wishlist:', { productId, product: product.name });
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });

      console.log('[WishlistContext] Add response status:', response.status);

      if (response.ok) {
        const updatedWishlist = await response.json();
        console.log('[WishlistContext] Updated wishlist:', updatedWishlist);
        setWishlist(Array.isArray(updatedWishlist) ? updatedWishlist : []);
      } else if (response.status === 401) {
        setError("Please log in again");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('[WishlistContext] Add failed:', errorData);
        setError(errorData.message || "Failed to add to wishlist");
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      setError("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const removeFromWishlist = useCallback(async (productId) => {
    if (!isAuthenticated) {
      setError("Please log in to manage your wishlist");
      return;
    }

    const token = localStorage.getItem('vinoir_token');
    if (!token) {
      setError("Authentication required");
      return;
    }

    console.log('[WishlistContext] Removing from wishlist:', productId);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[WishlistContext] Remove response status:', response.status);

      if (response.ok) {
        const updatedWishlist = await response.json();
        console.log('[WishlistContext] Updated wishlist after remove:', updatedWishlist);
        setWishlist(Array.isArray(updatedWishlist) ? updatedWishlist : []);
      } else if (response.status === 401) {
        setError("Please log in again");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('[WishlistContext] Remove failed:', errorData);
        setError(errorData.message || "Failed to remove from wishlist");
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError("Failed to remove from wishlist");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const toggleWishlist = useCallback(async (product) => {
    const productId = product._id || product.id;
    const isInWishlist = wishlist.some(item => (item._id || item.id) === productId);
    
    if (isInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(product);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const clearWishlist = useCallback(async () => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem('vinoir_token');
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setWishlist([]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Failed to clear wishlist");
      }
    } catch (err) {
      console.error('Error clearing wishlist:', err);
      setError("Failed to clear wishlist");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({ 
      wishlist, 
      loading, 
      error, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist, 
      clearWishlist,
      wishlistCount: wishlist.length,
      setWishlist,
      refetchWishlist: fetchWishlist
    }),
    [wishlist, loading, error, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, fetchWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (ctx === undefined) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}