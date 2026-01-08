'use client';

import { ArrowRight, Play, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useTheme } from '@/app/context/ThemeContext';
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { useState, useEffect } from "react";

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { currency } = useCurrency();
  const { useGradient } = useTheme();
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
  
  const stats = [
    { icon: Users, value: "2M+", label: t('happyInvestors') },
    { icon: TrendingUp, value: `${formatCurrencyByCode(50000000000 * conversionRate, currency, locale, 2)}+`, label: t('assetsManaged') },
    { icon: Shield, value: "100%", label: t('securePlatform') },
  ];

  const mockActions = [
    t('mock.actions.invest'),
    t('mock.actions.sip'),
    t('mock.actions.insurance'),
    t('mock.actions.more'),
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-40 sm:left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-40 sm:right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-r from-primary/5 to-success/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {t('trustedBy')}
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 animate-slide-up px-2 sm:px-0">
              {t('title')}
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-slide-up px-2 sm:px-0">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-12 animate-slide-up px-2 sm:px-0" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="sm" className="text-sm sm:text-base sm:h-12 sm:px-8" asChild>
                <Link href="/products">
                  {t('cta')} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="text-sm sm:text-base sm:h-12 sm:px-8 gap-2">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                {t('learnMore')}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 animate-slide-up px-2 sm:px-0" style={{ animationDelay: "0.3s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-lg sm:text-2xl font-bold text-foreground break-words">{stat.value}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in hidden lg:block">
            <div className="relative z-10">
              <div className="relative mx-auto w-[300px]">
                <div className={`absolute inset-0 ${useGradient ? 'gradient-primary' : 'solid-primary'} rounded-[3rem] blur-2xl opacity-30`} />
                <div className="relative bg-card rounded-[3rem] border-8 border-foreground/10 shadow-2xl overflow-hidden">
                  <div className="aspect-[9/19] bg-gradient-to-b from-primary/10 to-background p-4">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground">{t('mock.greeting')}</p>
                        <p className="font-semibold text-foreground">{t('mock.userName')}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/20" />
                    </div>
                    <div className="bg-card rounded-2xl p-4 shadow-soft mb-4">
                      <p className="text-xs text-muted-foreground mb-1">{t('mock.totalInvestmentLabel')}</p>
                      <p className="text-2xl font-bold text-foreground mb-2 break-words">{formatCurrencyByCode(245000 * conversionRate, currency, locale, 2)}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success font-medium">
                          +12.5%
                        </span>
                        <span className="text-xs text-muted-foreground">{t('mock.thisMonth')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {mockActions.map((action) => (
                        <div key={action} className="text-center">
                          <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                            <div className="w-4 h-4 rounded bg-primary" />
                          </div>
                          <span className="text-[10px] text-muted-foreground truncate">{action}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-card rounded-xl p-3 shadow-soft">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${useGradient ? 'gradient-primary' : 'solid-primary'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{t('mock.fundName')}</p>
                          <p className="text-xs text-muted-foreground truncate">{t('mock.fundType')}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-medium text-success">+18.2%</p>
                          <p className="text-xs text-muted-foreground">{t('mock.fundReturnLabel')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-16 top-20 bg-card rounded-2xl p-4 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{t('mock.portfolioUpTitle')}</p>
                    <p className="text-lg font-bold text-success break-words">{formatCurrencyByCode(12500 * conversionRate, currency, locale, 2)}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-12 bottom-32 bg-card rounded-2xl p-4 shadow-card animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t('mock.secureTitle')}</p>
                    <p className="text-xs text-muted-foreground">{t('mock.secureSubtitle')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

