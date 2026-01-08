"use client";

import { Layout } from "@/app/components/layout/Layout";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Heart, Car, Plane, Briefcase, Home, DollarSign } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "@/app/context/ThemeContext";

const mutualFundCategories = [
  {
    name: "Equity Funds",
    description: "Invest in stocks for long-term wealth creation",
    returns: "12-15% avg.",
    risk: "High",
    icon: TrendingUp,
  },
  {
    name: "Debt Funds",
    description: "Stable returns with lower risk through bonds",
    returns: "7-9% avg.",
    risk: "Low",
    icon: Shield,
  },
  {
    name: "Hybrid Funds",
    description: "Best of both equity and debt investments",
    returns: "10-12% avg.",
    risk: "Moderate",
    icon: Briefcase,
  },
];

const insuranceProducts = [
  {
    name: "Health Insurance",
    description: "Comprehensive medical coverage for you and family",
    coverage: "Up to ₹1Cr",
    icon: Heart,
    color: "from-success to-success/70",
  },
  {
    name: "Term Insurance",
    description: "Protect your family's financial future",
    coverage: "Up to ₹2Cr",
    icon: Shield,
    color: "from-primary to-primary/70",
  },
  {
    name: "Motor Insurance",
    description: "Complete protection for your vehicles",
    coverage: "Comprehensive",
    icon: Car,
    color: "from-primary to-success",
  },
  {
    name: "Travel Insurance",
    description: "Travel worry-free with complete coverage",
    coverage: "Global",
    icon: Plane,
    color: "from-success to-primary/70",
  },
];

const loanProducts = [
  {
    name: "Home Loans",
    description: "Own your dream home with easy financing",
    coverage: "Up to ₹1Cr",
    icon: Home,
    color: "from-primary to-primary/70",
  },
  {
    name: "Personal Loans",
    description: "Quick funds for any financial need",
    coverage: "Up to ₹50L",
    icon: DollarSign,
    color: "from-success to-success/70",
  },
  {
    name: "Business Loans",
    description: "Grow your business with flexible financing",
    coverage: "Up to ₹1Cr",
    icon: Briefcase,
    color: "from-primary to-success",
  },
  {
    name: "Education Loans",
    description: "Invest in your future education",
    coverage: "Up to ₹40L",
    icon: TrendingUp,
    color: "from-success to-primary/70",
  },
];

export default function Products() {
  const { useGradient } = useTheme();
  
  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className={useGradient ? "gradient-text" : "solid-text"}>Products</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive investment and protection solutions designed to help you 
            achieve your financial goals.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Investments
              </span>
              <h2 className="text-3xl font-bold">Mutual Funds</h2>
              <p className="text-muted-foreground mt-2">
                Start building wealth with India's top-performing mutual funds
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products/mutual-funds">
                View All Funds <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mutualFundCategories.map((category) => (
              <div
                key={category.name}
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-lg font-bold text-success">{category.returns}</p>
                    <p className="text-xs text-muted-foreground">Expected Returns</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{category.risk}</p>
                    <p className="text-xs text-muted-foreground">Risk Level</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                Protection
              </span>
              <h2 className="text-3xl font-bold">Insurance Products</h2>
              <p className="text-muted-foreground mt-2">
                Comprehensive coverage for life's uncertainties
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products/insurance">
                View All Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {insuranceProducts.map((product) => (
              <div
                key={product.name}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-xl ${useGradient ? `bg-gradient-to-br ${product.color}` : 'solid-primary'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <product.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <p className="text-sm font-medium text-primary">{product.coverage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Credit & Loans
              </span>
              <h2 className="text-3xl font-bold">Loan Products</h2>
              <p className="text-muted-foreground mt-2">
                Quick and easy loans for every financial need
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products/loans">
                View All Loans <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((product) => (
              <div
                key={product.name}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-xl ${useGradient ? `bg-gradient-to-br ${product.color}` : 'solid-primary'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <product.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <p className="text-sm font-medium text-primary">{product.coverage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Download our app and access all products. Start investing or apply for loans today.
          </p>
          <Button variant="hero" size="xl">
            Download App <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}

