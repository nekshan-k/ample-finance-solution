'use client'

import { Toaster } from "@/app/components/ui/toaster";
import { Toaster as Sonner } from "@/app/components/ui/sonner";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useState, useEffect } from "react";
import { getLocaleFromCookie } from "..//i18n/config";


export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  const [messages, setMessages] = useState<any>(null);
  const [locale, setLocale] = useState<string>('en-US');

  useEffect(() => {
    async function loadMessages() {
      const currentLocale = getLocaleFromCookie();
      setLocale(currentLocale);
      const msgs = (await import(`../messages/${currentLocale}.json`)).default;
      setMessages(msgs);
    }
    loadMessages();
  }, []);

  if (!messages) {
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider>
        <CurrencyProvider>
          <ThemeProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <Toaster />
                  <Sonner position="top-center" richColors />
                  {children}
                </TooltipProvider>
              </QueryClientProvider>
            </AuthProvider>
          </ThemeProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}

