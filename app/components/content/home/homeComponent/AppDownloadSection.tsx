'use client';

import { Apple, Play, Star, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";
import { useTheme } from '@/app/context/ThemeContext';
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { useState, useEffect } from "react";

export function AppDownloadSection() {
  const t = useTranslations('appDownload');
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

  const appFeatures = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature4'),
    t('feature5'),
    t('feature6'),
  ];

  const holdings = [
    { name: "HDFC Flexi Cap", returns: "+22.4%", valueInr: 1200000 },
    { name: "SBI Blue Chip", returns: "+18.7%", valueInr: 950000 },
    { name: "Axis Midcap", returns: "+28.1%", valueInr: 850000 },
  ];

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              {t('tag')}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('title')}{" "}
              <span className="text-primary">Ample Finance</span> {t('titleEnd')}
            </h2>
            
            <p className="text-lg text-background/70 mb-8 max-w-lg">
              {t('subtitle')}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {appFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-background/80 break-words">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group flex items-center gap-3 px-6 py-3.5 bg-background text-foreground rounded-xl hover:bg-background/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-background/20">
                <Apple className="w-8 h-8 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight opacity-80 font-medium">{t('downloadOn')}</div>
                  <div className="text-lg font-semibold leading-tight">{t('appStore')}</div>
                </div>
              </button>
              
              <button className="group flex items-center gap-3 px-6 py-3.5 bg-background text-foreground rounded-xl hover:bg-background/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-background/20">
                <Play className="w-8 h-8 fill-current flex-shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight opacity-80 font-medium">{t('getItOn')}</div>
                  <div className="text-lg font-semibold leading-tight">{t('googlePlay')}</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              {useGradient && (
                <div className="absolute inset-0 gradient-primary rounded-full blur-[100px] opacity-30" />
              )}
              
              <div className="relative mx-auto w-[280px]">
                <div className="relative bg-background/10 rounded-[3rem] border-4 border-background/20 shadow-2xl overflow-hidden backdrop-blur-xl">
                  <div className="aspect-[9/19] p-6">
                    <div className="bg-card rounded-2xl p-4 mb-4 text-foreground">
                      <div className="flex items-center justify-between mb-4">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">{t('portfolioValue')}</p>
                          <p className="text-xl font-bold break-words">{formatCurrencyByCode(452890 * conversionRate, currency, locale, 2)}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success whitespace-nowrap">
                            +15.2%
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-20 flex items-end gap-1">
                        {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((height, i) => (
                          <div
                            key={i}
                            className={`flex-1 ${useGradient ? 'bg-gradient-to-t from-primary to-primary/50' : 'bg-primary'} rounded-t`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {holdings.map((holding) => (
                        <div
                          key={holding.name}
                          className="bg-card rounded-xl p-3 flex items-center justify-between text-foreground min-w-0"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-lg ${useGradient ? 'gradient-primary' : 'solid-primary'} flex-shrink-0`} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{holding.name}</p>
                              <p className="text-xs text-muted-foreground break-words">{formatCurrencyByCode(holding.valueInr * conversionRate, currency, locale, 2)}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-success flex-shrink-0">
                            {holding.returns}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-20 bg-card rounded-xl p-3 shadow-lg animate-float text-foreground flex-shrink-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">SIP Started!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

