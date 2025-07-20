
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Wishlist Context
const WishlistContext = createContext();

// Provider Component
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load wishlist on mount if token exists
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('vinoir_token');
        if (token) {
          const response = await axios.get('/api/wishlist', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWishlist(Array.isArray(response.data) ? response.data : []);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load wishlist');
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Add product to wishlist
  const addToWishlist = async (product) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      const response = await axios.post(
        '/api/wishlist',
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist((prev) => prev.some((item) => item._id === response.data._id)
        ? prev // do not duplicate
        : [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to wishlist');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      await axios.delete(`/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove from wishlist');
    } finally {
      setLoading(false);
    }
  };

  // Clear the entire wishlist
  const clearWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      await axios.delete('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear wishlist');
    } finally {
      setLoading(false);
    }
  };

  // Useful derived values
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount,
        setWishlist, // exposed for advanced cases
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Context Hook
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
