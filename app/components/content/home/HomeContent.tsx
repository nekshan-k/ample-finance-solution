'use client';

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Layout } from "@/app/components/layout/Layout";
import { HeroSection } from "./homeComponent/HeroSection";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const SIPCalculator = dynamic(() => import("./homeComponent/SIPCalculator").then(mod => ({ default: mod.SIPCalculator })), {
  loading: () => <div className="py-20 animate-pulse bg-gradient-to-b from-primary/5 to-transparent" />,
});

const FeaturesSection = dynamic(() => import("./homeComponent/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const ProductsSection = dynamic(() => import("./homeComponent/ProductsSection").then(mod => ({ default: mod.ProductsSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const TrustSection = dynamic(() => import("./homeComponent/TrustSection").then(mod => ({ default: mod.TrustSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const AppDownloadSection = dynamic(() => import("./homeComponent/AppDownloadSection").then(mod => ({ default: mod.AppDownloadSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const TestimonialsSection = dynamic(() => import("./homeComponent/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const CTASection = dynamic(() => import("./homeComponent/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

export function HomeContent() {
  const sipRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const appDownloadRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollReveal([sipRef, featuresRef, productsRef, trustRef, appDownloadRef, testimonialsRef, ctaRef]);

  return (
    <Layout>
      <HeroSection />
      <div ref={sipRef} className="scroll-reveal">
        <SIPCalculator />
      </div>
      <div ref={featuresRef} className="scroll-reveal">
        <FeaturesSection />
      </div>
      <div ref={productsRef} className="scroll-reveal">
        <ProductsSection />
      </div>
      <div ref={trustRef} className="scroll-reveal-scale">
        <TrustSection />
      </div>
      <div ref={appDownloadRef} className="scroll-reveal-left">
        <AppDownloadSection />
      </div>
      <div ref={testimonialsRef} className="scroll-reveal-right">
        <TestimonialsSection />
      </div>
      <div ref={ctaRef} className="scroll-reveal-scale">
        <CTASection />
      </div>
    </Layout>
  );
}
