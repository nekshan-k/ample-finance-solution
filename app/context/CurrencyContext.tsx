'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'GBP' | 'INR' | 'IDR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_COOKIE_NAME = 'NEXT_CURRENCY';
const DEFAULT_CURRENCY: CurrencyCode = 'INR';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    // Get currency from cookie on mount
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const savedCurrency = (cookies[CURRENCY_COOKIE_NAME] || DEFAULT_CURRENCY) as CurrencyCode;
    setCurrencyState(savedCurrency);
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    // Save to cookie (persistent across page reloads)
    document.cookie = `${CURRENCY_COOKIE_NAME}=${newCurrency}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
