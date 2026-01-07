import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5654f5' },
    { media: '(prefers-color-scheme: dark)', color: '#7371fc' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Ample Finance - Smart Investments Made Simple",
    template: "%s | Ample Finance"
  },
  description: "Your trusted partner for smart investments. Mutual funds, insurance, and loans all in one place. Start investing with confidence.",
  keywords: ["investments", "mutual funds", "insurance", "loans", "SIP calculator", "wealth management", "financial planning"],
  authors: [{ name: "Ample Finance" }],
  creator: "Ample Finance",
  publisher: "Ample Finance",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://amplefinance.com",
    title: "Ample Finance - Smart Investments Made Simple",
    description: "Your trusted partner for smart investments. Mutual funds, insurance, and loans all in one place.",
    siteName: "Ample Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ample Finance - Smart Investments Made Simple",
    description: "Your trusted partner for smart investments. Start investing today.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

