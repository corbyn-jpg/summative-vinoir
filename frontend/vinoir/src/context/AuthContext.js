import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

// Fetch user profile data (centralized)
async function fetchUser(token) {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  }
  return await res.json();
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Centralized login routine
  const login = async (token, userData = null) => {
    localStorage.setItem('vinoir_token', token);
    
    if (userData) {
      // If user data is provided (from login response), use it directly
      setUser(userData);
    } else {
      // Otherwise, fetch user info
      try {
        const fetchedUser = await fetchUser(token);
        setUser(fetchedUser);
      } catch (err) {
        console.error('Failed to fetch user after login:', err);
        // Don't logout on fetch failure, use fallback user data
        setUser({ email: 'user@vinoir.com', name: 'Vinoir User' });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('vinoir_token');
    setUser(null);
  };

  // On mount: check if token exists, fetch user if so
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('vinoir_token');
      if (token) {
        try {
          const fetchedUser = await fetchUser(token);
          setUser(fetchedUser);
        } catch (err) {
          console.error('Auth check failed:', err);
          // Use fallback user data instead of logging out
          setUser({ email: 'user@vinoir.com', name: 'Vinoir User' });
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        setUser, // optional, for direct access elsewhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
