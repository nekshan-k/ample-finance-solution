"use client";

import { useRef } from 'react';
import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, Target, Eye, Heart, Users, Award, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useLocale } from 'next-intl';
import { formatCurrencyByCode } from '@/app/lib/currency';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';
import { useTheme } from '@/app/context/ThemeContext';

const valuesData = [
  { icon: Target, titleKey: "values.customerFirst.title", descKey: "values.customerFirst.desc" },
  { icon: Shield, titleKey: "values.transparency.title", descKey: "values.transparency.desc" },
  { icon: Heart, titleKey: "values.trust.title", descKey: "values.trust.desc" },
  { icon: TrendingUp, titleKey: "values.innovation.title", descKey: "values.innovation.desc" },
];

const statsData = [
  { valueKey: "stats.investors.value", labelKey: "stats.investors.label" },
  { valueKey: "stats.assets.value", labelKey: "stats.assets.label" },
  { valueKey: "stats.partnerAmcs.value", labelKey: "stats.partnerAmcs.label" },
  { valueKey: "stats.rating.value", labelKey: "stats.rating.label" },
];

const teamData = [
  {
    name: "Vikram Mehta",
    roleKey: "team.vikram.role",
    bioKey: "team.vikram.bio",
  },
  {
    name: "Priya Agarwal",
    roleKey: "team.priya.role",
    bioKey: "team.priya.bio",
  },
  {
    name: "Rahul Sharma",
    roleKey: "team.rahul.role",
    bioKey: "team.rahul.bio",
  },
  {
    name: "Ananya Kapoor",
    roleKey: "team.ananya.role",
    bioKey: "team.ananya.bio",
  },
];

export function AboutContent() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');
  const { currency } = useCurrency();
  const locale = useLocale();
  const { useGradient } = useTheme();

  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollReveal([statsRef, storyRef, missionRef, valuesRef, teamRef, ctaRef]);

  const assetsInINR = 5000000000;
  const assetsConverted = formatCurrencyByCode(assetsInINR, currency, locale, 0);
  
  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('title')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('subtitle')}{" "}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-16 border-b border-border scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <p className={`text-4xl font-bold ${useGradient ? 'gradient-text' : 'solid-text'}`}>
                  {stat.valueKey === "stats.assets.value" 
                    ? assetsConverted 
                    : t(stat.valueKey)
                  }
                </p>
                <p className="text-muted-foreground mt-2">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={storyRef} className="py-20 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {t('story.tag')}
              </span>
              <h2 className="text-3xl font-bold mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('story.para1')}</p>
                <p>{t('story.para2')}</p>
                <p>{t('story.para3')}</p>
              </div>
            </div>
            <div className="relative">
              <div className={`aspect-square rounded-3xl ${useGradient ? 'gradient-primary' : 'solid-primary'} p-1`}>
                <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className={`w-24 h-24 mx-auto rounded-2xl ${useGradient ? 'gradient-primary' : 'solid-primary'} flex items-center justify-center mb-6`}>
                      <span className="text-5xl font-bold text-primary-foreground">A</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Ample Finance</h3>
                    <p className="text-muted-foreground">{t('story.established')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={missionRef} className="py-20 bg-secondary/50 scroll-reveal-scale">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl p-10 shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('mission.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('mission.description')}
              </p>
            </div>
            <div className="bg-card rounded-3xl p-10 shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('vision.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-20 scroll-reveal">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t('values.title')} <span className={useGradient ? "gradient-text" : "solid-text"}>{t('values.highlight')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesData.map((value) => (
              <div
                key={value.titleKey}
                className="text-center p-6 rounded-2xl hover:bg-card hover:shadow-soft transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${useGradient ? 'bg-primary/10' : 'border-2 border-white'} flex items-center justify-center mb-4`}>
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(value.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-20 bg-secondary/50 scroll-reveal-left">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t('team.title')} <span className={useGradient ? "gradient-text" : "solid-text"}>{t('team.highlight')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('team.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className={`w-20 h-20 mx-auto rounded-full ${useGradient ? 'gradient-primary' : 'solid-primary'} flex items-center justify-center mb-4`}>
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{t(member.roleKey)}</p>
                <p className="text-sm text-muted-foreground">{t(member.bioKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-20 scroll-reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link href="/products">
                {t('cta.startInvesting')} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/contact">
                {t('cta.contactUs')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
