'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phoneNumber: string) => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send OTP');
    }
  };

  const login = async (phoneNumber: string, otp: string) => {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Invalid OTP');
    }

    const data = await response.json();
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, sendOTP }}>
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
