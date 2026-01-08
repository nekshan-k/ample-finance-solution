"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, Shield, Heart, Car, Plane, Home, Users, CheckCircle, Download } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function Insurance() {
  const t = useTranslations('insurancePage');
  const locale = useLocale();
  const { currency } = useCurrency();
  const { useGradient } = useTheme();
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadRates = async () => {
      try {
        const rates: Record<string, number> = {};
        const currencyCodes = ['USD', 'GBP', 'INR', 'IDR'];
        for (const currCode of currencyCodes) {
          if (currCode !== 'INR') {
            rates[currCode] = await convertCurrency(1, 'INR', currCode);
          }
        }
        setExchangeRates(rates);
        const convRates: Record<string, number> = { INR: 1 };
        for (const currCode of currencyCodes) {
          if (currCode !== 'INR') {
            convRates[currCode] = await convertCurrency(1, 'INR', currCode);
          }
        }
        setConversionRates(convRates);
      } catch (err) {
        console.warn('Failed to load exchange rates:', err);
      }
    };
    loadRates();
  }, [currency]);

  const conversionRate = conversionRates[currency] ?? 1;

  const insuranceTypes = [
    {
      icon: Heart,
      nameKey: "health.name",
      taglineKey: "health.tagline",
      descKey: "health.desc",
      featuresKey: ["health.feature1", "health.feature2", "health.feature3", "health.feature4", "health.feature5"],
      coverage: formatCurrencyByCode(10000000 * conversionRate, currency, locale, 2),
      startingAt: formatCurrencyByCode(500 * conversionRate, currency, locale, 0) + t('health.perMonth'),
      color: "from-success to-success/70",
    },
    {
      icon: Shield,
      nameKey: "term.name",
      taglineKey: "term.tagline",
      descKey: "term.desc",
      featuresKey: ["term.feature1", "term.feature2", "term.feature3", "term.feature4", "term.feature5"],
      coverage: formatCurrencyByCode(20000000 * conversionRate, currency, locale, 2),
      startingAt: formatCurrencyByCode(490 * conversionRate, currency, locale, 0) + t('term.perMonth'),
      color: "from-primary to-primary/70",
    },
    {
      icon: Car,
      nameKey: "motor.name",
      taglineKey: "motor.tagline",
      descKey: "motor.desc",
      featuresKey: ["motor.feature1", "motor.feature2", "motor.feature3", "motor.feature4", "motor.feature5"],
      coverage: t('motor.coverage'),
      startingAt: formatCurrencyByCode(2500 * conversionRate, currency, locale, 0) + t('motor.perYear'),
      color: "from-primary to-success",
    },
    {
      icon: Plane,
      nameKey: "travel.name",
      taglineKey: "travel.tagline",
      descKey: "travel.desc",
      featuresKey: ["travel.feature1", "travel.feature2", "travel.feature3", "travel.feature4", "travel.feature5"],
      coverage: t('travel.coverage'),
      startingAt: formatCurrencyByCode(300 * conversionRate, currency, locale, 0) + t('travel.perTrip'),
      color: "from-success to-primary/70",
    },
  ];

  const whyInsurance = [
    {
      icon: Shield,
      titleKey: "why.protection.title",
      descKey: "why.protection.desc",
    },
    {
      icon: Heart,
      titleKey: "why.peace.title",
      descKey: "why.peace.desc",
    },
    {
      icon: Home,
      titleKey: "why.asset.title",
      descKey: "why.asset.desc",
    },
    {
      icon: Users,
      titleKey: "why.family.title",
      descKey: "why.family.desc",
    },
  ];

  const partners = [
    "HDFC Ergo",
    "ICICI Lombard",
    "Star Health",
    "Max Life",
    "LIC",
    "Tata AIG",
    "Bajaj Allianz",
    "SBI Life",
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-to-b from-success/5 to-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl overflow-hidden">
            <span className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              {t('tag')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 break-words overflow-hidden">
              {t('title')} <span className={useGradient ? "gradient-text" : "solid-text"}>{t('titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 break-words overflow-hidden">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                {t('getQuote')} <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                {t('comparePlans')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-hidden">
            {whyInsurance.map((item) => (
              <div key={item.titleKey} className="text-center overflow-hidden">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                  <item.icon className="w-7 h-7 text-primary flex-shrink-0" />
                </div>
                <h3 className="font-semibold mb-2 break-words overflow-hidden">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground break-words overflow-hidden">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-16 overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 break-words overflow-hidden">
              {t('choose')} <span className={useGradient ? "gradient-text" : "solid-text"}>{t('coverage')}</span>
            </h2>
            <p className="text-muted-foreground break-words overflow-hidden">
              {t('chooseDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">
            {insuranceTypes.map((insurance) => (
              <div
                key={insurance.nameKey}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-card transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-start gap-4 mb-6 min-w-0">
                  <div className={`w-14 h-14 rounded-2xl ${useGradient ? `bg-gradient-to-br ${insurance.color}` : 'solid-primary'} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <insurance.icon className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold break-words">{t(insurance.nameKey)}</h3>
                    <p className="text-muted-foreground break-words">{t(insurance.taglineKey)}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 break-words overflow-hidden">
                  {t(insurance.descKey)}
                </p>

                <div className="space-y-3 mb-8 overflow-hidden">
                  {insurance.featuresKey.map((featureKey) => (
                    <div key={featureKey} className="flex items-start gap-3 min-w-0">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm break-words">{t(featureKey)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-secondary/50 rounded-xl mb-6 gap-4 overflow-hidden">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground break-words">{t('coverageLabel')}</p>
                    <p className="font-semibold break-words">{insurance.coverage}</p>
                  </div>
                  <div className="text-right min-w-0">
                    <p className="text-sm text-muted-foreground break-words">{t('startingAt')}</p>
                    <p className="font-semibold text-primary break-words">{insurance.startingAt}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    {t('viewPlans')}
                  </Button>
                  <Button className="flex-1">
                    {t('getQuote')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50 overflow-hidden">
        <div className="container mx-auto px-4 text-center overflow-hidden">
          <p className="text-sm text-muted-foreground mb-8 break-words">
            {t('partners')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 opacity-60 overflow-hidden">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-4 sm:px-6 py-3 bg-card rounded-lg text-sm font-medium text-muted-foreground break-words overflow-hidden"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center overflow-hidden">
          <h2 className="text-3xl font-bold mb-4 break-words">{t('appTitle')}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto break-words overflow-hidden">
            {t('appDesc')}
          </p>
          <Button variant="hero" size="xl">
            <Download className="w-5 h-5" /> {t('downloadApp')}
          </Button>
        </div>
      </section>
    </Layout>
  );
}

