'use client'

import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { useCurrency } from '@/app/context/CurrencyContext';
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";

const getRangeStyle = (value: number, min: number, max: number) => {
  const percent = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, hsl(var(--primary)) ${percent}%, hsl(var(--secondary)) ${percent}%)`,
  };
};

export const SIPCalculator = memo(function SIPCalculator() {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const { currency } = useCurrency();
  
  const BASE_MONTHLY_INR = 27500;
  const MIN_MONTHLY_INR = 500;
  const MAX_MONTHLY_INR = 100000;
  
  const [monthlyInvestment, setMonthlyInvestment] = useState(BASE_MONTHLY_INR);
  const [expectedReturn, setExpectedReturn] = useState(17);
  const [timePeriod, setTimePeriod] = useState(10);
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

  const calculations = useMemo(() => {
    const r = expectedReturn / 12 / 100;
    const n = timePeriod * 12;

    const fv =
      r === 0
        ? monthlyInvestment * n
        : monthlyInvestment *
          (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const invested = monthlyInvestment * n;
    const returns = fv - invested;

    return {
      futureValue: Math.round(fv),
      investedAmount: Math.round(invested),
      estimatedReturns: Math.round(returns),
      investedPercentage: ((invested / fv) * 100).toFixed(1),
      returnsPercentage: ((returns / fv) * 100).toFixed(1),
    };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const conversionRate = conversionRates[currency] ?? 1;
  const displayMonthly = monthlyInvestment * conversionRate;
  const displayFutureValue = calculations.futureValue * conversionRate;
  const displayInvested = calculations.investedAmount * conversionRate;
  const displayReturns = calculations.estimatedReturns * conversionRate;

  const formatCurrency = useCallback((value: number) => {
    return formatCurrencyByCode(value, currency, locale, 2);
  }, [currency, locale]);

  const handleMonthlyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyInvestment(+e.target.value);
  }, []);

  const handleReturnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedReturn(+e.target.value);
  }, []);

  const handlePeriodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimePeriod(+e.target.value);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 w-full">
          <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            📊 {t('tag')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('description')}
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft border border-border overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 truncate">{t('enterDetails')}</h3>

            <div className="mb-10 overflow-hidden">
              <div className="flex justify-between mb-3 gap-2 min-w-0">
                <span className="font-semibold truncate">{t('monthlyInvestment')}</span>
                <span className="text-primary font-bold truncate flex-shrink-0">
                  {formatCurrency(displayMonthly)}
                </span>
              </div>
              <input
                type="range"
                min={MIN_MONTHLY_INR}
                max={MAX_MONTHLY_INR}
                step={500}
                value={monthlyInvestment}
                onChange={handleMonthlyChange}
                style={getRangeStyle(monthlyInvestment, MIN_MONTHLY_INR, MAX_MONTHLY_INR)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer block
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border-4
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs mt-2 text-muted-foreground gap-1 overflow-hidden">
                <span className="truncate">{formatCurrency(MIN_MONTHLY_INR * conversionRate)}</span>
                <span className="truncate flex-shrink-0">{formatCurrency(MAX_MONTHLY_INR * conversionRate)}</span>
              </div>
            </div>

            <div className="mb-10 overflow-hidden">
              <div className="flex justify-between mb-3 gap-2 min-w-0">
                <span className="font-semibold truncate">{t('expectedReturn')}</span>
                <span className="text-primary font-bold flex-shrink-0">{expectedReturn}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={expectedReturn}
                onChange={handleReturnChange}
                style={getRangeStyle(expectedReturn, 1, 30)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer block
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border-4
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs mt-2 text-muted-foreground gap-1 overflow-hidden">
                <span className="truncate">{t('minExpectedReturnLabel')}</span>
                <span className="truncate flex-shrink-0">{t('maxExpectedReturnLabel')}</span>
              </div>
            </div>

            <div className="mb-10 overflow-hidden">
              <div className="flex justify-between mb-3 gap-2 min-w-0">
                <span className="font-semibold truncate">{t('timePeriod')}</span>
                <span className="text-primary font-bold flex-shrink-0">
                  {timePeriod} {t('years')}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={timePeriod}
                onChange={handlePeriodChange}
                style={getRangeStyle(timePeriod, 1, 40)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer block
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:border-4
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs mt-2 text-muted-foreground gap-1 overflow-hidden">
                <span className="truncate">{t('minTimePeriodLabel')}</span>
                <span className="truncate flex-shrink-0">{t('maxTimePeriodLabel')}</span>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('startSIPNow')}
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6 overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-secondary-500 rounded-3xl p-6 sm:p-8 text-white overflow-hidden">
              <p className="text-white/80 text-sm mb-2">{t('totalValue')}</p>
              <h4 className="text-3xl sm:text-4xl font-bold mb-3 break-words overflow-hidden">
                {formatCurrency(displayFutureValue)}
              </h4>
              <p className="text-white/90 text-xs sm:text-sm break-words overflow-hidden">
                {t('sipGrowth', {
                  amount: formatCurrency(displayMonthly),
                  years: timePeriod,
                })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 overflow-hidden">
              <div className="bg-card rounded-2xl p-4 sm:p-6 border overflow-hidden">
                <p className="text-muted-foreground text-xs sm:text-sm mb-1 truncate">
                  {t('totalInvestment')}
                </p>
                <p className="text-xl sm:text-2xl font-bold break-words overflow-hidden">
                  {formatCurrency(displayInvested)}
                </p>
              </div>
              <div className="bg-card rounded-2xl p-4 sm:p-6 border overflow-hidden">
                <p className="text-muted-foreground text-xs sm:text-sm mb-1 truncate">
                  {t('estimatedReturns')}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-success break-words overflow-hidden">
                  {formatCurrency(displayReturns)}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 sm:p-6 border overflow-hidden">
              <h4 className="text-sm sm:text-base font-semibold mb-4 truncate">{t('investmentBreakdown')}</h4>
              <div className="w-full h-3 sm:h-4 rounded-full overflow-hidden flex bg-slate-200">
                <motion.div
                  className="bg-slate-400 h-full flex-shrink-0"
                  animate={{ width: `${calculations.investedPercentage}%` }}
                />
                <motion.div
                  className="bg-primary h-full flex-shrink-0"
                  animate={{ width: `${calculations.returnsPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs sm:text-sm mt-4 gap-2 overflow-hidden">
                <span className="truncate">{t('investedPct', { percent: calculations.investedPercentage })}</span>
                <span className="truncate flex-shrink-0">{t('returnsPct', { percent: calculations.returnsPercentage })}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

