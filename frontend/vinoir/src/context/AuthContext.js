import React, { createContext, useContext, useState, useEffect } from 'react';

// Example: adjust this to fit your API
async function fetchUser(token) {
  const res = await fetch('http://localhost:5000/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('User fetch failed');
  return await res.json();
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Centralized login routine
  const login = async (token) => {
    localStorage.setItem('token', token);
    // Fetch and set user info
    try {
      const fetchedUser = await fetchUser(token);
      setUser(fetchedUser);
      // Optionally: handle guest cart merging here, etc.
    } catch (err) {
      console.error('Failed to fetch user after login:', err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // On mount: check if token exists, fetch user if so
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const fetchedUser = await fetchUser(token);
          setUser(fetchedUser);
        } catch (err) {
          console.error('Auth check failed:', err);
          logout();
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
