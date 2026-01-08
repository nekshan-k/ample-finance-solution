'use client';

import { 
  TrendingUp, 
  Shield, 
  Smartphone, 
  PieChart, 
  Clock, 
  CreditCard,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from '@/app/context/ThemeContext';

export function FeaturesSection() {
  const t = useTranslations('features');
  const { useGradient } = useTheme();

  const features = [
    {
      icon: TrendingUp,
      titleKey: "smartInvestments",
      descKey: "smartInvestmentsDesc",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Shield,
      titleKey: "comprehensiveInsurance",
      descKey: "comprehensiveInsuranceDesc",
      color: "bg-success/10 text-success",
    },
    {
      icon: PieChart,
      titleKey: "portfolioAnalytics",
      descKey: "portfolioAnalyticsDesc",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Smartphone,
      titleKey: "mobileFirst",
      descKey: "mobileFirstDesc",
      color: "bg-success/10 text-success",
    },
    {
      icon: Clock,
      titleKey: "instantProcessing",
      descKey: "instantProcessingDesc",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: CreditCard,
      titleKey: "securePayments",
      descKey: "securePaymentsDesc",
      color: "bg-success/10 text-success",
    },
  ];

  return (
    <section className="py-24 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 overflow-hidden">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 break-words overflow-hidden">
            {t('title')}{" "}
            <span className={useGradient ? 'gradient-text' : 'solid-text'}>{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground break-words overflow-hidden">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group bg-card rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0`}>
                <feature.icon className="w-7 h-7 flex-shrink-0" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground break-words overflow-hidden">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground mb-4 break-words overflow-hidden">
                {t(feature.descKey)}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all whitespace-nowrap flex-shrink-0"
              >
                {t('learnMore')} <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

