import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('vinoir_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vinoir_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      // Use both _id and id for compatibility
      const productId = product._id || product.id;
      const existingItem = currentCart.find(item => 
        (item._id || item.id) === productId
      );
      
      if (existingItem) {
        return currentCart.map(item =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { 
        ...product, 
        quantity: 1,
        _id: product._id || product.id // Ensure we store the identifier
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => 
      currentCart.filter(item => (item._id || item.id) !== productId)
    );
  };

  const updateCartItem = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map(item =>
        (item._id || item.id) === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateCartItem, 
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}