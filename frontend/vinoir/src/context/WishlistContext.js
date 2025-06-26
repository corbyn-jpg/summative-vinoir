// src/context/WishlistContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch wishlist from API on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('vinoir_token');
        if (token) {
          const response = await axios.get('/api/wishlist', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setWishlist(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      
      const response = await axios.post('/api/wishlist', { productId: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWishlist(prev => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to wishlist');
      throw err; // Re-throw to handle in components
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      
      await axios.delete(`/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWishlist(prev => prev.filter(item => item._id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove from wishlist');
    } finally {
      setLoading(false);
    }
  };

  const clearWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('vinoir_token');
      if (!token) throw new Error('Authentication required');
      
      await axios.delete('/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWishlist([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist,
        loading,
        error,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}