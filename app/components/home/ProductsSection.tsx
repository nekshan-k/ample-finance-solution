'use client'

import { ArrowRight, TrendingUp, Shield, Briefcase, Home } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { useCurrency } from "@/app/context/CurrencyContext";
import { convertCurrency, formatCurrencyByCode, localeToCurrency } from "@/app/lib/currency";

const products = [
  {
    icon: TrendingUp,
    titleKey: "mutualFunds",
    descriptionKey: "mutualFundsDesc",
    stats: [
      { labelKey: "fundsAvailable", valueInr: "5000+", isNumber: false, showPerMonth: false },
      { labelKey: "minInvestment", valueInr: 100, isNumber: true, showPerMonth: false },
    ],
    color: "from-primary to-primary/70",
    link: "/products/mutual-funds",
  },
  {
    icon: Shield,
    titleKey: "healthInsurance",
    descriptionKey: "healthInsuranceDesc",
    stats: [
      { labelKey: "networkHospitals", valueInr: "10000+", isNumber: false, showPerMonth: false },
      { labelKey: "claimsSettled", valueInr: "98%", isNumber: false, showPerMonth: false },
    ],
    color: "from-success to-success/70",
    link: "/products/insurance",
  },
  {
    icon: Briefcase,
    titleKey: "termInsurance",
    descriptionKey: "termInsuranceDesc",
    stats: [
      { labelKey: "coverageUpto", valueInr: 20000000, isNumber: true, showPerMonth: false }, // ₹2Cr
      { labelKey: "startingAt", valueInr: 490, isNumber: true, showPerMonth: true }, // ₹490/m
    ],
    color: "from-primary to-success",
    link: "/products/insurance",
  },
  {
    icon: Home,
    titleKey: "motorInsurance",
    descriptionKey: "motorInsuranceDesc",
    stats: [
      { labelKey: "cashlessGarages", valueInr: "5000+", isNumber: false, showPerMonth: false },
      { labelKey: "claimSupport", valueInr: "24/7", isNumber: false, showPerMonth: false },
    ],
    color: "from-success to-primary/70",
    link: "/products/insurance",
  },
];

export function ProductsSection() {
  const t = useTranslations("products");
  const common = useTranslations("common");
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

  const formatStatValue = (valueInr: string | number, isNumber: boolean, showPerMonth: boolean) => {
    if (!isNumber) return valueInr as string;
    
    const numValue = (valueInr as number) * conversionRate;
    const formatted = formatCurrencyByCode(numValue, currency, locale, 2).replace(/\.0+$/, '');
    
    return showPerMonth ? formatted + t("perMonth") : formatted;
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6 overflow-hidden">
          <div className="overflow-hidden">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 overflow-hidden">
              {t("tag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 break-words overflow-hidden">
              {t("title")} <span className="gradient-text whitespace-nowrap">{t("titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl break-words overflow-hidden">
              {t("subtitle")}
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">
              {common("viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 overflow-hidden">
          {products.map((product, index) => (
            <Link
              key={product.titleKey}
              href={product.link}
              className="group relative bg-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${product.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity flex-shrink-0`} />
              
              <div className="relative z-10 overflow-hidden">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                  <product.icon className="w-8 h-8 text-primary-foreground flex-shrink-0" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors truncate">
                  {t(product.titleKey)}
                </h3>
                <p className="text-muted-foreground mb-6 break-words overflow-hidden">
                  {t(product.descriptionKey)}
                </p>

                <div className="flex gap-8 mb-6 overflow-x-auto overflow-y-hidden">
                  {product.stats.map((stat) => (
                    <div key={stat.labelKey} className="flex-shrink-0">
                      <p className="text-2xl font-bold text-foreground break-words overflow-hidden">
                        {formatStatValue(stat.valueInr, stat.isNumber, stat.showPerMonth)}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all flex-shrink-0 whitespace-nowrap">
                  {t("explore")} <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

