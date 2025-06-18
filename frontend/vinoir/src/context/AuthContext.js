// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Optionally verify token with backend here
          // const response = await verifyToken(token);
          // setUser(response.data.user);

          const guestCart = localStorage.getItem('guestCart');
          if (guestCart) {
            // Optionally merge with backend cart
            // await mergeCarts(JSON.parse(guestCart), token);
            localStorage.removeItem('guestCart');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    // Optionally fetch user details
    // const response = await fetchUser(token);
    // setUser(response.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
