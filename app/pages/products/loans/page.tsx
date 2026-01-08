"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, DollarSign, Home, TrendingUp, Briefcase, Users, CheckCircle, Download, Clock, Shield, Zap } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function Loans() {
  const t = useTranslations('loansPage');
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

  const loanTypes = [
    {
      icon: Home,
      nameKey: "home.name",
      taglineKey: "home.tagline",
      descKey: "home.desc",
      featuresKey: ["home.feature1", "home.feature2", "home.feature3", "home.feature4", "home.feature5"],
      coverage: formatCurrencyByCode(10000000 * conversionRate, currency, locale, 2),
      startingAt: "6.75% p.a.",
      color: "from-primary to-primary/70",
    },
    {
      icon: TrendingUp,
      nameKey: "personal.name",
      taglineKey: "personal.tagline",
      descKey: "personal.desc",
      featuresKey: ["personal.feature1", "personal.feature2", "personal.feature3", "personal.feature4", "personal.feature5"],
      coverage: formatCurrencyByCode(5000000 * conversionRate, currency, locale, 2),
      startingAt: "9% p.a.",
      color: "from-success to-success/70",
    },
    {
      icon: Briefcase,
      nameKey: "business.name",
      taglineKey: "business.tagline",
      descKey: "business.desc",
      featuresKey: ["business.feature1", "business.feature2", "business.feature3", "business.feature4", "business.feature5"],
      coverage: formatCurrencyByCode(10000000 * conversionRate, currency, locale, 2),
      startingAt: "11% p.a.",
      color: "from-primary to-success",
    },
    {
      icon: DollarSign,
      nameKey: "education.name",
      taglineKey: "education.tagline",
      descKey: "education.desc",
      featuresKey: ["education.feature1", "education.feature2", "education.feature3", "education.feature4", "education.feature5"],
      coverage: formatCurrencyByCode(4000000 * conversionRate, currency, locale, 2),
      startingAt: "6.95% p.a.",
      color: "from-success to-primary/70",
    },
  ];

  const whyLoans = [
    {
      icon: Zap,
      titleKey: "why.quick.title",
      descKey: "why.quick.desc",
    },
    {
      icon: DollarSign,
      titleKey: "why.rates.title",
      descKey: "why.rates.desc",
    },
    {
      icon: Clock,
      titleKey: "why.flexible.title",
      descKey: "why.flexible.desc",
    },
    {
      icon: Shield,
      titleKey: "why.secure.title",
      descKey: "why.secure.desc",
    },
  ];

  const basicRequirements = [
    "eligibility.req1",
    "eligibility.req2",
    "eligibility.req3",
    "eligibility.req4",
    "eligibility.req5",
  ];

  const documents = [
    "eligibility.doc1",
    "eligibility.doc2",
    "eligibility.doc3",
    "eligibility.doc4",
    "eligibility.doc5",
  ];

  const partners = [
    "ICICI Bank",
    "HDFC Bank",
    "SBI",
    "Axis Bank",
    "IndusInd Bank",
    "Kotak Bank",
    "IDBI Bank",
    "Federal Bank",
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl overflow-hidden">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
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
                {t('applyNow')} <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                {t('checkEligibility')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-hidden">
            {whyLoans.map((item) => (
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
              {t('choose')} <span className={useGradient ? "gradient-text" : "solid-text"}>{t('loanType')}</span>
            </h2>
            <p className="text-muted-foreground break-words overflow-hidden">
              {t('chooseDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">
            {loanTypes.map((loan) => (
              <div
                key={loan.nameKey}
                className="bg-card rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-card transition-all duration-300 group overflow-hidden"
              >
                <div className="flex items-start gap-4 mb-6 min-w-0">
                  <div className={`w-14 h-14 rounded-2xl ${useGradient ? `bg-gradient-to-br ${loan.color}` : 'solid-primary'} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <loan.icon className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold break-words">{t(loan.nameKey)}</h3>
                    <p className="text-muted-foreground break-words">{t(loan.taglineKey)}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 break-words overflow-hidden">
                  {t(loan.descKey)}
                </p>

                <div className="space-y-3 mb-8 overflow-hidden">
                  {loan.featuresKey.map((featureKey) => (
                    <div key={featureKey} className="flex items-start gap-3 min-w-0">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm break-words">{t(featureKey)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-secondary/50 rounded-xl mb-6 gap-4 overflow-hidden">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground break-words">{t('loanAmount')}</p>
                    <p className="font-semibold break-words">{loan.coverage}</p>
                  </div>
                  <div className="text-right min-w-0">
                    <p className="text-sm text-muted-foreground break-words">{t('rateFrom')}</p>
                    <p className="font-semibold text-primary break-words">{loan.startingAt}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    {t('details')}
                  </Button>
                  <Button className="flex-1">
                    {t('applyNow')} <ArrowRight className="w-4 h-4" />
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

      <section className="py-20 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-16 overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 break-words">{t('eligibility.title')}</h2>
            <p className="text-muted-foreground break-words overflow-hidden">
              {t('eligibility.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto overflow-hidden">
            <div className="space-y-6 overflow-hidden">
              <h3 className="text-xl font-semibold mb-6 break-words">{t('eligibility.requirements')}</h3>
              {basicRequirements.map((req, i) => (
                <div key={i} className="flex gap-4 min-w-0">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <p className="break-words">{t(req)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 overflow-hidden">
              <h3 className="text-xl font-semibold mb-6 break-words">{t('eligibility.documents')}</h3>
              {documents.map((doc, i) => (
                <div key={i} className="flex gap-4 min-w-0">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <p className="break-words">{t(doc)}</p>
                </div>
              ))}
            </div>
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

