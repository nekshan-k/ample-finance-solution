'use client';

import { Shield, Award, Lock, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustSection() {
  const t = useTranslations('trust');

  const trustBadges = [
    {
      icon: Shield,
      titleKey: "sebiRegistered",
      descKey: "sebiDesc",
    },
    {
      icon: Award,
      titleKey: "irdaiLicensed",
      descKey: "irdaiDesc",
    },
    {
      icon: Lock,
      titleKey: "bankGradeSecurity",
      descKey: "bankGradeSecurityDesc",
    },
    {
      icon: BadgeCheck,
      titleKey: "isoCertified",
      descKey: "isoCertifiedDesc",
    },
  ];

  const partners = [
    "HDFC Mutual Fund",
    "SBI Mutual Fund",
    "ICICI Prudential",
    "Axis Mutual Fund",
    "Kotak Mahindra",
    "Nippon India",
    "Tata AIA",
    "Max Life Insurance",
  ];

  return (
    <section className="py-24 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 overflow-hidden">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 break-words overflow-hidden">
            {t('title')}{" "}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto break-words overflow-hidden">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 overflow-hidden">
          {trustBadges.map((badge) => (
            <div
              key={badge.titleKey}
              className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                <badge.icon className="w-8 h-8 text-primary flex-shrink-0" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground break-words overflow-hidden">{t(badge.titleKey)}</h3>
              <p className="text-sm text-muted-foreground break-words overflow-hidden">{t(badge.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="text-center overflow-hidden">
          <p className="text-sm text-muted-foreground mb-8">
            {t('trustedPartners')}
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
      </div>
    </section>
  );
}

