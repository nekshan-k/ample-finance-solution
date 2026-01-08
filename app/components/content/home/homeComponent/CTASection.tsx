'use client';

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { useState, useEffect } from "react";

export function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const { currency } = useCurrency();
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadRates = async () => {
      try {
        const rates: Record<string, number> = { INR: 1 };
        for (const localeKey of Object.keys(localeToCurrency)) {
          const currCode = localeToCurrency[localeKey].code;
          if (currCode !== 'INR') {
            rates[currCode] = await convertCurrency(1, 'INR', currCode);
          }
        }
        setConversionRates(rates);
      } catch (err) {
        console.warn('Failed to load exchange rates:', err);
      }
    };
    loadRates();
  }, [currency]);

  const conversionRate = conversionRates[currency] ?? 1;
  const minAmount = formatCurrencyByCode(100 * conversionRate, currency, locale, 2);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {t('tag', { amount: minAmount })}
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
              {t('title')}
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
              variant="gradient"
                size="xl"
                asChild
              >
                <Link href="/products">
                  {t('getStarted')} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
              >
                <Link href="/contact">
                  {t('talkToExpert')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

