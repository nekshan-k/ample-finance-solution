"use client";

import { ReactNode, memo } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import dynamic from "next/dynamic";

// Lazy load FloatingThemeButton as it's not critical for initial render
const FloatingThemeButton = dynamic(() => import("@/app/components/FloatingThemeButton"), {
  ssr: false,
  loading: () => null,
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = memo(function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      <Navbar />
      <FloatingThemeButton />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
});

