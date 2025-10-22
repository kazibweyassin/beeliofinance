import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  country?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Safe hook that returns default values when AuthProvider is not available
export const useAuthSafe = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      login: async () => false,
      signup: async () => false,
      logout: () => {},
      loading: false,
      isAuthenticated: false,
    };
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check for existing session on mount
    const token = localStorage.getItem('beelio_token');
    const userData = localStorage.getItem('beelio_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('beelio_token');
        localStorage.removeItem('beelio_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          action: 'login'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        if (mounted) {
          localStorage.setItem('beelio_token', data.user.token);
          localStorage.setItem('beelio_user', JSON.stringify(data.user));
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          action: 'signup'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        if (mounted) {
          localStorage.setItem('beelio_token', data.user.token);
          localStorage.setItem('beelio_user', JSON.stringify(data.user));
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (mounted) {
      localStorage.removeItem('beelio_token');
      localStorage.removeItem('beelio_user');
    }
    router.push('/');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  // Always provide the context, but handle SSR safely
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
