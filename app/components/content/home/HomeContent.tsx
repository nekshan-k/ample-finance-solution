import dynamic from "next/dynamic";
import { Layout } from "@/app/components/layout/Layout";
import { HeroSection } from "./homeComponent/HeroSection";

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
  return (
    <Layout>
      <HeroSection />
      <SIPCalculator />
      <FeaturesSection />
      <ProductsSection />
      <TrustSection />
      <AppDownloadSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
