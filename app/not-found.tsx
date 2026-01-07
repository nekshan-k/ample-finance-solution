"use client";

import { Layout } from "@/app/components/layout/Layout";
import { Button } from "@/app/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="text-9xl font-bold bg-gradient-to-r from-[hsl(233,90%,58%)] to-[hsl(256,84%,60%)] bg-clip-text text-transparent">404</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link href="/"><Home className="w-5 h-5" /> Go Home</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" /> Go Back
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

