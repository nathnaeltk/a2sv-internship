'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBookmarks } from '@/services/api';

const AuthContext = createContext({
  user: null,
  bookmarks: [],
  loading: true,
  login: () => {},
  logout: () => {},
  updateBookmarks: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = JSON.parse(localStorage.getItem('user'));
          setUser(userData);
          const data = await getBookmarks(token);
          setBookmarks(data);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData, token) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      const data = await getBookmarks(token);
      setBookmarks(data);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setBookmarks([]);
    router.push('/login');
  };

  const updateBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
  };

  const value = {
    user,
    bookmarks,
    loading,
    login,
    logout,
    updateBookmarks,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 