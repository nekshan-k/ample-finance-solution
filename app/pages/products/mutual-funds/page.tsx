'use client'

import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, TrendingUp, Search, Filter, Star, ArrowUpRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";
import { useTheme } from "@/app/context/ThemeContext";

const categories = ["All", "Equity", "Debt", "Hybrid", "Tax Saver", "Index"];

const funds = [
  {
    name: "HDFC Top 100 Fund",
    category: "Large Cap",
    rating: 5,
    returns1Y: 18.2,
    returns3Y: 15.4,
    returns5Y: 14.8,
    minInvestmentInr: 500,
    riskLevel: "Moderate",
  },
  {
    name: "SBI Blue Chip Fund",
    category: "Large Cap",
    rating: 5,
    returns1Y: 16.8,
    returns3Y: 14.2,
    returns5Y: 13.9,
    minInvestmentInr: 500,
    riskLevel: "Moderate",
  },
  {
    name: "Axis Midcap Fund",
    category: "Mid Cap",
    rating: 5,
    returns1Y: 24.5,
    returns3Y: 18.7,
    returns5Y: 17.2,
    minInvestmentInr: 500,
    riskLevel: "High",
  },
  {
    name: "Kotak Emerging Equity",
    category: "Mid Cap",
    rating: 4,
    returns1Y: 22.3,
    returns3Y: 17.1,
    returns5Y: 16.4,
    minInvestmentInr: 1000,
    riskLevel: "High",
  },
  {
    name: "ICICI Pru Balanced Advantage",
    category: "Hybrid",
    rating: 4,
    returns1Y: 12.4,
    returns3Y: 11.2,
    returns5Y: 10.8,
    minInvestmentInr: 100,
    riskLevel: "Low",
  },
  {
    name: "Nippon India Small Cap",
    category: "Small Cap",
    rating: 5,
    returns1Y: 32.1,
    returns3Y: 24.5,
    returns5Y: 21.2,
    minInvestmentInr: 500,
    riskLevel: "Very High",
  },
];

export default function MutualFunds() {
  const t = useTranslations('mutualFundsPage');
  const locale = useLocale();
  const { currency } = useCurrency();
  const { useGradient } = useTheme();
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    { labelKey: "fundsAvailable", value: "5,000+" },
    { labelKey: "minInvestment", value: formatCurrencyByCode(100 * conversionRate, currency, locale, 2) },
    { labelKey: "partners", value: "40+ AMCs" },
    { labelKey: "avgReturns", value: "12-18%" },
  ];

  const learningTopics = [
    {
      titleKey: "topic1Title",
      descKey: "topic1Desc",
    },
    {
      titleKey: "topic2Title",
      descKey: "topic2Desc",
    },
    {
      titleKey: "topic3Title",
      descKey: "topic3Desc",
    },
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
                {t('startSIP')} <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                {t('calculateReturns')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-primary break-words overflow-hidden">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button variant="outline" className="gap-2 flex-shrink-0">
              <Filter className="w-4 h-4" /> {t('filters')}
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4 overflow-hidden">
            {funds.map((fund) => (
              <div
                key={fund.name}
                className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft hover:shadow-card transition-all duration-300 group overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-12 h-12 rounded-xl ${useGradient ? 'gradient-primary' : 'solid-primary'} flex items-center justify-center flex-shrink-0`}>
                        <TrendingUp className="w-6 h-6 text-primary-foreground flex-shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors break-words overflow-hidden">
                          {fund.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-sm text-muted-foreground">{fund.category}</span>
                          <div className="flex gap-0.5 flex-shrink-0">
                            {Array.from({ length: fund.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
                    <div className="text-center min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-success break-words overflow-hidden">+{fund.returns1Y}%</p>
                      <p className="text-xs text-muted-foreground truncate">{t('returns1Y')}</p>
                    </div>
                    <div className="text-center min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-success break-words overflow-hidden">+{fund.returns3Y}%</p>
                      <p className="text-xs text-muted-foreground truncate">{t('returns3Y')}</p>
                    </div>
                    <div className="text-center min-w-0">
                      <p className="text-lg sm:text-xl font-bold text-success break-words overflow-hidden">+{fund.returns5Y}%</p>
                      <p className="text-xs text-muted-foreground truncate">{t('returns5Y')}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                    <Button variant="outline" size="sm">
                      {t('details')} <ArrowUpRight className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      {t('invest')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 break-words overflow-hidden">
              {t('learnTitle')}
            </h2>
            <p className="text-muted-foreground break-words overflow-hidden">
              {t('learnSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 overflow-hidden">
            {learningTopics.map((topic) => (
              <div key={topic.titleKey} className="bg-card rounded-2xl p-6 shadow-soft overflow-hidden">
                <h3 className="text-lg font-semibold mb-2 break-words overflow-hidden">{t(topic.titleKey)}</h3>
                <p className="text-muted-foreground text-sm mb-4 break-words overflow-hidden">{t(topic.descKey)}</p>
                <Button variant="link" className="p-0 h-auto whitespace-nowrap flex-shrink-0">
                  {t('readMore')} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 break-words overflow-hidden">
            {t('appTitle')}
          </h2>
          <p className="text-muted-foreground mb-8 break-words overflow-hidden">
            {t('appSubtitle')}
          </p>
          <Button variant="hero" size="xl">
            <Download className="w-5 h-5" /> {t('downloadApp')}
          </Button>
        </div>
      </section>
    </Layout>
  );
}

