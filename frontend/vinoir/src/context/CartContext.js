import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('vinoir_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vinoir_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const id = product.id || product._id;
      if (!id) {
        // ensure item has an id
        const newItem = { ...product, _id: product._id || product.id || Math.random().toString(36).slice(2), quantity: qty };
        return [...prev, newItem];
      }
      const idx = prev.findIndex((p) => (p.id || p._id) === id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + qty };
        return next;
      }
      return [...prev, { ...product, quantity: qty, id }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => (p.id || p._id) !== id));
  };

  const updateCartItem = (id, quantity) => {
    const q = Number(quantity);
    setCart((prev) => {
      if (isNaN(q) || q < 0) return prev;
      if (q === 0) return prev.filter((p) => (p.id || p._id) !== id);
      return prev.map((p) => ((p.id || p._id) === id ? { ...p, quantity: q } : p));
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0), [cart]);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, updateCartItem, clearCart, cartCount, cartTotal, setCart }),
    [cart, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}