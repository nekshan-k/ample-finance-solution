import dynamic from "next/dynamic";
import { Layout } from "@/app/components/layout/Layout";
import { HeroSection } from "@/app/components/home/HeroSection";
const SIPCalculator = dynamic(() => import("@/app/components/home/SIPCalculator").then(mod => ({ default: mod.SIPCalculator })), {
  loading: () => <div className="py-20 animate-pulse bg-gradient-to-b from-primary/5 to-transparent" />,
});

const FeaturesSection = dynamic(() => import("@/app/components/home/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const ProductsSection = dynamic(() => import("@/app/components/home/ProductsSection").then(mod => ({ default: mod.ProductsSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const TrustSection = dynamic(() => import("@/app/components/home/TrustSection").then(mod => ({ default: mod.TrustSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const AppDownloadSection = dynamic(() => import("@/app/components/home/AppDownloadSection").then(mod => ({ default: mod.AppDownloadSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const TestimonialsSection = dynamic(() => import("@/app/components/home/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

const CTASection = dynamic(() => import("@/app/components/home/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-20 animate-pulse" />,
});

export default function Home() {
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

