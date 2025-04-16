// src/context/AuthProvider.jsx
import React, { useState, useEffect,useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser, activateUser } from '../services/authService';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Rehydrate user from localStorage on mount
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  console.log('Initial token from localStorage:', storedToken ? 'exists' : 'missing');
  
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // ✅ Refresh user status from backend
  const refreshUser = useCallback(async () => {
    if (!token) return;
  
    try {
      const freshUser = await getCurrentUser(token);
      setUser(freshUser);
      localStorage.setItem('user', JSON.stringify(freshUser));
    } catch (err) {
      console.error('❌ Failed to refresh user:', err);
    }
  }, [token]);
  

  // ✅ Activate account using ID and refresh
  const activate = useCallback(async (userId) => {
    try {
      await activateUser(userId, token);
      await refreshUser();
    } catch (err) {
      console.error('❌ Failed to activate user:', err);
      throw err;
    }
  }, [token]); // Only recreate when token changes
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        login,
        logout,
        refreshUser,
        activate, // ✅ Expose the activation method
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
