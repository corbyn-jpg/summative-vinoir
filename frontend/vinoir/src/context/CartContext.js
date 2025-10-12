import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage or start empty
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Support _id or id as product identifier
  const getProductId = (product) => product._id || product.id;

  const addToCart = (product) => {
    const productId = getProductId(product);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => getProductId(item) === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => getProductId(item) !== productId));
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      // Remove if quantity is 0 or less
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        getProductId(item) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Optional: total quantity count of items in cart
  const getCartQuantity = () =>
    cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
