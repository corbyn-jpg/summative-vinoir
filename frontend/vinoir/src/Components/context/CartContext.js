import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("vinoir_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("vinoir_cart", JSON.stringify(cart));
  }, [cart]);

  const safeProduct = (product) => ({
    _id:
      product._id || product.id || Math.random().toString(36).substring(2, 9),
    name: product.name || "Unnamed Product",
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 1,
    images: product.images || [],
    category: product.category || "Uncategorized",
  });

  const addToCart = (product) => {
    const validatedProduct = safeProduct(product);
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (item) => item._id === validatedProduct._id
      );

      if (existingIndex >= 0) {
        return currentCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, validatedProduct];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  const updateCartItem = (productId, newQuantity) => {
    const quantity = Math.max(1, Number(newQuantity) || 1);
    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("vinoir_cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
  (total, item) => total + (item.price * item.quantity),
  0
);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        cartCount,
        cartTotal: Number(cartTotal) || 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
